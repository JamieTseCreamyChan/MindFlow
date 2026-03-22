import { useCallback } from 'react';
import { DailyLog } from '../models/DailyLog';
import { STORAGE_KEYS } from '../services/storage';
import { useStorage } from './useStorage';

export function useDigitalLoad() {
  const { data: logs, loading, save } = useStorage<DailyLog[]>(
    STORAGE_KEYS.LOGS,
    []
  );

  const addLog = useCallback(
    async (log: DailyLog) => {
      // Replace if same date exists, otherwise append
      const existing = logs.findIndex((l) => l.date === log.date);
      const updated =
        existing >= 0
          ? logs.map((l, i) => (i === existing ? log : l))
          : [...logs, log];
      await save(updated);
    },
    [logs, save]
  );

  const deleteLog = useCallback(
    async (id: string) => {
      await save(logs.filter((l) => l.id !== id));
    },
    [logs, save]
  );

  const getLogByDate = useCallback(
    (date: string) => logs.find((l) => l.date === date) ?? null,
    [logs]
  );

  const getRecentLogs = useCallback(
    (days: number = 7) => {
      const sorted = [...logs].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return sorted.slice(0, days);
    },
    [logs]
  );

  const getTodayLog = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return getLogByDate(today);
  }, [getLogByDate]);

  const computeLoadScore = useCallback((log: DailyLog): number => {
    // Composite score 1-10 based on screen time, fatigue, and inverse focus
    const screenScore = Math.min(log.screenTimeMinutes / 60, 10); // 10hrs = max
    const fatigueScore = log.fatigueLevel;
    const focusScore = 11 - log.focusLevel; // Invert: low focus = high load
    return Math.round(((screenScore + fatigueScore + focusScore) / 3) * 10) / 10;
  }, []);

  return {
    logs,
    loading,
    addLog,
    deleteLog,
    getLogByDate,
    getRecentLogs,
    getTodayLog,
    computeLoadScore,
  };
}
