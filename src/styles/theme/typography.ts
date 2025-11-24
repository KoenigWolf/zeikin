export const typography = {
  h1: {
    fontSize: '2rem',    // メインタイトル
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: '1.1rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },

  body1: {
    fontSize: '1rem',     // 標準テキスト
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },
} as const;

export const responsiveTypography = {
  header: {
    xs: '1.25rem', // モバイル
    sm: '1.5rem',  // タブレット
    md: '1.75rem',
  },

  title: {
    xs: '1.1rem',  // モバイル
    sm: '1.25rem', // タブレット
    md: '1.5rem',
  },

  subtitle: {
    xs: '1rem',    // モバイル
    sm: '1.1rem',  // タブレット
    md: '1.25rem',
  },
} as const;
