import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface ChapterNavigationProps {
  selectedChapter: number;
  onChapterSelect: (chapter: number) => void;
}

const chapters = [
  { number: 1, title: 'General Provisions' },
  { number: 2, title: 'Safety Organization' },
  { number: 3, title: 'Track Maintenance' },
  { number: 4, title: 'Signaling Systems' },
  { number: 5, title: 'Train Operations' },
  { number: 6, title: 'Safety Standards' },
  { number: 7, title: 'Emergency Procedures' },
  { number: 8, title: 'Station Management' },
  { number: 9, title: 'Rolling Stock' },
  { number: 10, title: 'Electrical Systems' },
  { number: 11, title: 'Level Crossings' },
  { number: 12, title: 'Accident Investigation' },
  { number: 13, title: 'Personnel Safety' },
  { number: 14, title: 'Environmental Compliance' },
  { number: 15, title: 'Communication Systems' },
  { number: 16, title: 'Security Protocols' },
  { number: 17, title: 'Miscellaneous Rules' },
];

export function ChapterNavigation({ selectedChapter, onChapterSelect }: ChapterNavigationProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const chapterButtonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Center Chapter 1 on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      const chapter1Button = chapterButtonRefs.current[1];
      if (chapter1Button && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const buttonLeft = chapter1Button.offsetLeft;
        const buttonWidth = chapter1Button.offsetWidth;
        const containerWidth = container.clientWidth;
        
        // Center the button
        const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
        container.scrollTo({ left: Math.max(0, scrollPosition), behavior: 'smooth' });
        setTimeout(checkScroll, 300);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to show active chapter button (centered)
  useEffect(() => {
    const activeButton = chapterButtonRefs.current[selectedChapter];
    if (activeButton && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const buttonLeft = activeButton.offsetLeft;
      const buttonWidth = activeButton.offsetWidth;
      const containerWidth = container.clientWidth;
      
      // Center the active button
      const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
      container.scrollTo({ left: Math.max(0, scrollPosition), behavior: 'smooth' });
      
      setTimeout(checkScroll, 300);
    }
  }, [selectedChapter]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="sticky top-[72px] bg-white border-b border-slate-200 shadow-md z-40">
      <div className="relative">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-r from-white via-white to-transparent pl-2 pr-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="h-8 w-8 rounded-full bg-white shadow-lg border-slate-300 hover:bg-slate-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Scrollable Chapter Container */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-3 px-4 py-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {chapters.map((chapter) => (
            <button
              key={chapter.number}
              ref={(el) => (chapterButtonRefs.current[chapter.number] = el)}
              onClick={() => onChapterSelect(chapter.number)}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg whitespace-nowrap transition-all flex-shrink-0 min-w-[140px]
                ${selectedChapter === chapter.number 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-transparent text-slate-600 hover:bg-slate-50'
                }
              `}
            >
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                ${selectedChapter === chapter.number 
                  ? 'bg-blue-500' 
                  : 'bg-blue-600'
                }
              `}>
                <span className="text-white text-sm font-semibold">{chapter.number}</span>
              </div>
              <span className="text-sm text-left">
                Chapter {chapter.number}
              </span>
            </button>
          ))}
        </div>

        {/* Right Scroll Button */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-l from-white via-white to-transparent pr-2 pl-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="h-8 w-8 rounded-full bg-white shadow-lg border-slate-300 hover:bg-slate-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
