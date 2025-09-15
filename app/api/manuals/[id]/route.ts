import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const manual = await prisma.manual.findUnique({
      where: { id }
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
