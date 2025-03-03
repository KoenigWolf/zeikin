# 給与計算シミュレーター 💰

## 概要

本プロジェクトは、モダンなフロントエンド技術とクリーンアーキテクチャの原則に基づいて構築された給与計算シミュレーターです。
TypeScript と React を用いて、堅牢で保守性の高いコードベースを実現しています。

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

| コマンド            | 説明 |
|---------------------|--------------------------------|
| `npm run dev`      | 開発サーバーの起動 |
| `npm run build`    | プロダクションビルド |
| `npm run lint`     | コード品質チェック |
| `npm run preview`  | ビルド結果のプレビュー |

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

## 🧹 コード品質チェック

プロジェクトのコードを `ESLint` を使用して静的解析し、品質チェックを行うには以下のコマンドを実行します。

```sh
npm run lint
```

---

## 📌 その他

- Node.js のバージョンが適切であることを確認してください。（推奨: `v16` 以上）
- 依存関係が正しくインストールされていることを確認するには、以下のコマンドを実行してください。

```sh
npm install
```

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

## 📝 コーディング規約

コンポーネントは関数コンポーネントを使用
型定義は明示的に記述
コメントは日本語で記述（JSDoc 形式）

## 🔑 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。
