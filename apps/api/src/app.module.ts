import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { ProposalsModule } from './modules/proposals/proposals.module';
import { OffersModule } from './modules/offers/offers.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { DisputesModule } from './modules/disputes/disputes.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { MessagesModule } from './modules/messages/messages.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { StorageModule } from './modules/storage/storage.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { AuditModule } from './modules/audit/audit.module';
import { HourlyModule } from './modules/hourly/hourly.module';
import { KycModule } from './modules/kyc/kyc.module';
import { RecommendationsModule } from './modules/recommendations/recommendations.module';
import { AgenciesModule } from './modules/agencies/agencies.module';
import { TaxInvoicesModule } from './modules/tax-invoices/tax-invoices.module';
import { CurrenciesModule } from './modules/currencies/currencies.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    JobsModule,
    ProposalsModule,
    OffersModule,
    ContractsModule,
    DisputesModule,
    PaymentsModule,
    MessagesModule,
    ReviewsModule,
    NotificationsModule,
    StorageModule,
    AnalyticsModule,
    InvoicesModule,
    AuditModule,
    HourlyModule,
    KycModule,
    RecommendationsModule,
    AgenciesModule,
    TaxInvoicesModule,
    CurrenciesModule,
  ],
})
export class AppModule {}