import { User } from './auth.types';
import { Contract } from './contract.types';

export enum DisputeStatus {
  OPEN = 'OPEN',
  UNDER_REVIEW = 'UNDER_REVIEW',
  RESOLVED_REFUND_CLIENT = 'RESOLVED_REFUND_CLIENT',
  RESOLVED_PAY_FREELANCER = 'RESOLVED_PAY_FREELANCER',
  RESOLVED_SPLIT = 'RESOLVED_SPLIT',
  CANCELLED = 'CANCELLED'
}

export interface Dispute {
  id: string;
  contractId: string;
  contract?: Contract;
  milestoneId?: string;
  initiatorId: string;
  initiator?: User;
  reason: string;
  status: DisputeStatus;
  adminResolutionNotes?: string;
  refundAmount?: number;
  payoutAmount?: number;
  createdAt: Date | string;
  resolvedAt?: Date | string;
  messages: DisputeMessage[];
}

export interface DisputeMessage {
  id: string;
  disputeId: string;
  senderId: string;
  sender?: User;
  content: string;
  fileUrls: string[];
  createdAt: Date | string;
}