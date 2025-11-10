import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { NotificationType } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const isRead = searchParams.get('isRead')
    const limit = parseInt(searchParams.get('limit') || '50')
    const type = searchParams.get('type') as NotificationType

    if (!userId) {
      return NextResponse.json([], { status: 200 })
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
        ...(isRead !== null && { isRead: isRead === 'true' }),
        ...(type && { type }),
      },
      include: {
        changelog: {
          include: {
            user: {
              select: { email: true, name: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return NextResponse.json(notifications || [])
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, title, message, type, entityType, entityId, changelogId } = await request.json()

    if (!userId || !title || !message) {
      return NextResponse.json(
        { error: 'User ID, title, and message are required' },
        { status: 400 }
      )
    }

    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type: type || NotificationType.INFO,
        entityType,
        entityId,
        changelogId,
      },
    })

    return NextResponse.json(notification)
  } catch (error) {
    console.error('Error creating notification:', error)
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { notificationIds, isRead } = await request.json()

    if (!notificationIds || !Array.isArray(notificationIds)) {
      return NextResponse.json(
        { error: 'Notification IDs array is required' },
        { status: 400 }
      )
    }

    const updatedNotifications = await prisma.notification.updateMany({
      where: {
        id: { in: notificationIds },
      },
      data: {
        isRead: isRead ?? true,
      },
    })

    return NextResponse.json({ 
      message: `Updated ${updatedNotifications.count} notifications`,
      count: updatedNotifications.count 
    })
  } catch (error) {
    console.error('Error updating notifications:', error)
    return NextResponse.json(
      { error: 'Failed to update notifications' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const notificationId = searchParams.get('id')
    const userId = searchParams.get('userId')

    if (notificationId) {
      // Delete specific notification
      await prisma.notification.delete({
        where: { id: notificationId },
      })
    } else if (userId) {
      // Delete all notifications for user
      await prisma.notification.deleteMany({
        where: { userId },
      })
    } else {
      return NextResponse.json(
        { error: 'Notification ID or User ID is required' },
        { status: 400 }
      )
    }

    return NextResponse.json({ message: 'Notifications deleted successfully' })
  } catch (error) {
    console.error('Error deleting notifications:', error)
    return NextResponse.json(
      { error: 'Failed to delete notifications' },
      { status: 500 }
    )
  }
}
