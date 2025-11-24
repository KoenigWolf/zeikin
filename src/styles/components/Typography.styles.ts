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
    color: colors.text.primary, // Instagram風のダークテキスト
    textAlign: 'center',
    lineHeight: 1.2,
    padding: theme.spacing(0.75, 0), // 6px - Instagram風のタイトなパディング
    
    [theme.breakpoints.up('sm')]: {
      fontSize: componentTypography.appTitle.sm,
      padding: theme.spacing(1, 0), // 8px
    },
    
    [theme.breakpoints.up('md')]: {
      fontSize: componentTypography.appTitle.md,
      padding: theme.spacing(1.25, 0), // 10px
    },
    
    [theme.breakpoints.up('lg')]: {
      fontSize: componentTypography.appTitle.lg,
    },
  };
});

export const FormTitle = styled(Typography)(({ theme }) => {
  return {
    textAlign: 'center',
    marginBottom: theme.spacing(2), // 16px - Instagram風のタイトなマージン
    position: 'relative',
    color: colors.text.primary,
    fontWeight: 600, // Instagramは600を使用
    fontSize: '1.125rem', // 18px

    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(2.5), // 20px
      fontSize: '1.25rem', // 20px
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: theme.spacing(-1.5),
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '2px', // Instagram風の細い線
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
    borderBottom: `1px solid ${colors.border.light}`,
    paddingBottom: theme.spacing(1), // 8px
    fontSize: componentTypography.resultTitle.xs,
    fontWeight: componentTypography.resultTitle.fontWeight,
    color: colors.text.primary,
    marginBottom: theme.spacing(1), // 8px
    
    [theme.breakpoints.up('sm')]: {
      fontSize: componentTypography.resultTitle.sm,
      marginBottom: theme.spacing(1.25), // 10px
      paddingBottom: theme.spacing(1.25), // 10px
    },
    
    [theme.breakpoints.up('md')]: {
      fontSize: componentTypography.resultTitle.md,
      marginBottom: theme.spacing(1.5), // 12px
    },
  };
});
