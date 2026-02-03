export interface TestParameter {
  id: string;
  testName: string;
  unit: string;
  normalRange: string;
}

export interface TestTemplate {
  id: string;
  name: string;
  parameters: TestParameter[];
}

export const testTemplates: TestTemplate[] = [
  {
    id: 'cbc',
    name: 'Complete Blood Count (CBC)',
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
    parameters: [
      { id: 'tsh', testName: 'TSH', unit: 'mIU/L', normalRange: '0.4-4.0' },
      { id: 'ft3', testName: 'Free T3', unit: 'pg/mL', normalRange: '2.0-4.4' },
      { id: 'ft4', testName: 'Free T4', unit: 'ng/dL', normalRange: '0.8-1.8' },
    ]
  },
  {
    id: 'glucose',
    name: 'Blood Glucose Fasting',
    parameters: [
      { id: 'fg', testName: 'Fasting Glucose', unit: 'mg/dL', normalRange: '70-100' },
      { id: 'hba1c', testName: 'HbA1c', unit: '%', normalRange: '4.0-5.6' },
    ]
  },
  {
    id: 'lft',
    name: 'Liver Function Test',
    parameters: [
      { id: 'alt', testName: 'ALT', unit: 'U/L', normalRange: '7-56' },
      { id: 'ast', testName: 'AST', unit: 'U/L', normalRange: '10-40' },
      { id: 'bili', testName: 'Bilirubin Total', unit: 'mg/dL', normalRange: '0.3-1.2' },
    ]
  },
  {
    id: 'kft',
    name: 'Kidney Function Test',
    parameters: [
      { id: 'creat', testName: 'Creatinine', unit: 'mg/dL', normalRange: '0.7-1.3' },
      { id: 'bun', testName: 'BUN', unit: 'mg/dL', normalRange: '7-20' },
      { id: 'egfr', testName: 'eGFR', unit: 'mL/min', normalRange: '>60' },
    ]
  }
];