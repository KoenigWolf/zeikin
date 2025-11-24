import { memo, useCallback } from 'react';
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
import { texts } from '@constants';
import { componentTypography } from '@styles/theme/typography';
import { colors } from '@styles/theme/colors';
import { borderRadius, effects } from '@styles/theme/effects';
import { SectionTitle as BaseSectionTitle } from '@styles/components/Result.styles';

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

const SectionTitle = memo(({ icon, title }: { icon: string; title: string }) => {
  const sanitizedIcon = icon.replace(/[<>"']/g, '');
  return (
    <BaseSectionTitle
      variant="h6"
      sx={{
        mb: { xs: 2, sm: 2.5 },
        color: 'primary.main',
        '&::before': {
          content: `"${sanitizedIcon}"`,
        },
      }}
    >
      {title}
    </BaseSectionTitle>
  );
});
SectionTitle.displayName = 'SectionTitle';

const SwitchControl = memo(({
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
));
SwitchControl.displayName = 'SwitchControl';

export const TaxForm = memo(({ inputs, onChange, onSubmit }: TaxFormProps) => {
  const handleBaseSalaryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      onChange('baseSalary', value);
    }
  }, [onChange]);

  const handlePensionChange = useCallback((checked: boolean) => {
    onChange('hasPension', checked);
  }, [onChange]);

  const handleCareInsuranceChange = useCallback((checked: boolean) => {
    onChange('hasCareInsurance', checked);
  }, [onChange]);

  const handleChildCareChange = useCallback((checked: boolean) => {
    onChange('hasChildCare', checked);
  }, [onChange]);

  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      <Grid item xs={12}>
        <Box sx={{ mb: { xs: 2.5, sm: 3 } }}>
          <SectionTitle icon={texts.form.sections.monthlySalary.icon} title={texts.form.sections.monthlySalary.title} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label={texts.form.fields.baseSalary.label}
                type="number"
                value={inputs.baseSalary}
                onChange={handleBaseSalaryChange}
                inputProps={{
                  min: 0,
                  max: 1000000,
                  step: 1,
                }}
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
            p: { xs: 2.5, sm: 3, md: 3.5 },
            mb: { xs: 2.5, sm: 3 },
            bgcolor: colors.background.paper,
            backdropFilter: effects.blur.light,
            borderRadius: borderRadius.extraLarge,
            border: `1px solid ${colors.border.paper}`,
            '&:hover': {
              bgcolor: colors.background.paperHover,
              boxShadow: colors.shadow.paper,
              borderColor: colors.border.paperHover,
            },
          }}
        >
          <SectionTitle icon={texts.form.sections.insurance.icon} title={texts.form.sections.insurance.title} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SwitchControl
                label={texts.form.fields.pension.label}
                checked={inputs.hasPension}
                onChange={handlePensionChange}
              />
            </Grid>
            <Grid item xs={12}>
              <SwitchControl
                label={texts.form.fields.careInsurance.label}
                checked={inputs.hasCareInsurance}
                onChange={handleCareInsuranceChange}
              />
            </Grid>
            <Grid item xs={12}>
              <SwitchControl
                label={texts.form.fields.childCare.label}
                checked={inputs.hasChildCare}
                onChange={handleChildCareChange}
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
});
TaxForm.displayName = 'TaxForm';
