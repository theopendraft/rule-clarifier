'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, User, FileText } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { format } from 'date-fns'

export default function ChangelogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [changelog, setChangelog] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchChangelog(params.id as string)
    }
  }, [params.id])

  const fetchChangelog = async (id: string) => {
    try {
      const response = await fetch(`/api/change-logs/${id}`)
      if (response.ok) {
        const data = await response.json()
        setChangelog(data)
      }
    } catch (error) {
      console.error('Error fetching changelog:', error)
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
              <p className="text-slate-600">Loading changelog...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!changelog) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Changelog Not Found</h1>
            <Button onClick={() => router.push('/changelog')} className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Changelog
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
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/changelog')}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Changelog
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Change Details</CardTitle>
                <Badge variant={changelog.action === 'UPDATE' ? 'default' : changelog.action === 'CREATE' ? 'secondary' : 'destructive'}>
                  {changelog.action}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Entity Type</p>
                  <p className="font-medium">{changelog.entityType}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Entity ID</p>
                  <p className="font-medium text-xs">{changelog.entityId}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(changelog.createdAt), 'MMM dd, yyyy HH:mm')}</span>
              </div>

              {changelog.user && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User className="h-4 w-4" />
                  <span>{changelog.user.name || changelog.user.email}</span>
                </div>
              )}

              {changelog.reason && (
                <div>
                  <p className="text-sm text-slate-600 mb-1">Reason for Change</p>
                  <p className="text-slate-900">{changelog.reason}</p>
                </div>
              )}

              {changelog.supportingDoc && (
                <div>
                  <p className="text-sm text-slate-600 mb-1">Supporting Document</p>
                  <a 
                    href={changelog.supportingDoc} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <FileText className="h-4 w-4" />
                    View Document
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes Made</CardTitle>
            </CardHeader>
            <CardContent>
              {changelog.changes?.changes && changelog.changes.changes.length > 0 ? (
                <div className="space-y-4">
                  {changelog.changes.changes.map((change: any, index: number) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="bg-slate-100 px-4 py-2 border-b flex items-center justify-between">
                        <p className="font-medium text-slate-900 capitalize">{change.field}</p>
                        <Badge variant="outline" className="text-xs">
                          {change.operation}
                        </Badge>
                      </div>
                      <div className="p-4">
                        {change.diff ? (
                          <div className="prose prose-sm max-w-none">
                            {change.diff.map((segment: any, i: number) => (
                              <span
                                key={i}
                                className={
                                  segment.type === 'add'
                                    ? 'bg-green-100 text-green-800 px-1 rounded'
                                    : segment.type === 'remove'
                                    ? 'bg-red-100 text-red-800 px-1 rounded line-through'
                                    : 'text-slate-700'
                                }
                              >
                                {segment.content}{' '}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {change.oldValue && (
                              <div className="bg-red-50 p-3 rounded border border-red-200">
                                <p className="text-xs text-red-600 font-medium mb-2">Previous</p>
                                <p className="text-sm text-slate-700">{change.oldValue}</p>
                              </div>
                            )}
                            {change.newValue && (
                              <div className="bg-green-50 p-3 rounded border border-green-200">
                                <p className="text-xs text-green-600 font-medium mb-2">Updated</p>
                                <p className="text-sm text-slate-700">{change.newValue}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {changelog.changes.changedSections && changelog.changes.changedSections.length > 0 && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-blue-900 mb-2">Changed Sections</p>
                      <div className="flex flex-wrap gap-2">
                        {changelog.changes.changedSections.map((sectionId: string) => (
                          <Badge key={sectionId} variant="outline" className="bg-white">
                            {sectionId}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : changelog.changes && typeof changelog.changes === 'object' && Object.keys(changelog.changes).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(changelog.changes).map(([key, value]: [string, any]) => (
                    <div key={key} className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="font-medium text-slate-900 mb-2">{key}</p>
                      <div className="bg-slate-50 p-3 rounded">
                        <pre className="text-sm text-slate-700 whitespace-pre-wrap">{JSON.stringify(value, null, 2)}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600">No detailed changes recorded</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
