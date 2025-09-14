export interface ExtractedContent {
  text: string;
  pages: number;
  metadata: {
    title?: string;
    author?: string;
    subject?: string;
    creator?: string;
    producer?: string;
    creationDate?: Date;
    modificationDate?: Date;
  };
}

export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<ExtractedContent> {
  try {
    // For now, return a mock implementation
    // In a real implementation, you would use a PDF parsing library
    return {
      text: "This is extracted text from the PDF. In a real implementation, this would contain the actual text content extracted from the PDF file using a proper PDF parsing library like pdf-parse or pdfjs-dist.",
      pages: 1,
      metadata: {
        title: "Sample PDF Document",
        author: "System",
        subject: "PDF Text Extraction",
        creator: "PDF Upload System",
        producer: "Railway Rule Clarifier",
        creationDate: new Date(),
        modificationDate: new Date(),
      }
    };
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export async function extractTextFromPDFWithOCR(pdfBuffer: Buffer): Promise<ExtractedContent> {
  try {
    // First try regular text extraction
    const regularExtraction = await extractTextFromPDF(pdfBuffer);
    
    // If we got good text content, return it
    if (regularExtraction.text.trim().length > 100) {
      return regularExtraction;
    }
    
    // If text extraction didn't work well, return what we have
    console.log('Regular extraction yielded little text, returning available content');
    return regularExtraction;
  } catch (error) {
    console.error('Error extracting text from PDF with OCR:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export async function extractTextFromPDFUrl(pdfUrl: string): Promise<ExtractedContent> {
  try {
    // Fetch the PDF from the URL
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }
    
    const pdfBuffer = Buffer.from(await response.arrayBuffer());
    return await extractTextFromPDFWithOCR(pdfBuffer);
  } catch (error) {
    console.error('Error extracting text from PDF URL:', error);
    throw new Error('Failed to extract text from PDF URL');
  }
}
