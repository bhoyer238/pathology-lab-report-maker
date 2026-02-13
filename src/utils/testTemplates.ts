export interface TestParameter {
  id: string;
  testName: string;
  unit: string;
  normalRange: string;
}

export interface TestTemplate {
  id: string;
  name: string;
  price: number; 
  parameters: TestParameter[];
}

export const testTemplates: TestTemplate[] = [
  {
    id: 'cbc',
    name: 'Complete Blood Count (CBC)',
    price: 300,
    parameters: [
      { id: 'hgb', testName: 'Hemoglobin', unit: 'g/dL', normalRange: '13.5-17.5' },
      { id: 'wbc', testName: 'WBC Count', unit: '×10³/µL', normalRange: '4.5-11.0' },
      { id: 'plt', testName: 'Platelet Count', unit: '×10³/µL', normalRange: '150-400' },
      { id: 'rbc', testName: 'RBC Count', unit: '×10⁶/µL', normalRange: '4.5-5.5' },
    ]
  },

  {
    id: 'lipid',
    name: 'Lipid Profile',
    price: 800,
    parameters: [
      { id: 'chol', testName: 'Total Cholesterol', unit: 'mg/dL', normalRange: '<200' },
      { id: 'hdl', testName: 'HDL Cholesterol', unit: 'mg/dL', normalRange: '>40' },
      { id: 'ldl', testName: 'LDL Cholesterol', unit: 'mg/dL', normalRange: '<100' },
      { id: 'tri', testName: 'Triglycerides', unit: 'mg/dL', normalRange: '<150' },
    ]
  },

  {
    id: 'thyroid',
    name: 'Thyroid Panel',
    price: 1000,
    parameters: [
      { id: 'tsh', testName: 'TSH', unit: 'mIU/L', normalRange: '0.4-4.0' },
      { id: 'ft3', testName: 'Free T3', unit: 'pg/mL', normalRange: '2.0-4.4' },
      { id: 'ft4', testName: 'Free T4', unit: 'ng/dL', normalRange: '0.8-1.8' },
    ]
  },

  {
    id: 'glucose',
    name: 'Blood Glucose',
    price: 800,
    parameters: [
      { id: 'fg', testName: 'Fasting Glucose', unit: 'mg/dL', normalRange: '70-100' },
      { id: 'ppg', testName: 'Post Prandial Glucose', unit: 'mg/dL', normalRange: '<140' },
      { id: 'hba1c', testName: 'HbA1c', unit: '%', normalRange: '4.0-5.6' },
    ]
  },

  {
    id: 'lft',
    name: 'Liver Function Test',
    price: 800,
    parameters: [
      { id: 'alt', testName: 'ALT (SGPT)', unit: 'U/L', normalRange: '7-56' },
      { id: 'ast', testName: 'AST (SGOT)', unit: 'U/L', normalRange: '10-40' },
      { id: 'alp', testName: 'Alkaline Phosphatase', unit: 'U/L', normalRange: '44-147' },
      { id: 'bili', testName: 'Bilirubin Total', unit: 'mg/dL', normalRange: '0.3-1.2' },
    ]
  },

  {
    id: 'kft',
    name: 'Kidney Function Test',
    price: 800,
    parameters: [
      { id: 'creat', testName: 'Creatinine', unit: 'mg/dL', normalRange: '0.7-1.3' },
      { id: 'urea', testName: 'Blood Urea', unit: 'mg/dL', normalRange: '15-40' },
      { id: 'egfr', testName: 'eGFR', unit: 'mL/min', normalRange: '>60' },
    ]
  },

  {
    id: 'electrolytes',
    name: 'Serum Electrolytes',
    price: 800,
    parameters: [
      { id: 'na', testName: 'Sodium', unit: 'mmol/L', normalRange: '135-145' },
      { id: 'k', testName: 'Potassium', unit: 'mmol/L', normalRange: '3.5-5.1' },
      { id: 'cl', testName: 'Chloride', unit: 'mmol/L', normalRange: '98-107' },
    ]
  },

  {
    id: 'urine',
    name: 'Urine Routine Examination',
    price: 800,
    parameters: [
      { id: 'color', testName: 'Color', unit: '', normalRange: 'Pale Yellow' },
      { id: 'ph', testName: 'pH', unit: '', normalRange: '4.5-8.0' },
      { id: 'protein', testName: 'Protein', unit: '', normalRange: 'Negative' },
      { id: 'sugar', testName: 'Sugar', unit: '', normalRange: 'Negative' },
    ]
  },

  {
    id: 'vitamins',
    name: 'Vitamin Profile',
    price: 1200,
    parameters: [
      { id: 'vitd', testName: 'Vitamin D (25-OH)', unit: 'ng/mL', normalRange: '30-100' },
      { id: 'vitb12', testName: 'Vitamin B12', unit: 'pg/mL', normalRange: '200-900' },
    ]
  },

  {
    id: 'iron',
    name: 'Iron Studies',
    price: 1300,
    parameters: [
      { id: 'iron', testName: 'Serum Iron', unit: 'µg/dL', normalRange: '60-170' },
      { id: 'tibc', testName: 'TIBC', unit: 'µg/dL', normalRange: '240-450' },
      { id: 'ferritin', testName: 'Ferritin', unit: 'ng/mL', normalRange: '30-400' },
    ]
  },

  {
    id: 'coagulation',
    name: 'Coagulation Profile',
    price: 1400,
    parameters: [
      { id: 'pt', testName: 'Prothrombin Time (PT)', unit: 'sec', normalRange: '11-13.5' },
      { id: 'inr', testName: 'INR', unit: '', normalRange: '0.8-1.1' },
      { id: 'ddimer', testName: 'D-Dimer', unit: 'ng/mL', normalRange: '<500' },
    ]
  }
];
