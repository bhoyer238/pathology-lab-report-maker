import { useState, useEffect } from 'react';
import type { Report } from './types';
import { initializeData } from './utils/data';
import { storage } from './utils/storage';
import { PatientList } from './components/PatientList';
import { ReportViewer } from './components/ReportViewer';
import { CreateReportForm } from './components/CreateReportForm';
import { ThemeToggle } from './components/ThemeToggle';
import { DataManagement } from './components/DataManagement';
import { Activity, Plus } from 'lucide-react';
import { Button } from './components/ui/button';
import { Dashboard } from './components/Dashboard';

type View = 'list' | 'create' | 'view' | 'dashboard';


function App() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [currentView, setCurrentView] = useState<View>('list');

  /* -------------------- LOAD DATA -------------------- */
  useEffect(() => {
    const reports = storage.getReports();
    if (reports.length > 0) {
      setReports(reports);
    } else {
      setReports(initializeData());
    }
  }, []);

  /* -------------------- SAVE DATA -------------------- */
  useEffect(() => {
    if (reports.length > 0) {
      localStorage.setItem('pathoreport_reports', JSON.stringify(reports));
    }
  }, [reports]);

  /* -------------------- HANDLERS -------------------- */
  const handleSelectReport = (report: Report) => {
    setSelectedReport(report);
    setCurrentView('view');
  };

  const handleBack = () => {
    setSelectedReport(null);
    setEditingReport(null);
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
    const updated = [newReport, ...reports];
    setReports(updated);
    storage.saveReports(updated);
    setCurrentView('list');
  };

  const handleUpdateReport = (updatedReport: Report) => {
    const updated = reports.map(r =>
      r.id === updatedReport.id ? updatedReport : r
    );
    setReports(updated);
    storage.saveReports(updated);
    setEditingReport(null);
    setCurrentView('list');
  };

  const handleDeleteReport = (id: string) => {
    const updated = reports.filter(r => r.id !== id);
    setReports(updated);
    storage.saveReports(updated);
  };

  /* -------------------- KEYBOARD SHORTCUTS -------------------- */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {

      // Ctrl + P → Print Report (only in view)
      if (e.ctrlKey && e.key.toLowerCase() === 'p') {
        if (currentView === 'view') {
          e.preventDefault();
          window.print();
        }
      }

      // Esc → Back to list
      if (e.key === 'Escape') {
        if (currentView !== 'list') {
          handleBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, reports]);


  /* -------------------- BACKUP -------------------- */
  const handleBackup = () => {
    const dataStr = JSON.stringify(reports, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `pathoreport-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  /* -------------------- RESTORE -------------------- */
  const handleRestore = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (Array.isArray(parsed)) {
          const confirmRestore = window.confirm(
            `This will replace ${reports.length} reports with ${parsed.length}. Continue?`
          );
          if (confirmRestore) {
            setReports(parsed);
            alert('Data restored successfully');
          }
        } else {
          alert('Invalid backup file');
        }
      } catch {
        alert('Failed to read backup file');
      }
    };
    reader.readAsText(file);
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold dark:text-white">PathoReport</h1>
              <p className="text-xs text-gray-500">Lab Management System</p>
            </div>
          </div>

          <div className="flex items-center gap-3">

            <Button onClick={() => setCurrentView('dashboard')}>
              Dashboard
            </Button>

            <Button onClick={() => setCurrentView('list')}>
              Reports
            </Button>

            <Button onClick={handleCreateReport}>
              <Plus className="w-4 h-4 mr-2" />
              New Report
            </Button>

            <DataManagement onBackup={handleBackup} onRestore={handleRestore} />
            <ThemeToggle />

          </div>

        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">

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

       {currentView === 'dashboard' && (
  <Dashboard reports={reports} />
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
    </div>
  );
}

export default App;
