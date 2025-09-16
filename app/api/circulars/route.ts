import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Check if circulars table exists by trying a simple query first
    const circulars = await prisma.circular.findMany({
      // No select needed to fetch all fields; remove select block
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
    
    // Check if it's a table doesn't exist error
    if (error instanceof Error && error.message.includes('relation "circulars" does not exist')) {
      console.error('Circulars table does not exist - migration may not have been applied')
      return NextResponse.json(
        { error: 'Circulars table not found. Please run database migrations.' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch circulars' },
      { status: 500 }
    )
  }
}