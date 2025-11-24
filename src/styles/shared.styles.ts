import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import { colors } from '@styles/theme/colors';
import { container, effects } from '@styles/theme/effects';

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
  background: colors.primary.gradient,
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(2),
  boxShadow: colors.shadow.cardHover,

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2.5),
  },

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  },

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(3.5),
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 0% 0%, ${colors.background.gradientOverlay.light} 0%, transparent 40%),
      radial-gradient(circle at 100% 100%, ${colors.background.gradientOverlay.medium} 0%, transparent 50%)
    `,
    opacity: effects.opacity.semi,
    pointerEvents: 'none',
  },
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'relative',
  zIndex: 1,
  padding: theme.spacing(0, 2),

  [theme.breakpoints.up('sm')]: { 
    maxWidth: container.maxWidth.sm,
    padding: theme.spacing(0, 3),
  },
  
  [theme.breakpoints.up('md')]: { 
    maxWidth: container.maxWidth.md,
    padding: theme.spacing(0, 4),
  },
  
  [theme.breakpoints.up('lg')]: { 
    maxWidth: container.maxWidth.lg,
    padding: theme.spacing(0, 5),
  },
  
  [theme.breakpoints.up('xl')]: { 
    maxWidth: container.maxWidth.xl,
    padding: theme.spacing(0, 6),
  },
}));

export const ContentContainer = styled(StyledContainer)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),

  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },

  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

  [theme.breakpoints.up('lg')]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),

  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(3),
  },

  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(4),
  },

  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(5),
  },
}));

export const ResultGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(2.5),
  width: '100%',
  marginTop: theme.spacing(2),

  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(3),
    marginTop: theme.spacing(2.5),
  },

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(4),
    marginTop: theme.spacing(3),
  },

  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(5),
  },
}));
