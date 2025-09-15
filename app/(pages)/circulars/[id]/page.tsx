'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileText, Calendar, Hash, Clock, User, Tag } from 'lucide-react'
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

export default function CircularDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [circular, setCircular] = useState<Circular | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchCircular(params.id as string)
    }
  }, [params.id])

  const fetchCircular = async (id: string) => {
    try {
      const response = await fetch(`/api/circulars/${id}`)
      if (response.ok) {
        const data = await response.json()
        setCircular(data)
      } else if (response.status === 404) {
        // Handle 404 - circular not found
        setCircular(null)
      }
    } catch (error) {
      console.error('Error fetching circular:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading circular...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!circular) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Circular Not Found</h1>
            <p className="text-slate-600 mb-6">The circular you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => router.push('/circulars')} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Circulars
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/circulars')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Circulars
          </Button>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <h1 className="text-3xl font-bold text-slate-900">{circular.title}</h1>
                  <Badge variant={circular.isActive ? "default" : "secondary"}>
                    {circular.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Hash className="h-4 w-4" />
                    {circular.code}
                  </span>
                  {circular.number && (
                    <span className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      {circular.number}
                    </span>
                  )}
                  {circular.date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(circular.date), 'MMMM dd, yyyy')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {circular.description && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">{circular.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Circular Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Code:</span>
                  <span className="font-medium">{circular.code}</span>
                </div>
                {circular.number && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Number:</span>
                    <span className="font-medium">{circular.number}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600">Status:</span>
                  <Badge variant={circular.isActive ? "default" : "secondary"}>
                    {circular.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {circular.date && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Circular Date:</span>
                    <span className="font-medium">{format(new Date(circular.date), 'MMM dd, yyyy')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600">Created:</span>
                  <span className="font-medium">{format(new Date(circular.createdAt), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Last Updated:</span>
                  <span className="font-medium">{format(new Date(circular.updatedAt), 'MMM dd, yyyy')}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button 
              onClick={() => window.print()} 
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Print Circular
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/circulars')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to List
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
