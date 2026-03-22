import { DailyLog } from '../models/DailyLog';
import { SurveyResponse } from '../models/SurveyResponse';
import { AggregatedReport } from '../models/AggregatedReport';
import { getItem } from './storage';
import { STORAGE_KEYS } from './storage';

export async function generateReport(
  logs: DailyLog[],
  surveys: SurveyResponse[]
): Promise<AggregatedReport | null> {
  if (logs.length === 0) return null;

  const anonymousId =
    (await getItem<string>(STORAGE_KEYS.ANONYMOUS_ID)) ?? 'unknown';

  const sorted = [...logs].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const avgScreenTime =
    logs.reduce((s, l) => s + l.screenTimeMinutes, 0) / logs.length;
  const avgFatigue =
    logs.reduce((s, l) => s + l.fatigueLevel, 0) / logs.length;
  const avgFocus =
    logs.reduce((s, l) => s + l.focusLevel, 0) / logs.length;
  const avgMood =
    logs.reduce((s, l) => s + l.moodRating, 0) / logs.length;

  // Category aggregation
  const categoryTotals: Record<string, { total: number; count: number }> = {};
  for (const log of logs) {
    for (const entry of log.appBreakdown) {
      if (!categoryTotals[entry.category]) {
        categoryTotals[entry.category] = { total: 0, count: 0 };
      }
      categoryTotals[entry.category].total += entry.minutesUsed;
      categoryTotals[entry.category].count += 1;
    }
  }

  const topCategories = Object.entries(categoryTotals)
    .map(([category, data]) => ({
      category,
      avgMinutes: Math.round(data.total / logs.length),
    }))
    .sort((a, b) => b.avgMinutes - a.avgMinutes);

  // Survey aggregation
  const surveyAggregates: { questionId: string; avgScore: number }[] = [];
  if (surveys.length > 0) {
    const questionTotals: Record<string, { total: number; count: number }> = {};
    for (const survey of surveys) {
      for (const answer of survey.responses) {
        if (!questionTotals[answer.questionId]) {
          questionTotals[answer.questionId] = { total: 0, count: 0 };
        }
        questionTotals[answer.questionId].total += answer.value;
        questionTotals[answer.questionId].count += 1;
      }
    }
    for (const [qId, data] of Object.entries(questionTotals)) {
      surveyAggregates.push({
        questionId: qId,
        avgScore: Math.round((data.total / data.count) * 10) / 10,
      });
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    periodStart: sorted[0].date,
    periodEnd: sorted[sorted.length - 1].date,
    participantCount: 1,
    anonymousId,
    averageScreenTime: Math.round(avgScreenTime),
    averageFatigueLevel: Math.round(avgFatigue * 10) / 10,
    averageFocusLevel: Math.round(avgFocus * 10) / 10,
    averageMoodRating: Math.round(avgMood * 10) / 10,
    totalEntries: logs.length,
    topCategories,
    surveyAggregates,
  };
}
