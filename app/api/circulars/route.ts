import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const circulars = await prisma.circular.findMany({
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
      },
      orderBy: [
        { isActive: 'desc' },
        { date: 'desc' },
        { updatedAt: 'desc' }
      ]
    })

    console.log('Circulars API - Raw data:', circulars) // Debug log

    return NextResponse.json(circulars)
  } catch (error) {
    console.error('Error fetching circulars:', error)
    return NextResponse.json(
      { error: 'Failed to fetch circulars' },
      { status: 500 }
    )
  }
}