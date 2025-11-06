import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, url, description, userId, reason } = body;

    const link = await prisma.ruleLink.findUnique({
      where: { id: params.id },
    });

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    const updatedLink = await prisma.ruleLink.update({
      where: { id: params.id },
      data: { title, url, description },
    });

    await prisma.changeLog.create({
      data: {
        entityType: "RULE_LINK",
        entityId: params.id,
        action: "UPDATE",
        changes: {
          title: { old: link.title, new: title },
          url: { old: link.url, new: url },
          description: { old: link.description, new: description },
        },
        reason: reason || "Link updated",
        userId: userId || "system",
      },
    });

    return NextResponse.json(updatedLink);
  } catch (error) {
    console.error("Error updating link:", error);
    return NextResponse.json({ error: "Failed to update link" }, { status: 500 });
  }
}
