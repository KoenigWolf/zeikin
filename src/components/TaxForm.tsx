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
import { texts } from '../constants/texts';
import { componentTypography } from '@styles/theme/typography';

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
        fontSize: componentTypography.formLabel.fontSize,
        fontWeight: componentTypography.formLabel.fontWeight,
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
          <SectionTitle icon={texts.form.sections.monthlySalary.icon} title={texts.form.sections.monthlySalary.title} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label={texts.form.fields.baseSalary.label}
                type="number"
                value={inputs.baseSalary}
                onChange={(e) => onChange('baseSalary', e.target.value)}
                required
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">{texts.form.fields.baseSalary.unit}</InputAdornment>,
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
            p: 3.5,
            mb: 3,
            bgcolor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            border: '1px solid rgba(43, 76, 140, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 6px 16px rgba(43, 76, 140, 0.12)',
              borderColor: 'rgba(43, 76, 140, 0.15)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          <SectionTitle icon={texts.form.sections.insurance.icon} title={texts.form.sections.insurance.title} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SwitchControl
                label={texts.form.fields.pension.label}
                checked={inputs.hasPension}
                onChange={(checked) => onChange('hasPension', checked)}
              />
            </Grid>
            <Grid item xs={12}>
              <SwitchControl
                label={texts.form.fields.careInsurance.label}
                checked={inputs.hasCareInsurance}
                onChange={(checked) => onChange('hasCareInsurance', checked)}
              />
            </Grid>
            <Grid item xs={12}>
              <SwitchControl
                label={texts.form.fields.childCare.label}
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
          {texts.form.buttons.calculate}
        </GradientButton>
      </Grid>
    </Grid>
  );
};
