import { Box } from '@mui/material';
import type { TaxCalculationResult } from '@hooks/useTaxCalculation';
import {
  ResultSection,
  ResultItem,
  SectionTitle,
  HighlightedResultSection,
} from '@styles/components/Result.styles';

interface EmployerTaxResultProps {
  employer: TaxCalculationResult['employer'];
}

export const EmployerTaxResult = ({ employer }: EmployerTaxResultProps) => {
  return (
    <Box>
      <ResultSection>
        <SectionTitle variant="h6" sx={{ '&::before': { content: '"🏢"' } }}>
          社会保険料（事業主負担）
        </SectionTitle>

        <ResultItem>
          <span className="label">住民税</span>
          <span className="value">{employer.residentTax.monthly.toLocaleString()} 円</span>
        </ResultItem>

        <ResultItem>
          <span className="label">健康保険</span>
          <span className="value">{employer.healthInsurance.monthly.toLocaleString()} 円</span>
        </ResultItem>

        {employer.pensionInsurance && (
          <ResultItem>
            <span className="label">厚生年金</span>
            <span className="value">{employer.pensionInsurance.monthly.toLocaleString()} 円</span>
          </ResultItem>
        )}

        <ResultItem>
          <span className="label">雇用保険</span>
          <span className="value">{employer.employmentInsurance.monthly.toLocaleString()} 円</span>
        </ResultItem>

        <ResultItem>
          <span className="label">労災保険</span>
          <span className="value">{employer.laborInsurance.monthly.toLocaleString()} 円</span>
        </ResultItem>
      </ResultSection>

      <HighlightedResultSection>
        <ResultItem sx={{ border: 'none' }}>
          <span className="total-label">会社負担税金合計</span>
          <span className="total-value">{employer.totalEmployerTax.monthly.toLocaleString()} 円</span>
        </ResultItem>
      </HighlightedResultSection>
    </Box>
  );
};
