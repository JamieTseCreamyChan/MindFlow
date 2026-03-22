export interface SurveyAnswer {
  questionId: string;
  value: number; // Likert 1-5
}

export interface SurveyResponse {
  id: string;
  surveyType: 'baseline' | 'followup';
  completedAt: string;
  responses: SurveyAnswer[];
}
