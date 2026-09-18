import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('agencies')
@UseGuards(JwtAuthGuard)
export class AgenciesController {
  constructor(private agenciesService: AgenciesService) {}

  @Post()
  create(@CurrentUser() u: any, @Body() body: any) {
    return this.agenciesService.createAgency(u.id, body.name, body.tagline, body.overview);
  }

  @Get(':id/members')
  getMembers(@Param('id') id: string) {
    return this.agenciesService.getAgencyMembers(id);
  }
}