export type AppCategory =
  | 'social_media'
  | 'study'
  | 'entertainment'
  | 'communication'
  | 'productivity'
  | 'other';

export interface AppUsageEntry {
  appName: string;
  category: AppCategory;
  minutesUsed: number;
}

export interface DailyLog {
  id: string;
  date: string; // YYYY-MM-DD
  screenTimeMinutes: number;
  appBreakdown: AppUsageEntry[];
  fatigueLevel: number; // 1-10
  focusLevel: number; // 1-10
  moodRating: number; // 1-5
  notes: string;
  createdAt: string; // ISO timestamp
}

export const APP_CATEGORIES: { value: AppCategory; label: string }[] = [
  { value: 'social_media', label: 'Social Media' },
  { value: 'study', label: 'Study Tools' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'communication', label: 'Communication' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'other', label: 'Other' },
];

export const CATEGORY_COLORS: Record<AppCategory, string> = {
  social_media: '#E74C3C',
  study: '#3498DB',
  entertainment: '#9B59B6',
  communication: '#2ECC71',
  productivity: '#F39C12',
  other: '#95A5A6',
};
