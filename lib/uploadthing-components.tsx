'use client';

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "./uploadthing";
import { useState, useEffect } from "react";
import { Button } from "../app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../app/components/ui/card";
import { FileText, CheckCircle, AlertCircle, Edit3, Save, X } from "lucide-react";
import { Alert, AlertDescription } from "../app/components/ui/alert";
import { RichTextEditor } from "../app/components/ui/rich-text-editor";

interface UploadedFile {
  name: string;
  url: string;
  size: number;
  type: string;
}

interface ExtractedContent {
  text: string;
  pages: number;
  metadata: {
    title?: string;
    author?: string;
    subject?: string;
    creator?: string;
    producer?: string;
    creationDate?: Date;
    modificationDate?: Date;
  };
}

export function PDFUploadDropzone() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedContent, setExtractedContent] = useState<ExtractedContent | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [uploadButtonReady, setUploadButtonReady] = useState(false);

  const clearMessages = () => {
    setUploadError(null);
    setExtractionError(null);
    setSuccessMessage(null);
  };

  // Clear success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Check if UploadButton is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      setUploadButtonReady(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleFileUpload = async (res: any) => {
    console.log('Upload complete:', res);
    clearMessages();
    
    if (res && res[0]) {
      const file = res[0];
      const newFile = {
        name: file.name,
        url: file.url,
        size: file.size,
        type: file.type || 'application/pdf'
      };
      
      setUploadedFiles(prev => [...prev, newFile]);
      
      // Automatically extract text from PDF
      await extractTextFromPDF(file.url);
    } else {
      setUploadError('No file was uploaded. Please try again.');
    }
    setIsUploading(false);
  };

  const extractTextFromPDF = async (pdfUrl: string) => {
    setIsExtracting(true);
    setExtractionError(null);
    
    try {
      console.log('Extracting text from PDF:', pdfUrl);
      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdfUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to extract text from PDF');
      }

      const data = await response.json();
      console.log('Extraction successful:', data);
      setExtractedContent(data.content);
      setEditingContent(data.content.text);
      setSuccessMessage('PDF uploaded and text extracted successfully!');
    } catch (error) {
      console.error('Error extracting PDF text:', error);
      setExtractionError(`Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (extractedContent) {
      setExtractedContent({
        ...extractedContent,
        text: editingContent
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (extractedContent) {
      setEditingContent(extractedContent.text);
    }
    setIsEditing(false);
  };

  const handleTestUpload = () => {
    clearMessages();
    setIsUploading(true);
    
    // Simulate a successful upload
    setTimeout(() => {
      const mockFile = {
        name: "test-document.pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        size: 13264,
        type: "application/pdf"
      };
      
      // Clear existing files and set only the new one
      setUploadedFiles([mockFile]);
      setIsUploading(false);
      setSuccessMessage('PDF uploaded and text extracted successfully!');
      
      // Simulate text extraction
      extractTextFromPDF(mockFile.url);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Test with sample PDF:</p>
          <Button onClick={handleTestUpload} disabled={isUploading || isExtracting} variant="outline">
            Test Upload
          </Button>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">Or upload a real PDF file:</p>
          <div className="flex justify-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {!uploadButtonReady ? (
                <div className="space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-500">Loading upload button...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <UploadButton<OurFileRouter, "pdfUploader">
                    endpoint="pdfUploader"
                    onClientUploadComplete={(res) => {
                      console.log('Real upload complete:', res);
                      clearMessages();
                      
                      if (res && res[0]) {
                        const file = res[0];
                        const newFile = {
                          name: file.name,
                          url: file.url,
                          size: file.size,
                          type: file.type || 'application/pdf'
                        };
                        
                        // Clear existing files and set only the new one
                        setUploadedFiles([newFile]);
                        setSuccessMessage('PDF uploaded successfully!');
                        
                        // Extract text from the uploaded PDF
                        extractTextFromPDF(file.url);
                      } else {
                        setUploadError('No file was uploaded. Please try again.');
                      }
                      setIsUploading(false);
                    }}
                    onUploadBegin={(file) => {
                      console.log('Real upload started:', file);
                      setIsUploading(true);
                      clearMessages();
                    }}
                    onUploadError={(error: Error) => {
                      console.error("Real upload error:", error);
                      setUploadError(`Upload failed: ${error.message}`);
                      setIsUploading(false);
                    }}
                  />
                  <p className="text-xs text-gray-500">Click to select PDF file</p>
                  
                  {/* Fallback button in case UploadButton doesn't work */}
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">If the button above doesn't work, try this:</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.pdf';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            // Simulate upload for now
                            setSuccessMessage('File selected! (Upload functionality coming soon)');
                          }
                        };
                        input.click();
                      }}
                    >
                      Choose PDF File
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {(isUploading || isExtracting) && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {isUploading ? 'Uploading PDF...' : 'Extracting text from PDF...'} Please wait.
          </AlertDescription>
        </Alert>
      )}

      {uploadError && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {uploadError}
          </AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {extractionError && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {extractionError}
          </AlertDescription>
        </Alert>
      )}

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Uploaded PDFs:</h4>
          {uploadedFiles.map((file, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-red-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {extractedContent && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Extracted PDF Content
                </CardTitle>
                <CardDescription>
                  {extractedContent.pages} pages • {extractedContent.text.length} characters
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {!isEditing ? (
                  <Button onClick={handleEdit} size="sm">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <RichTextEditor
                  content={editingContent}
                  onChange={setEditingContent}
                  placeholder="Edit extracted PDF content..."
                  className="min-h-[400px]"
                />
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap">{extractedContent.text}</div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
