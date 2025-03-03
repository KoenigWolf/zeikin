import { styled } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';
import { colors } from '../theme/colors';

// =============================
// カスタムカード: StyledCard
// 角丸デザイン & 背景のブラーエフェクト
// ホバー時に浮き上がるアニメーション
// 可読性と拡張性を向上
// =============================

export const StyledCard = styled(Card)(({ theme }) => {
  // 基本スタイル
  const baseStyles = {
    borderRadius: theme.shape.borderRadius * 2,
    border: `1px solid ${colors.border.medium}`,
    background: colors.background.card,
    backdropFilter: 'blur(10px)',
    transition: 'box-shadow 0.2s ease',
    overflow: 'visible',
    width: '100%',
  };

  // ホバー時のスタイル
  const hoverStyles = {
    boxShadow: `0 8px 16px ${colors.shadow.medium}`,
    border: `1px solid ${colors.border.hover}`,
  };

  return {
    ...baseStyles,
    '&:hover': hoverStyles,
  };
});

// =============================
// カスタムカードコンテンツ: StyledCardContent
// 余白調整 (レスポンシブ対応)
// フレックスボックスで縦レイアウト対応
// 可読性と拡張性を向上
// =============================

export const StyledCardContent = styled(CardContent)(({ theme }) => {
  // 基本スタイル
  const basePadding = theme.spacing(3);
  const responsivePadding = theme.spacing(4);

  return {
    padding: basePadding,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

    // 最後の子要素の余白調整
    '&:last-child': {
      paddingBottom: basePadding,
    },

    // スクリーンサイズが `sm` 以上の場合のスタイル
    [theme.breakpoints.up('sm')]: {
      padding: responsivePadding,
      '&:last-child': {
        paddingBottom: responsivePadding,
      },
    },
  };
});
