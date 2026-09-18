import { User } from './auth.types';
import { Job } from './job.types';
import { Proposal } from './proposal.types';

export enum ContractStatus {
  DRAFT = 'DRAFT',
  FUNDED = 'FUNDED',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  DISPUTED = 'DISPUTED',
  CANCELLED = 'CANCELLED'
}

export enum FeePayer {
  CLIENT = 'CLIENT',
  FREELANCER = 'FREELANCER',
  SPLIT = 'SPLIT'
}

export enum MilestoneStatus {
  PENDING = 'PENDING',
  FUNDED_IN_ESCROW = 'FUNDED_IN_ESCROW',
  SUBMITTED = 'SUBMITTED',
  REVISION_REQUESTED = 'REVISION_REQUESTED',
  APPROVED = 'APPROVED'
}

export interface Milestone {
  id: string;
  contractId: string;
  title: string;
  description?: string;
  amount: number;
  orderIndex: number;
  dueDate?: Date | string;
  status: MilestoneStatus;
  escrowFundedAt?: Date | string;
  deliveries?: Delivery[];
}

export enum DeliveryStatus {
  SUBMITTED = 'SUBMITTED',
  CHANGES_REQUESTED = 'CHANGES_REQUESTED',
  ACCEPTED = 'ACCEPTED'
}

export interface Delivery {
  id: string;
  contractId: string;
  milestoneId: string;
  notes: string;
  fileUrls: string[];
  status: DeliveryStatus;
  clientFeedback?: string;
  createdAt: Date | string;
  reviewedAt?: Date | string;
}

export interface Contract {
  id: string;
  jobId: string;
  job?: Job;
  proposalId?: string;
  proposal?: Proposal;
  offerId?: string;
  clientId: string;
  client?: User;
  freelancerId: string;
  freelancer?: User;
  title: string;
  totalAgreedAmount: number; // إجمالي قيمة العمل المتفق عليه
  platformFee: number;       // 50$ رسم المنصة الثابت
  feePayer: FeePayer;
  status: ContractStatus;
  milestones: Milestone[];
  deliveries: Delivery[];
  createdAt: Date | string;
  updatedAt: Date | string;
  completedAt?: Date | string;
}

export enum OfferStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  WITHDRAWN = 'WITHDRAWN'
}

export interface JobOffer {
  id: string;
  jobId: string;
  job?: Job;
  proposalId?: string;
  clientId: string;
  client?: User;
  freelancerId: string;
  freelancer?: User;
  title: string;
  totalAmount: number;
  platformFee: number;
  milestones: Array<{
    title: string;
    description?: string;
    amount: number;
    dueDate?: string;
  }>;
  terms: string;
  status: OfferStatus;
  createdAt: Date | string;
}