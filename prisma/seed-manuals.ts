import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const DEPARTMENTS = ['Engineering', 'SNT', 'Safety', 'Mechanical', 'Electrical', 'Commercial', 'Security', 'Medical', 'TRD', 'Operations']

async function main() {
  console.log('Seeding manuals...')

  for (const dept of DEPARTMENTS) {
    const manuals = [
      {
        code: `${dept.toUpperCase()}-001`,
        title: `${dept} Operations Manual`,
        description: `Comprehensive guide for ${dept} department operations and procedures`,
        version: '1.0',
        pdfUrl: 'https://utfs.io/f/dummy-manual.pdf',
        pdfFileName: `${dept}-operations-manual.pdf`,
        isActive: true
      },
      {
        code: `${dept.toUpperCase()}-002`,
        title: `${dept} Safety Guidelines`,
        description: `Safety protocols and guidelines for ${dept} department`,
        version: '2.1',
        pdfUrl: 'https://utfs.io/f/dummy-safety.pdf',
        pdfFileName: `${dept}-safety-guidelines.pdf`,
        isActive: true
      },
      {
        code: `${dept.toUpperCase()}-003`,
        title: `${dept} Technical Standards`,
        description: `Technical standards and specifications for ${dept} operations`,
        version: '1.5',
        pdfUrl: 'https://utfs.io/f/dummy-technical.pdf',
        pdfFileName: `${dept}-technical-standards.pdf`,
        isActive: true
      }
    ]

    for (const manual of manuals) {
      await prisma.manual.upsert({
        where: { code: manual.code },
        update: {},
        create: manual
      })
      console.log(`Created manual: ${manual.code}`)
    }
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
