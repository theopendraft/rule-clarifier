'use client';

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, FileText, ChevronRight, BookOpen, ExternalLink } from "lucide-react";

const chapterData = {
  "1": {
    title: "General Rules",
    subtitle: "GENERAL RULES",
    section: "A. Basic Principles and Definitions",
    rules: [
      { id: "1.01", title: "General Principles", content: "These rules shall be observed by all railway servants and others concerned in the working of trains. They shall be read in conjunction with the relevant Acts, Rules, Regulations and Orders issued by the Government and the Railway Administration from time to time.\n\nEvery railway servant shall make himself thoroughly acquainted with these rules and shall be held responsible for their observance." }
    ]
  },
  "2": {
    title: "Signals",
    subtitle: "SIGNALS", 
    section: "A. General Principles of Signalling",
    rules: [
      { id: "2.01", title: "Object of signals", content: "The object of signals is to ensure safety in the working of trains by providing means of communication between those who are responsible for the movement of trains." }
    ]
  },
  "4": {
    title: "Working of Trains Generally",
    subtitle: "WORKING OF TRAINS GENERALLY",
    section: "A. Timing and Running of Trains", 
    rules: [
      { id: "4.01", title: "Standard time", content: "The working of trains between stations shall be regulated by the standard time prescribed by the Government of India." }
    ]
  }
};

