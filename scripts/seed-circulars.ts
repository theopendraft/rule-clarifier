import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const circulars = [
    {
      code: 'ENG-CIR-001',
      title: 'Track Maintenance Guidelines 2024',
      description: '<p>Updated guidelines for track maintenance and inspection procedures.</p>',
      number: 'ENG/2024/001',
      date: new Date('2024-01-15'),
      isActive: true,
    },
    {
      code: 'ENG-CIR-002',
      title: 'Bridge Inspection Protocol',
      description: '<p>New protocols for bridge inspection and safety assessment.</p>',
      number: 'ENG/2024/002',
      date: new Date('2024-02-20'),
      isActive: true,
    },
    {
      code: 'SAFETY-CIR-001',
      title: 'Emergency Response Procedures',
      description: '<p>Updated emergency response and evacuation procedures for all staff.</p>',
      number: 'SAF/2024/001',
      date: new Date('2024-01-10'),
      isActive: true,
    },
    {
      code: 'SAFETY-CIR-002',
      title: 'Personal Protective Equipment Standards',
      description: '<p>Mandatory PPE requirements for railway operations personnel.</p>',
      number: 'SAF/2024/002',
      date: new Date('2024-03-05'),
      isActive: true,
    },
    {
      code: 'SNT-CIR-001',
      title: 'Signal System Maintenance',
      description: '<p>Guidelines for signal system maintenance and testing procedures.</p>',
      number: 'SNT/2024/001',
      date: new Date('2024-01-25'),
      isActive: true,
    },
    {
      code: 'SNT-CIR-002',
      title: 'Telecommunication Equipment Updates',
      description: '<p>New standards for telecommunication equipment installation and maintenance.</p>',
      number: 'SNT/2024/002',
      date: new Date('2024-02-15'),
      isActive: true,
    },
    {
      code: 'MECH-CIR-001',
      title: 'Rolling Stock Maintenance Schedule',
      description: '<p>Updated maintenance schedule for locomotives and coaches.</p>',
      number: 'MECH/2024/001',
      date: new Date('2024-01-20'),
      isActive: true,
    },
    {
      code: 'ELEC-CIR-001',
      title: 'Overhead Equipment Inspection',
      description: '<p>Guidelines for overhead electrical equipment inspection and maintenance.</p>',
      number: 'ELEC/2024/001',
      date: new Date('2024-02-10'),
      isActive: true,
    },
    {
      code: 'OPS-CIR-001',
      title: 'Train Operation Procedures Update',
      description: '<p>Updated procedures for train operations and crew management.</p>',
      number: 'OPS/2024/001',
      date: new Date('2024-01-30'),
      isActive: true,
    },
    {
      code: 'COM-CIR-001',
      title: 'Ticketing System Guidelines',
      description: '<p>New guidelines for ticketing and passenger services.</p>',
      number: 'COM/2024/001',
      date: new Date('2024-02-05'),
      isActive: true,
    },
    {
      code: 'MED-CIR-001',
      title: 'Medical Fitness Standards',
      description: '<p>Updated medical fitness standards for railway staff.</p>',
      number: 'MED/2024/001',
      date: new Date('2024-01-12'),
      isActive: true,
    },
    {
      code: 'SEC-CIR-001',
      title: 'Security Protocol Updates',
      description: '<p>Enhanced security protocols for railway premises and operations.</p>',
      number: 'SEC/2024/001',
      date: new Date('2024-02-28'),
      isActive: true,
    },
  ];

  for (const circular of circulars) {
    await prisma.circular.upsert({
      where: { code: circular.code },
      update: circular,
      create: circular,
    });
  }

  console.log('Circulars seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
