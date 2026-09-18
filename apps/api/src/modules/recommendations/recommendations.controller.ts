import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('recommendations')
@UseGuards(JwtAuthGuard)
export class RecommendationsController {
  constructor(private recService: RecommendationsService) {}

  @Get('my-jobs')
  getMyJobs(@CurrentUser() u: any) {
    return this.recService.getRecommendedJobsForFreelancer(u.id);
  }

  @Get('job-talent/:jobId')
  getTalentForJob(@Param('jobId') jId: string) {
    return this.recService.getBestEngineersForJob(jId);
  }
}