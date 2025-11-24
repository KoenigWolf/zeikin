export const calculateIncomeTax = (annualSalary: number): number => {
  const incomeDeduction = (() => {
    if (annualSalary <= 1_800_000) return Math.max(annualSalary * 0.4, 550_000);
    if (annualSalary <= 3_600_000) return annualSalary * 0.3 + 180_000;
    if (annualSalary <= 6_600_000) return annualSalary * 0.2 + 540_000;
    if (annualSalary <= 8_500_000) return annualSalary * 0.1 + 1_200_000;
    return 1_950_000;
  })();

  const basicDeduction = 480_000;
  const taxableIncome = Math.max(0, annualSalary - incomeDeduction - basicDeduction);

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

    const taxableAmount = Math.min(taxableIncome, limit) - previousLimit;
    tax += taxableAmount * rate;

    previousLimit = limit;
  }

  return Math.floor(tax / 100) * 100;
};
