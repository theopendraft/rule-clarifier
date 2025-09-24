import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPDF } from '../../../lib/pdf-extractor';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pdfBuffer } = body;
    
    if (!pdfBuffer || !Array.isArray(pdfBuffer)) {
      return NextResponse.json(
        { error: 'PDF buffer is required' },
        { status: 400 }
      );
    }
    
    const buffer = Buffer.from(pdfBuffer);
    const extractedContent = await extractTextFromPDF(buffer);
    
    return NextResponse.json({
      success: true,
      content: extractedContent
    });
  } catch (error) {
    console.error('PDF extraction error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to extract PDF content',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}