import { memo, useMemo } from 'react';
import { Box } from '@mui/material';
import type { TaxCalculationResult } from '../hooks/useTaxCalculation';
import {
  ResultSection,
  ResultItem,
  SectionTitle,
  HighlightedResultSection,
} from '@styles/components/Result.styles';
import { texts } from '@constants';

interface EmployerTaxResultProps {
  employer: TaxCalculationResult['employer'];
}

export const EmployerTaxResult = memo(({ employer }: EmployerTaxResultProps) => {
  const insuranceItems = useMemo(() => (
    <>
      <ResultItem>
        <span className="label">{texts.result.labels.residentTax}</span>
        <span className="value">{employer.residentTax.monthly.toLocaleString()} {texts.result.currency.yen}</span>
      </ResultItem>

      <ResultItem>
        <span className="label">{texts.result.labels.healthInsurance}</span>
        <span className="value">{employer.healthInsurance.monthly.toLocaleString()} {texts.result.currency.yen}</span>
      </ResultItem>

      {employer.pensionInsurance && (
        <ResultItem>
          <span className="label">{texts.result.labels.pensionInsurance}</span>
          <span className="value">{employer.pensionInsurance.monthly.toLocaleString()} {texts.result.currency.yen}</span>
        </ResultItem>
      )}

      <ResultItem>
        <span className="label">{texts.result.labels.employmentInsurance}</span>
        <span className="value">{employer.employmentInsurance.monthly.toLocaleString()} {texts.result.currency.yen}</span>
      </ResultItem>

      <ResultItem>
        <span className="label">{texts.result.labels.laborInsurance}</span>
        <span className="value">{employer.laborInsurance.monthly.toLocaleString()} {texts.result.currency.yen}</span>
      </ResultItem>
    </>
  ), [
    employer.residentTax.monthly,
    employer.healthInsurance.monthly,
    employer.pensionInsurance,
    employer.employmentInsurance.monthly,
    employer.laborInsurance.monthly,
  ]);

  return (
    <Box>
      <ResultSection>
        <SectionTitle variant="h6" sx={{ '&::before': { content: `"${texts.result.sections.employerInsurance.icon}"` } }}>
          {texts.result.sections.employerInsurance.title}
        </SectionTitle>
        {insuranceItems}
      </ResultSection>

      <HighlightedResultSection>
        <ResultItem sx={{ border: 'none' }}>
          <span className="total-label">{texts.result.labels.totalEmployerTax}</span>
          <span className="total-value">{employer.totalEmployerTax.monthly.toLocaleString()} {texts.result.currency.yen}</span>
        </ResultItem>
      </HighlightedResultSection>
    </Box>
  );
});
EmployerTaxResult.displayName = 'EmployerTaxResult';
