import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { StripeGatewayService } from './gateways/stripe.service';
import { PaypalGatewayService } from './gateways/paypal.service';
import { PayoutsService } from './payouts.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeGatewayService, PaypalGatewayService, PayoutsService],
  exports: [PaymentsService, StripeGatewayService, PaypalGatewayService, PayoutsService],
})
export class PaymentsModule {}