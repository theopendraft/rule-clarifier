import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { description, supportingDoc, changeReason } = body

    // Update manual
    const updatedManual = await prisma.manual.update({
      where: { id },
      data: { description }
    })

    // Create change log
    const changeLog = await prisma.changeLog.create({
      data: {
        entityType: 'MANUAL',
        entityId: id,
        action: 'UPDATE',
        changes: { description: 'Manual content updated' },
        reason: changeReason || 'Manual updated',
        supportingDoc: supportingDoc || null,
        userId: 'cmflolqqc00006vyvs484vwgq'
      }
    })

    // Create notifications for all users
    const users = await prisma.user.findMany({
      where: { id: { not: 'cmflolqqc00006vyvs484vwgq' } }
    })

    await Promise.all(
      users.map(user =>
        prisma.notification.create({
          data: {
            userId: user.id,
            title: `Manual Updated: ${updatedManual.title}`,
            message: changeReason || 'Manual content has been updated',
            type: 'CHANGE',
            entityType: 'MANUAL',
            entityId: id,
            changelogId: changeLog.id
          }
        })
      )
    )

    return NextResponse.json({ success: true, manual: updatedManual })
  } catch (error: any) {
    console.error('Error updating manual:', error)
    return NextResponse.json(
      { error: 'Failed to update manual', details: error?.message },
      { status: 500 }
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const manual = await prisma.manual.findUnique({
      where: { id },
      select: {
        id: true,
        code: true,
        title: true,
        description: true,
        version: true,
        pdfUrl: true,
        pdfFileName: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!manual) {
      return NextResponse.json(
        { error: 'Manual not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(manual)
  } catch (error) {
    console.error('Error fetching manual:', error)
    return NextResponse.json(
      { error: 'Failed to fetch manual' },
      { status: 500 }
    )
  }
}
