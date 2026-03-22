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
  // New fields (optional for backward compat)
  journalPrompt?: string;
  journalEntry?: string;
  checkinMethod?: 'full' | 'quick';
}

export interface AppCategoryInfo {
  value: AppCategory;
  label: string;
  icon: string;
  subApps: string[];
}

export const APP_CATEGORIES: AppCategoryInfo[] = [
  { value: 'social_media', label: 'Social Media', icon: '📱', subApps: ['Instagram', 'TikTok', 'Snapchat', 'X/Twitter'] },
  { value: 'study', label: 'Study', icon: '📚', subApps: ['Moodle', 'Google Docs', 'Notion', 'Quizlet'] },
  { value: 'entertainment', label: 'Entertainment', icon: '🎬', subApps: ['YouTube', 'Netflix', 'Spotify', 'Gaming'] },
  { value: 'communication', label: 'Messaging', icon: '💬', subApps: ['WhatsApp', 'Discord', 'Messenger', 'iMessage'] },
  { value: 'productivity', label: 'Productivity', icon: '⚡', subApps: ['Email', 'Calendar', 'Notes', 'Teams'] },
  { value: 'other', label: 'Other', icon: '📲', subApps: ['Browser', 'Maps', 'Shopping', 'Other'] },
];

export const CATEGORY_COLORS: Record<AppCategory, string> = {
  social_media: '#EC4899',
  study: '#3B82F6',
  entertainment: '#8B5CF6',
  communication: '#10B981',
  productivity: '#F59E0B',
  other: '#6B7280',
};
