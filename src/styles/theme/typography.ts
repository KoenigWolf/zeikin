export const typography = {
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.4,
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
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.6,
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
    sm: '1.5rem',
    md: '1.75rem',
  },
  subtitle: {
    xs: '1rem',
    sm: '1.125rem',
    md: '1.25rem',
  },
} as const;

export const componentTypography = {
  appTitle: {
    xs: '1.75rem',
    sm: '2rem',
    md: '2.25rem',
    fontWeight: 700,
    letterSpacing: '0.02em',
  },
  resultTitle: {
    xs: '1.25rem',
    sm: '1.375rem',
    md: '1.5rem',
    fontWeight: 600,
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
    fontSize: '1rem',
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
    fontSize: '1.5rem',
    sm: '1.625rem',
    md: '1.75rem',
    fontWeight: 800,
    letterSpacing: '-0.01em',
  },
  formLabel: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  icon: {
    fontSize: '1.25rem',
  },
} as const;
