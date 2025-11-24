import { styled } from '@mui/material/styles';
import { TextField, Switch } from '@mui/material';
import { colors } from '@styles/theme/colors';
import { transitions, borderRadius, dimensions, effects } from '@styles/theme/effects';

export const StyledTextField = styled(TextField)(({ theme }) => {
  const baseStyles = {
    transition: transitions.standard,
    background: colors.background.overlay,
    backdropFilter: effects.blur.light,
    borderRadius: theme.shape.borderRadius * borderRadius.small,
  };

  const hoverStyles = {
    background: colors.background.paperHover,
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
          borderWidth: dimensions.border.focusWidth,
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
