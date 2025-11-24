export const typography = {
  h1: {
    fontSize: '1.5rem',    // 24px - Instagramの見出しサイズ
    sm: '1.75rem',         // 28px
    md: '2rem',            // 32px
    fontWeight: 600,       // Instagramは600を使用
    lineHeight: 1.2,
    letterSpacing: '0',
  },
  h2: {
    fontSize: '1.25rem',   // 20px
    sm: '1.5rem',          // 24px
    md: '1.75rem',         // 28px
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: '0',
  },
  h3: {
    fontSize: '1.125rem',  // 18px
    sm: '1.25rem',         // 20px
    md: '1.5rem',          // 24px
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '0',
  },
  h4: {
    fontSize: '1rem',      // 16px
    sm: '1.125rem',        // 18px
    md: '1.25rem',         // 20px
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '0.9375rem', // 15px
    sm: '1rem',            // 16px
    md: '1.125rem',        // 18px
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h6: {
    fontSize: '0.875rem',  // 14px
    sm: '0.9375rem',       // 15px
    md: '1rem',            // 16px
    fontWeight: 600,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem',      // 16px - Instagramの本文サイズ
    sm: '1rem',            // 16px
    md: '1rem',            // 16px
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',  // 14px - Instagramのキャプションサイズ
    sm: '0.875rem',        // 14px
    md: '0.875rem',        // 14px
    fontWeight: 400,
    lineHeight: 1.5,
  },
} as const;

export const responsiveTypography = {
  header: {
    xs: '1.5rem',   // 24px
    sm: '1.75rem',  // 28px
    md: '2rem',     // 32px
    lg: '2.25rem',  // 36px
  },
  title: {
    xs: '1.125rem', // 18px
    sm: '1.25rem',  // 20px
    md: '1.5rem',   // 24px
  },
  subtitle: {
    xs: '1rem',     // 16px
    sm: '1rem',     // 16px
    md: '1.125rem', // 18px
  },
} as const;

export const componentTypography = {
  appTitle: {
    xs: '1.5rem',     // 24px - Instagramの見出しサイズ
    sm: '1.75rem',    // 28px
    md: '2rem',       // 32px
    lg: '2.25rem',    // 36px
    fontWeight: 600,  // Instagramは600を使用
    letterSpacing: '0',
  },
  resultTitle: {
    xs: '1.125rem',   // 18px
    sm: '1.25rem',    // 20px
    md: '1.5rem',     // 24px
    fontWeight: 600,
  },
  sectionTitle: {
    xs: '1rem',       // 16px
    sm: '1.125rem',   // 18px
    md: '1.25rem',    // 20px
    fontWeight: 600,
  },
  button: {
    fontSize: '0.875rem', // 14px - Instagramのボタンサイズ
    sm: '0.875rem',        // 14px
    fontWeight: 600,
    letterSpacing: '0',
  },
  label: {
    fontSize: '0.875rem',  // 14px
    sm: '0.875rem',        // 14px
    fontWeight: 400,       // Instagramは通常400
  },
  value: {
    fontSize: '1rem',      // 16px
    sm: '1rem',            // 16px
    fontWeight: 400,
  },
  totalLabel: {
    fontSize: '1rem',      // 16px
    sm: '1.125rem',        // 18px
    fontWeight: 600,
  },
  totalValue: {
    fontSize: '1.25rem',   // 20px
    sm: '1.5rem',          // 24px
    md: '1.75rem',         // 28px
    fontWeight: 600,
    letterSpacing: '0',
  },
  formLabel: {
    fontSize: '0.875rem',  // 14px
    sm: '0.875rem',        // 14px
    fontWeight: 400,
  },
  icon: {
    fontSize: '1rem',      // 16px
    sm: '1.125rem',        // 18px
    md: '1.25rem',         // 20px
  },
} as const;
