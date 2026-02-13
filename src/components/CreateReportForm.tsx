import { useState, useEffect } from 'react';
import type { Report, TestGroup } from '../types';
import type { TestTemplate } from '../utils/testTemplates';
import { testTemplates } from '../utils/testTemplates';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ArrowLeft, Save, Edit2, Plus, X } from 'lucide-react';

interface CreateReportFormProps {
  onSave: (report: Report) => void;
  onUpdate: (report: Report) => void;
  onCancel: () => void;
  initialReport?: Report | null;
}

interface TestFormState {
  tempId: string;
  selectedTemplate: TestTemplate | null;
  results: Record<string, string>;
}

export function CreateReportForm({ onSave, onUpdate, onCancel, initialReport }: CreateReportFormProps) {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [patientPhone, setPatientPhone] = useState('');
  const [status, setStatus] = useState<'Completed' | 'Pending' | 'In Progress'>('Pending');
  
  // Selected tests (added to report)
  const [selectedTests, setSelectedTests] = useState<TestGroup[]>([]);
  
  // Current test being configured
  const [currentTest, setCurrentTest] = useState<TestFormState | null>(null);


  // Populate form if editing
  useEffect(() => {
    if (initialReport) {
      setPatientName(initialReport.patient.name);
      setPatientAge(initialReport.patient.age.toString());
      setPatientGender(initialReport.patient.gender as 'Male' | 'Female' | 'Other');
      setPatientPhone(initialReport.patient.phone || '');
      setStatus(initialReport.status);
      setSelectedTests(initialReport.tests || []);
    }
  }, [initialReport]);

  // Start adding a new test
  const handleStartAddTest = () => {
    setCurrentTest({
      tempId: `TEMP-${Date.now()}`,
      selectedTemplate: null,
      results: {}
    });
  };

  // Handle test template selection
  const handleTestSelect = (templateId: string) => {
    if (!currentTest) return;
    
    const template = testTemplates.find(t => t.id === templateId);
    if (template) {
      const initialResults: Record<string, string> = {};
      template.parameters.forEach(p => {
        initialResults[p.id] = '';
      });
      
      setCurrentTest({
        ...currentTest,
        selectedTemplate: template,
        results: initialResults
      });
    }
  };

  // Handle result input change
  const handleResultChange = (paramId: string, value: string) => {
    if (!currentTest) return;
    
    setCurrentTest({
      ...currentTest,
      results: {
        ...currentTest.results,
        [paramId]: value
      }
    });
  };


  // Check if value is abnormal
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

  // Add current test to selected tests
  const handleAddTest = () => {
    if (!currentTest || !currentTest.selectedTemplate) {
      alert('Please select a test type');
      return;
    }

    const template = currentTest.selectedTemplate;
    const testGroup: TestGroup = {
      id: currentTest.tempId,
      testType: template.name,
      price: template.price,
      testResults: template.parameters.map(param => {
        const value = currentTest.results[param.id] || (status === 'Pending' ? '---' : '0');
        const flag = checkFlag(value, param.normalRange);

        return {
          id: `TR${Date.now()}-${param.id}`,
          testName: param.testName,
          value: value,
          unit: param.unit,
          normalRange: param.normalRange,
          isAbnormal: flag !== 'normal' && flag !== undefined,
          flag: flag
        };
      })
    };

    setSelectedTests([...selectedTests, testGroup]);
    setCurrentTest(null);
  };

  // Remove test from selected
  const handleRemoveTest = (testId: string) => {
    setSelectedTests(selectedTests.filter(t => t.id !== testId));
  };

  // Cancel adding current test
  const handleCancelAddTest = () => {
    setCurrentTest(null);
  };

  // Calculate total price
  const totalPrice = selectedTests.reduce((sum, test) => sum + test.price, 0);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName || !patientAge || selectedTests.length === 0) {
      alert('Please fill in patient details and add at least one test');
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
      tests: selectedTests,
      date: initialReport ? initialReport.date : new Date().toISOString().split('T')[0],
      status: status,
      collectedBy: initialReport ? initialReport.collectedBy : 'Lab Technician',
      totalPrice: totalPrice
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
              {initialReport ? 'Update patient details and test results' : 'Enter patient details and add multiple tests'}
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

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Report Status</Label>
              <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedTests.length > 0 && (
              <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg border">
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Charges</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹ {totalPrice}</p>
              </div>
            )}
          </div>
        </div>

        {/* Selected Tests Card */}
        {selectedTests.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Selected Tests ({selectedTests.length})
            </h2>

            <div className="space-y-3">
              {selectedTests.map((test, idx) => (
                <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {idx + 1}. {test.testType}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {test.testResults.length} parameters • ₹{test.price}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveTest(test.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Test Section */}
        {!currentTest ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <Button
              type="button"
              onClick={handleStartAddTest}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Test
            </Button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Test</h2>

            {/* Test Selection */}
            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="testType">Select Test Type *</Label>
                <Select
                  value={currentTest.selectedTemplate?.id || ''}
                  onValueChange={handleTestSelect}
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

              {currentTest.selectedTemplate && (
                <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg border">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Test Charges</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">₹ {currentTest.selectedTemplate.price}</p>
                </div>
              )}
            </div>

            {/* Test Parameters */}
            {currentTest.selectedTemplate && (
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Test Results: {currentTest.selectedTemplate.name}
                </h3>
                
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
                      {currentTest.selectedTemplate.parameters.map(param => (
                        <tr key={param.id} className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                            {param.testName}
                          </td>
                          <td className="py-3 px-4">
                            <Input
                              type="text"
                              placeholder={status === 'Pending' ? '---' : 'Enter value'}
                              value={currentTest.results[param.id] || ''}
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

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={handleAddTest}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add This Test
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelAddTest}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}