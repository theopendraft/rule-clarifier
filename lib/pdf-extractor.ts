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

function parsePDFDate(dateStr?: string): Date | undefined {
  if (!dateStr) return undefined;
  try {
    const clean = dateStr.replace(/^D:/, '');
    const match = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/.exec(clean);
    if (!match) return new Date(dateStr);
    const [_, year, month, day, hour, minute, second] = match;
    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    );
  } catch {
    return undefined;
  }
}

export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<ExtractedContent> {
  if (!pdfBuffer || pdfBuffer.length === 0) {
    throw new Error('Invalid PDF buffer');
  }

  // Validate PDF header
  const header = pdfBuffer.toString('ascii', 0, 8);
  if (!header.startsWith('%PDF-')) {
    throw new Error('Invalid PDF format');
  }

  // Try pdf-parse with production-safe import
  try {
    const pdfParse = (await import('pdf-parse')).default;
    
    const data = await pdfParse(pdfBuffer, {
      normalizeWhitespace: false,
      disableCombineTextItems: false,
      max: 0
    });

    if (data.text && data.text.trim().length > 0) {
      // Clean text while preserving formatting
      const cleanText = data.text
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\xFF]/g, '') // Remove only control chars
        .replace(/[ \t]{3,}/g, '  ') // Normalize excessive spaces but keep some
        .replace(/\n{3,}/g, '\n\n') // Normalize excessive newlines
        .trim();

      if (cleanText.length > 10) {
        return {
          text: cleanText,
          pages: data.numpages || 1,
          metadata: {
            title: data.info?.Title,
            author: data.info?.Author,
            subject: data.info?.Subject,
            creator: data.info?.Creator,
            producer: data.info?.Producer,
            creationDate: parsePDFDate(data.info?.CreationDate),
            modificationDate: parsePDFDate(data.info?.ModDate),
          },
        };
      }
    }
  } catch (error) {
    console.error("PDF-parse failed, using fallback:", error);
    
    // Fallback extraction
    try {
      const pdfString = pdfBuffer.toString('latin1');
      let text = '';
      
      // Extract text from parentheses
      const matches = pdfString.match(/\(([^)]*)\)/g) || [];
      for (const match of matches) {
        const content = match.slice(1, -1);
        if (content.length > 2 && /[a-zA-Z]/.test(content) && 
            !/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\xFF]/.test(content)) {
          text += content + ' ';
        }
      }
      
      const pageCount = (pdfString.match(/\/Type\s*\/Page[^s]/g) || []).length || 1;
      
      return {
        text: text.trim(),
        pages: pageCount,
        metadata: {}
      };
    } catch (fallbackError) {
      console.error("Fallback extraction also failed:", fallbackError);
      throw new Error(`PDF extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Placeholder: you can plug in OCR (e.g., tesseract.js) later
export async function extractTextFromPDFWithOCR(pdfBuffer: Buffer): Promise<ExtractedContent> {
  return await extractTextFromPDF(pdfBuffer);
}

export async function extractTextFromPDFUrl(pdfUrl: string): Promise<ExtractedContent> {
  try {
    console.log("Fetching PDF from URL:", pdfUrl);

    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    console.log("PDF downloaded successfully, size:", pdfBuffer.length, "bytes");

    return await extractTextFromPDF(pdfBuffer);
  } catch (error) {
    console.error("Error fetching PDF from URL:", error);
    return {
      text: "",
      pages: 1,
      metadata: {},
    };
  }
}
