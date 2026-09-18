import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TaxInvoicesService } from './tax-invoices.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('tax-invoices')
@UseGuards(JwtAuthGuard)
export class TaxInvoicesController {
  constructor(private taxService: TaxInvoicesService) {}

  @Get('generate')
  generate(
    @Query('contractId') cId: string,
    @Query('subtotal') subtotal: string,
    @Query('buyerName') buyer: string,
    @Query('buyerVat') vat: string,
  ) {
    return this.taxService.generateTaxInvoice(cId, parseFloat(subtotal) || 500, buyer || 'Company Client', vat);
  }
}