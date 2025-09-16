import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    
    console.log('Manual GET API - Request URL:', request.url)
    console.log('Manual GET API - Fetching ID from query params:', id)
    
    if (!id) {
      console.log('Manual GET API - No ID provided in query params')
      return NextResponse.json(
        { error: 'ID parameter is required' },
        { status: 400 }
      )
    }
    
    const manual = await prisma.manual.findUnique({
      where: { id },
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
      }
    })

    console.log('Manual GET API - Found manual:', manual ? 'Yes' : 'No')

    if (!manual) {
      console.log('Manual GET API - Manual not found for ID:', id)
      return NextResponse.json(
        { error: 'Manual not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(manual)
  } catch (error) {
    console.error('Error fetching manual:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: 'Failed to fetch manual' },
      { status: 500 }
    )
  }
}
