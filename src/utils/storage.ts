import type{ Report } from '../types';

export const storage = {
  getReports: (): Report[] => {
    const stored = localStorage.getItem('pathoreport_reports');
    return stored ? JSON.parse(stored) : [];
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