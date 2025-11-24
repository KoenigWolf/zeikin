# ZEIKIN API ドキュメント

このドキュメントは、ZEIKIN プロジェクトの主要な関数、フック、ユーティリティの API リファレンスです。

## 目次

1. [Hooks](#hooks)
2. [Validation Utilities](#validation-utilities)
3. [Security Utilities](#security-utilities)
4. [Calculation Functions](#calculation-functions)
5. [Type Definitions](#type-definitions)

---

## Hooks

### `useTaxCalculation`

税金計算のメインフック。給与とボーナスから各種税金と社会保険料を計算します。

#### 使用方法

```typescript
import { useTaxCalculation } from "@hooks/useTaxCalculation";

const { calculate } = useTaxCalculation();
const result = calculate({
  baseSalary: 30,
  bonus: 50,
  hasPension: true,
  hasCareInsurance: true,
  hasChildCare: false,
});
```

#### パラメータ

**`input: TaxCalculationInput`**

```typescript
interface TaxCalculationInput {
  baseSalary: number; // 月給（万円単位）
  bonus: number; // ボーナス（万円単位）
  hasPension: boolean; // 厚生年金の有無
  hasCareInsurance: boolean; // 介護保険の有無
  hasChildCare: boolean; // 子育て拠出金の有無
}
```

#### 戻り値

**`TaxCalculationResult`**

```typescript
interface TaxCalculationResult {
  employee: {
    grossIncome: MonthlyAnnual; // 額面収入
    incomeTax: MonthlyAnnual; // 所得税
    residentTax: MonthlyAnnual; // 住民税
    healthInsurance: MonthlyAnnual; // 健康保険
    pensionInsurance?: MonthlyAnnual; // 厚生年金（オプション）
    careInsurance?: MonthlyAnnual; // 介護保険（オプション）
    employmentInsurance: MonthlyAnnual; // 雇用保険
    totalTax: MonthlyAnnual; // 税金合計
    takeHome: MonthlyAnnual; // 手取り額
  };
  employer: {
    residentTax: MonthlyAnnual; // 住民税
    healthInsurance: MonthlyAnnual; // 健康保険
    pensionInsurance?: MonthlyAnnual; // 厚生年金（オプション）
    careInsurance?: MonthlyAnnual; // 介護保険（オプション）
    employmentInsurance: MonthlyAnnual; // 雇用保険
    laborInsurance: MonthlyAnnual; // 労災保険
    childCare?: MonthlyAnnual; // 子育て拠出金（オプション）
    totalEmployerTax: MonthlyAnnual; // 会社負担税金合計
  };
}
```

#### エラー

以下の場合にエラーをスローします：

- 入力値が安全な数値範囲外の場合
- 計算結果が安全な数値範囲外の場合
- 計算中にエラーが発生した場合

#### 例

```typescript
try {
  const result = calculate({
    baseSalary: 30,
    bonus: 50,
    hasPension: true,
    hasCareInsurance: false,
    hasChildCare: false,
  });
  console.log(result.employee.takeHome.monthly); // 手取り額（月額）
} catch (error) {
  console.error("計算エラー:", error);
}
```

---

## Validation Utilities

### `validateNumber`

数値の検証を行います。

#### シグネチャ

```typescript
function validateNumber(
  value: string | number | null | undefined,
  options?: {
    min?: number;
    max?: number;
    allowZero?: boolean;
    allowNegative?: boolean;
    fieldName?: string;
  }
): ValidationResult;
```

#### パラメータ

- **`value`**: 検証する値（文字列、数値、null、undefined）
- **`options`** (オプション):
  - `min`: 最小値（デフォルト: 0）
  - `max`: 最大値（デフォルト: `Number.MAX_SAFE_INTEGER`）
  - `allowZero`: 0 を許可するか（デフォルト: true）
  - `allowNegative`: 負の値を許可するか（デフォルト: false）
  - `fieldName`: フィールド名（エラーメッセージ用、デフォルト: '値'）

#### 戻り値

```typescript
interface ValidationResult {
  isValid: boolean; // 検証結果
  error?: string; // エラーメッセージ（無効な場合）
  sanitizedValue?: number; // サニタイズされた値（有効な場合）
}
```

#### 例

```typescript
import { validateNumber } from "@utils/validation";

const result = validateNumber("100", {
  min: 0,
  max: 1000,
  allowZero: false,
  fieldName: "月給",
});

if (result.isValid) {
  console.log(result.sanitizedValue); // 100
} else {
  console.error(result.error);
}
```

### `validateSalary`

月給の検証を行います。

#### シグネチャ

```typescript
function validateSalary(
  value: string | number | null | undefined
): ValidationResult;
```

#### パラメータ

- **`value`**: 検証する月給の値

#### 戻り値

`ValidationResult`（月給用の検証結果）

#### 検証ルール

- 最小値: 0
- 最大値: 1,000,000（万円）
- 0 は許可しない
- 負の値は許可しない

#### 例

```typescript
import { validateSalary } from "@utils/validation";

const result = validateSalary("30");
if (result.isValid) {
  // 30万円は有効
}
```

### `validateBonus`

ボーナスの検証を行います。

#### シグネチャ

```typescript
function validateBonus(
  value: string | number | null | undefined
): ValidationResult;
```

#### パラメータ

- **`value`**: 検証するボーナスの値

#### 戻り値

`ValidationResult`（ボーナス用の検証結果）

#### 検証ルール

- 最小値: 0
- 最大値: 10,000,000（万円）
- 0 は許可する
- 負の値は許可しない

### `sanitizeInput`

入力値をサニタイズします。

#### シグネチャ

```typescript
function sanitizeInput(value: string): string;
```

#### パラメータ

- **`value`**: サニタイズする文字列

#### 戻り値

サニタイズされた文字列（数字、ドット、ハイフンのみ）

#### 例

```typescript
import { sanitizeInput } from "@utils/validation";

const sanitized = sanitizeInput("abc123.45"); // '123.45'
```

### `isSafeNumber`

数値が安全な範囲内かチェックします。

#### シグネチャ

```typescript
function isSafeNumber(value: number): boolean;
```

#### パラメータ

- **`value`**: チェックする数値

#### 戻り値

安全な範囲内の場合 `true`、そうでない場合 `false`

#### チェック内容

- `Number.isFinite(value)` が `true`
- `Number.isNaN(value)` が `false`
- `value <= Number.MAX_SAFE_INTEGER`
- `value >= Number.MIN_SAFE_INTEGER`

### `safeMathOperation`

安全な数値計算を実行します。

#### シグネチャ

```typescript
function safeMathOperation<T>(
  operation: () => T,
  fallback: T,
  errorMessage?: string
): T;
```

#### パラメータ

- **`operation`**: 実行する計算関数
- **`fallback`**: エラー時のフォールバック値
- **`errorMessage`** (オプション): エラーメッセージ

#### 戻り値

計算結果、またはエラー時はフォールバック値

#### 例

```typescript
import { safeMathOperation } from "@utils/validation";

const result = safeMathOperation(() => calculateTax(amount), 0, "計算エラー");
```

---

## Security Utilities

### `sanitizeString`

HTML エスケープを行います。

#### シグネチャ

```typescript
function sanitizeString(input: string): string;
```

#### パラメータ

- **`input`**: サニタイズする文字列

#### 戻り値

HTML エスケープされた文字列

### `escapeHtml`

HTML 特殊文字をエスケープします。

#### シグネチャ

```typescript
function escapeHtml(unsafe: string): string;
```

#### パラメータ

- **`unsafe`**: エスケープする文字列

#### 戻り値

エスケープされた文字列

#### エスケープされる文字

- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&#039;`

### `preventInjection`

インジェクション攻撃を防止します。

#### シグネチャ

```typescript
function preventInjection(input: string): string;
```

#### パラメータ

- **`input`**: サニタイズする文字列

#### 戻り値

サニタイズされた文字列

#### 除去されるパターン

- `<script>` タグ
- `javascript:` プロトコル
- `on*` イベントハンドラー

---

## Calculation Functions

### `calculateIncomeTax`

所得税を計算します。

#### シグネチャ

```typescript
function calculateIncomeTax(annualSalary: number): number;
```

#### パラメータ

- **`annualSalary`**: 年収（円）

#### 戻り値

所得税額（円、100 円未満切り捨て）

#### 計算ロジック

1. 給与所得控除を計算
2. 基礎控除（48 万円）を適用
3. 課税所得金額を算出
4. 累進税率を適用して所得税を計算

#### 税率表

| 課税所得金額（円） | 税率 |
| ------------------ | ---- |
| ～ 1,950,000       | 5%   |
| 1,950,001 ～       | 10%  |
| 3,300,001 ～       | 20%  |
| 6,950,001 ～       | 23%  |
| 9,000,001 ～       | 33%  |
| 18,000,001 ～      | 40%  |
| 40,000,001 ～      | 45%  |

### `calculateDeductions`

社会保険料と住民税を計算します。

#### シグネチャ

```typescript
function calculateDeductions(
  salary: number,
  hasPension: boolean,
  hasCareInsurance: boolean,
  isEmployer?: boolean
): Deductions;
```

#### パラメータ

- **`salary`**: 月額給与（円）
- **`hasPension`**: 厚生年金の有無
- **`hasCareInsurance`**: 介護保険の有無
- **`isEmployer`** (オプション): 事業主負担かどうか（デフォルト: false）

#### 戻り値

```typescript
interface Deductions {
  residentTax: number; // 住民税（月額）
  healthInsurance: number; // 健康保険（月額）
  employmentInsurance: number; // 雇用保険（月額）
  careInsurance: number; // 介護保険（月額）
  pensionInsurance: number; // 厚生年金（月額）
  laborInsurance: number; // 労災保険（月額、事業主のみ）
  childCare: number; // 子育て拠出金（月額、事業主のみ）
}
```

#### 保険料率

- 健康保険: 9.87%
- 厚生年金: 18.3%
- 雇用保険: 0.3%（労働者負担）
- 介護保険: 1.73%
- 労災保険: 0.25%（事業主負担のみ）
- 子育て拠出金: 0.36%（事業主負担のみ）
- 住民税: 10%（所得割）+ 5,000 円（均等割）

---

## Type Definitions

### `TaxCalculationInput`

税金計算の入力型。

```typescript
interface TaxCalculationInput {
  baseSalary: number; // 月給（万円単位）
  bonus: number; // ボーナス（万円単位）
  hasPension: boolean; // 厚生年金の有無
  hasCareInsurance: boolean; // 介護保険の有無
  hasChildCare: boolean; // 子育て拠出金の有無
}
```

### `TaxCalculationResult`

税金計算の結果型。

```typescript
interface TaxCalculationResult {
  employee: EmployeeTaxResult;
  employer: EmployerTaxResult;
}
```

### `MonthlyAnnual`

月額と年額を保持する型。

```typescript
interface MonthlyAnnual {
  monthly: number; // 月額（円）
  annual: number; // 年額（円）
}
```

### `ValidationResult`

検証結果の型。

```typescript
interface ValidationResult {
  isValid: boolean; // 検証結果
  error?: string; // エラーメッセージ
  sanitizedValue?: number; // サニタイズされた値
}
```

---

## 定数

### `CALCULATION_CONSTANTS`

計算で使用する定数。

```typescript
export const CALCULATION_CONSTANTS = {
  conversion: {
    manToYen: 10000, // 万円から円への変換
    monthsPerYear: 12, // 1 年の月数
    residentTaxPaymentsPerYear: 2, // 住民税の年払い回数
  },
} as const;
```

### `TAX_RATES` (deductions.ts)

各種税率の定数。

```typescript
const TAX_RATES = {
  healthInsurance: 0.0987, // 健康保険料率
  employmentInsurance: 0.003, // 雇用保険料率
  careInsurance: 0.0173, // 介護保険料率
  pensionInsurance: 0.183, // 厚生年金保険料率
  laborInsurance: 0.0025, // 労災保険料率
  childCare: 0.0036, // 子育て拠出金
  residentTaxRate: 0.1, // 住民税率
  residentTaxBase: 5_000, // 住民税均等割
  incomeDeduction: 430_000, // 所得控除
} as const;
```

---

## エラーハンドリング

### エラーの種類

1. **入力検証エラー**

   - 無効な入力値
   - 範囲外の値
   - 型エラー

2. **計算エラー**

   - 安全な数値範囲外
   - NaN または Infinity
   - オーバーフロー

3. **実行時エラー**
   - 予期しないエラー
   - システムエラー

### エラー処理のベストプラクティス

```typescript
try {
  const validation = validateSalary(input);
  if (!validation.isValid) {
    // 検証エラーを表示
    setError(validation.error);
    return;
  }

  const result = calculate({
    baseSalary: validation.sanitizedValue!,
    // ...
  });
} catch (error) {
  // 予期しないエラーを処理
  console.error("計算エラー:", error);
  setError("計算中にエラーが発生しました");
}
```

---

---

## 関連ドキュメント

- [設計ガイド](../architecture/design-guide.md)
- [ディレクトリ構造](../architecture/directory-structure.md)
- [トラブルシューティング](../guides/troubleshooting.md)

---

**最終更新**: 2025 年
**バージョン**: 2.0.0
