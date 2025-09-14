# Complete Database Setup Guide

This guide will help you set up the PostgreSQL database with the rule book data and run the full application.

## Prerequisites

1. **PostgreSQL Database**: Make sure you have PostgreSQL installed and running
2. **Node.js**: Ensure Node.js is installed (version 18 or higher)
3. **Environment Variables**: Set up your database connection string

## Quick Setup

### 1. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/rule_clarifier_db?schema=public"

# UploadThing (for image uploads)
UPLOADTHING_SECRET="your_uploadthing_secret_here"
UPLOADTHING_APP_ID="your_uploadthing_app_id_here"
```

### 2. Database Setup

Run the complete setup script:

```bash
# Set your database URL
export DATABASE_URL="postgresql://username:password@localhost:5432/rule_clarifier_db?schema=public"

# Run the setup script
npm run db:setup
```

This will:
- Generate Prisma client
- Run database migrations
- Seed the database with all rule book data (17 chapters, 170+ rules)

### 3. Start the Application

Run both the API server and frontend:

```bash
# Start both server and client
npm run dev:full
```

Or run them separately:

```bash
# Terminal 1: Start API server
npm run server

# Terminal 2: Start frontend
npm run dev
```

## What's Included

### Database Schema
- **RuleBook**: Main container for rule books
- **Chapter**: 17 chapters with railway operating procedures
- **Rule**: 170+ individual rules with detailed content
- **ContentBlock**: Rich text content blocks
- **RuleLink**: Links between rules and resources
- **ChangeLog**: Complete audit trail
- **User**: User management
- **Image**: Image uploads

### Seeded Data
- **17 Chapters**: Complete railway operating manual
- **170+ Rules**: All original rule content with proper formatting
- **Admin User**: Default administrator account
- **Change Logs**: Initial creation entries

### API Endpoints
- `GET /api/rule-books` - Get all rule books
- `GET /api/rule-books/:id` - Get specific rule book
- `PUT /api/rules/:id` - Update rule
- `POST /api/chapters` - Create chapter
- `POST /api/rules` - Create rule
- `GET /api/change-logs` - Get change logs

## Features

### Rule Book Management
- ✅ **Complete Data**: All 17 chapters with 170+ rules
- ✅ **Rich Content**: Detailed rule content with references
- ✅ **Hierarchical Structure**: Books → Chapters → Rules
- ✅ **Search & Navigation**: Easy browsing through content

### Admin Interface
- ✅ **Rule Book Overview**: Dashboard with statistics
- ✅ **Chapter Management**: View and manage chapters
- ✅ **Rule Management**: Edit individual rules
- ✅ **Change Logs**: Track all modifications
- ✅ **Real-time Updates**: Live data from database

### Audit Trail
- ✅ **Complete Logging**: Every change tracked
- ✅ **User Attribution**: Know who made changes
- ✅ **Change History**: Full modification history
- ✅ **Supporting Documents**: Attach justification

## Development Workflow

### 1. Database Operations
```bash
# View data in Prisma Studio
npm run db:studio

# Reset database (careful!)
npm run db:reset

# Re-seed data
npm run db:seed
```

### 2. API Development
```bash
# Start API server only
npm run server

# Test API endpoints
curl http://localhost:3000/api/rule-books
```

### 3. Frontend Development
```bash
# Start frontend only
npm run dev

# Build for production
npm run build
```

## Production Deployment

### 1. Environment Variables
Set up production environment variables:
- `DATABASE_URL`: Production PostgreSQL connection
- `UPLOADTHING_SECRET`: Production UploadThing secret
- `UPLOADTHING_APP_ID`: Production UploadThing app ID

### 2. Database Migration
```bash
# Run production migrations
npx prisma migrate deploy

# Seed production data
npm run db:seed
```

### 3. Build and Deploy
```bash
# Build the application
npm run build

# Start production server
npm run server
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check DATABASE_URL format
   - Ensure database exists

2. **Migration Errors**
   - Reset database: `npm run db:reset`
   - Re-run setup: `npm run db:setup`

3. **API Server Not Starting**
   - Check port 3000 is available
   - Verify environment variables
   - Check database connection

4. **Frontend Not Loading Data**
   - Ensure API server is running
   - Check browser console for errors
   - Verify API endpoints are accessible

### Reset Everything
```bash
# Complete reset
npm run db:reset
npm run db:seed
npm run dev:full
```

## Next Steps

1. **Customize Content**: Edit rules and chapters as needed
2. **Add Users**: Create additional user accounts
3. **Configure UploadThing**: Set up image uploads
4. **Deploy**: Deploy to your preferred platform
5. **Monitor**: Set up monitoring and logging

## Support

For issues or questions:
1. Check the database connection
2. Verify environment variables
3. Check the API server logs
4. Review the Prisma schema
5. Check the browser console

The application is now fully functional with a real database backend!
