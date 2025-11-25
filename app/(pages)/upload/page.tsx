'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PDFUploadDropzone } from '../../../lib/uploadthing-components';
import { 
  Image, 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Info,
  Settings
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Header } from '@/components/layout/Header';

interface UploadedFile {
  name: string;
  url: string;
  size: number;
  type: string;
}

export default function UploadPage() {
  const [allUploadedFiles, setAllUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadType, setUploadType] = useState('manual');
  const [useHardcodedDescription, setUseHardcodedDescription] = useState(false);
  
  const hardcodedDescription = `<div id="1"><p>Table-1A (Para 103) Inspection Schedule of Assistant Divisional Engineer</p></div>
<div id="2"><h4>Table 1</h4></div>
<div id="3"><table style="min-width: 75px;"><colgroup><col style="min-width: 25px;"><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr><th colspan="1" rowspan="1"><p><strong> </strong></p></th><th colspan="1" rowspan="1"><p><strong>Type of Inspection</strong></p></th><th colspan="1" rowspan="1"><p><strong>Schedule of Inspection</strong></p></th></tr><tr><th colspan="1" rowspan="1"><p>1</p></th><td colspan="1" rowspan="1"><p> </p></td><td colspan="1" rowspan="1"><p><strong>Note:</strong></p></td></tr><tr><th colspan="1" rowspan="1"><p>2</p></th><td colspan="1" rowspan="1"><p>(Deleted)</p></td><td colspan="1" rowspan="1"><p>(Deleted)</p></td></tr><tr><th colspan="1" rowspan="1"><p>3</p></th><td colspan="1" rowspan="1"><p>Fast Train Inspection</p></td><td colspan="1" rowspan="1"><p>Once in a month - Entire sub-division to be covered by either Engine or Rear Window of fast train</p></td></tr><tr><th colspan="1" rowspan="1"><p>4</p></th><td colspan="1" rowspan="1"><p>Level Crossing</p></td><td colspan="1" rowspan="1"><p>Once in Six months - All level crossings.</p></td></tr><tr><th colspan="1" rowspan="1"><p>5</p></th><td colspan="1" rowspan="1"><p>Curves</p></td><td colspan="1" rowspan="1"><p>Inspect the curves based on results of TRC/OMS/FP and inspection details of JE/ SSE/P.Way</p></td></tr><tr><th colspan="1" rowspan="1"><p>6</p></th><td colspan="1" rowspan="1"><p>Points &amp; Crossings</p></td><td colspan="1" rowspan="1"><p> </p></td></tr><tr><th colspan="1" rowspan="1"><p>7</p></th><td colspan="1" rowspan="1"><p>LWR / SEJ</p></td><td colspan="1" rowspan="1"><p>Once in six months- All LWR / SEJs (Preferably in hottest and coldest months)</p></td></tr><tr><th colspan="1" rowspan="1"><p>8</p></th><td colspan="1" rowspan="1"><p>Track on Bridges</p></td><td colspan="1" rowspan="1"><p> </p></td></tr><tr><th colspan="1" rowspan="1"><p>9</p></th><td colspan="1" rowspan="1"><p>AT welding site</p></td><td colspan="1" rowspan="1"><p>At least one welding team under each SSE/P.Way (In-charge) in a month</p></td></tr><tr><th colspan="1" rowspan="1"><p>10</p></th><td colspan="1" rowspan="1"><p>USFD Test check</p></td><td colspan="1" rowspan="1"><p>Monthly- Minimum two hours during regular trolley inspection</p></td></tr><tr><th colspan="1" rowspan="1"><p>11</p></th><td colspan="1" rowspan="1"><p>Monsoon Patrolling</p></td><td colspan="1" rowspan="1"><p>When introduced; should check the work of Patrolmen at night once in a month either by Train/Push trolley/Motor Trolley</p></td></tr><tr><th colspan="1" rowspan="1"><p>12</p></th><td colspan="1" rowspan="1"><p>Hot Weather Patrolling</p></td><td colspan="1" rowspan="1"><p>When introduced; should check the work of Patrolmen during day time (preferably between</p></td></tr></tbody></table><hr></div>
<div id="4"><h2><strong>PART – C</strong></h2></div>
<div id="5"><h2><strong>Working of Material Trains &amp; Track Machines</strong></h2></div>
<div id="6"><h3><strong>842 The Rules for the Working of Material Trains are outlined in Appendix IX of</strong></h3></div>
<div id="7"><p> the Indian Railway Code for the Engineering Department and Para 4.62 to 4.65 of General Rules for Indian Railways (1976) and Subsidiary Rules thereto – When the quantity of material is such as could be conveniently trained out in stages, wagon - loads may be attached to goods trains by arrangement with the Operating Department.843</p></div>
<div id="8"><ul><li></div>
<div id="9"><p>Material Train – Material train means a departmental train intended solely or mainly for carriage of railway material when picked or put down for execution of works, either between stations or within station limits. The railway material may include stone boulders, ballast, sand, cinder, Moorum, rails, sleepers and fittings etc.</p></li></ul></div>
<div id="10"><p> 844 Economical Working – Material train should be expeditiously and economically worked. The ADEN should arrange to form a train of maximum capacity consistent with the haulage capacity of the engine and tonnage approved for the section. In consultation with the Operating Department, the running of goods trains should be suitably regulated so as to provide as long a working time for Material train as possible. Delays in working should be traced to their source and remedies applied as circumstances demand.</p></div>
<div id="11"><h3><strong>845 Restrictions in Running –</strong></h3></div>
<div id="12"><p> (1)</p></div>
<div id="13"><ul><li></div>
<div id="14"><p>Except with the permission of the ADEN or Divisional Engineer, a material train should not be permitted to work during periods of poor visibility due to fog, storm or any other cause.</p></li></ul></div>
<div id="15"><p> (2) Except in an emergency such as, an accident or breach of the railway line, working of Material trains carrying labour should not be permitted between sunset and sunrise. If due to certain circumstances it is necessary to work Material Trains during night, permission to do so should be obtained from the Divisional Operating Manager.</p></div>
<div id="16"><h3><strong>846 Brake-Vans and Shelter Wagons –</strong></h3></div>
<div id="17"><p> (1)</p></div>
<div id="18"><ul><li></div>
<div id="19"><p>A Material train must be equipped with at least one brake-van in the rear. When running through between stations the engine should be marshalled at one end of the train, and the brake-van at the other end.</p></li></ul></div>
<div id="20"><p> (2) Covered wagons to afford shelter to the labour may be coupled to the material train as required. 847 Ordering of Material Trains – Operating Department is the authority for ordering a material train. On receipt of requisition from the ADEN/DEN, the Divisional Operating Manager shall advise the staff concerned by letter, detailing the composition of train, the loading kilometrages, the sections over which the train will work, the date of commencement of work, the station at which the rake will be stabled and the engineering official who will be deputed to be in-charge of the train. The notice to be given by the Engineering department should not normally be less than a week. 848 Issue of "Fit-to-Run" Certificate – Before a material train is allowed to work, the complete rake should be examined by the carriage and wagon staff and a "fit-to-run" certificate issued to the Guard. The rake may also be examined by the carriage and wagon staff each time it arrives at the train examining station and whenever possible, once a week.</p></div>`;

  const handleFileUpload = (files: UploadedFile[]) => {
    setAllUploadedFiles(prev => [...prev, ...files]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-5 w-5 text-blue-500" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText className="h-5 w-5 text-red-500" />;
    return <Upload className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Add Manual or Circular
                </CardTitle>
                <CardDescription>
                Select a PDF file to extract text:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <Settings className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <Label htmlFor="hardcoded-toggle" className="text-sm font-medium">
                          Use Hardcoded Description
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Toggle to use predefined content instead of OCR extraction
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="hardcoded-toggle"
                      checked={useHardcodedDescription}
                      onCheckedChange={setUseHardcodedDescription}
                    />
                  </div>
                  
                  <Tabs value={uploadType} onValueChange={setUploadType} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="manual">Manual</TabsTrigger>
                      <TabsTrigger value="circular">Circular</TabsTrigger>
                    </TabsList>
                    <TabsContent value="manual" className="mt-4">
                      <PDFUploadDropzone 
                        uploadType="manual" 
                        useHardcodedDescription={useHardcodedDescription}
                        hardcodedContent={hardcodedDescription}
                      />
                    </TabsContent>
                    <TabsContent value="circular" className="mt-4">
                      <PDFUploadDropzone 
                        uploadType="circular" 
                        useHardcodedDescription={useHardcodedDescription}
                        hardcodedContent={hardcodedDescription}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upload Info & Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Upload Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">File Size Limits</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>PDF Files:</span>
                      <Badge variant="secondary">16MB max</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Supported Formats</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>• PDF files only</div>
                    <div>• Text extraction with OCR</div>
                    <div>• Hardcoded content option</div>
                    <div>• Rich text editing</div>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {useHardcodedDescription 
                      ? "Hardcoded content mode is enabled. The predefined description will be used instead of OCR extraction."
                      : "PDF text will be automatically extracted and can be edited with rich formatting before saving as supporting documents."
                    }
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Recent Uploads */}
        {allUploadedFiles.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Recent Uploads
              </CardTitle>
              <CardDescription>
                Files uploaded in this session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {allUploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(file.size)} • {file.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge variant="secondary">Uploaded</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
