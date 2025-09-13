import { useState, useEffect } from 'react';

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  section?: string;
  order: number;
  isActive: boolean;
  rules: Rule[];
  subChapters: SubChapter[];
}

export interface SubChapter {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  order: number;
  isActive: boolean;
  rules: Rule[];
}

export interface Rule {
  id: string;
  number: string;
  title: string;
  content: string;
  order: number;
  isActive: boolean;
  contentBlocks: ContentBlock[];
  links: RuleLink[];
}

export interface ContentBlock {
  id: string;
  type: string;
  content: string;
  metadata?: Record<string, unknown>;
  order: number;
}

export interface RuleLink {
  id: string;
  linkType: string;
  title: string;
  url?: string;
  targetRuleId?: string;
  description?: string;
  order: number;
}

export interface RuleBook {
  id: string;
  title: string;
  description?: string;
  version: string;
  isActive: boolean;
  chapters: Chapter[];
}

export function useRuleBook() {
  const [ruleBook, setRuleBook] = useState<RuleBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRuleBook = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // For now, we'll use the main rule book ID
        // In a real app, you might want to fetch all books and let user select
        const response = await fetch('/api/rule-books');
        if (!response.ok) {
          throw new Error('Failed to fetch rule books');
        }
        const books = await response.json();
        if (books.length > 0) {
          setRuleBook(books[0]);
        } else {
          setError('No rule books found');
        }
      } catch (err) {
        console.error('Error fetching rule book:', err);
        setError('Failed to load rule book data');
      } finally {
        setLoading(false);
      }
    };

    fetchRuleBook();
  }, []);

  const updateRule = async (ruleId: string, data: Record<string, unknown>, userId: string, reason?: string) => {
    try {
      const response = await fetch(`/api/rules/${ruleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, userId, reason }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update rule');
      }
      
      const updatedRule = await response.json();
      
      // Update the local state
      setRuleBook(prev => {
        if (!prev) return prev;
        
        return {
          ...prev,
          chapters: prev.chapters.map(chapter => ({
            ...chapter,
            rules: chapter.rules.map(rule => 
              rule.id === ruleId ? { ...rule, ...updatedRule } : rule
            ),
            subChapters: chapter.subChapters.map(subChapter => ({
              ...subChapter,
              rules: subChapter.rules.map(rule => 
                rule.id === ruleId ? { ...rule, ...updatedRule } : rule
              )
            }))
          }))
        };
      });
      
      return updatedRule;
    } catch (err) {
      console.error('Error updating rule:', err);
      throw err;
    }
  };

  const createContentBlock = async (ruleId: string, type: string, content: string, metadata?: Record<string, unknown>) => {
    try {
      const response = await fetch('/api/content-blocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruleId, type, content, metadata }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create content block');
      }
      
      const contentBlock = await response.json();
      
      // Update the local state
      setRuleBook(prev => {
        if (!prev) return prev;
        
        return {
          ...prev,
          chapters: prev.chapters.map(chapter => ({
            ...chapter,
            rules: chapter.rules.map(rule => 
              rule.id === ruleId 
                ? { ...rule, contentBlocks: [...rule.contentBlocks, contentBlock] }
                : rule
            ),
            subChapters: chapter.subChapters.map(subChapter => ({
              ...subChapter,
              rules: subChapter.rules.map(rule => 
                rule.id === ruleId 
                  ? { ...rule, contentBlocks: [...rule.contentBlocks, contentBlock] }
                  : rule
              )
            }))
          }))
        };
      });
      
      return contentBlock;
    } catch (err) {
      console.error('Error creating content block:', err);
      throw err;
    }
  };

  return {
    ruleBook,
    loading,
    error,
    updateRule,
    createContentBlock,
    refetch: () => {
      setLoading(true);
      // Re-fetch logic would go here
    }
  };
}
