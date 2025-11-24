# ZEIKIN セキュリティポリシー

このドキュメントは、ZEIKIN プロジェクトのセキュリティポリシー、ベストプラクティス、脆弱性報告手順を説明します。

## 目次

1. [セキュリティ方針](#セキュリティ方針)
2. [実装されているセキュリティ対策](#実装されているセキュリティ対策)
3. [セキュリティベストプラクティス](#セキュリティベストプラクティス)
4. [脆弱性の報告](#脆弱性の報告)
5. [依存関係のセキュリティ](#依存関係のセキュリティ)

---

## セキュリティ方針

ZEIKIN プロジェクトは、ユーザーのデータとプライバシーを保護することを最優先としています。以下の原則に基づいてセキュリティを実装しています：

1. **最小権限の原則**: 必要最小限の権限のみを要求
2. **防御的プログラミング**: すべての入力値を検証
3. **セキュリティバイデザイン**: 設計段階からセキュリティを考慮
4. **定期的な監査**: 依存関係とコードの定期的な監査

---

## 実装されているセキュリティ対策

### 1. 入力検証

すべてのユーザー入力は厳密に検証されます。

#### 検証レイヤー

- **クライアントサイド検証**: リアルタイムでの入力検証
- **型チェック**: TypeScript による型安全性
- **範囲チェック**: 最小値・最大値の検証
- **フォーマットチェック**: 数値形式の検証

#### 実装例

```typescript
// src/utils/validation.ts
export const validateSalary = (
  value: string | number | null | undefined
): ValidationResult => {
  return validateNumber(value, {
    min: 0,
    max: MAX_SALARY,
    allowZero: false,
    allowNegative: false,
    fieldName: "月給",
  });
};
```

### 2. XSS 対策

#### HTML エスケープ

```typescript
// src/utils/security.ts
export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
```

#### React の自動エスケープ

- React はデフォルトで XSS を防止
- `dangerouslySetInnerHTML` の使用を禁止

#### インジェクション防止

```typescript
export const preventInjection = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "");
};
```

### 3. Content Security Policy (CSP)

`index.html` に CSP メタタグを設定：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';"
/>
```

### 4. セキュリティヘッダー

開発サーバーと本番環境で以下のヘッダーを設定：

- **X-Content-Type-Options**: `nosniff` - MIME タイプスニッフィングの防止
- **X-Frame-Options**: `DENY` - クリックジャッキングの防止
- **X-XSS-Protection**: `1; mode=block` - XSS 攻撃の防止
- **Referrer-Policy**: `strict-origin-when-cross-origin` - リファラー情報の制御

#### 実装

```typescript
// vite.config.ts
server: {
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  },
}
```

### 5. 数値計算の安全性

すべての数値計算は安全チェックを通過します。

#### 安全な計算ラッパー

```typescript
// src/utils/validation.ts
export const safeMathOperation = <T>(
  operation: () => T,
  fallback: T,
  errorMessage?: string
): T => {
  try {
    const result = operation();
    if (typeof result === "number" && !isSafeNumber(result)) {
      console.error(errorMessage || "数値計算の結果が安全な範囲を超えています");
      return fallback;
    }
    return result;
  } catch (error) {
    console.error(errorMessage || "数値計算中にエラーが発生しました", error);
    return fallback;
  }
};
```

#### 使用例

```typescript
const monthlySalary = safeMathOperation(
  () => baseSalary * CALCULATION_CONSTANTS.conversion.manToYen,
  0,
  "月給の計算中にエラーが発生しました"
);
```

### 6. データのサニタイゼーション

#### 入力値のサニタイゼーション

```typescript
export const sanitizeInput = (value: string): string => {
  return value.trim().replace(/[^\d.-]/g, "");
};
```

#### アイコンのサニタイゼーション

```typescript
// src/components/TaxForm.tsx
const sanitizedIcon = icon.replace(/[<>"']/g, "");
```

---

## セキュリティベストプラクティス

### 開発時のガイドライン

1. **入力検証の徹底**

   - すべてのユーザー入力は検証する
   - 型チェックを必ず行う
   - 範囲チェックを実装する

2. **エラーメッセージの注意**

   - システム内部情報を漏らさない
   - ユーザーに分かりやすいメッセージを表示
   - デバッグ情報は本番環境で表示しない

3. **依存関係の管理**

   - 定期的に `npm audit` を実行
   - 脆弱性が見つかった場合は即座に更新
   - 不要な依存関係は削除

4. **コードレビュー**
   - セキュリティチェックリストを使用
   - 入力検証の確認
   - XSS 対策の確認

### セキュリティチェックリスト

コードレビュー時に以下を確認：

- [ ] すべてのユーザー入力が検証されているか
- [ ] XSS 対策が実装されているか
- [ ] エラーメッセージに機密情報が含まれていないか
- [ ] 数値計算が安全に実行されているか
- [ ] 依存関係に脆弱性がないか
- [ ] セキュリティヘッダーが設定されているか

---

## 脆弱性の報告

### 報告方法

セキュリティ脆弱性を発見した場合は、以下の方法で報告してください：

1. **GitHub Security Advisories** を使用（推奨）
2. メールで直接報告（緊急の場合）

### 報告に含める情報

- 脆弱性の種類
- 影響を受けるコンポーネント
- 再現手順
- 潜在的な影響
- 修正案（あれば）

### 対応プロセス

1. **報告の受領**: 24 時間以内に確認
2. **調査**: 脆弱性の確認と影響範囲の評価
3. **修正**: セキュリティパッチの開発
4. **公開**: 修正のリリースとセキュリティアドバイザリの公開

### 報奨金

現在、報奨金プログラムは実施していませんが、貢献には感謝いたします。

---

## 依存関係のセキュリティ

### 監査の実行

定期的に依存関係の脆弱性をチェックします：

```bash
# 脆弱性のチェック
npm run security:audit

# 自動修正（可能な場合）
npm run security:fix
```

### 依存関係の更新

- **定期的な更新**: 月 1 回の依存関係の更新チェック
- **セキュリティパッチ**: 脆弱性が見つかった場合は即座に更新
- **メジャーバージョンアップ**: 慎重にテストしてから更新

### 信頼できるソース

以下のソースからパッケージを取得：

- **npm 公式レジストリ**: 信頼できるパッケージのみ
- **GitHub**: オープンソースパッケージの確認
- **セキュリティアドバイザリ**: 定期的な確認

---

## データプライバシー

### データの取り扱い

- **ローカル処理**: すべての計算はクライアントサイドで実行
- **データ送信なし**: サーバーへのデータ送信は行わない
- **ローカルストレージ**: 現時点では使用していない（将来的に使用する場合は暗号化）

### プライバシーポリシー

- ユーザーの個人情報は収集しません
- 計算結果はブラウザ内でのみ処理されます
- 外部サービスへの送信は行いません

---

## セキュリティ更新履歴

### 2024 年

- **入力検証システムの実装**: すべての入力値の厳密な検証
- **XSS 対策の強化**: HTML エスケープとインジェクション防止
- **CSP の実装**: Content Security Policy の設定
- **セキュリティヘッダーの追加**: 各種セキュリティヘッダーの設定
- **数値計算の安全性向上**: 安全な計算ラッパーの実装

---

## 参考資料

### セキュリティガイドライン

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### ツール

- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Snyk](https://snyk.io/)
- [OWASP ZAP](https://www.zaproxy.org/)

---

---

## 関連ドキュメント

- [設計ガイド](../architecture/design-guide.md)
- [デプロイメントガイド](./deployment.md)
- [トラブルシューティング](./troubleshooting.md)

---

**最終更新**: 2025 年
**バージョン**: 2.0.0
