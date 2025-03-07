# ZEIKIN 💰

## アプリケーション概要

本プロジェクトは、日本の税金計算をシミュレーションするための Web アプリケーションです。給与所得者の税金計算を簡単に行い、手取り額や会社負担額を視覚的に確認できます。モダンなフロントエンド技術とクリーンアーキテクチャの原則に基づいて構築されており、TypeScript と React を用いて、堅牢で保守性の高いコードベースを実現しています。

### 目的

給与所得者が自分の税金と手取り額を簡単に計算できるようにする。企業側の負担額も同時に確認できるようにする。税金計算の透明性を高め、ユーザーの理解を助ける。

### 主要機能

**給与・ボーナスの税金計算**：月額給与とボーナスから年間の税金を計算

**各種社会保険の計算**：健康保険、厚生年金、雇用保険、介護保険などの計算

**従業員・企業双方の負担額表示**：従業員の手取り額と企業の負担額を同時に表示

**オプション設定**：厚生年金、介護保険、子育て支援などの有無を設定可能

### 想定ユーザー

給与所得者（会社員、パートタイマーなど）

フリーランサー（自身の税金負担を理解したい方）

企業の人事・経理担当者（従業員コストを把握したい方）

就職・転職活動中の方（手取り額のシミュレーションをしたい方）

### 使用方法

1. 月額給与を入力（万円単位）
2. ボーナスがある場合は入力（万円単位）
3. 適用される保険の種類をチェックボックスで選択
4. 「計算する」ボタンをクリック
5. 従業員負担額と企業負担額の詳細が表示される

## 🎯 主な特徴

### 技術スタック

**TypeScript**：静的型付けによる型安全性の確保
**React**：効率的な UI レンダリングと状態管理
**Material-UI**：モダンで一貫性のあるデザインシステム
**Vite**：高速な開発環境とビルドツール

### アーキテクチャ設計

**クリーンアーキテクチャ**

責務の明確な分離（UI、ビジネスロジック、型定義）

疎結合なモジュール構成

テスト容易性を考慮した設計

**ディレクトリ構造**

```
src/
├── components/     # UIコンポーネント
├── hooks/         # カスタムフック（ビジネスロジック）
├── styles/        # スタイル定義
│   ├── components/ # コンポーネント固有のスタイル
│   ├── theme/      # テーマ設定
│   └── shared/     # 共通スタイル
└── types/         # 型定義
```

### コード品質

**型安全性**

厳密な型チェック

インターフェースによる契約プログラミング

非 null アサーション演算子の排除

**保守性**

一貫したコーディング規約

詳細なコメント

モジュール化された構造

**パフォーマンス**

メモ化による不要な再計算の防止

効率的なレンダリング

バンドルサイズの最適化

## 💻 開発環境のセットアップ

### 必要条件

Node.js 18.0.0 以上
npm 9.0.0 以上

---

## 🚀 開発サーバーの起動

開発環境でアプリを実行するには、以下のコマンドを実行してください。

```sh
npm run dev
```

これにより、ローカル開発サーバーが起動し、変更がリアルタイムで反映されます。

---

## 📜 スクリプト一覧

| コマンド          | 説明                   |
| ----------------| ---------------------|
| `npm run dev`     | 開発サーバーの起動     |
| `npm run build`   | プロダクションビルド   |
| `npm run lint`    | コード品質チェック     |
| `npm run preview` | ビルド結果のプレビュー |

---

## 🛠 ビルド & デプロイ

本番環境向けにビルドするには、以下のコマンドを実行します。

```sh
npm run build
```

その後、ビルドされたファイルをローカルで確認する場合は、以下を実行してください。

```sh
npm run preview
```

---

## 📝 コーディング規約

本プロジェクトでは、以下のコーディング規約を採用しています。

1. **コンポーネント設計**

   関数コンポーネントを使用（クラスコンポーネントは使用しない）
   コンポーネントは単一責任の原則に従う
   大きなコンポーネントは小さなコンポーネントに分割する

2. **命名規則**

   コンポーネント：PascalCase (例：`TaxCalculator`)
   関数・変数：camelCase (例：`calculateTax`)
   定数：UPPER_SNAKE_CASE (例：`TAX_RATES`)
   ファイル名：コンポーネントと同じ名前 (例：`TaxCalculator.tsx`)

3. **コメント**

   複雑なロジックには日本語でコメントを記述
   セクション区切りには `// ===` スタイルのコメントを使用

4. **型定義**
   明示的な型定義を使用。
   `any` 型の使用を避ける。
   インターフェースを積極的に活用。

### Linter

本プロジェクトでは以下のツールを使用しています。

**ESLint**：コード品質とバグの早期発見のため

  設定：`eslint.config.js`
  実行：`npm run lint`

## 🧹 コード品質チェック

プロジェクトのコードを `ESLint` を使用して静的解析し、品質チェックを行うには以下のコマンドを実行します。

```sh
npm run lint
```

---

## 📚 参考文献・サイト

本アプリケーションの税金計算ロジックは、以下の公的資料を参考にしています。

**所得税計算**

[国税庁 所得税の税率](https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/2260.htm)

[国税庁 給与所得控除](https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1410.htm)

**社会保険料計算**

[日本年金機構 厚生年金保険料額表](https://www.nenkin.go.jp/service/kounen/hokenryo/ryogaku/ryogakuhyo/index.html) 

[全国健康保険協会 令和7年度保険料率のお知らせ](https://www.kyoukaikenpo.or.jp/LP/2025hokenryou/)

[厚生労働省 雇用保険料率について](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000108634.html)

**住民税計算**

[総務省 個人住民税のしくみ](https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/individual-inhabitant-tax.html)

---

### **技術的な実装の参考**

**TypeScript & React**

[React 公式ドキュメント](https://react.dev/)

[TypeScript 公式ドキュメント](https://www.typescriptlang.org/)

[Vite 公式ドキュメント](https://vitejs.dev/)

**デザイン & UI**

[Material-UI 公式ドキュメント](https://mui.com/)

[Tailwind CSS 公式ドキュメント](https://tailwindcss.com/)

### **クリーンアーキテクチャ & コード設計**

[手を動かして理解するクリーンアーキテクチャ](https://zenn.dev/sui_water/articles/88af41dc6d64bc)

[Clean Architecture on Frontend #React](https://qiita.com/70ki8suda/items/7b720217c9b1b4855e99)

### **パフォーマンス最適化**

[驚愕の改善率！たった3ステップのReactパフォーマンスチューニング](https://zenn.dev/nap_engineer/articles/9e26019a661e50)

[Reactでデザインシステムをコード分割してパフォーマンスを向上](https://ittrip.xyz/react/react-design-system-optimization)

---

## 🔒 セキュリティ対策

入力値の厳密なバリデーション
XSS 対策（React 組み込みの保護）
安全な依存パッケージの使用（定期的な更新）

## 🚀 パフォーマンス最適化

### レンダリング最適化

効率的なステート管理
メモ化によるパフォーマンス向上
遅延ローディングの実装

### バンドルサイズ最適化

Tree Shaking の活用
コード分割の実装
未使用コードの削除

## 📈 スケーラビリティ

### 拡張性を考慮した設計

新規機能の追加が容易
設定の外部化
モジュール化された構造

## 🛠️ 技術的な意思決定

### TypeScript の採用理由

型安全性による堅牢なコード
開発時の生産性向上
より良いドキュメンテーション

### Material-UI の選択

一貫したデザインシステム
アクセシビリティ対応
豊富なコンポーネント

### Vite の採用

高速な開発環境
効率的なビルドプロセス
モダンな開発体験

## 🔑 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。
