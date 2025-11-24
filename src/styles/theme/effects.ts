export const transitions = {
  standard: 'none',
  fast: 'none',
  slow: 'none',
  opacity: 'none',
  transform: 'none',
  smooth: 'none',
} as const;

export const animations = {
  fadeIn: {
    timeout: 0,
  },
  slideUp: {
    timeout: 0,
  },
  hover: {
    translateY: '0px',
    translateYReset: '0px',
    scale: '1',
    scaleReset: '1',
  },
} as const;

export const effects = {
  blur: {
    light: 'blur(8px)',
    medium: 'blur(12px)',
    heavy: 'blur(16px)',
  },
  opacity: {
    hidden: 0,
    visible: 1,
    semi: 0.95,
    light: 0.7,
  },
  transform: {
    hover: 'none',
    reset: 'none',
    scale: 'none',
  },
} as const;

export const borderRadius = {
  tiny: '4px',
  small: '8px',
  medium: '12px',
  large: '16px',
  extraLarge: '20px',
  round: '50%',
} as const;

export const dimensions = {
  button: {
    minHeight: '48px',
  },
  card: {
    accentLineHeight: '3px',
  },
  border: {
    focusWidth: '2px',
    titleWidth: '1px',
  },
  gap: {
    icon: 10,
  },
} as const;

export const container = {
  maxWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const;
