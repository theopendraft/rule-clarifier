import { prisma } from '../app/lib/prisma';
import { extractTextFromPDFUrl } from './pdf-extractor';

export async function storePDFContent(
  pdfUrl: string, 
  entityType: 'manual' | 'circular', 
  entityId: string
) {
  const extracted = await extractTextFromPDFUrl(pdfUrl);
  
  // Clear existing content blocks
  await prisma.contentBlock.deleteMany({
    where: entityType === 'manual' ? { manualId: entityId } : { circularId: entityId }
  });

  const blocks = [];
  let order = 0;

  // Store tables
  for (const table of extracted.context.tables) {
    blocks.push({
      [entityType === 'manual' ? 'manualId' : 'circularId']: entityId,
      type: 'TABLE' as const,
      content: JSON.stringify(table.data),
      metadata: { rows: table.rows, columns: table.columns },
      order: order++
    });
  }

  // Store text content
  if (extracted.text) {
    blocks.push({
      [entityType === 'manual' ? 'manualId' : 'circularId']: entityId,
      type: 'TEXT' as const,
      content: extracted.text,
      order: order++
    });
  }

  await prisma.contentBlock.createMany({ data: blocks });
  
  return { blocksCreated: blocks.length };
}

export async function getPDFContent(entityType: 'manual' | 'circular', entityId: string) {
  return await prisma.contentBlock.findMany({
    where: entityType === 'manual' ? { manualId: entityId } : { circularId: entityId },
    orderBy: { order: 'asc' }
  });
}