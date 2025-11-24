import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';
import { colors } from '@styles/theme/colors';
import { componentTypography } from '@styles/theme/typography';
import { borderRadius } from '@styles/theme/effects';

interface HeaderTypographyProps extends TypographyProps {
  component?: React.ElementType;
}

export const HeaderTypography = styled(Typography)<HeaderTypographyProps>(({ theme }) => {
  return {
    fontSize: componentTypography.appTitle.xs,
    fontWeight: componentTypography.appTitle.fontWeight,
    letterSpacing: componentTypography.appTitle.letterSpacing,
    color: colors.text.light,
    textShadow: colors.shadow.text.dark,
    textAlign: 'center',
    lineHeight: 1.2,
    padding: theme.spacing(1, 0),
    
    [theme.breakpoints.up('sm')]: {
      fontSize: componentTypography.appTitle.sm,
      padding: theme.spacing(1.5, 0),
    },
    
    [theme.breakpoints.up('md')]: {
      fontSize: componentTypography.appTitle.md,
      padding: theme.spacing(2, 0),
    },
    
    [theme.breakpoints.up('lg')]: {
      fontSize: componentTypography.appTitle.lg,
    },
  };
});

export const FormTitle = styled(Typography)(({ theme }) => {
  return {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    position: 'relative',
    color: colors.text.primary,
    fontWeight: 700,
    fontSize: '1.25rem',

    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(4),
      fontSize: '1.375rem',
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: theme.spacing(-1.5),
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '3px',
      background: colors.primary.gradient,
      borderRadius: borderRadius.tiny,
      
      [theme.breakpoints.up('sm')]: {
        width: '80px',
      },
    },
  };
});

export const ResultTitle = styled(Typography)(({ theme }) => {
  return {
    borderBottom: `2px solid ${colors.border.medium}`,
    paddingBottom: theme.spacing(1.5),
    fontSize: componentTypography.resultTitle.xs,
    fontWeight: componentTypography.resultTitle.fontWeight,
    color: colors.text.primary,
    marginBottom: theme.spacing(1.5),
    
    [theme.breakpoints.up('sm')]: {
      fontSize: componentTypography.resultTitle.sm,
      marginBottom: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    
    [theme.breakpoints.up('md')]: {
      fontSize: componentTypography.resultTitle.md,
      marginBottom: theme.spacing(2.5),
    },
  };
});
