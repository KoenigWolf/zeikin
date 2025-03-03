// =============================
// 📂 ファイル: src/components/TaxForm.tsx
// 📝 役割: ユーザーの税金計算入力フォーム
// - ユーザーが月給、賞与、控除オプションを入力
// - `onChange` を通じて親コンポーネントに変更を通知
// - `onSubmit` で計算を実行
// - 可読性・拡張性を向上
// =============================

import { 
  Grid, 
  FormControlLabel, 
  Box,
  Typography,
  Paper,
  InputAdornment,
} from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';
import { StyledTextField, CustomSwitch } from '../styles/components/Form.styles';
import { GradientButton } from '../styles/components/Button.styles';

// =============================
// 型定義: TaxFormInputs
// - 入力フィールドの状態を管理
// =============================
interface TaxFormInputs {
  baseSalary: string;
  bonus: string;
  hasPension: boolean;
  hasCareInsurance: boolean;
  hasChildCare: boolean;
}

// =============================
// 型定義: TaxFormProps
// - `inputs`: 入力状態
// - `onChange`: 入力変更時のハンドラ
// - `onSubmit`: 計算実行時のハンドラ
// =============================
interface TaxFormProps {
  inputs: TaxFormInputs;
  onChange: (key: keyof TaxFormInputs, value: string | boolean) => void;
  onSubmit: () => void;
}

// =============================
// 🎨 タイトルコンポーネント
// - セクションごとの見出しを統一化
// =============================
const SectionTitle = ({ icon, title }: { icon: string; title: string }) => (
  <Typography
    variant="h6"
    sx={{
      mb: 2.5,
      fontWeight: 600,
      color: 'primary.main',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      '&::before': {
        content: `"${icon}"`,
        fontSize: '1.2rem',
      },
    }}
  >
    {title}
  </Typography>
);

// =============================
// 🎛️ スイッチコンポーネント
// - 厚生年金、介護保険、子育て拠出金のチェックを統一
// =============================
const SwitchControl = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <FormControlLabel
    control={<CustomSwitch checked={checked} onChange={(e) => onChange(e.target.checked)} />}
    label={label}
    sx={{
      '& .MuiFormControlLabel-label': {
        fontSize: '1rem',
        color: 'text.primary',
      },
    }}
  />
);

// =============================
// メインコンポーネント: TaxForm
// - ユーザー入力フォーム
// - `onChange` で入力内容を親に伝える
// - `onSubmit` で計算を実行
// =============================

export const TaxForm = ({ inputs, onChange, onSubmit }: TaxFormProps) => {
  return (
    <Grid container spacing={3}>
      {/* 📌 給与情報セクション */}
      <Grid item xs={12}>
        <Box sx={{ mb: 3 }}>
          <SectionTitle icon="💰" title="給与情報" />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="月給"
                type="number"
                value={inputs.baseSalary}
                onChange={(e) => onChange('baseSalary', e.target.value)}
                required
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">万円</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="賞与"
                type="number"
                value={inputs.bonus}
                onChange={(e) => onChange('bonus', e.target.value)}
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">万円</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* 📌 保険・控除セクション */}
      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            border: '1px solid rgba(43, 76, 140, 0.08)',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 12px rgba(43, 76, 140, 0.08)',
            },
          }}
        >
          <SectionTitle icon="🏥" title="保険・控除" />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SwitchControl
                label="厚生年金"
                checked={inputs.hasPension}
                onChange={(checked) => onChange('hasPension', checked)}
              />
            </Grid>
            <Grid item xs={12}>
              <SwitchControl
                label="介護保険料"
                checked={inputs.hasCareInsurance}
                onChange={(checked) => onChange('hasCareInsurance', checked)}
              />
            </Grid>
            <Grid item xs={12}>
              <SwitchControl
                label="子育て拠出金"
                checked={inputs.hasChildCare}
                onChange={(checked) => onChange('hasChildCare', checked)}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* 📌 計算ボタン */}
      <Grid item xs={12}>
        <GradientButton
          fullWidth
          variant="contained"
          onClick={onSubmit}
          startIcon={<CalculateIcon />}
        >
          計算する
        </GradientButton>
      </Grid>
    </Grid>
  );
};
