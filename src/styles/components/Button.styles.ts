import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { colors } from '@styles/theme/colors';
import { componentTypography } from '@styles/theme/typography';

export const GradientButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.75, 3),
  fontSize: componentTypography.button.fontSize,
  fontWeight: componentTypography.button.fontWeight,
  letterSpacing: componentTypography.button.letterSpacing,
  borderRadius: theme.shape.borderRadius * 2,
  background: colors.primary.gradient,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: `0 4px 12px ${colors.shadow.medium}`,
  textTransform: 'none',
  minHeight: '48px',
  '&:hover': {
    background: colors.primary.hover,
    boxShadow: `0 6px 20px ${colors.shadow.hover}`,
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(0px)',
    boxShadow: `0 2px 8px ${colors.shadow.medium}`,
  },
}));
