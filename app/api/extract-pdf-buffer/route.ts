import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPDF } from '../../../lib/pdf-extractor';

export async function POST(request: NextRequest) {
  try {
    const arrayBuffer = await request.arrayBuffer();
    
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      return NextResponse.json(
        { error: 'PDF buffer is required' },
        { status: 400 }
      );
    }
    
    const pdfBuffer = Buffer.from(arrayBuffer);
    const extractedContent = await extractTextFromPDF(pdfBuffer);
    
    return NextResponse.json({
      success: true,
      content: extractedContent
    });
  } catch (error) {
    console.error('PDF extraction API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to extract text from PDF: ${errorMessage}` },
      { status: 500 }
    );
  }
}