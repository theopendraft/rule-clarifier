import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { chapterId, subChapterId, number, title, content, order, userId, reason } = await request.json()

    const rule = await prisma.rule.create({
      data: {
        chapterId,
        subChapterId,
        number,
        title,
        content,
        order: order || 0,
      },
      include: {
        contentBlocks: {
          orderBy: { order: 'asc' },
        },
        links: {
          orderBy: { order: 'asc' },
        },
      },
    })

    // Log the changes
    if (userId) {
      await prisma.changeLog.create({
        data: {
          entityType: 'RULE',
          entityId: rule.id,
          action: 'CREATE',
          changes: { chapterId, subChapterId, number, title, content, order },
          reason: reason || 'Rule created',
          userId,
        },
      })
    }

    return NextResponse.json(rule)
  } catch (error) {
    console.error('Error creating rule:', error)
    return NextResponse.json(
      { error: 'Failed to create rule' },
      { status: 500 }
    )
  }
}
