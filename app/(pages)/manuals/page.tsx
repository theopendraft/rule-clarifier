'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BookOpen, Search, Tag, Filter, FileText, ArrowRight, Clock } from 'lucide-react'
import { Header } from '@/components/layout/Header'

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

export default function ManualsPage() {
  const [manuals, setManuals] = useState<Manual[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterActive, setFilterActive] = useState(true)

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
    <div className="min-h-screen bg-slate-50">
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

        

        {/* Manuals List */}
        {filteredManuals.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {searchTerm ? 'No manuals found' : 'No manuals available'}
              </h3>
              <p className="text-slate-600">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Manuals will appear here once they are added to the system'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredManuals.map((manual) => (
              <Link key={manual.id} href={`/manuals/${manual.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                            {manual.title}
                          </CardTitle>
                          <Badge variant={manual.isActive ? "default" : "secondary"}>
                            {manual.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {manual.code}
                          </span>
                          {manual.version && (
                            <span className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              v{manual.version}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Updated {manual.updatedAt ? formatDate(manual.updatedAt) : 'Unknown'}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </CardHeader>
                  {manual.description && (
                    <CardContent>
                      <CardDescription 
                        className="text-slate-700 prose prose-sm max-w-none"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                        dangerouslySetInnerHTML={{ 
                          __html: manual.description
                        }}
                      />
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
