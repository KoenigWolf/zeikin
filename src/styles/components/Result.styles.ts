import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '@styles/theme/colors';
import { componentTypography } from '@styles/theme/typography';
import { transitions, borderRadius, dimensions, effects } from '@styles/theme/effects';

export const ResultSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3.5),
  padding: theme.spacing(3),
  background: colors.background.overlay,
  backdropFilter: effects.blur.light,
  borderRadius: theme.shape.borderRadius * borderRadius.large,
  border: `1px solid ${colors.border.light}`,
  transition: transitions.standard,
  position: 'relative',
  '&:hover': {
    background: colors.background.sectionHover,
    boxShadow: `0 6px 16px ${colors.shadow.medium}`,
    borderColor: colors.border.medium,
    transform: effects.transform.hover,
  },
  '&:last-child': {
    marginBottom: 0,
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3.5),
  },
}));

export const ResultItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
  transition: transitions.fast,
  '&:not(:last-child)': {
    borderBottom: `1px solid ${colors.border.light}`,
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  '& .label': {
    fontSize: componentTypography.label.fontSize,
    color: theme.palette.text.primary,
    fontWeight: componentTypography.label.fontWeight,
  },
  '& .value': {
    fontSize: componentTypography.value.fontSize,
    color: colors.text.primary,
    fontWeight: componentTypography.value.fontWeight,
  },
  '& .total-label': {
    fontSize: componentTypography.totalLabel.fontSize,
    color: theme.palette.text.primary,
    fontWeight: componentTypography.totalLabel.fontWeight,
  },
  '& .total-value': {
    fontSize: componentTypography.totalValue.fontSize,
    color: colors.text.secondary,
    fontWeight: componentTypography.totalValue.fontWeight,
    letterSpacing: componentTypography.totalValue.letterSpacing,
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
  marginBottom: 16,
  fontSize: componentTypography.sectionTitle.xs,
  fontWeight: componentTypography.sectionTitle.fontWeight,
  display: 'flex',
  alignItems: 'center',
  gap: dimensions.gap.icon,
  [theme.breakpoints.up('sm')]: {
    fontSize: componentTypography.sectionTitle.sm,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: componentTypography.sectionTitle.md,
  },
  '&::before': {
    fontSize: componentTypography.icon.fontSize,
  },
})) as typeof Typography;

export const HighlightedResultSection = styled(ResultSection)(() => ({
  background: colors.gradient.highlightedSection.base,
  border: `${dimensions.border.titleWidth} solid ${colors.border.medium}`,
  boxShadow: `0 4px 16px ${colors.shadow.medium}`,
  '&:hover': {
    boxShadow: `0 8px 24px ${colors.shadow.large}`,
    background: colors.gradient.highlightedSection.hover,
  },
}));

export const TakeHomeValue = styled('span')(() => ({
  color: colors.accent.success,
  fontWeight: 800,
  textShadow: colors.shadow.text.success,
}));

