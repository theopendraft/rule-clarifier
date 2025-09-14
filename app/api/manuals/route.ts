import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const manuals = await prisma.manual.findMany({
      where: { isActive: true },
      orderBy: { code: 'asc' }
    });

    return NextResponse.json(manuals);
  } catch (error) {
    console.error('Error fetching manuals:', error);
    return NextResponse.json({ error: 'Failed to fetch manuals' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, title, description, version } = body;

    const manual = await prisma.manual.create({
      data: {
        code,
        title,
        description,
        version,
      },
    });

    return NextResponse.json(manual, { status: 201 });
  } catch (error) {
    console.error('Error creating manual:', error);
    return NextResponse.json({ error: 'Failed to create manual' }, { status: 500 });
  }
}
