const TAX_RATES = {
  healthInsurance: 0.0987,    // 健康保険料率（9.87%）
  employmentInsurance: 0.003, // 雇用保険料率（0.3%）
  careInsurance: 0.0173,      // 介護保険料率（1.73%）
  pensionInsurance: 0.183,    // 厚生年金保険料率（18.3%）
  laborInsurance: 0.0025,     // 労災保険料率（0.25%）
  childCare: 0.0036,          // 子育て拠出金（0.36%）
  residentTaxRate: 0.10,      // 住民税率（10%）
  residentTaxBase: 5_000,     // 住民税均等割（5000円）
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
  const taxableResidentIncome = Math.max(0, salary * 12 - TAX_RATES.incomeDeduction);
  const residentTax = Math.floor((taxableResidentIncome * TAX_RATES.residentTaxRate + TAX_RATES.residentTaxBase) / 12 / 2);

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
