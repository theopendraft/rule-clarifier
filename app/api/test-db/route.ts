import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('Test DB API - Starting database test')
    
    // Test basic connection
    const count = await prisma.circular.count()
    console.log('Test DB API - Circular count:', count)
    
    // Test getting first circular
    const firstCircular = await prisma.circular.findFirst({
      select: {
        id: true,
        code: true,
        title: true
      }
    })
    console.log('Test DB API - First circular:', firstCircular)
    
    return NextResponse.json({
      success: true,
      count,
      firstCircular,
      message: 'Database connection successful'
    })
  } catch (error) {
    console.error('Test DB API - Error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
