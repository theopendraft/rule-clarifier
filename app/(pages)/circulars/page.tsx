'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { Header } from '@/components/layout/Header'

interface Circular {
  id: string
  code: string
  title: string
  description: string | null
  number: string | null
  date: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const DEPARTMENTS = ['Engineering', 'SNT', 'Safety', 'Mechanical', 'Electrical', 'Commercial', 'Security', 'Medical', 'TRD', 'Operations']

const DUMMY_CIRCULARS = [
  { id: '1', code: 'ENGINEERING-CIR-001', title: 'Track Maintenance Standards', number: 'CIR/2024/001', isActive: true },
  { id: '2', code: 'ENGINEERING-CIR-002', title: 'Bridge Inspection Guidelines', number: 'CIR/2024/002', isActive: true },
  { id: '3', code: 'SAFETY-CIR-001', title: 'Safety Equipment Requirements', number: 'CIR/2024/003', isActive: true },
  { id: '4', code: 'SAFETY-CIR-002', title: 'Accident Reporting Procedures', number: 'CIR/2024/004', isActive: true },
  { id: '5', code: 'OPERATIONS-CIR-001', title: 'Train Operation Guidelines', number: 'CIR/2024/005', isActive: true },
  { id: '6', code: 'OPERATIONS-CIR-002', title: 'Passenger Service Standards', number: 'CIR/2024/006', isActive: true },
  { id: '7', code: 'MECHANICAL-CIR-001', title: 'Locomotive Maintenance Schedule', number: 'CIR/2024/007', isActive: true },
  { id: '8', code: 'ELECTRICAL-CIR-001', title: 'Overhead Wire Maintenance', number: 'CIR/2024/008', isActive: true },
  { id: '9', code: 'SNT-CIR-001', title: 'Signal System Updates', number: 'CIR/2024/009', isActive: true },
  { id: '10', code: 'COMMERCIAL-CIR-001', title: 'Ticketing Policy Changes', number: 'CIR/2024/010', isActive: true },
  { id: '11', code: 'SECURITY-CIR-001', title: 'Station Security Protocols', number: 'CIR/2024/011', isActive: true },
  { id: '12', code: 'MEDICAL-CIR-001', title: 'Medical Examination Guidelines', number: 'CIR/2024/012', isActive: true },
];

const getDepartmentFromCode = (code: string): string => {
  const prefix = code.split('-')[0].toLowerCase()
  const dept = DEPARTMENTS.find(d => d.toLowerCase() === prefix)
  return dept || 'Engineering'
}

export default function CircularsPage() {
  const [circulars, setCirculars] = useState<Circular[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterActive, setFilterActive] = useState(true)
  const [activeTab, setActiveTab] = useState('Engineering')

  useEffect(() => {
    fetchCirculars()
  }, [])

  const fetchCirculars = async () => {
    try {
      const response = await fetch('/api/circulars')
      if (response.ok) {
        const data = await response.json()
        setCirculars(data.length > 0 ? data : DUMMY_CIRCULARS)
      } else {
        setCirculars(DUMMY_CIRCULARS)
      }
    } catch (error) {
      console.error('Error fetching circulars:', error)
      setCirculars(DUMMY_CIRCULARS)
    } finally {
      setLoading(false)
    }
  }



  const filteredCirculars = circulars.filter(circular => {
    const matchesSearch = circular.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circular.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circular.number?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterActive ? circular.isActive : true
    
    return matchesSearch && matchesFilter
  })

  const getCircularsByDepartment = (department: string) => {
    return filteredCirculars.filter(circular => 
      circular.code.toLowerCase().startsWith(department.toLowerCase() + '-')
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading circulars...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50" suppressHydrationWarning>
      <Header />
      
      <div className="w-full px-3 py-4 sm:px-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <h1 className="text-xl sm:text-3xl font-bold text-slate-900">Circulars</h1>
          </div>
          <p className="text-slate-600 text-sm sm:text-lg">
            Official circulars and notices from the Railway Board
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search circulars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 sm:h-auto text-sm"
            />
          </div>
          <Button
            variant={filterActive ? "default" : "outline"}
            onClick={() => setFilterActive(!filterActive)}
            className="flex items-center justify-center gap-2 h-10 sm:h-auto text-sm"
          >
            <Filter className="h-4 w-4" />
            {filterActive ? 'Active Only' : 'All Circulars'}
          </Button>
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
            const departmentCirculars = getCircularsByDepartment(dept)
            return (
              <TabsContent key={dept} value={dept}>
                {departmentCirculars.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 sm:p-8 text-center">
                      <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 text-sm sm:text-base">No {dept} circulars available</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {departmentCirculars.map((circular) => (
                      <Link key={circular.id} href={`/circulars/${circular.id}`}>
                        <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group border border-slate-200 hover:border-blue-300 active:scale-95">
                          <CardContent className="p-3 sm:p-4">
                            <div className="flex flex-col">
                              <div className="mb-2 sm:mb-3">
                                <div className="w-10 h-12 sm:w-12 sm:h-16 bg-blue-100 rounded border border-blue-200 flex items-center justify-center mx-auto">
                                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                                </div>
                              </div>
                              <h3 className="font-medium text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors mb-1 text-center line-clamp-2 min-h-[2.5rem] sm:min-h-[2rem]">
                                {circular.title}
                              </h3>
                              <p className="text-[10px] sm:text-xs text-slate-500 mb-2 text-center truncate">{circular.code}</p>
                              <div className="flex items-center justify-between gap-1">
                                <Badge variant={circular.isActive ? "default" : "secondary"} className="text-[10px] sm:text-xs px-1.5 sm:px-2">
                                  {circular.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                                {circular.number && <span className="text-[10px] sm:text-xs text-slate-500 truncate">{circular.number}</span>}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </div>
  )
}
