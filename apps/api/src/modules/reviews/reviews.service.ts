import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ContractStatus } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async createReview(reviewerId: string, contractId: string, rating: number, feedback: string) {
    const contract = await this.prisma.contract.findUnique({
      where: { id: contractId },
    });

    if (!contract || contract.status !== ContractStatus.COMPLETED) {
      throw new BadRequestException('لا يمكن تقييم عقد لم يكتمل بعد');
    }

    const revieweeId = contract.clientId === reviewerId ? contract.freelancerId : contract.clientId;

    const review = await this.prisma.review.create({
      data: {
        contractId,
        reviewerId,
        revieweeId,
        rating,
        feedback,
      },
    });

    // Update Freelancer average rating if reviewee is freelancer
    const allReviews = await this.prisma.review.findMany({
      where: { revieweeId },
    });

    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await this.prisma.freelancerProfile.updateMany({
      where: { userId: revieweeId },
      data: {
        ratingAverage: Math.round(avg * 10) / 10,
        reviewsCount: allReviews.length,
      },
    });

    return review;
  }
}