import React, { createContext, useContext } from 'react';
import { useConsent } from '../hooks/useConsent';
import { ConsentRecord } from '../models/ConsentRecord';

interface ConsentContextType {
  consent: ConsentRecord | null;
  loading: boolean;
  hasValidConsent: boolean;
  grantConsent: (options: {
    dataCollection: boolean;
    anonymizedReporting: boolean;
    retentionDays: number;
  }) => Promise<ConsentRecord>;
  updateConsent: (updates: Partial<Pick<ConsentRecord, 'anonymizedReporting' | 'retentionDays'>>) => Promise<void>;
  withdrawConsent: () => Promise<void>;
}

const ConsentContext = createContext<ConsentContextType | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const consentState = useConsent();

  return (
    <ConsentContext.Provider value={consentState}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsentContext() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsentContext must be used within ConsentProvider');
  return ctx;
}
