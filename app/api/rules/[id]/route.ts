import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, content, supportingDoc, changeReason, docType, uploadedFile } = await request.json();
    
    // First, get the current rule to capture the old values
    const currentRule = await prisma.rule.findUnique({
      where: { id }
    });

    if (!currentRule) {
      return NextResponse.json(
        { error: 'Rule not found' },
        { status: 404 }
      );
    }
    
    // Update the rule in the database
    const updatedRule = await prisma.rule.update({
      where: { id },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    });

    // Create audit log entry with proper before/after values
    await prisma.changeLog.create({
      data: {
        entityType: 'RULE',
        entityId: id,
        action: 'UPDATE',
        changes: {
          title: { from: currentRule.title, to: title },
          content: { from: currentRule.content, to: content }
        },
        supportingDoc: supportingDoc || null,
        reason: changeReason || null,
        userId: 'cmflhnuzb0000tt0sc7iezcsi', // HARDCODED: Admin user ID - TODO: Get from auth context
      },
    });

    return NextResponse.json(updatedRule);
  } catch (error) {
    console.error('Error updating rule:', error);
    return NextResponse.json(
      { error: 'Failed to update rule' },
      { status: 500 }
    );
  }
}