import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import { colors } from '@styles/theme/colors';

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
}));

export const GradientBox = styled(Box)(({ theme }) => ({
  background: colors.primary.gradient,
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(3),
  boxShadow: `0 4px 16px ${colors.shadow.medium}`,

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3.5),
  },

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 0% 0%, ${colors.background.gradientOverlay.light} 0%, transparent 30%),
      radial-gradient(circle at 100% 100%, ${colors.background.gradientOverlay.medium} 0%, transparent 40%)
    `,
    opacity: 0.9,
  },
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',

  [theme.breakpoints.up('sm')]: { maxWidth: '600px' },
  [theme.breakpoints.up('md')]: { maxWidth: '900px' },
  [theme.breakpoints.up('lg')]: { maxWidth: '1200px' },
  [theme.breakpoints.up('xl')]: { maxWidth: '1400px' },

  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(0, 3) },
  [theme.breakpoints.up('md')]: {     padding: theme.spacing(0, 4) },
}));

export const ContentContainer = styled(StyledContainer)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),

  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },

  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),

  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(5),
  },

  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(6),
  },
}));

export const ResultGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(4),
  width: '100%',
  marginTop: theme.spacing(2),

  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(5),
  },

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(6),
    marginTop: theme.spacing(3),
  },
}));
