// =============================
// ファイル: src/components/EmployerTaxResult.tsx
// 会社負担の税金一覧を表示
// `useTaxCalculation.ts` の計算結果を受け取り、表示
// 会社負担の各種税金を `テーブル形式` で整理
// 厚生年金 (`pensionInsurance`) などのオプショナル項目は条件付き表示
// =============================

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { TaxCalculationResult } from '../hooks/useTaxCalculation';
import { colors } from '../styles/theme/colors';

// =============================
// 型定義: EmployerTaxResultProps
// `employer`: 会社負担の税金データを格納
// =============================
interface EmployerTaxResultProps {
  employer: TaxCalculationResult['employer'];
}

// =============================
// コンポーネント：ResultSection
// 各税金カテゴリ（社会保険料・合計金額）のコンテナ
// 背景・枠線・ホバー時のスタイル適用
// =============================
const ResultSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2.5),
  background: colors.background.overlay,
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${colors.border.light}`,
  transition: 'background 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.95)',
    boxShadow: `0 4px 8px ${colors.shadow.light}`,
  },
  '&:last-child': {
    marginBottom: 0,
  },
}));

// =============================
// コンポーネント：ResultItem
// 各税金項目（住民税・健康保険など）を整列表示
// ラベルと金額を左右に配置
// 金額フォントを強調
// =============================
const ResultItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.5, 0),
  '&:not(:last-child)': {
    borderBottom: `1px solid ${colors.border.light}`,
  },
  '& .label': {
    fontSize: '1rem',
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  '& .value': {
    fontSize: '1.1rem',
    color: colors.text.primary,
    fontWeight: 600,
  },
  '& .total-label': {
    fontSize: '1.2rem',
    color: theme.palette.text.primary,
    fontWeight: 700,
  },
  '& .total-value': {
    fontSize: '1.4rem',
    color: colors.text.secondary,
    fontWeight: 800,
  },
}));

// =============================
// コンポーネント：SectionTitle
// セクション見出しを統一化
// アイコン付きのスタイルを適用
// =============================
const SectionTitle = ({ icon, title }: { icon: string; title: string }) => (
  <Typography
    variant="h6"
    sx={{
      color: colors.text.primary,
      mb: 2,
      fontSize: '1.1rem',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      '&::before': {
        content: `"${icon}"`,
        fontSize: '1.2rem',
      },
    }}
  >
    {title}
  </Typography>
);

// =============================
// メインコンポーネント：EmployerTaxResult
// 会社負担の税金情報を一覧表示
// `pensionInsurance`（厚生年金）はオプション項目
// =============================

export const EmployerTaxResult = ({ employer }: EmployerTaxResultProps) => {
  return (
    <Box>
      {/* 🏢 社会保険料（事業主負担） */}
      <ResultSection>
        <SectionTitle icon="🏢" title="社会保険料（事業主負担）" />
        
        <ResultItem>
          <span className="label">住民税</span>
          <span className="value">{employer.residentTax.monthly.toLocaleString()} 円</span>
        </ResultItem>

        <ResultItem>
          <span className="label">健康保険</span>
          <span className="value">{employer.healthInsurance.monthly.toLocaleString()} 円</span>
        </ResultItem>

        {employer.pensionInsurance && (
          <ResultItem>
            <span className="label">厚生年金</span>
            <span className="value">{employer.pensionInsurance.monthly.toLocaleString()} 円</span>
          </ResultItem>
        )}

        <ResultItem>
          <span className="label">雇用保険</span>
          <span className="value">{employer.employmentInsurance.monthly.toLocaleString()} 円</span>
        </ResultItem>

        <ResultItem>
          <span className="label">労災保険</span>
          <span className="value">{employer.laborInsurance.monthly.toLocaleString()} 円</span>
        </ResultItem>
      </ResultSection>

      {/* 💰 会社負担税金合計 */}
      <ResultSection
        sx={{
          background:
            'linear-gradient(135deg, rgba(43, 76, 140, 0.04) 0%, rgba(30, 136, 229, 0.04) 100%)',
        }}
      >
        <ResultItem sx={{ border: 'none' }}>
          <span className="total-label">会社負担税金合計</span>
          <span className="total-value">{employer.totalEmployerTax.monthly.toLocaleString()} 円</span>
        </ResultItem>
      </ResultSection>
    </Box>
  );
};
