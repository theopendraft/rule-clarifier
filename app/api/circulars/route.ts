import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const circulars = await prisma.circular.findMany({
      orderBy: [
        { isActive: 'desc' },
        { date: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(circulars)
  } catch (error) {
    console.error('Error fetching circulars:', error)
    return NextResponse.json(
      { error: 'Failed to fetch circulars' },
      { status: 500 }
    )
  }
}