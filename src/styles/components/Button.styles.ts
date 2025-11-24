import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { colors } from '@styles/theme/colors';
import { componentTypography } from '@styles/theme/typography';
import { borderRadius, dimensions, transitions } from '@styles/theme/effects';

export const GradientButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2.5), // 8px 20px - Instagram風のタイトなパディング
  fontSize: componentTypography.button.fontSize,
  fontWeight: 600,
  letterSpacing: '0',
  borderRadius: borderRadius.medium,
  background: colors.primary.gradient,
  textTransform: 'none',
  minHeight: dimensions.button.minHeight,
  color: colors.text.light,
  transition: transitions.smooth,
  boxShadow: 'none',
  
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1.25, 3), // 10px 24px
    fontSize: componentTypography.button.sm,
    minHeight: dimensions.button.sm,
  },
  
  '&:hover': {
    background: colors.primary.hover,
    boxShadow: colors.shadow.cardHover,
    transform: 'scale(1.02)',
  },
  
  '&:active': {
    transform: 'scale(0.98)',
  },
  
  '&:focus-visible': {
    outline: `2px solid ${colors.primary.main}`,
    outlineOffset: '2px',
  },
  
  '&:disabled': {
    background: colors.border.light,
    color: colors.text.tertiary,
    boxShadow: 'none',
    transform: 'none',
  },
}));
