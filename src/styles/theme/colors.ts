export const colors = {
  primary: {
    main: '#2B4C8C', // メインカラー (濃い青)
    light: '#1E88E5', // ライトバージョン (明るい青)
    gradient: 'linear-gradient(135deg, #2B4C8C 0%, #1E88E5 100%)', // デフォルトグラデーション
    hover: 'linear-gradient(135deg, #1E88E5 0%, #2B4C8C 100%)',
  },

  background: {
    main: 'linear-gradient(135deg, #F8FAFF 0%, #EEF2FF 100%)',
    card: '#FFFFFF',
    overlay: 'rgba(255, 255, 255, 0.8)',
    paper: 'rgba(255, 255, 255, 0.85)',
    paperHover: 'rgba(255, 255, 255, 0.95)',
    sectionHover: 'rgba(255, 255, 255, 0.95)',
    gradientOverlay: {
      light: 'rgba(255, 255, 255, 0.12)',
      medium: 'rgba(255, 255, 255, 0.15)',
    },
  },

  text: {
    primary: '#2B4C8C', // 通常のテキスト
    secondary: '#1E88E5', // サブテキスト
    light: '#FFFFFF',
  },

  border: {
    light: 'rgba(43, 76, 140, 0.08)',
    medium: 'rgba(43, 76, 140, 0.1)',
    paper: 'rgba(43, 76, 140, 0.1)',
    paperHover: 'rgba(43, 76, 140, 0.15)',
    hover: 'rgba(43, 76, 140, 0.2)',
  },

  shadow: {
    light: 'rgba(43, 76, 140, 0.08)',
    medium: 'rgba(43, 76, 140, 0.12)',
    large: 'rgba(43, 76, 140, 0.16)',
    hover: 'rgba(43, 76, 140, 0.2)',
    card: '0 4px 12px rgba(43, 76, 140, 0.1)',
    cardHover: '0 8px 24px rgba(43, 76, 140, 0.15)',
    paper: '0 6px 16px rgba(43, 76, 140, 0.12)',
    text: {
      dark: '0 2px 4px rgba(0, 0, 0, 0.15)',
      success: '0 1px 2px rgba(76, 175, 80, 0.2)',
    },
  },
  gradient: {
    highlightedSection: {
      base: 'linear-gradient(135deg, rgba(43, 76, 140, 0.06) 0%, rgba(30, 136, 229, 0.08) 100%)',
      hover: 'linear-gradient(135deg, rgba(43, 76, 140, 0.08) 0%, rgba(30, 136, 229, 0.1) 100%)',
    },
  },
  accent: {
    success: '#4CAF50',
    successShadow: 'rgba(76, 175, 80, 0.2)',
    highlight: 'rgba(30, 136, 229, 0.1)',
  },
} as const;
