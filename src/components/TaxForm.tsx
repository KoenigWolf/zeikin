// =============================
// ファイル: src/components/TaxForm.tsx
// 役割  : ユーザーの税金計算入力フォーム
// - ユーザーが月給、賞与、控除オプションを入力
// - `onChange` を通じて親コンポーネントに変更を通知
// - `onSubmit` で計算を実行
// =============================

import { 
  TextField, 
  Grid, 
  FormControlLabel, 
  Button, 
  Box,
  Typography,
  Paper,
  InputAdornment,
  styled,
  Switch
} from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';

// スタイル付きのSwitch
const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}1a`,
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.primary.main,
  },
}));

// スタイル付きのTextField
const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
    '&.Mui-focused': {
      transform: 'translateY(-2px)',
    },
  },
}));

// スタイル付きのButton
const CalculateButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontSize: '1.1rem',
  fontWeight: 600,
  background: 'linear-gradient(135deg, #2B4C8C 0%, #1E88E5 100%)',
  '&:hover': {
    background: 'linear-gradient(135deg, #1E88E5 0%, #2B4C8C 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 16px rgba(43, 76, 140, 0.2)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  transition: 'all 0.3s ease',
}));

interface TaxFormInputs {
  baseSalary: string;
  bonus: string;
  hasPension: boolean;
  hasCareInsurance: boolean;
  hasChildCare: boolean;
}

interface TaxFormProps {
  inputs: TaxFormInputs;
  onChange: (key: string, value: string | boolean | number) => void;
  onSubmit: () => void;
}

export const TaxForm = ({ inputs, onChange, onSubmit }: TaxFormProps) => {
  return (
    <Grid container spacing={3}>
      {/* 給与情報セクション */}
      <Grid item xs={12}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
            💰 給与情報
          </Typography>
          <Grid container spacing={3}>
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

      {/* 保険・控除セクション */}
      <Grid item xs={12}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 4, 
            bgcolor: 'grey.50',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
            🏥 保険・控除
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <CustomSwitch
                    checked={inputs.hasPension}
                    onChange={(e) => onChange('hasPension', e.target.checked)}
                  />
                }
                label="厚生年金"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <CustomSwitch
                    checked={inputs.hasCareInsurance}
                    onChange={(e) => onChange('hasCareInsurance', e.target.checked)}
                  />
                }
                label="介護保険料"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <CustomSwitch
                    checked={inputs.hasChildCare}
                    onChange={(e) => onChange('hasChildCare', e.target.checked)}
                  />
                }
                label="子育て拠出金"
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* 計算ボタン */}
      <Grid item xs={12}>
        <CalculateButton
          variant="contained"
          fullWidth
          onClick={onSubmit}
          startIcon={<CalculateIcon />}
        >
          計算する
        </CalculateButton>
      </Grid>
    </Grid>
  );
};
