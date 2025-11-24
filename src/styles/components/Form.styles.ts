import { styled } from '@mui/material/styles';
import { TextField, Switch } from '@mui/material';
import { colors } from '@styles/theme/colors';

export const StyledTextField = styled(TextField)(({ theme }) => {
  const baseStyles = {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: colors.background.overlay,
    backdropFilter: 'blur(10px)',
    borderRadius: theme.shape.borderRadius * 1.5,
  };

  const hoverStyles = {
    background: 'rgba(255, 255, 255, 0.95)',
    boxShadow: `0 2px 8px ${colors.shadow.light}`,
  };

  const focusStyles = {
    background: colors.background.card,
    boxShadow: `0 4px 12px ${colors.shadow.medium}`,
    borderColor: colors.primary.main,
  };

  return {
    '& .MuiOutlinedInput-root': {
      ...baseStyles,
      '&:hover': hoverStyles,
      '&.Mui-focused': {
        ...focusStyles,
        '& fieldset': {
          borderColor: colors.primary.main,
          borderWidth: '2px',
        },
      },
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
