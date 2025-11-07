import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
        return NextResponse.json([]);
      }
    }

    const changes = await prisma.changeLog.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    }).catch(() => []);

    return NextResponse.json(changes || []);
  } catch (error) {
    console.error("Error fetching change logs:", error);
    return NextResponse.json([]);
  }
}
