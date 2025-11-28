const { PrismaClient } = require('@prisma/client');

(async () => {
  const prisma = new PrismaClient();
  try {
    const manuals = await prisma.manual.findMany({ select: { id: true, code: true, title: true }, take: 10 });
    console.log('manuals_count:', manuals.length);
    console.log('sample:', manuals);
  } catch (e) {
    console.error('ERROR', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
