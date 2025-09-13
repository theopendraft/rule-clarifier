import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { title, content, order, isActive, userId, reason } = await request.json()

    const oldData = await prisma.rule.findUnique({ where: { id } })
    
    const updatedRule = await prisma.rule.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
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
          entityId: id,
          action: 'UPDATE',
          changes: { old: oldData, new: { title, content, order, isActive } },
          reason: reason || 'Rule updated',
          userId,
        },
      })
    }

    return NextResponse.json(updatedRule)
  } catch (error) {
    console.error('Error updating rule:', error)
    return NextResponse.json(
      { error: 'Failed to update rule' },
      { status: 500 }
    )
  }
}
