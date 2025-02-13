// =============================
// 📂 ファイル: src/utils.ts
// 🚀 ユーティリティ関数集
// - `formatCurrency()`: 日本円表記フォーマット関数
// - `calculateTotal()`: 指定したキーの合計計算関数
// - 共通関数を一元管理し、コンポーネント間の一貫性を確保
// =============================

interface MonthlyAnnual {
  annual: number;
  monthly: number;
}

// =============================
// 通貨フォーマット関数
// - 数値を "1,234 円" の形式に変換
// - `toLocaleString()` を使用し、日本円表記に統一
// =============================
export const formatCurrency = (amount: number): string => `${amount.toLocaleString()} 円`;

// =============================
// 合計計算関数
// - `items` オブジェクト配列の指定キー（annual/monthly）を合計
// - `pensionInsurance` などのオプショナル項目も考慮し、存在しない場合は `0` を返す
// =============================
export const calculateTotal = (items: { [key: string]: MonthlyAnnual | undefined }, key: 'annual' | 'monthly'): number => {
  return Object.values(items)
    .filter((item): item is MonthlyAnnual => item !== undefined)
    .reduce((total, item) => total + item[key], 0);
};
