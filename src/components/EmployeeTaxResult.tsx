import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { TaxCalculationResult } from '../hooks/useTaxCalculation';
import { colors } from '../styles/theme/colors';

interface EmployeeTaxResultProps {
  employee: TaxCalculationResult['employee'];
}

const ResultSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2.5),
  background: colors.background.overlay,
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${colors.border.light}`,
  transition: 'background 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.95)',
    boxShadow: `0 4px 8px ${colors.shadow.light}`
  },
  '&:last-child': {
    marginBottom: 0,
  }
}));

const ResultItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.5, 0),
  '&:not(:last-child)': {
    borderBottom: `1px solid ${colors.border.light}`
  },
  '& .label': {
    fontSize: '1rem',
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  '& .value': {
    fontSize: '1.1rem',
    color: colors.text.primary,
    fontWeight: 600,
  },
  '& .total-label': {
    fontSize: '1.2rem',
    color: theme.palette.text.primary,
    fontWeight: 700,
  },
  '& .total-value': {
    fontSize: '1.4rem',
    color: colors.text.secondary,
    fontWeight: 800,
  }
}));

export const EmployeeTaxResult = ({ employee }: EmployeeTaxResultProps) => {
  return (
    <Box>
      <ResultSection>
        <Typography 
          variant="h6" 
          sx={{ 
            color: colors.text.primary, 
            mb: 2,
            fontSize: '1.1rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '&::before': {
              content: '"💴"',
              fontSize: '1.2rem'
            }
          }}
        >
          収入
        </Typography>
        <ResultItem>
          <span className="label">額面収入</span>
          <span className="value">{employee.grossIncome.monthly.toLocaleString()}円</span>
        </ResultItem>
      </ResultSection>

      <ResultSection>
        <Typography 
          variant="h6" 
          sx={{ 
            color: colors.text.primary, 
            mb: 2,
            fontSize: '1.1rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '&::before': {
              content: '"🏛️"',
              fontSize: '1.2rem'
            }
          }}
        >
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

      <ResultSection>
        <Typography 
          variant="h6" 
          sx={{ 
            color: colors.text.primary, 
            mb: 2,
            fontSize: '1.1rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '&::before': {
              content: '"🏥"',
              fontSize: '1.2rem'
            }
          }}
        >
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

      <ResultSection sx={{ 
        background: 'linear-gradient(135deg, rgba(43, 76, 140, 0.04) 0%, rgba(30, 136, 229, 0.04) 100%)'
      }}>
        <ResultItem sx={{ border: 'none' }}>
          <span className="total-label">税金合計</span>
          <span className="total-value">{employee.totalTax.monthly.toLocaleString()}円</span>
        </ResultItem>
        <ResultItem sx={{ 
          mt: 1.5,
          pt: 2,
          borderTop: `1px solid ${colors.border.medium}`,
          borderBottom: 'none'
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
