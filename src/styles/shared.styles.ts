import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import { colors } from './theme/colors';

// =============================
// ルートレイアウトコンテナ: RootBox
// アプリ全体の背景設定
// `position: fixed` を適用し、ビューポート全体を覆う
// 縦スクロールを可能にする
// =============================

export const RootBox = styled(Box)(() => ({
  background: colors.background.main, // メイン背景
  minHeight: '100vh',
  minWidth: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflowY: 'auto', // 縦スクロールを有効化
}));

// =============================
// グラデーション背景コンテナ: GradientBox
// グラデーションを適用し、装飾効果を強化
// ラディアルグラデーションのオーバーレイを追加
// シャドウを適用し、立体感を演出
// =============================

export const GradientBox = styled(Box)(({ theme }) => ({
  background: colors.primary.gradient,
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(2.5),
  boxShadow: `0 2px 8px ${colors.shadow.light}`,

  // ラディアルグラデーションのオーバーレイ効果
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 0% 0%, rgba(255,255,255,0.08) 0%, transparent 25%),
      radial-gradient(circle at 100% 100%, rgba(255,255,255,0.12) 0%, transparent 35%)
    `,
    opacity: 0.8,
  },
}));

// =============================
// レスポンシブコンテナ: StyledContainer
// `maxWidth` をブレークポイントごとに調整
// 自動中央配置 & レスポンシブパディング適用
// =============================

export const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',

  // ブレークポイントごとの最大幅調整
  [theme.breakpoints.up('sm')]: { maxWidth: '600px' },
  [theme.breakpoints.up('md')]: { maxWidth: '900px' },
  [theme.breakpoints.up('lg')]: { maxWidth: '1200px' },
  [theme.breakpoints.up('xl')]: { maxWidth: '1400px' },

  // レスポンシブなパディング設定
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(0, 3) },
  [theme.breakpoints.up('md')]: { padding: theme.spacing(0, 4) },
}));

// =============================
// メインコンテンツ用コンテナ: ContentContainer
// `StyledContainer` を継承し、上下パディングを追加
// =============================

export const ContentContainer = styled(StyledContainer)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),

  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

// =============================
// フレックスボックスコンテナ: ContentBox
// `column` レイアウトをデフォルトに設定
// 要素間の `gap` をブレークポイントごとに調整
// =============================

export const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),

  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(4),
  },
}));

// =============================
// グリッドコンテナ: ResultGrid
// デフォルトは 1 列
// `md` 以上で 2 列のグリッドに変更
// `gap` のレスポンシブ設定
// =============================

export const ResultGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr', // 初期は 1 列
  gap: theme.spacing(3),
  width: '100%',

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', // md 以上で 2 列
    gap: theme.spacing(4),
  },
}));
