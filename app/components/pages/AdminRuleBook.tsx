'use client';

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  History, 
  Upload, 
  Save,
  X,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { toast } from "sonner";
import { useRuleBook } from "@/hooks/useRuleBook";

const AdminRuleBook = () => {
  const { ruleBook, loading, error, updateRule } = useRuleBook();
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);
  const [changeLogs, setChangeLogs] = useState<Record<string, unknown>[]>([]);
  const [expandedChapters, setExpandedChapters] = useState<number[]>([]);

  // Form states
  const [newChapter, setNewChapter] = useState({
    title: "",
    subtitle: "",
    section: "",
  });

  const [newRule, setNewRule] = useState({
    chapterId: "",
    number: "",
    title: "",
    content: "",
  });

  const [changeReason, setChangeReason] = useState("");

  useEffect(() => {
    if (ruleBook) {
      loadChangeLogs();
    }
  }, [ruleBook]);

  const loadChangeLogs = async () => {
    try {
      const response = await fetch('/api/change-logs');
      if (!response.ok) {
        console.error('Failed to fetch change logs');
        setChangeLogs([]);
        return;
      }
      const logs = await response.json();
      setChangeLogs(logs || []);
    } catch (error) {
      console.error("Error loading change logs:", error);
      setChangeLogs([]);
    }
  };

  const handleCreateChapter = async () => {
    if (!ruleBook || !newChapter.title.trim()) {
      toast.error("Please provide chapter title");
      return;
    }

    try {
      const nextChapterNumber = Math.max(...ruleBook.chapters.map(ch => ch.number)) + 1;
      
      const response = await fetch('/api/chapters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: ruleBook.id,
          number: nextChapterNumber,
          title: newChapter.title,
          subtitle: newChapter.subtitle,
          section: newChapter.section,
          userId: "admin-user-id",
          reason: changeReason || "New chapter created"
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create chapter');
      }

      toast.success("Chapter created successfully!");
      setNewChapter({ title: "", subtitle: "", section: "" });
      setChangeReason("");
      setShowCreateDialog(false);
      // Refresh data would go here
    } catch (error) {
      console.error("Error creating chapter:", error);
      toast.error("Failed to create chapter");
    }
  };

  const handleCreateRule = async () => {
    if (!newRule.chapterId || !newRule.number || !newRule.title || !newRule.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch('/api/rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterId: newRule.chapterId,
          number: newRule.number,
          title: newRule.title,
          content: newRule.content,
          userId: "admin-user-id",
          reason: changeReason || "New rule created"
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create rule');
      }

      toast.success("Rule created successfully!");
      setNewRule({ chapterId: "", number: "", title: "", content: "" });
      setChangeReason("");
      setShowEditDialog(false);
      // Refresh data would go here
    } catch (error) {
      console.error("Error creating rule:", error);
      toast.error("Failed to create rule");
    }
  };

  const toggleChapter = (chapterNumber: number) => {
    setExpandedChapters(prev => 
      prev.includes(chapterNumber) 
        ? prev.filter(id => id !== chapterNumber)
        : [...prev, chapterNumber]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto py-4 sm:py-6 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Rule Book Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage chapters, rules, and track changes
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button onClick={() => setShowCreateDialog(true)} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Chapter</span>
              <span className="sm:hidden">Chapter</span>
            </Button>
            <Button variant="outline" onClick={() => setShowEditDialog(true)} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Rule</span>
              <span className="sm:hidden">Rule</span>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="chapters">Chapters & Rules</TabsTrigger>
            <TabsTrigger value="logs">Change Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Rule Book Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ruleBook ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-lg">{ruleBook.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{ruleBook.description}</p>
                      <Badge variant="outline">Version {ruleBook.version}</Badge>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">Total Chapters</h4>
                      <p className="text-2xl font-bold text-primary">{ruleBook.chapters.length}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">Total Rules</h4>
                      <p className="text-2xl font-bold text-primary">
                        {ruleBook.chapters.reduce((acc, ch) => acc + ch.rules.length, 0)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No rule book data available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chapters" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Chapters & Rules</CardTitle>
              </CardHeader>
              <CardContent>
                {ruleBook?.chapters.map((chapter) => (
                  <div key={chapter.id} className="mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 border rounded-lg">
                      <div className="flex items-start sm:items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleChapter(chapter.number)}
                          className="flex-shrink-0"
                        >
                          {expandedChapters.includes(chapter.number) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base font-semibold break-words">Chapter {chapter.number}: {chapter.title}</h3>
                          {chapter.subtitle && (
                            <p className="text-xs sm:text-sm text-muted-foreground break-words">{chapter.subtitle}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 flex-shrink-0">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {expandedChapters.includes(chapter.number) && (
                      <div className="ml-4 sm:ml-8 mt-4 space-y-2">
                        {chapter.rules.map((rule) => (
                          <div key={rule.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 bg-muted/50 rounded-lg">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm sm:text-base font-medium break-words">{rule.number}: {rule.title}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                                {rule.content.substring(0, 100)}...
                              </p>
                            </div>
                            <div className="flex space-x-2 flex-shrink-0">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="h-5 w-5" />
                  <span>Change Logs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {changeLogs.map((log) => (
                    <div key={log.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{log.action}</Badge>
                          <Badge variant="secondary">{log.entityType}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(log.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        By: {log.user?.name || log.user?.email || 'Unknown'}
                      </p>
                      {log.reason && (
                        <p className="text-sm">{log.reason}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Chapter Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-md w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Chapter</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Chapter Title *</label>
              <Input
                value={newChapter.title}
                onChange={(e) => setNewChapter(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter chapter title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <Input
                value={newChapter.subtitle}
                onChange={(e) => setNewChapter(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Enter subtitle (optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Section</label>
              <Input
                value={newChapter.section}
                onChange={(e) => setNewChapter(prev => ({ ...prev, section: e.target.value }))}
                placeholder="Enter section (optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reason for Change</label>
              <Textarea
                value={changeReason}
                onChange={(e) => setChangeReason(e.target.value)}
                placeholder="Describe why this chapter is being created..."
                className="min-h-[80px]"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateChapter}>
                Create Chapter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Rule Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Rule</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Chapter *</label>
              <Select value={newRule.chapterId} onValueChange={(value) => setNewRule(prev => ({ ...prev, chapterId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select chapter" />
                </SelectTrigger>
                <SelectContent>
                  {ruleBook?.chapters.map((chapter) => (
                    <SelectItem key={chapter.id} value={chapter.id}>
                      Chapter {chapter.number}: {chapter.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Rule Number *</label>
              <Input
                value={newRule.number}
                onChange={(e) => setNewRule(prev => ({ ...prev, number: e.target.value }))}
                placeholder="e.g., 4.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Rule Title *</label>
              <Input
                value={newRule.title}
                onChange={(e) => setNewRule(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter rule title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Rule Content *</label>
              <Textarea
                value={newRule.content}
                onChange={(e) => setNewRule(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter rule content..."
                className="min-h-[120px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reason for Change</label>
              <Textarea
                value={changeReason}
                onChange={(e) => setChangeReason(e.target.value)}
                placeholder="Describe why this rule is being created..."
                className="min-h-[80px]"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRule}>
                Create Rule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRuleBook;
