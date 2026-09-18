import { User } from './auth.types';

export enum AgencyRole {
  OWNER = 'OWNER',
  BUSINESS_MANAGER = 'BUSINESS_MANAGER',
  EXCLUSIVE_MEMBER = 'EXCLUSIVE_MEMBER',
  NON_EXCLUSIVE_MEMBER = 'NON_EXCLUSIVE_MEMBER'
}

export interface Agency {
  id: string;
  name: string;
  tagline: string;
  overview: string;
  logoUrl?: string;
  ownerId: string;
  owner?: User;
  membersCount: number;
  totalEarnings: number;
  jobSuccessScore: number;
  members: AgencyMember[];
  createdAt: Date | string;
}

export interface AgencyMember {
  id: string;
  agencyId: string;
  userId: string;
  user?: User;
  role: AgencyRole;
  title: string;
  joinedAt: Date | string;
}