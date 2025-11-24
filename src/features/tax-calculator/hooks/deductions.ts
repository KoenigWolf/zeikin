import { CALCULATION_CONSTANTS } from '@domain/tax';

/**
 * 各種税金・社会保険料の料率（2024年適用）
 * 出典: 各保険者・税務署の公式情報
 */
const TAX_RATES = {
  // 健康保険料率（協会けんぽ、労使折半）
  // 出典: 全国健康保険協会「健康保険の保険料率」https://www.kyoukaikenpo.or.jp/
  healthInsurance: 0.0987, // 9.87%（労使折半のため、労働者負担は4.935%だが、総額で計算）
  
  // 雇用保険料率（一般の事業、労働者負担）
  // 出典: 厚生労働省「雇用保険の保険料率」https://www.mhlw.go.jp/
  employmentInsurance: 0.003, // 0.3%（労働者負担、事業主負担は0.5%）
  
  // 介護保険料率（40歳以上、労使折半）
  // 出典: 厚生労働省「介護保険制度」https://www.mhlw.go.jp/
  careInsurance: 0.0173, // 1.73%（労使折半のため、労働者負担は0.865%だが、総額で計算）
  
  // 厚生年金保険料率（労使折半）
  // 出典: 日本年金機構「厚生年金保険の保険料」https://www.nenkin.go.jp/
  pensionInsurance: 0.183, // 18.3%（労使折半のため、労働者負担は9.15%だが、総額で計算）
  
  // 労災保険料率（一般の事業、事業主負担のみ）
  // 出典: 厚生労働省「労災保険の保険料」https://www.mhlw.go.jp/
  laborInsurance: 0.0025, // 0.25%（事業主負担のみ）
  
  // 子育て拠出金（事業主負担のみ）
  // 出典: 厚生労働省「子育て拠出金」https://www.mhlw.go.jp/
  childCare: 0.0036, // 0.36%（事業主負担のみ）
  
  // 住民税の税率
  // 出典: 総務省「住民税のしくみ」https://www.soumu.go.jp/
  residentTaxRate: 0.10, // 10%（所得割、市町村民税6% + 都道府県民税4%）
  residentTaxBase: 5_000, // 5,000円（均等割、自治体により異なるが一般的には5,000円）
  
  // 住民税の基礎控除（2020年改正後）
  // 出典: 総務省「住民税の基礎控除」https://www.soumu.go.jp/
  incomeDeduction: 430_000, // 43万円（所得税の基礎控除48万円とは異なる）
} as const;

interface Deductions {
  residentTax: number;
  healthInsurance: number;
  employmentInsurance: number;
  careInsurance: number;
  pensionInsurance: number;
  laborInsurance: number;
  childCare: number;
}

/**
 * 各種控除額を計算します
 * 
 * @param salary 月額給与（円）
 * @param hasPension 厚生年金加入有無
 * @param hasCareInsurance 介護保険加入有無（40歳以上）
 * @param isEmployer 事業主負担分を計算するか（true: 事業主負担、false: 労働者負担）
 * @returns 各種控除額（月額、円）
 */
export const calculateDeductions = (
  salary: number,
  hasPension: boolean,
  hasCareInsurance: boolean,
  isEmployer = false
): Deductions => {
  // 住民税の計算
  // 住民税は前年の所得に対して課税されるが、簡易計算として当年の年収から計算
  // 出典: 総務省「住民税のしくみ」https://www.soumu.go.jp/
  // 計算式: (年収 - 基礎控除43万円) × 10% + 均等割5,000円 = 年間住民税
  // 年間住民税を12ヶ月で割って月額を計算
  const annualSalary = salary * CALCULATION_CONSTANTS.conversion.monthsPerYear;
  const taxableResidentIncome = Math.max(0, annualSalary - TAX_RATES.incomeDeduction);
  const annualResidentTax = Math.max(0, taxableResidentIncome * TAX_RATES.residentTaxRate + TAX_RATES.residentTaxBase);
  const residentTax = Math.max(0, Math.floor(annualResidentTax / CALCULATION_CONSTANTS.conversion.monthsPerYear));

  // 健康保険料（労使折半、労働者負担は総額の50%）
  // 出典: 全国健康保険協会「健康保険の保険料率」https://www.kyoukaikenpo.or.jp/
  const healthInsurance = Math.max(0, Math.floor((salary * TAX_RATES.healthInsurance) / 2));

  // 雇用保険料（労働者負担0.3%、事業主負担0.5%）
  // 出典: 厚生労働省「雇用保険の保険料率」https://www.mhlw.go.jp/
  const employmentInsurance = Math.max(0, isEmployer 
    ? Math.floor(salary * 0.005) // 事業主負担0.5%
    : Math.floor(salary * TAX_RATES.employmentInsurance)); // 労働者負担0.3%

  // 介護保険料（40歳以上、労使折半、労働者負担は総額の50%）
  // 出典: 厚生労働省「介護保険制度」https://www.mhlw.go.jp/
  const careInsurance = hasCareInsurance ? Math.max(0, Math.floor((salary * TAX_RATES.careInsurance) / 2)) : 0;

  // 厚生年金保険料（労使折半、労働者負担は総額の50%）
  // 出典: 日本年金機構「厚生年金保険の保険料」https://www.nenkin.go.jp/
  const pensionInsurance = hasPension ? Math.max(0, Math.floor((salary * TAX_RATES.pensionInsurance) / 2)) : 0;

  // 労災保険料（事業主負担のみ）
  // 出典: 厚生労働省「労災保険の保険料」https://www.mhlw.go.jp/
  const laborInsurance = isEmployer ? Math.max(0, Math.floor(salary * TAX_RATES.laborInsurance)) : 0;

  // 子育て拠出金（事業主負担のみ）
  // 出典: 厚生労働省「子育て拠出金」https://www.mhlw.go.jp/
  const childCare = isEmployer ? Math.max(0, Math.floor(salary * TAX_RATES.childCare)) : 0;

  return {
    residentTax,
    healthInsurance,
    employmentInsurance,
    careInsurance,
    pensionInsurance,
    laborInsurance,
    childCare,
  };
};
