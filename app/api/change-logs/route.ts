import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const entityId = searchParams.get("entityId");
    const entityType = searchParams.get("entityType");

    const whereClause: any = {};
    
    if (entityId) {
      whereClause.entityId = entityId;
    }
    
    if (entityType) {
      whereClause.entityType = entityType;
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
