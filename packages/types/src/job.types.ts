import { User } from './auth.types';
import { Skill } from './user.types';

export enum JobStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum JobType {
  FIXED_PRICE = 'FIXED_PRICE',
  HOURLY = 'HOURLY'
}

export interface Job {
  id: string;
  clientId: string;
  client?: User;
  title: string;
  description: string;
  jobType: JobType;
  budget: number;
  estimatedDuration: string;
  status: JobStatus;
  skills: Skill[];
  proposalsCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateJobInput {
  title: string;
  description: string;
  jobType: JobType;
  budget: number;
  estimatedDuration: string;
  skillIds: string[];
}