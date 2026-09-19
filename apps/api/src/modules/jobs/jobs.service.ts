import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { JobStatus, JobType } from '@prisma/client';

import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(clientId: string, dto: CreateJobDto) {
    // connect or create skills
    const job = await this.prisma.job.create({
      data: {
        clientId,
        title: dto.title,
        description: dto.description,
        budget: dto.budget,
        jobType: dto.jobType || JobType.FIXED_PRICE,
        estimatedDuration: dto.estimatedDuration,
        status: JobStatus.OPEN,
      },
      include: {
        client: {
          select: { id: true, fullName: true, avatarUrl: true },
        },
      },
    });

    if (dto.skillNames && dto.skillNames.length > 0) {
      for (const skillName of dto.skillNames) {
        const skill = await this.prisma.skill.upsert({
          where: { name: skillName.trim() },
          update: {},
          create: { name: skillName.trim() },
        });

        await this.prisma.jobSkill.create({
          data: { jobId: job.id, skillId: skill.id },
        });
      }
    }

    // increment client posted count
    await this.prisma.clientProfile.updateMany({
      where: { userId: clientId },
      data: { jobsPostedCount: { increment: 1 } },
    });

    return this.findOne(job.id);
  }

  async findAll(status: JobStatus = JobStatus.OPEN, search?: string) {
    return this.prisma.job.findMany({
      where: {
        status,
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      include: {
        client: { select: { id: true, fullName: true, avatarUrl: true } },
        skills: { include: { skill: true } },
        _count: { select: { proposals: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        client: { select: { id: true, fullName: true, avatarUrl: true } },
        skills: { include: { skill: true } },
        _count: { select: { proposals: true } },
      },
    });
    if (!job) throw new NotFoundException('الوظيفة غير موجودة');
    return job;
  }
}