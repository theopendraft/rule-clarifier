import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { content, userId, reason } = body;

    const rule = await prisma.rule.findUnique({
      where: { id: params.id },
    });

    if (!rule) {
      return NextResponse.json({ error: "Rule not found" }, { status: 404 });
    }

    const updatedRule = await prisma.rule.update({
      where: { id: params.id },
      data: { content },
    });

    await prisma.changeLog.create({
      data: {
        entityType: "RULE",
        entityId: params.id,
        action: "UPDATE",
        changes: {
          content: {
            old: rule.content,
            new: content,
          },
        },
        reason: reason || "Content updated",
        userId: userId || "system",
      },
    });

    return NextResponse.json(updatedRule);
  } catch (error) {
    console.error("Error updating rule:", error);
    return NextResponse.json({ error: "Failed to update rule" }, { status: 500 });
  }
}
