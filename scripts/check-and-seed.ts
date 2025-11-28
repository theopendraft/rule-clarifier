import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAndSeed() {
  try {
    // Check if manuals exist
    const manualCount = await prisma.manual.count();
    console.log(`Found ${manualCount} manuals in database`);

    if (manualCount === 0) {
      console.log('No manuals found. Creating sample manual...');
      
      const manual = await prisma.manual.create({
        data: {
          code: 'MAN-001',
          title: 'Sample Railway Manual - Engineering Department',
          description: 'A comprehensive guide for engineering operations and maintenance',
          version: '1.0',
          isActive: true,
          pdfUrl: '/manual/sample.pdf',
          pdfFileName: 'sample.pdf',
        },
      });

      console.log('✓ Created sample manual:', manual.title);
    } else {
      console.log('✓ Database already has manuals');
    }

    // Check chapters
    const chapterCount = await prisma.chapter.count();
    console.log(`Found ${chapterCount} chapters in database`);

    // Check rules
    const ruleCount = await prisma.rule.count();
    console.log(`Found ${ruleCount} rules in database`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAndSeed();
