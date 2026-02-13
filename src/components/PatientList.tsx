import { useState } from 'react';
import type { Report } from '../types';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import {
  Search,
  Edit,
  Trash2,
  FileText,
  Calendar,
  CheckCircle,
  Clock
} from 'lucide-react';

interface PatientListProps {
  reports: Report[];
  onSelectReport: (report: Report) => void;
  onEditReport: (report: Report) => void;
  onDeleteReport: (id: string) => void;
}

export function PatientList({
  reports,
  onSelectReport,
  onEditReport,
  onDeleteReport
}: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Completed' | 'Pending'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5; // Pagination Value can be change hear.


  const filteredReports = reports.filter(report => {
    const matchesSearch =
      report.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.tests || []).some(test => test.testType.toLowerCase().includes(searchTerm.toLowerCase())) ||
      report.patient.patientId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'All' || report.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const indexOfLast = currentPage * reportsPerPage;
  const indexOfFirst = indexOfLast - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirst, indexOfLast);


  const getStatusBadge = (status: string) => {
    if (status === 'Completed') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <CheckCircle className="w-3 h-3" />
          Completed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
        <Clock className="w-3 h-3" />
        Pending
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Reports</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and view all pathology reports
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total Reports: <span className="font-semibold text-gray-900 dark:text-white">{reports.length}</span>
        </div>
      </div>
      <div className="text-sm font-semibold text-green-600">
        Total Revenue: ₹ {reports.reduce((sum, r) => sum + r.totalPrice, 0)}
      </div>


      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name, test type, or ID..."
              value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select value={filterStatus}
              //  onValueChange={(v: any) => setFilterStatus(v)}
              onValueChange={(v: any) => {
                setFilterStatus(v);
                setCurrentPage(1);
              }}

            >
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Patient
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Test Type
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500 dark:text-gray-400">
                    No reports found matching your criteria.
                  </td>
                </tr>
              ) : (
                currentReports.map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group"
                  >
                    <td
                      className="py-4 px-6"
                      onClick={() => onSelectReport(report)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {report.patient.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {report.patient.patientId} • {report.patient.age}y • {report.patient.gender}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300"
                      onClick={() => onSelectReport(report)}
                    >
                      <div className="flex flex-col gap-1">
                        {(report.tests || []).map((test, idx) => (
                          <span key={test.id} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded inline-block w-fit">
                            {idx + 1}. {test.testType}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td
                      className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300"
                      onClick={() => onSelectReport(report)}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {report.date}
                      </div>
                    </td>
                    <td
                      className="py-4 px-6"
                      onClick={() => onSelectReport(report)}
                    >
                      {getStatusBadge(report.status)}
                    </td>
                    <td
                      className="py-4 px-6 text-sm font-semibold text-blue-600 dark:text-blue-400"
                      onClick={() => onSelectReport(report)}
                    >
                      ₹ {report.totalPrice}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditReport(report);
                          }}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Are you sure you want to delete this report?')) {
                              onDeleteReport(report.id);
                            }
                          }}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-4">

          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </Button>

          <span className="text-sm text-gray-600 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </Button>

        </div>
      )}

    </div>
  );
}