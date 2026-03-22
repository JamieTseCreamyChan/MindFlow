import { useCallback, useEffect } from 'react';
import { Suggestion } from '../models/Suggestion';
import { DailyLog } from '../models/DailyLog';
import { STORAGE_KEYS } from '../services/storage';
import { useStorage } from './useStorage';
import { evaluateRules } from '../services/rulesEngine';

export function useSuggestions(logs: DailyLog[]) {
  const { data: suggestions, loading, save } = useStorage<Suggestion[]>(
    STORAGE_KEYS.SUGGESTIONS,
    []
  );

  const refresh = useCallback(async () => {
    const newSuggestions = evaluateRules(logs);
    // Keep dismissed state for existing suggestions
    const merged = newSuggestions.map((s) => {
      const existing = suggestions.find((e) => e.ruleId === s.ruleId);
      return existing?.dismissed ? { ...s, dismissed: true } : s;
    });
    await save(merged);
  }, [logs, suggestions, save]);

  const dismiss = useCallback(
    async (id: string) => {
      await save(
        suggestions.map((s) => (s.id === id ? { ...s, dismissed: true } : s))
      );
    },
    [suggestions, save]
  );

  const activeSuggestions = suggestions.filter((s) => !s.dismissed);

  return { suggestions, activeSuggestions, loading, refresh, dismiss };
}
