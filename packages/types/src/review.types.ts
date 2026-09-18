import { User } from './auth.types';

export interface Review {
  id: string;
  contractId: string;
  reviewerId: string;
  reviewer?: User;
  revieweeId: string;
  reviewee?: User;
  rating: number; // 1 to 5
  feedback: string;
  createdAt: Date | string;
}