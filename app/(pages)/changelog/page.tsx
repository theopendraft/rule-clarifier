'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  History, 
  User, 
  Calendar, 
  Filter, 
  Search, 
  FileText, 
  BookOpen, 
  List, 
  Link, 
  File, 
  Megaphone,
  Plus,
  Edit,
  Trash2,
  Archive,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface ChangeLog {
  id: string
  entityType: 'RULE_BOOK' | 'CHAPTER' | 'RULE' | 'CONTENT_BLOCK' | 'RULE_LINK' | 'MANUAL' | 'CIRCULAR'
  entityId: string
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'ARCHIVE' | 'RESTORE'
  changes: Record<string, any>
  reason?: string
  supportingDoc?: string
  userId: string
  createdAt: string
  user: {
    email: string
    name?: string
  }
}

const entityTypeLabels = {
  RULE_BOOK: 'Rule Book',
  CHAPTER: 'Chapter',
  RULE: 'Rule',
  CONTENT_BLOCK: 'Content Block',
  RULE_LINK: 'Rule Link',
  MANUAL: 'Manual',
  CIRCULAR: 'Circular'
}

const actionLabels = {
  CREATE: 'Created',
  UPDATE: 'Updated',
  DELETE: 'Deleted',
  ARCHIVE: 'Archived',
  RESTORE: 'Restored'
}

const actionColors = {
  CREATE: 'bg-green-100 text-green-800 border-green-200',
  UPDATE: 'bg-blue-100 text-blue-800 border-blue-200',
  DELETE: 'bg-red-100 text-red-800 border-red-200',
  ARCHIVE: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  RESTORE: 'bg-purple-100 text-purple-800 border-purple-200'
}

const entityIcons = {
  RULE_BOOK: BookOpen,
  CHAPTER: FileText,
  RULE: List,
  CONTENT_BLOCK: FileText,
  RULE_LINK: Link,
  MANUAL: File,
  CIRCULAR: Megaphone
}

