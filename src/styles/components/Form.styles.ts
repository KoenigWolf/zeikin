import { styled } from '@mui/material/styles';
import { TextField, Switch } from '@mui/material';
import { colors } from '@styles/theme/colors';
import { borderRadius, dimensions } from '@styles/theme/effects';

export const StyledTextField = styled(TextField)(() => {
  const baseStyles = {
    background: colors.background.overlay,
    backdropFilter: 'blur(8px)',
    borderRadius: borderRadius.small,
  };

  const hoverStyles = {
    background: colors.background.paperHover,
    boxShadow: colors.shadow.card,
  };

  const focusStyles = {
    background: colors.background.card,
    boxShadow: colors.shadow.paper,
  };

  return {
    '& .MuiOutlinedInput-root': {
      ...baseStyles,
      
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
      '&.Mui-focused': {
        color: colors.primary.main,
      },
    },
  };
});

export const CustomSwitch = styled(Switch)(() => {
  return {
    '& .MuiSwitch-switchBase': {
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
  };
});
