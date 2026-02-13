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
    tests: [
      {
        id: 'TG001',
        testType: 'Complete Blood Count (CBC)',
        price: 300,
        testResults: [
          { id: 'TR001', testName: 'Hemoglobin', value: '14.2', unit: 'g/dL', normalRange: '13.5-17.5', isAbnormal: false, flag: 'normal' },
          { id: 'TR002', testName: 'WBC Count', value: '11.5', unit: '×10³/µL', normalRange: '4.5-11.0', isAbnormal: true, flag: 'high' },
          { id: 'TR003', testName: 'Platelet Count', value: '250', unit: '×10³/µL', normalRange: '150-400', isAbnormal: false, flag: 'normal' },
          { id: 'TR004', testName: 'RBC Count', value: '4.8', unit: '×10⁶/µL', normalRange: '4.5-5.5', isAbnormal: false, flag: 'normal' },
        ]
      }
    ],
    date: '2024-01-15',
    status: 'Completed',
    collectedBy: 'Dr. Sarah Chen',
    verifiedBy: 'Dr. Michael Roberts',
    totalPrice: 300
  },
  {
    id: 'RPT002',
    patient: {
      id: 'P002',
      name: 'Emma Wilson',
      age: 32,
      gender: 'Female',
      patientId: 'PAT-2024-002',
      phone: '+1234567891'
    },
    tests: [
      {
        id: 'TG002',
        testType: 'Lipid Profile',
        price: 800,
        testResults: [
          { id: 'TR005', testName: 'Total Cholesterol', value: '220', unit: 'mg/dL', normalRange: '<200', isAbnormal: true, flag: 'high' },
          { id: 'TR006', testName: 'HDL Cholesterol', value: '45', unit: 'mg/dL', normalRange: '>40', isAbnormal: false, flag: 'normal' },
          { id: 'TR007', testName: 'LDL Cholesterol', value: '140', unit: 'mg/dL', normalRange: '<100', isAbnormal: true, flag: 'high' },
          { id: 'TR008', testName: 'Triglycerides', value: '130', unit: 'mg/dL', normalRange: '<150', isAbnormal: false, flag: 'normal' },
        ]
      }
    ],
    date: '2024-01-20',
    status: 'Completed',
    collectedBy: 'Dr. Sarah Chen',
    totalPrice: 800
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