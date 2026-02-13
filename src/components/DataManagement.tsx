import { useRef } from 'react';
import { Button } from '../components/ui/button';
import { Download, Upload } from 'lucide-react';

interface DataManagementProps {
  onBackup: () => void;
  onRestore: (file: File) => void;
}

export function DataManagement({ onBackup, onRestore }: DataManagementProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onRestore(file);
    }
    // Reset input so same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".json"
        onChange={handleFileChange}
      />
      
      <Button
        variant="outline"
        size="sm"
        onClick={onBackup}
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Backup</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleRestoreClick}
        className="gap-2"
      >
        <Upload className="w-4 h-4" />
        <span className="hidden sm:inline">Restore</span>
      </Button>
    </div>
  );
}