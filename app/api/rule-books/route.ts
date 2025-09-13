import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const ruleBooks = await prisma.ruleBook.findMany({
      where: { isActive: true },
      include: {
        chapters: {
          where: { isActive: true },
          include: {
            rules: {
              where: { isActive: true },
              orderBy: { order: 'asc' },
            },
            subChapters: {
              where: { isActive: true },
              include: {
                rules: {
                  where: { isActive: true },
                  orderBy: { order: 'asc' },
                },
              },
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(ruleBooks)
  } catch (error) {
    console.error('Error fetching rule books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rule books' },
      { status: 500 }
    )
  }
}
