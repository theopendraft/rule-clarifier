import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addDummyManuals() {
  try {
    // Add SNT dummy manual
    await prisma.manual.create({
      data: {
        code: 'SNT-001',
        title: 'SNT Operations Manual',
        description: 'Standard operating procedures for SNT department',
        version: '1.0',
        isActive: true
      }
    })

    // Add Safety dummy manual
    await prisma.manual.create({
      data: {
        code: 'SAFETY-001',
        title: 'Safety Guidelines Manual',
        description: 'Comprehensive safety guidelines and procedures',
        version: '1.0',
        isActive: true
      }
    })

    console.log('Dummy manuals added successfully!')
  } catch (error) {
    console.error('Error adding dummy manuals:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addDummyManuals()