import React, { useState, useRef } from 'react';
import { Camera, Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';

interface FileUploadProps {
  onFileUploaded?: (url: string, type: 'photo' | 'prescription') => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  buttonText: string;
  buttonIcon: 'camera' | 'upload';
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUploaded,
  acceptedTypes = "image/*,.pdf",
  maxSize = 10,
  buttonText,
  buttonIcon,
  className = ""
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{url: string, name: string, type: string}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: `File size must be less than ${maxSize}MB`,
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);

    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('Farmers Dashboard')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        throw error;
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('Farmers Dashboard')
        .getPublicUrl(filePath);

      const fileUrl = urlData.publicUrl;
      const uploadType = file.type.startsWith('image/') ? 'photo' : 'prescription';

      // Add to uploaded files list
      setUploadedFiles(prev => [...prev, {
        url: fileUrl,
        name: file.name,
        type: file.type
      }]);

      // Call the callback with file URL
      onFileUploaded?.(fileUrl, uploadType);

      toast({
        title: 'File uploaded successfully',
        description: `${file.name} has been uploaded and saved`,
        variant: 'default'
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: 'Failed to upload file. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return '📷';
    if (type === 'application/pdf') return '📄';
    return '📎';
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileChange}
        className="hidden"
      />
      
      <Button 
        type="button" 
        variant="outline" 
        className="gap-2"
        onClick={handleFileSelect}
        disabled={uploading}
      >
        {buttonIcon === 'camera' ? <Camera className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
        {uploading ? 'Uploading...' : buttonText}
      </Button>

      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Uploaded Files:</h4>
          {uploadedFiles.map((file, index) => (
            <Card key={index} className="p-2">
              <CardContent className="p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getFileIcon(file.type)}</span>
                    <div>
                      <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                      <a 
                        href={file.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        View file
                      </a>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};