interface Manual {
  id: string;
  code: string;
  title: string;
  description: string;
  version?: string;
  pdfUrl?: string;
  pdfFileName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Circular {
  id: string;
  code: string;
  title: string;
  description: string;
  number?: string;
  date?: string;
  pdfUrl?: string;
  pdfFileName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const ChapterView = () => {
  const { chapterId } = useParams();
  const router = useRouter();
  const [selectedText, setSelectedText] = useState("");
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [showDocumentDialog, setShowDocumentDialog] = useState(false);
  const [documentDetails, setDocumentDetails] = useState<Manual | Circular | null>(null);
  const [loadingDocument, setLoadingDocument] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const chapter = chapterData[chapterId as keyof typeof chapterData];

  useEffect(() => {
    fetchManuals();
    fetchCirculars();
  }, []);

  const fetchManuals = async () => {
    try {
      const response = await fetch('/api/manuals');
      if (response.ok) {
        const data = await response.json();
        setManuals(data);
      }
    } catch (error) {
      console.error('Error fetching manuals:', error);
    }
  };

  const fetchCirculars = async () => {
    try {
      const response = await fetch('/api/circulars');
      if (response.ok) {
        const data = await response.json();
        setCirculars(data);
      }
    } catch (error) {
      console.error('Error fetching circulars:', error);
    }
  };

  const fetchDocumentDetails = async (document: Manual | Circular) => {
    setLoadingDocument(true);
    try {
      const isManual = 'version' in document;
      const endpoint = isManual ? `/api/manuals/get?id=${document.id}` : `/api/circulars/get?id=${document.id}`;
      
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setDocumentDetails(data);
      }
    } catch (error) {
      console.error('Error fetching document details:', error);
    } finally {
      setLoadingDocument(false);
    }
  };

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    
    console.log('Text selection:', text);
    
    if (text && text.length > 3) {
      console.log('Setting selected text and showing dialog');
      setSelectedText(text);
      setShowLinkDialog(true);
    }
  }, []);

  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(handleTextSelection, 100);
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleTextSelection]);

  const handleDocumentClick = (document: Manual | Circular) => {
    console.log('Document clicked:', document);
    console.log('Current showPreview:', showPreview);
    console.log('Setting showPreview to true');
    setShowPreview(true);
    fetchDocumentDetails(document);
    console.log('After setting showPreview:', showPreview);
  };

  const handleLinkText = async () => {
    if (!documentDetails) return;
    
    try {
      const documentType = 'version' in documentDetails ? 'manual' : 'circular';
      
      await fetch('/api/text-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedText,
          documentId: documentDetails.id,
          documentType
        })
      });
      
      setShowLinkDialog(false);
      setShowPreview(false);
      setSelectedText("");
      setDocumentDetails(null);
    } catch (error) {
      console.error('Error linking text:', error);
    }
  };

  const handleBackToSelection = () => {
    setShowPreview(false);
    setDocumentDetails(null);
  };

  if (!chapter) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-6 px-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Chapter Not Found</h1>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const scrollToRule = (ruleId: string) => {
    const element = document.getElementById(`rule-${ruleId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 bg-muted/30 border-r border-border">
          <div className="p-4 border-b border-border">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.back()}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-lg">Chapter {chapterId}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{chapter.title}</p>
          </div>
          
          <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="space-y-1">
              {chapter.rules.map((rule) => (
                <button
                  key={rule.id}
                  onClick={() => scrollToRule(rule.id)}
                  className="w-full text-left p-3 rounded-lg transition-colors hover:bg-primary/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-primary">{rule.id}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">{rule.title}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-sm text-muted-foreground mb-2">{chapter.subtitle}</p>
                <h1 className="text-4xl font-bold text-foreground mb-4">CHAPTER {chapterId}</h1>
                <h2 className="text-2xl font-semibold text-muted-foreground mb-6">{chapter.subtitle}</h2>
                <h3 className="text-lg font-medium text-foreground">{chapter.section}</h3>
              </div>

              <div className="space-y-8">
                {chapter.rules.map((rule) => (
                  <div key={rule.id} id={`rule-${rule.id}`} className="group bg-white rounded-lg border border-border p-8 scroll-mt-8 hover:shadow-md transition-shadow">
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-primary mb-2">
                        {rule.id}. {rule.title}:-
                      </h4>
                    </div>
                    
                    <div 
                      className="prose prose-sm max-w-none selectable-content"
                      style={{ userSelect: 'text', cursor: 'text' }}
                    >
                      {rule.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-foreground leading-relaxed mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Link Selection Dialog */}
      {showLinkDialog && (
        <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="mb-2 p-2 bg-yellow-100 text-xs">
              Debug: showLinkDialog={showLinkDialog.toString()}, showPreview={showPreview.toString()}
            </div>
            {!showPreview ? (
              <>
                <DialogHeader>
                  <DialogTitle>Link Selected Text</DialogTitle>
                  <p className="text-sm text-muted-foreground">Selected: "{selectedText}"</p>
                  <p className="text-xs text-red-500">Debug: showPreview = {showPreview.toString()}</p>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Manuals</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {manuals.map((manual) => (
                        <Card key={manual.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleDocumentClick(manual)}>
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{manual.code}</p>
                                <p className="text-sm text-muted-foreground">{manual.title}</p>
                              </div>
                              <ExternalLink className="h-4 w-4" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Circulars</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {circulars.map((circular) => (
                        <Card key={circular.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleDocumentClick(circular)}>
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{circular.code}</p>
                                <p className="text-sm text-muted-foreground">{circular.title}</p>
                              </div>
                              <ExternalLink className="h-4 w-4" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {documentDetails?.code} - {documentDetails?.title}
                    </DialogTitle>
                    <Button variant="outline" size="sm" onClick={handleBackToSelection}>
                      ← Back to Selection
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Preview document before linking: "{selectedText}"</p>
                </DialogHeader>
                
                {loadingDocument ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : documentDetails ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {'version' in documentDetails && documentDetails.version && (
                        <Badge variant="outline">Version: {documentDetails.version}</Badge>
                      )}
                      {'number' in documentDetails && documentDetails.number && (
                        <Badge variant="outline">Number: {documentDetails.number}</Badge>
                      )}
                      {'date' in documentDetails && documentDetails.date && (
                        <Badge variant="outline">Date: {new Date(documentDetails.date).toLocaleDateString()}</Badge>
                      )}
                      <Badge variant={documentDetails.isActive ? "default" : "secondary"}>
                        {documentDetails.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    
                    {documentDetails.description && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Content</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div 
                            className="prose prose-sm max-w-none text-slate-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ 
                              __html: documentDetails.description
                                .replace(/&lt;/g, '<')
                                .replace(/&gt;/g, '>')
                                .replace(/&quot;/g, '"')
                                .replace(/&#39;/g, "'")
                                .replace(/&amp;/g, '&')
                            }} 
                          />
                        </CardContent>
                      </Card>
                    )}
                    
                    {documentDetails.pdfUrl && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Original PDF Document
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-slate-600" />
                              <span className="text-sm text-slate-600">
                                {documentDetails.pdfFileName || 'Original PDF'}
                              </span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(documentDetails.pdfUrl!, '_blank')}
                              className="flex items-center gap-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Open PDF
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="text-sm font-medium text-blue-900">Link selected text to this document?</p>
                        <p className="text-xs text-blue-700 mt-1">Selected: "{selectedText}"</p>
                      </div>
                      <Button onClick={handleLinkText} className="bg-blue-600 hover:bg-blue-700">
                        Link Text
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">Failed to load document details</p>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      )}


    </div>
  );
};

export default ChapterView;
