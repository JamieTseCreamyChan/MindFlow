import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, removeItem } from '../services/storage';

export function useStorage<T>(key: string, defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await getItem<T>(key);
      if (stored !== null) setData(stored);
      setLoading(false);
    })();
  }, [key]);

  const save = useCallback(
    async (value: T) => {
      setData(value);
      await setItem(key, value);
    },
    [key]
  );

  const remove = useCallback(async () => {
    setData(defaultValue);
    await removeItem(key);
  }, [key, defaultValue]);

  return { data, loading, save, remove };
}
