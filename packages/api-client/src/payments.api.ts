import { ApiClient } from './client';
export class PaymentsApi {
  constructor(private client: ApiClient) {}

  calculateFee(amount: number) {
    return this.client.request(`/payments/calculate-fee?amount=${amount}`);
  }

  getRevenueSummary() {
    return this.client.request('/payments/admin/revenue-summary');
  }
}