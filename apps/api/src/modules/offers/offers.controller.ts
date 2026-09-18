import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { OffersService, CreateOfferDto } from './offers.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('offers')
@UseGuards(JwtAuthGuard)
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Post()
  async sendOffer(@CurrentUser() user: User, @Body() dto: CreateOfferDto) {
    return this.offersService.sendOffer(user.id, dto);
  }

  @Post(':id/accept')
  async acceptOffer(@CurrentUser() user: User, @Param('id') offerId: string) {
    return this.offersService.acceptOffer(user.id, offerId);
  }

  @Get()
  async getOffers(@CurrentUser() user: User) {
    return this.offersService.getMyOffers(user.id);
  }
}