import { ApiClient } from './client';
export class DisputesApi {
  constructor(private client: ApiClient) {}

  open(contractId: string, reason: string) {
    return this.client.request(`/disputes/contract/${contractId}`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  sendMsg(dId: string, content: string) {
    return this.client.request(`/disputes/${dId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }
}