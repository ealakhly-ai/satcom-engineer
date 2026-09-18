import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Post('contract/:contractId')
  async create(
    @CurrentUser() user: User,
    @Param('contractId') contractId: string,
    @Body() body: { rating: number; feedback: string },
  ) {
    return this.reviewsService.createReview(user.id, contractId, body.rating, body.feedback);
  }
}