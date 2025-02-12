import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useTaxCalculation, type TaxCalculationResult } from '../hooks/useTaxCalculation';

export const TaxCalculator = () => {
  const [baseSalary, setBaseSalary] = useState<string>('');
  const [bonus, setBonus] = useState<string>('');
  const [hasPension, setHasPension] = useState(false);
  const [hasCareInsurance, setHasCareInsurance] = useState(false);
  const [hasChildCare, setHasChildCare] = useState(false);
  const [result, setResult] = useState<TaxCalculationResult | null>(null);

  const { calculate } = useTaxCalculation();

  const handleCalculate = () => {
    const baseAmount = Number.parseFloat(baseSalary);
    const bonusAmount = Number.parseFloat(bonus) || 0;

    if (Number.isNaN(baseAmount)) {
      alert('月給に正しい数値を入力してください。');
      return;
    }

    const calculationResult = calculate({
      baseSalary: baseAmount,
      bonus: bonusAmount,
      hasPension,
      hasCareInsurance,
      hasChildCare,
    });

    setResult(calculationResult);
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} 円`;
  };

  return (
    <Box>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            税金計算
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="月給(万円)"
                type="number"
                value={baseSalary}
                onChange={(e) => setBaseSalary(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="賞与(万円)"
                type="number"
                value={bonus}
                onChange={(e) => setBonus(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hasPension}
                    onChange={(e) => setHasPension(e.target.checked)}
                  />
                }
                label="厚生年金"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hasCareInsurance}
                    onChange={(e) => setHasCareInsurance(e.target.checked)}
                  />
                }
                label="介護保険料"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hasChildCare}
                    onChange={(e) => setHasChildCare(e.target.checked)}
                  />
                }
                label="子育て拠出"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCalculate}
                size="large"
              >
                計算
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {result && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              社員負担
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>項目</TableCell>
                    <TableCell align="right">年額</TableCell>
                    <TableCell align="right">月額</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>額面収入</TableCell>
                    <TableCell align="right">{formatCurrency(result.employee.grossIncome.annual)}</TableCell>
                    <TableCell align="right">{formatCurrency(result.employee.grossIncome.monthly)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>所得税</TableCell>
                    <TableCell align="right">{formatCurrency(result.employee.incomeTax.annual)}</TableCell>
                    <TableCell align="right">{formatCurrency(result.employee.incomeTax.monthly)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>住民税</TableCell>
                    <TableCell align="right">{formatCurrency(result.employee.residentTax.annual)}</TableCell>
                    <TableCell align="right">{formatCurrency(result.employee.residentTax.monthly)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>健康保険</TableCell>
                    <TableCell align="right">{formatCurrency(result.employee.healthInsurance.annual)}</TableCell>
                    <TableCell align="right">{formatCurrency(result.employee.healthInsurance.monthly)}</TableCell>
                  </TableRow>
                  {result.employee.pensionInsurance && (
                    <TableRow>
                      <TableCell>厚生年金</TableCell>
                      <TableCell align="right">{formatCurrency(result.employee.pensionInsurance.annual)}</TableCell>
                      <TableCell align="right">{formatCurrency(result.employee.pensionInsurance.monthly)}</TableCell>
                    </TableRow>
                  )}
                  {result.employee.careInsurance && (
                    <TableRow>
                      <TableCell>介護保険</TableCell>
                      <TableCell align="right">{formatCurrency(result.employee.careInsurance.annual)}</TableCell>
                      <TableCell align="right">{formatCurrency(result.employee.careInsurance.monthly)}</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell>雇用保険</TableCell>
                    <TableCell align="right">{formatCurrency(result.employee.employmentInsurance.annual)}</TableCell>
                    <TableCell align="right">{formatCurrency(result.employee.employmentInsurance.monthly)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>手取り額</TableCell>
                    <TableCell align="right">{formatCurrency(result.employee.takeHome.annual)}</TableCell>
                    <TableCell align="right">{formatCurrency(result.employee.takeHome.monthly)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              会社負担
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>項目</TableCell>
                    <TableCell align="right">年額</TableCell>
                    <TableCell align="right">月額</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>住民税</TableCell>
                    <TableCell align="right">{formatCurrency(result.employer.residentTax.annual)}</TableCell>
                    <TableCell align="right">{formatCurrency(result.employer.residentTax.monthly)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>健康保険</TableCell>
                    <TableCell align="right">{formatCurrency(result.employer.healthInsurance.annual)}</TableCell>
                    <TableCell align="right">{formatCurrency(result.employer.healthInsurance.monthly)}</TableCell>
                  </TableRow>
                  {result.employer.pensionInsurance && (
                    <TableRow>
                      <TableCell>厚生年金</TableCell>
                      <TableCell align="right">{formatCurrency(result.employer.pensionInsurance.annual)}</TableCell>
                      <TableCell align="right">{formatCurrency(result.employer.pensionInsurance.monthly)}</TableCell>
                    </TableRow>
                  )}
                  {result.employer.careInsurance && (
                    <TableRow>
                      <TableCell>介護保険</TableCell>
                      <TableCell align="right">{formatCurrency(result.employer.careInsurance.annual)}</TableCell>
                      <TableCell align="right">{formatCurrency(result.employer.careInsurance.monthly)}</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell>雇用保険</TableCell>
                    <TableCell align="right">{formatCurrency(result.employer.employmentInsurance.annual)}</TableCell>
                    <TableCell align="right">{formatCurrency(result.employer.employmentInsurance.monthly)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>労災保険</TableCell>
                    <TableCell align="right">{formatCurrency(result.employer.laborInsurance.annual)}</TableCell>
                    <TableCell align="right">{formatCurrency(result.employer.laborInsurance.monthly)}</TableCell>
                  </TableRow>
                  {result.employer.childCare && (
                    <TableRow>
                      <TableCell>子育て拠出</TableCell>
                      <TableCell align="right">{formatCurrency(result.employer.childCare.annual)}</TableCell>
                      <TableCell align="right">{formatCurrency(result.employer.childCare.monthly)}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};