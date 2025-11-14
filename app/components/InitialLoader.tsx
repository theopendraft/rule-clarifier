"use client";
import { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";

export default function InitialLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      setLoading(false);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("hasLoaded", "true");
    setLoading(false);
  };

  if (loading) {
    return <LoadingPage onComplete={handleComplete} />;
  }

  return <>{children}</>;
}
