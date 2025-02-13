// =============================
// 📂 ファイル: src/components/EmployeeTaxResult.tsx
// 💰 社員負担の税金一覧を表示
// - `useTaxCalculation.ts` の計算結果を受け取る
// - 社員の各種税金をテーブルで表示
// - 厚生年金 (`pensionInsurance`) や 介護保険 (`careInsurance`) などのオプション項目は条件付き表示
// =============================

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import type { TaxCalculationResult } from '../hooks/useTaxCalculation';
import { formatCurrency } from './utils'; // 通貨フォーマット関数を共通化

interface EmployeeTaxResultProps {
  employee: TaxCalculationResult['employee'];
}

export const EmployeeTaxResult = ({ employee }: EmployeeTaxResultProps) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4, p: 2 }}>
      {/* 社員負担のセクション見出し */}
      <Typography variant="h5" gutterBottom>
        社員負担 (Employee Burden)
      </Typography>

      <Table>
        {/* ============================= */}
        {/* 🏢 テーブルヘッダー */}
        {/* ============================= */}
        <TableHead>
          <TableRow>
            <TableCell>項目 (Item)</TableCell>
            <TableCell align="right">年額 (Annual)</TableCell>
            <TableCell align="right">月額 (Monthly)</TableCell>
          </TableRow>
        </TableHead>

        {/* ============================= */}
        {/* 💰 社員負担の税金リスト */}
        {/* ============================= */}
        <TableBody>
          <TableRow>
            <TableCell>額面収入 (Gross Income)</TableCell>
            <TableCell align="right">{formatCurrency(employee.grossIncome.annual)}</TableCell>
            <TableCell align="right">{formatCurrency(employee.grossIncome.monthly)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>所得税 (Income Tax)</TableCell>
            <TableCell align="right">{formatCurrency(employee.incomeTax.annual)}</TableCell>
            <TableCell align="right">{formatCurrency(employee.incomeTax.monthly)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>住民税 (Resident Tax)</TableCell>
            <TableCell align="right">{formatCurrency(employee.residentTax.annual)}</TableCell>
            <TableCell align="right">{formatCurrency(employee.residentTax.monthly)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>健康保険 (Health Insurance)</TableCell>
            <TableCell align="right">{formatCurrency(employee.healthInsurance.annual)}</TableCell>
            <TableCell align="right">{formatCurrency(employee.healthInsurance.monthly)}</TableCell>
          </TableRow>
          {/* 厚生年金は加入している場合のみ表示 */}
          {employee.pensionInsurance && (
            <TableRow>
              <TableCell>厚生年金 (Employees' Pension)</TableCell>
              <TableCell align="right">{formatCurrency(employee.pensionInsurance.annual)}</TableCell>
              <TableCell align="right">{formatCurrency(employee.pensionInsurance.monthly)}</TableCell>
            </TableRow>
          )}
          {/* 介護保険は加入している場合のみ表示 */}
          {employee.careInsurance && (
            <TableRow>
              <TableCell>介護保険 (Care Insurance)</TableCell>
              <TableCell align="right">{formatCurrency(employee.careInsurance.annual)}</TableCell>
              <TableCell align="right">{formatCurrency(employee.careInsurance.monthly)}</TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell>雇用保険 (Employment Insurance)</TableCell>
            <TableCell align="right">{formatCurrency(employee.employmentInsurance.annual)}</TableCell>
            <TableCell align="right">{formatCurrency(employee.employmentInsurance.monthly)}</TableCell>
          </TableRow>
          {/* 社員負担税金合計（強調表示） */}
          <TableRow>
            <TableCell><strong>税金合計 (Total Tax)</strong></TableCell>
            <TableCell align="right"><strong>{formatCurrency(employee.totalTax.annual)}</strong></TableCell>
            <TableCell align="right"><strong>{formatCurrency(employee.totalTax.monthly)}</strong></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>手取り額 (Net Income)</TableCell>
            <TableCell align="right">{formatCurrency(employee.takeHome.annual)}</TableCell>
            <TableCell align="right">{formatCurrency(employee.takeHome.monthly)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
