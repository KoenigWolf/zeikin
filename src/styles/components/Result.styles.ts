import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '@styles/theme/colors';
import { componentTypography } from '@styles/theme/typography';

export const ResultSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3.5),
  padding: theme.spacing(3),
  background: colors.background.overlay,
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2.5,
  border: `1px solid ${colors.border.light}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.95)',
    boxShadow: `0 6px 16px ${colors.shadow.medium}`,
    borderColor: colors.border.medium,
    transform: 'translateY(-2px)',
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
  transition: 'all 0.2s ease',
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
  gap: 8,
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
  background: 'linear-gradient(135deg, rgba(43, 76, 140, 0.06) 0%, rgba(30, 136, 229, 0.08) 100%)',
  border: `2px solid ${colors.border.medium}`,
  boxShadow: `0 4px 16px ${colors.shadow.medium}`,
  '&:hover': {
    boxShadow: `0 8px 24px ${colors.shadow.large}`,
    background: 'linear-gradient(135deg, rgba(43, 76, 140, 0.08) 0%, rgba(30, 136, 229, 0.1) 100%)',
  },
}));

export const TakeHomeValue = styled('span')(() => ({
  color: colors.accent.success,
  fontWeight: 800,
  textShadow: '0 1px 2px rgba(76, 175, 80, 0.2)',
}));

