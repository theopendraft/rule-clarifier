import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPDFUrl } from '../../../lib/pdf-extractor';
import { prisma } from '../../../app/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { pdfUrl, entityType, entityId, title, code } = await request.json();

    if (!pdfUrl) {
      return NextResponse.json({ error: 'PDF URL is required' }, { status: 400 });
    }

    if (!entityType || !['manual', 'circular'].includes(entityType)) {
      return NextResponse.json({ error: 'Valid entity type (manual or circular) is required' }, { status: 400 });
    }

    // Extract text from PDF
    const extractedContent = await extractTextFromPDFUrl(pdfUrl);

    // Save to database based on entity type
    let savedRecord;
    
    if (entityType === 'manual') {
      if (entityId) {
        // Update existing manual
        savedRecord = await prisma.manual.update({
          where: { id: entityId },
          data: {
            pdfUrl: pdfUrl,
            updatedAt: new Date()
          }
        });
      } else {
        // Get the last manual code and increment it
        const lastManual = await prisma.manual.findFirst({
          where: { code: { startsWith: 'M' } },
          orderBy: { code: 'desc' }
        });
        
        let nextCode = 'M001';
        if (lastManual) {
          const lastNumber = parseInt(lastManual.code.substring(1));
          nextCode = `M${String(lastNumber + 1).padStart(3, '0')}`;
        }

        // Create new manual
        savedRecord = await prisma.manual.create({
          data: {
            code: nextCode,
            title: title || 'Untitled Manual',
            pdfUrl: pdfUrl
          }
        });
      }
    } else if (entityType === 'circular') {
      if (entityId) {
        // Update existing circular
        savedRecord = await prisma.circular.update({
          where: { id: entityId },
          data: {
            pdfUrl: pdfUrl,
            updatedAt: new Date()
          }
        });
      } else {
        // Get the last circular code and increment it
        const lastCircular = await prisma.circular.findFirst({
          where: { code: { startsWith: 'C' } },
          orderBy: { code: 'desc' }
        });
        
        let nextCode = 'C001';
        if (lastCircular) {
          const lastNumber = parseInt(lastCircular.code.substring(1));
          nextCode = `C${String(lastNumber + 1).padStart(3, '0')}`;
        }

        // Create new circular
        savedRecord = await prisma.circular.create({
          data: {
            code: nextCode,
            title: title || 'Untitled Circular',
            pdfUrl: pdfUrl
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      extractedContent,
      savedRecord
    });

  } catch (error) {
    console.error('PDF upload and extraction error:', error);
    return NextResponse.json(
      { error: 'Failed to process PDF', details: error.message },
      { status: 500 }
    );
  }
}