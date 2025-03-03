import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { TaxCalculator } from '@components/TaxCalculator';

// =============================
// テーマ設定: theme
// アプリ全体のデフォルトテーマを設定
// `palette.mode: 'light'` を指定し、ライトモードを適用
// 将来的にカスタムテーマを追加しやすい構造に
// =============================

const theme = createTheme({
  palette: {
    mode: 'light', // ライトモード (デフォルト)
  },
});

// =============================
// アプリケーションのメインコンポーネント: App
// `ThemeProvider` で MUI のテーマを適用
// `CssBaseline` でリセットスタイルを適用
// `Container` 内に `TaxCalculator` を配置
// =============================

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* グローバルスタイルのリセット */}
      <CssBaseline />

      {/* メインコンテンツ */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <TaxCalculator />
      </Container>
    </ThemeProvider>
  );
}

export default App;
