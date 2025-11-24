/**
 * 所得税を計算します（国税庁の公式計算式に基づく）
 * 出典: 国税庁「所得税の税率」https://www.nta.go.jp/taxes/shiraberu/shinkoku/tebiki/2024/03/order4/3-4_26.htm
 * 
 * @param annualSalary 年収（円）
 * @returns 所得税額（復興特別所得税含む、100円未満切り捨て）
 */
export const calculateIncomeTax = (annualSalary: number): number => {
  // 給与所得控除の計算（2020年改正後）
  // 出典: 国税庁「給与所得控除」https://www.nta.go.jp/taxes/shiraberu/shinkoku/tebiki/2024/03/order4/3-4_26.htm
  const incomeDeduction = (() => {
    if (annualSalary <= 1_800_000) return Math.max(annualSalary * 0.4, 550_000);
    if (annualSalary <= 3_600_000) return annualSalary * 0.3 + 180_000;
    if (annualSalary <= 6_600_000) return annualSalary * 0.2 + 540_000;
    if (annualSalary <= 8_500_000) return annualSalary * 0.1 + 1_200_000;
    return 1_950_000;
  })();

  // 基礎控除（2020年改正後: 48万円）
  // 出典: 国税庁「基礎控除」https://www.nta.go.jp/taxes/shiraberu/shinkoku/tebiki/2024/03/order4/3-4_26.htm
  const basicDeduction = 480_000;
  const taxableIncome = Math.max(0, annualSalary - incomeDeduction - basicDeduction);

  // 所得税の速算表（2024年適用）
  // 出典: 国税庁「所得税の税率」https://www.nta.go.jp/taxes/shiraberu/shinkoku/tebiki/2024/03/order4/3-4_26.htm
  // 計算式: 課税所得金額 × 税率 － 控除額
  const taxBrackets = [
    { limit: 1_950_000, rate: 0.05, deduction: 0 },
    { limit: 3_300_000, rate: 0.1, deduction: 97_500 },
    { limit: 6_950_000, rate: 0.2, deduction: 427_500 },
    { limit: 9_000_000, rate: 0.23, deduction: 636_000 },
    { limit: 18_000_000, rate: 0.33, deduction: 1_536_000 },
    { limit: 40_000_000, rate: 0.4, deduction: 2_796_000 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.45, deduction: 4_796_000 },
  ];

  // 課税所得金額が0以下の場合は所得税は0
  if (taxableIncome <= 0) {
    return 0;
  }

  // 課税所得金額に応じた税率と控除額を適用
  let incomeTax = 0;
  for (const { limit, rate, deduction } of taxBrackets) {
    if (taxableIncome <= limit) {
      incomeTax = Math.max(0, Math.floor(taxableIncome * rate - deduction));
      break;
    }
  }

  // 100円未満切り捨て
  incomeTax = Math.floor(incomeTax / 100) * 100;

  // 復興特別所得税の計算（所得税額の2.1%、2037年まで）
  // 出典: 国税庁「復興特別所得税」https://www.nta.go.jp/taxes/shiraberu/shinkoku/tebiki/2024/03/order4/3-4_41_1.htm
  const reconstructionTax = Math.floor(incomeTax * 0.021);

  // 所得税額 + 復興特別所得税額
  return incomeTax + reconstructionTax;
};
