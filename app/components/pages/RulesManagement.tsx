'use client';

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit, 
  Link as LinkIcon, 
  Upload, 
  Save, 
  FileText,
  Search,
  Filter,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";

const sampleRules = [
  {
    id: "4.01",
    title: "Standard Time",
    content: "The working of trains between stations shall be regulated by the standard time prescribed by the Government of India, which shall be transmitted daily to all the principal stations of the railway at 16:00 hours in the manner prescribed.",
    chapter: 4,
    lastModified: "2024-01-21",
    status: "active",
    references: ["4.02", "4.03"]
  },
  {
    id: "4.02", 
    title: "Adherence to Advertised Time",
    content: "No passenger train or mixed train shall be dispatched from a station before the advertised time.",
    chapter: 4,
    lastModified: "2024-01-20",
    status: "active",
    references: ["4.01"]
  },
  {
    id: "4.03",
    title: "Setting Watch",
    content: "Before a train starts from a terminal or crew-changing station, the Guard shall set his watch by the station clock or the clock at the crew lobby.",
    chapter: 4,
    lastModified: "2024-01-19", 
    status: "active",
    references: ["4.01"]
  }
];

const RulesManagement = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRule, setSelectedRule] = useState(sampleRules[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(selectedRule.content);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("rules");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sourceRuleId, setSourceRuleId] = useState("");
  const [targetRuleId, setTargetRuleId] = useState("");
  const [crossReferences, setCrossReferences] = useState([
    { id: 1, source: "4.01", target: "4.02" },
    { id: 2, source: "4.01", target: "4.03" }
  ]);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{id: number, name: string, status: string, date: string}>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [textImport, setTextImport] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleSaveRule = () => {
    toast.success("Rule updated successfully!");
    setSelectedRule({...selectedRule, content: editContent});
    setIsEditing(false);
  };

  const handleAddReference = (ruleId: string) => {
    toast.success(`Reference to Rule ${ruleId} added!`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      toast.success(`File ${file.name} selected for upload!`);
    } else {
      toast.error('Please select a PDF file.');
    }
  };

  const handleUploadSubmit = () => {
    if (selectedFile) {
      const displayName = fileName.trim() || selectedFile.name;
      const newFile = {
        id: Date.now(),
        name: displayName,
        status: 'uploaded',
        date: new Date().toLocaleDateString()
      };
      setUploadedFiles(prev => [...prev, newFile]);
      toast.success(`${displayName} uploaded successfully!`);
      setSelectedFile(null);
      setFileName("");
    } else {
      toast.error('Please select a file first.');
    }
  };

  const handleNewRule = () => {
    toast.info("New rule creation form would open here");
  };

  const handleProcessPDFs = async () => {
    if (uploadedFiles.length === 0) {
      toast.error("No files to process. Please upload PDF files first.");
      return;
    }
    
    setIsProcessing(true);
    toast.info("Processing PDFs with AI...");
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setUploadedFiles(prev => prev.map(file => ({ ...file, status: 'processed' })));
    setIsProcessing(false);
    toast.success(`Successfully processed ${uploadedFiles.length} PDF files!`);
  };

  const handleImportText = () => {
    if (!textImport.trim()) {
      toast.error("Please enter text to import");
      return;
    }
    
    const newFile = {
      id: Date.now(),
      name: `Text Import - ${new Date().toLocaleTimeString()}`,
      status: 'imported',
      date: new Date().toLocaleDateString()
    };
    
    setUploadedFiles(prev => [...prev, newFile]);
    setTextImport("");
    toast.success("Text imported successfully!");
  };

  const handleRemoveFile = (id: number) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
    toast.success("File removed successfully!");
  };

  const handleAddLink = () => {
    toast.success("Cross-reference link added successfully!");
  };

  const handleRemoveLink = (id: number) => {
    setCrossReferences(prev => prev.filter(ref => ref.id !== id));
    toast.success("Cross-reference removed successfully!");
  };

  const handleAddCrossReference = () => {
    if (!sourceRuleId.trim() || !targetRuleId.trim()) {
      toast.error("Please enter both source and target rule IDs");
      return;
    }
    
    if (sourceRuleId === targetRuleId) {
      toast.error("Source and target rules cannot be the same");
      return;
    }

    const newRef = {
      id: Date.now(),
      source: sourceRuleId.trim(),
      target: targetRuleId.trim()
    };

    setCrossReferences(prev => [...prev, newRef]);
    setSourceRuleId("");
    setTargetRuleId("");
    toast.success("Cross-reference added successfully!");
  };

  const filteredRules = sampleRules.filter(rule => 
    rule.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-6 px-6">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Rules Management</h1>
          <p className="text-muted-foreground text-lg">
            Create, edit, and manage railway operational rules and cross-references
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rules">Manage Rules</TabsTrigger>
            <TabsTrigger value="upload">Upload Documents</TabsTrigger>
            <TabsTrigger value="references">Cross References</TabsTrigger>
          </TabsList>

          <TabsContent value="rules" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Rules List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Rules List
                    <Button size="sm" onClick={handleNewRule}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Rule
                    </Button>
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search rules..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[600px] overflow-y-auto">
                    {filteredRules.map((rule) => (
                      <div
                        key={rule.id}
                        className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedRule.id === rule.id ? "bg-primary/10 border-l-4 border-l-primary" : ""
                        }`}
                        onClick={() => {
                          setSelectedRule(rule);
                          setEditContent(rule.content);
                          setIsEditing(false);
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">Rule {rule.id}</Badge>
                          <Badge className="bg-success/10 text-success">
                            {rule.status}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-sm mb-1">{rule.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          Chapter {rule.chapter} • {rule.lastModified}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Rule Editor */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Rule {selectedRule.id}: {selectedRule.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Chapter {selectedRule.chapter} • Last modified: {selectedRule.lastModified}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)} size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Rule
                        </Button>
                      ) : (
                        <>
                          <Button onClick={handleSaveRule} size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {!isEditing ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm leading-relaxed">{selectedRule.content}</p>
                      </div>
                      
                      {selectedRule.references.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Cross References:</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedRule.references.map((ref) => (
                              <Button key={ref} variant="outline" size="sm">
                                <LinkIcon className="h-3 w-3 mr-1" />
                                Rule {ref}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={8}
                        className="resize-none"
                        placeholder="Enter rule content..."
                      />
                      
                      <div>
                        <h4 className="font-semibold mb-2">Add Cross Reference:</h4>
                        <div className="flex items-center space-x-2">
                          <Input placeholder="Rule ID (e.g., 4.05)" className="flex-1" />
                          <Button size="sm" onClick={() => handleAddReference("4.05")}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Reference
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Upload PDF files or text documents to extract and manage rules
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Rule Documents</h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedFile ? `Selected: ${selectedFile.name}` : 'Drag and drop your PDF files here, or click to browse'}
                  </p>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button type="button" className="pointer-events-none">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                  {selectedFile && (
                    <div className="mt-4 space-y-3">
                      <Input
                        placeholder="Enter file name (optional)"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        className="max-w-md mx-auto"
                      />
                      <Button onClick={handleUploadSubmit}>
                        Upload File
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">PDF Processing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Automatically extract rules from PDF documents with AI assistance
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={handleProcessPDFs}
                        disabled={isProcessing || uploadedFiles.length === 0}
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </div>
                        ) : (
                          `Process PDFs (${uploadedFiles.filter(f => f.status === 'uploaded').length})`
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Text Import</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Import rules from text files or manual entry
                      </p>
                      <div className="space-y-3">
                        <textarea
                          placeholder="Paste your rule text here..."
                          value={textImport}
                          onChange={(e) => setTextImport(e.target.value)}
                          className="w-full h-24 p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                        <Button variant="outline" className="w-full" onClick={handleImportText}>
                          Import Text
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Uploaded Files ({uploadedFiles.length})</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{file.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge 
                                className={
                                  file.status === 'processed' ? 'bg-success/10 text-success' :
                                  file.status === 'imported' ? 'bg-primary/10 text-primary' :
                                  'bg-warning/10 text-warning'
                                }
                              >
                                {file.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{file.date}</span>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleRemoveFile(file.id)}
                            className="hover:bg-destructive hover:text-destructive-foreground"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="references" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Cross Reference Management</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage connections between rules and create reference networks
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Input 
                        placeholder="Source Rule ID (e.g., 4.01)" 
                        value={sourceRuleId}
                        onChange={(e) => setSourceRuleId(e.target.value)}
                      />
                    </div>
                    <LinkIcon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Input 
                        placeholder="Target Rule ID (e.g., 4.02)" 
                        value={targetRuleId}
                        onChange={(e) => setTargetRuleId(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddCrossReference}>Add Link</Button>
                  </div>
                  
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Existing Cross References ({crossReferences.length})</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {crossReferences.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">No cross-references found. Add one above.</p>
                      ) : (
                        crossReferences.map((ref) => (
                          <div key={ref.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                            <span className="text-sm font-medium">Rule {ref.source} ↔ Rule {ref.target}</span>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleRemoveLink(ref.id)}
                              className="hover:bg-destructive hover:text-destructive-foreground"
                            >
                              Remove
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RulesManagement;