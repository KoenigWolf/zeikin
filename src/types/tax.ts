// =============================
// 📂 ファイル: src/types/tax.ts
// 📝 役割: 税金計算に関する型定義
// - 入力データの型
// - 計算結果の型
// - 共通で使用する型
// =============================

// =============================
// 入力データの型定義
// =============================
export interface TaxCalculationInput {
  baseSalary: number;   // 月額基本給（万円単位）
  bonus: number;        // ボーナス（万円単位）
  hasPension: boolean;  // 厚生年金加入有無
  hasCareInsurance: boolean; // 介護保険加入有無
  hasChildCare: boolean; // 企業の子育て支援負担有無
}

// =============================
// 月額・年間データの型定義
// =============================
export interface MonthlyAnnual {
  annual: number;  // 年間の金額
  monthly: number; // 月間の金額
}

// =============================
// 計算結果の型定義
// =============================
export interface TaxCalculationResult {
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