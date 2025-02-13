// =============================
// ファイル: src/components/TaxForm.tsx
// 役割  : ユーザーの税金計算入力フォーム
// - ユーザーが月給、賞与、控除オプションを入力
// - `onChange` を通じて親コンポーネントに変更を通知
// - `onSubmit` で計算を実行
// =============================

import { TextField, Grid, Checkbox, FormControlLabel, Button } from '@mui/material';

interface TaxFormProps {
  inputs: {
    baseSalary: number;     // ユーザーが入力する月給（万円単位）
    bonus: number;          // ユーザーが入力する賞与（万円単位）
    hasPension: boolean;    // 厚生年金加入の有無（チェックボックス）
    hasCareInsurance: boolean;  // 介護保険加入の有無（チェックボックス）
    hasChildCare: boolean;  // 子育て拠出金負担の有無（チェックボックス）
  };
  onChange: (key: string, value: string | boolean | number) => void; // `number` 型を追加
  onSubmit: () => void;  // 送信ボタンが押された際に計算を実行する関数
}

// `TaxForm` コンポーネント
export const TaxForm = ({ inputs, onChange, onSubmit }: TaxFormProps) => {
  return (
    <Grid container spacing={2}>
      {/*=============================*/}
      {/* 月給（基本給）入力欄 */}
      {/*=============================*/}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="月給(万円)"
          type="number"
          value={inputs.baseSalary}
          onChange={(e) => onChange('baseSalary', Number(e.target.value) || 0)} // NaN対策
          required
          variant="outlined"
        />
      </Grid>

      {/*=============================*/}
      {/* 賞与（ボーナス）入力欄 */}
      {/*=============================*/}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="賞与(万円)"
          type="number"
          value={inputs.bonus}
          onChange={(e) => onChange('bonus', Number(e.target.value) || 0)} // NaN対策
          variant="outlined"
        />
      </Grid>

      {/*=============================*/}
      {/* 厚生年金チェックボックス */}
      {/*=============================*/}
      <Grid item xs={12} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={inputs.hasPension}
              onChange={(e) => onChange('hasPension', e.target.checked)}
            />
          }
          label="厚生年金"
        />
      </Grid>

      {/*=============================*/}
      {/* 介護保険チェックボックス */}
      {/*=============================*/}
      <Grid item xs={12} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={inputs.hasCareInsurance}
              onChange={(e) => onChange('hasCareInsurance', e.target.checked)}
            />
          }
          label="介護保険料"
        />
      </Grid>

      {/*=============================*/}
      {/* 子育て拠出金チェックボックス */}
      {/*=============================*/}
      <Grid item xs={12} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={inputs.hasChildCare}
              onChange={(e) => onChange('hasChildCare', e.target.checked)}
            />
          }
          label="子育て拠出"
        />
      </Grid>

      {/*=============================*/}
      {/* 計算実行ボタン */}
      {/*=============================*/}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onSubmit}
          size="large"
        >
          計算
        </Button>
      </Grid>
    </Grid>
  );
};
