import { useState, useEffect } from 'react';

interface ChangeHighlight {
  entityId: string;
  entityType: string;
  isNew: boolean;
}

export function useChangeHighlight(entityType: string) {
  const [highlights, setHighlights] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    fetchUnreadChanges();
  }, [entityType]);

  const fetchUnreadChanges = async () => {
    try {
      const response = await fetch(`/api/change-logs?entityType=${entityType}&unreadOnly=true`);
      if (response.ok) {
        const data = await response.json();
        const newHighlights = new Map<string, boolean>();
        data.forEach((change: any) => {
          newHighlights.set(change.entityId, true);
        });
        setHighlights(newHighlights);
      }
    } catch (error) {
      console.error('Error fetching unread changes:', error);
    }
  };

  const markAsRead = async (entityId: string) => {
    try {
      await fetch('/api/notifications/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityId, entityType })
      });
      
      setHighlights(prev => {
        const newMap = new Map(prev);
        newMap.delete(entityId);
        return newMap;
      });
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const isHighlighted = (entityId: string) => highlights.has(entityId);

  return { isHighlighted, markAsRead, refreshHighlights: fetchUnreadChanges };
}
