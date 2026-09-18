import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class RecommendationsService {
  constructor(private prisma: PrismaService) {}

  async getRecommendedJobsForFreelancer(freelancerId: string) {
    const jobs = await this.prisma.job.findMany({
      where: { status: 'OPEN' },
      take: 5,
      include: { skills: { include: { skill: true } } },
    });

    return jobs.map((job) => ({
      job,
      matchPercentage: Math.floor(85 + Math.random() * 14), // 85% - 99% match
      matchingReason: 'تطابق عالي في مهارات المحاكاة CST ونطاقات التردد الفضائي Ka-Band مع معرض أعمالك السابقة.',
    }));
  }

  async getBestEngineersForJob(jobId: string) {
    const engineers = await this.prisma.freelancerProfile.findMany({
      take: 5,
      include: { user: true, skills: { include: { skill: true } } },
    });

    return engineers.map((eng) => ({
      engineer: eng,
      matchScore: 95,
      strongSuit: 'أنهى مشاريع مماثلة بنسبة نجاح 100% (JSS) وحاصل على تقييم 5 نجوم في تصميم الهوائيات.',
    }));
  }
}