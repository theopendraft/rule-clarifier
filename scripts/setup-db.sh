#!/bin/bash

# Database setup script for Rule Clarifier AI

echo "Setting up database for Rule Clarifier AI..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL environment variable is not set."
    echo "Please set it to your PostgreSQL connection string."
    echo "Example: export DATABASE_URL='postgresql://username:password@localhost:5432/rule_clarifier_db?schema=public'"
    exit 1
fi

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "Running database migrations..."
npx prisma migrate dev --name init

# Run data seeding
echo "Seeding database with rule book data..."
npx tsx scripts/seed-database.ts

echo "Database setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Make sure your PostgreSQL database is running"
echo "2. Set up your environment variables in .env file"
echo "3. Run 'npm run dev' to start the Next.js development server"
echo "4. Visit http://localhost:3000 to view the application"
echo "5. Visit /admin/rulebook to manage rule books"
