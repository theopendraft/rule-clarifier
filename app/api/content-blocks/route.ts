import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ContentType } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const { ruleId, type, content, metadata } = await request.json()

    const contentBlock = await prisma.contentBlock.create({
      data: {
        ruleId,
        type: type as ContentType,
        content,
        metadata,
      },
    })

    return NextResponse.json(contentBlock)
  } catch (error) {
    console.error('Error creating content block:', error)
    return NextResponse.json(
      { error: 'Failed to create content block' },
      { status: 500 }
    )
  }
}
