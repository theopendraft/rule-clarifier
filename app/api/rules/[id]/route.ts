import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createNotificationFromChangeLog } from '@/lib/notification-utils';

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
    const changeLog = await prisma.changeLog.create({
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
        userId: 'cmflolqqc00006vyvs484vwgq', // HARDCODED: Admin user ID - TODO: Get from auth context
      },
    });

    // Create notification for the change
    try {
      await createNotificationFromChangeLog({
        id: changeLog.id,
        entityType: changeLog.entityType,
        entityId: changeLog.entityId,
        action: changeLog.action,
        reason: changeLog.reason,
        userId: changeLog.userId,
      });
    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
      // Don't fail the rule update if notification fails
    }

    return NextResponse.json(updatedRule);
  } catch (error) {
    console.error('Error updating rule:', error);
    return NextResponse.json(
      { error: 'Failed to update rule' },
      { status: 500 }
    );
  }
}