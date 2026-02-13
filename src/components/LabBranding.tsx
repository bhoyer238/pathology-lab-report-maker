import { Calendar, Phone, Mail, MapPin } from 'lucide-react';

interface LabBrandingProps {
  variant?: 'header' | 'footer';
}

export function LabBranding({ variant = 'header' }: LabBrandingProps) {
  if (variant === 'header') {
    return (
      <div className="border-b-2 border-blue-600 pb-4 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">PL</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PathoReport Labs</h1>
              <p className="text-sm text-gray-600">Advanced Diagnostic Services</p>
            </div>
          </div>
          <div className="text-right text-sm text-gray-600">
            <div className="flex items-center justify-end gap-1 mb-1">
              <Phone className="w-4 h-4" />
              <span>+91 8380081786</span>
            </div>
            <div className="flex items-center justify-end gap-1 mb-1">
              <Mail className="w-4 h-4" />
              <span>bhoyer238@gmail.com</span>
            </div>
            <div className="flex items-center justify-end gap-1">
              <MapPin className="w-4 h-4" />
              <span>123 Medical Center Dr, vishal 100</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t-2 border-blue-600 pt-4 mt-8">
      <div className="flex justify-between items-center text-xs text-gray-600">
        <div className="max-w-md">
          <p className="font-semibold mb-1">Disclaimer:</p>
          <p>
            This report is for informational purposes only. Please consult with your healthcare provider 
            for interpretation of these results. Laboratory values may vary based on testing methodology 
            and patient factors.
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1 mb-1">
            <Calendar className="w-3 h-3" />
            <span>Report Generated: {new Date().toLocaleDateString()}</span>
          </div>
          <p className="font-semibold">PathoReport Labs © 2026</p>
          <p>CLIA Certified • CAP Accredited</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-300">
        <div className="flex justify-between items-end">
          <div className="text-sm">
            <p className="text-gray-600">Collected By:</p>
            <p className="font-semibold">Dr. Vishal Shevre, MD</p>
          </div>
          <div className="text-sm text-right">
            <p className="text-gray-600">Verified By:</p>
            <p className="font-semibold">Dr. Amit Gavit, MD, PhD</p>
            <p className="text-xs text-gray-500">Pathologist</p>
          </div>
        </div>
      </div>
    </div>
  );
}