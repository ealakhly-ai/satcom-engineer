import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getFreelancers(search?: string, skill?: string) {
    return this.prisma.freelancerProfile.findMany({
      where: {
        ...(search
          ? {
              OR: [
                { headline: { contains: search, mode: 'insensitive' } },
                { bio: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
        ...(skill
          ? {
              skills: {
                some: { skill: { name: { contains: skill, mode: 'insensitive' } } },
              },
            }
          : {}),
      },
      include: {
        user: { select: { id: true, fullName: true, avatarUrl: true } },
        skills: { include: { skill: true } },
        portfolio: true,
      },
    });
  }

  async getFreelancerById(id: string) {
    const profile = await this.prisma.freelancerProfile.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, fullName: true, avatarUrl: true, createdAt: true } },
        skills: { include: { skill: true } },
        portfolio: true,
      },
    });
    if (!profile) throw new NotFoundException('الملف الشخصي غير موجود');
    return profile;
  }
}