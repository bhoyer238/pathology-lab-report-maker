import type{ Report } from '../types';

// Migrate old report format to new format
const migrateReport = (report: any): Report => {
  // If already in new format with tests array, return as is
  if (report.tests && Array.isArray(report.tests)) {
    return report;
  }

  // Convert old format to new format
  if (report.testType && report.testResults) {
    return {
      ...report,
      tests: [
        {
          id: `TG-${Date.now()}`,
          testType: report.testType,
          price: report.price || 0,
          testResults: report.testResults || []
        }
      ],
      totalPrice: report.price || 0
      // Remove old fields by not spreading them, but keeping them for compatibility
    };
  }

  // Fallback: create empty tests array
  return {
    ...report,
    tests: [],
    totalPrice: 0
  };
};

export const storage = {
  getReports: (): Report[] => {
    const stored = localStorage.getItem('pathoreport_reports');
    if (!stored) return [];
    
    try {
      const parsed = JSON.parse(stored);
      const migrated = parsed.map((report: any) => migrateReport(report));
      return migrated;
    } catch (error) {
      console.error('Error reading reports:', error);
      return [];
    }
  },
  
  saveReports: (reports: Report[]): void => {
    localStorage.setItem('pathoreport_reports', JSON.stringify(reports));
  },
  
  getReportById: (id: string): Report | null => {
    const reports = storage.getReports();
    return reports.find(r => r.id === id) || null;
  },
  
  updateReportStatus: (id: string, status: Report['status']): void => {
    const reports = storage.getReports();
    const index = reports.findIndex(r => r.id === id);
    if (index !== -1) {
      reports[index].status = status;
      storage.saveReports(reports);
    }
  }
};