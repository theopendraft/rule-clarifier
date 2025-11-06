"use client";
import { useEffect } from "react";
import { useChangeHighlight } from "../../../../hooks/useChangeHighlight";

interface HighlightedContentProps {
  content: string;
  ruleId: string;
  userId?: string;
}

export function HighlightedContent({ content, ruleId, userId }: HighlightedContentProps) {
  const { changes, markAsViewed, isChangeViewed } = useChangeHighlight(ruleId, "RULE", userId);

  const highlightChanges = (text: string) => {
    if (changes.length === 0) return text;
    let result = text;
    changes.forEach((change) => {
      if (change.action === "UPDATE" && change.changes?.content) {
        const changedWords = extractChangedWords(change.changes.content);
        const viewed = isChangeViewed(change.id);
        changedWords.forEach((word) => {
          const regex = new RegExp(`\\b${escapeRegex(word)}\\b`, 'gi');
          const className = viewed ? '' : 'bg-orange-200 cursor-pointer hover:bg-orange-300';
          result = result.replace(regex, (match) => 
            `<span class="${className}" data-change-id="${change.id}">${match}</span>`
          );
        });
      }
    });
    return result;
  };

  const extractChangedWords = (changeData: any) => {
    if (typeof changeData === 'string') {
      return changeData.split(/\s+/).filter(w => w.length > 3);
    }
    if (changeData.new && changeData.old) {
      const newWords = new Set(changeData.new.split(/\s+/));
      const oldWords = new Set(changeData.old.split(/\s+/));
      return Array.from(newWords).filter(w => !oldWords.has(w) && w.length > 3);
    }
    return [];
  };

  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const changeId = target.getAttribute('data-change-id');
      if (changeId) {
        markAsViewed(changeId);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [markAsViewed]);

  return (
    <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: highlightChanges(content) }} />
  );
}
