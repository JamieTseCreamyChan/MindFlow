export interface Suggestion {
  id: string;
  triggeredAt: string;
  ruleId: string;
  title: string;
  description: string;
  serviceLink: string;
  serviceName: string;
  priority: 'low' | 'medium' | 'high';
  dismissed: boolean;
}
