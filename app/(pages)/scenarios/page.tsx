'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';

const DEPARTMENTS = ['Engineering', 'SNT', 'Safety', 'Mechanical', 'Electrical', 'Commercial', 'Security', 'Medical', 'TRD', 'Operations'];

const DUMMY_SCENARIOS = [
  { id: '1', dept: 'Engineering', code: 'ENGINEERING-SC-001', title: 'Track Maintenance Scenario', description: 'Emergency track repair procedure' },
  { id: '2', dept: 'Engineering', code: 'ENGINEERING-SC-002', title: 'Bridge Inspection Case', description: 'Annual bridge safety inspection' },
  { id: '3', dept: 'Safety', code: 'SAFETY-SC-001', title: 'Accident Response Protocol', description: 'Emergency response procedures' },
  { id: '4', dept: 'Safety', code: 'SAFETY-SC-002', title: 'Fire Safety Drill', description: 'Station fire evacuation drill' },
  { id: '5', dept: 'Operations', code: 'OPERATIONS-SC-001', title: 'Train Delay Management', description: 'Handling passenger train delays' },
  { id: '6', dept: 'Operations', code: 'OPERATIONS-SC-002', title: 'Platform Crowd Control', description: 'Managing peak hour crowds' },
  { id: '7', dept: 'Mechanical', code: 'MECHANICAL-SC-001', title: 'Locomotive Breakdown', description: 'Emergency locomotive repair' },
  { id: '8', dept: 'Electrical', code: 'ELECTRICAL-SC-001', title: 'Power Failure Response', description: 'Overhead wire power restoration' },
];

export default function ScenariosPage() {
  const [activeTab, setActiveTab] = useState('Engineering');
  const [searchTerm, setSearchTerm] = useState('');

  const getScenariosByDepartment = (department: string) => {
    return DUMMY_SCENARIOS.filter(scenario => 
      scenario.dept === department &&
      (scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       scenario.code.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50" suppressHydrationWarning>
      <Header />
      
      <div className="w-full px-3 py-4 sm:px-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <h1 className="text-xl sm:text-3xl font-bold text-slate-900">Scenarios</h1>
          </div>
          <p className="text-slate-600 text-sm sm:text-lg">
            Practical scenarios and case studies for railway operations
          </p>
        </div>

        {/* Search */}
        <div className="mb-4 sm:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search scenarios..."
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
            const scenarios = getScenariosByDepartment(dept);
            return (
              <TabsContent key={dept} value={dept}>
                {scenarios.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 sm:p-8 text-center">
                      <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 text-sm sm:text-base">No {dept} scenarios available</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {scenarios.map((scenario) => (
                      <Card key={scenario.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group border border-slate-200 hover:border-blue-300 active:scale-95">
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex flex-col">
                            <div className="mb-2 sm:mb-3">
                              <div className="w-10 h-12 sm:w-12 sm:h-16 bg-blue-100 rounded border border-blue-200 flex items-center justify-center mx-auto">
                                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                              </div>
                            </div>
                            <h3 className="font-medium text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors mb-1 text-center line-clamp-2 min-h-[2.5rem] sm:min-h-[2rem]">
                              {scenario.title}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-slate-500 mb-2 text-center truncate">{scenario.code}</p>
                            <Badge variant="default" className="text-[10px] sm:text-xs px-1.5 sm:px-2 mx-auto">
                              Active
                            </Badge>
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
