import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createNotificationFromChangeLog } from '@/lib/notification-utils'

export async function POST(request: NextRequest) {
  try {
    const { bookId, number, title, subtitle, section, order, userId, reason } = await request.json()

    const chapter = await prisma.chapter.create({
      data: {
        bookId,
        number,
        title,
        subtitle,
        section,
        order: order || 0,
      },
      include: {
        rules: {
          orderBy: { order: 'asc' },
        },
      },
    })

    // Log the changes
    if (userId) {
      const changeLog = await prisma.changeLog.create({
        data: {
          entityType: 'CHAPTER',
          entityId: chapter.id,
          action: 'CREATE',
          changes: { bookId, number, title, subtitle, section, order },
          reason: reason || 'Chapter created',
          userId,
        },
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
        // Don't fail the chapter creation if notification fails
      }
    }

    return NextResponse.json(chapter)
  } catch (error) {
    console.error('Error creating chapter:', error)
    return NextResponse.json(
      { error: 'Failed to create chapter' },
      { status: 500 }
    )
  }
}
