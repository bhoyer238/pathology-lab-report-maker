import type{ Report } from '../types';
import { LabBranding } from './LabBranding';
import { ArrowUp, ArrowDown, Check } from 'lucide-react';

interface PDFPreviewProps {
  report: Report;
}

export function PDFPreview({ report }: PDFPreviewProps) {
  const patient = report.patient;
  const hasAbnormalResults = (report.tests || []).some(test => 
    test.testResults.some(result => result.isAbnormal)
  );
  
  return (
    <div className="bg-white text-gray-900 p-8 max-w-4xl mx-auto">
      <LabBranding variant="header" />
      
      {/* Patient Information */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
        <h2 className="text-lg font-bold text-blue-900 mb-3">Patient Information</h2>
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Patient Name</p>
            <p className="font-semibold">{patient.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Patient ID</p>
            <p className="font-semibold">{patient.patientId}</p>
          </div>
          <div>
            <p className="text-gray-600">Age / Gender</p>
            <p className="font-semibold">{patient.age} yrs / {patient.gender}</p>
          </div>
          <div>
            <p className="text-gray-600">Report Date</p>
            <p className="font-semibold">{report.date}</p>
          </div>
        </div>
      </div>

      {/* Report Status */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            report.status === 'Completed' 
              ? 'bg-green-100 text-green-800' 
              : report.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {report.status}
          </span>
        </div>
      </div>

      {/* Test Groups */}
      {(report.tests || []).map((testGroup, testIdx) => (
        <div key={testGroup.id} className="mb-8">
          {/* Test Information */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {testIdx + 1}. {testGroup.testType}
            </h2>
          </div>

          {/* Test Results Table */}
          <div className="mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Test Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold">Result</th>
                  <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold">Unit</th>
                  <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold">Normal Range</th>
                  <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold">Flag</th>
                </tr>
              </thead>
              <tbody>
                {testGroup.testResults.map((result, index) => (
                  <tr 
                    key={result.id} 
                    className={result.isAbnormal ? 'bg-red-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="border border-gray-300 px-4 py-2 text-sm">{result.testName}</td>
                    <td className={`border border-gray-300 px-4 py-2 text-sm text-center font-semibold ${
                      result.isAbnormal ? 'text-red-700' : 'text-gray-900'
                    }`}>
                      {result.value}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{result.unit}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{result.normalRange}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {result.isAbnormal ? (
                        result.flag === 'high' ? (
                          <ArrowUp className="w-5 h-5 text-red-600 mx-auto" />
                        ) : (
                          <ArrowDown className="w-5 h-5 text-red-600 mx-auto" />
                        )
                      ) : (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Notes Section */}
      {hasAbnormalResults && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Some values are outside the normal reference range. 
            Please consult with your healthcare provider for interpretation.
          </p>
        </div>
      )}
       
      <LabBranding variant="footer" />
    </div>
  );
}