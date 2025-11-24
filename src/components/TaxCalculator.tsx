import { useState } from 'react';
import { 
  Box, 
  useTheme, 
  useMediaQuery,
  Fade
} from '@mui/material';
import { useTaxCalculation, type TaxCalculationResult } from '@hooks/useTaxCalculation';
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

export const TaxCalculator = () => {
  const [inputs, setInputs] = useState({
    baseSalary: "30",
    bonus: "",
    hasPension: false,
    hasCareInsurance: false,
    hasChildCare: false,
  });

  const [result, setResult] = useState<TaxCalculationResult | null>(null);
  const { calculate } = useTaxCalculation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleInputChange = (key: string, value: string | number | boolean) => {
    setInputs((prev) => ({
      ...prev,
      [key]: typeof value === 'boolean' ? value : value.toString(),
    }));
  };

  const handleCalculate = () => {
    const numericInputs = {
      ...inputs,
      baseSalary: inputs.baseSalary ? Number(inputs.baseSalary) : 0,
      bonus: inputs.bonus ? Number(inputs.bonus) : 0,
    };
    setResult(calculate(numericInputs));
  };

  return (
    <RootBox>
      <GradientBox>
        <StyledContainer>
          <HeaderTypography variant={isMobile ? "h6" : "h5"} component="h1">
            ZEIKIN
          </HeaderTypography>
        </StyledContainer>
      </GradientBox>

      <ContentContainer>
        <ContentBox>
          <StyledCard>
            <StyledCardContent>
              <TaxForm 
                inputs={inputs} 
                onChange={handleInputChange} 
                onSubmit={handleCalculate} 
              />
            </StyledCardContent>
          </StyledCard>

          <Fade in={result !== null} timeout={800}>
            <ResultGrid>
              {result && (
                <>
                  <StyledCard>
                    <StyledCardContent>
                      <ResultTitle variant="h5" gutterBottom>
                        従業員負担額
                      </ResultTitle>
                      <Box sx={{ flex: 1 }}>
                        <EmployeeTaxResult employee={result.employee} />
                      </Box>
                    </StyledCardContent>
                  </StyledCard>
                  <StyledCard>
                    <StyledCardContent>
                      <ResultTitle variant="h5" gutterBottom>
                        企業負担額
                      </ResultTitle>
                      <Box sx={{ flex: 1 }}>
                        <EmployerTaxResult employer={result.employer} />
                      </Box>
                    </StyledCardContent>
                  </StyledCard>
                </>
              )}
            </ResultGrid>
          </Fade>
        </ContentBox>
      </ContentContainer>
    </RootBox>
  );
};
