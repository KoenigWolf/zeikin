// =============================
// タイポグラフィ設定: typography
// - ヘッディングやボディテキストの基本フォント設定を統一
// - 一貫性を持たせ、UIデザインの整合性を保つ
// - 可読性・拡張性を考慮して整理
// =============================

export const typography = {
  // =============================
  // 見出しフォント設定
  // - `h1` ～ `h5` までのフォントサイズ・ウェイト・行間を定義
  // =============================
  h1: {
    fontSize: '2rem',    // メインタイトル
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '1.75rem', // サブタイトル
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.5rem',  // セクションタイトル
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h4: {
    fontSize: '1.25rem', // 小見出し
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: '1.1rem',  // より小さな見出し
    fontWeight: 600,
    lineHeight: 1.5,
  },

  // =============================
  // ボディテキストフォント設定
  // - 一般的なテキストのフォントサイズと行間
  // =============================
  body1: {
    fontSize: '1rem',     // 標準テキスト
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem', // 小さいテキスト
    lineHeight: 1.6,
  },
} as const;

// =============================
// レスポンシブ対応タイポグラフィ: responsiveTypography
// - 画面サイズごとに適切なフォントサイズを提供
// - `xs` (モバイル) / `sm` (タブレット) / `md` (デスクトップ) の設定
// =============================

export const responsiveTypography = {
  // =============================
  // ヘッダー用フォントサイズ
  // - ヘッディングなどに使用
  // =============================
  header: {
    xs: '1.25rem', // モバイル
    sm: '1.5rem',  // タブレット
    md: '1.75rem', // デスクトップ
  },

  // =============================
  // タイトル用フォントサイズ
  // - セクションタイトルなどに使用
  // =============================
  title: {
    xs: '1.1rem',  // モバイル
    sm: '1.25rem', // タブレット
    md: '1.5rem',  // デスクトップ
  },

  // =============================
  // サブタイトル用フォントサイズ
  // - 説明文や補助的なタイトルに使用
  // =============================
  subtitle: {
    xs: '1rem',    // モバイル
    sm: '1.1rem',  // タブレット
    md: '1.25rem', // デスクトップ
  },
} as const;
