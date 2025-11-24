import type { MonthlyAnnual } from '@domain/tax';

export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString()} 円`;
};

export const calculateTotal = (
  items: Record<string, MonthlyAnnual | undefined>,
  key: keyof MonthlyAnnual
): number => {
  return Object.values(items)
    .filter((item): item is MonthlyAnnual => item !== undefined)
    .reduce((total, item) => total + item[key], 0);
};
