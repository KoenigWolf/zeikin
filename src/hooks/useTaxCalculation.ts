interface TaxCalculationInput {
  baseSalary: number;
  bonus: number;
  hasPension: boolean;
  hasCareInsurance: boolean;
  hasChildCare: boolean;
}

interface TaxCalculationResult {
  employee: {
    grossIncome: {
      annual: number;
      monthly: number;
    };
    incomeTax: {
      annual: number;
      monthly: number;
    };
    residentTax: {
      annual: number;
      monthly: number;
    };
    healthInsurance: {
      annual: number;
      monthly: number;
    };
    pensionInsurance?: {
      annual: number;
      monthly: number;
    };
    careInsurance?: {
      annual: number;
      monthly: number;
    };
    employmentInsurance: {
      annual: number;
      monthly: number;
    };
    takeHome: {
      annual: number;
      monthly: number;
    };
  };
  employer: {
    residentTax: {
      annual: number;
      monthly: number;
    };
    healthInsurance: {
      annual: number;
      monthly: number;
    };
    pensionInsurance?: {
      annual: number;
      monthly: number;
    };
    careInsurance?: {
      annual: number;
      monthly: number;
    };
    employmentInsurance: {
      annual: number;
      monthly: number;
    };
    laborInsurance: {
      annual: number;
      monthly: number;
    };
    childCare?: {
      annual: number;
      monthly: number;
    };
  };
}

