import { User } from './auth.types';

export interface Conversation {
  id: string;
  participantIds: string[];
  participants?: User[];
  contractId?: string;
  lastMessage?: Message;
  updatedAt: Date | string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender?: User;
  content: string;
  attachments?: string[];
  isRead: boolean;
  createdAt: Date | string;
}