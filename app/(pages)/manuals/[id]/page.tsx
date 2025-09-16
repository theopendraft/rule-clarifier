'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, Calendar, Tag, Clock, User, FileText, Download, ExternalLink } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { format } from 'date-fns'

interface Manual {
  id: string
  code: string
  title: string
  description: string | null
  version: string | null
  pdfUrl: string | null
  pdfFileName: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function ManualDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [manual, setManual] = useState<Manual | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchManual(params.id as string)
    }
  }, [params.id])

  const fetchManual = async (id: string) => {
    try {
      const response = await fetch(`/api/manuals/get?id=${id}`)
      if (response.ok) {
        const data = await response.json()
        setManual(data)
      } else if (response.status === 404) {
        // Handle 404 - manual not found
        setManual(null)
      }
    } catch (error) {
      console.error('Error fetching manual:', error)
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
              <p className="text-slate-600">Loading manual...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!manual) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Manual Not Found</h1>
            <p className="text-slate-600 mb-6">The manual you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => router.push('/manuals')} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Manuals
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


        {/* Main Content */}
        <div className="max-w-4xl mx-auto">

                  {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/manuals')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Manuals
          </Button>
        </div>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <h1 className="text-3xl font-bold text-slate-900">{manual.title}</h1>
                  <Badge variant={manual.isActive ? "default" : "secondary"}>
                    {manual.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    {manual.code}
                  </span>
                  {manual.version && (
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      v{manual.version}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {manual.description && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="text-slate-700 leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: manual.description }}
                />
              </CardContent>
            </Card>
          )}

          {/* Original PDF */}
          {manual.pdfUrl && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Original PDF Document
                </CardTitle>
                <CardDescription>
                  View or download the original PDF file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* PDF Viewer */}
                  <div className="border rounded-lg overflow-hidden">
                    <iframe
                      src={manual.pdfUrl}
                      className="w-full h-96"
                      title={`PDF: ${manual.title}`}
                    />
                  </div>
                  
                  {/* PDF Actions */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-600" />
                      <span className="text-sm text-slate-600">
                        {manual.pdfFileName || 'Original PDF'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(manual.pdfUrl!, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Open in New Tab
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = manual.pdfUrl!;
                          link.download = manual.pdfFileName || 'manual.pdf';
                          link.click();
                        }}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Manual Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Code:</span>
                  <span className="font-medium">{manual.code}</span>
                </div>
                {manual.version && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Version:</span>
                    <span className="font-medium">v{manual.version}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600">Status:</span>
                  <Badge variant={manual.isActive ? "default" : "secondary"}>
                    {manual.isActive ? 'Active' : 'Inactive'}
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
                <div className="flex justify-between">
                  <span className="text-slate-600">Created:</span>
                  <span className="font-medium">{format(new Date(manual.createdAt), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Last Updated:</span>
                  <span className="font-medium">{format(new Date(manual.updatedAt), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Age:</span>
                  <span className="font-medium">
                    {Math.floor((new Date().getTime() - new Date(manual.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days
                  </span>
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
              Print Manual
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/manuals')}
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
