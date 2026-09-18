import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AgenciesService {
  constructor(private prisma: PrismaService) {}

  async createAgency(ownerId: string, name: string, tagline: string, overview: string) {
    return {
      id: `AGENCY-${Date.now()}`,
      name,
      tagline,
      overview,
      ownerId,
      membersCount: 1,
      totalEarnings: 0,
      createdAt: new Date(),
    };
  }

  async getAgencyMembers(agencyId: string) {
    return [
      { id: '1', name: 'م. أحمد خالد', role: 'OWNER', title: 'Lead Antenna Designer' },
      { id: '2', name: 'م. عمر فاروق', role: 'MEMBER', title: 'RF Hardware Engineer' },
      { id: '3', name: 'م. ليلى حسن', role: 'MEMBER', title: 'SDR & DSP Specialist' },
    ];
  }
}