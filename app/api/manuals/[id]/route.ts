import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { description, supportingDoc, changeReason, docType } = body

    // Update manual
    const updatedManual = await prisma.manual.update({
      where: { id },
      data: { description }
    })

    // Create change log
    await prisma.changeLog.create({
      data: {
        entityType: 'MANUAL',
        entityId: id,
        changeType: 'UPDATE',
        description: changeReason,
        supportingDoc,
        docType: docType.toUpperCase(),
        userId: 'cmflolqqc00006vyvs484vwgq'
      }
    })

    return NextResponse.json(updatedManual)
  } catch (error) {
    console.error('Error updating manual:', error)
    return NextResponse.json(
      { error: 'Failed to update manual' },
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
