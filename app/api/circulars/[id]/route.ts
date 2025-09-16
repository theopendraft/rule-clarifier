import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const circular = await prisma.circular.findUnique({
      where: { id },
      select: {
        id: true,
        code: true,
        title: true,
        description: true,
        number: true,
        date: true,
        pdfUrl: true,
        pdfFileName: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!circular) {
      return NextResponse.json(
        { error: 'Circular not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(circular)
  } catch (error) {
    console.error('Error fetching circular:', error)
    return NextResponse.json(
      { error: 'Failed to fetch circular' },
      { status: 500 }
    )
  }
}
