import { PrismaClient } from '@prisma/client';
import fs from 'fs';

async function importData() {
  const prisma = new PrismaClient();

  
  try {
    console.log('🔄 Connecting to new database...');
    await prisma.$connect();
    console.log('✅ Connected to new database');
    
    console.log('📖 Reading exported data...');
    const data = JSON.parse(fs.readFileSync('database_export.json', 'utf8'));
    
    console.log('🗑️ Clearing existing data...');
    // Clear existing data in reverse order of dependencies
    await prisma.notification.deleteMany();
    await prisma.changeLog.deleteMany();
    await prisma.ruleImage.deleteMany();
    await prisma.ruleLink.deleteMany();
    await prisma.contentBlock.deleteMany();
    await prisma.rule.deleteMany();
    await prisma.chapter.deleteMany();
    await prisma.ruleBook.deleteMany();
    await prisma.manual.deleteMany();
    await prisma.circular.deleteMany();
    await prisma.image.deleteMany();
    await prisma.user.deleteMany();
    
    console.log('📥 Importing data...');
    
    // Import in order of dependencies
    if (data.users.length > 0) {
      console.log(`  Importing ${data.users.length} users...`);
      await prisma.user.createMany({ data: data.users });
    }
    
    if (data.ruleBooks.length > 0) {
      console.log(`  Importing ${data.ruleBooks.length} rule books...`);
      await prisma.ruleBook.createMany({ data: data.ruleBooks });
    }
    
    if (data.chapters.length > 0) {
      console.log(`  Importing ${data.chapters.length} chapters...`);
      await prisma.chapter.createMany({ data: data.chapters });
    }
    
    if (data.rules.length > 0) {
      console.log(`  Importing ${data.rules.length} rules...`);
      await prisma.rule.createMany({ data: data.rules });
    }
    
    if (data.contentBlocks.length > 0) {
      console.log(`  Importing ${data.contentBlocks.length} content blocks...`);
      await prisma.contentBlock.createMany({ data: data.contentBlocks });
    }
    
    if (data.ruleLinks.length > 0) {
      console.log(`  Importing ${data.ruleLinks.length} rule links...`);
      await prisma.ruleLink.createMany({ data: data.ruleLinks });
    }
    
    if (data.images.length > 0) {
      console.log(`  Importing ${data.images.length} images...`);
      await prisma.image.createMany({ data: data.images });
    }
    
    if (data.ruleImages.length > 0) {
      console.log(`  Importing ${data.ruleImages.length} rule images...`);
      await prisma.ruleImage.createMany({ data: data.ruleImages });
    }
    
    if (data.manuals.length > 0) {
      console.log(`  Importing ${data.manuals.length} manuals...`);
      await prisma.manual.createMany({ data: data.manuals });
    }
    
    if (data.circulars.length > 0) {
      console.log(`  Importing ${data.circulars.length} circulars...`);
      await prisma.circular.createMany({ data: data.circulars });
    }
    
    if (data.changeLogs.length > 0) {
      console.log(`  Importing ${data.changeLogs.length} change logs...`);
      await prisma.changeLog.createMany({ data: data.changeLogs });
    }
    
    if (data.notifications.length > 0) {
      console.log(`  Importing ${data.notifications.length} notifications...`);
      await prisma.notification.createMany({ data: data.notifications });
    }
    
    console.log('✅ Data import completed successfully!');
    
    // Verify import
    console.log('🔍 Verifying import...');
    const counts = await Promise.all([
      prisma.user.count(),
      prisma.ruleBook.count(),
      prisma.chapter.count(),
      prisma.rule.count(),
      prisma.manual.count(),
      prisma.circular.count(),
      prisma.changeLog.count(),
      prisma.notification.count()
    ]);
    
    console.log('📊 Final counts:');
    console.log(`  Users: ${counts[0]}`);
    console.log(`  Rule Books: ${counts[1]}`);
    console.log(`  Chapters: ${counts[2]}`);
    console.log(`  Rules: ${counts[3]}`);
    console.log(`  Manuals: ${counts[4]}`);
    console.log(`  Circulars: ${counts[5]}`);
    console.log(`  Change Logs: ${counts[6]}`);
    console.log(`  Notifications: ${counts[7]}`);
    
  } catch (error) {
    console.error('❌ Import failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

importData();
