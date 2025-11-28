import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'
export const revalidate = 30 // Cache for 30 seconds

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const entityId = searchParams.get("entityId");
    const entityType = searchParams.get("entityType");
    const unreadOnly = searchParams.get("unreadOnly") === "true";

    const whereClause: any = {};
    
    if (entityId) {
      whereClause.entityId = entityId;
    }
    
    if (entityType) {
      whereClause.entityType = entityType;
    }

    if (unreadOnly) {
      const unreadNotifications = await prisma.notification.findMany({
        where: {
          entityType: entityType as any,
          isRead: false
        },
        select: { entityId: true }
      }).catch(() => []);
      
      const unreadEntityIds = unreadNotifications.map(n => n.entityId).filter(Boolean) as string[];
      
      if (unreadEntityIds.length > 0) {
        whereClause.entityId = { in: unreadEntityIds };
      } else {
        return NextResponse.json([], {
          headers: {
            'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
          }
        });
      }
    }

    const changes = await prisma.changeLog.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        entityId: true,
        entityType: true,
        action: true,
        changes: true,
        reason: true,
        supportingDoc: true,
        createdAt: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      take: 100,
    });

    return NextResponse.json(changes || [], {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
      }
    });
  } catch (error) {
    console.error("Error fetching change logs:", error);
    return NextResponse.json([]);
  }
}
