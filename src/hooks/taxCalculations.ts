// =============================
// ファイル: src/hooks/taxCalculations.ts
// 役割  : 所得税を計算
// - 年収から課税所得を算出し、税率を適用
// =============================

export const calculateIncomeTax = (annualSalary: number): number => {
  // 所得控除の計算（課税所得を求める）
  const incomeDeduction =
    annualSalary <= 1800000 ? Math.max(annualSalary * 0.4, 550000) :
    annualSalary <= 3600000 ? annualSalary * 0.3 + 180000 :
    annualSalary <= 6600000 ? annualSalary * 0.2 + 540000 :
    annualSalary <= 8500000 ? annualSalary * 0.1 + 1200000 : 1950000;

  const basicDeduction = 480000; // 基礎控除
  const taxableIncome = Math.max(0, annualSalary - incomeDeduction - basicDeduction);

  // 所得税率表（超過累進課税方式）
  const taxBrackets = [
    { limit: 1950000, rate: 0.05 },
    { limit: 3300000, rate: 0.1 },
    { limit: 6950000, rate: 0.2 },
    { limit: 9000000, rate: 0.23 },
    { limit: 18000000, rate: 0.33 },
    { limit: 40000000, rate: 0.4 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.45 },
  ];

  let tax = 0;
  let previousLimit = 0;
  for (const { limit, rate } of taxBrackets) {
    if (taxableIncome <= previousLimit) break;
    tax += (Math.min(taxableIncome, limit) - previousLimit) * rate;
    previousLimit = limit;
  }

  // 所得税を 100 円未満で四捨五入して返す
  return Math.floor(tax / 100) * 100;
};
