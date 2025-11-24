import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { colors } from '@styles/theme/colors';
import { componentTypography } from '@styles/theme/typography';
import { borderRadius, dimensions } from '@styles/theme/effects';

export const GradientButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.25, 3),
  fontSize: componentTypography.button.fontSize,
  fontWeight: componentTypography.button.fontWeight,
  letterSpacing: componentTypography.button.letterSpacing,
  borderRadius: borderRadius.medium,
  background: colors.primary.gradient,
  textTransform: 'none',
  minHeight: dimensions.button.minHeight,
  color: colors.text.light,
  
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1.5, 4),
    fontSize: componentTypography.button.sm,
    minHeight: dimensions.button.sm,
  },
  
  '&:hover': {
    background: colors.primary.hover,
    boxShadow: colors.shadow.cardHover,
  },
  
  '&:focus-visible': {
    outline: `2px solid ${colors.primary.main}`,
    outlineOffset: '2px',
  },
  
  '&:disabled': {
    background: colors.border.light,
    color: colors.text.tertiary,
    boxShadow: 'none',
  },
}));
