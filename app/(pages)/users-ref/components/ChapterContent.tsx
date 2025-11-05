import { useEffect, useRef, RefObject } from 'react';
import { BookOpen, FileText } from 'lucide-react';
import { Badge } from './ui/badge';

interface ChapterContentProps {
  selectedChapter: number;
  onChapterChange: (chapter: number) => void;
  scrollContainerRef: RefObject<HTMLDivElement>;
}

const chapterData = [
  {
    number: 1,
    title: 'General Provisions',
    sections: [
      { id: '1.1', title: 'Application and Scope', content: 'These rules shall apply to all railway operations under the jurisdiction of Indian Railways. The provisions herein are designed to ensure the safe and efficient operation of railway services across all zones and divisions.' },
      { id: '1.2', title: 'Definitions', content: 'For the purposes of these rules, unless the context otherwise requires, the following definitions shall apply. Railway Administration means the organizational structure responsible for managing railway operations.' },
      { id: '1.3', title: 'Authority and Responsibility', content: 'The Railway Board shall have the supreme authority for the administration of these rules. Zonal Railways and divisions shall implement these provisions under the oversight of designated officers.' },
      { id: '1.4', title: 'Interpretation', content: 'In case of any doubt or ambiguity in the interpretation of these rules, the matter shall be referred to the Railway Board whose decision shall be final and binding.' },
    ]
  },
  {
    number: 2,
    title: 'Safety Organization',
    sections: [
      { id: '2.1', title: 'Safety Department Structure', content: 'Each zonal railway shall maintain a dedicated safety department headed by a Chief Safety Officer. The department shall be responsible for monitoring and enforcing safety standards across all operations.' },
      { id: '2.2', title: 'Safety Inspections', content: 'Regular safety inspections shall be conducted at prescribed intervals. All findings shall be documented and remedial actions tracked to completion.' },
      { id: '2.3', title: 'Safety Training', content: 'All railway personnel shall undergo periodic safety training programs. Training records shall be maintained and updated regularly.' },
    ]
  },
  {
    number: 3,
    title: 'Track Maintenance',
    sections: [
      { id: '3.1', title: 'Track Inspection Standards', content: 'Track inspection shall be carried out as per the prescribed schedule. All tracks shall be inspected for alignment, gauge, level, and structural integrity.' },
      { id: '3.2', title: 'Maintenance Procedures', content: 'Track maintenance work shall be performed following approved procedures and safety protocols. All work shall be supervised by qualified personnel.' },
      { id: '3.3', title: 'Documentation Requirements', content: 'All track inspection and maintenance activities shall be properly documented in prescribed registers and electronic systems.' },
    ]
  },
  {
    number: 4,
    title: 'Signaling Systems',
    sections: [
      { id: '4.1', title: 'Signal Types and Standards', content: 'All signaling equipment shall conform to Indian Railway standards. Signals shall be clearly visible and maintained in proper working condition at all times.' },
      { id: '4.2', title: 'Interlocking Systems', content: 'Interlocking systems shall be designed to prevent conflicting train movements. Regular testing and maintenance of interlocking equipment is mandatory.' },
      { id: '4.3', title: 'Signal Failure Procedures', content: 'In case of signal failure, prescribed emergency procedures shall be followed. All signal failures shall be reported immediately and rectified without delay.' },
    ]
  },
  {
    number: 5,
    title: 'Train Operations',
    sections: [
      { id: '5.1', title: 'Operating Procedures', content: 'All train operations shall be conducted in accordance with prescribed operating procedures. Train crews must be fully qualified and current in their training.' },
      { id: '5.2', title: 'Speed Restrictions', content: 'Speed restrictions shall be observed at all times. Permanent and temporary speed restrictions shall be clearly indicated and enforced.' },
      { id: '5.3', title: 'Train Control Systems', content: 'Modern train control systems shall be utilized where available. All control systems shall be regularly tested and maintained.' },
    ]
  },
  {
    number: 6,
    title: 'Safety Standards',
    sections: [
      { id: '6.1', title: 'General Safety Requirements', content: 'All railway operations shall adhere to the highest safety standards. Safety shall be the paramount consideration in all railway activities.' },
      { id: '6.2', title: 'Personal Protective Equipment', content: 'Appropriate personal protective equipment shall be provided to all railway staff. Use of PPE shall be mandatory in designated areas.' },
      { id: '6.3', title: 'Safety Audits', content: 'Regular safety audits shall be conducted by qualified personnel. Audit findings shall be addressed promptly with corrective actions.' },
    ]
  },
  {
    number: 7,
    title: 'Emergency Procedures',
    sections: [
      { id: '7.1', title: 'Emergency Response Plans', content: 'Comprehensive emergency response plans shall be maintained and regularly updated. All staff shall be trained in emergency procedures.' },
      { id: '7.2', title: 'Accident Reporting', content: 'All accidents and incidents shall be reported immediately through prescribed channels. Detailed investigation reports shall be prepared for all accidents.' },
      { id: '7.3', title: 'Disaster Management', content: 'Disaster management protocols shall be established and maintained. Regular drills shall be conducted to ensure preparedness.' },
    ]
  },
  {
    number: 8,
    title: 'Station Management',
    sections: [
      { id: '8.1', title: 'Station Operations', content: 'Station operations shall be conducted efficiently and safely. Station staff shall be adequately trained and equipped.' },
      { id: '8.2', title: 'Platform Safety', content: 'Platform safety measures shall be implemented at all stations. Regular inspections of platform infrastructure shall be conducted.' },
      { id: '8.3', title: 'Passenger Facilities', content: 'Adequate passenger facilities shall be provided and maintained at all stations. Cleanliness and hygiene standards shall be maintained.' },
    ]
  },
  {
    number: 9,
    title: 'Rolling Stock',
    sections: [
      { id: '9.1', title: 'Maintenance Standards', content: 'Rolling stock shall be maintained to the highest standards. Regular inspections and maintenance schedules shall be strictly followed.' },
      { id: '9.2', title: 'Safety Inspections', content: 'Comprehensive safety inspections shall be conducted before each journey. All defects shall be rectified before the vehicle is put into service.' },
      { id: '9.3', title: 'Modernization Programs', content: 'Rolling stock modernization programs shall be implemented to improve safety and efficiency. New technologies shall be adopted as appropriate.' },
    ]
  },
  {
    number: 10,
    title: 'Electrical Systems',
    sections: [
      { id: '10.1', title: 'Electrical Safety', content: 'Electrical safety protocols shall be strictly enforced. Only authorized personnel shall work on electrical systems.' },
      { id: '10.2', title: 'Overhead Equipment', content: 'Overhead electrical equipment shall be regularly inspected and maintained. Safe clearances shall be maintained at all times.' },
      { id: '10.3', title: 'Power Supply Management', content: 'Reliable power supply shall be maintained for all railway operations. Backup power systems shall be available for critical operations.' },
    ]
  },
  {
    number: 11,
    title: 'Level Crossings',
    sections: [
      { id: '11.1', title: 'Level Crossing Safety', content: 'Level crossings shall be equipped with appropriate safety devices. Regular inspections shall be conducted to ensure proper functioning.' },
      { id: '11.2', title: 'Gate Operations', content: 'Level crossing gates shall be operated by trained personnel. Prescribed procedures shall be followed for gate operations.' },
      { id: '11.3', title: 'Elimination Program', content: 'Programs for elimination of level crossings shall be pursued. Preference shall be given to high-risk crossings.' },
    ]
  },
  {
    number: 12,
    title: 'Accident Investigation',
    sections: [
      { id: '12.1', title: 'Investigation Procedures', content: 'All accidents shall be thoroughly investigated by competent authorities. Investigation reports shall identify root causes and recommend corrective actions.' },
      { id: '12.2', title: 'Evidence Collection', content: 'All relevant evidence shall be collected and preserved. Investigation teams shall have necessary expertise and resources.' },
      { id: '12.3', title: 'Corrective Actions', content: 'Corrective actions from investigations shall be implemented promptly. Follow-up shall ensure effectiveness of corrective measures.' },
    ]
  },
  {
    number: 13,
    title: 'Personnel Safety',
    sections: [
      { id: '13.1', title: 'Working Conditions', content: 'Safe working conditions shall be provided for all railway personnel. Occupational health and safety standards shall be maintained.' },
      { id: '13.2', title: 'Training Requirements', content: 'Comprehensive safety training shall be provided to all employees. Refresher training shall be conducted at regular intervals.' },
      { id: '13.3', title: 'Health Monitoring', content: 'Health monitoring programs shall be established for railway personnel. Medical fitness standards shall be enforced.' },
    ]
  },
  {
    number: 14,
    title: 'Environmental Compliance',
    sections: [
      { id: '14.1', title: 'Environmental Standards', content: 'Railway operations shall comply with all environmental regulations. Environmental impact assessments shall be conducted for major projects.' },
      { id: '14.2', title: 'Pollution Control', content: 'Measures shall be taken to minimize pollution from railway operations. Waste management systems shall be implemented.' },
      { id: '14.3', title: 'Green Initiatives', content: 'Green initiatives shall be promoted to reduce environmental impact. Energy-efficient technologies shall be adopted.' },
    ]
  },
  {
    number: 15,
    title: 'Communication Systems',
    sections: [
      { id: '15.1', title: 'Communication Equipment', content: 'Reliable communication systems shall be maintained for railway operations. All equipment shall be tested regularly and kept in working condition.' },
      { id: '15.2', title: 'Radio Communication', content: 'VHF/UHF radio sets shall be provided to train and station staff. Radio protocols shall be followed for all operational communication.' },
      { id: '15.3', title: 'Emergency Communication', content: 'Emergency communication systems shall be available at all times. Backup communication channels shall be maintained for critical operations.' },
    ]
  },
  {
    number: 16,
    title: 'Security Protocols',
    sections: [
      { id: '16.1', title: 'Security Organization', content: 'Railway Protection Force shall be responsible for railway security. Security staff shall be deployed at all sensitive locations.' },
      { id: '16.2', title: 'Passenger Security', content: 'Measures shall be taken to ensure passenger safety and security. CCTV surveillance shall be provided at stations and in trains.' },
      { id: '16.3', title: 'Asset Protection', content: 'Railway assets shall be protected against theft and vandalism. Regular security patrols shall be conducted.' },
    ]
  },
  {
    number: 17,
    title: 'Miscellaneous Rules',
    sections: [
      { id: '17.1', title: 'Amendments and Updates', content: 'These rules may be amended from time to time by the Railway Board. All amendments shall be notified and circulated to concerned officials.' },
      { id: '17.2', title: 'Special Instructions', content: 'Zonal railways may issue special instructions for local conditions. Such instructions shall not conflict with these general rules.' },
      { id: '17.3', title: 'Compliance and Penalties', content: 'Non-compliance with these rules may result in disciplinary action. All railway personnel are responsible for knowing and following these rules.' },
    ]
  },
];

