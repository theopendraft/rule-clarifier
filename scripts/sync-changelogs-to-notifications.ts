import { PrismaClient, NotificationType, EntityType } from '@prisma/client';

const prisma = new PrismaClient();

async function syncChangeLogsToNotifications() {
  try {
    console.log('🔄 Syncing change logs to notifications...');

    // Get all change logs
    const changeLogs = await prisma.changeLog.findMany({
      include: {
        user: {
          select: { id: true, email: true, name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log(`Found ${changeLogs.length} change logs`);

    // Get all users
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true }
    });

    console.log(`Found ${users.length} users`);

    // Clear existing notifications
    await prisma.notification.deleteMany({});
    console.log('Cleared existing notifications');

    // Create notifications for each change log for all users
    let notificationCount = 0;
    
    for (const changeLog of changeLogs) {
      for (const user of users) {
        // Determine notification type based on action
        let type: NotificationType = NotificationType.INFO;
        if (changeLog.action === 'DELETE') {
          type = NotificationType.ERROR;
        } else if (changeLog.action === 'UPDATE') {
          type = NotificationType.WARNING;
        } else if (changeLog.action === 'CREATE') {
          type = NotificationType.SUCCESS;
        }

        // Create title and message
        const entityName = changeLog.entityType.toLowerCase().replace('_', ' ');
        const title = `${changeLog.action} ${entityName}`;
        const message = changeLog.reason || `${changeLog.action} operation performed on ${entityName} by ${changeLog.user.name || changeLog.user.email}`;

        // Mark as read if it's the user who made the change
        const isRead = changeLog.userId === user.id;

        await prisma.notification.create({
          data: {
            userId: user.id,
            title,
            message,
            type,
            entityType: changeLog.entityType,
            entityId: changeLog.entityId,
            isRead,
            createdAt: changeLog.createdAt,
          }
        });

        notificationCount++;
      }
    }

    console.log(`✅ Created ${notificationCount} notifications`);
    
    // Show summary by user
    for (const user of users) {
      const userNotifications = await prisma.notification.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      });
      
      const unreadCount = userNotifications.filter(n => !n.isRead).length;
      console.log(`  - ${user.email} (${user.name}): ${userNotifications.length} notifications (${unreadCount} unread)`);
    }

  } catch (error) {
    console.error('❌ Error syncing change logs to notifications:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the sync
syncChangeLogsToNotifications()
  .then(() => {
    console.log('🎉 Change logs to notifications sync completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Sync failed:', error);
    process.exit(1);
  });
