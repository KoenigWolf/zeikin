import { useState, useCallback, useMemo, memo } from 'react';
import { 
  Box, 
  useTheme, 
  useMediaQuery,
  Alert,
  Snackbar
} from '@mui/material';
import { useTaxCalculation, type TaxCalculationResult } from '../hooks/useTaxCalculation';
import { TaxForm } from './TaxForm';
import { EmployeeTaxResult } from './EmployeeTaxResult';
import { EmployerTaxResult } from './EmployerTaxResult';
import {
  RootBox,
  GradientBox,
  StyledContainer,
  ContentContainer,
  ContentBox,
  ResultGrid
} from '@styles/shared.styles';
import { HeaderTypography, ResultTitle } from '@styles/components/Typography.styles';
import { StyledCard, StyledCardContent } from '@styles/components/Card.styles';
import { texts } from '@constants';
import { validateSalary, validateBonus, safeMathOperation } from '@domain/validation';
import type { TaxCalculationInput } from '@domain/tax';

const MemoizedTaxForm = memo(TaxForm);
const MemoizedEmployeeTaxResult = memo(EmployeeTaxResult);
const MemoizedEmployerTaxResult = memo(EmployerTaxResult);

export const TaxCalculator = () => {
  const [inputs, setInputs] = useState({
    baseSalary: "30",
    bonus: "",
    hasPension: false,
    hasCareInsurance: false,
    hasChildCare: false,
  });

  const [result, setResult] = useState<TaxCalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { calculate } = useTaxCalculation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleInputChange = useCallback((key: string, value: string | number | boolean) => {
    if (typeof value === 'boolean') {
      setInputs((prev) => ({
        ...prev,
        [key]: value,
      }));
      return;
    }

    const stringValue = value.toString();
    
    if (key === 'baseSalary') {
      const validation = validateSalary(stringValue);
      if (!validation.isValid && stringValue !== '') {
        setError(validation.error || '無効な入力値です');
        return;
      }
    } else if (key === 'bonus') {
      const validation = validateBonus(stringValue);
      if (!validation.isValid && stringValue !== '') {
        setError(validation.error || '無効な入力値です');
        return;
      }
    }

    setInputs((prev) => ({
      ...prev,
      [key]: stringValue,
    }));
    setError(null);
  }, []);

  const handleCalculate = useCallback(() => {
    setError(null);

    const salaryValidation = validateSalary(inputs.baseSalary);
    if (!salaryValidation.isValid) {
      setError(salaryValidation.error || '月給の入力が無効です');
      return;
    }

    const bonusValidation = validateBonus(inputs.bonus || '0');
    if (!bonusValidation.isValid) {
      setError(bonusValidation.error || 'ボーナスの入力が無効です');
      return;
    }

    const numericInputs: TaxCalculationInput = {
      baseSalary: salaryValidation.sanitizedValue || 0,
      bonus: bonusValidation.sanitizedValue || 0,
      hasPension: inputs.hasPension,
      hasCareInsurance: inputs.hasCareInsurance,
      hasChildCare: inputs.hasChildCare,
    };

    const calculationResult = safeMathOperation(
      () => calculate(numericInputs),
      null,
      '税金計算中にエラーが発生しました'
    );

    if (calculationResult === null) {
      setError('計算中にエラーが発生しました。入力値を確認してください。');
      return;
    }

    setResult(calculationResult);
  }, [inputs, calculate]);

  const handleCloseError = useCallback(() => {
    setError(null);
  }, []);

  const headerVariant = useMemo(() => {
    if (isMobile) return "h6";
    if (isTablet) return "h5";
    return "h5";
  }, [isMobile, isTablet]);
  
  const showError = useMemo(() => error !== null, [error]);
  const showResult = useMemo(() => result !== null, [result]);

  return (
    <RootBox>
      <GradientBox>
        <StyledContainer>
          <HeaderTypography variant={headerVariant} component="h1">
            {texts.app.title}
          </HeaderTypography>
        </StyledContainer>
      </GradientBox>

      <ContentContainer>
        <ContentBox>
          <StyledCard>
            <StyledCardContent>
              <MemoizedTaxForm 
                inputs={inputs} 
                onChange={handleInputChange} 
                onSubmit={handleCalculate} 
              />
            </StyledCardContent>
          </StyledCard>

          <Snackbar
            open={showError}
            autoHideDuration={6000}
            onClose={handleCloseError}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>

          {showResult && result && (
            <ResultGrid>
              <StyledCard>
                <StyledCardContent>
                  <ResultTitle variant="h5" gutterBottom>
                    {texts.result.titles.employee}
                  </ResultTitle>
                  <Box sx={{ flex: 1, mt: { xs: 0.5, sm: 1 } }}>
                    <MemoizedEmployeeTaxResult employee={result.employee} />
                  </Box>
                </StyledCardContent>
              </StyledCard>
              <StyledCard>
                <StyledCardContent>
                  <ResultTitle variant="h5" gutterBottom>
                    {texts.result.titles.employer}
                  </ResultTitle>
                  <Box sx={{ flex: 1, mt: { xs: 0.5, sm: 1 } }}>
                    <MemoizedEmployerTaxResult employer={result.employer} />
                  </Box>
                </StyledCardContent>
              </StyledCard>
            </ResultGrid>
          )}
        </ContentBox>
      </ContentContainer>
    </RootBox>
  );
};
