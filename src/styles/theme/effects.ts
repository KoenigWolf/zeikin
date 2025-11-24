export const transitions = {
  standard: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 0.2s ease',
  opacity: 'opacity 0.3s ease',
  smooth: 'all 0.3s ease',
} as const;

export const animations = {
  fadeIn: {
    timeout: 600,
  },
  hover: {
    translateY: '-2px',
    translateYReset: '0px',
  },
} as const;

export const effects = {
  blur: {
    light: 'blur(10px)',
    medium: 'blur(12px)',
  },
  opacity: {
    hidden: 0,
    visible: 1,
    semi: 0.9,
  },
  transform: {
    hover: 'translateY(-2px)',
    reset: 'translateY(0px)',
  },
} as const;

export const borderRadius = {
  small: 1.5,
  medium: 2,
  large: 2.5,
  extraLarge: 3,
  tiny: '2px',
} as const;

export const dimensions = {
  button: {
    minHeight: '48px',
  },
  card: {
    accentLineHeight: '4px',
  },
  border: {
    focusWidth: '2px',
    titleWidth: '2px',
  },
  gap: {
    icon: 8,
  },
} as const;

export const container = {
  maxWidth: {
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1400px',
  },
} as const;

