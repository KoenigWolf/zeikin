# クイックスタート

ZEIKIN を 5 分で始めるためのガイドです。

## 前提条件

- Node.js 18.0.0 以上
- npm 9.0.0 以上

## インストール

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/zeikin.git
cd zeikin

# 依存関係をインストール
npm install
```

## 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開くと、アプリケーションが表示されます。

## 使用方法

1. 月額給与を入力（万円単位）
2. ボーナスがある場合は入力（万円単位）
3. 適用される保険の種類をチェックボックスで選択
4. 「計算する」ボタンをクリック
5. 従業員負担額と企業負担額の詳細が表示される

## 次のステップ

- [開発環境セットアップ](./setup.md) で詳細な設定を確認
- [設計ガイド](../architecture/design-guide.md) でアーキテクチャを理解
- [API リファレンス](../reference/api.md) で API の詳細を確認

---

**関連ドキュメント**:

- [開発環境セットアップ](./setup.md)
- [設計ガイド](../architecture/design-guide.md)
