export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '2.5rem',
  xxl: '3rem',
} as const;

export const responsiveSpacing = {
  container: {
    xs: '1rem',   // モバイル
    sm: '1.5rem', // タブレット
    md: '2rem',
  },

  content: {
    xs: '1.5rem', // モバイル
    sm: '2rem',   // タブレット
    md: '2.5rem',
  },

  gap: {
    xs: '1rem',   // モバイル
    sm: '1.5rem', // タブレット
    md: '2rem',   // デスクトップ
  },
} as const;
