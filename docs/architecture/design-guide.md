# ZEIKIN 設計ガイド

このドキュメントは、ZEIKIN プロジェクトの設計思想、アーキテクチャ、コーディング規約、ベストプラクティスを包括的に説明する設計ガイドです。

## 目次

1. [アーキテクチャ概要](#アーキテクチャ概要)
2. [ディレクトリ構造](#ディレクトリ構造)
3. [デザインシステム](#デザインシステム)
4. [セキュリティ設計](#セキュリティ設計)
5. [状態管理](#状態管理)
6. [エラーハンドリング](#エラーハンドリング)
7. [パフォーマンス最適化](#パフォーマンス最適化)
8. [型安全性](#型安全性)
9. [コーディング規約](#コーディング規約)
10. [拡張性と保守性](#拡張性と保守性)

---

## アーキテクチャ概要

### 設計原則

ZEIKIN プロジェクトは以下の設計原則に基づいて構築されています：

1. **単一責任の原則（SRP）**

   - 各モジュールは 1 つの明確な責任を持つ
   - コンポーネント、フック、ユーティリティは明確に分離

2. **関心の分離（SoC）**

   - UI 層（Components）
   - ビジネスロジック層（Hooks）
   - データ層（Types, Constants）
   - プレゼンテーション層（Styles）

3. **疎結合・高凝集**

   - モジュール間の依存関係を最小化
   - 関連する機能を同じモジュールに集約

4. **DRY（Don't Repeat Yourself）**

   - 重複コードの排除
   - 共通ロジックの抽出と再利用

5. **中央管理（Centralized Management）**
   - カラー、フォント、エフェクト、テキスト、定数の一元管理
   - 変更時の影響範囲を最小化

### アーキテクチャパターン

#### レイヤードアーキテクチャ

```
┌─────────────────────────────────────┐
│   Presentation Layer (Components)   │
│   - TaxCalculator                  │
│   - TaxForm                        │
│   - EmployeeTaxResult              │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Business Logic Layer (Hooks)     │
│   - useTaxCalculation              │
│   - calculateIncomeTax             │
│   - calculateDeductions            │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Data Layer (Types, Constants)    │
│   - TaxCalculationInput            │
│   - TaxCalculationResult           │
│   - CALCULATION_CONSTANTS          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Utility Layer (Utils)             │
│   - validation                     │
│   - security                       │
└─────────────────────────────────────┘
```

#### コンポーネント設計パターン

- **Container/Presentational パターン**

  - Container: `TaxCalculator`（状態管理とロジック）
  - Presentational: `TaxForm`, `EmployeeTaxResult`（表示のみ）

- **Custom Hooks パターン**
  - ビジネスロジックをフックに分離
  - 再利用性とテスタビリティの向上

---

## ディレクトリ構造

### プロジェクト構造

```
zeikin/
├── src/
│   ├── features/          # 機能ベースのモジュール
│   │   └── tax-calculator/
│   │       ├── components/ # 機能固有のコンポーネント
│   │       │   ├── TaxCalculator.tsx
│   │       │   ├── TaxForm.tsx
│   │       │   ├── EmployeeTaxResult.tsx
│   │       │   └── EmployerTaxResult.tsx
│   │       ├── hooks/      # 機能固有のフック
│   │       │   ├── useTaxCalculation.ts
│   │       │   ├── taxCalculations.ts
│   │       │   └── deductions.ts
│   │       └── index.ts   # 機能のエクスポート
│   │
│   ├── domain/            # ドメイン層（ビジネスロジック）
│   │   ├── tax/           # 税金ドメイン
│   │   │   ├── tax.ts     # 型定義
│   │   │   ├── constants.ts # 計算定数
│   │   │   └── index.ts
│   │   ├── validation/     # 検証ドメイン
│   │   │   ├── validation.ts
│   │   │   └── index.ts
│   │   └── security/      # セキュリティドメイン
│   │       ├── security.ts
│   │       └── index.ts
│   │
│   ├── styles/             # スタイル定義
│   │   ├── components/     # コンポーネント固有スタイル
│   │   │   ├── Button.styles.ts
│   │   │   ├── Card.styles.ts
│   │   │   ├── Form.styles.ts
│   │   │   ├── Result.styles.ts
│   │   │   └── Typography.styles.ts
│   │   ├── theme/          # テーマ設定（中央管理）
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   ├── spacing.ts
│   │   │   ├── effects.ts
│   │   │   └── index.ts
│   │   ├── shared.styles.ts
│   │   └── index.ts
│   │
│   ├── constants/          # アプリケーション定数
│   │   ├── texts.ts        # テキスト定数
│   │   └── index.ts
│   │
│   ├── config/             # 設定ファイル
│   │   └── index.ts
│   │
│   ├── utils/              # ユーティリティ関数
│   │   └── index.ts
│   │
│   ├── assets/             # ソース内アセット
│   │   ├── images/
│   │   └── fonts/
│   │
│   ├── App.tsx             # アプリケーションルート
│   └── main.tsx            # エントリーポイント
│
├── public/                 # 静的ファイル
├── index.html              # HTMLテンプレート
├── vite.config.ts          # Vite設定
├── tsconfig.json           # TypeScript設定
└── package.json            # 依存関係
```

詳細は [ディレクトリ構造](./directory-structure.md) を参照してください。

### ディレクトリの役割

#### `features/`

- **役割**: 機能ベースのモジュール
- **構造**:
  - 各機能は独立したディレクトリを持つ
  - `components/`: 機能固有のコンポーネント
  - `hooks/`: 機能固有のフック
  - `index.ts`: 機能のエクスポート
- **原則**:
  - 機能ごとに独立したディレクトリ
  - 機能内で完結する依存関係
  - 他の機能への依存を最小化

#### `domain/`

- **役割**: ビジネスロジックとドメインモデル
- **構造**:
  - `tax/`: 税金計算のドメインロジック
  - `validation/`: 入力検証のロジック
  - `security/`: セキュリティ関連のロジック
- **原則**:
  - UI に依存しない純粋なロジック
  - 再利用可能な関数
  - テスト容易性

#### `styles/`

- **役割**: スタイル定義の一元管理
- **構造**:
  - `components/`: コンポーネント固有のスタイル
  - `theme/`: テーマ設定（カラー、タイポグラフィ、エフェクト、スペーシング）
  - `shared.styles.ts`: 共通レイアウトコンポーネント

#### `config/`

- **役割**: アプリケーションの設定
- **内容**:
  - アプリケーション名、バージョン
  - 環境変数
  - 設定値

#### `constants/`

- **役割**: 定数の一元管理
- **内容**:
  - `texts.ts`: UI テキスト
  - `calculations.ts`: 計算定数

#### `utils/`

- **役割**: 汎用的なユーティリティ関数
- **内容**:
  - `validation.ts`: 入力検証
  - `security.ts`: セキュリティ関連

---

## デザインシステム

### カラーシステム

カラーは `src/styles/theme/colors.ts` で一元管理されています。

#### カラーパレット構造

```typescript
colors = {
  primary: {
    main: "#2B4C8C", // メインカラー
    light: "#1E88E5", // ライトバージョン
    gradient: "...", // グラデーション
    hover: "...", // ホバー時のグラデーション
  },
  background: {
    main: "...", // メイン背景
    card: "#FFFFFF", // カード背景
    overlay: "...", // オーバーレイ
    paper: "...", // ペーパー背景
    // ...
  },
  text: {
    /* ... */
  },
  border: {
    /* ... */
  },
  shadow: {
    /* ... */
  },
  gradient: {
    /* ... */
  },
  accent: {
    /* ... */
  },
};
```

#### 使用原則

1. **ハードコード禁止**: すべてのカラーは `colors.ts` から参照
2. **意味のある命名**: 用途に応じた名前を使用
3. **一貫性**: 同じ用途には同じカラーを使用

### タイポグラフィシステム

タイポグラフィは `src/styles/theme/typography.ts` で一元管理されています。

#### 構造

```typescript
typography = {
  // 基本タイポグラフィ
  h1,
  h2,
  h3,
  h4,
  h5,
  body1,
  body2,

  // レスポンシブタイポグラフィ
  responsiveTypography: {
    header: { xs, sm, md },
    title: { xs, sm, md },
    // ...
  },

  // コンポーネント固有タイポグラフィ
  componentTypography: {
    button: { fontSize, fontWeight, letterSpacing },
    formLabel: {
      /* ... */
    },
    // ...
  },
};
```

#### 使用原則

1. **階層の明確化**: 視覚的階層をタイポグラフィで表現
2. **レスポンシブ対応**: 画面サイズに応じた最適なサイズ
3. **一貫性**: 同じ役割には同じタイポグラフィ設定

### エフェクトシステム

エフェクトは `src/styles/theme/effects.ts` で一元管理されています。

#### 構造

```typescript
effects = {
  transitions: {
    standard: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fast: "all 0.2s ease",
    // ...
  },
  animations: {
    fadeIn: { timeout: 600 },
    hover: { translateY: "-2px" },
  },
  effects: {
    blur: { light: "blur(10px)", medium: "blur(12px)" },
    opacity: { hidden: 0, visible: 1, semi: 0.9 },
    transform: { hover: "translateY(-2px)", reset: "translateY(0px)" },
  },
  borderRadius: { small: 1.5, medium: 2, large: 2.5 /* ... */ },
  dimensions: {
    /* ... */
  },
  container: { maxWidth: { sm, md, lg, xl } },
};
```

#### 使用原則

1. **統一されたトランジション**: 同じ種類のアニメーションには同じ設定を使用
2. **パフォーマンス考慮**: 軽量なアニメーションを優先
3. **アクセシビリティ**: ユーザーの設定に応じたアニメーション制御

### スペーシングシステム

スペーシングは `src/styles/theme/spacing.ts` で一元管理されています。

#### 構造

```typescript
spacing = {
  xs: "0.5rem",
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
  xl: "2.5rem",
  xxl: "3rem",
};

responsiveSpacing = {
  container: { xs, sm, md },
  content: { xs, sm, md },
  gap: { xs, sm, md },
};
```

#### 使用原則

1. **8px グリッドシステム**: 基本的に 8px の倍数を使用
2. **レスポンシブ対応**: 画面サイズに応じた適切なスペーシング
3. **一貫性**: 同じ用途には同じスペーシング値を使用

---

## セキュリティ設計

### 入力検証

すべてのユーザー入力は厳密に検証されます。

#### 検証レイヤー

1. **クライアントサイド検証** (`src/utils/validation.ts`)

   - 型チェック
   - 範囲チェック
   - フォーマットチェック

2. **リアルタイム検証**
   - 入力中の即座なフィードバック
   - エラーメッセージの表示

#### 検証関数

```typescript
// 数値検証
validateNumber(value, options);
validateSalary(value);
validateBonus(value);

// サニタイゼーション
sanitizeInput(value);
isSafeNumber(value);

// 安全な計算
safeMathOperation(operation, fallback, errorMessage);
```

### XSS 対策

#### 対策方法

1. **HTML エスケープ** (`src/utils/security.ts`)

   ```typescript
   escapeHtml(unsafe);
   sanitizeString(input);
   preventInjection(input);
   ```

2. **React の自動エスケープ**

   - React はデフォルトで XSS を防止
   - `dangerouslySetInnerHTML` の使用禁止

3. **アイコンのサニタイゼーション**
   - 絵文字アイコンの特殊文字を除去

### Content Security Policy (CSP)

`index.html` に CSP メタタグを設定：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; ..."
/>
```

### セキュリティヘッダー

開発サーバーと本番環境で以下のヘッダーを設定：

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### 数値計算の安全性

すべての数値計算は安全チェックを通過します：

```typescript
// 安全な計算の例
const result = safeMathOperation(() => calculateTax(amount), 0, "計算エラー");

if (!isSafeNumber(result)) {
  throw new Error("Invalid calculation result");
}
```

---

## 状態管理

### 状態管理戦略

ZEIKIN は軽量な状態管理を採用しています：

1. **ローカル状態**: `useState` を使用
2. **ビジネスロジック**: Custom Hooks に分離
3. **グローバル状態**: 現時点では不要（将来的に必要になった場合は Context API または状態管理ライブラリを検討）

### 状態の構造

```typescript
// TaxCalculator.tsx
const [inputs, setInputs] = useState({
  baseSalary: "30",
  bonus: "",
  hasPension: false,
  hasCareInsurance: false,
  hasChildCare: false,
});

const [result, setResult] = useState<TaxCalculationResult | null>(null);
const [error, setError] = useState<string | null>(null);
```

### 状態更新の原則

1. **不変性**: 状態は直接変更せず、新しいオブジェクトを作成
2. **型安全性**: TypeScript の型チェックを活用
3. **検証**: 状態更新前に必ず検証

---

## エラーハンドリング

### エラーハンドリング戦略

1. **入力エラー**: リアルタイムで検証し、ユーザーに即座にフィードバック
2. **計算エラー**: 安全な計算ラッパーで捕捉し、フォールバック値を返す
3. **表示エラー**: Snackbar でユーザーに通知

### エラー表示

```typescript
// TaxCalculator.tsx
<Snackbar
  open={error !== null}
  autoHideDuration={6000}
  onClose={handleCloseError}
>
  <Alert severity="error">{error}</Alert>
</Snackbar>
```

### エラーメッセージの原則

1. **明確性**: ユーザーが理解しやすいメッセージ
2. **具体的性**: 何が問題なのかを明確に
3. **日本語**: ユーザー向けメッセージは日本語

---

## パフォーマンス最適化

### レンダリング最適化

1. **メモ化**

   ```typescript
   const handleInputChange = useCallback((key, value) => {
     // ...
   }, []);
   ```

2. **条件付きレンダリング**
   ```typescript
   <Fade in={result !== null} timeout={600}>
     {/* 結果表示 */}
   </Fade>
   ```

### バンドルサイズ最適化

1. **コード分割** (`vite.config.ts`)

   ```typescript
   rollupOptions: {
     output: {
       manualChunks: {
         'react-vendor': ['react', 'react-dom'],
         'mui-vendor': ['@mui/material', ...],
       },
     },
   }
   ```

2. **Tree Shaking**: 未使用コードの自動削除
3. **本番ビルド最適化**: console と debugger の削除

### パフォーマンス監視

将来的に以下を実装予定：

- React DevTools Profiler での分析
- Lighthouse でのパフォーマンススコア測定
- バンドルサイズの監視

---

## 型安全性

### TypeScript 設定

`tsconfig.app.json` で厳格な型チェックを有効化：

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### 型定義の原則

1. **明示的な型定義**: `any` 型の使用を禁止
2. **インターフェースの活用**: オブジェクト型はインターフェースで定義
3. **型の一元管理**: `types/` ディレクトリで管理
4. **型の再利用**: 重複型定義を避ける

### 型定義の例

```typescript
// types/tax.ts
export interface TaxCalculationInput {
  baseSalary: number;
  bonus: number;
  hasPension: boolean;
  hasCareInsurance: boolean;
  hasChildCare: boolean;
}

export interface TaxCalculationResult {
  employee: {
    /* ... */
  };
  employer: {
    /* ... */
  };
}
```

---

## コーディング規約

### 命名規則

| 種類             | 規則                     | 例                    |
| ---------------- | ------------------------ | --------------------- |
| コンポーネント   | PascalCase               | `TaxCalculator`       |
| 関数・変数       | camelCase                | `calculateTax`        |
| 定数             | UPPER_SNAKE_CASE         | `TAX_RATES`           |
| インターフェース | PascalCase               | `TaxCalculationInput` |
| ファイル名       | コンポーネントと同じ     | `TaxCalculator.tsx`   |
| フック           | camelCase (use で始まる) | `useTaxCalculation`   |

### インポート順序

1. React 関連
2. 外部ライブラリ（MUI など）
3. 内部コンポーネント
4. 内部フック
5. スタイル
6. 型定義
7. ユーティリティ
8. 定数

```typescript
// 例
import { useState } from "react";
import { Box, Alert } from "@mui/material";
import { TaxForm } from "./TaxForm";
import { useTaxCalculation } from "@hooks/useTaxCalculation";
import { StyledCard } from "@styles/components/Card.styles";
import type { TaxCalculationResult } from "../types/tax";
import { validateSalary } from "@utils/validation";
import { texts } from "../constants/texts";
```

### コードフォーマット

- **インデント**: 2 スペース
- **行末**: セミコロン必須
- **行の最大長**: 100 文字を目安
- **引用符**: シングルクォートを優先

### コメント規約

1. **複雑なロジック**: 日本語でコメントを記述
2. **JSDoc**: 公開 API には JSDoc コメントを追加
3. **セクション区切り**: 明確なセクション区切りを使用

```typescript
// =============================
// 所得税計算
// =============================
export const calculateIncomeTax = (annualSalary: number): number => {
  // ...
};
```

---

## 拡張性と保守性

### 新機能追加のガイドライン

1. **ディレクトリ構造の遵守**: 既存の構造に従う
2. **型定義の追加**: 新しい型は `types/` に追加
3. **定数の一元管理**: 新しい定数は `constants/` に追加
4. **スタイルの一元管理**: 新しいスタイルは `styles/theme/` に追加

### リファクタリングの原則

1. **段階的な改善**: 一度に大きな変更を避ける
2. **後方互換性**: 既存の API を壊さない
3. **テスト**: リファクタリング前後でテストを実行

### コードレビューのチェックリスト

- [ ] 型定義が適切か
- [ ] エラーハンドリングが適切か
- [ ] セキュリティ対策が取られているか
- [ ] パフォーマンスに問題がないか
- [ ] コメントが適切か
- [ ] 命名規則に従っているか
- [ ] 重複コードがないか

---

## まとめ

この設計ガイドは、ZEIKIN プロジェクトの設計思想とベストプラクティスをまとめたものです。新しい機能を追加する際や、コードレビューを行う際の参考として活用してください。

### 重要な原則の再確認

1. **中央管理**: カラー、フォント、エフェクト、テキスト、定数は一元管理
2. **型安全性**: TypeScript の型システムを最大限活用
3. **セキュリティ**: 入力検証と XSS 対策を徹底
4. **パフォーマンス**: レンダリングとバンドルサイズの最適化
5. **保守性**: 明確な構造と命名規則

### 今後の改善点

- [ ] テストカバレッジの向上
- [ ] アクセシビリティの強化
- [ ] 国際化（i18n）対応
- [ ] パフォーマンス監視の実装
- [ ] エラートラッキングの導入

---

---

## 関連ドキュメント

- [ディレクトリ構造](./directory-structure.md)
- [API リファレンス](../reference/api.md)
- [セキュリティポリシー](../guides/security.md)
- [デプロイメントガイド](../guides/deployment.md)

---

**最終更新**: 2025 年
**バージョン**: 2.0.0
