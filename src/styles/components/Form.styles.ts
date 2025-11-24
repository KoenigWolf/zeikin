import { styled } from '@mui/material/styles';
import { TextField, Switch } from '@mui/material';
import { colors } from '@styles/theme/colors';
import { borderRadius, dimensions } from '@styles/theme/effects';

export const StyledTextField = styled(TextField)(({ theme }) => {
  const baseStyles = {
    background: colors.background.card,
    borderRadius: borderRadius.small,
  };

  const hoverStyles = {
    background: colors.background.card,
    boxShadow: colors.shadow.card,
  };

  const focusStyles = {
    background: colors.background.card,
    boxShadow: colors.shadow.paper,
  };

  return {
    '& .MuiOutlinedInput-root': {
      ...baseStyles,
      minHeight: dimensions.input.minHeight,  // タッチデバイス対応
      
      '&:hover': {
        ...hoverStyles,
        '& fieldset': {
          borderColor: colors.border.medium,
        },
      },
      
      '&.Mui-focused': {
        ...focusStyles,
        '& fieldset': {
          borderColor: colors.primary.main,
          borderWidth: dimensions.border.focusWidth,
        },
      },
      
      '& fieldset': {
        borderColor: colors.border.light,
      },
    },
    
    '& .MuiInputLabel-root': {
      color: colors.text.secondary,
      fontSize: '0.875rem', // 14px - Instagramのラベルサイズ
      fontWeight: 400,
      
      [theme.breakpoints.up('sm')]: {
        fontSize: '0.875rem', // 14px
      },
      
      '&.Mui-focused': {
        color: colors.primary.main,
      },
    },
    
    '& .MuiInputBase-input': {
      fontSize: '1rem', // 16px - Instagramの入力サイズ
      padding: theme.spacing(1, 1.25), // 8px 10px - Instagram風のタイトなパディング
      color: colors.text.primary,
      fontWeight: 400,
      
      [theme.breakpoints.up('sm')]: {
        fontSize: '1rem', // 16px
        padding: theme.spacing(1.25, 1.5), // 10px 12px
      },
    },
  };
});

export const CustomSwitch = styled(Switch)(({ theme }) => {
  return {
    padding: theme.spacing(1),
    
    '& .MuiSwitch-switchBase': {
      padding: theme.spacing(1),
      
      '&:hover': {
        backgroundColor: `${colors.primary.main}0A`,
      },
    },
    
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: colors.primary.main,
      
      '&:hover': {
        backgroundColor: `${colors.primary.main}1A`,
      },
      
      '& + .MuiSwitch-track': {
        backgroundColor: colors.primary.main,
        opacity: 1,
      },
    },
    
    '& .MuiSwitch-track': {
      backgroundColor: colors.border.medium,
      opacity: 1,
    },
    
    '& .MuiSwitch-thumb': {
      width: 20,
      height: 20,
      
      [theme.breakpoints.up('sm')]: {
        width: 22,
        height: 22,
      },
    },
  };
});
