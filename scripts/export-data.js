import { PrismaClient } from '@prisma/client';
import fs from 'fs';

async function exportData() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Connecting to old database...');
    await prisma.$connect();
    console.log('✅ Connected to old database');
    
    console.log('📊 Exporting data...');
    
    // Export all data from each table
    const data = {
      users: await prisma.user.findMany(),
      ruleBooks: await prisma.ruleBook.findMany(),
      chapters: await prisma.chapter.findMany(),
      rules: await prisma.rule.findMany(),
      contentBlocks: await prisma.contentBlock.findMany(),
      ruleLinks: await prisma.ruleLink.findMany(),
      images: await prisma.image.findMany(),
      ruleImages: await prisma.ruleImage.findMany(),
      manuals: await prisma.manual.findMany(),
      circulars: await prisma.circular.findMany(),
      changeLogs: await prisma.changeLog.findMany(),
      notifications: await prisma.notification.findMany()
    };
    
    // Write to JSON file
    fs.writeFileSync('database_export.json', JSON.stringify(data, null, 2));
    
    console.log('📈 Export summary:');
    console.log(`  Users: ${data.users.length}`);
    console.log(`  Rule Books: ${data.ruleBooks.length}`);
    console.log(`  Chapters: ${data.chapters.length}`);
    console.log(`  Rules: ${data.rules.length}`);
    console.log(`  Content Blocks: ${data.contentBlocks.length}`);
    console.log(`  Rule Links: ${data.ruleLinks.length}`);
    console.log(`  Images: ${data.images.length}`);
    console.log(`  Rule Images: ${data.ruleImages.length}`);
    console.log(`  Manuals: ${data.manuals.length}`);
    console.log(`  Circulars: ${data.circulars.length}`);
    console.log(`  Change Logs: ${data.changeLogs.length}`);
    console.log(`  Notifications: ${data.notifications.length}`);
    
    console.log('✅ Data exported successfully to database_export.json');
    
  } catch (error) {
    console.error('❌ Export failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

exportData();