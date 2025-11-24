import { 
  Grid, 
  FormControlLabel, 
  Box,
  Paper,
  InputAdornment,
} from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';
import { StyledTextField, CustomSwitch } from '@styles/components/Form.styles';
import { GradientButton } from '@styles/components/Button.styles';

interface TaxFormInputs {
  baseSalary: string;
  bonus: string;
  hasPension: boolean;
  hasCareInsurance: boolean;
  hasChildCare: boolean;
}

interface TaxFormProps {
  inputs: TaxFormInputs;
  onChange: (key: keyof TaxFormInputs, value: string | boolean) => void;
  onSubmit: () => void;
}

import { SectionTitle as BaseSectionTitle } from '@styles/components/Result.styles';

const SectionTitle = ({ icon, title }: { icon: string; title: string }) => (
  <BaseSectionTitle
    variant="h6"
    sx={{
      mb: 2.5,
      color: 'primary.main',
      '&::before': {
        content: `"${icon}"`,
      },
    }}
  >
    {title}
  </BaseSectionTitle>
);

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

export const TaxForm = ({ inputs, onChange, onSubmit }: TaxFormProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ mb: 3 }}>
          <SectionTitle icon="💰" title="月額給与" />
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
          </Grid>
        </Box>
      </Grid>

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
            transition: 'background 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 4px 8px rgba(43, 76, 140, 0.08)',
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
