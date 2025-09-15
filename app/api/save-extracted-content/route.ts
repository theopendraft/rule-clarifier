import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { content, uploadType, fileName, fileUrl, metadata } = await request.json();
    
    if (!content || !uploadType || !fileName) {
      return NextResponse.json(
        { error: 'Content, upload type, and file name are required' },
        { status: 400 }
      );
    }

    let savedRecord;

    if (uploadType === 'manual') {
      // Save as Manual
      savedRecord = await prisma.manual.create({
        data: {
          code: `M${Date.now()}`, // Generate unique code
          title: fileName.replace('.pdf', ''),
          description: content.substring(0, 500) + (content.length > 500 ? '...' : ''),
          version: '1.0.0',
        }
      });
    } else if (uploadType === 'circular') {
      // Save as Circular
      savedRecord = await prisma.circular.create({
        data: {
          code: `C${Date.now()}`, // Generate unique code
          title: fileName.replace('.pdf', ''),
          description: content.substring(0, 500) + (content.length > 500 ? '...' : ''),
          number: `${new Date().getFullYear()}/${String(Date.now()).slice(-3)}`,
          date: new Date(),
        }
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid upload type. Must be "manual" or "circular"' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      savedRecord,
      message: `Content saved as ${uploadType} successfully`
    });
  } catch (error) {
    console.error('Error saving extracted content:', error);
    return NextResponse.json(
      { error: 'Failed to save extracted content' },
      { status: 500 }
    );
  }
}