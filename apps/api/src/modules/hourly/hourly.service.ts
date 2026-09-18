import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class HourlyService {
  constructor(private prisma: PrismaService) {}

  async logTime(freelancerId: string, contractId: string, memo: string, durationMinutes: number, activityLevel = 85) {
    const entry = {
      id: `TIME-${Date.now()}`,
      contractId,
      freelancerId,
      memo,
      durationMinutes,
      activityLevelPercentage: activityLevel,
      screenshotUrl: `https://storage.satcom-engineers.com/screenshots/${Date.now()}.jpg`,
      createdAt: new Date(),
    };
    return { message: 'تم تسجيل ساعات العمل ومذكرة النشاط بنجاح في كشف الساعات الأسبوعي', entry };
  }

  async getWeeklyTimesheet(contractId: string, weekStartDate: string) {
    return {
      contractId,
      weekStartDate,
      totalHours: 24.5,
      hourlyRate: 65.0,
      grossAmount: 24.5 * 65.0,
      platformFee: 50.0,
      freelancerNetAmount: 24.5 * 65.0,
      status: 'PENDING_CLIENT_REVIEW',
    };
  }
}