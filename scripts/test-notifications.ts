import { PrismaClient, NotificationType, EntityType } from '@prisma/client';
import { createNotification, createNotificationFromChangeLog } from '../app/lib/notification-utils';

const prisma = new PrismaClient();

async function testNotifications() {
  try {
    console.log('🧪 Testing notification system...');

    // Test creating a notification
    const testNotification = await createNotification({
      userId: 'cmflolqqc00006vyvs484vwgq', // Actual admin user ID
      title: 'Test Notification',
      message: 'This is a test notification to verify the system is working.',
      type: NotificationType.INFO,
    });

    console.log('✅ Created test notification:', testNotification.id);

    // Test creating notification from change log
    const testChangeLog = {
      id: 'test-change-log-id',
      entityType: EntityType.RULE,
      entityId: 'test-rule-id',
      action: 'UPDATE',
      reason: 'Updated safety requirements',
      userId: 'cmflrpvxe00016vubloi2s4tb', // Actual user ID
    };

    const changeLogNotification = await createNotificationFromChangeLog(testChangeLog);
    console.log('✅ Created change log notification:', changeLogNotification.id);

    // Test fetching notifications
    const adminNotifications = await prisma.notification.findMany({
      where: { userId: 'cmflolqqc00006vyvs484vwgq' },
      orderBy: { createdAt: 'desc' },
    });

    const userNotifications = await prisma.notification.findMany({
      where: { userId: 'cmflrpvxe00016vubloi2s4tb' },
      orderBy: { createdAt: 'desc' },
    });

    console.log(`📊 Admin notifications: ${adminNotifications.length}`);
    console.log(`📊 User notifications: ${userNotifications.length}`);
    console.log(`📊 Unread admin notifications: ${adminNotifications.filter(n => !n.isRead).length}`);
    console.log(`📊 Unread user notifications: ${userNotifications.filter(n => !n.isRead).length}`);

    console.log('🎉 Notification system test completed successfully!');

  } catch (error) {
    console.error('❌ Notification system test failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testNotifications()
  .then(() => {
    console.log('✅ All tests passed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Tests failed:', error);
    process.exit(1);
  });
