import { Controller, Get, Query } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private currService: CurrenciesService) {}

  @Get('convert')
  convert(@Query('amount') amount: string, @Query('target') target: string) {
    return this.currService.convert(parseFloat(amount) || 0, target || 'SAR');
  }

  @Get('rates')
  getRates() {
    return this.currService.getAllRates();
  }
}