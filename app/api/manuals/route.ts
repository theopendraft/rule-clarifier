import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'
import { storePDFContent } from '../../../lib/pdf-content-service'
import { utapi } from '../../../lib/uploadthing'

export async function GET() {
  try {
    const manuals = await prisma.manual.findMany({
      orderBy: [
        { createdAt: 'desc' }
      ]
    })

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

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const code = formData.get('code') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const version = formData.get('version') as string
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

    // Create manual record
    const manual = await prisma.manual.create({
      data: {
        code,
        title,
        description: description || null,
        version: version || null,
        pdfUrl: uploadedFile.data.url,
        pdfFileName: pdfFile.name,
        isActive: true
      }
    })

    // Extract and store PDF content from uploaded URL
    await storePDFContent(uploadedFile.data.url, 'manual', manual.id)

    return NextResponse.json(manual)
  } catch (error) {
    console.error('Error creating manual:', error)
    return NextResponse.json(
      { error: 'Failed to create manual' },
      { status: 500 }
    )
  }
}