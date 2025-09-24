import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection first
    await prisma.$connect()
    
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
          },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(ruleBooks)
  } catch (error) {
    console.error('Error fetching rule books:', error)
    
    // Return mock data structure when database is unavailable
    const mockData = [{
      id: 'mock-book-1',
      title: 'General Rules',
      description: 'Railway General Rules',
      version: '1.0.0',
      isActive: true,
      chapters: [
        {
          id: 'mock-chapter-4',
          number: 4,
          title: 'Working of Trains',
          section: 'A. Timing and Running of Trains',
          rules: [
            {
              id: 'mock-rule-4.01',
              number: '4.01',
              title: 'Punctuality',
              content: 'All trains must run punctually according to the time table.',
              order: 1
            },
            {
              id: 'mock-rule-4.02',
              number: '4.02',
              title: 'Speed Restrictions',
              content: 'Trains must observe all speed restrictions as prescribed.',
              order: 2
            }
          ]
        }
      ]
    }]
    
    return NextResponse.json(mockData)
  }
}
