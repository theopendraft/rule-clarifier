import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const manuals = await prisma.manual.findMany({
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
      },
      orderBy: [
        { isActive: 'desc' },
        { version: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    console.log('Manuals API - Raw data:', manuals) // Debug log

    return NextResponse.json(manuals)
  } catch (error) {
    console.error('Error fetching manuals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch manuals' },
      { status: 500 }
    )
  }
}