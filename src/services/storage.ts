import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  ONBOARDED: '@mindflow/onboarded',
  CONSENT: '@mindflow/consent',
  LOGS: '@mindflow/logs',
  SURVEYS: '@mindflow/surveys',
  SUGGESTIONS: '@mindflow/suggestions',
  ANONYMOUS_ID: '@mindflow/anonymous-id',
} as const;

export { KEYS as STORAGE_KEYS };

export async function getItem<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (raw === null) return null;
  return JSON.parse(raw) as T;
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

export async function clearAll(): Promise<void> {
  const keys = Object.values(KEYS);
  for (const key of keys) {
    await AsyncStorage.removeItem(key);
  }
}
