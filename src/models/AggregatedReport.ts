export interface AggregatedReport {
  generatedAt: string;
  periodStart: string;
  periodEnd: string;
  participantCount: number;
  anonymousId: string;
  averageScreenTime: number;
  averageFatigueLevel: number;
  averageFocusLevel: number;
  averageMoodRating: number;
  totalEntries: number;
  topCategories: { category: string; avgMinutes: number }[];
  surveyAggregates: { questionId: string; avgScore: number }[];
}
