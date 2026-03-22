export interface ConsentRecord {
  id: string;
  consentedAt: string;
  version: string;
  dataCollection: boolean;
  anonymizedReporting: boolean;
  retentionDays: number; // 30, 60, 90, or 180
  withdrawnAt: string | null;
}

export const CONSENT_VERSION = '1.0.0';
export const RETENTION_OPTIONS = [30, 60, 90, 180] as const;
