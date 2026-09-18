import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrenciesService {
  private rates: Record<string, { rate: number; symbol: string }> = {
    USD: { rate: 1.0, symbol: '$' },
    SAR: { rate: 3.75, symbol: 'ر.س' },
    AED: { rate: 3.67, symbol: 'د.إ' },
    EUR: { rate: 0.92, symbol: '€' },
    GBP: { rate: 0.79, symbol: '£' },
  };

  convert(amountUsd: number, targetCurrency: string) {
    const target = this.rates[targetCurrency.toUpperCase()] || this.rates['USD'];
    const converted = amountUsd * target.rate;
    return {
      amountUsd,
      convertedAmount: Math.round(converted * 100) / 100,
      currency: targetCurrency.toUpperCase(),
      symbol: target.symbol,
      rate: target.rate,
    };
  }

  getAllRates() {
    return this.rates;
  }
}