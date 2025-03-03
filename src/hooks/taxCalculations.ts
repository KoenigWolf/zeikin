// =============================
// ファイル: src/hooks/taxCalculations.ts
// 役割  : 所得税を計算
// - 年収から課税所得を算出し、累進課税方式に基づいて税額を算出
// - 可読性と拡張性を考慮し、整理
// =============================

export const calculateIncomeTax = (annualSalary: number): number => {
  // =============================
  // 所得控除の計算
  // - 課税所得を求めるための控除額を算出
  // - 収入に応じた控除額を適用
  // =============================

  const incomeDeduction = (() => {
    if (annualSalary <= 1_800_000) return Math.max(annualSalary * 0.4, 550_000);
    if (annualSalary <= 3_600_000) return annualSalary * 0.3 + 180_000;
    if (annualSalary <= 6_600_000) return annualSalary * 0.2 + 540_000;
    if (annualSalary <= 8_500_000) return annualSalary * 0.1 + 1_200_000;
    return 1_950_000;
  })();

  const basicDeduction = 480_000; // 基礎控除

  // 課税所得の算出（最低 0 円）
  const taxableIncome = Math.max(0, annualSalary - incomeDeduction - basicDeduction);

  // =============================
  // 所得税の計算 (超過累進課税方式)
  // - `taxBrackets` に基づいて税額を算出
  // - 各税率の適用範囲内で適切な税額を計算
  // =============================

  const taxBrackets = [
    { limit: 1_950_000, rate: 0.05 },
    { limit: 3_300_000, rate: 0.1 },
    { limit: 6_950_000, rate: 0.2 },
    { limit: 9_000_000, rate: 0.23 },
    { limit: 18_000_000, rate: 0.33 },
    { limit: 40_000_000, rate: 0.4 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.45 },
  ];

  let tax = 0;
  let previousLimit = 0;

  for (const { limit, rate } of taxBrackets) {
    if (taxableIncome <= previousLimit) break;

    // 課税所得のうち、現在の税率が適用される部分を計算
    const taxableAmount = Math.min(taxableIncome, limit) - previousLimit;
    tax += taxableAmount * rate;

    previousLimit = limit;
  }

  // =============================
  // 税額の四捨五入処理
  // - 100 円単位で切り捨て
  // =============================
  return Math.floor(tax / 100) * 100;
};
