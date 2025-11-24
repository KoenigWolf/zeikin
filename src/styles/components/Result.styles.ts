import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '@styles/theme/colors';
import { componentTypography } from '@styles/theme/typography';

export const ResultSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2.5),
  background: colors.background.overlay,
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${colors.border.light}`,
  transition: 'background 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.95)',
    boxShadow: `0 4px 8px ${colors.shadow.light}`,
  },
  '&:last-child': {
    marginBottom: 0,
  },
}));

export const ResultItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.5, 0),
  '&:not(:last-child)': {
    borderBottom: `1px solid ${colors.border.light}`,
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
  background: 'linear-gradient(135deg, rgba(43, 76, 140, 0.04) 0%, rgba(30, 136, 229, 0.04) 100%)',
}));

export const TakeHomeValue = styled('span')(() => ({
  color: '#4CAF50',
}));

