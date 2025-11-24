export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue?: number;
}

const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;
const MAX_SALARY = 1000000;
const MAX_BONUS = 10000000;

export const validateNumber = (
  value: string | number | null | undefined,
  options: {
    min?: number;
    max?: number;
    allowZero?: boolean;
    allowNegative?: boolean;
    fieldName?: string;
  } = {}
): ValidationResult => {
  const {
    min = 0,
    max = MAX_SAFE_INTEGER,
    allowZero = true,
    allowNegative = false,
    fieldName = '値',
  } = options;

  if (value === null || value === undefined || value === '') {
    return {
      isValid: false,
      error: `${fieldName}を入力してください`,
    };
  }

  const numValue = typeof value === 'string' ? Number(value) : value;

  if (Number.isNaN(numValue)) {
    return {
      isValid: false,
      error: `${fieldName}は数値である必要があります`,
    };
  }

  if (!Number.isFinite(numValue)) {
    return {
      isValid: false,
      error: `${fieldName}は有限の数値である必要があります`,
    };
  }

  if (!allowNegative && numValue < 0) {
    return {
      isValid: false,
      error: `${fieldName}は0以上の値である必要があります`,
    };
  }

  if (!allowZero && numValue === 0) {
    return {
      isValid: false,
      error: `${fieldName}は0より大きい値である必要があります`,
    };
  }

  if (numValue < min) {
    return {
      isValid: false,
      error: `${fieldName}は${min}以上である必要があります`,
    };
  }

  if (numValue > max) {
    return {
      isValid: false,
      error: `${fieldName}は${max}以下である必要があります`,
    };
  }

  if (numValue > MAX_SAFE_INTEGER || numValue < MIN_SAFE_INTEGER) {
    return {
      isValid: false,
      error: `${fieldName}は安全な数値範囲内である必要があります`,
    };
  }

  return {
    isValid: true,
    sanitizedValue: Math.floor(numValue),
  };
};

export const validateSalary = (value: string | number | null | undefined): ValidationResult => {
  return validateNumber(value, {
    min: 0,
    max: MAX_SALARY,
    allowZero: false,
    allowNegative: false,
    fieldName: '月給',
  });
};

export const validateBonus = (value: string | number | null | undefined): ValidationResult => {
  return validateNumber(value, {
    min: 0,
    max: MAX_BONUS,
    allowZero: true,
    allowNegative: false,
    fieldName: 'ボーナス',
  });
};

export const sanitizeInput = (value: string): string => {
  return value.trim().replace(/[^\d.-]/g, '');
};

export const isSafeNumber = (value: number): boolean => {
  return (
    Number.isFinite(value) &&
    !Number.isNaN(value) &&
    value <= MAX_SAFE_INTEGER &&
    value >= MIN_SAFE_INTEGER
  );
};

export const safeMathOperation = <T>(
  operation: () => T,
  fallback: T,
  errorMessage?: string
): T => {
  try {
    const result = operation();
    if (typeof result === 'number' && !isSafeNumber(result)) {
      console.error(errorMessage || '数値計算の結果が安全な範囲を超えています');
      return fallback;
    }
    return result;
  } catch (error) {
    console.error(errorMessage || '数値計算中にエラーが発生しました', error);
    return fallback;
  }
};

