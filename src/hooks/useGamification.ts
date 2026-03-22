import { useCallback } from 'react';
import {
  UserProgress,
  XP_PER_CHECKIN,
  XP_STREAK_BONUS,
  XP_JOURNAL_BONUS,
  getLevelFromXP,
  getDefaultProgress,
} from '../models/Gamification';
import { DailyLog } from '../models/DailyLog';
import { useStorage } from './useStorage';

const STORAGE_KEY = '@mindflow/gamification';

export function useGamification() {
  const { data: progress, loading, save } = useStorage<UserProgress>(
    STORAGE_KEY,
    getDefaultProgress()
  );

  const recordCheckin = useCallback(
    async (log: DailyLog, allLogs: DailyLog[]) => {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split('T')[0];

      let newStreak = progress.currentStreak;
      if (progress.lastLogDate === today) {
        // Already logged today, no streak change
      } else if (progress.lastLogDate === yesterday) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }

      let xpEarned = XP_PER_CHECKIN;
      xpEarned += Math.min(newStreak, 10) * XP_STREAK_BONUS;
      if (log.journalEntry && log.journalEntry.trim().length > 0) {
        xpEarned += XP_JOURNAL_BONUS;
      }

      const newXP = progress.xp + xpEarned;
      const newLevel = getLevelFromXP(newXP);

      // Check achievements
      const totalCheckins = allLogs.length;
      const journalCount = allLogs.filter(
        (l) => l.journalEntry && l.journalEntry.trim().length > 0
      ).length;
      const highFocusDays = allLogs.filter((l) => l.focusLevel >= 8).length;
      const lowScreenDays = allLogs.filter(
        (l) => l.screenTimeMinutes < 120
      ).length;

      const updatedAchievements = progress.achievements.map((a) => {
        if (a.unlockedAt) return a; // Already unlocked
        let met = false;
        switch (a.requirement.type) {
          case 'total_checkins':
            met = totalCheckins >= a.requirement.threshold;
            break;
          case 'streak':
            met = newStreak >= a.requirement.threshold;
            break;
          case 'high_focus_days':
            met = highFocusDays >= a.requirement.threshold;
            break;
          case 'low_screen_time':
            met = lowScreenDays >= a.requirement.threshold;
            break;
          case 'journal_entries':
            met = journalCount >= a.requirement.threshold;
            break;
          case 'level':
            met = newLevel >= a.requirement.threshold;
            break;
        }
        return met ? { ...a, unlockedAt: new Date().toISOString() } : a;
      });

      const newlyUnlocked = updatedAchievements.filter(
        (a, i) => a.unlockedAt && !progress.achievements[i].unlockedAt
      );

      const updated: UserProgress = {
        xp: newXP,
        level: newLevel,
        currentStreak: newStreak,
        longestStreak: Math.max(progress.longestStreak, newStreak),
        lastLogDate: today,
        achievements: updatedAchievements,
        completedChallenges: progress.completedChallenges,
      };

      await save(updated);

      return { xpEarned, newlyUnlocked, newStreak, newLevel };
    },
    [progress, save]
  );

  const unlockedAchievements = progress.achievements.filter(
    (a) => a.unlockedAt !== null
  );
  const lockedAchievements = progress.achievements.filter(
    (a) => a.unlockedAt === null
  );

  return {
    progress,
    loading,
    recordCheckin,
    unlockedAchievements,
    lockedAchievements,
  };
}
