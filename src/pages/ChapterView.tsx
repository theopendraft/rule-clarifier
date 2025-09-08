import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, FileText, Clock, User, ChevronRight, BookOpen } from "lucide-react";

const chapterData = {
  "1": {
    title: "General Rules",
    subtitle: "GENERAL RULES",
    section: "A. Basic Principles and Definitions",
    rules: [
      { id: "1.01", title: "General Principles", content: "These rules shall be observed by all railway servants and others concerned in the working of trains. They shall be read in conjunction with the relevant Acts, Rules, Regulations and Orders issued by the Government and the Railway Administration from time to time.\n\nEvery railway servant shall make himself thoroughly acquainted with these rules and shall be held responsible for their observance. No railway servant shall do anything which is likely to endanger the safety of trains or passengers.\n\nThese rules are framed for the guidance of railway servants in the discharge of their duties and for ensuring the safe and efficient working of trains. They are supplementary to and not in substitution of the statutory rules and regulations.\n\nS.R.1.01 All railway servants shall be conversant with the General and Subsidiary Rules applicable to their duties and shall pass the prescribed tests before being allowed to work independently." },
      { id: "1.02", title: "Definitions", content: "In these rules, unless there is anything repugnant in the subject or context, the following terms shall have the meanings assigned to them:\n\n(a) 'Absolute Block System' means a system of working trains on double or single line where no train is permitted to enter a block section until line clear has been received from the station in advance.\n\n(b) 'Automatic Block System' means a system of automatic signalling where the movement of trains is governed by a series of consecutive stop signals so interconnected that they can display a proceed aspect only when the block section ahead is clear.\n\n(c) 'Block Section' means the portion of a running line between two adjacent stations on which normally only one train is permitted at a time.\n\n(d) 'Competent Railway Servant' means a railway servant who has been trained and passed the prescribed tests for the duties assigned to him.\n\n(e) 'Dead End' means a line which is closed at one end.\n\n(f) 'Facing Points' means points which face the direction of movement of a train approaching them.\n\n(g) 'Guard' means the railway servant in charge of a train other than the Loco Pilot.\n\n(h) 'Line Clear' means the permission given to a train to enter the block section ahead." },
      { id: "1.03", title: "Responsibility and Authority", content: "Every railway servant shall render all possible assistance to ensure safe and efficient train operations. He shall be responsible for the proper discharge of his duties and shall not leave his post without proper relief.\n\nNo railway servant shall take or give any intoxicating drink or drug while on duty or come on duty under the influence of such drink or drug. Any railway servant found under the influence of alcohol or drugs shall be immediately removed from duty.\n\nEvery railway servant must report for duty punctually at the appointed time and place. He shall not absent himself from duty without proper authority and shall work such hours as may be required of him.\n\nRailway servants shall maintain discipline and shall treat the public with courtesy. They shall wear the prescribed uniform and badges while on duty and shall carry their identity cards." },
      { id: "1.04", title: "Knowledge of Rules and Competency", content: "Every railway servant shall make himself thoroughly acquainted with these rules and shall be held responsible for their observance. He shall also be conversant with all orders, instructions and circulars applicable to his duties.\n\nNo railway servant shall be employed on any duty for which he has not been properly trained and tested. He shall pass the prescribed medical examination and efficiency tests before being declared competent for independent working.\n\nRailway servants shall attend refresher courses and periodical tests as prescribed. They shall keep themselves updated with changes in rules, procedures and technology relevant to their duties.\n\nS.R.1.04 All safety categories of staff shall undergo mandatory safety refresher training every three years and pass the prescribed tests with minimum 75% marks." },
      { id: "1.05", title: "Obedience to Orders and Communication", content: "Every railway servant shall obey and conform to all orders and instructions given to him by his superior officers. He shall carry out lawful orders promptly and efficiently.\n\nWhen in doubt about any instruction or procedure, a railway servant shall seek clarification from his superior before taking action. He shall not act on verbal orders for safety-related matters unless specifically authorized.\n\nAll communications relating to train operations shall be clear, complete and acknowledged. Important messages shall be repeated back to ensure accuracy.\n\nRailway servants shall report any unsafe conditions, rule violations or accidents immediately to their supervisors through proper channels." },
      { id: "1.06", title: "Safety and Emergency Procedures", content: "Safety is the primary consideration in all railway operations. Every railway servant shall be vigilant and take all necessary precautions to prevent accidents.\n\nIn case of emergency, railway servants shall take immediate action to protect trains and passengers. They shall exhibit danger signals and take all possible measures to prevent accidents.\n\nAll accidents, however trivial, shall be reported immediately. Railway servants shall preserve the site of accident and assist in rescue operations as required.\n\nEmergency equipment shall be kept ready for immediate use and railway servants shall be familiar with their location and operation." },
      { id: "1.07", title: "Personal Protective Equipment and Health", content: "Railway servants shall use prescribed personal protective equipment while on duty. They shall maintain good health and report any medical condition that may affect their ability to perform duties safely.\n\nPeriodical medical examination is mandatory for safety categories of staff. Any railway servant found medically unfit shall not be allowed to perform safety-related duties.\n\nRailway servants shall maintain personal hygiene and shall not smoke in prohibited areas. They shall follow all health and safety protocols prescribed by the administration." }
    ]
  },
  "2": {
    title: "Signals",
    subtitle: "SIGNALS",
    section: "A. General Principles of Signalling",
    rules: [
      { id: "2.01", title: "Object of signals", content: "The object of signals is to ensure safety in the working of trains by providing means of communication between those who are responsible for the movement of trains." },
      { id: "2.02", title: "Classification of signals", content: "Signals are classified as Fixed signals and Hand signals. Fixed signals are further classified as Automatic and Manual signals." },
      { id: "2.03", title: "Authority to show signals", content: "No person other than those specially appointed or authorized shall show any signal in connection with the movement of trains." },
      { id: "2.04", title: "Aspects and indications", content: "The aspects and indications of signals shall be as prescribed in the signal manual." },
      { id: "2.05", title: "Defective signals", content: "When a signal is defective or not clearly visible, it shall be treated as being in the most restrictive position." }
    ]
  },
  "4": {
    title: "Working of Trains Generally",
    subtitle: "WORKING OF TRAINS GENERALLY", 
    section: "A. Timing and Running of Trains",
    rules: [
      { id: "4.01", title: "Standard time", content: "The working of trains between stations shall be regulated by the standard time prescribed by the Government of India, which shall be transmitted daily to all the principal stations of the railway at 16:00 hours in the manner prescribed.\n\nS.R.4.01 'Standard time' as referred in GR 4.01 shall be the time displayed in GPS clock provided in the Control office and shall be transmitted to all stations at 16.00 hours by the section Controller.\n\nFor stations, which are not connected to the control, the specified stations shall pass on this information through telephone. The transmission of standard time shall be done by the Section Controller or his authorized representative.\n\nAt all class 'D' stations where there is no telephone connections either with the adjacent station or Control, the Clerk-in-charge shall check their station clocks daily with the time of the Guard of the first stopping train for the day.\n\nAll station clocks shall be synchronized with the standard time and any variation exceeding two minutes shall be immediately corrected. Station Masters shall ensure that platform clocks are clearly visible to passengers and staff.\n\nIn case of failure of communication systems, alternative arrangements shall be made to ensure time synchronization. Emergency procedures shall be followed when standard time cannot be transmitted." },
      { id: "4.02", title: "Adherence to advertised time", content: "No passenger train or mixed train shall be dispatched from a station before the advertised time. This rule is fundamental to maintaining passenger confidence and operational discipline.\n\nThe advertised time is the time shown in the public time table for the departure of trains from stations. Station Masters shall ensure strict adherence to this timing.\n\nIn case a train arrives late at a station, it may be dispatched immediately after completing all safety requirements, but not before the advertised time if it is a passenger or mixed train.\n\nGoods trains may be dispatched before their scheduled time if line is clear and all safety requirements are fulfilled, subject to operational convenience.\n\nS.R.4.02 At important stations, trains shall not be dispatched more than one minute before the advertised time. At other stations, trains may be dispatched up to two minutes before advertised time with proper authorization." },
      { id: "4.03", title: "Setting watch", content: "Before a train starts from a terminal or crew-changing station, the Guard shall set his watch by the station clock or the clock at the crew lobby. This ensures accurate timekeeping throughout the journey.\n\nThe Loco Pilot shall also synchronize his watch with the standard time before taking charge of the locomotive. Both crew members shall cross-verify their watches.\n\nDuring the journey, if there is significant variation in timing, the crew shall check their watches at major stations and make necessary corrections.\n\nIn case of watch failure, the crew shall obtain a replacement watch from the nearest station and synchronize it properly before proceeding.\n\nS.R.4.03 All running staff shall carry reliable watches and shall check them at crew lobbies before signing on duty. Watches showing variation of more than two minutes shall be replaced." },
      { id: "4.04", title: "Time of attendance for train crew", content: "Train crew shall report for duty at the prescribed time and place as per the roster. Punctuality is essential for safe and efficient train operations.\n\nLoco Pilots shall report for duty at least 20 minutes before the scheduled departure time of their train. Guards shall report 15 minutes before departure.\n\nCrew members shall complete all pre-departure checks, medical examination if required, and briefing within the prescribed time.\n\nIn case of late reporting, crew members shall inform the controlling authority immediately and state reasons for delay.\n\nS.R.4.04 Crew members reporting late without valid reasons shall be subject to disciplinary action. Chronic late reporting may result in removal from safety category duties.\n\nRelief arrangements shall be made for crew members who fail to report on time to avoid train delays." },
      { id: "4.05", title: "Proper running line", content: "Trains shall run on the proper running line in the direction of traffic unless otherwise authorized by competent authority. This is fundamental for preventing head-on collisions.\n\nOn double line sections, trains shall normally run on the left-hand line in the direction of traffic. The right-hand line is used for trains running in the opposite direction.\n\nOn single line sections, trains may run in either direction but only one train is permitted in a block section at a time under absolute block system.\n\nWrong line running is permitted only under specific circumstances with proper authorization and safety precautions as prescribed in the rules.\n\nS.R.4.05 Before authorizing wrong line running, all safety requirements including speed restrictions, piloting arrangements, and protection measures shall be ensured.\n\nAll concerned staff shall be advised about wrong line movements through proper communication channels." },
      { id: "4.06", title: "Direction of running", content: "Trains shall run in the authorized direction on double line sections. The direction of traffic on each line is clearly defined and must be strictly observed.\n\nUp trains run towards the headquarters of the division or towards the more important terminal. Down trains run in the opposite direction.\n\nOn sections where traffic direction is not clearly defined, specific instructions are issued by the administration regarding the direction of running.\n\nIn case of emergency or special circumstances, trains may be authorized to run in the wrong direction with proper safety precautions.\n\nS.R.4.06 All station staff shall be familiar with the normal direction of traffic on their section and shall immediately report any unauthorized movement." },
      { id: "4.07", title: "Supply of Working Time Table and Schedule of Standard Dimensions", content: "Every railway servant concerned with train operations shall be supplied with the current Working Time Table and Schedule of Standard Dimensions. These documents are essential for safe train operations.\n\nThe Working Time Table contains details of train timings, speed restrictions, gradients, and other operational information necessary for train running.\n\nSchedule of Standard Dimensions specifies the loading gauge, maximum axle load, and other technical parameters for safe movement of rolling stock.\n\nAll copies shall be current and amendments shall be incorporated immediately upon receipt. Obsolete copies shall be withdrawn and destroyed.\n\nS.R.4.07 Station Masters shall maintain a register of distribution of Working Time Tables and ensure that all concerned staff acknowledge receipt.\n\nAny discrepancy in the Working Time Table shall be immediately reported to higher authorities for correction." },
      { id: "4.08", title: "Limits of speed generally", content: "No train shall be run at a speed exceeding the maximum speed prescribed for the section. Speed limits are imposed for safety reasons and must be strictly observed.\n\nMaximum permissible speeds are specified in the Working Time Table for different classes of trains and types of rolling stock.\n\nSpeed restrictions may be temporary due to engineering works, weather conditions, or permanent due to track conditions, curves, and gradients.\n\nLoco Pilots are responsible for observing speed restrictions and shall reduce speed well in advance of restricted areas.\n\nS.R.4.08 Speed recording equipment shall be provided on locomotives and the records shall be regularly checked by supervisory staff.\n\nAny violation of speed restrictions shall be investigated and appropriate action taken against the crew." },
      { id: "4.09", title: "Caution order", content: "When engineering or other works affect the safe running of trains, caution orders shall be issued to inform train crews about speed restrictions and special precautions.\n\nCaution orders shall contain complete details including location, nature of restriction, speed limit, and duration of restriction.\n\nAll train crews shall acknowledge receipt of caution orders and shall observe the restrictions mentioned therein.\n\nCaution orders shall be issued in the prescribed format and shall be clear and unambiguous.\n\nS.R.4.09 Engineering departments shall give adequate advance notice for issuing caution orders. Emergency restrictions shall be immediately communicated to all concerned.\n\nCaution orders shall be withdrawn immediately after completion of work and restoration of normal conditions." },
      { id: "4.10", title: "Limits of speed over facing points", content: "Trains shall not exceed the prescribed speed when passing over facing points. Facing points are particularly vulnerable and require careful handling.\n\nThe maximum speed over facing points is generally 15 km/h unless higher speeds are specifically authorized after proper assessment.\n\nLoco Pilots shall reduce speed well in advance when approaching facing points and shall be prepared to stop if points are not properly set.\n\nPoints shall be properly locked and secured before allowing trains to pass over them at higher speeds.\n\nS.R.4.10 All facing points shall be provided with point indicators and shall be clearly visible to Loco Pilots.\n\nRegular inspection and maintenance of points is essential to ensure safe passage of trains." },
      { id: "4.11", title: "Limits of speed while running through stations", content: "Trains shall observe speed restrictions while running through stations without stopping. This ensures safety of passengers and staff on platforms.\n\nThe maximum speed through stations is generally 50 km/h for passenger trains and 25 km/h for goods trains unless specifically authorized.\n\nLoco Pilots shall sound whistle while approaching and passing through stations to warn people on platforms.\n\nSpecial care shall be taken at stations with heavy passenger traffic or where platform work is in progress.\n\nS.R.4.11 Station Masters shall ensure that platforms are clear of obstructions and unauthorized persons when trains are passing through.\n\nAny unsafe conditions on platforms shall be immediately reported and corrective action taken." },
      { id: "4.12", title: "Engine pushing", content: "When engines are pushing vehicles, special precautions shall be observed to ensure safety. Pushing operations require careful coordination between crew members.\n\nA competent railway servant shall be posted at the leading end to guide the movement and exhibit hand signals to the Loco Pilot.\n\nSpeed during pushing operations shall not exceed 8 km/h in yards and 15 km/h on running lines unless specifically authorized.\n\nCommunication between the Loco Pilot and the person guiding the movement shall be maintained throughout the operation.\n\nS.R.4.12 Pushing of passenger carrying vehicles is prohibited except in emergency situations with proper authorization.\n\nAll vehicles being pushed shall be properly coupled and brakes tested before commencement of movement." },
      { id: "4.13", title: "Limits of speed with engine tender foremost", content: "When running with engine tender foremost, speed shall be restricted as prescribed. This restriction is necessary due to reduced visibility and control.\n\nMaximum speed with tender leading is generally 25 km/h unless higher speeds are specifically authorized after risk assessment.\n\nLoco Pilots shall exercise extra caution and shall be prepared to stop at short notice when running tender first.\n\nA competent railway servant may be posted in the cab to assist with lookout duties during tender first running.\n\nS.R.4.13 Tender first running shall be avoided wherever possible by proper planning of locomotive movements.\n\nWhen unavoidable, all safety precautions including enhanced lookout and communication shall be ensured." },
      { id: "4.14", title: "Head light, marker light and tail light or tail board", content: "Trains shall carry the prescribed lights and markers as per regulations. Proper lighting is essential for identification and safety of trains.\n\nHead lights shall be exhibited on the leading vehicle of every train during hours of darkness and in foggy weather.\n\nTail lights or tail boards shall be exhibited on the last vehicle to indicate the rear of the train.\n\nMarker lights shall be used to indicate the class and direction of trains as prescribed in the signal manual.\n\nS.R.4.14 All lights shall be in working condition and shall be tested before departure. Defective lights shall be immediately replaced.\n\nIn case of light failure during journey, emergency arrangements shall be made and the next station informed immediately." }
    ]
  }
};

