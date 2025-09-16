import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    
    console.log('Circular GET API - Request URL:', request.url)
    console.log('Circular GET API - Fetching ID from query params:', id)
    
    if (!id) {
      console.log('Circular GET API - No ID provided in query params')
      return NextResponse.json(
        { error: 'ID parameter is required' },
        { status: 400 }
      )
    }
    
    const circular = await prisma.circular.findUnique({
      where: { id },
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
      }
    })

    console.log('Circular GET API - Found circular:', circular ? 'Yes' : 'No')

    if (!circular) {
      console.log('Circular GET API - Circular not found for ID:', id)
      return NextResponse.json(
        { error: 'Circular not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(circular)
  } catch (error) {
    console.error('Error fetching circular:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: 'Failed to fetch circular' },
      { status: 500 }
    )
  }
}
