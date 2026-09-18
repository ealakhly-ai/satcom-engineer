export interface JobMatchScore {
  jobId: string;
  freelancerId: string;
  overallScore: number; // 0 - 100
  factors: {
    skillsMatchScore: number;
    experienceScore: number;
    jssScore: number;
    budgetAffinityScore: number;
  };
  highlightedMatchingSkills: string[];
}