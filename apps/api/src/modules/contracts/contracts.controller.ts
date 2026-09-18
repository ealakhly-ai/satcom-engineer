import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('contracts')
@UseGuards(JwtAuthGuard)
export class ContractsController {
  constructor(private contractsService: ContractsService) {}

  @Get(':id')
  async getContract(@Param('id') id: string, @CurrentUser() user: User) {
    return this.contractsService.getContractFull(id, user.id);
  }

  @Post(':id/milestones/:milestoneId/fund')
  async fundMilestone(
    @CurrentUser() user: User,
    @Param('id') contractId: string,
    @Param('milestoneId') milestoneId: string,
  ) {
    return this.contractsService.fundMilestone(user.id, contractId, milestoneId);
  }

  @Post(':id/milestones/:milestoneId/submit')
  async submitWork(
    @CurrentUser() user: User,
    @Param('id') contractId: string,
    @Param('milestoneId') milestoneId: string,
    @Body() body: { notes: string; fileUrls?: string[] },
  ) {
    return this.contractsService.submitMilestoneWork(
      user.id,
      contractId,
      milestoneId,
      body.notes,
      body.fileUrls,
    );
  }

  @Post(':id/deliveries/:deliveryId/request-changes')
  async requestChanges(
    @CurrentUser() user: User,
    @Param('id') contractId: string,
    @Param('deliveryId') deliveryId: string,
    @Body() body: { feedback: string },
  ) {
    return this.contractsService.requestMilestoneChanges(
      user.id,
      contractId,
      deliveryId,
      body.feedback,
    );
  }

  @Post(':id/milestones/:milestoneId/deliveries/:deliveryId/approve')
  async approveMilestone(
    @CurrentUser() user: User,
    @Param('id') contractId: string,
    @Param('milestoneId') milestoneId: string,
    @Param('deliveryId') deliveryId: string,
  ) {
    return this.contractsService.approveMilestoneAndRelease(
      user.id,
      contractId,
      milestoneId,
      deliveryId,
    );
  }
}