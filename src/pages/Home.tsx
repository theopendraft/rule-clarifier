                    import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, ChevronDown, Edit3, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const chapters = [
  { 
    id: 1, 
    title: "General Rules",
    rules: [
      { id: "1.01", title: "Standard time" },
      { id: "1.02", title: "Adherence to advertised time" },
      { id: "1.03", title: "Setting watch" },
      { id: "1.04", title: "Time of attendance for train crew" },
      { id: "1.05", title: "Proper running line" },
      { id: "1.06", title: "Direction of running" },
      { id: "1.07", title: "Supply of Working Time Table" },
      { id: "1.08", title: "Limits of speed generally" },
      { id: "1.09", title: "Caution order" },
      { id: "1.10", title: "General safety requirements" }
    ]
  },
  { 
    id: 2, 
    title: "Signals and Communication",
    rules: [
      { id: "2.01", title: "Signal aspects" },
      { id: "2.02", title: "Hand signals" },
      { id: "2.03", title: "Communication procedures" },
      { id: "2.04", title: "Signal maintenance" },
      { id: "2.05", title: "Emergency communication" },
      { id: "2.06", title: "Radio communication protocols" },
      { id: "2.07", title: "Signal failure procedures" },
      { id: "2.08", title: "Automatic signaling systems" },
      { id: "2.09", title: "Level crossing signals" },
      { id: "2.10", title: "Signal testing and inspection" }
    ]
  },
  { 
    id: 3, 
    title: "Safety Procedures",
    rules: [
      { id: "3.01", title: "Safety protocols" },
      { id: "3.02", title: "Emergency procedures" },
      { id: "3.03", title: "Risk assessment" },
      { id: "3.04", title: "Personal protective equipment" },
      { id: "3.05", title: "Hazard identification" },
      { id: "3.06", title: "Safety training requirements" },
      { id: "3.07", title: "Incident reporting procedures" },
      { id: "3.08", title: "Safety audits and inspections" },
      { id: "3.09", title: "Environmental safety measures" },
      { id: "3.10", title: "Safety committee operations" }
    ]
  },
  { 
    id: 4, 
    title: "Working of Trains Generally",
    rules: [
      { id: "4.01", title: "Standard time" },
      { id: "4.02", title: "Adherence to advertised time" },
      { id: "4.03", title: "Setting watch" },
      { id: "4.04", title: "Time of attendance for train crew" },
      { id: "4.05", title: "Proper running line" },
      { id: "4.06", title: "Direction of running" },
      { id: "4.07", title: "Supply of Working Time Table and Schedule of Standard Dimensions" },
      { id: "4.08", title: "Limits of speed generally" },
      { id: "4.09", title: "Caution order" },
      { id: "4.10", title: "Limits of speed over facing points" }
    ]
  },
  { 
    id: 5, 
    title: "Station Working",
    rules: [
      { id: "5.01", title: "Station master duties" },
      { id: "5.02", title: "Platform safety" },
      { id: "5.03", title: "Passenger handling" },
      { id: "5.04", title: "Train dispatching procedures" },
      { id: "5.05", title: "Station equipment maintenance" },
      { id: "5.06", title: "Goods handling operations" },
      { id: "5.07", title: "Station security measures" },
      { id: "5.08", title: "Platform announcements" },
      { id: "5.09", title: "Station cleanliness standards" },
      { id: "5.10", title: "Emergency evacuation procedures" }
    ]
  },
  { 
    id: 6, 
    title: "Block Working",
    rules: [
      { id: "6.01", title: "Block section rules" },
      { id: "6.02", title: "Token system" },
      { id: "6.03", title: "Block instruments" },
      { id: "6.04", title: "Single line working" },
      { id: "6.05", title: "Double line operations" },
      { id: "6.06", title: "Block section maintenance" },
      { id: "6.07", title: "Communication between stations" },
      { id: "6.08", title: "Block working during emergencies" },
      { id: "6.09", title: "Token exchange procedures" },
      { id: "6.10", title: "Block section inspection" }
    ]
  },
  { 
    id: 7, 
    title: "Automatic Block System",
    rules: [
      { id: "7.01", title: "ABS operations" },
      { id: "7.02", title: "Signal failures" },
      { id: "7.03", title: "Automatic block system guidelines" },
      { id: "7.04", title: "Track circuit maintenance" },
      { id: "7.05", title: "Signal overlap requirements" },
      { id: "7.06", title: "ABS testing procedures" },
      { id: "7.07", title: "Backup systems operation" },
      { id: "7.08", title: "ABS fault diagnosis" },
      { id: "7.09", title: "System restoration procedures" },
      { id: "7.10", title: "ABS performance monitoring" }
    ]
  },
  { 
    id: 8, 
    title: "Track Maintenance",
    rules: [
      { id: "8.01", title: "Track inspection" },
      { id: "8.02", title: "Maintenance procedures" },
      { id: "8.03", title: "Track safety" },
      { id: "8.04", title: "Rail replacement guidelines" },
      { id: "8.05", title: "Ballast maintenance" },
      { id: "8.06", title: "Track geometry standards" },
      { id: "8.07", title: "Welding procedures" },
      { id: "8.08", title: "Track monitoring systems" },
      { id: "8.09", title: "Drainage maintenance" },
      { id: "8.10", title: "Track renewal procedures" }
    ]
  },
  { 
    id: 9, 
    title: "Rolling Stock",
    rules: [
      { id: "9.01", title: "Vehicle inspection" },
      { id: "9.02", title: "Maintenance schedules" },
      { id: "9.03", title: "Safety checks" },
      { id: "9.04", title: "Brake system maintenance" },
      { id: "9.05", title: "Engine performance standards" },
      { id: "9.06", title: "Coach maintenance procedures" },
      { id: "9.07", title: "Wheel and axle inspection" },
      { id: "9.08", title: "Electrical system maintenance" },
      { id: "9.09", title: "Air conditioning systems" },
      { id: "9.10", title: "Rolling stock certification" }
    ]
  },
  { 
    id: 10, 
    title: "Operating Procedures",
    rules: [
      { id: "10.01", title: "Operating guidelines" },
      { id: "10.02", title: "Crew procedures" },
      { id: "10.03", title: "Documentation" },
      { id: "10.04", title: "Train formation rules" },
      { id: "10.05", title: "Load distribution guidelines" },
      { id: "10.06", title: "Operational safety measures" },
      { id: "10.07", title: "Performance monitoring" },
      { id: "10.08", title: "Operational efficiency standards" },
      { id: "10.09", title: "Resource allocation procedures" },
      { id: "10.10", title: "Operational reporting requirements" }
    ]
  },
  { 
    id: 11, 
    title: "Emergency Protocols",
    rules: [
      { id: "11.01", title: "Emergency response" },
      { id: "11.02", title: "Accident procedures" },
      { id: "11.03", title: "Fire safety protocols" },
      { id: "11.04", title: "Medical emergency procedures" },
      { id: "11.05", title: "Natural disaster response" },
      { id: "11.06", title: "Security threat management" },
      { id: "11.07", title: "Evacuation procedures" },
      { id: "11.08", title: "Emergency communication systems" },
      { id: "11.09", title: "Crisis management protocols" },
      { id: "11.10", title: "Post-emergency recovery procedures" }
    ]
  },
  { 
    id: 12, 
    title: "Personnel Duties",
    rules: [
      { id: "12.01", title: "Staff responsibilities" },
      { id: "12.02", title: "Duty rosters" },
      { id: "12.03", title: "Performance standards" },
      { id: "12.04", title: "Training requirements" },
      { id: "12.05", title: "Code of conduct" },
      { id: "12.06", title: "Disciplinary procedures" },
      { id: "12.07", title: "Health and fitness standards" },
      { id: "12.08", title: "Uniform and appearance guidelines" },
      { id: "12.09", title: "Leave and attendance policies" },
      { id: "12.10", title: "Career development programs" }
    ]
  },
  { 
    id: 13, 
    title: "Equipment Standards",
    rules: [
      { id: "13.01", title: "Equipment specifications" },
      { id: "13.02", title: "Quality standards" },
      { id: "13.03", title: "Testing procedures" },
      { id: "13.04", title: "Calibration requirements" },
      { id: "13.05", title: "Equipment certification" },
      { id: "13.06", title: "Maintenance standards" },
      { id: "13.07", title: "Replacement criteria" },
      { id: "13.08", title: "Performance monitoring" },
      { id: "13.09", title: "Equipment safety standards" },
      { id: "13.10", title: "Technology upgrade procedures" }
    ]
  },
  { 
    id: 14, 
    title: "Documentation",
    rules: [
      { id: "14.01", title: "Record keeping" },
      { id: "14.02", title: "Report formats" },
      { id: "14.03", title: "Filing procedures" },
      { id: "14.04", title: "Document control systems" },
      { id: "14.05", title: "Data management protocols" },
      { id: "14.06", title: "Archive procedures" },
      { id: "14.07", title: "Digital documentation standards" },
      { id: "14.08", title: "Document security measures" },
      { id: "14.09", title: "Audit trail requirements" },
      { id: "14.10", title: "Document retention policies" }
    ]
  },
  { 
    id: 15, 
    title: "Training Requirements",
    rules: [
      { id: "15.01", title: "Training programs" },
      { id: "15.02", title: "Certification" },
      { id: "15.03", title: "Competency assessment" },
      { id: "15.04", title: "Refresher training schedules" },
      { id: "15.05", title: "Specialized skill development" },
      { id: "15.06", title: "Training evaluation methods" },
      { id: "15.07", title: "Instructor qualifications" },
      { id: "15.08", title: "Training facility standards" },
      { id: "15.09", title: "E-learning protocols" },
      { id: "15.10", title: "Training record maintenance" }
    ]
  },
  { 
    id: 16, 
    title: "Inspection Procedures",
    rules: [
      { id: "16.01", title: "Inspection schedules" },
      { id: "16.02", title: "Audit procedures" },
      { id: "16.03", title: "Compliance checks" },
      { id: "16.04", title: "Quality assurance protocols" },
      { id: "16.05", title: "Inspection reporting formats" },
      { id: "16.06", title: "Corrective action procedures" },
      { id: "16.07", title: "Inspector certification requirements" },
      { id: "16.08", title: "Inspection equipment standards" },
      { id: "16.09", title: "Follow-up inspection procedures" },
      { id: "16.10", title: "Inspection data analysis" }
    ]
  },
  { 
    id: 17, 
    title: "Reporting Systems",
    rules: [
      { id: "17.01", title: "Incident reporting" },
      { id: "17.02", title: "Performance reports" },
      { id: "17.03", title: "Statistical analysis" },
      { id: "17.04", title: "Monthly operational reports" },
      { id: "17.05", title: "Safety performance indicators" },
      { id: "17.06", title: "Financial reporting procedures" },
      { id: "17.07", title: "Regulatory compliance reports" },
      { id: "17.08", title: "Management information systems" },
      { id: "17.09", title: "Data validation procedures" },
      { id: "17.10", title: "Report distribution protocols" }
    ]
  }
];

