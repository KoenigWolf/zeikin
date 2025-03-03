// =============================
// ファイル: src/hooks/useTaxCalculation.ts
// 役割  : 税金計算の統括
// 所得税: taxCalculations.ts を使用
// 各種控除: deductions.ts を使用
// 計算結果を組み立て、最終的な収入を算出
// =============================

import { calculateIncomeTax } from '@hooks/taxCalculations';
import { calculateDeductions } from '@hooks/deductions';

// =============================
// 入力データの型定義
// =============================
interface TaxCalculationInput {
  baseSalary: number;   // 月額基本給（万円単位）
  bonus: number;        // ボーナス（万円単位）
  hasPension: boolean;  // 厚生年金加入有無
  hasCareInsurance: boolean; // 介護保険加入有無
  hasChildCare: boolean; // 企業の子育て支援負担有無
}

// =============================
// 月額・年間データの型定義
// =============================
interface MonthlyAnnual {
  annual: number;  // 年間の金額
  monthly: number; // 月間の金額
}

// =============================
// 計算結果の型定義
// =============================
interface TaxCalculationResult {
  employee: {
    grossIncome: MonthlyAnnual;        // 総支給額（額面）
    incomeTax: MonthlyAnnual;          // 所得税
    residentTax: MonthlyAnnual;        // 住民税
    healthInsurance: MonthlyAnnual;    // 健康保険
    pensionInsurance?: MonthlyAnnual;  // 厚生年金（任意）
    careInsurance?: MonthlyAnnual;     // 介護保険（任意）
    employmentInsurance: MonthlyAnnual;// 雇用保険
    totalTax: MonthlyAnnual;           // 税金合計
    takeHome: MonthlyAnnual;           // 手取り額
  };
  employer: {
    residentTax: MonthlyAnnual;        // 会社負担分の住民税
    healthInsurance: MonthlyAnnual;    // 会社負担分の健康保険
    pensionInsurance?: MonthlyAnnual;  // 会社負担分の厚生年金
    careInsurance?: MonthlyAnnual;     // 会社負担分の介護保険
    employmentInsurance: MonthlyAnnual;// 会社負担分の雇用保険
    laborInsurance: MonthlyAnnual;     // 労災保険
    childCare?: MonthlyAnnual;         // 会社負担の子育て支援
    totalEmployerTax: MonthlyAnnual;   // 会社負担の税金合計
  };
}

// =============================
// 税金計算の統括関数
// 各種計算処理を統合し、結果を返す
// =============================
export const useTaxCalculation = () => {
  const calculate = (input: TaxCalculationInput): TaxCalculationResult => {
    const { baseSalary, bonus, hasPension, hasCareInsurance, hasChildCare } = input;

    // 基本収入の計算
    const monthlySalary = baseSalary * 10000;  // 月額給与（円）
    const annualSalary = monthlySalary * 12 + bonus * 10000;  // 年収（円）

    // 所得税の計算（年間 & 月間）
    const annualIncomeTax = calculateIncomeTax(annualSalary);
    const monthlyIncomeTax = Math.floor(annualIncomeTax / 12);

    // 社員負担の控除計算
    const employeeDeductions = calculateDeductions(monthlySalary, hasPension, hasCareInsurance);

    // 社員負担の税金合計
    const totalEmployeeTax =
      monthlyIncomeTax +
      employeeDeductions.residentTax +
      employeeDeductions.healthInsurance +
      employeeDeductions.employmentInsurance +
      (employeeDeductions.careInsurance ?? 0) +
      (employeeDeductions.pensionInsurance ?? 0);

    // 手取り収入の計算
    const takeHomePay = monthlySalary - totalEmployeeTax;

    // 会社負担の計算
    const employerDeductions = {
      ...calculateDeductions(monthlySalary, hasPension, hasCareInsurance),
      childCare: hasChildCare ? Math.floor(monthlySalary * 0.0036) : 0,
    };

    // 会社負担税金合計
    const totalEmployerTax =
      employerDeductions.residentTax +
      employerDeductions.healthInsurance +
      employerDeductions.employmentInsurance +
      employerDeductions.laborInsurance +
      (employerDeductions.careInsurance ?? 0) +
      (employerDeductions.pensionInsurance ?? 0) +
      (hasChildCare ? employerDeductions.childCare : 0);

    // 計算結果の組み立て
    return {
      employee: {
        grossIncome: { annual: annualSalary, monthly: monthlySalary },
        incomeTax: { annual: annualIncomeTax, monthly: monthlyIncomeTax },
        residentTax: { annual: employeeDeductions.residentTax * 12, monthly: employeeDeductions.residentTax },
        healthInsurance: { annual: employeeDeductions.healthInsurance * 12, monthly: employeeDeductions.healthInsurance },
        employmentInsurance: { annual: employeeDeductions.employmentInsurance * 12, monthly: employeeDeductions.employmentInsurance },
        pensionInsurance: hasPension && employeeDeductions.pensionInsurance ? 
          { annual: employeeDeductions.pensionInsurance * 12, monthly: employeeDeductions.pensionInsurance } : 
          undefined,
        careInsurance: hasCareInsurance && employeeDeductions.careInsurance ? 
          { annual: employeeDeductions.careInsurance * 12, monthly: employeeDeductions.careInsurance } : 
          undefined,
        totalTax: { annual: totalEmployeeTax * 12, monthly: totalEmployeeTax },
        takeHome: { annual: takeHomePay * 12, monthly: takeHomePay },
      },
      employer: {
        residentTax: { annual: employerDeductions.residentTax * 12, monthly: employerDeductions.residentTax },
        healthInsurance: { annual: employerDeductions.healthInsurance * 12, monthly: employerDeductions.healthInsurance },
        employmentInsurance: { annual: employerDeductions.employmentInsurance * 12, monthly: employerDeductions.employmentInsurance },
        pensionInsurance: hasPension && employerDeductions.pensionInsurance ? 
          { annual: employerDeductions.pensionInsurance * 12, monthly: employerDeductions.pensionInsurance } : 
          undefined,
        careInsurance: hasCareInsurance && employerDeductions.careInsurance ? 
          { annual: employerDeductions.careInsurance * 12, monthly: employerDeductions.careInsurance } : 
          undefined,
        laborInsurance: { annual: employerDeductions.laborInsurance * 12, monthly: employerDeductions.laborInsurance },
        childCare: hasChildCare ? { annual: employerDeductions.childCare * 12, monthly: employerDeductions.childCare } : undefined,
        totalEmployerTax: { annual: totalEmployerTax * 12, monthly: totalEmployerTax },
      },
    };
  };

  return { calculate };
};

export type { TaxCalculationResult };