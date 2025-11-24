export const colors = {
  primary: {
    main: '#0095F6', // Instagramの青
    light: '#4DB5F9',
    dark: '#0064DC',
    gradient: 'linear-gradient(45deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)', // Instagramのグラデーション
    hover: 'linear-gradient(45deg, #9B4DD4 0%, #FF2D2D 50%, #FFC055 100%)',
  },

  background: {
    main: '#FFFFFF', // Instagramの背景色（白）
    card: '#FFFFFF',
    overlay: '#FFFFFF',
    paper: '#FFFFFF',
    paperHover: '#FAFAFA', // ホバー時は薄いグレー
    sectionHover: '#FAFAFA', // セクションホバー時
    gradientOverlay: {
      light: 'rgba(255, 255, 255, 0.05)',
      medium: 'rgba(255, 255, 255, 0.1)',
    },
  },

  text: {
    primary: '#262626', // Instagramのメインテキスト（黒に近いグレー）
    secondary: '#8E8E8E', // Instagramのセカンダリテキスト（中程度のグレー）
    tertiary: '#C7C7C7', // より薄いグレー
    light: '#FFFFFF',
    inverse: '#FAFAFA',
    link: '#0095F6', // Instagramのリンク色
  },

  border: {
    light: '#DBDBDB', // Instagramのボーダー（#DBDBDB）
    medium: '#DBDBDB',
    strong: '#A8A8A8',
    paper: '#DBDBDB',
    paperHover: '#A8A8A8',
    hover: '#8E8E8E',
  },

  shadow: {
    light: 'rgba(0, 0, 0, 0.02)',
    medium: 'rgba(0, 0, 0, 0.04)',
    large: 'rgba(0, 0, 0, 0.06)',
    hover: 'rgba(0, 0, 0, 0.08)',
    card: '0 0 0 1px rgba(0, 0, 0, 0.05)', // Instagram風の軽いシャドウ
    cardHover: '0 2px 8px rgba(0, 0, 0, 0.1)',
    paper: '0 1px 2px rgba(0, 0, 0, 0.05)',
    text: {
      dark: '0 1px 2px rgba(0, 0, 0, 0.1)',
      success: '0 1px 2px rgba(34, 197, 94, 0.2)',
    },
  },
  
  gradient: {
    highlightedSection: {
      base: 'linear-gradient(135deg, rgba(131, 58, 180, 0.03) 0%, rgba(253, 29, 29, 0.03) 50%, rgba(252, 176, 69, 0.03) 100%)',
      hover: 'linear-gradient(135deg, rgba(131, 58, 180, 0.05) 0%, rgba(253, 29, 29, 0.05) 50%, rgba(252, 176, 69, 0.05) 100%)',
    },
  },
  
  accent: {
    success: '#22C55E',
    successLight: '#4ADE80',
    successShadow: 'rgba(34, 197, 94, 0.15)',
    highlight: 'rgba(131, 58, 180, 0.08)',
    warning: '#F59E0B',
    error: '#EF4444',
  },
} as const;
