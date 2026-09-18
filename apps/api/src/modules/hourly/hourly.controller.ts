import { Controller, Post, Get, Body, Param, Query, UseGuards } from '@nestjs/common';
import { HourlyService } from './hourly.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('hourly')
@UseGuards(JwtAuthGuard)
export class HourlyController {
  constructor(private hourlyService: HourlyService) {}

  @Post('log')
  async logTime(
    @CurrentUser() user: any,
    @Body() body: { contractId: string; memo: string; durationMinutes: number },
  ) {
    return this.hourlyService.logTime(user.id, body.contractId, body.memo, body.durationMinutes);
  }

  @Get('timesheet/:contractId')
  async getTimesheet(@Param('contractId') cId: string, @Query('week') week: string) {
    return this.hourlyService.getWeeklyTimesheet(cId, week || '2026-W38');
  }
}