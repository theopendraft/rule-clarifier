"use client";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Header } from "../../../components/layout/Header";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Download } from "lucide-react";
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

const ChapterDetailPage = () => {
  const params = useParams();
  const chapterId = parseInt(params.id as string);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRule, setSelectedRule] = useState<string | null>(null);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/rule-books');
        const data = await response.json();
        
        if (data && data.length > 0) {
          // Use same deduplication logic as Home component
          const allChapters = data.flatMap(book => book.chapters || []);
          const uniqueChapters = allChapters.reduce((acc, chapter) => {
            const existing = acc.find(c => c.number === chapter.number);
            if (!existing || chapter.rules.length > existing.rules.length) {
              acc = acc.filter(c => c.number !== chapter.number);
              acc.push(chapter);
            }
            return acc;
          }, [] as Chapter[]);
          
          const foundChapter = uniqueChapters.find(ch => ch.number === chapterId);
          setChapter(foundChapter || null);
          if (foundChapter && foundChapter.rules.length > 0) {
            setSelectedRule(foundChapter.rules[0].number);
          }
        }
      } catch (error) {
        console.error('Error fetching chapter:', error);
        toast.error('Failed to load chapter data');
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [chapterId]);

  const scrollToRule = (ruleId: string) => {
    const element = document.getElementById(`rule-${ruleId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadChapter = async () => {
    if (!chapter) return;
    
    try {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Chapter ${chapter.number}: ${chapter.title}</title>
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
            <div class="chapter-title">CHAPTER ${chapter.number}</div>
            <div class="chapter-subtitle">${chapter.title.toUpperCase()}</div>
            ${chapter.section ? `<div>${chapter.section}</div>` : ''}
          </div>
          ${chapter.rules.map(rule => `
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
      
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: htmlContent,
          filename: `Chapter_${chapter.number}_${chapter.title.replace(/\s+/g, '_')}.pdf`
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Chapter_${chapter.number}_${chapter.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success(`Downloaded Chapter ${chapter.number}: ${chapter.title} as PDF`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading chapter...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Chapter Not Found</h1>
            <p className="text-muted-foreground">Chapter {chapterId} is not available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Chapter Info */}
      <div className="bg-slate-100 border-b border-slate-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-sm font-medium text-slate-700">
              Chapter {chapter.number}: {chapter.title}
            </h3>
            <span className="text-xs text-slate-500">
              {chapter.rules.length} rules
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
        {/* Sidebar - Only Rules */}
        <div className="w-80 bg-slate-50 border-r border-slate-200 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium text-slate-800">Chapter {chapter.number}</div>
                <div className="text-sm text-slate-600">{chapter.title}</div>
              </div>
            </div>
            <div className="space-y-1">
              {chapter.rules.map((rule) => (
                <Button
                  key={rule.id}
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start text-left text-xs p-3 ${
                    selectedRule === rule.number
                      ? "bg-blue-600 text-white"
                      : "text-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={() => {
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
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">
                CHAPTER {chapter.number}
              </h1>
              <h2 className="text-2xl font-semibold text-slate-700 mb-6">
                {chapter.title.toUpperCase()}
              </h2>
              {chapter.section && (
                <h3 className="text-lg text-slate-600">
                  {chapter.section}
                </h3>
              )}
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {chapter.rules.map((rule) => (
                  <div key={rule.id} id={`rule-${rule.number}`} className="scroll-mt-8">
                    <div className="flex items-start space-x-4">
                      <span className="text-blue-600 font-bold text-lg">{rule.number}.</span>
                      <div className="flex-1">
                        <div className="mb-4">
                          <h4 className="text-lg font-semibold text-slate-800">{rule.title}:-</h4>
                        </div>
                        <div className="text-slate-700 leading-relaxed">
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

export default ChapterDetailPage;