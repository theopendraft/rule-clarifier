'use client';

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "./uploadthing";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, CheckCircle, AlertCircle, Save, X, Loader2 } from "lucide-react";
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
  useHardcodedDescription?: boolean;
  hardcodedContent?: string;
}

export function PDFUploadDropzone({ uploadType, useHardcodedDescription = false, hardcodedContent = '' }: PDFUploadDropzoneProps) {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiProcessingStep, setAiProcessingStep] = useState(0);
  const [extractedContent, setExtractedContent] = useState<ExtractedContent | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const [documentTitle, setDocumentTitle] = useState<string>('');
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [uploadButtonReady, setUploadButtonReady] = useState(false);

  const aiProcessingSteps = [
    "Analyzing document structure...",
    "Extracting text content...",
    "Processing with AI algorithms...",
    "Optimizing content formatting...",
    "Generating rich text markup...",
    "Finalizing document processing..."
  ];

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

  // AI Processing effect
  useEffect(() => {
    if (isAiProcessing) {
      const interval = setInterval(() => {
        setAiProcessingStep(prev => (prev + 1) % aiProcessingSteps.length);
      }, 2000); // Change step every 2 seconds

      return () => clearInterval(interval);
    }
  }, [isAiProcessing, aiProcessingSteps.length]);

  const extractTextFromPDF = async (pdfUrl: string) => {
    setIsExtracting(true);
    setExtractionError(null);
    clearMessages();

    try {
      console.log('Extracting text from PDF URL:', pdfUrl);
      
      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdfUrl }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Extraction successful:', data);
      
      if (data.content) {
        setExtractedContent(data.content);
        
        // Process content to preserve line breaks and indentation
        const processContentForDisplay = (text: string) => {
          if (!text) return '';
          
          // Check if content has actual HTML tags
          const hasHtmlTags = /<[a-zA-Z][^>]*>/.test(text);
          
          if (hasHtmlTags) {
            return text; // Return HTML as-is
          }
          
          // For plain text, convert line breaks to HTML and preserve indentation
          return text
            .replace(/\r\n/g, '<br>') // Handle Windows line endings first
            .replace(/\n/g, '<br>')   // Handle Unix line endings
            .replace(/\r/g, '<br>')   // Handle Mac line endings
            .replace(/\s{2,}/g, (match) => {
              // Convert multiple spaces to non-breaking spaces for proper indentation
              return '&nbsp;'.repeat(match.length);
            })
            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;'); // Convert tabs to 4 spaces
        };
        
        const processedContent = processContentForDisplay(data.content.text || '');
        setEditingContent(processedContent);
        
        // Set default title from filename
        setDocumentTitle(uploadedFiles[0]?.name?.replace('.pdf', '') || '');
        
        if (data.content.text && data.content.text.trim().length > 0) {
          setSuccessMessage(`PDF processed and text extracted successfully! Found ${data.content.text.length} characters from ${data.content.pages} pages.`);
        } else {
          setSuccessMessage('PDF processed successfully! The PDF appears to be image-based or encrypted. Please manually enter the content below.');
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

  const handleFileUpload = async (res: any) => {
    console.log('Upload complete:', res);
    clearMessages();
    
    if (res && res[0]) {
      const file = res[0];
      const pdfUrl = file.ufsUrl || file.url || file.appUrl;
      const newFile = {
        name: file.name,
        url: pdfUrl,
        size: file.size,
        type: file.type || 'application/pdf'
      };
      
      setUploadedFiles([newFile]);
      setDocumentTitle(file.name.replace('.pdf', ''));
      
      if (useHardcodedDescription && hardcodedContent) {
        // Use hardcoded content instead of OCR
        const mockExtractedContent = {
          text: hardcodedContent,
          pages: 1,
          metadata: {
            title: file.name.replace('.pdf', ''),
            author: 'System Generated',
            subject: 'Hardcoded Content'
          }
        };
        
        setExtractedContent(mockExtractedContent);
        setEditingContent(hardcodedContent);
        setSuccessMessage('Hardcoded content loaded successfully! You can edit the content below before saving.');
      } else {
        // Start AI processing loader
        setIsAiProcessing(true);
        setAiProcessingStep(0);
        
        // Wait for minimum 10 seconds
        const minProcessingTime = 10000; // 10 seconds
        const startTime = Date.now();
        
        // Extract text from PDF
        await extractTextFromPDF(pdfUrl);
        
        // Calculate remaining time to reach 10 seconds minimum
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minProcessingTime - elapsedTime);
        
        // Wait for remaining time if needed
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }
        
        // Stop AI processing
        setIsAiProcessing(false);
      }
    } else {
      setUploadError('No file was uploaded. Please try again.');
    }
    setIsUploading(false);
  };


  const handleEdit = () => {
    console.log('Editing content:', editingContent);
  };

  const handleSave = async () => {
    if (documentTitle.trim() && editingContent.trim()) {
      setIsSaving(true);
      try {
        const response = await fetch('/api/save-extracted-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: editingContent,
            uploadType,
            fileName: uploadedFiles[0]?.name || 'document.pdf',
            fileUrl: uploadedFiles[0]?.url || null,
            metadata: extractedContent?.metadata || {},
            title: documentTitle.trim()
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to save content');
        }

        const result = await response.json();
        
        setSuccessMessage(`${result.message || 'Content saved successfully!'} Redirecting to ${uploadType}s page...`);
        
        // Show success message and redirect
        setTimeout(() => {
          const redirectPath = uploadType === 'manual' ? '/manuals' : '/circulars';
          router.push(redirectPath);
        }, 3000);
        
      } catch (error) {
        setUploadError(`Failed to save content: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setIsSaving(false);
      }
    }
  };

  const handleCancel = () => {
    // Reset all states to initial values
    setUploadedFiles([]);
    setExtractedContent(null);
    setEditingContent('');
    setDocumentTitle('');
    setExtractionError(null);
    setUploadError(null);
    setSuccessMessage(null);
    setIsUploading(false);
    setIsExtracting(false);
    setIsSaving(false);
    setIsAiProcessing(false);
    setAiProcessingStep(0);
  };


  return (
    <div className="space-y-6 relative">
      {/* Full Page Loader */}
      {isSaving && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-lg p-8 flex flex-col items-center space-y-4 shadow-2xl border border-white/20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">Saving Document</h3>
              <p className="text-sm text-gray-600 mt-1">
                Please wait while we save your {uploadType} to the database...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AI Processing Loader */}
      {isAiProcessing && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-lg p-8 flex flex-col items-center space-y-6 max-w-md mx-4 shadow-2xl border border-white/20">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 bg-blue-100 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Processing Document</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our advanced AI is analyzing and processing your PDF...
              </p>
              <div className="bg-gray-100 rounded-full h-2 w-full mb-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((aiProcessingStep + 1) / aiProcessingSteps.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-blue-600 font-medium animate-pulse">
                {aiProcessingSteps[aiProcessingStep]}
              </p>
            </div>
          </div>
        </div>
      )}
      {uploadedFiles.length === 0 && (
        <div>
          <div className="flex justify-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="space-y-4">
                <FileText className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Upload PDF Document
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {useHardcodedDescription 
                      ? `Upload a PDF file to use hardcoded content for your ${uploadType}`
                      : `Select a PDF file to extract text and create a ${uploadType}`
                    }
                  </p>
                  {uploadButtonReady && (
                    <UploadButton<OurFileRouter, "pdfUploader">
                      endpoint="pdfUploader"
                      onClientUploadComplete={handleFileUpload}
                      onUploadError={(error: Error) => {
                        setUploadError(`Upload failed: ${error.message}`);
                        setIsUploading(false);
                      }}
                      onUploadBegin={(name) => {
                        setIsUploading(true);
                        clearMessages();
                      }}
                      appearance={{
                        button: "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium",
                        allowedContent: "text-xs text-muted-foreground mt-2"
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
                <Button 
                  onClick={handleSave} 
                  size="sm" 
                  disabled={isSaving || !documentTitle.trim()}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm" disabled={isSaving}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="document-title">Document Title</Label>
                <Input
                  id="document-title"
                  type="text"
                  placeholder={`Enter ${uploadType} title...`}
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  disabled={isSaving}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  This will be the title of your {uploadType} document
                </p>
              </div>
              <RichTextEditor
                content={editingContent}
                onChange={setEditingContent}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
