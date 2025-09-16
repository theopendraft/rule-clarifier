import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    console.log('👥 Checking users in database...');
    
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true },
    });

    console.log(`Found ${users.length} users:`);
    users.forEach(user => {
      console.log(`  - ${user.email} (${user.name}) - ID: ${user.id} - Role: ${user.role}`);
    });

    // Also check notifications
    const notifications = await prisma.notification.findMany({
      select: { id: true, userId: true, title: true, isRead: true },
    });

    console.log(`\nFound ${notifications.length} notifications:`);
    notifications.forEach(notification => {
      console.log(`  - ${notification.title} - User: ${notification.userId} - Read: ${notification.isRead}`);
    });

  } catch (error) {
    console.error('❌ Error checking users:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers()
  .then(() => {
    console.log('✅ User check completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 User check failed:', error);
    process.exit(1);
  });
