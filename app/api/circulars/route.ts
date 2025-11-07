import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'
import { storePDFContent } from '../../../lib/pdf-content-service'
import { utapi } from '../../../lib/uploadthing'

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

   

    return NextResponse.json(circulars)
  } catch (error) {
    console.error('Error fetching circulars:', error)
    
    // Check if it's a database quota exceeded error
    if (error instanceof Error && error.message.includes('data transfer quota')) {
      return NextResponse.json(
        { error: 'Database quota exceeded. Please upgrade your plan or try again later.' },
        { status: 503 }
      )
    }
    
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

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const code = formData.get('code') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const number = formData.get('number') as string
    const date = formData.get('date') as string
    const pdfFile = formData.get('pdf') as File

    if (!code || !title || !pdfFile) {
      return NextResponse.json(
        { error: 'Code, title, and PDF file are required' },
        { status: 400 }
      )
    }

    // Upload PDF to UploadThing
    const uploadResponse = await utapi.uploadFiles([pdfFile])
    const uploadedFile = uploadResponse[0]

    if (!uploadedFile.data) {
      return NextResponse.json(
        { error: 'Failed to upload PDF' },
        { status: 500 }
      )
    }

    // Create circular record
    const circular = await prisma.circular.create({
      data: {
        code,
        title,
        description: description || null,
        number: number || null,
        date: date ? new Date(date) : null,
        pdfUrl: uploadedFile.data.url,
        pdfFileName: pdfFile.name,
        isActive: true
      }
    })

    // Extract and store PDF content from uploaded URL
    await storePDFContent(uploadedFile.data.url, 'circular', circular.id)

    return NextResponse.json(circular)
  } catch (error) {
    console.error('Error creating circular:', error)
    return NextResponse.json(
      { error: 'Failed to create circular' },
      { status: 500 }
    )
  }
}