// =============================
// ファイル: src/components/TaxCalculator.tsx
// 役割  : ユーザー入力の状態管理と計算実行
// - `TaxForm.tsx` でユーザー入力を受け取る
// - `EmployeeTaxResult.tsx` と `EmployerTaxResult.tsx` で結果を表示
// - 計算処理は `useTaxCalculation.ts` を使用
// =============================

import { useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useTaxCalculation, type TaxCalculationResult } from '../hooks/useTaxCalculation';
import { TaxForm } from './TaxForm';
import { EmployeeTaxResult } from './EmployeeTaxResult';
import { EmployerTaxResult } from './EmployerTaxResult';

export const TaxCalculator = () => {
  // =============================
  // 入力データの状態管理
  // - `baseSalary`, `bonus` は数値型
  // - チェックボックスは boolean 型
  // =============================
  const [inputs, setInputs] = useState({
    baseSalary: 0,
    bonus: 0,
    hasPension: false,
    hasCareInsurance: false,
    hasChildCare: false,
  });

  // 計算結果の状態（初期値は `null`）
  const [result, setResult] = useState<TaxCalculationResult | null>(null);

  // `useTaxCalculation` から `calculate` 関数を取得
  const { calculate } = useTaxCalculation();

  // =============================
  // 入力変更処理
  // - 数値項目は `Number(value) || 0` で変換
  // - チェックボックスは `boolean` のまま渡す
  // =============================
  const handleInputChange = (key: string, value: string | number | boolean) => {
    setInputs((prev) => ({
      ...prev,
      [key]: typeof value === 'string' ? Number(value) || 0 : value,
    }));
  };

  // =============================
  // 計算実行
  // - `calculate` を実行し、結果を `setResult` に保存
  // =============================
  const handleCalculate = () => {
    setResult(calculate(inputs));
  };

  return (
    <Box>
      {/* 入力フォーム */}
      <Card sx={{ mb: 100, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" color="primary">
            税金計算
          </Typography>
          <TaxForm inputs={inputs} onChange={handleInputChange} onSubmit={handleCalculate} />
        </CardContent>
      </Card>

      {/* 計算結果の表示 */}
      {result && (
        <>
          <EmployeeTaxResult employee={result.employee} />
          <EmployerTaxResult employer={result.employer} />
        </>
      )}
    </Box>
  );
};
