import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { DisputeStatus, ContractStatus } from '@prisma/client';

@Injectable()
export class DisputesService {
  constructor(private prisma: PrismaService) {}

  async openDispute(userId: string, contractId: string, milestoneId: string | null, reason: string) {
    const contract = await this.prisma.contract.findUnique({ where: { id: contractId } });
    if (!contract || (contract.clientId !== userId && contract.freelancerId !== userId)) {
      throw new ForbiddenException('غير مصرح لك بفتح نزاع على هذا العقد');
    }

    const dispute = await this.prisma.dispute.create({
      data: {
        contractId,
        milestoneId,
        initiatorId: userId,
        reason,
        status: DisputeStatus.OPEN,
      },
    });

    await this.prisma.contract.update({
      where: { id: contractId },
      data: { status: ContractStatus.DISPUTED },
    });

    return dispute;
  }

  async sendDisputeMessage(userId: string, disputeId: string, content: string, fileUrls: string[] = []) {
    return this.prisma.disputeMessage.create({
      data: {
        disputeId,
        senderId: userId,
        content,
        fileUrls,
      },
      include: {
        sender: { select: { id: true, fullName: true } },
      },
    });
  }

  async resolveDisputeByAdmin(
    disputeId: string,
    resolution: DisputeStatus,
    adminNotes: string,
    refundAmount?: number,
    payoutAmount?: number,
  ) {
    const dispute = await this.prisma.dispute.update({
      where: { id: disputeId },
      data: {
        status: resolution,
        adminResolutionNotes: adminNotes,
        refundAmount,
        payoutAmount,
        resolvedAt: new Date(),
      },
      include: { contract: true },
    });

    await this.prisma.contract.update({
      where: { id: dispute.contractId },
      data: { status: ContractStatus.COMPLETED },
    });

    return dispute;
  }
}