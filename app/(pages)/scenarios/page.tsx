'use client';

import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText } from 'lucide-react';
import { Header } from '@/components/layout/Header';

export default function ScenariosPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-3">Scenarios</Badge>
                <h1 className="text-3xl text-blue-900 mb-2">Railway Scenarios</h1>
                <p className="text-slate-600">Practical scenarios and case studies for railway operations</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-slate-900 mb-3">Coming Soon</h3>
                    <p className="text-slate-700 leading-relaxed">
                      Railway Scenarios section is under development. This section will contain practical scenarios, 
                      case studies, and real-world examples to help understand the application of railway rules and regulations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
