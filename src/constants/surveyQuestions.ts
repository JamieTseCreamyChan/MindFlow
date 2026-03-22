export interface SurveyQuestion {
  id: string;
  text: string;
  category: 'belonging' | 'load' | 'connection' | 'balance';
}

export const BASELINE_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'db-1',
    text: 'I feel connected to my peers through digital tools and platforms.',
    category: 'belonging',
  },
  {
    id: 'db-2',
    text: 'I feel included in online discussions and group activities.',
    category: 'belonging',
  },
  {
    id: 'db-3',
    text: 'I feel comfortable reaching out to others digitally when I need help.',
    category: 'connection',
  },
  {
    id: 'db-4',
    text: 'My digital interactions contribute positively to my sense of community.',
    category: 'belonging',
  },
  {
    id: 'dl-1',
    text: 'I feel overwhelmed by the number of digital notifications I receive.',
    category: 'load',
  },
  {
    id: 'dl-2',
    text: 'I find it easy to disconnect from screens when I want to.',
    category: 'balance',
  },
  {
    id: 'dl-3',
    text: 'I feel that my screen time is well-balanced with offline activities.',
    category: 'balance',
  },
  {
    id: 'dc-1',
    text: 'I have meaningful digital interactions that enhance my university experience.',
    category: 'connection',
  },
  {
    id: 'dc-2',
    text: 'I feel that digital tools support rather than hinder my learning.',
    category: 'connection',
  },
  {
    id: 'dl-4',
    text: 'I feel in control of how I spend my time online.',
    category: 'balance',
  },
];

export const LIKERT_LABELS = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
];
