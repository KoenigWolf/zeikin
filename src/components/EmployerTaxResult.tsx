// =============================
// 📂 ファイル: src/components/EmployerTaxResult.tsx
// 🏢 会社負担の税金一覧を表示
// - `useTaxCalculation.ts` の計算結果を受け取る
// - 会社負担の各種税金をテーブルで表示
// - 厚生年金 (`pensionInsurance`) などのオプション項目は条件付き表示
// =============================

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import type { TaxCalculationResult } from '../hooks/useTaxCalculation';
import { formatCurrency } from './utils'; // 通貨フォーマット関数を共通化

interface EmployerTaxResultProps {
  employer: TaxCalculationResult['employer'];
}

export const EmployerTaxResult = ({ employer }: EmployerTaxResultProps) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4, p: 2 }}>
      {/* 会社負担のセクション見出し */}
      <Typography variant="h5" gutterBottom>
        会社負担 (Company's Share)
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
        {/* 💰 会社負担の税金リスト */}
        {/* ============================= */}
        <TableBody>
          <TableRow>
            <TableCell>住民税 (Inhabitant Tax)</TableCell>
            <TableCell align="right">{formatCurrency(employer.residentTax.annual)}</TableCell>
            <TableCell align="right">{formatCurrency(employer.residentTax.monthly)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>健康保険 (Health Insurance)</TableCell>
            <TableCell align="right">{formatCurrency(employer.healthInsurance.annual)}</TableCell>
            <TableCell align="right">{formatCurrency(employer.healthInsurance.monthly)}</TableCell>
          </TableRow>
          {/* 厚生年金（加入時のみ表示） */}
          {employer.pensionInsurance && (
            <TableRow>
              <TableCell>厚生年金 (Employees' Pension)</TableCell>
              <TableCell align="right">{formatCurrency(employer.pensionInsurance.annual)}</TableCell>
              <TableCell align="right">{formatCurrency(employer.pensionInsurance.monthly)}</TableCell>
            </TableRow>
          )}
          {/* 介護保険（加入時のみ表示） */}
          {employer.careInsurance && (
            <TableRow>
              <TableCell>介護保険 (Care Insurance)</TableCell>
              <TableCell align="right">{formatCurrency(employer.careInsurance.annual)}</TableCell>
              <TableCell align="right">{formatCurrency(employer.careInsurance.monthly)}</TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell>雇用保険 (Unemployment Insurance)</TableCell>
            <TableCell align="right">{formatCurrency(employer.employmentInsurance.annual)}</TableCell>
            <TableCell align="right">{formatCurrency(employer.employmentInsurance.monthly)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>労災保険 (Workers' Accident Compensation Insurance)</TableCell>
            <TableCell align="right">{formatCurrency(employer.laborInsurance.annual)}</TableCell>
            <TableCell align="right">{formatCurrency(employer.laborInsurance.monthly)}</TableCell>
          </TableRow>
          {/* 子育て拠出（適用時のみ表示） */}
          {employer.childCare && (
            <TableRow>
              <TableCell>子育て拠出 (Child Care Contribution)</TableCell>
              <TableCell align="right">{formatCurrency(employer.childCare.annual)}</TableCell>
              <TableCell align="right">{formatCurrency(employer.childCare.monthly)}</TableCell>
            </TableRow>
          )}
          {/* 会社負担合計（強調表示） */}
          <TableRow>
            <TableCell><strong>会社負担税金合計 (Total Company-Paid Taxes)</strong></TableCell>
            <TableCell align="right"><strong>{formatCurrency(employer.totalEmployerTax.annual)}</strong></TableCell>
            <TableCell align="right"><strong>{formatCurrency(employer.totalEmployerTax.monthly)}</strong></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
