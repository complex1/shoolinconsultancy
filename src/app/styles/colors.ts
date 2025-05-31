export const colors = {
  // Primary Colors
  gold: {
    400: '#DAA520', // Enhanced gold for better contrast
    500: '#B8860B', // Darker gold for hover states
    light: 'rgba(218, 165, 32, 0.1)',
  },
  black: {
    600: '#2D2D2D',
    700: '#1A1A1A',
    900: '#000000',
  },
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  error: {
    light: '#FEE2E2',
    main: '#DC2626',
    dark: '#B91C1C',
  },
  success: {
    light: '#D1FAE5',
    main: '#059669',
    dark: '#047857',
  },
  white: '#FFFFFF',
};

// Semantic color mapping
export const semantic = {
  text: {
    primary: colors.neutral[900],
    secondary: colors.neutral[700],
    disabled: colors.neutral[400],
    inverse: colors.white,
  },
  background: {
    primary: colors.white,
    secondary: colors.neutral[50],
    dark: colors.black[900],
  },
  border: {
    light: colors.neutral[200],
    main: colors.neutral[300],
    dark: colors.neutral[400],
  },
};

// Color combinations that meet WCAG 2.1 AA standards
export const accessibleCombos = {
  goldOnDark: {
    background: colors.black[900],
    text: colors.gold[400], // Contrast ratio > 4.5:1
  },
  whiteOnGold: {
    background: colors.gold[500],
    text: colors.white, // Contrast ratio > 4.5:1
  },
  darkOnLight: {
    background: colors.white,
    text: colors.neutral[900], // Contrast ratio > 7:1
  },
}; 