import { useCallback } from 'react';
import { ConsentRecord, CONSENT_VERSION } from '../models/ConsentRecord';
import { STORAGE_KEYS, clearAll } from '../services/storage';
import { useStorage } from './useStorage';
import { v4 as uuid } from 'uuid';

export function useConsent() {
  const { data: consent, loading, save, remove } = useStorage<ConsentRecord | null>(
    STORAGE_KEYS.CONSENT,
    null
  );

  const grantConsent = useCallback(
    async (options: {
      dataCollection: boolean;
      anonymizedReporting: boolean;
      retentionDays: number;
    }) => {
      const record: ConsentRecord = {
        id: uuid(),
        consentedAt: new Date().toISOString(),
        version: CONSENT_VERSION,
        dataCollection: options.dataCollection,
        anonymizedReporting: options.anonymizedReporting,
        retentionDays: options.retentionDays,
        withdrawnAt: null,
      };
      await save(record);
      return record;
    },
    [save]
  );

  const updateConsent = useCallback(
    async (updates: Partial<Pick<ConsentRecord, 'anonymizedReporting' | 'retentionDays'>>) => {
      if (!consent) return;
      await save({ ...consent, ...updates });
    },
    [consent, save]
  );

  const withdrawConsent = useCallback(async () => {
    if (!consent) return;
    await save({ ...consent, withdrawnAt: new Date().toISOString() });
    // Clear all stored data on withdrawal
    await clearAll();
  }, [consent, save]);

  const hasValidConsent = consent !== null && consent.withdrawnAt === null && consent.dataCollection;

  return {
    consent,
    loading,
    hasValidConsent,
    grantConsent,
    updateConsent,
    withdrawConsent,
  };
}
