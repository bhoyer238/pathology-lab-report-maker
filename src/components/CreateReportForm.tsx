import { useState, useEffect } from 'react';
import type{ Report, TestResult } from '../types';
import type{TestTemplate} from '../utils/testTemplates';
import { testTemplates } from '../utils/testTemplates';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ArrowLeft, Save, Edit2 } from 'lucide-react';

interface CreateReportFormProps {
  onSave: (report: Report) => void;
  onUpdate: (report: Report) => void;
  onCancel: () => void;
  initialReport?: Report | null; // New prop for editing
}

export function CreateReportForm({ onSave, onUpdate, onCancel, initialReport }: CreateReportFormProps) {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedTestTemplate, setSelectedTestTemplate] = useState<TestTemplate | null>(null);
  const [results, setResults] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'Completed' | 'Pending' | 'In Progress'>('Pending');


  // Populate form if editing an existing report
  useEffect(() => {
    if (initialReport) {
      setPatientName(initialReport.patient.name);
      setPatientAge(initialReport.patient.age.toString());
      setPatientGender(initialReport.patient.gender as 'Male' | 'Female' | 'Other');
      setPatientPhone(initialReport.patient.phone || '');
      setStatus(initialReport.status);

      // Find the template based on test name
      const template = testTemplates.find(t => t.name === initialReport.testType);
      if (template) {
        setSelectedTestTemplate(template);
        
        // Map existing results to the form state
        const existingResults: Record<string, string> = {};
        template.parameters.forEach(param => {
          const result = initialReport.testResults.find(tr => tr.testName === param.testName);
          existingResults[param.id] = result ? result.value : '';
        });
        setResults(existingResults);
      }
    }
  }, [initialReport]);

  const handleTestChange = (testId: string) => {
    const template = testTemplates.find(t => t.id === testId);
    if (template) {
      setSelectedTestTemplate(template);
      const initialResults: Record<string, string> = {};
      template.parameters.forEach(p => {
        initialResults[p.id] = '';
      });
      setResults(initialResults);
    }
  };

  const handleResultChange = (paramId: string, value: string) => {
    setResults(prev => ({
      ...prev,
      [paramId]: value
    }));
  };

  const checkFlag = (value: string, range: string): 'high' | 'low' | 'normal' | undefined => {
    if (!value || value === '---') return undefined;
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return undefined;

    if (range.includes('-')) {
      const [min, max] = range.split('-').map(Number);
      if (numValue > max) return 'high';
      if (numValue < min) return 'low';
    } else if (range.startsWith('<')) {
      const max = parseFloat(range.substring(1));
      if (numValue >= max) return 'high';
    } else if (range.startsWith('>')) {
      const min = parseFloat(range.substring(1));
      if (numValue <= min) return 'low';
    }
    return 'normal';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTestTemplate || !patientName || !patientAge) {
      alert('Please fill in all required fields');
      return;
    }

    const reportData: Report = {
      id: initialReport ? initialReport.id : `RPT${Date.now()}`,
      patient: {
        id: initialReport ? initialReport.patient.id : `P${Date.now()}`,
        name: patientName,
        age: parseInt(patientAge),
        gender: patientGender,
        patientId: initialReport ? initialReport.patient.patientId : `PAT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        phone: patientPhone
      },
      testType: selectedTestTemplate.name,
      date: initialReport ? initialReport.date : new Date().toISOString().split('T')[0],
      status: status,
      collectedBy: initialReport ? initialReport.collectedBy : 'Lab Technician',
      testResults: selectedTestTemplate.parameters.map(param => {
        const value = results[param.id] || (status === 'Pending' ? '---' : '0');
        const flag = checkFlag(value, param.normalRange);
        
        return {
          id: initialReport 
            ? (initialReport.testResults.find(tr => tr.testName === param.testName)?.id || `TR${Date.now()}-${param.id}`)
            : `TR${Date.now()}-${param.id}`,
          testName: param.testName,
          value: value,
          unit: param.unit,
          normalRange: param.normalRange,
          isAbnormal: flag !== 'normal' && flag !== undefined,
          flag: flag
        };
      })
    };

    if (initialReport) {
      onUpdate(reportData);
    } else {
      onSave(reportData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button onClick={onCancel} variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {initialReport ? 'Edit Report' : 'Create New Report'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {initialReport ? 'Update patient details and test results' : 'Enter patient details and test results'}
            </p>
          </div>
        </div>
        <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
          {initialReport ? <Edit2 className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          {initialReport ? 'Update Report' : 'Save Report'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Patient Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Patient Name *</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <Label>Gender *</Label>
              <RadioGroup value={patientGender} onValueChange={(v: any) => setPatientGender(v)} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Test Selection Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Test Selection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="testType">Select Test Type *</Label>
              <Select 
                value={selectedTestTemplate?.id} 
                onValueChange={handleTestChange}
                disabled={!!initialReport} // Disable changing test type if editing
              >
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue placeholder="Choose a test..." />
                </SelectTrigger>
                <SelectContent>
                  {testTemplates.map(test => (
                    <SelectItem key={test.id} value={test.id}>{test.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Report Status</Label>
              <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Test Results Card */}
        {selectedTestTemplate && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Test Results: {selectedTestTemplate.name}
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Test Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Result</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Unit</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Normal Range</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTestTemplate.parameters.map(param => (
                    <tr key={param.id} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                        {param.testName}
                      </td>
                      <td className="py-3 px-4">
                        <Input
                          type="text"
                          placeholder={status === 'Pending' ? '---' : 'Enter value'}
                          value={results[param.id] || ''}
                          onChange={(e) => handleResultChange(param.id, e.target.value)}
                          disabled={status === 'Pending'}
                          className="w-32 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{param.unit}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{param.normalRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}