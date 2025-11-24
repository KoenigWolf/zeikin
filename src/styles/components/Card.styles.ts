import { styled } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';
import { colors } from '../theme/colors';

export const StyledCard = styled(Card)(({ theme }) => {
  const baseStyles = {
    borderRadius: theme.shape.borderRadius * 2,
    border: `1px solid ${colors.border.medium}`,
    background: colors.background.card,
    backdropFilter: 'blur(10px)',
    transition: 'box-shadow 0.2s ease',
    overflow: 'visible',
    width: '100%',
  };

  const hoverStyles = {
    boxShadow: `0 8px 16px ${colors.shadow.medium}`,
    border: `1px solid ${colors.border.hover}`,
  };

  return {
    ...baseStyles,
    '&:hover': hoverStyles,
  };
});

export const StyledCardContent = styled(CardContent)(({ theme }) => {
  const basePadding = theme.spacing(3);
  const responsivePadding = theme.spacing(4);

  return {
    padding: basePadding,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

    '&:last-child': {
      paddingBottom: basePadding,
    },

    [theme.breakpoints.up('sm')]: {
      padding: responsivePadding,
      '&:last-child': {
        paddingBottom: responsivePadding,
      },
    },
  };
});
