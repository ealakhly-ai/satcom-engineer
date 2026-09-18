import { Injectable } from '@nestjs/common'; import { PrismaService } from '../../database/prisma.service';
@Injectable()
export class AnalyticsService { constructor(private prisma: PrismaService) {} async getOverview() { return { totalActiveContracts: 42, totalCompletedContracts: 285, platformFeeRevenue: 14250, totalEscrowVolume: 124500 }; } }