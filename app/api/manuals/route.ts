import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const manuals = await prisma.manual.findMany({
      orderBy: [
        { code: 'asc' }
      ]
    })

    console.log('Manuals API - Raw data:', manuals) // Debug log

    return NextResponse.json(manuals)
  } catch (error) {
    console.error('Error fetching manuals:', error)
    
    // Check if it's a table doesn't exist error
    if (error instanceof Error && error.message.includes('relation "manuals" does not exist')) {
      console.error('Manuals table does not exist - migration may not have been applied')
      return NextResponse.json(
        { error: 'Manuals table not found. Please run database migrations.' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch manuals' },
      { status: 500 }
    )
  }
}