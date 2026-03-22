import { DISTRESS_KEYWORDS } from '../constants/safetyKeywords';

export function detectCrisisKeywords(text: string): boolean {
  if (!text || text.trim().length === 0) return false;
  const lower = text.toLowerCase();
  return DISTRESS_KEYWORDS.some((keyword) => lower.includes(keyword));
}
