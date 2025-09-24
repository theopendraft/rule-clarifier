import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { htmlContent, chapterNumber, title } = await request.json();

    const chapter = await prisma.chapter.upsert({
      where: { 
        bookId_number: {
          bookId: '1',
          number: chapterNumber
        }
      },
      update: {
        htmlContent: htmlContent,
        title: title
      },
      create: {
        bookId: '1',
        number: chapterNumber,
        title: title,
        htmlContent: htmlContent
      }
    });

    return NextResponse.json({ success: true, chapterId: chapter.id });
  } catch (error) {
    console.error('Error uploading HTML:', error);
    return NextResponse.json({ error: 'Failed to upload HTML content' }, { status: 500 });
  }
}