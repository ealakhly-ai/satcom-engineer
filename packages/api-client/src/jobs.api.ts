import { ApiClient } from './client';
export class JobsApi {
  constructor(private client: ApiClient) {}

  getAll(params?: any) {
    return this.client.request('/jobs');
  }

  getOne(id: string) {
    return this.client.request(`/jobs/${id}`);
  }

  create(dto: any) {
    return this.client.request('/jobs', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  }
}