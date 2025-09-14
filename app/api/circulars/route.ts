import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const circulars = await prisma.circular.findMany({
      where: { isActive: true },
      orderBy: { date: 'desc' }
    });

    return NextResponse.json(circulars);
  } catch (error) {
    console.error('Error fetching circulars:', error);
    return NextResponse.json({ error: 'Failed to fetch circulars' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, title, description, number, date } = body;

    const circular = await prisma.circular.create({
      data: {
        code,
        title,
        description,
        number,
        date: date ? new Date(date) : null,
      },
    });

    return NextResponse.json(circular, { status: 201 });
  } catch (error) {
    console.error('Error creating circular:', error);
    return NextResponse.json({ error: 'Failed to create circular' }, { status: 500 });
  }
}
