import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '@styles/theme/colors';
import { componentTypography } from '@styles/theme/typography';
import { borderRadius } from '@styles/theme/effects';

export const ResultSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  padding: theme.spacing(2),
  background: colors.background.overlay,
  backdropFilter: 'blur(8px)',
  borderRadius: borderRadius.medium,
  border: `1px solid ${colors.border.light}`,
  position: 'relative',
  
  '&:hover': {
    background: colors.background.sectionHover,
    boxShadow: colors.shadow.paper,
    borderColor: colors.border.medium,
  },
  
  '&:last-child': {
    marginBottom: 0,
  },
  
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2.5),
    marginBottom: theme.spacing(3),
  },
  
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3.5),
  },
}));

export const ResultItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.25, 0),
  minHeight: '44px',  // タッチデバイス対応
  
  '&:not(:last-child)': {
    borderBottom: `1px solid ${colors.border.light}`,
    paddingBottom: theme.spacing(1.25),
    marginBottom: theme.spacing(1),
  },
  
  '& .label': {
    fontSize: componentTypography.label.fontSize,
    color: colors.text.secondary,
    fontWeight: componentTypography.label.fontWeight,
    lineHeight: 1.5,
    
    [theme.breakpoints.up('sm')]: {
      fontSize: componentTypography.label.sm,
    },
  },
  
  '& .value': {
    fontSize: componentTypography.value.fontSize,
    color: colors.text.primary,
    fontWeight: componentTypography.value.fontWeight,
    fontVariantNumeric: 'tabular-nums',
    
    [theme.breakpoints.up('sm')]: {
      fontSize: componentTypography.value.sm,
    },
  },
  
  '& .total-label': {
    fontSize: componentTypography.totalLabel.fontSize,
    color: colors.text.primary,
    fontWeight: componentTypography.totalLabel.fontWeight,
    
    [theme.breakpoints.up('sm')]: {
      fontSize: componentTypography.totalLabel.sm,
    },
  },
  
  '& .total-value': {
    fontSize: componentTypography.totalValue.fontSize,
    color: colors.text.primary,
    fontWeight: componentTypography.totalValue.fontWeight,
    letterSpacing: componentTypography.totalValue.letterSpacing,
    fontVariantNumeric: 'tabular-nums',
    
    [theme.breakpoints.up('sm')]: {
      fontSize: componentTypography.totalValue.sm,
    },
    
    [theme.breakpoints.up('md')]: {
      fontSize: componentTypography.totalValue.md,
    },
  },
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: colors.text.primary,
  marginBottom: theme.spacing(1.5),
  fontSize: componentTypography.sectionTitle.xs,
  fontWeight: componentTypography.sectionTitle.fontWeight,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
  
  [theme.breakpoints.up('sm')]: {
    fontSize: componentTypography.sectionTitle.sm,
    marginBottom: theme.spacing(2),
    gap: theme.spacing(1),
  },
  
  [theme.breakpoints.up('md')]: {
    fontSize: componentTypography.sectionTitle.md,
    marginBottom: theme.spacing(2.5),
  },
  
  '&::before': {
    fontSize: componentTypography.icon.fontSize,
    opacity: 0.8,
    
    [theme.breakpoints.up('sm')]: {
      fontSize: componentTypography.icon.sm,
    },
    
    [theme.breakpoints.up('md')]: {
      fontSize: componentTypography.icon.md,
    },
  },
})) as typeof Typography;

export const HighlightedResultSection = styled(ResultSection)(() => ({
  background: colors.gradient.highlightedSection.base,
  border: `1px solid ${colors.border.medium}`,
  boxShadow: colors.shadow.paper,
  
  '&:hover': {
    boxShadow: colors.shadow.cardHover,
    background: colors.gradient.highlightedSection.hover,
    borderColor: colors.border.strong,
  },
}));

export const TakeHomeValue = styled('span')(() => ({
  color: colors.accent.success,
  fontWeight: 800,
  textShadow: colors.shadow.text.success,
  background: `linear-gradient(135deg, ${colors.accent.success} 0%, ${colors.accent.successLight} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}));
