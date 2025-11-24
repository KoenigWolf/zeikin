export const transitions = {
  standard: 'all 0.2s ease-in-out',
  fast: 'all 0.15s ease-in-out',
  slow: 'all 0.3s ease-in-out',
  opacity: 'opacity 0.2s ease-in-out',
  transform: 'transform 0.2s ease-in-out',
  smooth: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const animations = {
  fadeIn: {
    timeout: 200,
  },
  slideUp: {
    timeout: 300,
  },
  hover: {
    translateY: '-2px',
    translateYReset: '0px',
    scale: '1.02',
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
    hover: 'translateY(-2px) scale(1.01)',
    reset: 'translateY(0) scale(1)',
    scale: 'scale(1.02)',
  },
} as const;

export const borderRadius = {
  tiny: '6px',
  small: '12px',
  medium: '16px', // Instagram風の丸み
  large: '20px',
  extraLarge: '24px',
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
