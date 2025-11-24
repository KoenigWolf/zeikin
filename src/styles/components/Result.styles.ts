import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '@styles/theme/colors';

export const ResultSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2.5),
  background: colors.background.overlay,
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${colors.border.light}`,
  transition: 'background 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.95)',
    boxShadow: `0 4px 8px ${colors.shadow.light}`,
  },
  '&:last-child': {
    marginBottom: 0,
  },
}));

export const ResultItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.5, 0),
  '&:not(:last-child)': {
    borderBottom: `1px solid ${colors.border.light}`,
  },
  '& .label': {
    fontSize: '1rem',
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  '& .value': {
    fontSize: '1.1rem',
    color: colors.text.primary,
    fontWeight: 600,
  },
  '& .total-label': {
    fontSize: '1.2rem',
    color: theme.palette.text.primary,
    fontWeight: 700,
  },
  '& .total-value': {
    fontSize: '1.4rem',
    color: colors.text.secondary,
    fontWeight: 800,
  },
}));

export const SectionTitle = styled(Typography)(() => ({
  color: colors.text.primary,
  marginBottom: 16,
  fontSize: '1.1rem',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  '&::before': {
    fontSize: '1.2rem',
  },
})) as typeof Typography;

export const HighlightedResultSection = styled(ResultSection)(() => ({
  background: 'linear-gradient(135deg, rgba(43, 76, 140, 0.04) 0%, rgba(30, 136, 229, 0.04) 100%)',
}));

export const TakeHomeValue = styled('span')(() => ({
  color: '#4CAF50',
}));

