import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const ruleBook = await prisma.ruleBook.findUnique({
      where: { id },
      include: {
        chapters: {
          where: { isActive: true },
          include: {
            rules: {
              where: { isActive: true },
              include: {
                contentBlocks: {
                  orderBy: { order: 'asc' },
                },
                links: {
                  orderBy: { order: 'asc' },
                },
              },
              orderBy: { order: 'asc' },
            },
            subChapters: {
              where: { isActive: true },
              include: {
                rules: {
                  where: { isActive: true },
                  include: {
                    contentBlocks: {
                      orderBy: { order: 'asc' },
                    },
                    links: {
                      orderBy: { order: 'asc' },
                    },
                  },
                  orderBy: { order: 'asc' },
                },
              },
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!ruleBook) {
      return NextResponse.json(
        { error: 'Rule book not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(ruleBook)
  } catch (error) {
    console.error('Error fetching rule book:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rule book' },
      { status: 500 }
    )
  }
}
