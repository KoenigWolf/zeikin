import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';
import { colors } from '../theme/colors';

interface HeaderTypographyProps extends TypographyProps {
  component?: React.ElementType;
}

export const HeaderTypography = styled(Typography)<HeaderTypographyProps>(() => {
  return {
    fontWeight: 600,
    color: colors.text.light,
    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
    textAlign: 'center',
  };
});

export const FormTitle = styled(Typography)(({ theme }) => {
  return {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    position: 'relative',

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100px',
      height: '3px',
      background: colors.primary.gradient,
      borderRadius: '2px',
    },
  };
});

export const ResultTitle = styled(Typography)(({ theme }) => {
  const baseStyles = {
    borderBottom: `2px solid ${colors.border.medium}`,
    paddingBottom: theme.spacing(2),
    fontSize: '1.25rem',
  };

  const responsiveStyles = {
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },
  };

  return {
    ...baseStyles,
    ...responsiveStyles,
  };
});
