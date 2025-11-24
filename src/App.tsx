import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { TaxCalculator } from '@components/TaxCalculator';

const theme = createTheme({
  palette: {
    mode: 'light',
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
