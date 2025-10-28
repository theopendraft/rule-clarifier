import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const keywords = message.toLowerCase().split(' ').filter(word => word.length > 3);
    
    const rules = await prisma.rule.findMany({
      where: {
        OR: [
          { title: { contains: message, mode: 'insensitive' } },
          { content: { contains: message, mode: 'insensitive' } },
          { number: { contains: message, mode: 'insensitive' } },
          ...keywords.map(keyword => ({
            OR: [
              { title: { contains: keyword, mode: 'insensitive' } },
              { content: { contains: keyword, mode: 'insensitive' } },
            ]
          }))
        ],
      },
      include: {
        chapter: true,
      },
      take: 5,
    });

    let response = '';

    if (rules.length > 0) {
      response = `Based on your query, here are the relevant rules:\n\n`;
      rules.forEach((rule, index) => {
        const cleanContent = rule.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        response += `${index + 1}. Rule ${rule.number}: ${rule.title}\n`;
        response += `   Chapter ${rule.chapter.number} - ${rule.chapter.title}\n`;
        response += `   ${cleanContent.substring(0, 250)}...\n\n`;
      });
    } else {
      response = `I couldn't find rules matching your description. Try:\n• Describing the situation differently\n• Using keywords like "signal", "duty", "safety", "speed"\n• Mentioning specific rule numbers`;
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { response: 'Sorry, I encountered an error. Please try again.' },
      { status: 500 }
    );
  }
}
