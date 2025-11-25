'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';

const DEPARTMENTS = ['Engineering', 'SNT', 'Safety', 'Mechanical', 'Electrical', 'Commercial', 'Security', 'Medical', 'TRD', 'Operations'];

const DUMMY_JPO = [
  { id: '1', dept: 'Engineering', code: 'ENGINEERING-JPO-001', title: 'Track Maintenance Guidelines', number: 'JPO/2024/001' },
  { id: '2', dept: 'Engineering', code: 'ENGINEERING-JPO-002', title: 'Safety Equipment Usage', number: 'JPO/2024/002' },
  { id: '3', dept: 'Safety', code: 'SAFETY-JPO-001', title: 'Personal Protective Equipment', number: 'JPO/2024/003' },
  { id: '4', dept: 'Safety', code: 'SAFETY-JPO-002', title: 'Emergency Procedures', number: 'JPO/2024/004' },
  { id: '5', dept: 'Operations', code: 'OPERATIONS-JPO-001', title: 'Duty Roster Guidelines', number: 'JPO/2024/005' },
  { id: '6', dept: 'Operations', code: 'OPERATIONS-JPO-002', title: 'Passenger Service Standards', number: 'JPO/2024/006' },
  { id: '7', dept: 'Mechanical', code: 'MECHANICAL-JPO-001', title: 'Workshop Safety Rules', number: 'JPO/2024/007' },
  { id: '8', dept: 'Electrical', code: 'ELECTRICAL-JPO-001', title: 'Electrical Safety Protocol', number: 'JPO/2024/008' },
  { id: '9', dept: 'SNT', code: 'SNT-JPO-001', title: 'Signal Maintenance Procedures', number: 'JPO/2024/009' },
  { id: '10', dept: 'Commercial', code: 'COMMERCIAL-JPO-001', title: 'Ticketing Guidelines', number: 'JPO/2024/010' },
];

export default function JPOPage() {
  const [activeTab, setActiveTab] = useState('Engineering');
  const [searchTerm, setSearchTerm] = useState('');

  const getJPOByDepartment = (department: string) => {
    return DUMMY_JPO.filter(jpo => 
      jpo.dept === department &&
      (jpo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       jpo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
       jpo.number.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16" suppressHydrationWarning>
      <Header />
      
      <div className="w-full px-3 py-4 sm:px-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <h1 className="text-xl sm:text-3xl font-bold text-slate-900">JPO</h1>
          </div>
          <p className="text-slate-600 text-sm sm:text-lg">
            Junior Personnel Orders and notifications
          </p>
        </div>

        {/* Search */}
        <div className="mb-4 sm:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search JPO..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 sm:h-auto text-sm"
            />
          </div>
        </div>

        {/* Department Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="relative mb-4 sm:mb-6 bg-white rounded-lg border border-slate-200 p-1.5 sm:p-2">
            <button
              onClick={() => document.getElementById('tabs-scroll')?.scrollBy({ left: -150, behavior: 'smooth' })}
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-blue-600 text-white shadow-lg rounded-md p-1.5 sm:p-2 hover:bg-blue-700 transition-colors active:scale-95"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <div id="tabs-scroll" className="overflow-x-auto overflow-y-hidden scrollbar-hide px-9 sm:px-12" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <TabsList className="inline-flex w-auto bg-transparent border-0 gap-1.5 sm:gap-2 flex-nowrap">
                {DEPARTMENTS.map((dept) => (
                  <TabsTrigger 
                    key={dept} 
                    value={dept} 
                    className="whitespace-nowrap flex-shrink-0 px-4 py-2 sm:px-6 sm:py-2 text-xs sm:text-sm font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-100 data-[state=inactive]:text-slate-700 rounded-md transition-all active:scale-95"
                  >
                    {dept}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <button
              onClick={() => document.getElementById('tabs-scroll')?.scrollBy({ left: 150, behavior: 'smooth' })}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-blue-600 text-white shadow-lg rounded-md p-1.5 sm:p-2 hover:bg-blue-700 transition-colors active:scale-95"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {DEPARTMENTS.map((dept) => {
            const jpoItems = getJPOByDepartment(dept);
            return (
              <TabsContent key={dept} value={dept}>
                {jpoItems.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 sm:p-8 text-center">
                      <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 text-sm sm:text-base">No {dept} JPO available</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {jpoItems.map((jpo) => (
                      <Card key={jpo.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group border border-slate-200 hover:border-blue-300 active:scale-95">
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex flex-col">
                            <div className="mb-2 sm:mb-3">
                              <div className="w-10 h-12 sm:w-12 sm:h-16 bg-blue-100 rounded border border-blue-200 flex items-center justify-center mx-auto">
                                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                              </div>
                            </div>
                            <h3 className="font-medium text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors mb-1 text-center line-clamp-2 min-h-[2.5rem] sm:min-h-[2rem]">
                              {jpo.title}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-slate-500 mb-2 text-center truncate">{jpo.code}</p>
                            <div className="flex items-center justify-between gap-1">
                              <Badge variant="default" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
                                Active
                              </Badge>
                              <span className="text-[10px] sm:text-xs text-slate-500 truncate">{jpo.number}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