export function ChapterContent({ selectedChapter, onChapterChange, scrollContainerRef }: ChapterContentProps) {
  const chapterRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let timeoutId: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        // Clear any pending timeout
        clearTimeout(timeoutId);
        
        // Find the entry with the highest intersection ratio
        let mostVisible = entries[0];
        entries.forEach((entry) => {
          if (entry.intersectionRatio > mostVisible.intersectionRatio) {
            mostVisible = entry;
          }
        });

        // Update after a short delay to debounce rapid changes
        timeoutId = setTimeout(() => {
          if (mostVisible && mostVisible.isIntersecting) {
            const chapterNumber = parseInt(mostVisible.target.getAttribute('data-chapter') || '1');
            onChapterChange(chapterNumber);
          }
        }, 100);
      },
      {
        root: scrollContainer,
        rootMargin: '-150px 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      }
    );

    Object.values(chapterRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [onChapterChange, scrollContainerRef]);

  return (
    <div ref={scrollContainerRef} className="h-full overflow-auto bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pb-24">
        {chapterData.map((chapter) => (
          <div
            key={chapter.number}
            id={`chapter-${chapter.number}`}
            data-chapter={chapter.number}
            ref={(el) => (chapterRefs.current[chapter.number] = el)}
            className="mb-12 scroll-mt-36"
          >
            {/* Chapter Header */}
            <div className="mb-8 bg-white rounded-xl p-8 shadow-md border border-slate-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-3">
                    Chapter {chapter.number}
                  </Badge>
                  <h1 className="text-3xl text-blue-900 mb-2">{chapter.title}</h1>
                  <p className="text-slate-600">
                    Official guidelines and regulations as per Indian Railway standards
                  </p>
                </div>
              </div>
            </div>

            {/* Chapter Sections */}
            <div className="space-y-6">
              {chapter.sections.map((section) => (
                <div key={section.id} className="bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded text-sm font-medium">
                          Section {section.id}
                        </span>
                      </div>
                      <h3 className="text-xl text-slate-900 mb-3">{section.title}</h3>
                      <p className="text-slate-700 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500">
                      Last reviewed: October 2025 | Effective from: January 2025
                    </p>
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
        ))}
      </div>
    </div>
  );
}
