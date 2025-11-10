import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const changelog = await prisma.changeLog.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!changelog) {
      return NextResponse.json({ error: "Changelog not found" }, { status: 404 });
    }

    return NextResponse.json(changelog);
  } catch (error) {
    console.error("Error fetching changelog:", error);
    return NextResponse.json({ error: "Failed to fetch changelog" }, { status: 500 });
  }
}
