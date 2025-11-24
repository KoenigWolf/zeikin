import { styled } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';
import { colors } from '@styles/theme/colors';

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2.5,
  border: `1px solid ${colors.border.light}`,
  background: colors.background.card,
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
    height: '4px',
    background: colors.primary.gradient,
    borderRadius: `${theme.shape.borderRadius * 2.5}px ${theme.shape.borderRadius * 2.5}px 0 0`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    boxShadow: colors.shadow.cardHover,
    border: `1px solid ${colors.border.medium}`,
    transform: 'translateY(-2px)',
    '&::before': {
      opacity: 1,
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
