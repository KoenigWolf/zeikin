import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { TaxCalculator } from '@components/TaxCalculator';
import { typography } from './styles/theme/typography';

const theme = createTheme({
  palette: {
    mode: 'light',
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
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <TaxCalculator />
      </Container>
    </ThemeProvider>
  );
}

export default App;
