import { ApiClient } from './client';
export class ContractsApi {
  constructor(private client: ApiClient) {}

  getOne(id: string) {
    return this.client.request(`/contracts/${id}`);
  }

  fundMilestone(id: string, mId: string) {
    return this.client.request(`/contracts/${id}/milestones/${mId}/fund`, { method: 'POST' });
  }

  submitWork(id: string, mId: string, notes: string) {
    return this.client.request(`/contracts/${id}/milestones/${mId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ notes }),
    });
  }

  approveMilestone(id: string, mId: string, dId: string) {
    return this.client.request(`/contracts/${id}/milestones/${mId}/deliveries/${dId}/approve`, {
      method: 'POST',
    });
  }
}