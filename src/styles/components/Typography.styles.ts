import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';
import { colors } from '../theme/colors';

// =============================
// 型定義: HeaderTypographyProps
// Typography の標準プロパティを継承
// `component` プロパティをオプションとして指定
// =============================

interface HeaderTypographyProps extends TypographyProps {
  component?: React.ElementType;
}

// =============================
// カスタムタイポグラフィ: HeaderTypography
// 見出しに適したスタイル
// 軽微な影を付与し、視認性を向上
// 可読性と拡張性を向上
// =============================

export const HeaderTypography = styled(Typography)<HeaderTypographyProps>(() => {
  return {
    fontWeight: 600,
    color: colors.text.light,
    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
    textAlign: 'center',
  };
});

// =============================
// カスタムタイポグラフィ: FormTitle
// フォームのタイトルに適したデザイン
// 下線 (グラデーション) を追加し、視覚的なアクセントを強化
// 可読性と拡張性を向上
// =============================

export const FormTitle = styled(Typography)(({ theme }) => {
  return {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    position: 'relative',

    // 下線のデザイン
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

// =============================
// カスタムタイポグラフィ: ResultTitle
// 結果表示用のタイトル
// 下線 (ボーダー) を追加し、区切りを強調
// 可読性と拡張性を向上
// =============================

export const ResultTitle = styled(Typography)(({ theme }) => {
  // 基本スタイル
  const baseStyles = {
    borderBottom: `2px solid ${colors.border.medium}`,
    paddingBottom: theme.spacing(2),
    fontSize: '1.25rem',
  };

  // レスポンシブ対応: `md` 以上の画面サイズでフォントサイズを変更
  const responsiveStyles = {
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },
  };

  return {
    ...baseStyles,
    ...responsiveStyles,
  };
});
