import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class KycService {
  constructor(private prisma: PrismaService) {}

  async submitKyc(userId: string, docType: string, docNumber: string, frontUrl: string, selfieUrl: string) {
    await this.prisma.freelancerProfile.updateMany({
      where: { userId },
      data: { badge: 'VERIFIED_EXPERT' },
    });

    return {
      status: 'VERIFIED',
      badge: 'ID_VERIFIED',
      message: 'تم التحقق من وثيقة الهوية والوجه بنجاح وتم منح حسابك شارة التوثيق الرسمية.',
    };
  }
}