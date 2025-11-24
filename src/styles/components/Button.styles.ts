import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { colors } from '@styles/theme/colors';
import { componentTypography } from '@styles/theme/typography';
import { transitions, borderRadius, dimensions, effects } from '@styles/theme/effects';

export const GradientButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.75, 3),
  fontSize: componentTypography.button.fontSize,
  fontWeight: componentTypography.button.fontWeight,
  letterSpacing: componentTypography.button.letterSpacing,
  borderRadius: theme.shape.borderRadius * borderRadius.medium,
  background: colors.primary.gradient,
  transition: transitions.standard,
  boxShadow: `0 4px 12px ${colors.shadow.medium}`,
  textTransform: 'none',
  minHeight: dimensions.button.minHeight,
  '&:hover': {
    background: colors.primary.hover,
    boxShadow: `0 6px 20px ${colors.shadow.hover}`,
    transform: effects.transform.hover,
  },
  '&:active': {
    transform: effects.transform.reset,
    boxShadow: `0 2px 8px ${colors.shadow.medium}`,
  },
}));
