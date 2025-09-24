import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixRuleOrder() {
  try {
    console.log('Fixing rule order...');
    
    // Get chapter 4
    const chapter = await prisma.chapter.findFirst({
      where: { number: 4 }
    });
    
    if (!chapter) {
      console.error('Chapter 4 not found.');
      return;
    }
    
    // Get all rules for chapter 4
    const rules = await prisma.rule.findMany({
      where: { chapterId: chapter.id },
      orderBy: { number: 'asc' }
    });
    
    console.log(`Found ${rules.length} rules to reorder`);
    
    // Sort rules by number (convert to float for proper numeric sorting)
    const sortedRules = rules.sort((a, b) => {
      const numA = parseFloat(a.number);
      const numB = parseFloat(b.number);
      return numA - numB;
    });
    
    // Update order field for each rule
    for (let i = 0; i < sortedRules.length; i++) {
      await prisma.rule.update({
        where: { id: sortedRules[i].id },
        data: { order: i + 1 }
      });
      
      console.log(`Updated rule ${sortedRules[i].number} order to ${i + 1}`);
    }
    
    console.log('Rule order fixed successfully');
    
  } catch (error) {
    console.error('Error fixing rule order:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixRuleOrder();