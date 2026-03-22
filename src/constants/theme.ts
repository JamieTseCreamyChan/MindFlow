export const Colors = {
  // Dark mode base
  background: '#0D0D1A',
  surface: 'rgba(255,255,255,0.06)',
  surfaceElevated: 'rgba(255,255,255,0.10)',
  surfaceSolid: '#1A1A2E',

  // Text
  textPrimary: '#F0F0F5',
  textSecondary: '#A0A0B8',
  textMuted: '#6B6B80',

  // Borders
  border: 'rgba(255,255,255,0.08)',
  divider: 'rgba(255,255,255,0.06)',

  // Gradients
  gradientPurple: '#7C3AED',
  gradientBlue: '#3B82F6',
  gradientTeal: '#06B6D4',
  gradientPink: '#EC4899',

  // Status colors
  primary: '#7C3AED',
  primaryLight: '#A78BFA',
  primaryDark: '#5B21B6',
  secondary: '#06B6D4',
  secondaryLight: '#67E8F9',
  warning: '#F59E0B',
  warningLight: '#FCD34D',
  danger: '#EF4444',
  dangerLight: '#FCA5A5',
  success: '#10B981',
  successLight: '#6EE7B7',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.6)',

  // Glass
  glass: 'rgba(255,255,255,0.06)',
  glassBorder: 'rgba(255,255,255,0.12)',
};

export const Gradients = {
  primary: ['#7C3AED', '#3B82F6', '#06B6D4'] as const,
  accent: ['#EC4899', '#8B5CF6'] as const,
  warm: ['#F59E0B', '#EF4444'] as const,
  cool: ['#06B6D4', '#3B82F6'] as const,
  surface: ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)'] as const,
  dark: ['#1A1A2E', '#0D0D1A'] as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  md: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  glow: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
};

export const Glass = {
  background: Colors.glass,
  borderWidth: 1,
  borderColor: Colors.glassBorder,
  borderRadius: BorderRadius.lg,
};
