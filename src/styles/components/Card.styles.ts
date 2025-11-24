import { styled } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';
import { colors } from '@styles/theme/colors';
import { transitions, borderRadius, dimensions, effects } from '@styles/theme/effects';

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * borderRadius.large,
  border: `1px solid ${colors.border.light}`,
  background: colors.background.card,
  backdropFilter: effects.blur.light,
  transition: transitions.standard,
  overflow: 'visible',
  width: '100%',
  boxShadow: colors.shadow.card,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: dimensions.card.accentLineHeight,
    background: colors.primary.gradient,
    borderRadius: `${theme.shape.borderRadius * borderRadius.large}px ${theme.shape.borderRadius * borderRadius.large}px 0 0`,
    opacity: effects.opacity.hidden,
    transition: transitions.opacity,
  },
  '&:hover': {
    boxShadow: colors.shadow.cardHover,
    border: `1px solid ${colors.border.medium}`,
    transform: effects.transform.hover,
    '&::before': {
      opacity: effects.opacity.visible,
    },
  },
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => {
  const basePadding = theme.spacing(3.5);
  const responsivePadding = theme.spacing(4.5);

  return {
    padding: basePadding,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    '&:last-child': {
      paddingBottom: basePadding,
    },

    [theme.breakpoints.up('sm')]: {
      padding: responsivePadding,
      gap: theme.spacing(2.5),
      '&:last-child': {
        paddingBottom: responsivePadding,
      },
    },
  };
});
