import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, BookOpen, File, Send, X, Edit3, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { extractPDFContent, ExtractedChapter } from "@/utils/pdfExtractor";
import EditorPreview from "@/components/EditorPreview";

const UploadPage = () => {
  const [grFile, setGrFile] = useState<File | null>(null);
  const [manualFile, setManualFile] = useState<File | null>(null);
  const [circularFile, setCircularFile] = useState<File | null>(null);
  
  const [isEditingChapter, setIsEditingChapter] = useState(false);
  const [isEditingSection, setIsEditingSection] = useState(false);
  const [isEditingPreview, setIsEditingPreview] = useState(false);
  
  const [grContent, setGrContent] = useState<string>("");
  const [manualContent, setManualContent] = useState<string>("");
  const [circularContent, setCircularContent] = useState<string>("");
  
  const [grEditorData, setGrEditorData] = useState<any>(null);
  const [manualEditorData, setManualEditorData] = useState<any>(null);
  const [circularEditorData, setCircularEditorData] = useState<any>(null);
  
  const [grChapter, setGrChapter] = useState<ExtractedChapter | null>(null);
  const [manualChapter, setManualChapter] = useState<ExtractedChapter | null>(null);
  const [circularChapter, setCircularChapter] = useState<ExtractedChapter | null>(null);
  
  const [isExtracting, setIsExtracting] = useState<{gr: boolean, manual: boolean, circular: boolean}>({gr: false, manual: false, circular: false});
  
  const [pushedFiles, setPushedFiles] = useState<{file: File, content: string, type: string}[]>([]);
  
  const getChapterInfo = (type: 'gr' | 'manual' | 'circular') => {
    // Use extracted chapter info if available
    if (type === 'gr' && grChapter) return grChapter;
    if (type === 'manual' && manualChapter) return manualChapter;
    if (type === 'circular' && circularChapter) return circularChapter;
    
    // Fallback to default structure
    if (type === 'gr') {
      return {
        chapter: 'Chapter IV',
        title: 'Working of Trains Generally',
        sections: ['4.01 Standard time', '4.02 Adherence to advertised time', '4.03 Setting watch', '4.04 Time of attendance for train crew', '4.05 Proper running line', '4.06 Direction of running'],
        sectionNumber: '4.01.',
        sectionTitle: 'Standard time:-',
        content: ''
      };
    } else if (type === 'manual') {
      return {
        chapter: 'Manual Section',
        title: 'Operational Guidelines', 
        sections: ['M.01 Safety procedures', 'M.02 Equipment handling', 'M.03 Maintenance protocols', 'M.04 Emergency procedures', 'M.05 Documentation requirements'],
        sectionNumber: 'M.01.',
        sectionTitle: 'Safety procedures:-',
        content: ''
      };
    } else {
      return {
        chapter: 'Circular Notice',
        title: 'Railway Board Instructions',
        sections: ['C.01 Policy updates', 'C.02 Implementation guidelines', 'C.03 Compliance requirements', 'C.04 Reporting procedures', 'C.05 Effective dates'],
        sectionNumber: 'C.01.',
        sectionTitle: 'Policy updates:-',
        content: ''
      };
    }
  };
  
  const grFileRef = useRef<HTMLInputElement>(null);
  const manualFileRef = useRef<HTMLInputElement>(null);
  const circularFileRef = useRef<HTMLInputElement>(null);
  
  const ChapterHeader = () => {
    const currentType = grFile ? 'gr' : manualFile ? 'manual' : 'circular';
    const chapterInfo = getChapterInfo(currentType);
    const fileName = currentType === 'gr' ? grFile?.name : currentType === 'manual' ? manualFile?.name : circularFile?.name;
    
    return (
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditingChapter(!isEditingChapter)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit3 className="h-4 w-4 mr-1" />
            Edit Chapter
          </Button>
        </div>
        
        <p className="text-sm text-blue-600 font-medium mb-2">{chapterInfo.title.toUpperCase()}</p>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">{fileName?.toUpperCase() || chapterInfo.chapter.toUpperCase()}</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">{chapterInfo.title}</h2>
        <h3 className="text-lg text-slate-600">{currentType === 'gr' ? 'A. Timing and Running of Trains' : currentType === 'manual' ? 'A. Standard Operating Procedures' : 'A. Implementation Guidelines'}</h3>
      </div>
    );
  };
  
  const SectionEditor = () => {
    const currentType = grFile ? 'gr' : manualFile ? 'manual' : 'circular';
    const chapterInfo = getChapterInfo(currentType);
    
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-blue-600 font-bold text-xl">{chapterInfo.sectionNumber}</span>
            <h4 className="text-xl font-semibold text-slate-800">{chapterInfo.sectionTitle}</h4>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditingSection(true)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>
        <div className="min-h-[500px] border rounded-lg p-4">
          <EditorPreview
            data={grFile ? grEditorData : manualFile ? manualEditorData : circularEditorData}
            onChange={(data) => {
              if (grFile) {
                setGrEditorData(data);
                setGrContent(data.blocks.map((block: any) => block.data.text).join('\n\n'));
              } else if (manualFile) {
                setManualEditorData(data);
                setManualContent(data.blocks.map((block: any) => block.data.text).join('\n\n'));
              } else {
                setCircularEditorData(data);
                setCircularContent(data.blocks.map((block: any) => block.data.text).join('\n\n'));
              }
            }}
          />
        </div>
      </div>
    );
  };
  

  
  const PreviewCard = ({ type }: { type: 'gr' | 'manual' | 'circular' }) => {
    const chapterInfo = type === 'gr' ? grChapter : type === 'manual' ? manualChapter : circularChapter;
    const fileName = type === 'gr' ? grFile?.name : type === 'manual' ? manualFile?.name : circularFile?.name;
    if (!chapterInfo || !fileName) return null;
    
    return (
      <div className="p-4 bg-slate-50 border rounded-lg">
        <div className="flex justify-end mb-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-800 h-6 text-xs"
          >
            <Edit3 className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
        
        <div className="text-center mb-3">
          <h3 className="font-semibold text-slate-800">{fileName}</h3>
          <p className="text-sm text-slate-600">{chapterInfo.title}</p>
        </div>
        
        <div className="text-xs text-slate-500 mb-2">Rich Text Preview:</div>
        <div className="bg-white p-3 rounded border max-h-40 overflow-hidden">
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-800">Chapter IV - Working of Trains Generally</h3>
            <p className="text-xs text-slate-600">The example of text that was written in <strong>one of popular</strong> text editors for railway documentation.</p>
            <h4 className="font-semibold text-xs text-slate-700">4.01 Standard Time</h4>
            <p className="text-xs text-slate-600">The working of trains between stations shall be regulated by the <strong>standard time</strong> prescribed...</p>
          </div>
        </div>
        
        <div className="mt-3 text-center">
          <p className="text-xs text-green-600 font-medium">✓ PDF uploaded successfully</p>
        </div>
      </div>
    );
  };

  const handleFileUpload = async (files: FileList | null, type: 'gr' | 'manual' | 'circular') => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    setIsExtracting(prev => ({ ...prev, [type]: true }));
    
    try {
      if (fileExtension === 'pdf') {
        toast.info('Processing PDF file...');
        const extractedChapter = await extractPDFContent(file);
        
        // Set extracted chapter info
        if (type === 'gr') {
          setGrChapter(extractedChapter);
          setGrEditorData(extractedChapter.editorData);
        } else if (type === 'manual') {
          setManualChapter(extractedChapter);
          setManualEditorData(extractedChapter.editorData);
        } else {
          setCircularChapter(extractedChapter);
          setCircularEditorData(extractedChapter.editorData);
        }
        
        setFileContent(type, file, extractedChapter.content);
        toast.success('PDF uploaded successfully! Please review and edit the content as needed.');
      } else if (fileExtension === 'txt') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setFileContent(type, file, content);
        };
        reader.readAsText(file);
      } else {
        // For DOC, DOCX files, show placeholder content
        const placeholderContent = `The working of trains between stations shall be regulated by the standard time prescribed by the Government of India, which shall be transmitted daily to all the principal stations of the railway at 16.00 hours in the manner prescribed.\n\nS.R.4.01 'Standard time' as referred in GR 4.01 shall be the time displayed in GPS clock provided in the Control office and shall be transmitted to all stations at 16.00 hours by the section Controller.\n\nFor stations, which are not connected to the control, the specified stations shall pass on this information through telephone.\n\nAt all class "D" stations where there is no telephone connections either with the adjacent station or Control, the Clerk-in-charge shall check their station clocks daily with the time of the Guard of the first stopping train for the day.\n\n(Ref: Railway Board letter No. ED/Safety-II/Rly Board letter No.2020/ Safety(A&R)/ 19/09 dated 28.07.2021) (Correction Memo 03/2021 dated 25.08.2021)`;
        
        setFileContent(type, file, placeholderContent);
      }
    } catch (error) {
      toast.error('File upload failed. Please try again.');
      console.error('File upload error:', error);
    } finally {
      setIsExtracting(prev => ({ ...prev, [type]: false }));
    }
  };
  
  const setFileContent = (type: 'gr' | 'manual' | 'circular', file: File, content: string) => {
    switch (type) {
      case 'gr':
        setGrFile(file);
        setGrContent(content);
        toast.success(`GR chapter file uploaded`);
        break;
      case 'manual':
        setManualFile(file);
        setManualContent(content);
        toast.success(`Manual file uploaded`);
        break;
      case 'circular':
        setCircularFile(file);
        setCircularContent(content);
        toast.success(`Circular file uploaded`);
        break;
    }
  };

  const removeFile = (type: 'gr' | 'manual' | 'circular') => {
    switch (type) {
      case 'gr':
        setGrFile(null);
        setGrContent("");
        setGrChapter(null);
        setGrEditorData(null);
        break;
      case 'manual':
        setManualFile(null);
        setManualContent("");
        setManualChapter(null);
        setManualEditorData(null);
        break;
      case 'circular':
        setCircularFile(null);
        setCircularContent("");
        setCircularChapter(null);
        setCircularEditorData(null);
        break;
    }
    toast.info("File removed");
  };

  const pushFile = (type: 'gr' | 'manual' | 'circular') => {
    const fileName = type === 'gr' ? grFile?.name : type === 'manual' ? manualFile?.name : circularFile?.name;
    const content = type === 'gr' ? grContent : type === 'manual' ? manualContent : circularContent;
    
    if (!fileName || !content) {
      toast.error("No file to push");
      return;
    }
    
    toast.success(`Pushing ${fileName}...`);
    // Simulate push process
    setTimeout(() => {
      toast.success(`${fileName} pushed successfully!`);
      
      // Add to pushed files
      const fileObj = type === 'gr' ? grFile : type === 'manual' ? manualFile : circularFile;
      if (fileObj) {
        setPushedFiles(prev => [...prev, {file: fileObj, content, type}]);
      }
      
      removeFile(type);
    }, 1500);
  };

  const FileSection = ({ 
    title, 
    icon: Icon, 
    file, 
    fileRef, 
    type, 
    description 
  }: {
    title: string;
    icon: any;
    file: File | null;
    fileRef: React.RefObject<HTMLInputElement>;
    type: 'gr' | 'manual' | 'circular';
    description: string;
  }) => (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon className="h-5 w-5" />
          <span>{title}</span>
        </CardTitle>
        <p className="text-sm text-slate-600">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          ref={fileRef}
          type="file"
          accept=".txt,.pdf,.doc,.docx"
          onChange={(e) => handleFileUpload(e.target.files, type)}
          className="hidden"
        />
        
        <Button
          onClick={() => fileRef.current?.click()}
          variant="outline"
          className="w-full h-20 border-dashed border-2 hover:bg-slate-50"
          disabled={!!file || isExtracting[type]}
        >
          <div className="text-center">
            {isExtracting[type] ? (
              <>
                <Loader2 className="h-6 w-6 mx-auto mb-2 animate-spin" />
                <p className="text-sm">Extracting PDF...</p>
              </>
            ) : (
              <>
                <Upload className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm">{file ? 'File uploaded' : 'Click to upload file'}</p>
                <p className="text-xs text-slate-500">PDF, DOC, DOCX, TXT</p>
              </>
            )}
          </div>
        </Button>

        {file && (
          <div className="space-y-3">
            <div className="p-3 bg-white border rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded">
                    <File className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(type)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <PreviewCard type={type} />
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Document Upload Center</h1>
          <p className="text-slate-600">Upload GR chapters, manuals, and circulars to the system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <FileSection
            title="GR Chapters"
            icon={BookOpen}
            file={grFile}
            fileRef={grFileRef}
            type="gr"
            description="Upload General Rules chapters organized by sections"
          />
          
          <FileSection
            title="Manuals"
            icon={FileText}
            file={manualFile}
            fileRef={manualFileRef}
            type="manual"
            description="Upload operational and technical manuals"
          />
          
          <FileSection
            title="Circulars"
            icon={File}
            file={circularFile}
            fileRef={circularFileRef}
            type="circular"
            description="Upload railway board circulars and notifications"
          />
        </div>
      </div>
      
      {/* Full Screen Preview Section */}
      {(grFile || manualFile || circularFile) && (
        <div className="w-full bg-white min-h-screen">
          <div className="max-w-6xl mx-auto p-8">
            <ChapterHeader />
            
            <SectionEditor />
            
            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8 pt-6 border-t">
              <Button
                onClick={() => {
                  if (grFile) pushFile('gr');
                  else if (manualFile) pushFile('manual');
                  else pushFile('circular');
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-8"
              >
                <Send className="h-4 w-4 mr-2" />
                Push
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  if (grFile) removeFile('gr');
                  else if (manualFile) removeFile('manual');
                  else removeFile('circular');
                }}
                className="px-8"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Pushed Files Section */}
      {pushedFiles.length > 0 && (
        <div className="w-full bg-slate-100 py-8">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Pushed Files</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* GR Section */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>GR Chapters</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pushedFiles.filter(item => item.type === 'gr').length > 0 ? (
                    <div className="space-y-3">
                      {pushedFiles.filter(item => item.type === 'gr').map((item, index) => (
                        <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{item.file.name}</p>
                              <p className="text-xs text-slate-600">Pushed successfully</p>
                            </div>
                            <div className="text-green-600 text-sm">✓</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm text-center py-4">No GR files pushed yet</p>
                  )}
                </CardContent>
              </Card>
              
              {/* Manual Section */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Manuals</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pushedFiles.filter(item => item.type === 'manual').length > 0 ? (
                    <div className="space-y-3">
                      {pushedFiles.filter(item => item.type === 'manual').map((item, index) => (
                        <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{item.file.name}</p>
                              <p className="text-xs text-slate-600">Pushed successfully</p>
                            </div>
                            <div className="text-green-600 text-sm">✓</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm text-center py-4">No manual files pushed yet</p>
                  )}
                </CardContent>
              </Card>
              
              {/* Circular Section */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <File className="h-5 w-5" />
                    <span>Circulars</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pushedFiles.filter(item => item.type === 'circular').length > 0 ? (
                    <div className="space-y-3">
                      {pushedFiles.filter(item => item.type === 'circular').map((item, index) => (
                        <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{item.file.name}</p>
                              <p className="text-xs text-slate-600">Pushed successfully</p>
                            </div>
                            <div className="text-green-600 text-sm">✓</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm text-center py-4">No circular files pushed yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default UploadPage;
