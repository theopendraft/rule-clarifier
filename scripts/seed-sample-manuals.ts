import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleManuals = [
  {
    code: 'ENG-001',
    title: 'Engineering Standards and Practices',
    description: 'Comprehensive guide for track maintenance and engineering operations',
    version: '2.1',
  },
  {
    code: 'SNT-001',
    title: 'S&T Manual - Signal and Telecommunication',
    description: 'Guidelines for signal systems, telecommunications, and interlocking',
    version: '3.0',
  },
  {
    code: 'SAF-001',
    title: 'Safety Rules and Regulations',
    description: 'Critical safety protocols and emergency procedures',
    version: '4.2',
  },
  {
    code: 'MECH-001',
    title: 'Mechanical Engineering Manual',
    description: 'Rolling stock maintenance and repair procedures',
    version: '1.5',
  },
  {
    code: 'ELEC-001',
    title: 'Electrical Traction Manual',
    description: 'Electric traction systems and overhead equipment',
    version: '2.3',
  },
  {
    code: 'COM-001',
    title: 'Commercial Operations Manual',
    description: 'Ticketing, revenue management, and commercial procedures',
    version: '1.8',
  },
  {
    code: 'SEC-001',
    title: 'Security and Vigilance Manual',
    description: 'Security protocols and vigilance procedures',
    version: '2.0',
  },
  {
    code: 'MED-001',
    title: 'Medical Services Manual',
    description: 'Healthcare guidelines and emergency medical procedures',
    version: '1.2',
  },
  {
    code: 'TRD-001',
    title: 'Traffic and Transportation Rules',
    description: 'Train operations and traffic management',
    version: '5.1',
  },
  {
    code: 'OPS-001',
    title: 'Operations Manual',
    description: 'General operational procedures and guidelines',
    version: '3.5',
  },
];

async function seedManuals() {
  try {
    console.log('🌱 Seeding sample manuals...');

    for (const manualData of sampleManuals) {
      const manual = await prisma.manual.create({
        data: {
          ...manualData,
          isActive: true,
          pdfUrl: `/manual/${manualData.code.toLowerCase()}.pdf`,
          pdfFileName: `${manualData.code.toLowerCase()}.pdf`,
        },
      });
      console.log(`✓ Created: ${manual.title}`);
    }

    console.log(`\n✅ Successfully seeded ${sampleManuals.length} manuals!`);
    
    // Summary
    const total = await prisma.manual.count();
    console.log(`📊 Total manuals in database: ${total}`);

  } catch (error) {
    console.error('❌ Error seeding manuals:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedManuals();
