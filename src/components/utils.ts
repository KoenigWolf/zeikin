// =============================
// 📂 ファイル: src/utils.ts
// 🚀 ユーティリティ関数集
// `formatCurrency()`: 日本円表記フォーマット関数
// `calculateTotal()`: 指定したキーの合計計算関数
// 共通関数を一元管理し、コンポーネント間の一貫性を確保
// =============================

// =============================
// 💡 インターフェース定義
// `MonthlyAnnual` は年額・月額のデータ構造を定義
// =============================
interface MonthlyAnnual {
  annual: number;
  monthly: number;
}

// =============================
// 💰 日本円フォーマット関数: formatCurrency
// 数値を "1,234 円" の形式に変換
// `toLocaleString()` を使用し、日本円表記に統一
// `円` の単位を明示的に追加
// =============================
export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString()} 円`;
};

// =============================
// 🔢 合計計算関数: calculateTotal
// `items` オブジェクト配列の指定キー（annual / monthly）の合計を計算
// `pensionInsurance` などのオプショナル項目も考慮し、存在しない場合は `0` を返す
// `filter()` に型ガードを適用し、`undefined` を除外
// =============================
export const calculateTotal = (
  items: Record<string, MonthlyAnnual | undefined>,
  key: keyof MonthlyAnnual // 'annual' または 'monthly' を指定
): number => {
  return Object.values(items)
    .filter((item): item is MonthlyAnnual => item !== undefined) // `undefined` を除外
    .reduce((total, item) => total + item[key], 0); // 指定キーの合計を計算
};
