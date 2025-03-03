import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { colors } from '../theme/colors';

// =============================
// カスタムボタン: GradientButton
// - グラデーション背景
// - ホバー・アクティブ時のエフェクト付き
// - 可読性と拡張性を考慮してリファクタリング
// =============================

export const GradientButton = styled(Button)(({ theme }) => {
  // 基本スタイル定義
  const baseStyles = {
    padding: theme.spacing(1.5),
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius * 1.5,
    background: colors.primary.gradient,
    transition: 'all 0.3s ease',
  };

  // ホバー時のスタイル
  const hoverStyles = {
    background: colors.primary.hover,
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 12px ${colors.shadow.hover}`,
  };

  // クリック時のスタイル
  const activeStyles = {
    transform: 'translateY(0)',
  };

  return {
    ...baseStyles,
    '&:hover': hoverStyles,
    '&:active': activeStyles,
  };
});