const ChapterView = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  
  const chapter = chapterData[chapterId as keyof typeof chapterData];
  
  if (!chapter) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-6 px-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Chapter Not Found</h1>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const scrollToRule = (ruleId: string) => {
    const element = document.getElementById(`rule-${ruleId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 bg-muted/30 border-r border-border">
          <div className="p-4 border-b border-border">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-lg">Chapter {chapterId}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{chapter.title}</p>
          </div>
          
          <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="space-y-1">
              {chapter.rules.map((rule) => (
                <button
                  key={rule.id}
                  onClick={() => scrollToRule(rule.id)}
                  className="w-full text-left p-3 rounded-lg transition-colors hover:bg-muted/50 hover:bg-primary/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-primary">{rule.id}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">{rule.title}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-sm text-muted-foreground mb-2">{chapter.subtitle}</p>
                <h1 className="text-4xl font-bold text-foreground mb-4">CHAPTER {chapterId}</h1>
                <h2 className="text-2xl font-semibold text-muted-foreground mb-6">{chapter.subtitle}</h2>
                <h3 className="text-lg font-medium text-foreground">{chapter.section}</h3>
              </div>

              <div className="space-y-8">
                {chapter.rules.map((rule) => (
                  <div key={rule.id} id={`rule-${rule.id}`} className="bg-white rounded-lg border border-border p-8 scroll-mt-8">
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-primary mb-2">
                        {rule.id}. {rule.title}:-
                      </h4>
                    </div>
                    
                    <div className="prose prose-sm max-w-none">
                      {rule.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-foreground leading-relaxed mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    
                    {(rule.id === '4.01' || rule.id === '1.04') && (
                      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                        <p className="text-xs text-blue-700">
                          {rule.id === '4.01' 
                            ? '(Ref: Railway Board letter No. ED/Safety-II/Rly Board letter No.2020/ Safety(A&R)/ 19/09 dated 28.07.2021) (Correction Memo 03/2021 dated 25.08.2021)'
                            : '(Ref: Railway Board Circular No. E(MPP)/2019/3/19 dated 15.03.2020) (Safety Circular 01/2021 dated 10.01.2021)'
                          }
                        </p>
                      </div>
                    )}
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

export default ChapterView;