import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const chapter = await prisma.chapter.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        title: true,
        htmlContent: true,
        number: true,
        section: true
      }
    });

    if (!chapter) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: chapter.id,
      title: chapter.title,
      number: chapter.number,
      section: chapter.section,
      htmlContent: chapter.htmlContent
    });
  } catch (error) {
    console.error('Error fetching chapter HTML:', error);
    return NextResponse.json({ error: 'Failed to fetch chapter HTML' }, { status: 500 });
  }
}