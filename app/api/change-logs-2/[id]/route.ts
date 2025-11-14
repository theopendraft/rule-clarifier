import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const changeLog = await prisma.changeLog2.findUnique({
      where: { id },
      include: {
        user: {
          select: { email: true, name: true }
        },
        divChanges: true
      }
    })

    if (!changeLog) {
      return NextResponse.json({ error: 'Change log not found' }, { status: 404 })
    }

    return NextResponse.json(changeLog)
  } catch (error) {
    console.error('Error fetching change log:', error)
    return NextResponse.json({ error: 'Failed to fetch change log' }, { status: 500 })
  }
}
