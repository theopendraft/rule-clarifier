import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const entityId = searchParams.get("entityId");
    const entityType = searchParams.get("entityType");

    if (!entityId || !entityType) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const changes = await prisma.changeLog.findMany({
      where: {
        entityId,
        entityType: entityType as any,
        action: "UPDATE",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return NextResponse.json(changes);
  } catch (error) {
    console.error("Error fetching change logs:", error);
    return NextResponse.json({ error: "Failed to fetch changes" }, { status: 500 });
  }
}
