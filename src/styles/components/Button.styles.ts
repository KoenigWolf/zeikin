import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { colors } from '@styles/theme/colors';
import { componentTypography } from '@styles/theme/typography';

export const GradientButton = styled(Button)(({ theme }) => {
  const baseStyles = {
    padding: theme.spacing(1.5),
    fontSize: componentTypography.button.fontSize,
    fontWeight: componentTypography.button.fontWeight,
    letterSpacing: componentTypography.button.letterSpacing,
    borderRadius: theme.shape.borderRadius * 1.5,
    background: colors.primary.gradient,
    transition: 'box-shadow 0.2s ease',
  };

  const hoverStyles = {
    background: colors.primary.hover,
    boxShadow: `0 4px 8px ${colors.shadow.hover}`,
  };

  const activeStyles = {
    boxShadow: 'none',
  };

  return {
    ...baseStyles,
    '&:hover': hoverStyles,
    '&:active': activeStyles,
  };
});
