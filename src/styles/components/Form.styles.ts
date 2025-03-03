import { styled } from '@mui/material/styles';
import { TextField, Switch } from '@mui/material';
import { colors } from '../theme/colors';

// =============================
// カスタムテキストフィールド: StyledTextField
// - 背景にブラーエフェクトを適用
// - ホバー時 & フォーカス時に軽微なアニメーションを適用
// - 可読性と拡張性を向上
// =============================

export const StyledTextField = styled(TextField)(() => {
  // 基本スタイル
  const baseStyles = {
    transition: 'all 0.2s ease',
    background: colors.background.overlay,
    backdropFilter: 'blur(10px)',
  };

  // ホバー時のスタイル
  const hoverStyles = {
    transform: 'translateY(-2px)',
    background: 'rgba(255, 255, 255, 0.95)',
  };

  // フォーカス時のスタイル
  const focusStyles = {
    transform: 'translateY(-2px)',
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

// =============================
// カスタムスイッチ: CustomSwitch
// - ON 状態時の色をカスタマイズ
// - ホバー時に微細な背景変化を追加
// - 可読性と拡張性を向上
// =============================

export const CustomSwitch = styled(Switch)(() => {
  // チェック時のスタイル
  const checkedStyles = {
    color: colors.primary.main,
  };

  // ホバー時の背景スタイル
  const hoverStyles = {
    backgroundColor: `${colors.primary.main}1a`, // 透明度を追加
  };

  // スイッチの ON 状態時のトラックカラー
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
