import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';
import { colors } from '@styles/theme/colors';
import { componentTypography } from '@styles/theme/typography';

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
    [theme.breakpoints.up('sm')]: {
      fontSize: componentTypography.appTitle.sm,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: componentTypography.appTitle.md,
    },
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
  return {
    borderBottom: `2px solid ${colors.border.medium}`,
    paddingBottom: theme.spacing(2),
    fontSize: componentTypography.resultTitle.xs,
    fontWeight: componentTypography.resultTitle.fontWeight,
    [theme.breakpoints.up('sm')]: {
      fontSize: componentTypography.resultTitle.sm,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: componentTypography.resultTitle.md,
    },
  };
});
