import { calculateIncomeTax } from '@hooks/taxCalculations';
import { calculateDeductions } from '@hooks/deductions';
import type { TaxCalculationInput, TaxCalculationResult, MonthlyAnnual } from '../types/tax';

const toMonthlyAnnual = (monthly: number): MonthlyAnnual => ({
  monthly,
  annual: monthly * 12,
});

export const useTaxCalculation = () => {
  const calculate = (input: TaxCalculationInput): TaxCalculationResult => {
    const { baseSalary, bonus, hasPension, hasCareInsurance, hasChildCare } = input;

    const monthlySalary = baseSalary * 10000;
    const annualSalary = monthlySalary * 12 + bonus * 10000;

    const annualIncomeTax = calculateIncomeTax(annualSalary);
    const monthlyIncomeTax = Math.floor(annualIncomeTax / 12);

    const employeeDeductions = calculateDeductions(monthlySalary, hasPension, hasCareInsurance);

    const totalEmployeeTax =
      monthlyIncomeTax +
      employeeDeductions.residentTax +
      employeeDeductions.healthInsurance +
      employeeDeductions.employmentInsurance +
      (employeeDeductions.careInsurance ?? 0) +
      (employeeDeductions.pensionInsurance ?? 0);

    const takeHomePay = monthlySalary - totalEmployeeTax;

    const employerDeductions = {
      ...calculateDeductions(monthlySalary, hasPension, hasCareInsurance),
      childCare: hasChildCare ? Math.floor(monthlySalary * 0.0036) : 0,
    };

    const totalEmployerTax =
      employerDeductions.residentTax +
      employerDeductions.healthInsurance +
      employerDeductions.employmentInsurance +
      employerDeductions.laborInsurance +
      (employerDeductions.careInsurance ?? 0) +
      (employerDeductions.pensionInsurance ?? 0) +
      (hasChildCare ? employerDeductions.childCare : 0);

    return {
      employee: {
        grossIncome: { annual: annualSalary, monthly: monthlySalary },
        incomeTax: { annual: annualIncomeTax, monthly: monthlyIncomeTax },
        residentTax: toMonthlyAnnual(employeeDeductions.residentTax),
        healthInsurance: toMonthlyAnnual(employeeDeductions.healthInsurance),
        employmentInsurance: toMonthlyAnnual(employeeDeductions.employmentInsurance),
        pensionInsurance: hasPension && employeeDeductions.pensionInsurance
          ? toMonthlyAnnual(employeeDeductions.pensionInsurance)
          : undefined,
        careInsurance: hasCareInsurance && employeeDeductions.careInsurance
          ? toMonthlyAnnual(employeeDeductions.careInsurance)
          : undefined,
        totalTax: toMonthlyAnnual(totalEmployeeTax),
        takeHome: toMonthlyAnnual(takeHomePay),
      },
      employer: {
        residentTax: toMonthlyAnnual(employerDeductions.residentTax),
        healthInsurance: toMonthlyAnnual(employerDeductions.healthInsurance),
        employmentInsurance: toMonthlyAnnual(employerDeductions.employmentInsurance),
        pensionInsurance: hasPension && employerDeductions.pensionInsurance
          ? toMonthlyAnnual(employerDeductions.pensionInsurance)
          : undefined,
        careInsurance: hasCareInsurance && employerDeductions.careInsurance
          ? toMonthlyAnnual(employerDeductions.careInsurance)
          : undefined,
        laborInsurance: toMonthlyAnnual(employerDeductions.laborInsurance),
        childCare: hasChildCare ? toMonthlyAnnual(employerDeductions.childCare) : undefined,
        totalEmployerTax: toMonthlyAnnual(totalEmployerTax),
      },
    };
  };

  return { calculate };
};

export type { TaxCalculationResult };