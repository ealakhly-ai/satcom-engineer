import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ProposalStatus, JobStatus } from '@prisma/client';

import { CreateProposalDto } from './dto/create-proposal.dto';

@Injectable()
export class ProposalsService {
  constructor(private prisma: PrismaService) {}

  async create(freelancerId: string, dto: CreateProposalDto) {
    const job = await this.prisma.job.findUnique({ where: { id: dto.jobId } });
    if (!job || job.status !== JobStatus.OPEN) {
      throw new BadRequestException('لا يمكن التقديم على وظيفة مغلقة أو غير موجودة');
    }

    const existing = await this.prisma.proposal.findFirst({
      where: { jobId: dto.jobId, freelancerId },
    });
    if (existing) {
      throw new BadRequestException('لقد قمت بتقديم عرض على هذه الوظيفة مسبقاً');
    }

    return this.prisma.proposal.create({
      data: {
        jobId: dto.jobId,
        freelancerId,
        bidAmount: dto.bidAmount,
        durationDays: dto.durationDays,
        coverLetter: dto.coverLetter,
        status: ProposalStatus.PENDING,
      },
      include: {
        freelancer: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            freelancerProfile: true,
          },
        },
      },
    });
  }

  async findByJob(jobId: string) {
    return this.prisma.proposal.findMany({
      where: { jobId },
      include: {
        freelancer: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            freelancerProfile: {
              include: { skills: { include: { skill: true } } },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}