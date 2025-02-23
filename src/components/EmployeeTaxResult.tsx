// =============================
// 📂 ファイル: src/components/EmployeeTaxResult.tsx
// 💰 社員負担の税金一覧を表示
// - `useTaxCalculation.ts` の計算結果を受け取る
// - 社員の各種税金をテーブルで表示
// - 厚生年金 (`pensionInsurance`) や 介護保険 (`careInsurance`) などのオプション項目は条件付き表示
// =============================

import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { TaxCalculationResult } from '../hooks/useTaxCalculation';

interface EmployeeTaxResultProps {
  employee: TaxCalculationResult['employee'];
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

export const EmployeeTaxResult = ({ employee }: EmployeeTaxResultProps) => {
  return (
    <Box>
      {/* 収入セクション */}
      <ResultSection>
        <Typography variant="h6" gutterBottom sx={{ color: '#2B4C8C', mb: 2 }}>
          収入
        </Typography>
        <ResultItem>
          <span className="label">額面収入</span>
          <span className="value">{employee.grossIncome.monthly.toLocaleString()}円</span>
        </ResultItem>
      </ResultSection>

      <Divider sx={{ my: 3, borderColor: 'rgba(43, 76, 140, 0.1)' }} />

      {/* 税金セクション */}
      <ResultSection>
        <Typography variant="h6" gutterBottom sx={{ color: '#2B4C8C', mb: 2 }}>
          所得税・住民税
        </Typography>
        <ResultItem>
          <span className="label">所得税</span>
          <span className="value">{employee.incomeTax.monthly.toLocaleString()}円</span>
        </ResultItem>
        <ResultItem>
          <span className="label">住民税</span>
          <span className="value">{employee.residentTax.monthly.toLocaleString()}円</span>
        </ResultItem>
      </ResultSection>

      <Divider sx={{ my: 3, borderColor: 'rgba(43, 76, 140, 0.1)' }} />

      {/* 社会保険料セクション */}
      <ResultSection>
        <Typography variant="h6" gutterBottom sx={{ color: '#2B4C8C', mb: 2 }}>
          社会保険料
        </Typography>
        <ResultItem>
          <span className="label">健康保険</span>
          <span className="value">{employee.healthInsurance.monthly.toLocaleString()}円</span>
        </ResultItem>
        {employee.pensionInsurance && (
          <ResultItem>
            <span className="label">厚生年金</span>
            <span className="value">{employee.pensionInsurance.monthly.toLocaleString()}円</span>
          </ResultItem>
        )}
        <ResultItem>
          <span className="label">雇用保険</span>
          <span className="value">{employee.employmentInsurance.monthly.toLocaleString()}円</span>
        </ResultItem>
      </ResultSection>

      <Divider sx={{ my: 3, borderColor: 'rgba(43, 76, 140, 0.1)' }} />

      {/* 合計セクション */}
      <ResultSection>
        <ResultItem sx={{ 
          bgcolor: 'rgba(30, 136, 229, 0.05)', 
          p: 2, 
          borderRadius: 2,
        }}>
          <span className="total-label">税金合計</span>
          <span className="total-value">{employee.totalTax.monthly.toLocaleString()}円</span>
        </ResultItem>
        <ResultItem sx={{ 
          bgcolor: 'rgba(76, 175, 80, 0.05)', 
          p: 2, 
          borderRadius: 2,
          mt: 2
        }}>
          <span className="total-label">手取り額</span>
          <span className="total-value" style={{ color: '#4CAF50' }}>
            {employee.takeHome.monthly.toLocaleString()}円
          </span>
        </ResultItem>
      </ResultSection>
    </Box>
  );
};
