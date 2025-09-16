import { prisma } from '@/lib/prisma';
import { NotificationType, EntityType } from '@prisma/client';

interface CreateNotificationParams {
  userId: string;
  title: string;
  message: string;
  type?: NotificationType;
  entityType?: EntityType;
  entityId?: string;
  changelogId?: string;
}

export async function createNotification({
  userId,
  title,
  message,
  type = NotificationType.INFO,
  entityType,
  entityId,
  changelogId,
}: CreateNotificationParams) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        entityType,
        entityId,
        changelogId,
      },
    });
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

export async function createNotificationFromChangeLog(
  changeLog: {
    id: string;
    entityType: EntityType;
    entityId: string;
    action: string;
    reason?: string;
    userId: string;
  }
) {
  const { entityType, action, reason, userId, id: changelogId } = changeLog;
  
  // Determine notification type based on action
  let type: NotificationType = NotificationType.INFO;
  if (action === 'DELETE') {
    type = NotificationType.ERROR;
  } else if (action === 'UPDATE') {
    type = NotificationType.WARNING;
  } else if (action === 'CREATE') {
    type = NotificationType.SUCCESS;
  }

  // Create title and message
  const entityName = entityType.toLowerCase().replace('_', ' ');
  const title = `${action} ${entityName}`;
  const message = reason || `${action} operation performed on ${entityName}`;

  return createNotification({
    userId,
    title,
    message,
    type,
    entityType,
    entityId: changeLog.entityId,
    changelogId, // Link to the changelog
  });
}

export async function createBulkNotificationsForAllUsers(
  title: string,
  message: string,
  type: NotificationType = NotificationType.INFO,
  entityType?: EntityType,
  entityId?: string,
  changelogId?: string
) {
  try {
    // Get all users
    const users = await prisma.user.findMany({
      select: { id: true },
    });

    // Create notifications for all users
    const notifications = await Promise.all(
      users.map(user =>
        createNotification({
          userId: user.id,
          title,
          message,
          type,
          entityType,
          entityId,
          changelogId,
        })
      )
    );

    return notifications;
  } catch (error) {
    console.error('Error creating bulk notifications:', error);
    throw error;
  }
}

export async function createNotificationForRole(
  role: 'ADMIN' | 'EDITOR' | 'USER',
  title: string,
  message: string,
  type: NotificationType = NotificationType.INFO,
  entityType?: EntityType,
  entityId?: string,
  changelogId?: string
) {
  try {
    // Get users with specific role
    const users = await prisma.user.findMany({
      where: { role },
      select: { id: true },
    });

    // Create notifications for users with this role
    const notifications = await Promise.all(
      users.map(user =>
        createNotification({
          userId: user.id,
          title,
          message,
          type,
          entityType,
          entityId,
          changelogId,
        })
      )
    );

    return notifications;
  } catch (error) {
    console.error('Error creating role-based notifications:', error);
    throw error;
  }
}
