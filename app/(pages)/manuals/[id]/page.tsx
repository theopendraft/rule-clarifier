'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, Calendar, Tag, Clock, User, FileText, Download, ExternalLink, Edit, X } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { useAuth } from '@/contexts/AuthContext'
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
  const { userDepartment } = useAuth()
  const [manual, setManual] = useState<Manual | null>(null)
  const [loading, setLoading] = useState(true)
  const [divSections, setDivSections] = useState<string[]>([])
  const [hasRecentChanges, setHasRecentChanges] = useState(false)
  const [changeLogId, setChangeLogId] = useState<string | null>(null)
  const [showChangePopup, setShowChangePopup] = useState(false)
  const [changeDetails, setChangeDetails] = useState<any>(null)
  const [changeLogs, setChangeLogs] = useState<any[]>([])
  const [changedElements, setChangedElements] = useState<string[]>([])
  const [highlightsVisible, setHighlightsVisible] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  const canEditManual = (manual: Manual) => {
    if (userDepartment === 'admin') return true
    if (userDepartment === 'engineering' && !manual.code.toLowerCase().startsWith('snt-') && !manual.code.toLowerCase().startsWith('safety-')) return true
    if (userDepartment === 'safety' && manual.code.toLowerCase().startsWith('safety-')) return true
    if (userDepartment === 'snt' && manual.code.toLowerCase().startsWith('snt-')) return true
    return false
  }

  const isAdminView = userDepartment === 'admin' || userDepartment === 'engineering' || userDepartment === 'safety' || userDepartment === 'snt'
  const isUserView = !isAdminView

  useEffect(() => {
    if (params.id) {
      fetchManual(params.id as string)
    }
  }, [params.id])

  const fetchManual = async (id: string) => {
    try {
      const [manualResponse, changeLogResponse] = await Promise.all([
        fetch(`/api/manuals/get?id=${id}`),
        fetch(`/api/change-logs?entityType=MANUAL&entityId=${id}`)
      ])
      
      if (manualResponse.ok) {
        const data = await manualResponse.json()
        setManual(data)
        
        if (changeLogResponse.ok) {
          const allChangeLogs = await changeLogResponse.json()
          setChangeLogs(allChangeLogs)
          
          const isAdmin = userDepartment === 'admin' || userDepartment === 'engineering' || userDepartment === 'safety' || userDepartment === 'snt'
          if (!isAdmin) {
            if (allChangeLogs.length > 0) {
              setHasRecentChanges(true)
              setChangeLogId(allChangeLogs[0].id)
              setChangeDetails(allChangeLogs[0])
              setShowChangePopup(true)
              
              const elements: string[] = []
              allChangeLogs.forEach((log: any) => {
                if (log.changes?.divChanges) {
                  elements.push(...log.changes.divChanges.map((dc: any) => dc.id))
                }
              })
              setChangedElements(elements)
              setHighlightsVisible(true)
            }
          }
        }
        
        extractDivSections(data.description)
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

  const extractDivSections = (description: string) => {
    if (!description) return
    
    const divMatches = description.match(/<div id="(\d+)"/g)
    if (divMatches) {
      const ids = divMatches.map(match => match.match(/id="(\d+)"/)?.[1]).filter(Boolean) as string[]
      setDivSections(ids)
    }
  }

  const scrollToSection = (divId: string) => {
    window.location.hash = ''
    setTimeout(() => {
      window.location.hash = divId
      const element = document.getElementById(divId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 10)
  }

  useEffect(() => {
    if (manual && window.location.hash) {
      const hash = window.location.hash.substring(1)
      if (/^\d+$/.test(hash)) {
        setTimeout(() => scrollToSection(hash), 500)
      }
    }
  }, [manual])

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      [id]:target {
        background-color: #dbeafe !important;
        border-left: 4px solid #3b82f6 !important;
        padding: 12px !important;
        border-radius: 6px !important;
        margin: 8px 0 !important;
        transition: all 0.3s ease !important;
      }
    `
    document.head.appendChild(style)
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  useEffect(() => {
    // Add CSS for changed element highlighting
    const style = document.createElement('style')
    style.textContent = `
      .changed-highlight {
        background-color: #fef3c7 !important;
        border-left: 4px solid #f59e0b !important;
        padding: 8px 12px !important;
        border-radius: 4px !important;
        margin: 4px 0 !important;
        display: inline-block !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
    `
    document.head.appendChild(style)
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  useEffect(() => {
    // Highlight changed elements ONLY for regular users (not admins)
    if (isUserView && changedElements.length > 0 && highlightsVisible && contentRef.current) {
      setTimeout(() => {
        changedElements.forEach(elementId => {
          const element = contentRef.current?.querySelector(`[data-change-id="${elementId}"]`)
          if (element) {
            element.classList.add('changed-highlight')
          }
        })
      }, 100)
    } else if (!highlightsVisible && contentRef.current) {
      // Remove highlights when user clicks OK
      const highlighted = contentRef.current.querySelectorAll('.changed-highlight')
      highlighted.forEach(el => el.classList.remove('changed-highlight'))
    }
  }, [changedElements, manual, isUserView, highlightsVisible])

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
            className="flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:bg-blue-50"
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
                  <h1 className="text-3xl font-bold text-blue-900">{manual.title}</h1>
                  <Badge variant={manual.isActive ? "default" : "secondary"}>
                    {manual.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-blue-700">
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
              {canEditManual(manual) && (
                <Button
                  onClick={() => router.push(`/manuals/${manual.id}/edit`)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4" />
                  Edit Manual
                </Button>
              )}
            </div>
          </div>

          {/* Navigation */}
          {/* {divSections.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {divSections.map((divId) => (
                    <Button
                      key={divId}
                      variant="outline"
                      size="sm"
                      onClick={() => scrollToSection(divId)}
                      className="text-xs"
                    >
                      Section {divId}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )} */}

          {/* Description */}
          {manual.description && (
            <Card className="mb-8 transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Content</CardTitle>
                  {isUserView && hasRecentChanges && highlightsVisible && (
                    <Button
                      size="sm"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      onClick={async () => {
                        try {
                          await fetch('/api/notifications/mark-read', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ entityId: manual.id, entityType: 'MANUAL' })
                          })
                          setHasRecentChanges(false)
                          setHighlightsVisible(false)
                        } catch (error) {
                          console.error('Error marking as read:', error)
                        }
                      }}
                    >
                      OK - Clear Highlights
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  ref={contentRef}
                  className="text-slate-700 leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: manual.description
                      .replace(/&lt;/g, '<')
                      .replace(/&gt;/g, '>')
                      .replace(/&quot;/g, '"')
                      .replace(/&#39;/g, "'")
                      .replace(/&amp;/g, '&')
                      .replace(/<div id="(\d+)"/g, '<div id="$1" class="scroll-mt-20"')
                  }}
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
              variant="outline"
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

      {/* Change History Popup */}
      {showChangePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setShowChangePopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Change History</h3>
              </div>
              <p className="text-sm text-gray-600">View all changes made to this manual</p>
            </div>

            {changeLogs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No change history available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {changeLogs.map((log, index) => (
                  <div 
                    key={log.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={log.action === 'UPDATE' ? 'default' : log.action === 'CREATE' ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {log.action}
                        </Badge>
                        {index === 0 && hasRecentChanges && (
                          <Badge className="bg-yellow-500 text-white text-xs">New</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(log.createdAt), 'MMM dd, yyyy HH:mm')}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {log.reason && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Changes Made:</p>
                          <p className="text-sm text-gray-600 mt-1">{log.reason}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span className="font-medium">Updated by:</span>
                        <span>{log.user?.name || log.user?.email || log.userId}</span>
                      </div>

                      {log.supportingDoc && (
                        <div>
                          <a 
                            href={log.supportingDoc} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <FileText className="h-4 w-4" />
                            View Supporting Document
                          </a>
                        </div>
                      )}

                      {log.changes && typeof log.changes === 'object' && Object.keys(log.changes).length > 0 && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                          <p className="font-medium text-gray-700 mb-1">Modified Fields:</p>
                          <div className="space-y-1">
                            {Object.entries(log.changes).map(([key, value]: [string, any]) => (
                              <div key={key} className="text-gray-600">
                                <span className="font-medium">{key}:</span> {JSON.stringify(value).substring(0, 100)}{JSON.stringify(value).length > 100 ? '...' : ''}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex gap-2">
              {hasRecentChanges && (
                <Button
                  onClick={async () => {
                    try {
                      await fetch('/api/notifications/mark-read', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ entityId: manual.id, entityType: 'MANUAL' })
                      })
                      setHasRecentChanges(false)
                    } catch (error) {
                      console.error('Error marking as read:', error)
                    }
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Mark as Read
                </Button>
              )}
              <Button
                onClick={() => setShowChangePopup(false)}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
