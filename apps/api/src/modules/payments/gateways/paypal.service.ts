import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { calculatePlatformFee } from '../../contracts/contracts.service';

@Injectable()
export class PaypalGatewayService {
  private clientId: string;
  private clientSecret: string;

  constructor(private configService: ConfigService) {
    this.clientId = this.configService.get<string>('PAYPAL_CLIENT_ID', 'satcom_paypal_client_id');
    this.clientSecret = this.configService.get<string>('PAYPAL_CLIENT_SECRET', 'satcom_paypal_secret');
  }

  async createOrder(contractId: string, milestoneId: string | null, amount: number, isFinalMilestone = false) {
    // Automatically calculate platform fee in the backend: $20 per $300
    const fee = calculatePlatformFee(amount);
    const grossAmount = amount + fee;

    return {
      gateway: 'PAYPAL',
      orderId: `PAYPAL-ORD-${Date.now()}`,
      approvalUrl: `https://www.sandbox.paypal.com/checkoutnow?token=EC-${Date.now()}`,
      grossAmount,
      currency: 'USD',
      platformFee: fee,
      freelancerAmount: amount,
      breakdown: {
        itemTotal: amount,
        platformFee: fee,
      },
    };
  }

  async captureOrder(orderId: string) {
    return {
      status: 'COMPLETED',
      orderId,
      captureId: `CAP-${Date.now()}`,
      fundedStatus: 'HELD_IN_ESCROW',
    };
  }

  async payoutToEmail(paypalEmail: string, amount: number) {
    return {
      payoutBatchId: `BATCH-${Date.now()}`,
      status: 'SUCCESS',
      recipient: paypalEmail,
      amount,
      currency: 'USD',
    };
  }
}