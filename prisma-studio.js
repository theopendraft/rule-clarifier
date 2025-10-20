// Custom script to run Prisma Studio with increased payload limits
const { spawn } = require('child_process');
const path = require('path');

// Set environment variables to increase payload size
process.env.PRISMA_STUDIO_MAX_PAYLOAD_SIZE_MB = '100'; // Increase to 100MB

// Run Prisma Studio with the custom environment
const prismaStudioProcess = spawn('npx', ['prisma', 'studio'], {
  stdio: 'inherit',
  env: process.env
});

console.log('Starting Prisma Studio with increased payload size limit...');

prismaStudioProcess.on('error', (error) => {
  console.error('Failed to start Prisma Studio:', error);
});

prismaStudioProcess.on('close', (code) => {
  console.log(`Prisma Studio process exited with code ${code}`);
});