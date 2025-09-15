import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const manuals = await prisma.manual.findMany({
      orderBy: [
        { isActive: 'desc' },
        { version: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(manuals)
  } catch (error) {
    console.error('Error fetching manuals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch manuals' },
      { status: 500 }
    )
  }
}