'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LinkDialog } from "@/components/ui/link-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chatbot } from "@/components/ui/chatbot";
import { BookOpen, ChevronRight, ChevronLeft, Menu, FileText, Upload, X, Download, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
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

const Home = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState(4);
  const [selectedRule, setSelectedRule] = useState("4.01");
  const [expandedChapters, setExpandedChapters] = useState<number[]>([4]);
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chapterButtonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [clickedWords, setClickedWords] = useState<Set<string>>(new Set());

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

  const currentChapter = chapters.find(ch => ch.number === selectedChapter);
  const currentRule = currentChapter?.rules.find(rule => rule.number === selectedRule);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollChapterNav = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
    const activeButton = chapterButtonRefs.current[selectedChapter];
    if (activeButton && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const buttonLeft = activeButton.offsetLeft;
      const buttonWidth = activeButton.offsetWidth;
      const containerWidth = container.clientWidth;
      const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
      container.scrollTo({ left: Math.max(0, scrollPosition), behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  }, [selectedChapter]);


  const handleDownloadChapter = () => {
    if (!currentChapter) return;
    
    const content = `
      <html>
        <head>
          <title>Chapter ${selectedChapter}: ${currentChapter.title}</title>
          <style>
            body { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; margin: 0; padding: 2rem; background: white; }
            .text-center { text-align: center; }
            .mb-8 { margin-bottom: 2rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .text-blue-600 { color: rgb(37 99 235); }
            .text-slate-800 { color: rgb(30 41 59); }
            .text-slate-700 { color: rgb(51 65 85); }
            .text-slate-600 { color: rgb(71 85 105); }
            .font-medium { font-weight: 500; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .max-w-4xl { max-width: 56rem; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .space-y-12 > * + * { margin-top: 3rem; }
            .space-y-4 > * + * { margin-top: 1rem; }
            .flex { display: flex; }
            .items-start { align-items: flex-start; }
            .space-x-4 > * + * { margin-left: 1rem; }
            .flex-1 { flex: 1 1 0%; }
            .leading-relaxed { line-height: 1.625; }
            .prose { color: rgb(51 65 85); line-height: 1.625; }
            .prose p { margin-bottom: 1rem; }
            .prose ul, .prose ol { margin-bottom: 1rem; padding-left: 1.5rem; }
            .prose li { margin-bottom: 0.5rem; }
            .scroll-mt-8 { scroll-margin-top: 2rem; }
          </style>
        </head>
        <body>
          <div class="text-center mb-8">
            <p class="text-sm text-blue-600 font-medium mb-2">
              ${currentChapter.title.toUpperCase()}
            </p>
            <h1 class="text-4xl font-bold text-slate-800 mb-4">
              CHAPTER ${selectedChapter}
            </h1>
            <h2 class="text-2xl font-semibold text-slate-700 mb-6">
              ${currentChapter.title.toUpperCase()}
            </h2>
            ${currentChapter.section ? `<h3 class="text-lg text-slate-600">${currentChapter.section}</h3>` : ''}
          </div>
          <div class="max-w-4xl mx-auto">
            <div class="space-y-12">
              ${currentChapter.rules.map(rule => `
                <div class="scroll-mt-8">
                  <div class="flex items-start space-x-4">
                    <div class="flex-1">
                      <div class="mb-4">
                        <h4 class="text-lg font-semibold text-slate-800"><span class="text-blue-600 font-bold">${rule.number}.</span> ${rule.title}:-</h4>
                      </div>
                      <div class="space-y-4 text-slate-700 leading-relaxed">
                        <div class="prose prose-sm max-w-none">${rule.content}</div>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </body>
      </html>
    `;
    
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Chapter_${selectedChapter}_${currentChapter.title.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`Downloaded Chapter ${selectedChapter}: ${currentChapter.title}`);
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading railway rules...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'GR&SR', id: 'grsr' },
    { label: 'Manuals', id: 'manuals' },
    { label: 'Circulars', id: 'circulars' },
    { label: 'Scenarios', id: 'scenarios' },
    { label: 'JPO', id: 'jpo' },
    { label: 'Admin?', id: 'admin' },
    { label: 'Change log', id: 'changelog' },
  ];

  const handleMenuClick = (id: string) => {
    if (id === 'grsr') {
      window.location.href = '/chapter';
    } else if (id === 'manuals') {
      window.location.href = '/manuals';
    } else if (id === 'circulars') {
      window.location.href = '/circulars';
    } else if (id === 'scenarios') {
      window.location.href = '/scenarios';
    } else if (id === 'jpo') {
      window.location.href = '/jpo';
    } else if (id === 'admin') {
      window.location.href = '/admin';
    } else if (id === 'changelog') {
      window.location.href = '/changelog';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-50 border-b border-blue-700">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M12 2L2 7v10c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7l-10-5z" fill="#1e40af" stroke="#1e40af" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-wide">Rail Rules</h1>
              <p className="text-xs text-blue-200">Indian Railways</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-700"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-blue-700">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[280px] sm:w-[350px] bg-white">
                <SheetHeader>
                  <SheetTitle className="text-lg font-semibold text-blue-900">Menu</SheetTitle>
                  <SheetDescription className="text-sm text-slate-600">
                    Navigate through different sections and features
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleMenuClick(item.id)}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-900 transition-colors font-medium"
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                  <Separator className="my-6" />
                  <div className="px-4 py-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-slate-600">Version 2.0.1</p>
                    <p className="text-xs text-slate-500 mt-1">Last updated: Nov 2025</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:block w-80 bg-white border-r border-slate-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">Chapters</h2>
            <div className="space-y-1">
              {chapters.map((chapter) => (
                <div key={chapter.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left h-auto p-3 rounded-md ${
                      selectedChapter === chapter.number 
                        ? "bg-blue-50 text-blue-700" 
                        : "hover:bg-slate-50"
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
                        <ChevronRight className="h-4 w-4 flex-shrink-0 rotate-90 transition-transform" />
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
                          className={`w-full justify-start text-left text-xs p-2 rounded ${
                            selectedRule === rule.number && selectedChapter === chapter.number
                              ? "bg-blue-600 text-white"
                              : "text-blue-600 hover:bg-blue-50"
                          }`}
                          onClick={() => {
                            selectChapter(chapter.number);
                            setSelectedRule(rule.number);
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

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pb-24">
          {currentChapter && (
            <div className="mb-12">
              {/* Chapter Header */}
              <div className="mb-8 bg-white rounded-xl p-8 shadow-md border border-slate-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <BookOpen className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-3">
                      Chapter {currentChapter.number}
                    </Badge>
                    <h1 className="text-3xl text-blue-900 mb-2">{currentChapter.title}</h1>
                    <p className="text-slate-600">
                      Official guidelines and regulations as per Indian Railway standards
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadChapter}
                    className="flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Chapter Rules */}
              <div className="space-y-6">
                {currentChapter.rules.map((rule) => (
                  <div key={rule.id} id={`rule-${rule.number}`} className="bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded text-sm font-medium">
                            Rule {rule.number}
                          </span>
                        </div>
                        {editingRule === rule.number ? (
                            <div className="space-y-4">
                              {/* Action Buttons at Top */}
                              <div className="flex justify-between items-center mb-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    if (selectedText) {
                                      setShowLinkDialog(true);
                                    } else {
                                      toast.error("Please select text first to add a link");
                                    }
                                  }}
                                  className="text-blue-600 hover:text-blue-800"
                                  disabled={!selectedText}
                                >
                                  <Link className="h-4 w-4 mr-2" />
                                  Add Link
                                </Button>
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
                                  <div 
                                    className="border rounded-md p-4 bg-gray-50 min-h-[200px] prose prose-sm max-w-none select-text"
                                    onMouseUp={() => {
                                      const selection = window.getSelection();
                                      if (selection && selection.toString().trim()) {
                                        setSelectedText(selection.toString());
                                      }
                                    }}
                                    style={{ userSelect: 'text' }}
                                    dangerouslySetInnerHTML={{ __html: editedContent }}
                                  />
                                </div>
                              </div>
                            </div>
                        ) : (
                          <div>
                            <h3 className="text-xl text-slate-900 mb-3">{rule.title}</h3>
                          </div>
                        )}
                        {editingRule !== rule.number && (
                          <div>
                            <div ref={contentRef} className="text-slate-700 leading-relaxed select-text" 
                              onClick={(e) => {
                                const target = e.target as HTMLElement;
                                if (target.classList.contains('changed-word')) {
                                  const wordId = target.getAttribute('data-word-id');
                                  const isLinked = target.closest('a') !== null;
                                  if (wordId) {
                                    setClickedWords(prev => new Set(prev).add(wordId));
                                    target.style.color = isLinked ? '#2563eb' : '#000000';
                                    target.style.fontWeight = 'normal';
                                  }
                                }
                              }}
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
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <p className="text-xs text-slate-500">
                            Last reviewed: October 2025 | Effective from: January 2025
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chapter Footer */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white">ℹ</span>
                  </div>
                  <div>
                    <h4 className="text-blue-900 mb-2">Important Note</h4>
                    <p className="text-sm text-slate-700">
                      These rules are subject to revision. Railway personnel must stay updated with the latest amendments 
                      and circulars issued by the Railway Board. For official clarifications, refer to the latest General Rules 
                      and Subsidiary Rules (GR&SR) document.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="max-w-md w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
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
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Home;