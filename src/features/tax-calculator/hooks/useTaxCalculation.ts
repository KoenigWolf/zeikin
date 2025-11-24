import { calculateIncomeTax } from './taxCalculations';
import { calculateDeductions } from './deductions';
import type { TaxCalculationInput, TaxCalculationResult, MonthlyAnnual } from '@domain/tax';
import { CALCULATION_CONSTANTS } from '@domain/tax';
import { isSafeNumber, safeMathOperation } from '@domain/validation';

const TAX_RATES = {
  childCare: 0.0036,
} as const;

const toMonthlyAnnual = (monthly: number): MonthlyAnnual => {
  if (!isSafeNumber(monthly) || isNaN(monthly) || !isFinite(monthly)) {
    throw new Error(`Invalid monthly value: ${monthly}`);
  }
  const annual = monthly * CALCULATION_CONSTANTS.conversion.monthsPerYear;
  if (!isSafeNumber(annual) || isNaN(annual) || !isFinite(annual)) {
    throw new Error(`Invalid annual value calculated from monthly: ${monthly}`);
  }
  return {
    monthly: Math.max(0, monthly),
    annual: Math.max(0, annual),
  };
};

export const useTaxCalculation = () => {
  const calculate = (input: TaxCalculationInput): TaxCalculationResult => {
    const { baseSalary, bonus, hasPension, hasCareInsurance, hasChildCare } = input;

    if (!isSafeNumber(baseSalary) || !isSafeNumber(bonus)) {
      throw new Error('Invalid input values');
    }

    const monthlySalary = safeMathOperation(
      () => baseSalary * CALCULATION_CONSTANTS.conversion.manToYen,
      0,
      '月給の計算中にエラーが発生しました'
    );

    if (!isSafeNumber(monthlySalary)) {
      throw new Error('Invalid monthly salary calculation');
    }

    const annualSalary = safeMathOperation(
      () => monthlySalary * CALCULATION_CONSTANTS.conversion.monthsPerYear + bonus * CALCULATION_CONSTANTS.conversion.manToYen,
      0,
      '年収の計算中にエラーが発生しました'
    );

    if (!isSafeNumber(annualSalary)) {
      throw new Error('Invalid annual salary calculation');
    }

    const annualIncomeTax = safeMathOperation(
      () => calculateIncomeTax(annualSalary),
      0,
      '所得税の計算中にエラーが発生しました'
    );

    if (!isSafeNumber(annualIncomeTax)) {
      throw new Error('Invalid income tax calculation');
    }

    const monthlyIncomeTax = safeMathOperation(
      () => Math.floor(annualIncomeTax / CALCULATION_CONSTANTS.conversion.monthsPerYear),
      0,
      '月額所得税の計算中にエラーが発生しました'
    );

    const employeeDeductions = calculateDeductions(monthlySalary, hasPension, hasCareInsurance);

    const totalEmployeeTax =
      monthlyIncomeTax +
      employeeDeductions.residentTax +
      employeeDeductions.healthInsurance +
      employeeDeductions.employmentInsurance +
      (employeeDeductions.careInsurance ?? 0) +
      (employeeDeductions.pensionInsurance ?? 0);

    const takeHomePay = safeMathOperation(
      () => monthlySalary - totalEmployeeTax,
      0,
      '手取り額の計算中にエラーが発生しました'
    );

    if (!isSafeNumber(takeHomePay) || takeHomePay < 0) {
      throw new Error('Invalid take-home pay calculation');
    }

    // 事業主負担分の計算（isEmployer=true）
    const baseEmployerDeductions = calculateDeductions(monthlySalary, hasPension, hasCareInsurance, true);
    
    const childCareAmount = safeMathOperation(
      () => hasChildCare ? Math.floor(monthlySalary * TAX_RATES.childCare) : 0,
      0,
      '子育て拠出金の計算中にエラーが発生しました'
    );

    const employerDeductions = {
      ...baseEmployerDeductions,
      childCare: childCareAmount,
    };

    // 事業主負担分の合計（住民税は労使折半）
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