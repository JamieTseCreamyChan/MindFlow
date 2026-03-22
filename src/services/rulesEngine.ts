import { DailyLog } from '../models/DailyLog';
import { Suggestion } from '../models/Suggestion';
import { v4 as uuid } from 'uuid';

interface Rule {
  id: string;
  name: string;
  condition: (logs: DailyLog[]) => boolean;
  suggestion: {
    title: string;
    description: string;
    serviceLink: string;
    serviceName: string;
    priority: Suggestion['priority'];
    ruleId: string;
  };
}

const RULES: Rule[] = [
  {
    id: 'high-screen-time',
    name: 'High Screen Time',
    condition: (logs) => {
      if (logs.length < 3) return false;
      const avg =
        logs.reduce((s, l) => s + l.screenTimeMinutes, 0) / logs.length;
      return avg > 480; // 8+ hours average
    },
    suggestion: {
      title: 'Consider a Digital Detox',
      description:
        'Your average screen time has been over 8 hours. Consider scheduling screen-free breaks to recharge.',
      serviceLink: 'https://www.monash.edu/students/support/wellbeing',
      serviceName: 'Monash Wellbeing',
      priority: 'medium',
      ruleId: 'high-screen-time',
    },
  },
  {
    id: 'rising-fatigue',
    name: 'Rising Fatigue',
    condition: (logs) => {
      if (logs.length < 3) return false;
      const sorted = [...logs].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      const recent = sorted.slice(-3);
      return recent.every(
        (l, i) => i === 0 || l.fatigueLevel >= recent[i - 1].fatigueLevel
      ) && recent[recent.length - 1].fatigueLevel >= 6;
    },
    suggestion: {
      title: 'Your Fatigue is Increasing',
      description:
        'Your digital fatigue has been rising over the past few days. Explore study support strategies to manage your load.',
      serviceLink: 'https://www.monash.edu/learnhq',
      serviceName: 'Monash Learning Resources',
      priority: 'high',
      ruleId: 'rising-fatigue',
    },
  },
  {
    id: 'low-focus',
    name: 'Low Focus',
    condition: (logs) => {
      if (logs.length < 3) return false;
      const avg =
        logs.reduce((s, l) => s + l.focusLevel, 0) / logs.length;
      return avg < 4;
    },
    suggestion: {
      title: 'Struggling to Concentrate?',
      description:
        'Your focus levels have been low. Try structured study techniques and take regular breaks.',
      serviceLink: 'https://www.monash.edu/learnhq',
      serviceName: 'Monash Study Skills',
      priority: 'medium',
      ruleId: 'low-focus',
    },
  },
  {
    id: 'social-heavy',
    name: 'Heavy Social Media Use',
    condition: (logs) => {
      if (logs.length < 3) return false;
      const totalTime = logs.reduce((s, l) => s + l.screenTimeMinutes, 0);
      const socialTime = logs.reduce(
        (s, l) =>
          s +
          l.appBreakdown
            .filter((a) => a.category === 'social_media')
            .reduce((sum, a) => sum + a.minutesUsed, 0),
        0
      );
      return totalTime > 0 && socialTime / totalTime > 0.5;
    },
    suggestion: {
      title: 'Heavy Social Media Usage Detected',
      description:
        'Social media accounts for over half your screen time. Consider connecting with peers in person through clubs and events.',
      serviceLink: 'https://www.monash.edu/students/campus-life/clubs',
      serviceName: 'Monash Clubs & Societies',
      priority: 'low',
      ruleId: 'social-heavy',
    },
  },
  {
    id: 'high-composite',
    name: 'High Overall Digital Load',
    condition: (logs) => {
      if (logs.length < 3) return false;
      const avgFatigue =
        logs.reduce((s, l) => s + l.fatigueLevel, 0) / logs.length;
      const avgFocus =
        logs.reduce((s, l) => s + l.focusLevel, 0) / logs.length;
      const avgMood =
        logs.reduce((s, l) => s + l.moodRating, 0) / logs.length;
      // High fatigue + low focus + low mood
      return avgFatigue > 7 && avgFocus < 4 && avgMood < 2.5;
    },
    suggestion: {
      title: 'Your Digital Load is High',
      description:
        'Your overall digital well-being indicators suggest you may benefit from talking to someone. Monash counselling is free and confidential.',
      serviceLink: 'https://www.monash.edu/health/counselling',
      serviceName: 'Monash Counselling',
      priority: 'high',
      ruleId: 'high-composite',
    },
  },
];

export function evaluateRules(logs: DailyLog[]): Suggestion[] {
  // Use the most recent 7 days
  const sorted = [...logs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const recent = sorted.slice(0, 7);

  if (recent.length === 0) return [];

  return RULES.filter((rule) => rule.condition(recent)).map((rule) => ({
    id: uuid(),
    triggeredAt: new Date().toISOString(),
    dismissed: false,
    ...rule.suggestion,
  }));
}
