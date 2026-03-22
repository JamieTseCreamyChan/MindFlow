export interface MonashService {
  id: string;
  name: string;
  description: string;
  url: string;
  phone?: string;
  category: 'counselling' | 'academic' | 'wellbeing' | 'social' | 'crisis';
  isEmergency: boolean;
}

export const MONASH_SERVICES: MonashService[] = [
  {
    id: 'counselling',
    name: 'Monash Counselling Service',
    description:
      'Free, confidential counselling for all enrolled Monash students. Talk to a professional about any personal or emotional concerns.',
    url: 'https://www.monash.edu/health/counselling',
    phone: '03 9905 3020',
    category: 'counselling',
    isEmergency: false,
  },
  {
    id: 'study-skills',
    name: 'Monash Study Skills & Learning Resources',
    description:
      'Workshops, consultations, and online resources to improve your study strategies, time management, and academic skills.',
    url: 'https://www.monash.edu/learnhq',
    category: 'academic',
    isEmergency: false,
  },
  {
    id: 'wellbeing',
    name: 'Monash Wellbeing',
    description:
      'Programs and resources to support your overall well-being, including mindfulness, stress management, and healthy living.',
    url: 'https://www.monash.edu/students/support/wellbeing',
    category: 'wellbeing',
    isEmergency: false,
  },
  {
    id: 'clubs',
    name: 'Monash Clubs & Societies',
    description:
      'Join student-run clubs and societies to connect with peers, build friendships, and develop new interests.',
    url: 'https://www.monash.edu/students/campus-life/clubs',
    category: 'social',
    isEmergency: false,
  },
  {
    id: 'disability',
    name: 'Disability Support Services',
    description:
      'Support and adjustments for students with disabilities, medical conditions, or mental health conditions.',
    url: 'https://www.monash.edu/students/support/disability',
    category: 'wellbeing',
    isEmergency: false,
  },
  {
    id: 'lifeline',
    name: 'Lifeline Australia',
    description:
      'Crisis support and suicide prevention services. Available 24 hours a day, 7 days a week.',
    url: 'https://www.lifeline.org.au',
    phone: '13 11 14',
    category: 'crisis',
    isEmergency: true,
  },
  {
    id: 'beyond-blue',
    name: 'Beyond Blue',
    description:
      'Support for anxiety, depression and suicide prevention. Chat, phone, and forums available.',
    url: 'https://www.beyondblue.org.au',
    phone: '1300 22 4636',
    category: 'crisis',
    isEmergency: true,
  },
  {
    id: 'emergency',
    name: 'Emergency Services',
    description:
      'For immediate danger or medical emergencies, call 000.',
    url: 'tel:000',
    phone: '000',
    category: 'crisis',
    isEmergency: true,
  },
];

export const getServicesByCategory = (category: MonashService['category']) =>
  MONASH_SERVICES.filter((s) => s.category === category);

export const getEmergencyServices = () =>
  MONASH_SERVICES.filter((s) => s.isEmergency);

export const getNonEmergencyServices = () =>
  MONASH_SERVICES.filter((s) => !s.isEmergency);