const Home = () => {
  const [selectedChapter, setSelectedChapter] = useState(4);
  const [selectedRule, setSelectedRule] = useState("4.01");
  const [expandedChapters, setExpandedChapters] = useState<number[]>([4]);
  const [isEditMode, setIsEditMode] = useState(false);
  const currentChapter = chapters.find(ch => ch.id === selectedChapter);
  const currentRule = currentChapter?.rules.find(rule => rule.id === selectedRule);

  const handleEditChapter = () => {
    setIsEditMode(!isEditMode);
    toast.success(isEditMode ? "Edit mode disabled" : `Edit mode enabled for Chapter ${selectedChapter}`);
  };

  const handleDownloadChapter = () => {
    toast.success(`Downloading Chapter ${selectedChapter}: ${currentChapter?.title}`);
  };

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const selectChapter = (chapterId: number) => {
    setSelectedChapter(chapterId);
    if (!expandedChapters.includes(chapterId)) {
      setExpandedChapters(prev => [...prev, chapterId]);
    }
  };

  const scrollToRule = (ruleId: string) => {
    const element = document.getElementById(`rule-${ruleId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Edit Controls */}
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
            <Button
              variant={isEditMode ? "default" : "outline"}
              size="sm"
              onClick={handleEditChapter}
              className="flex items-center space-x-2"
            >
              <Edit3 className="h-4 w-4" />
              <span>{isEditMode ? "Exit Edit" : "Edit Chapter"}</span>
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
                      selectedChapter === chapter.id 
                        ? "bg-blue-50 text-blue-700" 
                        : "hover:bg-slate-100"
                    }`}
                    onClick={() => {
                      if (selectedChapter === chapter.id) {
                        toggleChapter(chapter.id);
                      } else {
                        setExpandedChapters([chapter.id]);
                        setSelectedChapter(chapter.id);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <BookOpen className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">Chapter {chapter.id}</div>
                        <div className="text-xs opacity-80 truncate">{chapter.title}</div>
                      </div>
                      {expandedChapters.includes(chapter.id) ? (
                        <ChevronDown className="h-4 w-4 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 flex-shrink-0" />
                      )}
                    </div>
                  </Button>
                  
                  {expandedChapters.includes(chapter.id) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {chapter.rules.map((rule) => (
                        <Button
                          key={rule.id}
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-start text-left text-xs p-2 ${
                            selectedRule === rule.id && selectedChapter === chapter.id
                              ? "bg-blue-600 text-white"
                              : "text-blue-600 hover:bg-blue-50"
                          }`}
                          onClick={() => {
                            selectChapter(chapter.id);
                            setTimeout(() => scrollToRule(rule.id), 100);
                          }}
                        >
                          <span className="font-medium mr-2">{rule.id}</span>
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
              <h3 className="text-lg text-slate-600">
                A. Timing and Running of Trains
              </h3>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {currentChapter?.rules.map((rule) => (
                  <div key={rule.id} id={`rule-${rule.id}`} className="scroll-mt-8">
                    <div className="flex items-start space-x-4">
                      <span className="text-blue-600 font-bold text-lg">{rule.id}.</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-slate-800">{rule.title}:-</h4>
                          {isEditMode && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toast.info(`Editing rule ${rule.id}: ${rule.title}`)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="space-y-4 text-slate-700 leading-relaxed">
                          {rule.id === "4.01" ? (
                            <>
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
                            </>
                          ) : (
                            <>
                              <p>
                                This section covers the detailed procedures and guidelines for {rule.title.toLowerCase()}. 
                                All railway personnel must adhere to these regulations to ensure safe and efficient operations throughout the railway network.
                              </p>
                              <p>
                                The implementation of these rules requires comprehensive training and thorough understanding of the operational context. 
                                Personnel must be familiar with all aspects of this regulation including its application in various operational scenarios, 
                                emergency situations, and routine operations. Regular updates and revisions may be issued by the Railway Board as needed 
                                to maintain the highest standards of safety and operational efficiency.
                              </p>
                              <p>
                                Compliance with this rule is mandatory for all railway staff involved in the relevant operations. 
                                Any deviation from the prescribed procedures must be reported immediately to the appropriate authorities. 
                                The rule encompasses various operational parameters including safety protocols, performance standards, 
                                equipment specifications, and procedural requirements that must be strictly followed.
                              </p>
                              <p>
                                Training programs must be conducted regularly to ensure all personnel are updated with the latest procedures 
                                and any amendments to this rule. Documentation of training completion and competency assessment must be maintained 
                                as per the prescribed standards. Supervisory staff must ensure proper implementation and monitor compliance 
                                with this rule during regular operations and inspections.
                              </p>
                              <div className="mt-6 p-4 bg-slate-50 border-l-4 border-slate-400 rounded">
                                <p className="text-sm text-slate-600">
                                  (Ref: Railway Operating Manual - Chapter {selectedChapter} - Rule {rule.id} | Last Updated: {new Date().toLocaleDateString()} | Version: 2024.1)
                                </p>
                              </div>
                            </>
                          )}
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

export default Home;