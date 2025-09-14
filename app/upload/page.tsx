'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { PDFUploadDropzone } from '../../lib/uploadthing-components';
import { 
  Image, 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Info
} from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

interface UploadedFile {
  name: string;
  url: string;
  size: number;
  type: string;
}

export default function UploadPage() {
  const [allUploadedFiles, setAllUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileUpload = (files: UploadedFile[]) => {
    setAllUploadedFiles(prev => [...prev, ...files]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-5 w-5 text-blue-500" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText className="h-5 w-5 text-red-500" />;
    return <Upload className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">PDF Upload & Text Extraction</h1>
          <p className="text-muted-foreground">
            Upload PDF files to extract text content, edit with rich formatting, and save as supporting documents for rule changes.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  PDF Upload & Text Extraction
                </CardTitle>
                <CardDescription>
                  Upload PDF files up to 16MB. Text will be automatically extracted and can be edited with rich text formatting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PDFUploadDropzone />
              </CardContent>
            </Card>
          </div>

          {/* Upload Info & Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Upload Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">File Size Limits</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>PDF Files:</span>
                      <Badge variant="secondary">16MB max</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Supported Formats</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>• PDF files only</div>
                    <div>• Text extraction with OCR</div>
                    <div>• Rich text editing</div>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    PDF text will be automatically extracted and can be edited with rich formatting before saving as supporting documents.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Upload Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Upload Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Files:</span>
                    <Badge variant="outline">{allUploadedFiles.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Size:</span>
                    <Badge variant="outline">
                      {formatFileSize(allUploadedFiles.reduce((acc, file) => acc + file.size, 0))}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">PDFs:</span>
                    <Badge variant="outline">
                      {allUploadedFiles.filter(f => f.type.includes('pdf')).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Extracted:</span>
                    <Badge variant="outline">
                      {allUploadedFiles.filter(f => f.type.includes('pdf')).length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Uploads */}
        {allUploadedFiles.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Recent Uploads
              </CardTitle>
              <CardDescription>
                Files uploaded in this session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {allUploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(file.size)} • {file.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge variant="secondary">Uploaded</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
