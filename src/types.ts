export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  patientId: string;
  phone: string;
}

export interface TestResult {
  id: string;
  testName: string;
  value: string;
  unit: string;
  normalRange: string;
  isAbnormal: boolean;
  flag?: 'high' | 'low' | 'normal';
}

export interface Report {
  id: string;
  patient: Patient;
  testType: string;
  testResults: TestResult[];
  date: string;
  status: 'Completed' | 'Pending' | 'In Progress';
  collectedBy: string;
  verifiedBy?: string;
}