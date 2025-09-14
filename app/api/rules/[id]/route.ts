import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, content, supportingDoc, changeReason, docType, uploadedFile } = await request.json();
    
    // Update the rule in the database
    const updatedRule = await prisma.rule.update({
      where: { id },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    });

    // Create audit log entry
    await prisma.changeLog.create({
      data: {
        entityType: 'RULE',
        entityId: id,
        action: 'UPDATE',
        changes: {
          title: { from: updatedRule.title, to: title },
          content: { from: updatedRule.content, to: content }
        },
        supportingDoc: supportingDoc || null,
        reason: changeReason || null,
        userId: 'cmfiiqfrv00006vtwd7bl0l22', // TODO: Get from auth context
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