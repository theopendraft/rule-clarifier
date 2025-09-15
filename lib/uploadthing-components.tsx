'use client';

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "./uploadthing";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, AlertCircle, Edit3, Save, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

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

interface PDFUploadDropzoneProps {
  uploadType: string;
}

export function PDFUploadDropzone({ uploadType }: PDFUploadDropzoneProps) {
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
    setUploadButtonReady(true);
  }, []);

  const handleFileUpload = async (res: any) => {
    console.log('Upload complete:', res);
    clearMessages();
    
    if (res && res[0]) {
      const file = res[0];
      const pdfUrl = file.url || file.ufsUrl || file.appUrl;
      const newFile = {
        name: file.name,
        url: pdfUrl,
        size: file.size,
        type: file.type || 'application/pdf'
      };
      
      setUploadedFiles(prev => [...prev, newFile]);
      
      // Automatically extract text from PDF
      await extractTextFromPDF(pdfUrl);
    } else {
      setUploadError('No file was uploaded. Please try again.');
    }
    setIsUploading(false);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      setUploadError('Please select a valid PDF file');
      return;
    }

    setIsExtracting(true);
    setExtractionError(null);
    clearMessages();

    try {
      console.log('Processing selected PDF:', file.name);
      
      const newFile = {
        name: file.name,
        url: '#local',
        size: file.size,
        type: 'application/pdf'
      };
      
      setUploadedFiles([newFile]);
      
      // Read file as array buffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Send to API for extraction
      const response = await fetch('/api/extract-pdf-buffer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: arrayBuffer,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Extraction successful:', data);
      
      if (data.content) {
        setExtractedContent(data.content);
        setEditingContent(data.content.text || '');
        if (data.content.text && data.content.text.trim().length > 0) {
          setSuccessMessage(`PDF processed and text extracted successfully! Found ${data.content.text.length} characters from ${data.content.pages} pages.`);
        } else {
          setSuccessMessage('PDF processed successfully! The PDF appears to be image-based or encrypted. Please manually enter the content below.');
          setIsEditing(true);
        }
      } else {
        throw new Error('Failed to process PDF');
      }
    } catch (error) {
      console.error('Error processing PDF:', error);
      setExtractionError(`Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (extractedContent && uploadedFiles.length > 0) {
      try {
        const response = await fetch('/api/save-extracted-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: editingContent,
            uploadType,
            fileName: uploadedFiles[0].name,
            fileUrl: uploadedFiles[0].url,
            metadata: extractedContent.metadata
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save content');
        }

        setExtractedContent({
          ...extractedContent,
          text: editingContent
        });
        setSuccessMessage('Content saved successfully!');
      } catch (error) {
        setUploadError(`Failed to save content: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
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
    
    // Use sample railway content directly
    setTimeout(() => {
      const mockFile = {
        name: "railway-manual-sample.pdf",
        url: "#sample",
        size: 13264,
        type: "application/pdf"
      };
      
      setUploadedFiles([mockFile]);
      setIsUploading(false);
      
      // Set sample content directly
      const sampleContent = {
        text: `RAILWAY MANUAL - SECTION 4: SIGNAL OPERATIONS\n\n4.01 GENERAL PRINCIPLES OF SIGNALING\n\n(a) Signals are provided to ensure safe movement of trains by conveying information or instructions to the Loco Pilot regarding the condition of the line ahead.\n\n(b) All signals shall be placed on the left-hand side of the track in the direction of traffic, except where local conditions make this impracticable.\n\n(c) The normal aspect of all Stop signals is 'ON' (Red) which conveys 'STOP'.\n\n4.02 CLASSIFICATION OF SIGNALS\n\nSignals are classified as:\n(a) Fixed Signals - Signals fixed at definite locations\n(b) Hand Signals - Signals given by authorized railway servants\n(c) Detonating Signals - Explosive devices placed on rails\n\n4.03 SIGNAL ASPECTS AND MEANINGS\n\nRED: Stop - The train must not pass the signal\nYELLOW: Caution - Proceed with caution, be prepared to stop at next signal\nGREEN: All Clear - Proceed at normal speed`,
        pages: 2,
        metadata: {
          title: "Railway Manual - Signal Operations",
          author: "Railway Board",
          subject: "Signal Operations",
          creator: "Railway Authority",
          producer: "Railway Rule Clarifier",
          creationDate: new Date(),
          modificationDate: new Date(),
        }
      };
      
      setExtractedContent(sampleContent);
      setEditingContent(sampleContent.text);
      setSuccessMessage('Sample PDF content loaded successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Load sample railway manual content:</p>
          <Button onClick={handleTestUpload} disabled={isUploading || isExtracting} variant="default">
            Load Sample Content
          </Button>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">Select a PDF file to extract text:</p>
          <div className="flex justify-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="space-y-4">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500">Select PDF file to upload</p>
              </div>
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
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-white text-gray-900 p-6 rounded-lg border border-gray-300 shadow-sm overflow-x-auto" style={{color: '#000000'}}>
                  {extractedContent.text}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
