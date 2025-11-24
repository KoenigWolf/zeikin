import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import { colors } from '@styles/theme/colors';
import { container } from '@styles/theme/effects';

export const RootBox = styled(Box)(() => ({
  background: colors.background.main,
  minHeight: '100vh',
  minWidth: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
}));

export const GradientBox = styled(Box)(({ theme }) => ({
  background: colors.background.card, // Instagram風の白背景
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(1.5), // 12px - Instagram風のタイトなスペーシング
  borderBottom: `1px solid ${colors.border.light}`, // Instagram風のボーダー

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2), // 16px
  },

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2), // 16px
  },

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(2.5), // 20px
  },
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'relative',
  zIndex: 1,
  padding: theme.spacing(0, 1.5), // 12px - Instagram風

  [theme.breakpoints.up('sm')]: { 
    maxWidth: container.maxWidth.sm,
    padding: theme.spacing(0, 2), // 16px
  },
  
  [theme.breakpoints.up('md')]: { 
    maxWidth: container.maxWidth.md,
    padding: theme.spacing(0, 2.5), // 20px
  },
  
  [theme.breakpoints.up('lg')]: { 
    maxWidth: container.maxWidth.lg,
    padding: theme.spacing(0, 3), // 24px
  },
  
  [theme.breakpoints.up('xl')]: { 
    maxWidth: container.maxWidth.xl,
    padding: theme.spacing(0, 3), // 24px
  },
}));

export const ContentContainer = styled(StyledContainer)(({ theme }) => ({
  paddingTop: theme.spacing(1.5), // 12px
  paddingBottom: theme.spacing(1.5), // 12px

  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(2), // 16px
    paddingBottom: theme.spacing(2), // 16px
  },

  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(2.5), // 20px
    paddingBottom: theme.spacing(2.5), // 20px
  },

  [theme.breakpoints.up('lg')]: {
    paddingTop: theme.spacing(3), // 24px
    paddingBottom: theme.spacing(3), // 24px
  },
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2), // 16px - Instagram風のタイトなgap

  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(2), // 16px
  },

  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(2.5), // 20px
  },

  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(3), // 24px
  },
}));

export const ResultGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(2), // 16px
  width: '100%',
  marginTop: theme.spacing(1.5), // 12px

  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(2), // 16px
    marginTop: theme.spacing(2), // 16px
  },

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(2.5), // 20px
    marginTop: theme.spacing(2), // 16px
  },

  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(3), // 24px
  },
}));
