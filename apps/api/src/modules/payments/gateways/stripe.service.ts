import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { calculatePlatformFee } from '../../contracts/contracts.service';

@Injectable()
export class StripeGatewayService {
  private stripeSecretKey: string;

  constructor(private configService: ConfigService) {
    this.stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY', 'sk_test_satcom_key');
  }

  async createPaymentIntent(contractId: string, milestoneId: string | null, amount: number, isFinalMilestone = false) {
    // Automatically calculate platform fee in the backend: $20 per $300
    const fee = calculatePlatformFee(amount);
    const grossAmount = amount + fee;

    return {
      gateway: 'STRIPE',
      clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`,
      paymentIntentId: `pi_${Date.now()}`,
      grossAmount,
      currency: 'usd',
      platformFee: fee,
      freelancerAmount: amount,
      metadata: {
        contractId,
        milestoneId,
        platformFee: fee.toString(),
      },
    };
  }

  async createConnectOnboardingUrl(freelancerId: string, email: string) {
    // Stripe Connect Express onboarding link for direct bank payouts
    return {
      url: `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=ca_satcom&state=${freelancerId}&stripe_user[email]=${encodeURIComponent(email)}`,
      accountId: `acct_${freelancerId}`,
    };
  }

  async transferToFreelancer(connectAccountId: string, amount: number, contractId: string) {
    return {
      transferId: `tr_${Date.now()}`,
      amount,
      currency: 'usd',
      destination: connectAccountId,
      status: 'PAID',
    };
  }

  async handleWebhook(event: { type: string; data: { object: any } }) {
    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object;
      return {
        success: true,
        contractId: intent.metadata?.contractId,
        milestoneId: intent.metadata?.milestoneId,
        status: 'FUNDED_IN_ESCROW',
      };
    }
    return { received: true };
  }
}