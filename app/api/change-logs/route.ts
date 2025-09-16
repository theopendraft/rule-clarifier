import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { EntityType } from '@prisma/client'
import { createNotificationFromChangeLog, createNotificationForRole } from '@/lib/notification-utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const entityType = searchParams.get('entityType')
    const entityId = searchParams.get('entityId')
    const limit = parseInt(searchParams.get('limit') || '50')

    const changeLogs = await prisma.changeLog.findMany({
      where: {
        ...(entityType && { entityType: entityType as EntityType }),
        ...(entityId && { entityId: entityId as string }),
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        user: {
          select: { email: true, name: true }
        }
      }
    })

    return NextResponse.json(changeLogs)
  } catch (error) {
    console.error('Error fetching change logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch change logs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { entityType, entityId, action, changes, reason, userId } = await request.json()

    const changeLog = await prisma.changeLog.create({
      data: {
        entityType: entityType as EntityType,
        entityId,
        action,
        changes,
        reason,
        userId,
      },
      include: {
        user: {
          select: { email: true, name: true }
        }
      }
    })

    // Create notification for the change
    try {
      await createNotificationFromChangeLog({
        id: changeLog.id,
        entityType: changeLog.entityType,
        entityId: changeLog.entityId,
        action: changeLog.action,
        reason: changeLog.reason,
        userId: changeLog.userId,
      });
    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
      // Don't fail the change log creation if notification fails
    }

    return NextResponse.json(changeLog)
  } catch (error) {
    console.error('Error creating change log:', error)
    return NextResponse.json(
      { error: 'Failed to create change log' },
      { status: 500 }
    )
  }
}