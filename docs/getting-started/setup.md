# 開発環境セットアップ

ZEIKIN プロジェクトの開発環境を構築するための詳細ガイドです。

## 目次

1. [前提条件](#前提条件)
2. [プロジェクトのクローン](#プロジェクトのクローン)
3. [依存関係のインストール](#依存関係のインストール)
4. [開発サーバーの起動](#開発サーバーの起動)
5. [ビルド](#ビルド)
6. [コード品質チェック](#コード品質チェック)

---

## 前提条件

### 必要なソフトウェア

- **Node.js**: 18.0.0 以上
- **npm**: 9.0.0 以上
- **Git**: 最新版

### 確認方法

```bash
# Node.js のバージョン確認
node --version

# npm のバージョン確認
npm --version

# Git のバージョン確認
git --version
```

---

## プロジェクトのクローン

```bash
git clone https://github.com/yourusername/zeikin.git
cd zeikin
```

---

## 依存関係のインストール

```bash
npm install
```

### セキュリティ監査

インストール後、セキュリティ監査を実行することを推奨します：

```bash
# 脆弱性のチェック
npm run security:audit

# 自動修正（可能な場合）
npm run security:fix
```

---

## 開発サーバーの起動

```bash
npm run dev
```

開発サーバーが起動すると、以下のメッセージが表示されます：

```
  VITE v6.1.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

ブラウザで `http://localhost:5173` を開くと、アプリケーションが表示されます。

### ホットリロード

ファイルを変更すると、自動的にブラウザがリロードされます。

---

## ビルド

### プロダクションビルド

```bash
npm run build
```

ビルドが成功すると、`dist/` ディレクトリに本番用ファイルが生成されます。

### ビルド結果のプレビュー

```bash
npm run preview
```

ローカルでビルド結果を確認できます。

---

## コード品質チェック

### Lint チェック

```bash
npm run lint
```

### 自動修正

```bash
npm run lint -- --fix
```

---

## スクリプト一覧

| コマンド                 | 説明                     |
| ------------------------ | ------------------------ |
| `npm run dev`            | 開発サーバーの起動       |
| `npm run build`          | プロダクションビルド     |
| `npm run lint`           | コード品質チェック       |
| `npm run preview`        | ビルド結果のプレビュー   |
| `npm run security:audit` | セキュリティ監査         |
| `npm run security:fix`   | セキュリティ修正（自動） |

---

## トラブルシューティング

問題が発生した場合は、[トラブルシューティングガイド](../guides/troubleshooting.md) を参照してください。

---

**関連ドキュメント**:

- [クイックスタート](./quick-start.md)
- [トラブルシューティング](../guides/troubleshooting.md)
- [貢献ガイドライン](../guides/contributing.md)
