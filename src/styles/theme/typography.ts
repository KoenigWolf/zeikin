export const typography = {
  h1: {
    fontSize: '2.75rem',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
  },
  h2: {
    fontSize: '2.25rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h3: {
    fontSize: '1.875rem',
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.65,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.65,
  },
} as const;

export const responsiveTypography = {
  header: {
    xs: '1.75rem',
    sm: '2rem',
    md: '2.25rem',
    lg: '2.5rem',
  },
  title: {
    xs: '1.375rem',
    sm: '1.5rem',
    md: '1.75rem',
  },
  subtitle: {
    xs: '1.125rem',
    sm: '1.25rem',
    md: '1.375rem',
  },
} as const;

export const componentTypography = {
  appTitle: {
    xs: '2rem',
    sm: '2.25rem',
    md: '2.5rem',
    fontWeight: 800,
    letterSpacing: '-0.02em',
  },
  resultTitle: {
    xs: '1.375rem',
    sm: '1.5rem',
    md: '1.625rem',
    fontWeight: 700,
  },
  sectionTitle: {
    xs: '1.125rem',
    sm: '1.25rem',
    md: '1.375rem',
    fontWeight: 600,
  },
  button: {
    fontSize: '1rem',
    fontWeight: 600,
    letterSpacing: '0.01em',
  },
  label: {
    fontSize: '0.9375rem',
    fontWeight: 500,
  },
  value: {
    fontSize: '1.125rem',
    fontWeight: 600,
  },
  totalLabel: {
    fontSize: '1.25rem',
    fontWeight: 700,
  },
  totalValue: {
    fontSize: '1.625rem',
    sm: '1.75rem',
    md: '1.875rem',
    fontWeight: 800,
    letterSpacing: '-0.01em',
  },
  formLabel: {
    fontSize: '0.9375rem',
    fontWeight: 500,
  },
  icon: {
    fontSize: '1.375rem',
  },
} as const;
