// =============================
// 📂 ファイル: src/hooks/deductions.ts
// 📝 役割: 社員・会社の各種控除額を計算
// - 住民税、健康保険、厚生年金、雇用保険などを算出
// - 会社負担・社員負担を統一して計算
// - 可読性を向上し、メンテナンスしやすく整理
// =============================

// 各種税率・保険料率（最新データに更新可能）
const TAX_RATES = {
  healthInsurance: 0.0987,    // 健康保険料率（9.87%）
  employmentInsurance: 0.003, // 雇用保険料率（0.3%）
  careInsurance: 0.0173,      // 介護保険料率（1.73%）
  pensionInsurance: 0.183,    // 厚生年金保険料率（18.3%）
  laborInsurance: 0.0025,     // 労災保険料率（0.25%）
  childCare: 0.0036,          // 子育て拠出金（0.36%）
  residentTaxRate: 0.10,      // 住民税率（10%）
  residentTaxBase: 5000,      // 住民税均等割（5000円）
  incomeDeduction: 430000,    // 所得控除（43万円）
};

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
  isEmployer: boolean = false
) => {
  // 住民税の計算（所得税後の課税所得の10% + 均等割）
  const taxableResidentIncome = Math.max(0, salary * 12 - TAX_RATES.incomeDeduction);
  const residentTax = Math.floor((taxableResidentIncome * TAX_RATES.residentTaxRate + TAX_RATES.residentTaxBase) / 12 / 2 );

  // 健康保険・介護保険・年金の負担率を計算
  const healthInsurance = Math.floor((salary * TAX_RATES.healthInsurance) / 2);
  const employmentInsurance = Math.floor(salary * TAX_RATES.employmentInsurance);
  const careInsurance = hasCareInsurance ? Math.floor((salary * TAX_RATES.careInsurance) / 2) : 0;
  const pensionInsurance = hasPension ? Math.floor((salary * TAX_RATES.pensionInsurance) / 2) : 0;

  // 会社負担の追加項目
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
