'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Save, X, Upload, FileText } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { toast } from 'sonner'
import { UploadButton } from '@uploadthing/react'
import type { OurFileRouter } from '@/lib/uploadthing'

interface Manual {
  id: string
  code: string
  title: string
  description: string | null
  version: string | null
  isActive: boolean
}

export default function EditManualPage() {
  const params = useParams()
  const router = useRouter()
  const [manual, setManual] = useState<Manual | null>(null)
  const [loading, setLoading] = useState(true)
  const [editedDescription, setEditedDescription] = useState('')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [supportingDoc, setSupportingDoc] = useState('')
  const [changeReason, setChangeReason] = useState('')
  const [docType, setDocType] = useState<'upload' | 'text'>('upload')
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number; url: string }[]>([])

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
        setEditedDescription(data.description || '')
      }
    } catch (error) {
      console.error('Error fetching manual:', error)
      toast.error('Failed to load manual')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (res: { name: string; size: number; url: string }[]) => {
    setUploadedFiles(res)
    if (res && res.length > 0) {
      setSupportingDoc(res[0].url)
      toast.success(`File uploaded: ${res[0].name}`)
    }
  }

  const handleSave = async () => {
    if (!manual) return

    try {
      const response = await fetch(`/api/manuals/${manual.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: editedDescription,
          supportingDoc,
          changeReason,
          docType
        })
      })

      if (!response.ok) throw new Error('Failed to update manual')

      toast.success('Manual updated successfully')
      setHasUnsavedChanges(false)
      setShowSaveDialog(false)
      router.push(`/manuals/${manual.id}`)
    } catch (error) {
      console.error('Error updating manual:', error)
      toast.error('Failed to update manual')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
          <p>Manual not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => router.push(`/manuals/${manual.id}`)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowSaveDialog(true)}
                disabled={!hasUnsavedChanges}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h1 className="text-2xl font-bold text-blue-900 mb-4">Edit Manual: {manual.title}</h1>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <Textarea
                  value={editedDescription}
                  onChange={(e) => {
                    setEditedDescription(e.target.value)
                    setHasUnsavedChanges(true)
                  }}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Enter manual content (HTML supported)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Save Changes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Supporting Document</label>
              <Tabs value={docType} onValueChange={(value) => setDocType(value as 'upload' | 'text')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                  <TabsTrigger value="text">Text Reference</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="mt-4">
                  {uploadedFiles.length === 0 ? (
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <UploadButton<OurFileRouter, 'pdfUploader'>
                        endpoint="pdfUploader"
                        onClientUploadComplete={handleFileUpload}
                        onUploadError={(error) => toast.error(`Upload failed: ${error.message}`)}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">{uploadedFiles[0].name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setUploadedFiles([])
                          setSupportingDoc('')
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="text" className="mt-4">
                  <Input
                    value={supportingDoc}
                    onChange={(e) => setSupportingDoc(e.target.value)}
                    placeholder="Enter document reference"
                  />
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Reason for Change</label>
              <Textarea
                value={changeReason}
                onChange={(e) => setChangeReason(e.target.value)}
                placeholder="Describe the reason for this change..."
                className="min-h-[100px]"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!supportingDoc || !changeReason}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
