
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResumeUploaderProps {
  onFileAccepted: (file: File) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onFileAccepted }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
      setUploadStatus('success');
      onFileAccepted(uploadedFile);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeFile = () => {
    setFile(null);
    setUploadStatus('idle');
  };

  return (
    <div className="w-full">
      {!file ? (
        <div 
          {...getRootProps()} 
          className={cn(
            "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
            isDragActive ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center py-4 space-y-2 text-sm text-muted-foreground">
            <Upload size={24} className={isDragActive ? "text-accent" : "text-muted-foreground"} />
            <p className="font-medium">
              {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
            </p>
            <p className="text-xs">
              PDF, DOC, or DOCX (5MB max)
            </p>
            <Button 
              type="button" 
              variant="secondary" 
              size="sm" 
              className="mt-2"
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('dropzone-input')?.click();
              }}
            >
              Select File
            </Button>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-accent/10 p-2 rounded">
                <FileText size={18} className="text-accent" />
              </div>
              <div className="text-sm">
                <p className="font-medium truncate max-w-[180px]">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {uploadStatus === 'success' && <CheckCircle size={16} className="text-green-500" />}
              {uploadStatus === 'error' && <AlertCircle size={16} className="text-red-500" />}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={removeFile}
              >
                <X size={16} />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
