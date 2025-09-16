import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createNotificationFromChangeLog } from '@/lib/notification-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Save API - Received data:', {
      hasContent: !!body.content,
      contentLength: body.content?.length,
      uploadType: body.uploadType,
      fileName: body.fileName,
      title: body.title,
      hasFileUrl: !!body.fileUrl
    });
    
    const { content, uploadType, fileName, fileUrl, metadata, title } = body;
    
    if (!content || !uploadType || !fileName || !title) {
      console.error('Save API - Missing required fields:', {
        content: !!content,
        uploadType: !!uploadType,
        fileName: !!fileName,
        title: !!title
      });
      return NextResponse.json(
        { error: 'Content, upload type, file name, and title are required' },
        { status: 400 }
      );
    }

    // Generate timestamp-based filename for PDF storage
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const pdfFileName = `${uploadType}-${fileName.replace(/\.[^/.]+$/, '')}-${timestamp}.pdf`;

    // HARDCODED: Admin user ID - TODO: Get from auth context
    const adminUserId = 'cmflolqqc00006vyvs484vwgq';

    let savedRecord;
    let changeLog;

    if (uploadType === 'manual') {
      // Get the last manual code and increment it
      const lastManual = await prisma.manual.findFirst({
        where: { code: { startsWith: 'M' } },
        orderBy: { code: 'desc' }
      });
      
      let nextCode = 'M001';
      if (lastManual) {
        const lastNumber = parseInt(lastManual.code.substring(1));
        nextCode = `M${String(lastNumber + 1).padStart(3, '0')}`;
      }

      // Save as Manual
      console.log('Save API - Creating manual with data:', {
        code: nextCode,
        title: title,
        descriptionLength: content?.length,
        version: '1.0.0',
        pdfUrl: fileUrl,
        pdfFileName: pdfFileName,
      });
      
      savedRecord = await prisma.manual.create({
        data: {
          code: nextCode,
          title: title,
          description: content,
          version: '1.0.0',
          pdfUrl: fileUrl,
          pdfFileName: pdfFileName,
        }
      });
      
      console.log('Save API - Manual created successfully:', savedRecord.id);

      // Create change log
      changeLog = await prisma.changeLog.create({
        data: {
          entityType: 'MANUAL',
          entityId: savedRecord.id,
          action: 'CREATE',
          changes: {
            title: { to: savedRecord.title },
            description: { to: savedRecord.description },
            version: { to: savedRecord.version },
            code: { to: savedRecord.code },
            pdfUrl: { to: savedRecord.pdfUrl },
            pdfFileName: { to: savedRecord.pdfFileName }
          },
          reason: 'Manual document uploaded and processed',
          supportingDoc: fileUrl || null,
          userId: adminUserId,
        }
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
        // Don't fail the manual creation if notification fails
      }

    } else if (uploadType === 'circular') {
      // Get the last circular code and increment it
      const lastCircular = await prisma.circular.findFirst({
        where: { code: { startsWith: 'C' } },
        orderBy: { code: 'desc' }
      });
      
      let nextCode = 'C001';
      if (lastCircular) {
        const lastNumber = parseInt(lastCircular.code.substring(1));
        nextCode = `C${String(lastNumber + 1).padStart(3, '0')}`;
      }

      // Save as Circular
      console.log('Save API - Creating circular with data:', {
        code: nextCode,
        title: title,
        descriptionLength: content?.length,
        number: `${new Date().getFullYear()}/${String(Date.now()).slice(-3)}`,
        pdfUrl: fileUrl,
        pdfFileName: pdfFileName,
      });
      
      savedRecord = await prisma.circular.create({
        data: {
          code: nextCode,
          title: title,
          description: content,
          number: `${new Date().getFullYear()}/${String(Date.now()).slice(-3)}`,
          date: new Date(),
          pdfUrl: fileUrl,
          pdfFileName: pdfFileName,
        }
      });
      
      console.log('Save API - Circular created successfully:', savedRecord.id);

      // Create change log
      changeLog = await prisma.changeLog.create({
        data: {
          entityType: 'CIRCULAR',
          entityId: savedRecord.id,
          action: 'CREATE',
          changes: {
            title: { to: savedRecord.title },
            description: { to: savedRecord.description },
            number: { to: savedRecord.number },
            code: { to: savedRecord.code },
            pdfUrl: { to: savedRecord.pdfUrl },
            pdfFileName: { to: savedRecord.pdfFileName }
          },
          reason: 'Circular document uploaded and processed',
          supportingDoc: fileUrl || null,
          userId: adminUserId,
        }
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
        // Don't fail the circular creation if notification fails
      }

    } else {
      return NextResponse.json(
        { error: 'Invalid upload type. Must be "manual" or "circular"' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      savedRecord,
      changeLog,
      message: `${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)} saved successfully with full content and change tracking`
    });
  } catch (error) {
    console.error('Save API - Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to save extracted content',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}