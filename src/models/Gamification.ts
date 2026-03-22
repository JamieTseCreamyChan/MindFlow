export interface UserProgress {
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastLogDate: string; // YYYY-MM-DD
  achievements: Achievement[];
  completedChallenges: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  requirement: { type: string; threshold: number };
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  targetMetric: string;
  targetValue: number;
  durationDays: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-checkin',
    title: 'First Step',
    description: 'Complete your first check-in',
    icon: '🌱',
    unlockedAt: null,
    requirement: { type: 'total_checkins', threshold: 1 },
  },
  {
    id: 'streak-3',
    title: 'Getting Started',
    description: '3-day check-in streak',
    icon: '🔥',
    unlockedAt: null,
    requirement: { type: 'streak', threshold: 3 },
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: '7-day check-in streak',
    icon: '⚡',
    unlockedAt: null,
    requirement: { type: 'streak', threshold: 7 },
  },
  {
    id: 'streak-14',
    title: 'Consistency King',
    description: '14-day check-in streak',
    icon: '👑',
    unlockedAt: null,
    requirement: { type: 'streak', threshold: 14 },
  },
  {
    id: 'streak-30',
    title: 'Monthly Master',
    description: '30-day check-in streak',
    icon: '🏆',
    unlockedAt: null,
    requirement: { type: 'streak', threshold: 30 },
  },
  {
    id: 'focus-master',
    title: 'Focus Master',
    description: 'Log focus level 8+ for 5 days',
    icon: '🧠',
    unlockedAt: null,
    requirement: { type: 'high_focus_days', threshold: 5 },
  },
  {
    id: 'digital-detox',
    title: 'Digital Detox',
    description: 'Log under 2 hours screen time',
    icon: '🧘',
    unlockedAt: null,
    requirement: { type: 'low_screen_time', threshold: 1 },
  },
  {
    id: 'journal-lover',
    title: 'Journal Lover',
    description: 'Write 10 journal entries',
    icon: '✍️',
    unlockedAt: null,
    requirement: { type: 'journal_entries', threshold: 10 },
  },
  {
    id: 'level-5',
    title: 'Rising Star',
    description: 'Reach level 5',
    icon: '⭐',
    unlockedAt: null,
    requirement: { type: 'level', threshold: 5 },
  },
  {
    id: 'level-10',
    title: 'MindFlow Pro',
    description: 'Reach level 10',
    icon: '💎',
    unlockedAt: null,
    requirement: { type: 'level', threshold: 10 },
  },
];

export const WEEKLY_CHALLENGES: Challenge[] = [
  {
    id: 'less-social',
    title: 'Social Media Diet',
    description: 'Keep social media under 1 hour for 3 days',
    icon: '📵',
    targetMetric: 'social_media_under_60',
    targetValue: 3,
    durationDays: 7,
  },
  {
    id: 'focus-week',
    title: 'Focus Mode',
    description: 'Log focus level 7+ for 5 days',
    icon: '🎯',
    targetMetric: 'focus_above_7',
    targetValue: 5,
    durationDays: 7,
  },
  {
    id: 'screen-limit',
    title: 'Screen Time Challenge',
    description: 'Stay under 4 hours screen time for 3 days',
    icon: '⏰',
    targetMetric: 'screen_under_240',
    targetValue: 3,
    durationDays: 7,
  },
  {
    id: 'journal-streak',
    title: 'Reflection Week',
    description: 'Write a journal entry 5 days in a row',
    icon: '📝',
    targetMetric: 'journal_entries',
    targetValue: 5,
    durationDays: 7,
  },
];

export const XP_PER_CHECKIN = 10;
export const XP_STREAK_BONUS = 5; // per streak day
export const XP_JOURNAL_BONUS = 5;

export function getLevelFromXP(xp: number): number {
  // Each level requires progressively more XP
  // Level 1: 0, Level 2: 50, Level 3: 150, Level 4: 300, etc.
  let level = 1;
  let threshold = 50;
  let remaining = xp;
  while (remaining >= threshold) {
    remaining -= threshold;
    level++;
    threshold += 50;
  }
  return level;
}

export function getXPForNextLevel(xp: number): { current: number; needed: number } {
  let threshold = 50;
  let remaining = xp;
  while (remaining >= threshold) {
    remaining -= threshold;
    threshold += 50;
  }
  return { current: remaining, needed: threshold };
}

export function getDefaultProgress(): UserProgress {
  return {
    xp: 0,
    level: 1,
    currentStreak: 0,
    longestStreak: 0,
    lastLogDate: '',
    achievements: ACHIEVEMENTS.map((a) => ({ ...a })),
    completedChallenges: [],
  };
}
