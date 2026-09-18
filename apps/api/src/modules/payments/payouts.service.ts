import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { StripeGatewayService } from './gateways/stripe.service';
import { PaypalGatewayService } from './gateways/paypal.service';
import { PayoutMethod, PayoutStatus } from '@satcom/types';

@Injectable()
export class PayoutsService {
  constructor(
    private prisma: PrismaService,
    private stripeService: StripeGatewayService,
    private paypalService: PaypalGatewayService,
  ) {}

  async requestPayout(freelancerId: string, amount: number, method: PayoutMethod, destination: string) {
    if (amount < 50) {
      throw new BadRequestException('الحد الأدنى لسحب الأرباح هو 50 دولاراً أمريكياً');
    }

    const profile = await this.prisma.freelancerProfile.findUnique({
      where: { userId: freelancerId },
    });

    if (!profile || profile.totalEarnings < amount) {
      throw new BadRequestException('الرصيد المتاح غير كافٍ لإتمام عملية السحب');
    }

    let gatewayResult: any;
    if (method === PayoutMethod.PAYPAL) {
      gatewayResult = await this.paypalService.payoutToEmail(destination, amount);
    } else {
      gatewayResult = await this.stripeService.transferToFreelancer(destination, amount, 'WITHDRAWAL');
    }

    // Deduct from available earnings
    await this.prisma.freelancerProfile.update({
      where: { userId: freelancerId },
      data: { totalEarnings: { decrement: amount } },
    });

    return {
      payoutId: `PO-${Date.now()}`,
      amount,
      method,
      destination,
      status: PayoutStatus.COMPLETED,
      gatewayDetails: gatewayResult,
      timestamp: new Date(),
    };
  }
}