import { Box } from '@mui/material';
import type { TaxCalculationResult } from '@hooks/useTaxCalculation';
import { colors } from '@styles/theme/colors';
import {
  ResultSection,
  ResultItem,
  SectionTitle,
  HighlightedResultSection,
  TakeHomeValue,
} from '@styles/components/Result.styles';

interface EmployeeTaxResultProps {
  employee: TaxCalculationResult['employee'];
}

export const EmployeeTaxResult = ({ employee }: EmployeeTaxResultProps) => {
  return (
    <Box>
      <ResultSection>
        <SectionTitle variant="h6" sx={{ '&::before': { content: '"💴"' } }}>
          収入
        </SectionTitle>
        <ResultItem>
          <span className="label">額面収入</span>
          <span className="value">{employee.grossIncome.monthly.toLocaleString()}円</span>
        </ResultItem>
      </ResultSection>

      <ResultSection>
        <SectionTitle variant="h6" sx={{ '&::before': { content: '"🏛️"' } }}>
          所得税・住民税
        </SectionTitle>
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
        <SectionTitle variant="h6" sx={{ '&::before': { content: '"🏥"' } }}>
          社会保険料
        </SectionTitle>
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

      <HighlightedResultSection>
        <ResultItem sx={{ border: 'none' }}>
          <span className="total-label">税金合計</span>
          <span className="total-value">{employee.totalTax.monthly.toLocaleString()}円</span>
        </ResultItem>
        <ResultItem
          sx={{
            mt: 1.5,
            pt: 2,
            borderTop: `1px solid ${colors.border.medium}`,
            borderBottom: 'none',
          }}
        >
          <span className="total-label">手取り額</span>
          <TakeHomeValue className="total-value">
            {employee.takeHome.monthly.toLocaleString()}円
          </TakeHomeValue>
        </ResultItem>
      </HighlightedResultSection>
    </Box>
  );
};
