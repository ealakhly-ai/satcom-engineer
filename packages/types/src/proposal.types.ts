import { User } from './auth.types';
import { Job } from './job.types';

export enum ProposalStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN'
}

export interface Proposal {
  id: string;
  jobId: string;
  job?: Job;
  freelancerId: string;
  freelancer?: User;
  bidAmount: number;
  durationDays: number;
  coverLetter: string;
  attachments?: string[];
  status: ProposalStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateProposalInput {
  jobId: string;
  bidAmount: number;
  durationDays: number;
  coverLetter: string;
  attachments?: string[];
}