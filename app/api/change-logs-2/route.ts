import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const entityType = searchParams.get('entityType')
    const entityId = searchParams.get('entityId')
    const limit = parseInt(searchParams.get('limit') || '50')

    const changeLogs = await prisma.changeLog2.findMany({
      where: {
        ...(entityType && { entityType: entityType as any }),
        ...(entityId && { entityId })
      },
      include: {
        user: {
          select: { email: true, name: true }
        },
        divChanges: true
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    return NextResponse.json(changeLogs)
  } catch (error) {
    console.error('Error fetching change logs:', error)
    return NextResponse.json([], { status: 200 })
  }
}
