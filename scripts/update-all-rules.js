import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';

const prisma = new PrismaClient();

function parseRules(html) {
  const rules = [];
  const sections = html.match(/<section id="([^"]+)">(.*?)<\/section>/gs) || [];
  
  sections.forEach((section, index) => {
    const idMatch = section.match(/id="([^"]+)"/);
    const contentMatch = section.match(/<div>(.*?)<\/div>/s);
    
    if (idMatch && contentMatch) {
      const ruleNumber = idMatch[1];
      const content = contentMatch[1].trim();
      const title = extractTitle(content);
      
      rules.push({
        number: ruleNumber,
        title: title,
        content: content,
        order: index + 1
      });
    }
  });
  
  return rules;
}

function extractTitle(content) {
  const firstP = content.match(/<p[^>]*>(.*?)<\/p>/s);
  if (firstP) {
    const text = firstP[1].replace(/<[^>]*>/g, '').trim();
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
  }
  return 'Railway Rule';
}

async function updateAllRules() {
  try {
    console.log('Reading HTML file...');
    const htmlContent = readFileSync('e:/ADRIG/rule-clarifier-ai/app/components/complete-rules.html', 'utf8');
    
    console.log('Parsing rules from HTML content...');
    const rules = parseRules(htmlContent);
    
    // Get chapter 4
    const chapter = await prisma.chapter.findFirst({
      where: { number: 4 }
    });
    
    if (!chapter) {
      console.error('Chapter 4 not found. Run update-chapter4.js first.');
      return;
    }
    
    console.log(`Found ${rules.length} rules to update`);
    
    for (const rule of rules) {
      const updatedRule = await prisma.rule.upsert({
        where: {
          chapterId_number: {
            chapterId: chapter.id,
            number: rule.number
          }
        },
        update: {
          title: rule.title,
          content: rule.content,
          order: rule.order
        },
        create: {
          chapterId: chapter.id,
          number: rule.number,
          title: rule.title,
          content: rule.content,
          order: rule.order
        }
      });
      
      console.log(`Updated rule ${rule.number}: ${updatedRule.id}`);
    }
    
    console.log('All rules updated successfully');
    
  } catch (error) {
    console.error('Error updating rules:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAllRules();