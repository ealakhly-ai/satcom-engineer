import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { DisputesService } from './disputes.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role, User, DisputeStatus } from '@prisma/client';

@Controller('disputes')
@UseGuards(JwtAuthGuard)
export class DisputesController {
  constructor(private disputesService: DisputesService) {}

  @Post('contract/:contractId')
  async open(
    @CurrentUser() user: User,
    @Param('contractId') contractId: string,
    @Body() body: { milestoneId?: string; reason: string },
  ) {
    return this.disputesService.openDispute(user.id, contractId, body.milestoneId || null, body.reason);
  }

  @Post(':id/messages')
  async sendMessage(
    @CurrentUser() user: User,
    @Param('id') disputeId: string,
    @Body() body: { content: string; fileUrls?: string[] },
  ) {
    return this.disputesService.sendDisputeMessage(user.id, disputeId, body.content, body.fileUrls);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post(':id/resolve')
  async resolve(
    @Param('id') disputeId: string,
    @Body() body: { resolution: DisputeStatus; adminNotes: string; refundAmount?: number; payoutAmount?: number },
  ) {
    return this.disputesService.resolveDisputeByAdmin(
      disputeId,
      body.resolution,
      body.adminNotes,
      body.refundAmount,
      body.payoutAmount,
    );
  }
}