import { memo, useMemo } from 'react';
import { Box } from '@mui/material';
import type { TaxCalculationResult } from '@domain/tax';
import { colors } from '@styles/theme/colors';
import {
  ResultSection,
  ResultItem,
  SectionTitle,
  HighlightedResultSection,
  TakeHomeValue,
} from '@styles/components/Result.styles';
import { texts } from '@constants';

interface EmployeeTaxResultProps {
  employee: TaxCalculationResult['employee'];
}

export const EmployeeTaxResult = memo(({ employee }: EmployeeTaxResultProps) => {
  const incomeSection = useMemo(() => (
    <ResultSection>
      <SectionTitle variant="h6" sx={{ '&::before': { content: `"${texts.result.sections.income.icon}"` } }}>
        {texts.result.sections.income.title}
      </SectionTitle>
      <ResultItem>
        <span className="label">{texts.result.labels.grossIncome}</span>
        <span className="value">{employee.grossIncome.monthly.toLocaleString()}{texts.result.currency.yen}</span>
      </ResultItem>
    </ResultSection>
  ), [employee.grossIncome.monthly]);

  const taxSection = useMemo(() => (
    <ResultSection>
      <SectionTitle variant="h6" sx={{ '&::before': { content: `"${texts.result.sections.tax.icon}"` } }}>
        {texts.result.sections.tax.title}
      </SectionTitle>
      <ResultItem>
        <span className="label">{texts.result.labels.incomeTax}</span>
        <span className="value">{employee.incomeTax.monthly.toLocaleString()}{texts.result.currency.yen}</span>
      </ResultItem>
      <ResultItem>
        <span className="label">{texts.result.labels.residentTax}</span>
        <span className="value">{employee.residentTax.monthly.toLocaleString()}{texts.result.currency.yen}</span>
      </ResultItem>
    </ResultSection>
  ), [employee.incomeTax.monthly, employee.residentTax.monthly]);

  const insuranceSection = useMemo(() => (
    <ResultSection>
      <SectionTitle variant="h6" sx={{ '&::before': { content: `"${texts.result.sections.insurance.icon}"` } }}>
        {texts.result.sections.insurance.title}
      </SectionTitle>
      <ResultItem>
        <span className="label">{texts.result.labels.healthInsurance}</span>
        <span className="value">{employee.healthInsurance.monthly.toLocaleString()}{texts.result.currency.yen}</span>
      </ResultItem>
      {employee.pensionInsurance && (
        <ResultItem>
          <span className="label">{texts.result.labels.pensionInsurance}</span>
          <span className="value">{employee.pensionInsurance.monthly.toLocaleString()}{texts.result.currency.yen}</span>
        </ResultItem>
      )}
      {employee.careInsurance && (
        <ResultItem>
          <span className="label">{texts.result.labels.careInsurance}</span>
          <span className="value">{employee.careInsurance.monthly.toLocaleString()}{texts.result.currency.yen}</span>
        </ResultItem>
      )}
      <ResultItem>
        <span className="label">{texts.result.labels.employmentInsurance}</span>
        <span className="value">{employee.employmentInsurance.monthly.toLocaleString()}{texts.result.currency.yen}</span>
      </ResultItem>
    </ResultSection>
  ), [employee.healthInsurance.monthly, employee.pensionInsurance, employee.careInsurance, employee.employmentInsurance.monthly]);

  const summarySection = useMemo(() => (
    <HighlightedResultSection>
      <ResultItem sx={{ border: 'none' }}>
        <span className="total-label">{texts.result.labels.totalTax}</span>
        <span className="total-value">{employee.totalTax.monthly.toLocaleString()}{texts.result.currency.yen}</span>
      </ResultItem>
      <ResultItem
        sx={{
          mt: 1.5,
          pt: 2,
          borderTop: `1px solid ${colors.border.medium}`,
          borderBottom: 'none',
        }}
      >
        <span className="total-label">{texts.result.labels.takeHome}</span>
        <TakeHomeValue className="total-value">
          {employee.takeHome.monthly.toLocaleString()}{texts.result.currency.yen}
        </TakeHomeValue>
      </ResultItem>
    </HighlightedResultSection>
  ), [employee.totalTax.monthly, employee.takeHome.monthly]);

  return (
    <Box>
      {incomeSection}
      {taxSection}
      {insuranceSection}
      {summarySection}
    </Box>
  );
});
EmployeeTaxResult.displayName = 'EmployeeTaxResult';
