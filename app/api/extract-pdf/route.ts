import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPDFUrl } from '../../../lib/pdf-extractor';

export async function POST(request: NextRequest) {
  try {
    const { pdfUrl } = await request.json();
    
    if (!pdfUrl) {
      return NextResponse.json(
        { error: 'PDF URL is required' },
        { status: 400 }
      );
    }

    // Extract text from PDF
    const extractedContent = await extractTextFromPDFUrl(pdfUrl);
    
    return NextResponse.json({
      success: true,
      content: extractedContent
    });
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    return NextResponse.json(
      { error: 'Failed to extract text from PDF' },
      { status: 500 }
    );
  }
}
