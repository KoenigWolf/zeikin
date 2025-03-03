// =============================
// 📂 ファイル: src/hooks/deductions.ts
// 📝 役割: 社員・会社の各種控除額を計算
// - 住民税、健康保険、厚生年金、雇用保険などの計算
// - 会社負担・社員負担の計算を統一
// - メンテナンスしやすい形に整理
// =============================

// =============================
// 🔢 各種税率・保険料率
// - 法改正により変更が発生する可能性があるため、
//   ここで一元管理し、更新しやすくする
// =============================

const TAX_RATES = {
  healthInsurance: 0.0987,    // 健康保険料率（9.87%）
  employmentInsurance: 0.003, // 雇用保険料率（0.3%）
  careInsurance: 0.0173,      // 介護保険料率（1.73%）
  pensionInsurance: 0.183,    // 厚生年金保険料率（18.3%）
  laborInsurance: 0.0025,     // 労災保険料率（0.25%）
  childCare: 0.0036,          // 子育て拠出金（0.36%）
  residentTaxRate: 0.10,      // 住民税率（10%）
  residentTaxBase: 5_000,     // 住民税均等割（5000円）
  incomeDeduction: 430_000,   // 所得控除（43万円）
} as const;

// =============================
// 💰 控除額計算関数
// - 給与から各種控除額を算出
// - 会社負担の場合と社員負担の場合を統一処理
// =============================

interface Deductions {
  residentTax: number;
  healthInsurance: number;
  employmentInsurance: number;
  careInsurance: number;
  pensionInsurance: number;
  laborInsurance: number;
  childCare: number;
}

/**
 * 💰 社員負担 & 会社負担の控除額を計算
 * @param salary 月額給与（円）
 * @param hasPension 厚生年金加入フラグ
 * @param hasCareInsurance 介護保険加入フラグ
 * @param isEmployer 会社負担の場合は `true`
 * @returns 各種控除額（社員または会社負担）
 */
export const calculateDeductions = (
  salary: number,
  hasPension: boolean,
  hasCareInsurance: boolean,
  isEmployer = false
): Deductions => {
  // =============================
  // 🏡 住民税の計算
  // - 課税所得 = (年間給与 - 所得控除) の 10%
  // - 均等割額 (固定額 5,000円) を加算
  // - 月割り & 2 分割 (住民税は年 2 回支払い)
  // =============================
  const taxableResidentIncome = Math.max(0, salary * 12 - TAX_RATES.incomeDeduction);
  const residentTax = Math.floor((taxableResidentIncome * TAX_RATES.residentTaxRate + TAX_RATES.residentTaxBase) / 12 / 2);

  // =============================
  // 🏥 各種保険料の計算
  // - 健康保険・介護保険・年金の負担率を適用
  // - 会社と社員が 50% ずつ負担するものは `/2`
  // - 雇用保険は社員全額負担
  // =============================
  const healthInsurance = Math.floor((salary * TAX_RATES.healthInsurance) / 2);
  const employmentInsurance = Math.floor(salary * TAX_RATES.employmentInsurance);
  const careInsurance = hasCareInsurance ? Math.floor((salary * TAX_RATES.careInsurance) / 2) : 0;
  const pensionInsurance = hasPension ? Math.floor((salary * TAX_RATES.pensionInsurance) / 2) : 0;

  // =============================
  // 🏢 会社負担分の計算 (社員負担には含まれない)
  // - 労災保険、子育て拠出金は会社が全額負担
  // - `isEmployer` フラグが `true` の場合に計算
  // =============================
  const laborInsurance = isEmployer ? Math.floor(salary * TAX_RATES.laborInsurance) : 0;
  const childCare = isEmployer ? Math.floor(salary * TAX_RATES.childCare) : 0;

  return {
    residentTax,
    healthInsurance,
    employmentInsurance,
    careInsurance,
    pensionInsurance,
    laborInsurance, // 会社負担のみ
    childCare,      // 会社負担のみ
  };
};
