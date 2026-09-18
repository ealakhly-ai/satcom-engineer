import { ApiClient } from './client';
export class MessagesApi {
  constructor(private client: ApiClient) {}

  getConversations() {
    return this.client.request('/messages/conversations');
  }

  sendMessage(cId: string, content: string) {
    return this.client.request(`/messages/conversations/${cId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }
}