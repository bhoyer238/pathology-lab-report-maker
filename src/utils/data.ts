import type{ Report } from '../types';

export const dummyReports: Report[] = [
  {
    id: 'RPT001',
    patient: {
      id: 'P001',
      name: 'John Anderson',
      age: 45,
      gender: 'Male',
      patientId: 'PAT-2024-001',
      phone: '+1234567890'
    },
    testType: 'Complete Blood Count (CBC)',
    date: '2024-01-15',
    status: 'Completed',
    collectedBy: 'Dr. Sarah Chen',
    verifiedBy: 'Dr. Michael Roberts',
    testResults: [
      { id: 'TR001', testName: 'Hemoglobin', value: '14.2', unit: 'g/dL', normalRange: '13.5-17.5', isAbnormal: false, flag: 'normal' },
      { id: 'TR002', testName: 'WBC Count', value: '11.5', unit: '×10³/µL', normalRange: '4.5-11.0', isAbnormal: true, flag: 'high' },
      { id: 'TR003', testName: 'Platelet Count', value: '250', unit: '×10³/µL', normalRange: '150-400', isAbnormal: false, flag: 'normal' },
      { id: 'TR004', testName: 'RBC Count', value: '4.8', unit: '×10⁶/µL', normalRange: '4.5-5.5', isAbnormal: false, flag: 'normal' },
    ]
  },
  {
    id: 'RPT002',
    patient: {
      id: 'P002',
      name: 'Emily Martinez',
      age: 32,
      gender: 'Female',
      patientId: 'PAT-2024-002',
      phone: '+1234567891'
    },
    testType: 'Lipid Profile',
    date: '2024-01-14',
    status: 'Completed',
    collectedBy: 'Dr. Sarah Chen',
    verifiedBy: 'Dr. Michael Roberts',
    testResults: [
      { id: 'TR005', testName: 'Total Cholesterol', value: '245', unit: 'mg/dL', normalRange: '<200', isAbnormal: true, flag: 'high' },
      { id: 'TR006', testName: 'HDL Cholesterol', value: '45', unit: 'mg/dL', normalRange: '>40', isAbnormal: false, flag: 'normal' },
      { id: 'TR007', testName: 'LDL Cholesterol', value: '160', unit: 'mg/dL', normalRange: '<100', isAbnormal: true, flag: 'high' },
      { id: 'TR008', testName: 'Triglycerides', value: '180', unit: 'mg/dL', normalRange: '<150', isAbnormal: true, flag: 'high' },
    ]
  },
  {
    id: 'RPT003',
    patient: {
      id: 'P003',
      name: 'Robert Thompson',
      age: 58,
      gender: 'Male',
      patientId: 'PAT-2024-003',
      phone: '+1234567892'
    },
    testType: 'Blood Glucose Fasting',
    date: '2024-01-15',
    status: 'Pending',
    collectedBy: 'Dr. Sarah Chen',
    testResults: [
      { id: 'TR009', testName: 'Fasting Glucose', value: '---', unit: 'mg/dL', normalRange: '70-100', isAbnormal: false, flag: 'normal' },
      { id: 'TR010', testName: 'HbA1c', value: '---', unit: '%', normalRange: '4.0-5.6', isAbnormal: false, flag: 'normal' },
    ]
  },
  {
    id: 'RPT004',
    patient: {
      id: 'P004',
      name: 'Sophie Williams',
      age: 28,
      gender: 'Female',
      patientId: 'PAT-2024-004',
      phone: '+1234567893'
    },
    testType: 'Thyroid Panel',
    date: '2024-01-13',
    status: 'Completed',
    collectedBy: 'Dr. Sarah Chen',
    verifiedBy: 'Dr. Michael Roberts',
    testResults: [
      { id: 'TR011', testName: 'TSH', value: '4.8', unit: 'mIU/L', normalRange: '0.4-4.0', isAbnormal: true, flag: 'high' },
      { id: 'TR012', testName: 'Free T3', value: '2.8', unit: 'pg/mL', normalRange: '2.0-4.4', isAbnormal: false, flag: 'normal' },
      { id: 'TR013', testName: 'Free T4', value: '1.1', unit: 'ng/dL', normalRange: '0.8-1.8', isAbnormal: false, flag: 'normal' },
    ]
  },
  {
    id: 'RPT005',
    patient: {
      id: 'P005',
      name: 'James Wilson',
      age: 67,
      gender: 'Male',
      patientId: 'PAT-2024-005',
      phone: '+1234567894'
    },
    testType: 'Liver Function Test',
    date: '2024-01-12',
    status: 'In Progress',
    collectedBy: 'Dr. Sarah Chen',
    testResults: [
      { id: 'TR014', testName: 'ALT', value: '---', unit: 'U/L', normalRange: '7-56', isAbnormal: false, flag: 'normal' },
      { id: 'TR015', testName: 'AST', value: '---', unit: 'U/L', normalRange: '10-40', isAbnormal: false, flag: 'normal' },
      { id: 'TR016', testName: 'Bilirubin Total', value: '---', unit: 'mg/dL', normalRange: '0.3-1.2', isAbnormal: false, flag: 'normal' },
    ]
  },
  {
    id: 'RPT006',
    patient: {
      id: 'P006',
      name: 'Maria Garcia',
      age: 41,
      gender: 'Female',
      patientId: 'PAT-2024-006',
      phone: '+1234567895'
    },
    testType: 'Complete Blood Count (CBC)',
    date: '2024-01-11',
    status: 'Completed',
    collectedBy: 'Dr. Sarah Chen',
    verifiedBy: 'Dr. Michael Roberts',
    testResults: [
      { id: 'TR017', testName: 'Hemoglobin', value: '12.1', unit: 'g/dL', normalRange: '12.0-15.5', isAbnormal: false, flag: 'normal' },
      { id: 'TR018', testName: 'WBC Count', value: '6.2', unit: '×10³/µL', normalRange: '4.5-11.0', isAbnormal: false, flag: 'normal' },
      { id: 'TR019', testName: 'Platelet Count', value: '180', unit: '×10³/µL', normalRange: '150-400', isAbnormal: false, flag: 'normal' },
    ]
  },
  {
    id: 'RPT007',
    patient: {
      id: 'P007',
      name: 'David Brown',
      age: 52,
      gender: 'Male',
      patientId: 'PAT-2024-007',
      phone: '+1234567896'
    },
    testType: 'Kidney Function Test',
    date: '2024-01-10',
    status: 'Completed',
    collectedBy: 'Dr. Sarah Chen',
    verifiedBy: 'Dr. Michael Roberts',
    testResults: [
      { id: 'TR020', testName: 'Creatinine', value: '1.4', unit: 'mg/dL', normalRange: '0.7-1.3', isAbnormal: true, flag: 'high' },
      { id: 'TR021', testName: 'BUN', value: '28', unit: 'mg/dL', normalRange: '7-20', isAbnormal: true, flag: 'high' },
      { id: 'TR022', testName: 'eGFR', value: '58', unit: 'mL/min', normalRange: '>60', isAbnormal: true, flag: 'low' },
    ]
  },
  {
    id: 'RPT008',
    patient: {
      id: 'P008',
      name: 'Lisa Chen',
      age: 35,
      gender: 'Female',
      patientId: 'PAT-2024-008',
      phone: '+1234567897'
    },
    testType: 'Urine Analysis',
    date: '2024-01-15',
    status: 'Pending',
    collectedBy: 'Dr. Sarah Chen',
    testResults: [
      { id: 'TR023', testName: 'pH', value: '---', unit: '', normalRange: '4.5-8.0', isAbnormal: false, flag: 'normal' },
      { id: 'TR024', testName: 'Protein', value: '---', unit: '', normalRange: 'Negative', isAbnormal: false, flag: 'normal' },
      { id: 'TR025', testName: 'Glucose', value: '---', unit: '', normalRange: 'Negative', isAbnormal: false, flag: 'normal' },
    ]
  }
];

export const initializeData = (): Report[] => {
  const stored = localStorage.getItem('pathoreport_reports');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('pathoreport_reports', JSON.stringify(dummyReports));
  return dummyReports;
};