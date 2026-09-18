export interface TimeEntry {
  id: string;
  contractId: string;
  freelancerId: string;
  memo: string;
  startTime: Date | string;
  endTime: Date | string;
  durationMinutes: number;
  activityLevelPercentage: number; // 0-100%
  screenshotUrl?: string;
  createdAt: Date | string;
}

export interface WeeklyTimesheet {
  id: string;
  contractId: string;
  freelancerId: string;
  weekStartDate: string;
  totalMinutes: number;
  hourlyRate: number;
  grossAmount: number;
  platformFee: number;
  freelancerNetAmount: number;
  isApproved: boolean;
  entries: TimeEntry[];
}