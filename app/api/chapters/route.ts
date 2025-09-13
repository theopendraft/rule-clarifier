import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
        subChapters: {
          include: {
            rules: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    })

    // Log the changes
    if (userId) {
      await prisma.changeLog.create({
        data: {
          entityType: 'CHAPTER',
          entityId: chapter.id,
          action: 'CREATE',
          changes: { bookId, number, title, subtitle, section, order },
          reason: reason || 'Chapter created',
          userId,
        },
      })
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
