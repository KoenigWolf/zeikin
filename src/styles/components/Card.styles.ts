import { styled } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';
import { colors } from '@styles/theme/colors';
import { borderRadius, dimensions, effects } from '@styles/theme/effects';

export const StyledCard = styled(Card)(() => ({
  borderRadius: borderRadius.medium,
  border: `1px solid ${colors.border.light}`,
  background: colors.background.card,
  backdropFilter: effects.blur.light,
  overflow: 'hidden',
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
    borderRadius: `${borderRadius.medium} ${borderRadius.medium} 0 0`,
    opacity: effects.opacity.visible,
  },
  
  '&:hover': {
    boxShadow: colors.shadow.cardHover,
    border: `1px solid ${colors.border.medium}`,
  },
  
  '&:focus-within': {
    outline: `2px solid ${colors.primary.main}`,
    outlineOffset: '2px',
  },
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => {
  return {
    padding: theme.spacing(2.5),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    '&:last-child': {
      paddingBottom: theme.spacing(2.5),
    },

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
      gap: theme.spacing(2.5),
      '&:last-child': {
        paddingBottom: theme.spacing(3),
      },
    },

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3.5),
      gap: theme.spacing(3),
      '&:last-child': {
        paddingBottom: theme.spacing(3.5),
      },
    },
  };
});
