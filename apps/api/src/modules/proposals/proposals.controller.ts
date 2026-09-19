import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role, User } from '@prisma/client';

@Controller('proposals')
export class ProposalsController {
  constructor(private proposalsService: ProposalsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.FREELANCER)
  @Post()
  async create(@CurrentUser() user: User, @Body() dto: CreateProposalDto) {
    return this.proposalsService.create(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('job/:jobId')
  async getByJob(@Param('jobId') jobId: string) {
    return this.proposalsService.findByJob(jobId);
  }
}