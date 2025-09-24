'use client';

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { LinkDialog } from "@/components/ui/link-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ChevronRight, ChevronDown, Edit3, Download, Save, X, Link, FileText, Upload } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "../../../lib/uploadthing";

// Types for database data
interface Rule {
  id: string;
  number: string;
  title: string;
  content: string;
  order: number;
}

interface Chapter {
  id: string;
  number: number;
  title: string;
  section?: string;
  rules: Rule[];
}

interface Manual {
  id: string;
  code: string;
  title: string;
  description?: string;
}

interface Circular {
  id: string;
  code: string;
  title: string;
  description?: string;
  number?: string;
}

interface HomeProps {
  initialChapter?: number;
}

const Home = ({ initialChapter }: HomeProps = {}) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState(initialChapter || 4);
  const [selectedRule, setSelectedRule] = useState("4.01");
  const [expandedChapters, setExpandedChapters] = useState<number[]>([initialChapter || 4]);
  const [editingRule, setEditingRule] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [supportingDoc, setSupportingDoc] = useState("");
  const [changeReason, setChangeReason] = useState("");
  const [docType, setDocType] = useState<"upload" | "text">("upload");
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number; url: string } | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number; url: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedText, setSelectedText] = useState("");
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkType, setLinkType] = useState<"manual" | "circular" | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch chapters with rules from all rule books
        const chaptersResponse = await fetch('/api/rule-books');
        const chaptersData = await chaptersResponse.json();
        
        if (chaptersData && chaptersData.length > 0) {
          // Combine all chapters from all rule books, remove duplicates (keep one with most rules), and sort
          const allChapters = chaptersData.flatMap(book => book.chapters || []);
          const uniqueChapters = allChapters.reduce((acc, chapter) => {
            const existing = acc.find(c => c.number === chapter.number);
            if (!existing || chapter.rules.length > existing.rules.length) {
              acc = acc.filter(c => c.number !== chapter.number);
              acc.push(chapter);
            }
            return acc;
          }, [] as Chapter[]);
          setChapters(uniqueChapters.sort((a, b) => a.number - b.number));
        }

        // Fetch manuals
        const manualsResponse = await fetch('/api/manuals');
        const manualsData = await manualsResponse.json();
        setManuals(manualsData || []);

        // Fetch circulars
        const circularsResponse = await fetch('/api/circulars');
        const circularsData = await circularsResponse.json();
        setCirculars(circularsData || []);

      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data from database');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRuleContent = (ruleId: string) => {
    // Find the rule in the current chapters data
    const rule = chapters.find(ch => ch.rules.some(r => r.number === ruleId))?.rules.find(r => r.number === ruleId);
    return rule?.content || `Rule content not found for ${ruleId}`;
  };
  const currentChapter = chapters.find(ch => ch.number === selectedChapter);
  const currentRule = currentChapter?.rules.find(rule => rule.number === selectedRule);


  const handleDownloadChapter = async () => {
    if (!currentChapter) return;
    
    try {
      // Create HTML content for PDF generation
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Chapter ${selectedChapter}: ${currentChapter.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 40px; }
            .chapter-title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .chapter-subtitle { font-size: 18px; color: #666; }
            .rule { margin-bottom: 30px; page-break-inside: avoid; }
            .rule-number { color: #2563eb; font-weight: bold; }
            .rule-title { font-size: 16px; font-weight: bold; margin-bottom: 10px; }
            .rule-content { margin-left: 20px; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="chapter-title">CHAPTER ${selectedChapter}</div>
            <div class="chapter-subtitle">${currentChapter.title.toUpperCase()}</div>
            ${currentChapter.section ? `<div>${currentChapter.section}</div>` : ''}
          </div>
          ${currentChapter.rules.map(rule => `
            <div class="rule">
              <div class="rule-title">
                <span class="rule-number">${rule.number}.</span> ${rule.title}:-
              </div>
              <div class="rule-content">${rule.content}</div>
            </div>
          `).join('')}
        </body>
        </html>
      `;
      
      // Send to API for PDF generation
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: htmlContent,
          filename: `Chapter_${selectedChapter}_${currentChapter.title.replace(/\s+/g, '_')}.pdf`
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Chapter_${selectedChapter}_${currentChapter.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success(`Downloaded Chapter ${selectedChapter}: ${currentChapter.title} as PDF`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('PDF generation failed. Downloading as HTML instead.');
      
      // Fallback to HTML download
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Chapter ${selectedChapter}: ${currentChapter.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 40px; }
            .chapter-title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .chapter-subtitle { font-size: 18px; color: #666; }
            .rule { margin-bottom: 30px; }
            .rule-number { color: #2563eb; font-weight: bold; }
            .rule-title { font-size: 16px; font-weight: bold; margin-bottom: 10px; }
            .rule-content { margin-left: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="chapter-title">CHAPTER ${selectedChapter}</div>
            <div class="chapter-subtitle">${currentChapter.title.toUpperCase()}</div>
          </div>
          ${currentChapter.rules.map(rule => `
            <div class="rule">
              <div class="rule-title">
                <span class="rule-number">${rule.number}.</span> ${rule.title}:-
              </div>
              <div class="rule-content">${rule.content}</div>
            </div>
          `).join('')}
        </body>
        </html>
      `;
      
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Chapter_${selectedChapter}_${currentChapter.title.replace(/\s+/g, '_')}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const selectChapter = (chapterNumber: number) => {
    setSelectedChapter(chapterNumber);
    if (!expandedChapters.includes(chapterNumber)) {
      setExpandedChapters(prev => [...prev, chapterNumber]);
    }
  };

  const scrollToRule = (ruleId: string) => {
    const element = document.getElementById(`rule-${ruleId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFileUpload = (res: { name: string; size: number; url: string }[]) => {
    console.log("Files: ", res);
    setUploadedFiles(res);
    if (res && res.length > 0) {
      setUploadedFile(res[0]);
      setSupportingDoc(res[0].url);
      toast.success(`File uploaded: ${res[0].name}`);
    }
  };

  const handleUploadError = (error: Error) => {
    console.error("Upload Error:", error);
    toast.error(`Upload failed: ${error.message}`);
    setIsUploading(false);
  };

  const handleUploadBegin = (name: string) => {
    console.log("Uploading:", name);
    setIsUploading(true);
  };

  const handleSaveRule = async () => {
    if (!editingRule) return;
    
    try {
      // Find the rule being edited
      const ruleToUpdate = chapters
        .find(ch => ch.rules.some(r => r.number === editingRule))
        ?.rules.find(r => r.number === editingRule);
      
      if (!ruleToUpdate) {
        toast.error('Rule not found');
        return;
      }

      // Update rule in database
      const response = await fetch(`/api/rules/${ruleToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          content: editedContent,
          supportingDoc,
          changeReason,
          docType,
          uploadedFile: uploadedFile ? { name: uploadedFile.name } : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`Failed to update rule: ${errorData.error || 'Unknown error'}`);
      }

      // Update local state
      setChapters(prevChapters => 
        prevChapters.map(chapter => ({
          ...chapter,
          rules: chapter.rules.map(rule => 
            rule.id === ruleToUpdate.id 
              ? { ...rule, title: editedTitle, content: editedContent }
              : rule
          )
        }))
      );

      // Reset edit state
      setEditingRule(null);
      setHasUnsavedChanges(false);
      setSupportingDoc("");
      setChangeReason("");
      setUploadedFile(null);
      setDocType("upload");
      
      toast.success('Rule updated successfully');
    } catch (error) {
      console.error('Error updating rule:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to update rule: ${errorMessage}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading railway rules...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <style jsx global>{`
        .select-text::selection {
          background-color: #3b82f6;
          color: white;
        }
        .select-text {
          user-select: text;
          -webkit-user-select: text;
          -moz-user-select: text;
          -ms-user-select: text;
        }
      `}</style>
      <Header />
      
      {/* Chapter Info */}
      <div className="bg-slate-100 border-b border-slate-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-sm font-medium text-slate-700">
              Chapter {selectedChapter}: {currentChapter?.title}
            </h3>
            <span className="text-xs text-slate-500">
              {currentChapter?.rules.length} rules
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadChapter}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <div className="w-80 bg-slate-50 border-r border-slate-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Chapters</h2>
            <div className="space-y-1">
              {chapters.map((chapter) => (
                <div key={chapter.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left h-auto p-3 ${
                      selectedChapter === chapter.number 
                        ? "bg-blue-50 text-blue-700" 
                        : "hover:bg-slate-100"
                    }`}
                    onClick={() => {
                      if (selectedChapter === chapter.number) {
                        toggleChapter(chapter.number);
                      } else {
                        setExpandedChapters([chapter.number]);
                        setSelectedChapter(chapter.number);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <BookOpen className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">Chapter {chapter.number}</div>
                        <div className="text-xs opacity-80 truncate">{chapter.title}</div>
                      </div>
                      {expandedChapters.includes(chapter.number) ? (
                        <ChevronDown className="h-4 w-4 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 flex-shrink-0" />
                      )}
                    </div>
                  </Button>
                  
                  {expandedChapters.includes(chapter.number) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {chapter.rules.map((rule) => (
                        <Button
                          key={rule.id}
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-start text-left text-xs p-2 ${
                            selectedRule === rule.number && selectedChapter === chapter.number
                              ? "bg-blue-600 text-white"
                              : "text-blue-600 hover:bg-blue-50"
                          }`}
                          onClick={() => {
                            selectChapter(chapter.number);
                            setTimeout(() => scrollToRule(rule.number), 100);
                          }}
                        >
                          <span className="font-medium mr-2">{rule.number}</span>
                          <span className="truncate">{rule.title}</span>
                          <ChevronRight className="h-3 w-3 ml-auto flex-shrink-0" />
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="text-center mb-8">
              <p className="text-sm text-blue-600 font-medium mb-2">
                {currentChapter?.title.toUpperCase()}
              </p>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">
                CHAPTER {selectedChapter}
              </h1>
              <h2 className="text-2xl font-semibold text-slate-700 mb-6">
                {currentChapter?.title.toUpperCase()}
              </h2>
              {currentChapter?.section && (
                <h3 className="text-lg text-slate-600">
                  {currentChapter.section}
                </h3>
              )}
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {currentChapter?.rules.map((rule) => (
                  <div key={rule.id} id={`rule-${rule.number}`} className="scroll-mt-8">
                    <div className="flex items-start space-x-4">
                      <span className="text-blue-600 font-bold text-lg">{rule.number}.</span>
                      <div className="flex-1">
                        <div className="mb-4">
                          {editingRule === rule.number ? (
                            <div className="space-y-4">
                              {/* Action Buttons at Top */}
                              <div className="flex justify-end items-center mb-4">
                                
                                <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    if (hasUnsavedChanges) {
                                      setShowSaveDialog(true);
                                    } else {
                                      toast.error("No changes to save");
                                    }
                                  }}
                                  className="text-green-600 hover:text-green-800"
                                  disabled={!hasUnsavedChanges}
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    toast.info(`Cancelled editing rule ${rule.number}`);
                                    setEditingRule(null);
                                  }}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Cancel
                                </Button>
                                </div>
                              </div>
                              
                              {/* Edit Form */}
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">Rule Title</label>
                                  <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600">
                                    {editedTitle}
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">Rule Content</label>
                                  <RichTextEditor
                                    key={`editor-${rule.id}`}
                                    content={editedContent}
                                    onChange={(content) => {
                                      setEditedContent(content);
                                      setHasUnsavedChanges(true);
                                    }}
                                    onSelectionChange={(selection) => {
                                      if (selection) {
                                        setSelectedText(selection);
                                      }
                                    }}
                                    className="min-h-[200px]"
                                    readOnly={true}
                                    link={true}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-slate-800">{rule.title}:-</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingRule(rule.number);
                                  setEditedTitle(rule.title);
                                  setEditedContent(rule.content);
                                  setHasUnsavedChanges(false);
                                  toast.info(`Editing rule ${rule.number}: ${rule.title}`);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                        {editingRule !== rule.number && (
                          <div className="space-y-4">

                            <div ref={contentRef} className="text-slate-700 leading-relaxed select-text" 
                              onMouseUp={() => {
                                const selection = window.getSelection();
                                if (selection && selection.toString().trim()) {
                                  setSelectedText(selection.toString());
                                }
                              }}
                              style={{ userSelect: 'text' }}
                            >
                              <div 
                                className="prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: rule.content }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Save Changes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Supporting Document</label>
              <Tabs value={docType} onValueChange={(value) => setDocType(value as "upload" | "text")} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload File
                  </TabsTrigger>
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Write Text
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="mt-4">
                  <div className="space-y-4">
                    {uploadedFiles.length === 0 ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <div className="space-y-4">
                          <FileText className="h-12 w-12 text-gray-400 mx-auto" />
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                              Upload Supporting Document
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                              Select a file to upload as supporting documentation
                            </p>
                            <UploadButton<OurFileRouter, "pdfUploader">
                              endpoint="pdfUploader"
                              onClientUploadComplete={handleFileUpload}
                              onUploadError={handleUploadError}
                              onUploadBegin={handleUploadBegin}
                              appearance={{
                                button: "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium",
                                allowedContent: "text-xs text-muted-foreground mt-2"
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-green-800">{file.name}</span>
                              <span className="text-xs text-green-600">({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setUploadedFiles([]);
                                setUploadedFile(null);
                                setSupportingDoc("");
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="text" className="mt-4">
                  <Input
                    value={supportingDoc}
                    onChange={(e) => setSupportingDoc(e.target.value)}
                    placeholder="Enter document reference (e.g., Circular No. 2024/01)"
                  />
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reason for Change</label>
              <Textarea
                value={changeReason}
                onChange={(e) => setChangeReason(e.target.value)}
                placeholder="Describe the reason for this change..."
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={async () => {
                  if (supportingDoc && changeReason) {
                    await handleSaveRule();
                    setShowSaveDialog(false);
                  } else {
                    toast.error("Please provide both supporting document and reason");
                  }
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Link Dialog */}
      <LinkDialog
        isOpen={showLinkDialog}
        onClose={() => {
          setShowLinkDialog(false);
          setSelectedText("");
        }}
        onAddLink={(url) => {
          const linkHtml = `<a href="${url}" class="text-blue-600 underline hover:text-blue-800" target="_blank">${selectedText}</a>`;
          
          if (editingRule) {
            // Update edited content if in edit mode
            const updatedContent = editedContent.replace(selectedText, linkHtml);
            setEditedContent(updatedContent);
            setHasUnsavedChanges(true);
          } else {
            const currentRule = currentChapter?.rules.find(r => r.number === selectedRule);
            if (currentRule) {
              const updatedContent = currentRule.content.replace(selectedText, linkHtml);
              
              setChapters(prevChapters => 
                prevChapters.map(chapter => ({
                  ...chapter,
                  rules: chapter.rules.map(rule => 
                    rule.id === currentRule.id 
                      ? { ...rule, content: updatedContent }
                      : rule
                  )
                }))
              );
            }
          }
          
          toast.success(`Linked "${selectedText}" to ${url}`);
          setSelectedText("");
        }}
        selectedText={selectedText}
      />
    </div>
  );
};

export default Home;