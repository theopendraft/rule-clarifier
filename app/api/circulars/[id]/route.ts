import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('Circular API - Fetching ID:', id)
    
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

    console.log('Circular API - Found circular:', circular ? 'Yes' : 'No')

    if (!circular) {
      console.log('Circular API - Circular not found for ID:', id)
      return NextResponse.json(
        { error: 'Circular not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(circular)
  } catch (error) {
    console.error('Error fetching circular:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: 'Failed to fetch circular' },
      { status: 500 }
    )
  }
}
