'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Search, Filter, FileText, MoreVertical, Table } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { useAuth } from '@/contexts/AuthContext'

interface Manual {
  id: string
  code: string
  title: string
  description: string | null
  version: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const DEPARTMENTS = ['Engineering', 'SNT', 'Safety', 'Mechanical', 'Electrical', 'Commercial', 'Security', 'Medical', 'TRD', 'Operations']

const getDepartmentFromCode = (code: string): string => {
  const prefix = code.split('-')[0].toLowerCase()
  const dept = DEPARTMENTS.find(d => d.toLowerCase() === prefix)
  return dept || 'Engineering'
}

export default function ManualsPage() {
  const [manuals, setManuals] = useState<Manual[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterActive, setFilterActive] = useState(true)
  const [activeTab, setActiveTab] = useState('Engineering')

  useEffect(() => {
    fetchManuals()
  }, [])

  const fetchManuals = async () => {
    try {
      const response = await fetch('/api/manuals')
      if (response.ok) {
        const data = await response.json()
        setManuals(data)
      }
    } catch (error) {
      console.error('Error fetching manuals:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return 'Invalid date'
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'Invalid date'
    }
  }

  const filteredManuals = manuals.filter(manual => {
    const matchesSearch = manual.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manual.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manual.code.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterActive ? manual.isActive : true
    
    return matchesSearch && matchesFilter
  })

  const getManualsByDepartment = (department: string) => {
    return filteredManuals.filter(manual => 
      manual.code.toLowerCase().startsWith(department.toLowerCase() + '-')
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
              <p className="text-slate-600">Loading manuals...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50" suppressHydrationWarning>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900">Manuals</h1>
          </div>
          <p className="text-slate-600 text-lg">
            Technical manuals and operational guides
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search manuals by title, description, or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={filterActive ? "default" : "outline"}
            onClick={() => setFilterActive(!filterActive)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {filterActive ? 'Active Only' : 'All Manuals'}
          </Button>
        </div>

        {/* Department Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 mb-6">
            {DEPARTMENTS.map((dept) => (
              <TabsTrigger key={dept} value={dept} className="text-xs sm:text-sm">
                {dept}
              </TabsTrigger>
            ))}
          </TabsList>

          {DEPARTMENTS.map((dept) => {
            const departmentManuals = getManualsByDepartment(dept)
            return (
              <TabsContent key={dept} value={dept}>
                {departmentManuals.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <BookOpen className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600">No {dept} manuals available</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {departmentManuals.map((manual) => {
                      const department = getDepartmentFromCode(manual.code)
                      return (
                        <Link key={manual.id} href={`/manuals/${department.toLowerCase()}/${manual.id}`}>
                          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group border border-slate-200 hover:border-blue-300">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="mb-3">
                                    <div className="w-12 h-16 bg-blue-100 rounded border border-blue-200 flex items-center justify-center">
                                      <FileText className="h-6 w-6 text-blue-600" />
                                    </div>
                                  </div>
                                  <h3 className="font-medium text-sm text-slate-900 group-hover:text-blue-600 transition-colors mb-1 h-8 overflow-hidden">
                                    <span className="block truncate">{manual.title}</span>
                                  </h3>
                                  <p className="text-xs text-slate-500 mb-2">{manual.code}</p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge variant={manual.isActive ? "default" : "secondary"} className="text-xs">
                                  {manual.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                                {manual.version && <span className="text-xs text-slate-500">v{manual.version}</span>}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      )
                    })}
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
