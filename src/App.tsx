import { useState, useEffect } from 'react';
import type{ Report } from './types';
import { initializeData } from './utils/data';
import { storage } from './utils/storage';
import { PatientList } from './components/PatientList';
import { ReportViewer } from './components/ReportViewer';
import { CreateReportForm } from './components/CreateReportForm';
import { ThemeToggle } from './components/ThemeToggle';
import { Activity, FileText, Plus } from 'lucide-react';
import { Button } from "./components/ui/button";

type View = 'list' | 'create' | 'view';

function App() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [currentView, setCurrentView] = useState<View>('list');

  useEffect(() => {
    setReports(initializeData());
  }, []);

  const handleSelectReport = (report: Report) => {
    setSelectedReport(report);
    setCurrentView('view');
  };

  const handleBack = () => {
    setSelectedReport(null);
    setCurrentView('list');
  };

  const handleCreateReport = () => {
    setEditingReport(null); 
    setCurrentView('create');
  };

  const handleEditReport = (report: Report) => {
    setEditingReport(report);
    setCurrentView('create');
  };

  const handleSaveReport = (newReport: Report) => {
    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    storage.saveReports(updatedReports);
    setCurrentView('list');
  };

  const handleUpdateReport = (updatedReport: Report) => {
    const updatedReports = reports.map(r => 
      r.id === updatedReport.id ? updatedReport : r
    );
    setReports(updatedReports);
    storage.saveReports(updatedReports);
    setEditingReport(null);
    setCurrentView('list');
  };

  const handleDeleteReport = (id: string) => {
    const updatedReports = reports.filter(r => r.id !== id);
    setReports(updatedReports);
    storage.saveReports(updatedReports);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">PathoReport</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Lab Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {currentView === 'list' && (
                <Button onClick={handleCreateReport} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Report
                </Button>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {currentView === 'create' && (
          <CreateReportForm 
            onSave={handleSaveReport} 
            onUpdate={handleUpdateReport}
            onCancel={handleBack} 
            initialReport={editingReport}
          />
        )}
        
        {currentView === 'view' && selectedReport && (
          <ReportViewer 
            report={selectedReport} 
            onBack={handleBack} 
            onEdit={() => handleEditReport(selectedReport)}
          />
        )}
        
        {currentView === 'list' && (
          <PatientList 
            reports={reports} 
            onSelectReport={handleSelectReport} 
            onEditReport={handleEditReport}
            onDeleteReport={handleDeleteReport}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <p>© 2024 PathoReport Labs. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Offline-First Lab Management</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;