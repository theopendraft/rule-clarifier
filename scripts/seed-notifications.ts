import { PrismaClient, NotificationType, EntityType } from '@prisma/client';

const prisma = new PrismaClient();

async function seedNotifications() {
  try {
    console.log('🌱 Seeding notifications...');

    // Get or create test users
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@railway.com' },
      update: {},
      create: {
        email: 'admin@railway.com',
        name: 'Admin User',
        role: 'ADMIN',
      },
    });

    const regularUser = await prisma.user.upsert({
      where: { email: 'user@railway.com' },
      update: {},
      create: {
        email: 'user@railway.com',
        name: 'Regular User',
        role: 'USER',
      },
    });

    // Create sample notifications
    const notifications = [
      {
        userId: adminUser.id,
        title: 'Welcome to Railway Portal',
        message: 'You have successfully logged in as an administrator. You can now manage rules, manuals, and circulars.',
        type: NotificationType.SUCCESS,
        isRead: false,
      },
      {
        userId: adminUser.id,
        title: 'System Update Available',
        message: 'A new version of the Railway Portal is available. Please check the changelog for details.',
        type: NotificationType.INFO,
        isRead: false,
      },
      {
        userId: adminUser.id,
        title: 'New Rule Book Created',
        message: 'A new rule book "Safety Procedures 2024" has been created and is ready for review.',
        type: NotificationType.CHANGE,
        entityType: EntityType.RULE_BOOK,
        entityId: 'sample-rule-book-id',
        isRead: true,
      },
      {
        userId: regularUser.id,
        title: 'Welcome to Railway Portal',
        message: 'You have successfully logged in. You can now view rules, manuals, and circulars.',
        type: NotificationType.SUCCESS,
        isRead: false,
      },
      {
        userId: regularUser.id,
        title: 'New Manual Available',
        message: 'A new manual "Operating Procedures Manual v2.1" is now available for download.',
        type: NotificationType.INFO,
        entityType: EntityType.MANUAL,
        entityId: 'sample-manual-id',
        isRead: false,
      },
      {
        userId: regularUser.id,
        title: 'Rule Update Notification',
        message: 'Rule 4.01 has been updated with new safety requirements. Please review the changes.',
        type: NotificationType.WARNING,
        entityType: EntityType.RULE,
        entityId: 'sample-rule-id',
        isRead: false,
      },
    ];

    // Clear existing notifications
    await prisma.notification.deleteMany({});

    // Create new notifications
    for (const notification of notifications) {
      await prisma.notification.create({
        data: notification,
      });
    }

    console.log(`✅ Created ${notifications.length} notifications`);
    console.log(`   - ${notifications.filter(n => n.userId === adminUser.id).length} for admin user`);
    console.log(`   - ${notifications.filter(n => n.userId === regularUser.id).length} for regular user`);
    console.log(`   - ${notifications.filter(n => !n.isRead).length} unread notifications`);

  } catch (error) {
    console.error('❌ Error seeding notifications:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedNotifications()
  .then(() => {
    console.log('🎉 Notification seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Notification seeding failed:', error);
    process.exit(1);
  });
