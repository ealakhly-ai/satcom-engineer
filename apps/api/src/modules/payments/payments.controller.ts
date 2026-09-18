import { Controller, Get, Post, Body, Query, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { StripeGatewayService } from './gateways/stripe.service';
import { PaypalGatewayService } from './gateways/paypal.service';
import { PayoutsService } from './payouts.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User, Role } from '@prisma/client';
import { PayoutMethod } from '@satcom/types';

@Controller('payments')
export class PaymentsController {
  constructor(
    private paymentsService: PaymentsService,
    private stripeService: StripeGatewayService,
    private paypalService: PaypalGatewayService,
    private payoutsService: PayoutsService,
  ) {}

  @Get('calculate-fee')
  calculateFee(@Query('amount') amount: string) {
    const parsed = parseFloat(amount) || 0;
    return this.paymentsService.getFeeStructure(parsed);
  }

  // --- STRIPE ENDPOINTS ---
  @UseGuards(JwtAuthGuard)
  @Post('stripe/create-intent')
  async createStripeIntent(
    @Body() body: { contractId: string; milestoneId?: string; amount: number; isFinalMilestone?: boolean },
  ) {
    return this.stripeService.createPaymentIntent(
      body.contractId,
      body.milestoneId || null,
      body.amount,
      body.isFinalMilestone,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('stripe/connect-onboarding')
  async createStripeConnect(@CurrentUser() user: User) {
    return this.stripeService.createConnectOnboardingUrl(user.id, user.email);
  }

  @Post('stripe/webhook')
  async handleStripeWebhook(@Body() event: any) {
    return this.stripeService.handleWebhook(event);
  }

  // --- PAYPAL ENDPOINTS ---
  @UseGuards(JwtAuthGuard)
  @Post('paypal/create-order')
  async createPaypalOrder(
    @Body() body: { contractId: string; milestoneId?: string; amount: number; isFinalMilestone?: boolean },
  ) {
    return this.paypalService.createOrder(
      body.contractId,
      body.milestoneId || null,
      body.amount,
      body.isFinalMilestone,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('paypal/capture-order')
  async capturePaypalOrder(@Body() body: { orderId: string }) {
    return this.paypalService.captureOrder(body.orderId);
  }

  // --- PAYOUTS ENDPOINTS ---
  @UseGuards(JwtAuthGuard)
  @Post('payouts/withdraw')
  async withdrawFunds(
    @CurrentUser() user: User,
    @Body() body: { amount: number; method: PayoutMethod; destination: string },
  ) {
    return this.payoutsService.requestPayout(user.id, body.amount, body.method, body.destination);
  }

  @Get('admin/revenue-summary')
  async getRevenueSummary() {
    return this.paymentsService.getPlatformRevenueSummary();
  }
}