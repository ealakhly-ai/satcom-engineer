import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ContractsService } from '../contracts/contracts.service';
import { OfferStatus } from '@prisma/client';

export interface CreateOfferDto {
  jobId: string;
  proposalId?: string;
  freelancerId: string;
  title: string;
  totalAmount: number;
  terms: string;
  milestones: Array<{
    title: string;
    description?: string;
    amount: number;
    dueDate?: Date;
  }>;
}

@Injectable()
export class OffersService {
  constructor(
    private prisma: PrismaService,
    private contractsService: ContractsService,
  ) {}

  async sendOffer(clientId: string, dto: CreateOfferDto) {
    const job = await this.prisma.job.findUnique({ where: { id: dto.jobId } });
    if (!job || job.clientId !== clientId) {
      throw new ForbiddenException('غير مصرح لك بإرسال عرض عمل لهذه الوظيفة');
    }

    return this.prisma.jobOffer.create({
      data: {
        clientId,
        freelancerId: dto.freelancerId,
        jobId: dto.jobId,
        proposalId: dto.proposalId,
        title: dto.title,
        totalAmount: dto.totalAmount,
        terms: dto.terms,
        status: OfferStatus.PENDING,
      },
      include: {
        freelancer: { select: { id: true, fullName: true, email: true } },
        job: true,
      },
    });
  }

  async acceptOffer(freelancerId: string, offerId: string) {
    const offer = await this.prisma.jobOffer.findUnique({
      where: { id: offerId },
      include: { job: true },
    });

    if (!offer || offer.freelancerId !== freelancerId) {
      throw new ForbiddenException('غير مصرح لك بقبول هذا العرض');
    }
    if (offer.status !== OfferStatus.PENDING) {
      throw new BadRequestException('هذا العرض غير متاح حالياً');
    }

    // Update Offer Status
    await this.prisma.jobOffer.update({
      where: { id: offerId },
      data: { status: OfferStatus.ACCEPTED },
    });

    // Create Active Contract with initial milestone
    const contract = await this.contractsService.createContractWithMilestones(
      offer.clientId,
      freelancerId,
      offer.jobId,
      offer.proposalId,
      offer.title,
      [
        {
          title: 'المرحلة الأولى لتنفيذ المشروع',
          amount: offer.totalAmount,
        },
      ],
    );

    return {
      message: 'تم قبول عرض العمل وبدء العقد رسمياً وحجز قيمة المرحلة في الضمان Escrow.',
      contract,
    };
  }

  async getMyOffers(userId: string) {
    return this.prisma.jobOffer.findMany({
      where: {
        OR: [{ clientId: userId }, { freelancerId: userId }],
      },
      include: {
        client: { select: { id: true, fullName: true } },
        freelancer: { select: { id: true, fullName: true } },
        job: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}