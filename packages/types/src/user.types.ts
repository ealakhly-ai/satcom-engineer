import { User } from './auth.types';

export interface FreelancerProfile {
  id: string;
  userId: string;
  headline: string;
  bio: string;
  hourlyRate?: number;
  yearsOfExperience: number;
  jobSuccessScore: number; // معدل نجاح المشاريع (مثلاً 100%)
  badge?: 'TOP_RATED' | 'RISING_TALENT' | 'VERIFIED_EXPERT';
  totalEarnings: number;
  completedJobsCount: number;
  ratingAverage: number;
  reviewsCount: number;
  skills: Skill[];
  portfolio: PortfolioItem[];
  certifications: Certification[];
  employmentHistory: EmploymentHistory[];
  user?: User;
}

export interface ClientProfile {
  id: string;
  userId: string;
  companyName?: string;
  industry?: string;
  totalSpent: number;
  jobsPostedCount: number;
  hiredCount: number;
  hireRatePercentage: number;
  isPaymentVerified: boolean;
  user?: User;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface PortfolioItem {
  id: string;
  profileId: string;
  title: string;
  description: string;
  category: string; // e.g., 'CST Simulation', 'Antenna Design', 'GNU Radio'
  projectUrl?: string;
  imageUrl?: string;
  fileUrls?: string[];
  createdAt: Date | string;
}

export interface Certification {
  id: string;
  profileId: string;
  title: string;
  issuer: string;
  issueYear: number;
  credentialUrl?: string;
}

export interface EmploymentHistory {
  id: string;
  profileId: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
}