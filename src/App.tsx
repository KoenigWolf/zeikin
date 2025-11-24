import { memo } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { TaxCalculator } from '@features/tax-calculator';
import { typography } from '@styles/theme/typography';
import { colors } from '@styles/theme/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
    },
    background: {
      default: '#F8FAFC',
      paper: colors.background.card,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: typography.h1.fontSize,
      fontWeight: typography.h1.fontWeight,
      lineHeight: typography.h1.lineHeight,
      letterSpacing: typography.h1.letterSpacing,
    },
    h2: {
      fontSize: typography.h2.fontSize,
      fontWeight: typography.h2.fontWeight,
      lineHeight: typography.h2.lineHeight,
      letterSpacing: typography.h2.letterSpacing,
    },
    h3: {
      fontSize: typography.h3.fontSize,
      fontWeight: typography.h3.fontWeight,
      lineHeight: typography.h3.lineHeight,
    },
    h4: {
      fontSize: typography.h4.fontSize,
      fontWeight: typography.h4.fontWeight,
      lineHeight: typography.h4.lineHeight,
    },
    h5: {
      fontSize: typography.h5.fontSize,
      fontWeight: typography.h5.fontWeight,
      lineHeight: typography.h5.lineHeight,
    },
    h6: {
      fontSize: typography.h6.fontSize,
      fontWeight: typography.h6.fontWeight,
      lineHeight: typography.h6.lineHeight,
    },
    body1: {
      fontSize: typography.body1.fontSize,
      fontWeight: typography.body1.fontWeight,
      lineHeight: typography.body1.lineHeight,
    },
    body2: {
      fontSize: typography.body2.fontSize,
      fontWeight: typography.body2.fontWeight,
      lineHeight: typography.body2.lineHeight,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.border.medium} transparent`,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: colors.border.medium,
            borderRadius: '4px',
            '&:hover': {
              background: colors.border.strong,
            },
          },
        },
      },
    },
  },
});

const App = memo(() => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <TaxCalculator />
      </Container>
    </ThemeProvider>
  );
});
App.displayName = 'App';

export default App;
