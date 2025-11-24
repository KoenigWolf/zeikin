import { styled } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';
import { colors } from '@styles/theme/colors';
import { borderRadius } from '@styles/theme/effects';

export const StyledCard = styled(Card)(() => ({
  borderRadius: borderRadius.medium,
  border: `1px solid ${colors.border.light}`,
  background: colors.background.card,
  overflow: 'hidden',
  width: '100%',
  boxShadow: colors.shadow.card,
  position: 'relative',
  
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
    padding: theme.spacing(2), // 16px - Instagram風のタイトなパディング
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5), // 12px

    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2.5), // 20px
      gap: theme.spacing(2), // 16px
      '&:last-child': {
        paddingBottom: theme.spacing(2.5),
      },
    },

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3), // 24px
      gap: theme.spacing(2), // 16px
      '&:last-child': {
        paddingBottom: theme.spacing(3),
      },
    },
  };
});
