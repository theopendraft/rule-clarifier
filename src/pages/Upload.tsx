import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, BookOpen, File, Eye, Send, X } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

const UploadPage = () => {
  const [grFiles, setGrFiles] = useState<File[]>([]);
  const [manualFiles, setManualFiles] = useState<File[]>([]);
  const [circularFiles, setCircularFiles] = useState<File[]>([]);
  const [previewFile, setPreviewFile] = useState<{file: File, type: string} | null>(null);
  
  const grFileRef = useRef<HTMLInputElement>(null);
  const manualFileRef = useRef<HTMLInputElement>(null);
  const circularFileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList | null, type: 'gr' | 'manual' | 'circular') => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    
    switch (type) {
      case 'gr':
        setGrFiles(prev => [...prev, ...fileArray]);
        toast.success(`${fileArray.length} GR chapter file(s) added`);
        break;
      case 'manual':
        setManualFiles(prev => [...prev, ...fileArray]);
        toast.success(`${fileArray.length} manual file(s) added`);
        break;
      case 'circular':
        setCircularFiles(prev => [...prev, ...fileArray]);
        toast.success(`${fileArray.length} circular file(s) added`);
        break;
    }
  };

  const removeFile = (index: number, type: 'gr' | 'manual' | 'circular') => {
    switch (type) {
      case 'gr':
        setGrFiles(prev => prev.filter((_, i) => i !== index));
        break;
      case 'manual':
        setManualFiles(prev => prev.filter((_, i) => i !== index));
        break;
      case 'circular':
        setCircularFiles(prev => prev.filter((_, i) => i !== index));
        break;
    }
    toast.info("File removed");
  };

  const uploadAll = () => {
    const totalFiles = grFiles.length + manualFiles.length + circularFiles.length;
    if (totalFiles === 0) {
      toast.error("Please select files to upload");
      return;
    }
    
    toast.success(`Uploading ${totalFiles} files...`);
    // Simulate upload process
    setTimeout(() => {
      toast.success("All files uploaded successfully!");
      setGrFiles([]);
      setManualFiles([]);
      setCircularFiles([]);
    }, 2000);
  };

  const FileSection = ({ 
    title, 
    icon: Icon, 
    files, 
    fileRef, 
    type, 
    description 
  }: {
    title: string;
    icon: any;
    files: File[];
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
          multiple
          accept=".pdf,.doc,.docx,.txt"
          onChange={(e) => handleFileUpload(e.target.files, type)}
          className="hidden"
        />
        
        <Button
          onClick={() => fileRef.current?.click()}
          variant="outline"
          className="w-full h-20 border-dashed border-2 hover:bg-slate-50"
        >
          <div className="text-center">
            <Upload className="h-6 w-6 mx-auto mb-2" />
            <p className="text-sm">Click to upload files</p>
            <p className="text-xs text-slate-500">PDF, DOC, DOCX, TXT</p>
          </div>
        </Button>

        {files.length > 0 && (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            <p className="text-sm font-medium">{files.length} file(s) selected:</p>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded">
                    <File className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPreviewFile({file, type})}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index, type)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
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
            files={grFiles}
            fileRef={grFileRef}
            type="gr"
            description="Upload General Rules chapters organized by sections"
          />
          
          <FileSection
            title="Manuals"
            icon={FileText}
            files={manualFiles}
            fileRef={manualFileRef}
            type="manual"
            description="Upload operational and technical manuals"
          />
          
          <FileSection
            title="Circulars"
            icon={File}
            files={circularFiles}
            fileRef={circularFileRef}
            type="circular"
            description="Upload railway board circulars and notifications"
          />
        </div>

        <div className="text-center">
          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">Upload Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium">GR Chapters</p>
                <p className="text-slate-600">{grFiles.length} files</p>
              </div>
              <div>
                <p className="font-medium">Manuals</p>
                <p className="text-slate-600">{manualFiles.length} files</p>
              </div>
              <div>
                <p className="font-medium">Circulars</p>
                <p className="text-slate-600">{circularFiles.length} files</p>
              </div>
            </div>
          </div>
          
          <Button
            onClick={uploadAll}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            disabled={grFiles.length + manualFiles.length + circularFiles.length === 0}
          >
            <Upload className="h-5 w-5 mr-2" />
            Upload All Files ({grFiles.length + manualFiles.length + circularFiles.length})
          </Button>
        </div>
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">File Preview</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewFile(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex h-[600px]">
              {/* Left Sidebar */}
              <div className="w-80 bg-slate-50 border-r p-4">
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Chapter IV</span>
                  </div>
                  <p className="text-sm text-slate-600">Working of Trains Generally</p>
                </div>
                
                <div className="space-y-1">
                  <div className="p-2 bg-blue-50 text-blue-700 rounded text-sm font-medium">
                    4.01 Standard time
                  </div>
                  <div className="p-2 text-slate-600 rounded text-sm hover:bg-slate-100">
                    4.02 Adherence to advertised time
                  </div>
                  <div className="p-2 text-slate-600 rounded text-sm hover:bg-slate-100">
                    4.03 Setting watch
                  </div>
                  <div className="p-2 text-slate-600 rounded text-sm hover:bg-slate-100">
                    4.04 Time of attendance for train crew
                  </div>
                  <div className="p-2 text-slate-600 rounded text-sm hover:bg-slate-100">
                    4.05 Proper running line
                  </div>
                  <div className="p-2 text-slate-600 rounded text-sm hover:bg-slate-100">
                    4.06 Direction of running
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="text-center mb-6">
                  <p className="text-sm text-blue-600 font-medium mb-2">WORKING OF TRAINS GENERALLY</p>
                  <h1 className="text-3xl font-bold text-slate-800 mb-4">CHAPTER IV</h1>
                  <h2 className="text-xl font-semibold text-slate-700 mb-4">WORKING OF TRAINS GENERALLY</h2>
                  <h3 className="text-lg text-slate-600">A. Timing and Running of Trains</h3>
                </div>
                
                <div className="max-w-3xl">
                  <div className="flex items-start space-x-4 mb-6">
                    <span className="text-blue-600 font-bold text-lg">4.01.</span>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-4">Standard time:-</h4>
                      <div className="space-y-4 text-slate-700 leading-relaxed">
                        <p>
                          The working of trains between stations shall be regulated by the standard time prescribed by the Government of India, which 
                          shall be transmitted daily to all the principal stations of the railway at 16.00 hours in the manner prescribed.
                        </p>
                        <p>
                          S.R.4.01 'Standard time' as referred in GR 4.01 shall be the time displayed in GPS clock provided in the Control office and shall 
                          be transmitted to all stations at 16.00 hours by the section Controller.
                        </p>
                        <p>
                          For stations, which are not connected to the control, the specified stations shall pass on this information through telephone.
                        </p>
                        <p>
                          At all class "D" stations where there is no telephone connections either with the adjacent station or Control, the Clerk-in-charge shall check their station clocks daily with the time of the Guard of the first stopping train for the day.
                        </p>
                        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                          <p className="text-sm text-slate-600">
                            (Ref: Railway Board letter No. ED/Safety-II/Rly Board letter No.2020/ Safety(A&R)/ 19/09 dated 28.07.2021) (Correction Memo 03/2021 dated 
                            25.08.2021)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mt-8 pt-6 border-t">
                  <Button
                    onClick={() => {
                      toast.success(`Pushed ${previewFile.file.name} to processing queue`);
                      setPreviewFile(null);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-8"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Push
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPreviewFile(null)}
                    className="px-8"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;