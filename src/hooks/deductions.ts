import { CALCULATION_CONSTANTS } from '../constants/calculations';

const TAX_RATES = {
  healthInsurance: 0.0987,
  employmentInsurance: 0.003,
  careInsurance: 0.0173,
  pensionInsurance: 0.183,
  laborInsurance: 0.0025,
  childCare: 0.0036,
  residentTaxRate: 0.10,
  residentTaxBase: 5_000,
  incomeDeduction: 430_000,
} as const;

interface Deductions {
  residentTax: number;
  healthInsurance: number;
  employmentInsurance: number;
  careInsurance: number;
  pensionInsurance: number;
  laborInsurance: number;
  childCare: number;
}

export const calculateDeductions = (
  salary: number,
  hasPension: boolean,
  hasCareInsurance: boolean,
  isEmployer = false
): Deductions => {
  const taxableResidentIncome = Math.max(0, salary * CALCULATION_CONSTANTS.conversion.monthsPerYear - TAX_RATES.incomeDeduction);
  const residentTax = Math.floor((taxableResidentIncome * TAX_RATES.residentTaxRate + TAX_RATES.residentTaxBase) / CALCULATION_CONSTANTS.conversion.monthsPerYear / CALCULATION_CONSTANTS.conversion.residentTaxPaymentsPerYear);

  const healthInsurance = Math.floor((salary * TAX_RATES.healthInsurance) / 2);
  const employmentInsurance = Math.floor(salary * TAX_RATES.employmentInsurance);
  const careInsurance = hasCareInsurance ? Math.floor((salary * TAX_RATES.careInsurance) / 2) : 0;
  const pensionInsurance = hasPension ? Math.floor((salary * TAX_RATES.pensionInsurance) / 2) : 0;

  const laborInsurance = isEmployer ? Math.floor(salary * TAX_RATES.laborInsurance) : 0;
  const childCare = isEmployer ? Math.floor(salary * TAX_RATES.childCare) : 0;

  return {
    residentTax,
    healthInsurance,
    employmentInsurance,
    careInsurance,
    pensionInsurance,
    laborInsurance,
    childCare,
  };
};
