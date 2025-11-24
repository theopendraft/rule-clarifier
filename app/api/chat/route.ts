import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const { query, userId } = await request.json();

        const keywords = query.toLowerCase().split(' ').filter(word => word.length > 3);
        
        const rules = await prisma.rule.findMany({
          where: {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { content: { contains: query, mode: 'insensitive' } },
              { number: { contains: query, mode: 'insensitive' } },
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
        const contexts = [];

        if (rules.length > 0) {
          response = `Based on your query, here are the relevant rules:\n\n`;
          rules.forEach((rule, index) => {
            const cleanContent = rule.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
            response += `${index + 1}. **Rule ${rule.number}: ${rule.title}**\n`;
            response += `   *Chapter ${rule.chapter.number} - ${rule.chapter.title}*\n`;
            response += `   ${cleanContent.substring(0, 250)}...\n\n`;
            
            contexts.push({
              text: cleanContent.substring(0, 500),
              source: `Rule ${rule.number} - ${rule.title}`,
              score: 0.8
            });
          });
        } else {
          response = `I couldn't find rules matching your description. Try:\n• Describing the situation differently\n• Using keywords like "signal", "duty", "safety", "speed"\n• Mentioning specific rule numbers`;
        }

        for (const char of response) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ chunk: char })}\n\n`));
          await new Promise(resolve => setTimeout(resolve, 10));
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, contexts })}\n\n`));
        controller.close();
      } catch (error) {
        console.error('Chat API error:', error);
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ chunk: 'Sorry, I encountered an error. Please try again.' })}\n\n`));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, contexts: [] })}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
