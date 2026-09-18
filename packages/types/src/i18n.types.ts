export type SupportedLocale = 'ar' | 'en';
export type SupportedCurrency = 'USD' | 'SAR' | 'AED' | 'EUR' | 'GBP';

export interface ExchangeRate {
  currency: SupportedCurrency;
  rateToUsd: number; // e.g. SAR = 3.75, EUR = 0.92
  symbol: string;
}