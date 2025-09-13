import { EntityType } from '@prisma/client'

export interface ChangeLogData {
  entityType: EntityType
  entityId: string
  action: string
  changes: Record<string, any>
  reason: string
  userId: string
}

export async function logChange(data: ChangeLogData) {
  try {
    const response = await fetch('/api/change-logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      console.error('Failed to log change:', await response.text())
    }
  } catch (error) {
    console.error('Error logging change:', error)
  }
}

export function createChangeLog(
  entityType: EntityType,
  entityId: string,
  action: string,
  changes: Record<string, any>,
  reason: string,
  userId: string
): ChangeLogData {
  return {
    entityType,
    entityId,
    action,
    changes,
    reason,
    userId,
  }
}
