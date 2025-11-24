# ZEIKIN ディレクトリ構造

このドキュメントは、ZEIKIN プロジェクトの最適化されたディレクトリ構造を説明します。

## 全体構造

```
zeikin/
├── public/                    # 静的ファイル
│   └── assets/               # アセットファイル
│       ├── images/           # 画像ファイル
│       └── fonts/            # フォントファイル
│
├── src/                      # ソースコード
│   ├── features/             # 機能ベースのモジュール
│   │   └── tax-calculator/   # 税金計算機能
│   │       ├── components/  # 機能固有のコンポーネント
│   │       │   ├── TaxCalculator.tsx
│   │       │   ├── TaxForm.tsx
│   │       │   ├── EmployeeTaxResult.tsx
│   │       │   └── EmployerTaxResult.tsx
│   │       ├── hooks/        # 機能固有のフック
│   │       │   ├── useTaxCalculation.ts
│   │       │   ├── taxCalculations.ts
│   │       │   └── deductions.ts
│   │       └── index.ts      # 機能のエクスポート
│   │
│   ├── domain/               # ドメイン層（ビジネスロジック）
│   │   ├── tax/              # 税金ドメイン
│   │   │   ├── tax.ts        # 型定義
│   │   │   ├── constants.ts  # 計算定数
│   │   │   └── index.ts      # エクスポート
│   │   ├── validation/       # 検証ドメイン
│   │   │   ├── validation.ts # 検証関数
│   │   │   └── index.ts      # エクスポート
│   │   └── security/         # セキュリティドメイン
│   │       ├── security.ts   # セキュリティ関数
│   │       └── index.ts      # エクスポート
│   │
│   ├── styles/               # スタイル定義
│   │   ├── components/       # コンポーネント固有スタイル
│   │   │   ├── Button.styles.ts
│   │   │   ├── Card.styles.ts
│   │   │   ├── Form.styles.ts
│   │   │   ├── Result.styles.ts
│   │   │   └── Typography.styles.ts
│   │   ├── theme/            # テーマ設定
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   ├── spacing.ts
│   │   │   ├── effects.ts
│   │   │   └── index.ts
│   │   ├── shared.styles.ts  # 共通スタイル
│   │   └── index.ts          # スタイルのエクスポート
│   │
│   ├── constants/            # アプリケーション定数
│   │   ├── texts.ts          # UI テキスト
│   │   └── index.ts          # エクスポート
│   │
│   ├── config/               # 設定ファイル
│   │   └── index.ts          # アプリケーション設定
│   │
│   ├── utils/                 # ユーティリティ関数
│   │   └── index.ts          # 汎用ユーティリティ
│   │
│   ├── assets/               # ソース内アセット
│   │   ├── images/           # 画像
│   │   └── fonts/            # フォント
│   │
│   ├── __tests__/            # テストファイル（将来用）
│   │
│   ├── App.tsx               # アプリケーションルート
│   └── main.tsx              # エントリーポイント
│
├── docs/                     # ドキュメント（オプション）
│
├── .github/                  # GitHub 設定
│   └── workflows/            # CI/CD ワークフロー
│
├── index.html                # HTML テンプレート
├── vite.config.ts            # Vite 設定
├── tsconfig.json             # TypeScript 設定
├── tsconfig.app.json         # アプリ用 TypeScript 設定
├── package.json              # 依存関係
└── README.md                 # プロジェクト説明
```

## ディレクトリの説明

### `src/features/`

機能ベースのモジュールを配置します。各機能は独立したディレクトリを持ち、その機能に関連するすべてのコンポーネント、フック、型定義を含みます。

**原則**:

- 機能ごとに独立したディレクトリ
- 機能内で完結する依存関係
- 他の機能への依存を最小化

**例**: `tax-calculator/` 機能には、税金計算に関連するすべてのコンポーネントとフックが含まれます。

### `src/domain/`

ビジネスロジックとドメインモデルを配置します。アプリケーションの核心となるロジックを管理します。

**サブディレクトリ**:

- `tax/`: 税金計算のドメインロジック
- `validation/`: 入力検証のロジック
- `security/`: セキュリティ関連のロジック

**原則**:

- UI に依存しない純粋なロジック
- 再利用可能な関数
- テスト容易性

### `src/styles/`

スタイル定義を一元管理します。

**構造**:

- `components/`: コンポーネント固有のスタイル
- `theme/`: テーマ設定（カラー、タイポグラフィ、スペーシング、エフェクト）
- `shared.styles.ts`: 共通レイアウトコンポーネント

### `src/constants/`

アプリケーション全体で使用する定数を管理します。

**内容**:

- `texts.ts`: UI テキスト（国際化対応の準備）

### `src/config/`

アプリケーションの設定を管理します。

**内容**:

- アプリケーション名、バージョン
- 環境変数
- 設定値

### `src/utils/`

汎用的なユーティリティ関数を配置します。

**原則**:

- ドメインに依存しない汎用関数
- 再利用可能な関数

## パスエイリアス

以下のパスエイリアスが設定されています：

```typescript
'@'              → src/
'@features/*'    → src/features/*
'@domain/*'      → src/domain/*
'@styles/*'      → src/styles/*
'@constants'     → src/constants
'@config'        → src/config
'@assets/*'      → src/assets/*
'@utils'          → src/utils
```

## インポート例

```typescript
// 機能からのインポート
import { TaxCalculator } from "@features/tax-calculator";

// ドメインからのインポート
import type { TaxCalculationInput } from "@domain/tax";
import { validateSalary } from "@domain/validation";

// スタイルからのインポート
import { StyledCard } from "@styles/components/Card.styles";
import { colors } from "@styles/theme";

// 定数からのインポート
import { texts } from "@constants";

// 設定からのインポート
import { APP_CONFIG } from "@config";
```

## ベストプラクティス

### 1. 機能の追加

新しい機能を追加する場合：

```bash
src/features/
└── new-feature/
    ├── components/
    ├── hooks/
    └── index.ts
```

### 2. ドメインロジックの追加

新しいドメインロジックを追加する場合：

```bash
src/domain/
└── new-domain/
    ├── domain.ts
    └── index.ts
```

### 3. インデックスファイルの使用

各ディレクトリには `index.ts` を配置し、公開 API を定義します。

```typescript
// src/features/tax-calculator/index.ts
export { TaxCalculator } from "./components/TaxCalculator";
export { useTaxCalculation } from "./hooks/useTaxCalculation";
```

### 4. 循環依存の回避

- 機能間の直接的な依存を避ける
- 共通ロジックは `domain/` または `utils/` に配置
- 型定義は `domain/` に配置

## 移行ガイド

古い構造から新しい構造への移行：

### 変更前

```
src/
├── components/
├── hooks/
├── types/
└── utils/
```

### 変更後

```
src/
├── features/tax-calculator/
│   ├── components/
│   └── hooks/
├── domain/
│   ├── tax/
│   ├── validation/
│   └── security/
└── utils/
```

## メリット

1. **スケーラビリティ**: 新機能の追加が容易
2. **保守性**: 機能ごとに独立した構造
3. **再利用性**: ドメインロジックの再利用
4. **テスタビリティ**: テストが容易
5. **明確な責務**: 各ディレクトリの役割が明確

---

---

## 関連ドキュメント

- [設計ガイド](./design-guide.md)
- [API リファレンス](../reference/api.md)
- [クイックスタート](../getting-started/quick-start.md)

---

**最終更新**: 2025 年
**バージョン**: 2.0.0
