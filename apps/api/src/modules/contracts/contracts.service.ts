import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ContractStatus, FeePayer, MilestoneStatus, DeliveryStatus, PaymentStatus, JobStatus } from '@prisma/client';

export const PLATFORM_FEE_STEP_USD = 300.0;
export const PLATFORM_FEE_PER_STEP_USD = 20.0;
export const PLATFORM_FIXED_FEE = 20.0;

/**
 * Automatically calculates platform commission in the backend:
 * $20 for every $300 (or fraction thereof)
 */
export function calculatePlatformFee(amount: number): number {
  if (!amount || amount <= 0) return 0;
  const tiers = Math.max(1, Math.ceil(amount / PLATFORM_FEE_STEP_USD));
  return tiers * PLATFORM_FEE_PER_STEP_USD;
}

export interface CreateMilestoneInput {
  title: string;
  description?: string;
  amount: number;
  dueDate?: Date;
}

@Injectable()
export class ContractsService {
  constructor(private prisma: PrismaService) {}

  async createContractWithMilestones(
    clientId: string,
    freelancerId: string,
    jobId: string,
    proposalId: string | null,
    title: string,
    milestones: CreateMilestoneInput[],
  ) {
    const totalAgreed = milestones.reduce((sum, m) => sum + m.amount, 0);
    // Commission calculated automatically in the backend: $20 per $300
    const autoPlatformFee = calculatePlatformFee(totalAgreed);

    return this.prisma.$transaction(async (tx) => {
      // 1. Create Contract
      const contract = await tx.contract.create({
        data: {
          clientId,
          freelancerId,
          jobId,
          proposalId: proposalId || undefined,
          title,
          totalAgreedAmount: totalAgreed,
          platformFee: autoPlatformFee,
          feePayer: FeePayer.CLIENT,
          status: ContractStatus.ACTIVE,
          milestones: {
            create: milestones.map((m, index) => ({
              title: m.title,
              description: m.description,
              amount: m.amount,
              orderIndex: index + 1,
              dueDate: m.dueDate,
              // Automatically fund the first milestone in escrow
              status: index === 0 ? MilestoneStatus.FUNDED_IN_ESCROW : MilestoneStatus.PENDING,
              escrowFundedAt: index === 0 ? new Date() : null,
            })),
          },
          payments: {
            create: {
              grossAmount: milestones[0].amount + (milestones.length === 1 ? autoPlatformFee : 0),
              platformFee: autoPlatformFee,
              freelancerNetAmount: milestones[0].amount,
              platformRevenue: autoPlatformFee,
              status: PaymentStatus.HELD_IN_ESCROW,
              transactionRef: `ESCROW-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            },
          },
        },
        include: {
          milestones: { orderBy: { orderIndex: 'asc' } },
          payments: true,
        },
      });

      await tx.job.update({
        where: { id: jobId },
        data: { status: JobStatus.IN_PROGRESS },
      });

      return contract;
    });
  }

  async fundMilestone(clientId: string, contractId: string, milestoneId: string) {
    const contract = await this.prisma.contract.findUnique({
      where: { id: contractId },
      include: { milestones: true },
    });
    if (!contract || contract.clientId !== clientId) {
      throw new ForbiddenException('غير مصرح لك بتمويل هذه المرحلة');
    }

    const milestone = contract.milestones.find((m) => m.id === milestoneId);
    if (!milestone) throw new NotFoundException('المرحلة غير موجودة');
    if (milestone.status !== MilestoneStatus.PENDING) {
      throw new BadRequestException('المرحلة ممولة بالفعل أو مكتملة');
    }

    return this.prisma.milestone.update({
      where: { id: milestoneId },
      data: {
        status: MilestoneStatus.FUNDED_IN_ESCROW,
        escrowFundedAt: new Date(),
      },
    });
  }

  async submitMilestoneWork(
    freelancerId: string,
    contractId: string,
    milestoneId: string,
    notes: string,
    fileUrls: string[] = [],
  ) {
    const contract = await this.prisma.contract.findUnique({
      where: { id: contractId },
      include: { milestones: true },
    });
    if (!contract || contract.freelancerId !== freelancerId) {
      throw new ForbiddenException('غير مصرح لك بتسليم عمل هذا العقد');
    }

    const milestone = contract.milestones.find((m) => m.id === milestoneId);
    if (!milestone) throw new NotFoundException('المرحلة غير موجودة');

    const delivery = await this.prisma.delivery.create({
      data: {
        contractId,
        milestoneId,
        notes,
        fileUrls,
        status: DeliveryStatus.SUBMITTED,
      },
    });

    await this.prisma.milestone.update({
      where: { id: milestoneId },
      data: { status: MilestoneStatus.SUBMITTED },
    });

    return delivery;
  }

  async requestMilestoneChanges(
    clientId: string,
    contractId: string,
    deliveryId: string,
    feedback: string,
  ) {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id: deliveryId },
      include: { contract: true },
    });
    if (!delivery || delivery.contract.clientId !== clientId) {
      throw new ForbiddenException('غير مصرح لك بطلب تعديلات على هذا التسليم');
    }

    await this.prisma.delivery.update({
      where: { id: deliveryId },
      data: {
        status: DeliveryStatus.CHANGES_REQUESTED,
        clientFeedback: feedback,
        reviewedAt: new Date(),
      },
    });

    return this.prisma.milestone.update({
      where: { id: delivery.milestoneId },
      data: { status: MilestoneStatus.REVISION_REQUESTED },
    });
  }

  async approveMilestoneAndRelease(
    clientId: string,
    contractId: string,
    milestoneId: string,
    deliveryId: string,
  ) {
    const contract = await this.prisma.contract.findUnique({
      where: { id: contractId },
      include: { milestones: true },
    });
    if (!contract || contract.clientId !== clientId) {
      throw new ForbiddenException('غير مصرح لك باعتماد هذا التسليم');
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Accept delivery
      await tx.delivery.update({
        where: { id: deliveryId },
        data: { status: DeliveryStatus.ACCEPTED, reviewedAt: new Date() },
      });

      // 2. Approve milestone
      const approvedMilestone = await tx.milestone.update({
        where: { id: milestoneId },
        data: { status: MilestoneStatus.APPROVED },
      });

      // 3. Update freelancer earnings
      await tx.freelancerProfile.updateMany({
        where: { userId: contract.freelancerId },
        data: { totalEarnings: { increment: approvedMilestone.amount } },
      });

      // 4. Check if all milestones are completed
      const remaining = await tx.milestone.count({
        where: { contractId, status: { not: MilestoneStatus.APPROVED } },
      });

      let isContractCompleted = false;
      if (remaining === 0) {
        isContractCompleted = true;
        await tx.contract.update({
          where: { id: contractId },
          data: {
            status: ContractStatus.COMPLETED,
            completedAt: new Date(),
          },
        });

        await tx.job.update({
          where: { id: contract.jobId },
          data: { status: JobStatus.COMPLETED },
        });

        // Record 50$ Fixed Platform Fee as finalized platform revenue
        await tx.payment.updateMany({
          where: { contractId, status: PaymentStatus.HELD_IN_ESCROW },
          data: {
            status: PaymentStatus.RELEASED,
            releasedAt: new Date(),
          },
        });

        await tx.freelancerProfile.updateMany({
          where: { userId: contract.freelancerId },
          data: {
            completedJobsCount: { increment: 1 },
            jobSuccessScore: 100, // Maintain high JSS on successful completion
          },
        });
      }

      return {
        message: 'تم اعتماد المرحلة بنجاح والإفراج عن مستحقاتها للمهندس المستقل',
        isContractCompleted,
        milestone: approvedMilestone,
      };
    });
  }

  async getContractFull(contractId: string, userId: string) {
    const contract = await this.prisma.contract.findUnique({
      where: { id: contractId },
      include: {
        client: { select: { id: true, fullName: true, email: true, avatarUrl: true } },
        freelancer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            avatarUrl: true,
            freelancerProfile: {
              include: { skills: { include: { skill: true } } },
            },
          },
        },
        milestones: {
          orderBy: { orderIndex: 'asc' },
          include: { deliveries: { orderBy: { createdAt: 'desc' } } },
        },
        payments: true,
        disputes: { include: { messages: true } },
        reviews: true,
      },
    });

    if (!contract) throw new NotFoundException('العقد غير موجود');
    if (contract.clientId !== userId && contract.freelancerId !== userId) {
      throw new ForbiddenException('غير مصرح لك باستعراض هذا العقد');
    }

    return contract;
  }
}