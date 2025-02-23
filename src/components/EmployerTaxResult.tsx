// =============================
// 📂 ファイル: src/components/EmployerTaxResult.tsx
// 🏢 会社負担の税金一覧を表示
// - `useTaxCalculation.ts` の計算結果を受け取る
// - 会社負担の各種税金をテーブルで表示
// - 厚生年金 (`pensionInsurance`) などのオプション項目は条件付き表示
// =============================

import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { TaxCalculationResult } from '../hooks/useTaxCalculation';

interface EmployerTaxResultProps {
  employer: TaxCalculationResult['employer'];
}

const ResultSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '&:last-child': {
    marginBottom: 0,
  }
}));

const ResultItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.5, 0),
  '& .label': {
    fontSize: '1.1rem',
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  '& .value': {
    fontSize: '1.2rem',
    color: '#2B4C8C',
    fontWeight: 600,
  },
  '& .total-label': {
    fontSize: '1.3rem',
    color: theme.palette.text.primary,
    fontWeight: 700,
  },
  '& .total-value': {
    fontSize: '1.5rem',
    color: '#1E88E5',
    fontWeight: 800,
  }
}));

export const EmployerTaxResult = ({ employer }: EmployerTaxResultProps) => {
  return (
    <Box>
      <ResultSection>
        <Typography variant="h6" gutterBottom sx={{ color: '#2B4C8C', mb: 2 }}>
          社会保険料（事業主負担）
        </Typography>
        <ResultItem>
          <span className="label">住民税</span>
          <span className="value">{employer.residentTax.monthly.toLocaleString()}円</span>
        </ResultItem>
        <ResultItem>
          <span className="label">健康保険</span>
          <span className="value">{employer.healthInsurance.monthly.toLocaleString()}円</span>
        </ResultItem>
        {employer.pensionInsurance && (
          <ResultItem>
            <span className="label">厚生年金</span>
            <span className="value">{employer.pensionInsurance.monthly.toLocaleString()}円</span>
          </ResultItem>
        )}
        <ResultItem>
          <span className="label">雇用保険</span>
          <span className="value">{employer.employmentInsurance.monthly.toLocaleString()}円</span>
        </ResultItem>
        <ResultItem>
          <span className="label">労災保険</span>
          <span className="value">{employer.laborInsurance.monthly.toLocaleString()}円</span>
        </ResultItem>
      </ResultSection>

      <Divider sx={{ my: 3, borderColor: 'rgba(43, 76, 140, 0.1)' }} />

      <ResultItem sx={{ 
        bgcolor: 'rgba(30, 136, 229, 0.05)', 
        p: 2, 
        borderRadius: 2,
        mt: 3
      }}>
        <span className="total-label">会社負担税金合計</span>
        <span className="total-value">{employer.totalEmployerTax.monthly.toLocaleString()}円</span>
      </ResultItem>
    </Box>
  );
};
