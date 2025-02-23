// =============================
// ファイル: src/components/TaxCalculator.tsx
// 役割  : ユーザー入力の状態管理と計算実行
// - `TaxForm.tsx` でユーザー入力を受け取る
// - `EmployeeTaxResult.tsx` と `EmployerTaxResult.tsx` で結果を表示
// - 計算処理は `useTaxCalculation.ts` を使用
// =============================

import { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Container, 
  useTheme, 
  useMediaQuery,
  styled,
  Fade
} from '@mui/material';
import { useTaxCalculation, type TaxCalculationResult } from '../hooks/useTaxCalculation';
import { TaxForm } from './TaxForm';
import { EmployeeTaxResult } from './EmployeeTaxResult';
import { EmployerTaxResult } from './EmployerTaxResult';

// スタイル付きのGradientBox
const GradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2B4C8C 0%, #1E88E5 100%)',
  borderRadius: theme.shape.borderRadius * 3,
  padding: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(43, 76, 140, 0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 30%),
      radial-gradient(circle at 100% 100%, rgba(255,255,255,0.15) 0%, transparent 40%)
    `,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '10%',
    right: '5%',
    width: '200px',
    height: '200px',
    background: 'url("/calculator-icon.svg") no-repeat center center',
    opacity: 0.1,
    backgroundSize: 'contain',
  }
}));

// スタイル付きのResultCard
const ResultCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid rgba(43, 76, 140, 0.1)',
  background: '#FFFFFF',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  overflow: 'visible',
  '& .MuiTypography-root': {
    fontSize: '1.1rem',
    lineHeight: 1.6,
  },
  '& .MuiTypography-h5': {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#2B4C8C',
    marginBottom: theme.spacing(2),
  },
  '& .MuiTypography-h6': {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1E88E5',
  },
  '& .MuiFormLabel-root': {
    fontSize: '1.1rem',
  },
  '& .MuiInputBase-input': {
    fontSize: '1.2rem',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(43, 76, 140, 0.1)',
    border: '1px solid rgba(43, 76, 140, 0.2)',
  }
}));

export const TaxCalculator = () => {
  // =============================
  // 入力データの状態管理
  // - `baseSalary`, `bonus` は数値型
  // - チェックボックスは boolean 型
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
  // - 数値項目は `Number(value) || 0` で変換
  // - チェックボックスは `boolean` のまま渡す
  // =============================
  const handleInputChange = (key: string, value: string | number | boolean) => {
    setInputs((prev) => ({
      ...prev,
      [key]: typeof value === 'boolean' ? value : value.toString(),
    }));
  };

  // =============================
  // 計算実行
  // - `calculate` を実行し、結果を `setResult` に保存
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
    <Box sx={{ 
      background: 'linear-gradient(135deg, #F8FAFF 0%, #EEF2FF 100%)',
      minHeight: '100vh',
      pt: { xs: 4, md: 6 },
      pb: { xs: 8, md: 12 }
    }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 4, md: 5 }
        }}>
          {/* ヘッダーセクション */}
          <GradientBox>
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              component="h1"
              sx={{ 
                fontWeight: 800,
                mb: 2,
                color: '#FFFFFF',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: 0,
                  width: '60px',
                  height: '4px',
                  background: '#FFFFFF',
                  borderRadius: '2px',
                }
              }}
            >
              給与計算シミュレーター
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '600px',
                lineHeight: 1.6,
                mt: 3
              }}
            >
              給与にかかる税金・保険料を簡単に計算できます。
              月給や賞与、各種保険の有無を入力するだけで、
              従業員負担と企業負担の詳細が分かります。
            </Typography>
          </GradientBox>

          {/* 入力フォーム */}
          <ResultCard>
            <CardContent sx={{ 
              p: { xs: 3, sm: 4 },
              '&:last-child': { pb: { xs: 3, sm: 4 } }
            }}>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  textAlign: 'center',
                  mb: 4,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #2B4C8C 0%, #1E88E5 100%)',
                    borderRadius: '2px',
                  }
                }}
              >
                給与情報を入力
              </Typography>
              <TaxForm 
                inputs={inputs} 
                onChange={handleInputChange} 
                onSubmit={handleCalculate} 
              />
            </CardContent>
          </ResultCard>

          {/* 計算結果の表示 */}
          <Fade in={result !== null} timeout={800}>
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 4, md: 5 },
            }}>
              {result && (
                <>
                  <ResultCard>
                    <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                      <Typography 
                        variant="h5" 
                        gutterBottom
                        sx={{ 
                          borderBottom: '2px solid rgba(43, 76, 140, 0.1)',
                          pb: 2 
                        }}
                      >
                        従業員負担額
                      </Typography>
                      <EmployeeTaxResult employee={result.employee} />
                    </CardContent>
                  </ResultCard>
                  <ResultCard>
                    <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                      <Typography 
                        variant="h5" 
                        gutterBottom
                        sx={{ 
                          borderBottom: '2px solid rgba(43, 76, 140, 0.1)',
                          pb: 2 
                        }}
                      >
                        企業負担額
                      </Typography>
                      <EmployerTaxResult employer={result.employer} />
                    </CardContent>
                  </ResultCard>
                </>
              )}
            </Box>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};
