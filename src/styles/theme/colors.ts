export const colors = {
  primary: {
    main: '#2563EB', // より鮮やかな青
    light: '#3B82F6',
    dark: '#1E40AF',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #60A5FA 100%)',
    hover: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #93C5FD 100%)',
  },

  background: {
    main: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)',
    card: '#FFFFFF',
    overlay: 'rgba(255, 255, 255, 0.9)',
    paper: 'rgba(255, 255, 255, 0.95)',
    paperHover: '#FFFFFF',
    sectionHover: 'rgba(248, 250, 252, 0.8)',
    gradientOverlay: {
      light: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.15)',
    },
  },

  text: {
    primary: '#0F172A',
    secondary: '#475569',
    tertiary: '#64748B',
    light: '#FFFFFF',
    inverse: '#F8FAFC',
  },

  border: {
    light: 'rgba(15, 23, 42, 0.06)',
    medium: 'rgba(15, 23, 42, 0.1)',
    strong: 'rgba(15, 23, 42, 0.15)',
    paper: 'rgba(37, 99, 235, 0.12)',
    paperHover: 'rgba(37, 99, 235, 0.2)',
    hover: 'rgba(37, 99, 235, 0.25)',
  },

  shadow: {
    light: 'rgba(15, 23, 42, 0.04)',
    medium: 'rgba(15, 23, 42, 0.08)',
    large: 'rgba(15, 23, 42, 0.12)',
    hover: 'rgba(15, 23, 42, 0.16)',
    card: '0 2px 8px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)',
    cardHover: '0 8px 24px rgba(15, 23, 42, 0.1), 0 4px 8px rgba(15, 23, 42, 0.06)',
    paper: '0 4px 12px rgba(15, 23, 42, 0.08), 0 2px 4px rgba(15, 23, 42, 0.04)',
    text: {
      dark: '0 1px 2px rgba(0, 0, 0, 0.1)',
      success: '0 1px 2px rgba(34, 197, 94, 0.2)',
    },
  },
  
  gradient: {
    highlightedSection: {
      base: 'linear-gradient(135deg, rgba(37, 99, 235, 0.04) 0%, rgba(59, 130, 246, 0.06) 100%)',
      hover: 'linear-gradient(135deg, rgba(37, 99, 235, 0.06) 0%, rgba(59, 130, 246, 0.08) 100%)',
    },
  },
  
  accent: {
    success: '#22C55E',
    successLight: '#4ADE80',
    successShadow: 'rgba(34, 197, 94, 0.15)',
    highlight: 'rgba(59, 130, 246, 0.08)',
    warning: '#F59E0B',
    error: '#EF4444',
  },
} as const;
