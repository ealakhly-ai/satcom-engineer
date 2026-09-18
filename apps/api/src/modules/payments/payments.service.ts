import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { calculatePlatformFee } from '../contracts/contracts.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  getFeeStructure(amount: number) {
    const fee = calculatePlatformFee(amount);
    return {
      freelancerAmount: amount,
      platformFee: fee,
      clientTotal: amount + fee,
      rule: 'تحسب العمولة تلقائياً في الخلفية: 20 دولاراً بعد كل 300 دولار من قيمة العقد.',
    };
  }

  async getPlatformRevenueSummary() {
    const totalRevenue = await this.prisma.payment.aggregate({
      where: { status: 'RELEASED' },
      _sum: { platformRevenue: true, grossAmount: true, freelancerNetAmount: true },
      _count: { id: true },
    });

    return {
      completedContractsCount: totalRevenue._count.id,
      totalPlatformRevenue: totalRevenue._sum.platformRevenue || 0,
      totalGrossVolume: totalRevenue._sum.grossAmount || 0,
      totalFreelancerPayouts: totalRevenue._sum.freelancerNetAmount || 0,
    };
  }
}