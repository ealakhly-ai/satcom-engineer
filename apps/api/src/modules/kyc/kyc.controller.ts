import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { KycService } from './kyc.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('kyc')
@UseGuards(JwtAuthGuard)
export class KycController {
  constructor(private kycService: KycService) {}

  @Post('submit')
  async submit(@CurrentUser() u: any, @Body() body: any) {
    return this.kycService.submitKyc(u.id, body.docType, body.docNumber, body.frontUrl, body.selfieUrl);
  }
}