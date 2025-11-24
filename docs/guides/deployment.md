# ZEIKIN デプロイメントガイド

このドキュメントは、ZEIKIN アプリケーションを本番環境にデプロイする手順を説明します。

## 目次

1. [前提条件](#前提条件)
2. [ビルド手順](#ビルド手順)
3. [デプロイメントオプション](#デプロイメントオプション)
4. [環境変数](#環境変数)
5. [本番環境の最適化](#本番環境の最適化)
6. [トラブルシューティング](#トラブルシューティング)

---

## 前提条件

### 必要な環境

- **Node.js**: 18.0.0 以上
- **npm**: 9.0.0 以上
- **Git**: 最新版

### 必要な知識

- 基本的なコマンドライン操作
- デプロイ先プラットフォームの基本知識

---

## ビルド手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/yourusername/zeikin.git
cd zeikin
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. セキュリティ監査

```bash
# 脆弱性のチェック
npm run security:audit

# 問題があれば修正
npm run security:fix
```

### 4. コード品質チェック

```bash
# Lint チェック
npm run lint

# TypeScript の型チェック
npm run build
```

### 5. プロダクションビルド

```bash
npm run build
```

ビルドが成功すると、`dist/` ディレクトリに本番用ファイルが生成されます。

### 6. ビルド結果の確認

```bash
npm run preview
```

ローカルでビルド結果を確認できます。

---

## デプロイメントオプション

### Vercel（推奨）

Vercel は React アプリケーションのデプロイに最適です。

#### 手順

1. **Vercel アカウントの作成**

   - [Vercel](https://vercel.com) にサインアップ

2. **プロジェクトのインポート**

   - GitHub リポジトリを接続
   - プロジェクトをインポート

3. **ビルド設定**

   - ビルドコマンド: `npm run build`
   - 出力ディレクトリ: `dist`
   - インストールコマンド: `npm install`

4. **環境変数の設定**（必要に応じて）

   - Vercel ダッシュボードで設定

5. **デプロイ**
   - 自動デプロイが開始されます

#### カスタムドメインの設定

1. Vercel ダッシュボードで「Settings」→「Domains」
2. カスタムドメインを追加
3. DNS レコードを設定

### Netlify

#### 手順

1. **Netlify アカウントの作成**

   - [Netlify](https://www.netlify.com) にサインアップ

2. **プロジェクトのデプロイ**

   - 「Add new site」→「Import an existing project」
   - GitHub リポジトリを選択

3. **ビルド設定**

   - Build command: `npm run build`
   - Publish directory: `dist`

4. **デプロイ**
   - 「Deploy site」をクリック

### GitHub Pages

#### 手順

1. **vite.config.ts の設定**

```typescript
export default defineConfig({
  base: "/zeikin/", // リポジトリ名
  // ...
});
```

2. **GitHub Actions の設定**

`.github/workflows/deploy.yml` を作成：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

3. **デプロイ**
   - `main` ブランチにプッシュすると自動デプロイ

### 静的ホスティング（一般的な手順）

1. **ビルドファイルのアップロード**

   - `dist/` ディレクトリの内容をホスティングサーバーにアップロード

2. **Web サーバーの設定**
   - SPA ルーティングのため、すべてのリクエストを `index.html` にリダイレクト

#### Nginx の設定例

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/zeikin/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # セキュリティヘッダー
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
```

#### Apache の設定例

`.htaccess` ファイル：

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 環境変数

### 開発環境

現在、環境変数は使用していませんが、将来的に使用する場合は：

1. `.env` ファイルを作成
2. `.env.example` にテンプレートを追加
3. `.gitignore` に `.env` を追加

### 本番環境

環境変数が必要な場合は、デプロイ先プラットフォームで設定：

- **Vercel**: Settings → Environment Variables
- **Netlify**: Site settings → Environment variables
- **その他**: プラットフォームのドキュメントを参照

---

## 本番環境の最適化

### ビルド最適化

`vite.config.ts` で以下の最適化が有効になっています：

```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'mui-vendor': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
      },
    },
  },
  sourcemap: false,
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
    },
  },
}
```

### パフォーマンス最適化

1. **コード分割**: 自動的に実装済み
2. **Tree Shaking**: 未使用コードの自動削除
3. **圧縮**: Terser による minify
4. **console の削除**: 本番ビルドで自動削除

### セキュリティ最適化

1. **セキュリティヘッダー**: 自動設定
2. **CSP**: `index.html` で設定
3. **依存関係の監査**: デプロイ前に実行

---

## トラブルシューティング

### ビルドエラー

#### TypeScript エラー

```bash
# 型チェックのみ実行
npx tsc --noEmit
```

#### Lint エラー

```bash
# Lint エラーの修正
npm run lint -- --fix
```

### デプロイエラー

#### ビルドコマンドの確認

- ビルドコマンドが正しいか確認
- 出力ディレクトリが正しいか確認

#### 環境変数の確認

- 必要な環境変数が設定されているか確認
- 環境変数の値が正しいか確認

### パフォーマンス問題

#### バンドルサイズの確認

```bash
# ビルド後のサイズを確認
npm run build
du -sh dist/
```

#### Lighthouse での確認

1. デプロイ後の URL を開く
2. Chrome DevTools の Lighthouse タブを開く
3. パフォーマンススコアを確認

---

## 継続的デプロイメント（CI/CD）

### GitHub Actions の例

`.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run security:audit
```

---

## モニタリング

### 推奨ツール

1. **Vercel Analytics**: Vercel を使用している場合
2. **Google Analytics**: トラフィック分析
3. **Sentry**: エラートラッキング（将来的に実装）

---

## ロールバック手順

### Vercel

1. Vercel ダッシュボードを開く
2. 「Deployments」タブを開く
3. ロールバックしたいデプロイを選択
4. 「Promote to Production」をクリック

### その他のプラットフォーム

- プラットフォームのドキュメントを参照
- 前のバージョンに戻す手順を確認

---

## チェックリスト

デプロイ前に以下を確認：

- [ ] セキュリティ監査が通過している
- [ ] Lint チェックが通過している
- [ ] ビルドが成功している
- [ ] ローカルでプレビューが正常に動作している
- [ ] 環境変数が正しく設定されている
- [ ] セキュリティヘッダーが設定されている
- [ ] カスタムドメインが正しく設定されている（該当する場合）

---

---

## 関連ドキュメント

- [開発環境セットアップ](../getting-started/setup.md)
- [トラブルシューティング](./troubleshooting.md)
- [セキュリティポリシー](./security.md)

---

**最終更新**: 2025 年
**バージョン**: 2.0.0