export const useTaxCalculation = () => {
  const calculateIncomeTax = (monthlySalary: number) => {
    const annualSalary = monthlySalary * 12;
    let incomeDeduction;

    if (annualSalary <= 1800000) {
      incomeDeduction = Math.max(annualSalary * 0.4, 550000);
    } else if (annualSalary <= 3600000) {
      incomeDeduction = annualSalary * 0.3 + 180000;
    } else if (annualSalary <= 6600000) {
      incomeDeduction = annualSalary * 0.2 + 540000;
    } else if (annualSalary <= 8500000) {
      incomeDeduction = annualSalary * 0.1 + 1200000;
    } else {
      incomeDeduction = 1950000;
    }

    const basicDeduction = 480000;
    const taxableIncome = annualSalary - incomeDeduction - basicDeduction;

    let incomeTax = 0;
    if (taxableIncome <= 1950000) {
      incomeTax = taxableIncome * 0.05;
    } else if (taxableIncome <= 3300000) {
      incomeTax = 1950000 * 0.05 + (taxableIncome - 1950000) * 0.1;
    } else if (taxableIncome <= 6950000) {
      incomeTax = 1950000 * 0.05 + (3300000 - 1950000) * 0.1 + (taxableIncome - 3300000) * 0.2;
    } else if (taxableIncome <= 9000000) {
      incomeTax = 1950000 * 0.05 + (3300000 - 1950000) * 0.1 + (6950000 - 3300000) * 0.2 + (taxableIncome - 6950000) * 0.23;
    } else if (taxableIncome <= 18000000) {
      incomeTax = 1950000 * 0.05 + (3300000 - 1950000) * 0.1 + (6950000 - 3300000) * 0.2 + (9000000 - 6950000) * 0.23 + (taxableIncome - 9000000) * 0.33;
    } else if (taxableIncome <= 40000000) {
      incomeTax = 1950000 * 0.05 + (3300000 - 1950000) * 0.1 + (6950000 - 3300000) * 0.2 + (9000000 - 6950000) * 0.23 + (18000000 - 9000000) * 0.33 + (taxableIncome - 18000000) * 0.4;
    } else {
      incomeTax = 1950000 * 0.05 + (3300000 - 1950000) * 0.1 + (6950000 - 3300000) * 0.2 + (9000000 - 6950000) * 0.23 + (18000000 - 9000000) * 0.33 + (40000000 - 18000000) * 0.4 + (taxableIncome - 40000000) * 0.45;
    }

    return Math.floor(incomeTax / 12);
  };

  const calculate = (input: TaxCalculationInput): TaxCalculationResult => {
    const { baseSalary, bonus, hasPension, hasCareInsurance, hasChildCare } = input;
    const monthlySalary = baseSalary * 10000;
    const annualSalary = monthlySalary * 12 + bonus * 10000;

    const monthlyIncomeTax = calculateIncomeTax(monthlySalary);
    const residentTaxEmployee = Math.floor(annualSalary * 0.1 / 12 / 2);
    const healthInsuranceEmployee = Math.floor(monthlySalary * 0.0987 / 2);
    const employmentInsuranceEmployee = Math.floor(monthlySalary * 0.003 / 2);
    
    let careInsuranceEmployee = 0;
    let pensionInsuranceEmployee = 0;

    if (hasCareInsurance) {
      careInsuranceEmployee = Math.floor(monthlySalary * 0.0173 / 2);
    }
    if (hasPension) {
      pensionInsuranceEmployee = Math.floor(monthlySalary * 0.183 / 2);
    }

    const totalEmployeeDeductions = 
      monthlyIncomeTax + 
      residentTaxEmployee + 
      healthInsuranceEmployee + 
      pensionInsuranceEmployee + 
      employmentInsuranceEmployee + 
      careInsuranceEmployee;

    const takeHomePay = monthlySalary - totalEmployeeDeductions;

    // 会社負担分の計算
    const residentTaxEmployer = Math.floor(annualSalary * 0.1 / 12 / 2);
    const healthInsuranceEmployer = Math.floor(monthlySalary * 0.0987 / 2);
    const employmentInsuranceEmployer = Math.floor(monthlySalary * 0.003 * 2 / 3);
    const laborInsuranceEmployer = Math.floor(monthlySalary * 0.0025);
    
    let childCareEmployer = 0;
    let careInsuranceEmployer = 0;
    let pensionInsuranceEmployer = 0;

    if (hasChildCare) {
      childCareEmployer = Math.floor(monthlySalary * 0.0036);
    }
    if (hasCareInsurance) {
      careInsuranceEmployer = Math.floor(monthlySalary * 0.0173 / 2);
    }
    if (hasPension) {
      pensionInsuranceEmployer = Math.floor(monthlySalary * 0.183 / 2);
    }

    return {
      employee: {
        grossIncome: {
          annual: annualSalary,
          monthly: monthlySalary
        },
        incomeTax: {
          annual: monthlyIncomeTax * 12,
          monthly: monthlyIncomeTax
        },
        residentTax: {
          annual: residentTaxEmployee * 12,
          monthly: residentTaxEmployee
        },
        healthInsurance: {
          annual: healthInsuranceEmployee * 12,
          monthly: healthInsuranceEmployee
        },
        ...(hasPension && {
          pensionInsurance: {
            annual: pensionInsuranceEmployee * 12,
            monthly: pensionInsuranceEmployee
          }
        }),
        ...(hasCareInsurance && {
          careInsurance: {
            annual: careInsuranceEmployee * 12,
            monthly: careInsuranceEmployee
          }
        }),
        employmentInsurance: {
          annual: employmentInsuranceEmployee * 12,
          monthly: employmentInsuranceEmployee
        },
        takeHome: {
          annual: takeHomePay * 12,
          monthly: takeHomePay
        }
      },
      employer: {
        residentTax: {
          annual: residentTaxEmployer * 12,
          monthly: residentTaxEmployer
        },
        healthInsurance: {
          annual: healthInsuranceEmployer * 12,
          monthly: healthInsuranceEmployer
        },
        ...(hasPension && {
          pensionInsurance: {
            annual: pensionInsuranceEmployer * 12,
            monthly: pensionInsuranceEmployer
          }
        }),
        ...(hasCareInsurance && {
          careInsurance: {
            annual: careInsuranceEmployer * 12,
            monthly: careInsuranceEmployer
          }
        }),
        employmentInsurance: {
          annual: employmentInsuranceEmployer * 12,
          monthly: employmentInsuranceEmployer
        },
        laborInsurance: {
          annual: laborInsuranceEmployer * 12,
          monthly: laborInsuranceEmployer
        },
        ...(hasChildCare && {
          childCare: {
            annual: childCareEmployer * 12,
            monthly: childCareEmployer
          }
        })
      }
    };
  };

  return { calculate };
};

export type { TaxCalculationInput, TaxCalculationResult };