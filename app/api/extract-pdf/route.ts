import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPDFUrl } from '../../../lib/pdf-extractor';

export async function POST(request: NextRequest) {
  try {
    console.log('PDF extraction API called');
    const { pdfUrl } = await request.json();
    
    if (!pdfUrl) {
      console.error('No PDF URL provided');
      return NextResponse.json(
        { error: 'PDF URL is required' },
        { status: 400 }
      );
    }

    console.log('Extracting text from URL:', pdfUrl);
    
    // Extract text from PDF
    const extractedContent = await extractTextFromPDFUrl(pdfUrl);
    
    console.log('Extraction completed successfully');
    console.log('Extracted content:', {
      textLength: extractedContent.text?.length,
      pages: extractedContent.pages,
      hasText: !!extractedContent.text,
      firstChars: extractedContent.text?.substring(0, 100)
    });
    
    return NextResponse.json({
      success: true,
      content: extractedContent
    });
  } catch (error) {
    console.error('Error in PDF extraction API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to extract text from PDF: ${errorMessage}` },
      { status: 500 }
    );
  }
}
