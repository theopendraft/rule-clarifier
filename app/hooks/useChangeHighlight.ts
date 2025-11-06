import { useState, useEffect } from "react";

interface Change {
  id: string;
  action: string;
  changes: any;
  createdAt: string;
}

export function useChangeHighlight(entityId: string, entityType: string, userId?: string) {
  const [viewedChanges, setViewedChanges] = useState<Set<string>>(new Set());
  const [changes, setChanges] = useState<Change[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(`viewed_changes_${userId || 'guest'}`);
    if (stored) {
      try {
        setViewedChanges(new Set(JSON.parse(stored)));
      } catch (e) {
        console.error("Error parsing viewed changes:", e);
      }
    }
    fetchChanges();
  }, [entityId, entityType, userId]);

  const fetchChanges = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/change-logs?entityId=${entityId}&entityType=${entityType}`);
      if (response.ok) {
        const data = await response.json();
        setChanges(data);
      }
    } catch (error) {
      console.error("Error fetching changes:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsViewed = (changeId: string) => {
    const newViewed = new Set(viewedChanges);
    newViewed.add(changeId);
    setViewedChanges(newViewed);
    localStorage.setItem(`viewed_changes_${userId || 'guest'}`, JSON.stringify(Array.from(newViewed)));
  };

  const isChangeViewed = (changeId: string) => viewedChanges.has(changeId);

  return { changes, loading, markAsViewed, isChangeViewed };
}
