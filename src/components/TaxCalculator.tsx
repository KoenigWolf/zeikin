// =============================
// ファイル: src/components/TaxCalculator.tsx
// 役割  : ユーザー入力の状態管理と計算実行
// `TaxForm.tsx` でユーザー入力を受け取る
// `EmployeeTaxResult.tsx` と `EmployerTaxResult.tsx` で結果を表示
// 計算処理は `useTaxCalculation.ts` を使用
// =============================

import { useState } from 'react';
import { 
  Box, 
  useTheme, 
  useMediaQuery,
  Fade
} from '@mui/material';
import { useTaxCalculation, type TaxCalculationResult } from '../hooks/useTaxCalculation';
import { TaxForm } from './TaxForm';
import { EmployeeTaxResult } from './EmployeeTaxResult';
import { EmployerTaxResult } from './EmployerTaxResult';

// 共通スタイルのインポート
import {
  RootBox,
  GradientBox,
  StyledContainer,
  ContentContainer,
  ContentBox,
  ResultGrid
} from '../styles/shared.styles';

// コンポーネント固有のスタイルのインポート
import { HeaderTypography, FormTitle, ResultTitle } from '../styles/components/Typography.styles';
import { StyledCard, StyledCardContent } from '../styles/components/Card.styles';

export const TaxCalculator = () => {
  // =============================
  // 入力データの状態管理
  // `baseSalary`, `bonus` は数値型
  // チェックボックスは boolean 型
  // =============================
  const [inputs, setInputs] = useState({
    baseSalary: "30",
    bonus: "",
    hasPension: false,
    hasCareInsurance: false,
    hasChildCare: false,
  });

  // 計算結果の状態（初期値は `null`）
  const [result, setResult] = useState<TaxCalculationResult | null>(null);

  // `useTaxCalculation` から `calculate` 関数を取得
  const { calculate } = useTaxCalculation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // =============================
  // 入力変更処理
  // 数値項目は `Number(value) || 0` で変換
  // チェックボックスは `boolean` のまま渡す
  // =============================
  const handleInputChange = (key: string, value: string | number | boolean) => {
    setInputs((prev) => ({
      ...prev,
      [key]: typeof value === 'boolean' ? value : value.toString(),
    }));
  };

  // =============================
  // 計算実行
  // `calculate` を実行し、結果を `setResult` に保存
  // =============================
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
          {/* 入力フォーム */}
          <StyledCard>
            <StyledCardContent>
              <TaxForm 
                inputs={inputs} 
                onChange={handleInputChange} 
                onSubmit={handleCalculate} 
              />
            </StyledCardContent>
          </StyledCard>

          {/* 計算結果の表示 */}
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
