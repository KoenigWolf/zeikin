# ZEIKIN - 税金計算アプリケーション

給与に関する税金と各種保険料を計算するReactアプリケーション。

## 機能

- 月給と賞与からの税金計算
- 社会保険料の計算（健康保険、厚生年金、雇用保険）
- 介護保険料の計算（オプション）
- 子育て拠出金の計算（オプション）
- 社員負担と会社負担の両方を表示
- 年額と月額の計算結果を表示

## 使用方法

1. 月給を入力（万円単位）
2. 賞与がある場合は入力（万円単位）
3. 適用される保険を選択
   - 厚生年金
   - 介護保険料
   - 子育て拠出
4. 「計算」ボタンをクリック

## 計算結果

### 社員負担
- 額面収入
- 所得税
- 住民税
- 健康保険
- 厚生年金（選択時）
- 介護保険（選択時）
- 雇用保険
- 手取り額

### 会社負担
- 住民税
- 健康保険
- 厚生年金（選択時）
- 介護保険（選択時）
- 雇用保険
- 労災保険
- 子育て拠出（選択時）

## 開発環境

- React 18
- TypeScript
- Material UI
- Vite

## インストールと実行

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバーは http://localhost:5173 で起動します。