export default function ChangeLogPage() {
  const router = useRouter()
  const [changeLogs, setChangeLogs] = useState<ChangeLog[]>([])
  const [filteredLogs, setFilteredLogs] = useState<ChangeLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [entityTypeFilter, setEntityTypeFilter] = useState<string>('all')
  const [actionFilter, setActionFilter] = useState<string>('all')
  const [contentFilter, setContentFilter] = useState<string>('all')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [selectedDepartment, setSelectedDepartment] = useState<string>('engineering')
  const [manualsByDepartment, setManualsByDepartment] = useState<Record<string, any[]>>({})

  const departments = [
    { label: 'Engineering', value: 'engineering' },
    { label: 'SNT', value: 'snt' },
    { label: 'Safety', value: 'safety' },
    { label: 'Mechanical', value: 'mechanical' },
    { label: 'Electrical', value: 'electrical' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Security', value: 'security' },
    { label: 'Medical', value: 'medical' },
    { label: 'TRD', value: 'trd' },
    { label: 'Operations', value: 'operations' }
  ]

  useEffect(() => {
    fetchChangeLogs()
    fetchManualsByDepartment()
  }, [])

  useEffect(() => {
    filterChangeLogs()
  }, [changeLogs, searchQuery, entityTypeFilter, actionFilter, contentFilter, selectedDepartment, manualsByDepartment])

  const fetchManualsByDepartment = async () => {
    try {
      const response = await fetch('/api/manuals')
      if (response.ok) {
        const manuals = await response.json()
        const grouped: Record<string, any[]> = {}
        manuals.forEach((manual: any) => {
          const dept = manual.department || 'engineering'
          if (!grouped[dept]) grouped[dept] = []
          grouped[dept].push(manual)
        })
        setManualsByDepartment(grouped)
      }
    } catch (error) {
      console.error('Error fetching manuals:', error)
    }
  }

  const fetchChangeLogs = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/change-logs?limit=100')
      if (response.ok) {
        const data = await response.json()
        setChangeLogs(data)
      } else {
        console.error('Failed to fetch change logs')
      }
    } catch (error) {
      console.error('Error fetching change logs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterChangeLogs = () => {
    let filtered = changeLogs

    // Filter by department
    if (selectedDepartment && manualsByDepartment[selectedDepartment]) {
      const departmentManuals = manualsByDepartment[selectedDepartment]
      const manualIds = departmentManuals.map(m => m.id)
      filtered = filtered.filter(log => 
        log.entityType === 'MANUAL' && manualIds.includes(log.entityId)
      )
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(log => 
        log.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.reason?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.entityId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by entity type
    if (entityTypeFilter !== 'all') {
      filtered = filtered.filter(log => log.entityType === entityTypeFilter)
    }

    // Filter by action
    if (actionFilter !== 'all') {
      filtered = filtered.filter(log => log.action === actionFilter)
    }

    // Filter by content changes
    if (contentFilter === 'content') {
      filtered = filtered.filter(log => log.changes && (log.changes.title || log.changes.content))
    } else if (contentFilter === 'no-content') {
      filtered = filtered.filter(log => !log.changes || (!log.changes.title && !log.changes.content))
    }

    setFilteredLogs(filtered)
  }

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE': return Plus
      case 'UPDATE': return Edit
      case 'DELETE': return Trash2
      case 'ARCHIVE': return Archive
      case 'RESTORE': return RotateCcw
      default: return Edit
    }
  }

  const normalizeContent = (content: string) => {
    if (!content) return ''
    // Remove extra whitespace and normalize HTML
    return content
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim()
  }

  const hasActualChanges = (value: any) => {
    if (typeof value === 'object' && value.from && value.to) {
      // Check if from and to are actually different
      const normalizedFrom = normalizeContent(value.from)
      const normalizedTo = normalizeContent(value.to)
      return normalizedFrom !== normalizedTo
    }
    return true
  }

  const isMinimalChange = (value: any) => {
    if (typeof value === 'object' && value.from && value.to) {
      const normalizedFrom = normalizeContent(value.from)
      const normalizedTo = normalizeContent(value.to)
      return normalizedFrom === normalizedTo
    }
    return false
  }

  const getChangeSummary = (changes: Record<string, any>) => {
    const changedFields = Object.entries(changes).filter(([key, value]) => {
      if (key === 'title' || key === 'content') {
        return hasActualChanges(value)
      }
      return true
    })
    return changedFields.map(([key]) => key)
  }

  const isUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  const createDiffHighlight = (from: string, to: string) => {
    // Server-safe HTML tokenizer
    const tokenizeHtml = (html: string) => {
      const tokens: { type: 'text' | 'html' | 'whitespace', value: string }[] = []
      let lastIndex = 0
      const tagRegex = /(<[^>]+>)/g // Capture HTML tags

      let match
      while ((match = tagRegex.exec(html)) !== null) {
        // Add content before the tag
        if (match.index > lastIndex) {
          const segment = html.substring(lastIndex, match.index)
          // Split segment into words and whitespace
          segment.split(/(\s+)/).forEach(part => {
            if (part.length > 0) {
              if (/\s/.test(part)) { // Check if it's whitespace
                tokens.push({ type: 'whitespace', value: part })
              } else {
                tokens.push({ type: 'text', value: part })
              }
            }
          })
        }
        // Add the HTML tag itself
        tokens.push({ type: 'html', value: match[0] })
        lastIndex = tagRegex.lastIndex
      }

      // Add any remaining content after the last tag
      if (lastIndex < html.length) {
        const segment = html.substring(lastIndex)
        segment.split(/(\s+)/).forEach(part => {
          if (part.length > 0) {
            if (/\s/.test(part)) {
              tokens.push({ type: 'whitespace', value: part })
            } else {
              tokens.push({ type: 'text', value: part })
            }
          }
        })
      }
      return tokens
    }

    // Server-safe content normalization for comparison
    const normalizeContentForComparison = (html: string) => {
      const strippedHtml = html.replace(/<[^>]*>/g, '') // Remove HTML tags
      return strippedHtml.replace(/\s+/g, ' ').trim() // Normalize whitespace
    }

    const fromTokens = tokenizeHtml(from)
    const toTokens = tokenizeHtml(to)

    // If content is identical after normalization, return the 'to' HTML as a single unchanged item
    if (normalizeContentForComparison(from) === normalizeContentForComparison(to)) {
      return [{ type: 'unchanged', text: to }]
    }

    const diff = []
    let fromIndex = 0
    let toIndex = 0

    while (fromIndex < fromTokens.length || toIndex < toTokens.length) {
      const fromToken = fromTokens[fromIndex]
      const toToken = toTokens[toIndex]

      if (fromIndex >= fromTokens.length) {
        // Only in 'to' - added
        diff.push({ type: 'added', text: toToken.value })
        toIndex++
      } else if (toIndex >= toTokens.length) {
        // Only in 'from' - removed
        diff.push({ type: 'removed', text: fromToken.value })
        fromIndex++
      } else if (fromToken.value === toToken.value && fromToken.type === toToken.type) {
        // Identical token
        diff.push({ type: 'unchanged', text: fromToken.value })
        fromIndex++
        toIndex++
      } else {
        // Tokens are different, try to find a match by looking ahead
        let foundMatch = false

        // Look for fromToken in toTokens (ahead)
        for (let i = toIndex + 1; i < Math.min(toIndex + 5, toTokens.length); i++) {
          if (fromToken.value === toTokens[i].value && fromToken.type === toTokens[i].type) {
            // Found a match for fromToken, so the tokens in between in toTokens are 'added'
            for (let j = toIndex; j < i; j++) {
              diff.push({ type: 'added', text: toTokens[j].value })
            }
            toIndex = i // Move to the matched token
            foundMatch = true
            break
          }
        }

        if (!foundMatch) {
          // Look for toToken in fromTokens (ahead)
          for (let i = fromIndex + 1; i < Math.min(fromIndex + 5, fromTokens.length); i++) {
            if (toToken.value === fromTokens[i].value && toToken.type === fromTokens[i].type) {
              // Found a match for toToken, so the tokens in between in fromTokens are 'removed'
              for (let j = fromIndex; j < i; j++) {
                diff.push({ type: 'removed', text: fromTokens[j].value })
              }
              fromIndex = i // Move to the matched token
              foundMatch = true
              break
            }
          }
        }

        if (!foundMatch) {
          // No match found by looking ahead, treat both as changed
          diff.push({ type: 'removed', text: fromToken.value })
          diff.push({ type: 'added', text: toToken.value })
          fromIndex++
          toIndex++
        }
      }
    }
    return diff
  }

  const renderDiff = (diff: Array<{type: string, text: string}>, originalTo: string) => {
    // If it's unchanged, render the original HTML
    if (diff.length === 1 && diff[0].type === 'unchanged') {
      return (
        <div 
          className="text-slate-800 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: originalTo }}
        />
      )
    }
    
    return diff.map((item, index) => {
      if (item.type === 'added') {
        return (
          <span 
            key={index} 
            className="bg-green-100 text-green-800 px-1 rounded font-medium"
            dangerouslySetInnerHTML={{ __html: item.text }}
          />
        )
      } else if (item.type === 'removed') {
        return (
          <span 
            key={index} 
            className="bg-red-100 text-red-800 px-1 rounded line-through"
            dangerouslySetInnerHTML={{ __html: item.text }}
          />
        )
      } else {
        return (
          <span 
            key={index} 
            className="text-slate-800"
            dangerouslySetInnerHTML={{ __html: item.text }}
          />
        )
      }
    })
  }

  const formatChanges = (changes: Record<string, any>) => {
    return Object.entries(changes).map(([key, value]) => {
      // Handle special cases for title and content changes
      if (key === 'title' || key === 'content') {
        // Check if there are actual changes
        if (typeof value === 'object' && value.from && value.to) {
          // Show data even if no actual change (same content)
          if (!hasActualChanges(value)) {
            return (
              <div key={key} className="text-sm mb-4">
                <div className="font-medium text-slate-700 mb-3 capitalize flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {key}
                  <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                    Unchanged
                  </Badge>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm text-gray-600">
                    <strong>Content:</strong>
                    <div className="mt-1 p-2 bg-white rounded border text-gray-800 prose prose-sm max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: value.to }} />
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          
          const isMinimal = isMinimalChange(value)
          const diff = createDiffHighlight(value.from, value.to)
          
          return (
            <div key={key} className="text-sm mb-4">
              <div className="font-medium text-slate-700 mb-3 capitalize flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {key} Changes
                {isMinimal && (
                  <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                    Formatting Only
                  </Badge>
                )}
              </div>
              <div className="border rounded-lg overflow-hidden bg-white">
                <div className="bg-slate-50 px-4 py-2 border-b text-xs font-medium text-slate-600 flex items-center gap-2">
                  <FileText className="h-3 w-3" />
                  {key}
                </div>
                <div className="p-4">
                  <div className="prose prose-sm max-w-none">
                    {renderDiff(diff, value.to)}
                  </div>
                </div>
              </div>
            </div>
          )
        } else if (typeof value === 'object' && value.to) {
          // Handle object with just 'to' property (like CREATE actions)
          return (
            <div key={key} className="text-sm mb-4">
              <div className="font-medium text-slate-700 mb-3 capitalize flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {key} Created
              </div>
              <div className="border rounded-lg overflow-hidden bg-white">
                <div className="bg-green-50 px-4 py-2 border-b text-xs font-medium text-green-700 flex items-center gap-2">
                  <Plus className="h-3 w-3" />
                  New {key}
                </div>
                <div className="p-4">
                  <div 
                    className="text-slate-800 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: String(value.to) }}
                  />
                </div>
              </div>
            </div>
          )
        } else {
          // Single value change
          return (
            <div key={key} className="text-sm mb-4">
              <div className="font-medium text-slate-700 mb-2 capitalize">{key}:</div>
              <div className="p-3 bg-slate-50 rounded border">
                <div 
                  className="text-slate-800 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: String(value) }}
                />
              </div>
            </div>
          )
        }
      }
      
      // Handle description field specially
      if (key === 'description') {
        if (typeof value === 'object' && value.to) {
          return (
            <div key={key} className="text-sm mb-4">
              <div className="font-medium text-slate-700 mb-3 capitalize flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {key} Created
              </div>
              <div className="border rounded-lg overflow-hidden bg-white">
                <div className="bg-green-50 px-4 py-2 border-b text-xs font-medium text-green-700 flex items-center gap-2">
                  <Plus className="h-3 w-3" />
                  New {key}
                </div>
                <div className="p-4">
                  <div 
                    className="text-slate-800 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: String(value.to) }}
                  />
                </div>
              </div>
            </div>
          )
        } else {
          return (
            <div key={key} className="text-sm mb-4">
              <div className="font-medium text-slate-700 mb-2 capitalize">{key}:</div>
              <div className="p-3 bg-slate-50 rounded border">
                <div 
                  className="text-slate-800 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: String(value) }}
                />
              </div>
            </div>
          )
        }
      }
      
      // Handle other change types
      if (typeof value === 'object' && value.to) {
        // Object with 'to' property
        return (
          <div key={key} className="text-sm mb-3">
            <span className="font-medium text-slate-600 capitalize">{key}:</span>
            <div className="mt-1 p-2 bg-green-50 rounded border border-green-200">
              <div className="text-sm text-slate-800">
                {typeof value.to === 'string' ? value.to : JSON.stringify(value.to, null, 2)}
              </div>
            </div>
          </div>
        )
      }
      
      return (
        <div key={key} className="text-sm mb-3">
          <span className="font-medium text-slate-600 capitalize">{key}:</span>
          <div className="mt-1 p-2 bg-slate-50 rounded border">
            <div className="text-sm text-slate-800">
              {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
            </div>
          </div>
        </div>
      )
    }).filter(Boolean) // Remove null entries (unchanged sections)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <History className="h-8 w-8 text-primary" />
            Recent correction
          </h1>
          <p className="text-muted-foreground">
            Track all modifications and changes made to the railway rule system
          </p>
        </div>

        {/* Department Tabs */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-50 hover:bg-blue-100 border-blue-200"
              onClick={() => {
                const currentIndex = departments.findIndex(d => d.value === selectedDepartment)
                if (currentIndex > 0) {
                  setSelectedDepartment(departments[currentIndex - 1].value)
                }
              }}
              disabled={departments.findIndex(d => d.value === selectedDepartment) === 0}
              suppressHydrationWarning
            >
              <ChevronLeft className="h-5 w-5 text-blue-600" />
            </Button>
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2">
                {departments.map((dept) => (
                  <Button
                    key={dept.value}
                    variant={selectedDepartment === dept.value ? 'default' : 'outline'}
                    className={`flex-shrink-0 rounded-lg px-6 ${
                      selectedDepartment === dept.value
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                    }`}
                    onClick={() => setSelectedDepartment(dept.value)}
                    suppressHydrationWarning
                  >
                    {dept.label}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-50 hover:bg-blue-100 border-blue-200"
              onClick={() => {
                const currentIndex = departments.findIndex(d => d.value === selectedDepartment)
                if (currentIndex < departments.length - 1) {
                  setSelectedDepartment(departments[currentIndex + 1].value)
                }
              }}
              disabled={departments.findIndex(d => d.value === selectedDepartment) === departments.length - 1}
              suppressHydrationWarning
            >
              <ChevronRight className="h-5 w-5 text-blue-600" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by user, reason, or entity ID..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  suppressHydrationWarning
                />
              </div>
              
              <Select value={entityTypeFilter} onValueChange={setEntityTypeFilter}>
                <SelectTrigger suppressHydrationWarning>
                  <SelectValue placeholder="Entity Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Entity Types</SelectItem>
                  {Object.entries(entityTypeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger suppressHydrationWarning>
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {Object.entries(actionLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={contentFilter} onValueChange={setContentFilter}>
                <SelectTrigger suppressHydrationWarning>
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Changes</SelectItem>
                  <SelectItem value="content">Content Changes</SelectItem>
                  <SelectItem value="no-content">Other Changes</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={fetchChangeLogs} variant="outline" className="w-full" suppressHydrationWarning>
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Change Logs List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading recent corrections...</p>
            </div>
          </div>
        ) : filteredLogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No recent corrections found</h3>
              <p className="text-muted-foreground">
                {changeLogs.length === 0 
                  ? "No changes have been recorded yet."
                  : "No recent corrections match your current filters."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredLogs.map((log) => {
              const ActionIcon = getActionIcon(log.action)
              const EntityIcon = entityIcons[log.entityType]
              const isExpanded = expandedItems.has(log.id)
              
              return (
                <Card key={log.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className="p-2 rounded-lg bg-slate-100">
                            <ActionIcon className="h-5 w-5 text-slate-600" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-1 text-sm text-slate-800 font-bold">
                              <EntityIcon className="h-4 w-4" />
                              {entityTypeLabels[log.entityType]}
                            </div>
                            <div className="text-sm text-slate-500">
                              ID: {log.entityId}
                            </div>
                            {log.changes && Object.keys(log.changes).length > 0 && (
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  log.action === 'CREATE' 
                                    ? 'bg-green-50 text-green-700 border-green-200' 
                                    : log.action === 'UPDATE'
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : log.action === 'DELETE'
                                    ? 'bg-red-50 text-red-700 border-red-200'
                                    : 'bg-gray-50 text-gray-700 border-gray-200'
                                }`}
                              >
                                {actionLabels[log.action]}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {log.user?.name || log.user?.email || 'Unknown'}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                            </div>
                          </div>
                          
                          {log.reason && (
                            <p className="text-sm text-slate-700 mb-3">
                              <span className="font-medium">Reason:</span> {log.reason}
                            </p>
                          )}
                          
                          {log.supportingDoc && (
                            <div className="mb-3">
                              {isUrl(log.supportingDoc) ? (
                                <div className="flex items-center gap-2">
                                  
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(log.supportingDoc, '_blank')}
                                    className="flex items-center gap-1 text-xs"
                                    suppressHydrationWarning
                                  >
                                    <Link className="h-3 w-3" />
                                    View Supporting Document
                                  </Button>
                                </div>
                              ) : (
                                <p className="text-sm text-slate-700">
                                  <span className="font-medium flex items-center gap-2 mb-1">
                                    Supporting Text: 
                                    <span className="text-slate-700 font-normal">{log.supportingDoc}</span>
                                  </span>
                                  
                                </p>
                              )}
                            </div>
                          )}
                          
                          {log.changes && Object.keys(log.changes).length > 0 && (
                            <div className="mb-3">
                              <div className="text-sm text-slate-600 mb-1">
                                <span className="font-medium">
                                  {log.action === 'CREATE' ? 'Created:' : 'Changed:'}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {getChangeSummary(log.changes).map((field) => (
                                  <Badge 
                                    key={field} 
                                    variant="outline" 
                                    className={`text-xs ${
                                      log.action === 'CREATE' 
                                        ? 'bg-green-50 text-green-700 border-green-200' 
                                        : 'bg-blue-50 text-blue-700 border-blue-200'
                                    }`}
                                  >
                                    {field}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {Object.keys(log.changes).length > 0 && (
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleExpanded(log.id)}
                                className="p-0 h-auto text-slate-600 hover:text-slate-800"
                                suppressHydrationWarning
                              >
                                {isExpanded ? (
                                  <>
                                    <ChevronUp className="h-4 w-4 mr-1" />
                                    Hide Details
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="h-4 w-4 mr-1" />
                                    Show Details
                                  </>
                                )}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push(`/changelog/${log.id}`)}
                                className="text-xs"
                                suppressHydrationWarning
                              >
                                View Full Details
                              </Button>
                            </div>
                          )}
                          
                          {isExpanded && Object.keys(log.changes).length > 0 && (
                            <div className="mt-4 p-4 bg-slate-50 rounded-lg border">
                              <h4 className="font-medium text-slate-800 mb-4 flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Changes Made:
                              </h4>
                              <div className="space-y-4">
                                {(() => {
                                  const changes = formatChanges(log.changes)
                                  if (changes.length === 0) {
                                    return (
                                      <div className="space-y-4">
                                        <div className="text-center py-4 text-slate-500 border-b border-slate-200">
                                          <FileText className="h-6 w-6 mx-auto mb-2 text-slate-400" />
                                          <p className="text-sm">No structured changes detected</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-md">
                                          <h5 className="font-medium text-slate-700 mb-2">Content:</h5>
                                          <div className="prose prose-sm max-w-none bg-white p-3 rounded border">
                                            {Object.entries(log.changes).map(([key, value]) => {
                                              if (typeof value === 'object' && value.to) {
                                                return (
                                                  <div key={key} className="mb-4">
                                                    <h6 className="font-medium text-slate-700 mb-2 capitalize">{key}:</h6>
                                                    <div 
                                                      className="text-slate-600"
                                                      dangerouslySetInnerHTML={{ __html: value.to }}
                                                    />
                                                  </div>
                                                )
                                              }
                                              return null
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  }
                                  return changes
                                })()}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Summary Stats */}
        {!isLoading && changeLogs.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">{changeLogs.length}</div>
                  <div className="text-sm text-slate-600">Total Changes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {changeLogs.filter(log => log.action === 'CREATE').length}
                  </div>
                  <div className="text-sm text-slate-600">Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {changeLogs.filter(log => log.action === 'UPDATE').length}
                  </div>
                  <div className="text-sm text-slate-600">Updated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {changeLogs.filter(log => log.action === 'DELETE').length}
                  </div>
                  <div className="text-sm text-slate-600">Deleted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {new Set(changeLogs.map(log => log.userId)).size}
                  </div>
                  <div className="text-sm text-slate-600">Users</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
