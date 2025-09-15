'use client';

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, ChevronDown, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

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

const UsersView = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState(4);
  const [expandedChapters, setExpandedChapters] = useState<number[]>([4]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const chaptersResponse = await fetch('/api/rule-books');
        const chaptersData = await chaptersResponse.json();
        
        if (chaptersData && chaptersData.length > 0) {
          const book = chaptersData[0];
          setChapters(book.chapters || []);
        }

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
      <Header />
      
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
                          className="w-full justify-start text-left text-xs p-2 text-blue-600 hover:bg-blue-50"
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
                          <h4 className="text-lg font-semibold text-slate-800">{rule.title}:-</h4>
                        </div>
                        <div className="space-y-4 text-slate-700 leading-relaxed">
                          <div 
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: rule.content }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersView;