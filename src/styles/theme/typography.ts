export const typography = {
  h1: {
    fontSize: '2rem',      // モバイル
    sm: '2.5rem',          // タブレット
    md: '2.75rem',         // デスクトップ
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
  },
  h2: {
    fontSize: '1.75rem',   // モバイル
    sm: '2rem',            // タブレット
    md: '2.25rem',         // デスクトップ
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h3: {
    fontSize: '1.5rem',    // モバイル
    sm: '1.75rem',         // タブレット
    md: '1.875rem',        // デスクトップ
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontSize: '1.25rem',   // モバイル
    sm: '1.375rem',        // タブレット
    md: '1.5rem',          // デスクトップ
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.125rem',  // モバイル
    sm: '1.25rem',         // タブレット
    md: '1.25rem',         // デスクトップ
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h6: {
    fontSize: '1rem',      // モバイル
    sm: '1.125rem',        // タブレット
    md: '1.125rem',       // デスクトップ
    fontWeight: 600,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '0.9375rem', // モバイル
    sm: '1rem',            // タブレット
    md: '1rem',            // デスクトップ
    fontWeight: 400,
    lineHeight: 1.65,
  },
  body2: {
    fontSize: '0.8125rem', // モバイル
    sm: '0.875rem',        // タブレット
    md: '0.875rem',        // デスクトップ
    fontWeight: 400,
    lineHeight: 1.65,
  },
} as const;

export const responsiveTypography = {
  header: {
    xs: '1.5rem',
    sm: '1.75rem',
    md: '2rem',
    lg: '2.25rem',
  },
  title: {
    xs: '1.25rem',
    sm: '1.375rem',
    md: '1.5rem',
  },
  subtitle: {
    xs: '1rem',
    sm: '1.125rem',
    md: '1.25rem',
  },
} as const;

export const componentTypography = {
  appTitle: {
    xs: '1.75rem',    // モバイル
    sm: '2rem',       // タブレット
    md: '2.25rem',   // デスクトップ
    lg: '2.5rem',    // 大型デスクトップ
    fontWeight: 800,
    letterSpacing: '-0.02em',
  },
  resultTitle: {
    xs: '1.25rem',    // モバイル
    sm: '1.375rem',   // タブレット
    md: '1.5rem',     // デスクトップ
    fontWeight: 700,
  },
  sectionTitle: {
    xs: '1rem',       // モバイル
    sm: '1.125rem',   // タブレット
    md: '1.25rem',    // デスクトップ
    fontWeight: 600,
  },
  button: {
    fontSize: '0.9375rem', // モバイル
    sm: '1rem',            // タブレット以上
    fontWeight: 600,
    letterSpacing: '0.01em',
  },
  label: {
    fontSize: '0.875rem',  // モバイル
    sm: '0.9375rem',       // タブレット以上
    fontWeight: 500,
  },
  value: {
    fontSize: '1rem',      // モバイル
    sm: '1.125rem',        // タブレット以上
    fontWeight: 600,
  },
  totalLabel: {
    fontSize: '1.125rem', // モバイル
    sm: '1.25rem',         // タブレット以上
    fontWeight: 700,
  },
  totalValue: {
    fontSize: '1.375rem', // モバイル
    sm: '1.5rem',         // タブレット
    md: '1.625rem',       // デスクトップ
    fontWeight: 800,
    letterSpacing: '-0.01em',
  },
  formLabel: {
    fontSize: '0.875rem',  // モバイル
    sm: '0.9375rem',       // タブレット以上
    fontWeight: 500,
  },
  icon: {
    fontSize: '1.125rem',  // モバイル
    sm: '1.25rem',         // タブレット
    md: '1.375rem',        // デスクトップ
  },
} as const;
