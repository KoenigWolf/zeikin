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
    minHeight: '44px',  // タッチデバイス対応（最低44px）
    sm: '48px',         // タブレット以上
  },
  card: {
    accentLineHeight: '3px',
  },
  border: {
    focusWidth: '2px',
    titleWidth: '1px',
  },
  gap: {
    icon: 8,
    sm: 10,
  },
  input: {
    minHeight: '44px',  // タッチデバイス対応
  },
} as const;

export const container = {
  maxWidth: {
    xs: '100%',         // モバイル: 全幅
    sm: '600px',        // タブレット
    md: '768px',        // タブレット（横向き）
    lg: '1024px',       // デスクトップ
    xl: '1280px',       // 大型デスクトップ
  },
  padding: {
    xs: '16px',         // モバイル
    sm: '24px',         // タブレット
    md: '32px',         // デスクトップ
  },
} as const;
