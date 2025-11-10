// Optimized changelog storage utilities

export interface ChangelogEntry {
  entityType: string
  entityId: string
  action: 'CREATE' | 'UPDATE' | 'DELETE'
  metadata: {
    title?: string
    code?: string
    link: string
  }
  changes: FieldChange[]
  changedSections?: string[] // IDs of changed divs for highlighting
}

export interface FieldChange {
  field: string
  type: 'text' | 'html' | 'json' | 'file'
  operation: 'add' | 'modify' | 'delete'
  oldValue?: any
  newValue?: any
  diff?: DiffSegment[] // For text/html changes
}

export interface DiffSegment {
  type: 'add' | 'remove' | 'unchanged'
  content: string
}

// Extract text content from HTML for comparison
function extractTextContent(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Create semantic diff for text content
function createTextDiff(oldText: string, newText: string): DiffSegment[] {
  const oldWords = oldText.split(/\s+/)
  const newWords = newText.split(/\s+/)
  const diff: DiffSegment[] = []
  
  let i = 0, j = 0
  
  while (i < oldWords.length || j < newWords.length) {
    if (i >= oldWords.length) {
      diff.push({ type: 'add', content: newWords.slice(j).join(' ') })
      break
    }
    if (j >= newWords.length) {
      diff.push({ type: 'remove', content: oldWords.slice(i).join(' ') })
      break
    }
    
    if (oldWords[i] === newWords[j]) {
      const unchanged: string[] = []
      while (i < oldWords.length && j < newWords.length && oldWords[i] === newWords[j]) {
        unchanged.push(oldWords[i])
        i++
        j++
      }
      diff.push({ type: 'unchanged', content: unchanged.join(' ') })
    } else {
      // Find next match
      let foundMatch = false
      for (let k = j + 1; k < Math.min(j + 10, newWords.length); k++) {
        if (oldWords[i] === newWords[k]) {
          diff.push({ type: 'add', content: newWords.slice(j, k).join(' ') })
          j = k
          foundMatch = true
          break
        }
      }
      
      if (!foundMatch) {
        for (let k = i + 1; k < Math.min(i + 10, oldWords.length); k++) {
          if (newWords[j] === oldWords[k]) {
            diff.push({ type: 'remove', content: oldWords.slice(i, k).join(' ') })
            i = k
            foundMatch = true
            break
          }
        }
      }
      
      if (!foundMatch) {
        diff.push({ type: 'remove', content: oldWords[i] })
        diff.push({ type: 'add', content: newWords[j] })
        i++
        j++
      }
    }
  }
  
  return diff
}

// Detect changed sections in HTML
export function detectChangedSections(oldHtml: string, newHtml: string): string[] {
  const divRegex = /<div[^>]*id="([^"]+)"[^>]*>(.*?)<\/div>/gs
  const changedIds: string[] = []
  
  const oldDivs = new Map<string, string>()
  const newDivs = new Map<string, string>()
  
  let match
  while ((match = divRegex.exec(oldHtml)) !== null) {
    oldDivs.set(match[1], extractTextContent(match[2]))
  }
  
  divRegex.lastIndex = 0
  while ((match = divRegex.exec(newHtml)) !== null) {
    newDivs.set(match[1], extractTextContent(match[2]))
  }
  
  // Check for changes
  for (const [id, newContent] of newDivs) {
    const oldContent = oldDivs.get(id)
    if (!oldContent || oldContent !== newContent) {
      changedIds.push(id)
    }
  }
  
  return changedIds
}

// Create optimized changelog entry
export function createChangelogEntry(
  entityType: string,
  entityId: string,
  action: 'CREATE' | 'UPDATE' | 'DELETE',
  oldData: any,
  newData: any,
  metadata: { title?: string; code?: string; link: string }
): ChangelogEntry {
  const changes: FieldChange[] = []
  const changedSections: string[] = []
  
  if (action === 'CREATE') {
    // For CREATE, only store new values
    if (newData.description) {
      changes.push({
        field: 'description',
        type: 'html',
        operation: 'add',
        newValue: extractTextContent(newData.description).substring(0, 500) // Store summary
      })
    }
    if (newData.title) {
      changes.push({
        field: 'title',
        type: 'text',
        operation: 'add',
        newValue: newData.title
      })
    }
  } else if (action === 'UPDATE') {
    // Compare fields
    if (oldData.title !== newData.title) {
      changes.push({
        field: 'title',
        type: 'text',
        operation: 'modify',
        oldValue: oldData.title,
        newValue: newData.title
      })
    }
    
    if (oldData.description !== newData.description) {
      const oldText = extractTextContent(oldData.description || '')
      const newText = extractTextContent(newData.description || '')
      
      // Only store diff if content actually changed
      if (oldText !== newText) {
        const diff = createTextDiff(oldText, newText)
        changes.push({
          field: 'description',
          type: 'html',
          operation: 'modify',
          diff
        })
        
        // Detect which sections changed
        changedSections.push(...detectChangedSections(oldData.description || '', newData.description || ''))
      }
    }
  }
  
  return {
    entityType,
    entityId,
    action,
    metadata,
    changes,
    changedSections: changedSections.length > 0 ? changedSections : undefined
  }
}

// Calculate storage size (for monitoring)
export function calculateStorageSize(entry: ChangelogEntry): number {
  return JSON.stringify(entry).length
}
