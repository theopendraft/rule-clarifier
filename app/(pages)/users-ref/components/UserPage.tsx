import { useState, useRef, useCallback } from 'react';
import { RailRulesHeader } from './RailRulesHeader';
import { ChapterNavigation } from './ChapterNavigation';
import { ChapterContent } from './ChapterContent';
import { ChatBot } from './ChatBot';

interface UserPageProps {
  onAdminAccess: () => void;
}

export function UserPage({ onAdminAccess }: UserPageProps) {
  const [selectedChapter, setSelectedChapter] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleChapterSelect = useCallback((chapter: number) => {
    const element = document.getElementById(`chapter-${chapter}`);
    if (element && scrollContainerRef.current) {
      const headerHeight = 72; // Header height
      const chapterNavHeight = 68; // Chapter nav height (updated)
      const offset = headerHeight + chapterNavHeight + 8; // Total offset with padding
      
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - offset;

      scrollContainerRef.current.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <RailRulesHeader onAdminAccess={onAdminAccess} />
      <ChapterNavigation 
        selectedChapter={selectedChapter}
        onChapterSelect={handleChapterSelect}
      />
      <div className="flex-1 overflow-hidden">
        <ChapterContent 
          selectedChapter={selectedChapter}
          onChapterChange={setSelectedChapter}
          scrollContainerRef={scrollContainerRef}
        />
      </div>
      <ChatBot />
    </div>
  );
}
