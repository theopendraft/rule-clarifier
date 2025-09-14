# Database Setup Guide

This guide will help you set up the PostgreSQL database for the Rule Clarifier AI application.

## Prerequisites

1. **PostgreSQL Database**: Make sure you have PostgreSQL installed and running
2. **Node.js**: Ensure Node.js is installed (version 18 or higher)
3. **Environment Variables**: Set up your database connection string

## Database Schema

The application uses a comprehensive schema with the following main entities:

### Core Models
- **RuleBook**: Main rule book container
- **Chapter**: Top-level organizational unit
- **SubChapter**: Optional sub-organization within chapters
- **Rule**: Individual rules with content and formatting
- **ContentBlock**: Rich text content blocks (text, images, tables, etc.)
- **RuleLink**: Links between rules, manuals, and external resources

### Supporting Models
- **User**: User management and authentication
- **Image**: Image uploads and metadata
- **ChangeLog**: Complete audit trail for all changes

## Setup Steps

### 1. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/rule_clarifier_db?schema=public"

# UploadThing (for image uploads)
UPLOADTHING_SECRET="your_uploadthing_secret_here"
UPLOADTHING_APP_ID="your_uploadthing_app_id_here"

# Authentication (if needed)
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Database Creation

Create a PostgreSQL database for the application:

```sql
CREATE DATABASE rule_clarifier_db;
```

### 3. Run Database Setup

Execute the setup script:

```bash
# Make sure you're in the project root
cd /path/to/rule-clarifier-ai

# Set your database URL
export DATABASE_URL="postgresql://username:password@localhost:5432/rule_clarifier_db?schema=public"

# Run the setup script
./scripts/setup-db.sh
```

Or run the commands manually:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Migrate existing data
npx tsx src/scripts/migrate-data.ts
```

### 4. Verify Setup

Check that the database was created successfully:

```bash
npx prisma studio
```

This will open Prisma Studio in your browser where you can view and manage your data.

## Features

### Rule Book Management
- **Hierarchical Structure**: Books → Chapters → SubChapters → Rules
- **Rich Content**: Support for text, images, tables, and formatted content
- **Version Control**: Track changes and maintain history
- **Search & Navigation**: Easy browsing through chapters and rules

### Content Management
- **Rich Text Editor**: Support for headings, colors, links, and formatting
- **Image Uploads**: Integrated with UploadThing for image management
- **Table Support**: Create and manage data tables
- **Link Management**: Connect rules to manuals, circulars, and external resources

### Audit Trail
- **Complete Logging**: Every change is tracked with user, timestamp, and reason
- **Change History**: View all modifications made to any entity
- **Supporting Documents**: Attach documents to justify changes
- **Rollback Capability**: Track changes for potential rollbacks

### Admin Interface
- **Rule Book Overview**: Dashboard with statistics and quick access
- **Chapter Management**: Create, edit, and organize chapters
- **Rule Management**: Add, edit, and manage individual rules
- **Change Logs**: View and track all system changes

## API Usage

### Rule Book Service

```typescript
import { RuleBookService } from '@/api/rule-books';

// Get all rule books
const books = await RuleBookService.getRuleBooks();

// Get specific rule book
const book = await RuleBookService.getRuleBookById('book-id');

// Create new chapter
const chapter = await RuleBookService.createChapter({
  bookId: 'book-id',
  number: 1,
  title: 'New Chapter',
  subtitle: 'Optional subtitle',
  section: 'Optional section'
}, 'user-id', 'Reason for creation');

// Update rule
const updatedRule = await RuleBookService.updateRule('rule-id', {
  title: 'Updated Title',
  content: 'Updated content'
}, 'user-id', 'Reason for update');

// Get change logs
const logs = await RuleBookService.getChangeLogs();
```

### Custom Hook

```typescript
import { useRuleBook } from '@/hooks/useRuleBook';

function MyComponent() {
  const { ruleBook, loading, error, updateRule } = useRuleBook();
  
  // Use the data...
}
```

## Database Schema Details

### RuleBook
- `id`: Unique identifier
- `title`: Rule book title
- `description`: Optional description
- `version`: Version number
- `isActive`: Active status
- `createdBy`: User who created the book

### Chapter
- `id`: Unique identifier
- `bookId`: Reference to parent rule book
- `number`: Chapter number
- `title`: Chapter title
- `subtitle`: Optional subtitle
- `section`: Optional section name
- `order`: Display order

### Rule
- `id`: Unique identifier
- `chapterId`: Reference to parent chapter
- `subChapterId`: Optional reference to sub-chapter
- `number`: Rule number (e.g., "4.01")
- `title`: Rule title
- `content`: Rule content (rich text)
- `order`: Display order

### ContentBlock
- `id`: Unique identifier
- `ruleId`: Reference to parent rule
- `type`: Content type (TEXT, HEADING, IMAGE, TABLE, etc.)
- `content`: Block content
- `metadata`: Additional formatting data
- `order`: Display order

### ChangeLog
- `id`: Unique identifier
- `entityType`: Type of entity changed
- `entityId`: ID of changed entity
- `action`: Action performed (CREATE, UPDATE, DELETE, etc.)
- `changes`: JSON object with old and new values
- `reason`: Reason for change
- `userId`: User who made the change
- `createdAt`: Timestamp

## Troubleshooting

### Common Issues

1. **Connection Error**: Verify your DATABASE_URL is correct
2. **Migration Failed**: Check PostgreSQL is running and accessible
3. **Permission Error**: Ensure database user has proper permissions
4. **Schema Error**: Run `npx prisma generate` to update client

### Reset Database

To reset the database completely:

```bash
npx prisma migrate reset
npx tsx src/scripts/migrate-data.ts
```

### View Database

Use Prisma Studio to view and manage your data:

```bash
npx prisma studio
```

## Next Steps

1. **Configure UploadThing**: Set up image upload service
2. **Set up Authentication**: Configure user management
3. **Customize UI**: Modify the admin interface as needed
4. **Add Features**: Extend functionality based on requirements

## Support

For issues or questions:
1. Check the Prisma documentation
2. Review the database logs
3. Verify environment variables
4. Check PostgreSQL connection
