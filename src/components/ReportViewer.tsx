// import { useState, useRef } from 'react';
// import type{ Report } from '../types';
// import { Button } from "./ui/button";
// import { ArrowLeft, Printer, Share2, Edit2, Download } from 'lucide-react';
// import { PDFPreview } from './PDFPreview';
// import { openWhatsApp } from '../utils/pdfUtils';


// interface ReportViewerProps {
//   report: Report;
//   onBack: () => void;
//   onEdit: () => void;
// }

// export function ReportViewer({ report, onBack, onEdit }: ReportViewerProps) {
//   const [showPreview, setShowPreview] = useState(false);
//   const reportRef = useRef<HTMLDivElement>(null);

//   const handlePrint = () => {
//     window.print();
//   };

//  const handleWhatsAppShare = () => {
//   openWhatsApp(report);
// };

//   return (
//     <div className="max-w-5xl mx-auto">
//       {/* Header Actions */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-3">
//           <Button onClick={onBack} variant="outline" size="icon">
//             <ArrowLeft className="w-4 h-4" />
//           </Button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Report Details</h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               {report.patient.name} - {report.testType}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button onClick={onEdit} variant="outline" className="gap-2">
//             <Edit2 className="w-4 h-4" />
//             Edit
//           </Button>
//           <Button onClick={handlePrint} variant="outline" className="gap-2">
//             <Printer className="w-4 h-4" />
//             Print
//           </Button>
//           <Button onClick={handleWhatsAppShare} className="bg-green-600 hover:bg-green-700 gap-2">
//             <Share2 className="w-4 h-4" />
//             WhatsApp
//           </Button>
//         </div>
//       </div>

//       {/* Report Card */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//         <div ref={reportRef}>
//           <PDFPreview report={report} />
//         </div>
//       </div>
//     </div>
//   );
// }


import { useRef } from 'react';
import type { Report } from '../types';
import { Button } from "./ui/button";
import { ArrowLeft, Printer, Share2, Edit2 } from 'lucide-react';
import { PDFPreview } from './PDFPreview';
import { openWhatsApp } from '../utils/pdfUtils';

interface ReportViewerProps {
  report: Report;
  onBack: () => void;
  onEdit: () => void;
}

export function ReportViewer({ report, onBack, onEdit }: ReportViewerProps) {
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    openWhatsApp(report);
  };

  return (
    <div className="max-w-5xl mx-auto">
      
      {/* Header Actions – print me hide */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <div className="flex items-center gap-3">
          <Button onClick={onBack} variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Report Details
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {report.patient.name} – {(report.tests || []).length} Test{(report.tests || []).length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={onEdit} variant="outline" className="gap-2">
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>

          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>

          <Button
            onClick={handleWhatsAppShare}
            className="bg-green-600 hover:bg-green-700 gap-2"
          >
            <Share2 className="w-4 h-4" />
            WhatsApp
          </Button>
        </div>
      </div>

      {/* Report Card – sirf ye print hoga */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div ref={reportRef} className="print-area">
          <PDFPreview report={report} />
        </div>
      </div>

    </div>
  );
}
