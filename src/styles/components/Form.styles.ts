import { styled } from '@mui/material/styles';
import { TextField, Switch } from '@mui/material';
import { colors } from '@styles/theme/colors';

export const StyledTextField = styled(TextField)(() => {
  const baseStyles = {
    transition: 'background 0.2s ease',
    background: colors.background.overlay,
    backdropFilter: 'blur(10px)',
  };

  const hoverStyles = {
    background: 'rgba(255, 255, 255, 0.95)',
  };

  const focusStyles = {
    background: colors.background.card,
  };

  return {
    '& .MuiOutlinedInput-root': {
      ...baseStyles,
      '&:hover': hoverStyles,
      '&.Mui-focused': focusStyles,
    },
  };
});

export const CustomSwitch = styled(Switch)(() => {
  const checkedStyles = {
    color: colors.primary.main,
  };

  const hoverStyles = {
    backgroundColor: `${colors.primary.main}1a`,
  };

  const trackStyles = {
    backgroundColor: colors.primary.main,
  };

  return {
    '& .MuiSwitch-switchBase.Mui-checked': {
      ...checkedStyles,
      '&:hover': hoverStyles,
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': trackStyles,
  };
});
