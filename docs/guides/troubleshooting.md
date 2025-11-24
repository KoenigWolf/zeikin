# ZEIKIN トラブルシューティングガイド

このドキュメントは、ZEIKIN プロジェクトで発生する可能性のある問題とその解決方法を説明します。

## 目次

1. [開発環境の問題](#開発環境の問題)
2. [ビルドの問題](#ビルドの問題)
3. [実行時の問題](#実行時の問題)
4. [計算結果の問題](#計算結果の問題)
5. [パフォーマンスの問題](#パフォーマンスの問題)
6. [よくある質問（FAQ）](#よくある質問faq)

---

## 開発環境の問題

### Node.js のバージョンエラー

#### 問題

```
Error: The engine "node" is incompatible with this module
```

#### 解決方法

1. Node.js のバージョンを確認

```bash
node --version
```

2. 必要なバージョン（18.0.0 以上）に更新

```bash
# nvm を使用している場合
nvm install 18
nvm use 18
```

### 依存関係のインストールエラー

#### 問題

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

#### 解決方法

1. `package-lock.json` を削除

```bash
rm package-lock.json
```

2. `node_modules` を削除

```bash
rm -rf node_modules
```

3. クリーンインストール

```bash
npm install
```

### ポートが既に使用されている

#### 問題

```
Error: listen EADDRINUSE: address already in use :5173
```

#### 解決方法

1. 使用中のプロセスを確認

```bash
# macOS/Linux
lsof -ti:5173

# Windows
netstat -ano | findstr :5173
```

2. プロセスを終了

```bash
# macOS/Linux
kill -9 $(lsof -ti:5173)

# Windows
taskkill /PID <プロセスID> /F
```

3. 別のポートを使用

```bash
npm run dev -- --port 3000
```

---

## ビルドの問題

### TypeScript エラー

#### 問題

```
error TS2307: Cannot find module '@components/...'
```

#### 解決方法

1. パスエイリアスの確認

`tsconfig.app.json` でパスエイリアスが正しく設定されているか確認：

```json
{
  "compilerOptions": {
    "paths": {
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"]
      // ...
    }
  }
}
```

2. Vite の設定を確認

`vite.config.ts` でパスエイリアスが正しく設定されているか確認

3. インポートパスの確認

相対パスとエイリアスの混在を避ける

### ビルド時のメモリエラー

#### 問題

```
FATAL ERROR: Reached heap limit Allocation failed
```

#### 解決方法

1. Node.js のメモリ制限を増やす

```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

2. ビルド設定の最適化

`vite.config.ts` でコード分割を調整

### Lint エラー

#### 問題

```
ESLint found too many problems
```

#### 解決方法

1. 自動修正を試す

```bash
npm run lint -- --fix
```

2. 個別に修正

エラーメッセージに従って修正

---

## 実行時の問題

### 計算結果が表示されない

#### 問題

計算ボタンをクリックしても結果が表示されない

#### 解決方法

1. ブラウザのコンソールを確認

```bash
# Chrome DevTools を開く（F12）
# Console タブでエラーを確認
```

2. 入力値の確認

- 月給が入力されているか
- 数値が有効な範囲内か

3. エラーメッセージの確認

Snackbar でエラーメッセージが表示されていないか確認

### スタイルが適用されない

#### 問題

コンポーネントのスタイルが正しく表示されない

#### 解決方法

1. インポートパスの確認

```typescript
// 正しいインポート
import { StyledCard } from "@styles/components/Card.styles";

// 間違ったインポート
import { StyledCard } from "../styles/components/Card.styles";
```

2. テーマの確認

`App.tsx` でテーマが正しく設定されているか確認

3. キャッシュのクリア

```bash
# ブラウザのキャッシュをクリア
# または
npm run dev
```

### アニメーションが動作しない

#### 問題

フェードインなどのアニメーションが動作しない

#### 解決方法

1. ブラウザの互換性を確認

- モダンブラウザを使用
- 古いブラウザの場合はポリフィルが必要な場合あり

2. CSS の確認

`effects.ts` の設定が正しいか確認

---

## 計算結果の問題

### 計算結果が正しくない

#### 問題

計算結果が期待値と異なる

#### 解決方法

1. 入力値の確認

- 月給の単位（万円）が正しいか
- ボーナスの単位（万円）が正しいか

2. 税率の確認

`deductions.ts` の税率が最新か確認

3. 計算ロジックの確認

`useTaxCalculation.ts` の計算ロジックを確認

### NaN が表示される

#### 問題

計算結果に `NaN` が表示される

#### 解決方法

1. 入力値の検証

入力値が数値として有効か確認

2. 計算の安全性チェック

`safeMathOperation` が正しく使用されているか確認

3. エラーハンドリング

エラーが適切に処理されているか確認

### 負の値が表示される

#### 問題

手取り額が負の値になる

#### 解決方法

1. 入力値の確認

月給が正しく入力されているか確認

2. 計算ロジックの確認

`useTaxCalculation.ts` の計算を確認

3. バリデーションの確認

入力検証が正しく機能しているか確認

---

## パフォーマンスの問題

### ページの読み込みが遅い

#### 問題

初回読み込みに時間がかかる

#### 解決方法

1. バンドルサイズの確認

```bash
npm run build
# dist/ ディレクトリのサイズを確認
```

2. コード分割の確認

`vite.config.ts` でコード分割が正しく設定されているか確認

3. ネットワークの確認

- 開発環境では正常
- 本番環境で遅い場合は CDN の使用を検討

### レンダリングが遅い

#### 問題

入力時の反応が遅い

#### 解決方法

1. メモ化の確認

`useCallback` と `useMemo` が適切に使用されているか確認

2. 不要な再レンダリングの確認

React DevTools Profiler で確認

3. コンポーネントの分割

大きなコンポーネントを小さく分割

---

## よくある質問（FAQ）

### Q: 計算結果は正確ですか？

A: 本アプリケーションは参考値として提供しています。正式な計算は国税庁や各自治体の公式情報を確認してください。

### Q: なぜ計算結果が表示されないのですか？

A: 以下の点を確認してください：

1. 月給が入力されているか
2. ブラウザのコンソールにエラーがないか
3. 入力値が有効な範囲内か

### Q: 税率は最新ですか？

A: 税率は定期的に更新していますが、最新の税率は公式情報を確認してください。

### Q: モバイルで使用できますか？

A: はい、レスポンシブデザインに対応しています。

### Q: データは保存されますか？

A: いいえ、すべての計算はブラウザ内で実行され、データは保存されません。

### Q: オフラインで使用できますか？

A: Service Worker を実装すれば可能ですが、現在は実装していません。

### Q: 計算式はどこで確認できますか？

A: `README.md` に計算式の詳細が記載されています。

### Q: バグを報告するには？

A: GitHub の Issues で報告してください。

### Q: 機能追加のリクエストは？

A: GitHub の Issues で機能リクエストを作成してください。

---

## デバッグのヒント

### 開発者ツールの使用

1. **Chrome DevTools**

   - Console: エラーメッセージの確認
   - Network: ネットワークリクエストの確認
   - Performance: パフォーマンスの分析
   - React DevTools: コンポーネントの状態確認

2. **VS Code デバッガー**

`.vscode/launch.json` を作成：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### ログの追加

```typescript
// 開発環境でのみログを出力
if (import.meta.env.DEV) {
  console.log("デバッグ情報:", data);
}
```

---

## サポート

### 問題が解決しない場合

1. **GitHub Issues**: バグ報告や機能リクエスト
2. **ドキュメント**: [README.md](../../README.md)、[設計ガイド](../architecture/design-guide.md) を確認
3. **コミュニティ**: ディスカッションで質問

---

## 関連ドキュメント

- [開発環境セットアップ](../getting-started/setup.md)
- [デプロイメントガイド](./deployment.md)
- [API リファレンス](../reference/api.md)

---

**最終更新**: 2025 年
**バージョン**: 2.0.0
