import { Module } from '@nestjs/common';
import { TaxInvoicesService } from './tax-invoices.service';
import { TaxInvoicesController } from './tax-invoices.controller';

@Module({ controllers: [TaxInvoicesController], providers: [TaxInvoicesService], exports: [TaxInvoicesService] })
export class TaxInvoicesModule {}