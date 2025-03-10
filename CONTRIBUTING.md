# ZEIKIN プロジェクト貢献ガイドライン

このドキュメントでは、ZEIKIN プロジェクトへの貢献方法とコーディング規約について説明します。

## 目次

1. [開発環境のセットアップ](#開発環境のセットアップ)
2. [ブランチ戦略](#ブランチ戦略)
3. [コミットメッセージのガイドライン](#コミットメッセージのガイドライン)
4. [プルリクエストのプロセス](#プルリクエストのプロセス)
5. [コーディング規約](#コーディング規約)
6. [テスト](#テスト)
7. [ドキュメント](#ドキュメント)

## 開発環境のセットアップ

1. リポジトリをクローンします。

   ```bash
   git clone https://github.com/yourusername/zeikin.git
   cd zeikin
   ```

2. 依存関係をインストールします。

   ```bash
   npm install
   ```

3. 開発サーバーを起動します。
   ```bash
   npm run dev
   ```

## ブランチ戦略

以下のブランチ命名規則を使用してください：

- `feature/機能名` - 新機能の開発
- `fix/問題名` - バグ修正
- `refactor/コンポーネント名` - リファクタリング
- `docs/ドキュメント名` - ドキュメントの更新
- `style/コンポーネント名` - スタイルの変更

## コミットメッセージのガイドライン

コミットメッセージは以下の形式に従ってください。

```
タイプ(スコープ)：簡潔な説明

詳細な説明（必要な場合）
```

タイプの例：

- `feat`：新機能
- `fix`：バグ修正
- `docs`：ドキュメントのみの変更
- `style`：コードの意味に影響しない変更（フォーマットなど）
- `refactor`：バグ修正や機能追加ではないコード変更
- `test`：テストの追加・修正
- `chore`：ビルドプロセスやツールの変更

例：

```
feat(tax-calculator)：住民税計算ロジックの追加

- 住民税の基本計算ロジックを実装
- 均等割と所得割の計算を分離
- 自治体ごとの税率設定を可能に
```

## プルリクエストのプロセス

1. 作業前に最新の `main` ブランチから新しいブランチを作成してください。
2. 変更を実装し、テストを追加してください。
3. コードがすべてのリントチェックに合格することを確認してください。
   ```bash
   npm run lint
   ```
4. プルリクエストを作成し、変更内容を詳細に説明してください。
5. レビュアーからのフィードバックに対応してください。

## コーディング規約

### 全般

- インデントには 2 スペースを使用してください。
- 行末のセミコロンは必須です。
- 行の最大長は 100 文字を目安としてください。
- 未使用の変数やインポートは削除してください。

### TypeScript

- 型は明示的に定義してください。
- `any` 型の使用は避けてください。
- 非 null アサーション演算子 (`!`) の使用は最小限にしてください。
- インターフェースとタイプエイリアスを適切に使い分けてください。
  - 拡張する可能性があるものはインターフェース
  - ユニオン型や交差型はタイプエイリアス

### React

- 関数コンポーネントと React Hooks を使用してください。
- コンポーネントは単一責任の原則に従ってください。
- 大きなコンポーネントは小さなコンポーネントに分割してください。
- props には型定義を必ず行ってください。
- 再レンダリングを最小限に抑えるため、適切な場所で `useMemo` と `useCallback` を使用してください。

### スタイリング

- Material-UI のスタイリングシステムを使用してください。
- コンポーネント固有のスタイルは `styles/components/` ディレクトリに配置してください。
- 共通スタイルは `styles/shared/` ディレクトリに配置してください。
- テーマ設定は `styles/theme/` ディレクトリに配置してください。

### 命名規則

- **ファイル名**:

  - コンポーネント：PascalCase (例：`TaxCalculator.tsx`)
  - フック：camelCase (例：`useTaxCalculation.ts`)
  - ユーティリティ：camelCase (例：`formatCurrency.ts`)

- **変数名**:
  - 変数・関数：camelCase (例：`calculateTax`)
  - 定数：UPPER_SNAKE_CASE (例：`TAX_RATES`)
  - インターフェース：PascalCase (例：`TaxCalculationInput`)
  - タイプエイリアス：PascalCase (例：`MonthlyAnnual`)

### コメント

※あくまで私個人の趣向です。
- 複雑なロジックには日本語でコメントを記述してください。
- JSDoc 形式のコメントを使用してください。
- セクション区切りには以下のスタイルのコメントを使用してください。
  ```typescript
  // =============================
  // セクションタイトル
  // セクションの説明
  // =============================
  ```

## テスト

- 新機能には単体テストを追加してください。
- テストファイルは対象ファイルと同じディレクトリに配置し、`.test.ts(x)` または `.spec.ts(x)` の拡張子を使用してください。
- テストカバレッジは 80%以上を目指してください。

## ドキュメント

- 新機能を追加した場合は、README を更新してください。
- 複雑な機能には、使用方法や設計の意図を説明するドキュメントを追加してください。
- API の変更がある場合は、型定義とコメントを更新してください。

---

ご質問やご提案がありましたら、Issue を作成してください。貢献をお待ちしています！
