"use client";
import { useEffect, useState } from "react";

export default function LoadingPage({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 100);
          return 100;
        }
        return prev + 10;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        <div className="relative">
          <img 
            src="/logo.png" 
            alt="Southern Railway" 
            className="w-40 h-40 mx-auto animate-pulse"
          />
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="space-y-4">
          <h2 className="text-white text-2xl font-semibold">Southern Railway</h2>
          <p className="text-blue-200 text-sm">Compendium of Railways Rules</p>
          <div className="w-64 mx-auto">
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
