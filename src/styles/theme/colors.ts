export const colors = {
  primary: {
    main: '#2B4C8C', // メインカラー (濃い青)
    light: '#1E88E5', // ライトバージョン (明るい青)
    gradient: 'linear-gradient(135deg, #2B4C8C 0%, #1E88E5 100%)', // デフォルトグラデーション
    hover: 'linear-gradient(135deg, #1E88E5 0%, #2B4C8C 100%)',
  },

  background: {
    main: 'linear-gradient(135deg, #F8FAFF 0%, #EEF2FF 100%)', // メイン背景 (グラデーション)
    card: '#FFFFFF', // カード背景
    overlay: 'rgba(255, 255, 255, 0.8)',
  },

  text: {
    primary: '#2B4C8C', // 通常のテキスト
    secondary: '#1E88E5', // サブテキスト
    light: '#FFFFFF',
  },

  border: {
    light: 'rgba(43, 76, 140, 0.08)', // 薄いボーダー (通常)
    medium: 'rgba(43, 76, 140, 0.1)', // 中程度のボーダー (強調)
    hover: 'rgba(43, 76, 140, 0.2)',
  },

  shadow: {
    light: 'rgba(43, 76, 140, 0.08)', // 弱い影
    medium: 'rgba(43, 76, 140, 0.1)', // 中程度の影
    hover: 'rgba(43, 76, 140, 0.15)',
  },
} as const;
