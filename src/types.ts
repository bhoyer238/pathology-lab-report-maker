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

export interface TestGroup {
  id: string;
  testType: string;
  testResults: TestResult[];
  price: number;
}

export interface Report {
  id: string;
  patient: Patient;
  tests: TestGroup[];
  date: string;
  status: 'Completed' | 'Pending' | 'In Progress';
  collectedBy: string;
  verifiedBy?: string;
  totalPrice: number;
}
