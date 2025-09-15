'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FileText, Search, Calendar, Hash, Filter, ArrowRight } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { format } from 'date-fns'

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

export default function CircularsPage() {
  const [circulars, setCirculars] = useState<Circular[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterActive, setFilterActive] = useState(true)

  useEffect(() => {
    fetchCirculars()
  }, [])

  const fetchCirculars = async () => {
    try {
      const response = await fetch('/api/circulars')
      if (response.ok) {
        const data = await response.json()
        setCirculars(data)
      }
    } catch (error) {
      console.error('Error fetching circulars:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCirculars = circulars.filter(circular => {
    const matchesSearch = circular.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circular.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circular.number?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterActive ? circular.isActive : true
    
    return matchesSearch && matchesFilter
  })

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
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900">Circulars</h1>
          </div>
          <p className="text-slate-600 text-lg">
            Official circulars and notices from the Railway Board
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search circulars by title, description, or number..."
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
            {filterActive ? 'Active Only' : 'All Circulars'}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">{circulars.length}</p>
                  <p className="text-slate-600">Total Circulars</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {circulars.filter(c => c.isActive).length}
                  </p>
                  <p className="text-slate-600">Active Circulars</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Hash className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {circulars.filter(c => c.date && new Date(c.date) >= new Date('2024-01-01')).length}
                  </p>
                  <p className="text-slate-600">2024 Circulars</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Circulars List */}
        {filteredCirculars.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {searchTerm ? 'No circulars found' : 'No circulars available'}
              </h3>
              <p className="text-slate-600">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Circulars will appear here once they are added to the system'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredCirculars.map((circular) => (
              <Link key={circular.id} href={`/circulars/${circular.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                            {circular.title}
                          </CardTitle>
                          <Badge variant={circular.isActive ? "default" : "secondary"}>
                            {circular.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Hash className="h-3 w-3" />
                            {circular.code}
                          </span>
                          {circular.number && (
                            <span className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {circular.number}
                            </span>
                          )}
                          {circular.date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(circular.date), 'MMM dd, yyyy')}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </CardHeader>
                  {circular.description && (
                    <CardContent>
                      <CardDescription className="text-slate-700">
                        {circular.description}
                      </CardDescription>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
