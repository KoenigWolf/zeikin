export const texts = {
  app: {
    title: 'ZEIKIN',
  },
  form: {
    sections: {
      monthlySalary: {
        title: '月額給与',
        icon: '💰',
      },
      insurance: {
        title: '保険・控除',
        icon: '🏥',
      },
    },
    fields: {
      baseSalary: {
        label: '月給',
        unit: '万円',
      },
      pension: {
        label: '厚生年金',
      },
      careInsurance: {
        label: '介護保険料',
      },
      childCare: {
        label: '子育て拠出金',
      },
    },
    buttons: {
      calculate: '計算する',
    },
  },
  result: {
    titles: {
      employee: '従業員負担額',
      employer: '企業負担額',
    },
    sections: {
      income: {
        title: '収入',
        icon: '💴',
      },
      tax: {
        title: '所得税・住民税',
        icon: '🏛️',
      },
      insurance: {
        title: '社会保険料',
        icon: '🏥',
      },
      employerInsurance: {
        title: '社会保険料（事業主負担）',
        icon: '🏢',
      },
    },
    labels: {
      grossIncome: '額面収入',
      incomeTax: '所得税',
      residentTax: '住民税',
      healthInsurance: '健康保険',
      pensionInsurance: '厚生年金',
      careInsurance: '介護保険',
      employmentInsurance: '雇用保険',
      laborInsurance: '労災保険',
      childCare: '子育て拠出金',
      totalTax: '税金合計',
      takeHome: '手取り額',
      totalEmployerTax: '会社負担税金合計',
    },
    currency: {
      yen: '円',
    },
  },
} as const;

