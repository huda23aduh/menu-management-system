# CLOIT Management System

A full-stack monorepo application built with Next.js (frontend) and NestJS (backend) for managing hierarchical menu systems with a modern, responsive interface.

## 📋 Overview

This project is a monorepo containing both frontend and backend applications that work together to provide a comprehensive menu management system. The application features a hierarchical tree structure for menus, real-time CRUD operations, and a responsive design that works seamlessly across desktop and mobile devices.

### Key Features
- **Hierarchical Menu Management**: Visual tree structure with expand/collapse functionality
- **Real-time Operations**: Instant updates across the interface
- **Responsive Design**: Mobile-first approach with collapsible sidebar
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Clean, professional interface with Tailwind CSS

## 🏗️ Project Architecture

```
cloit-management-system/
├── apps/
│   ├── frontend/                 # Next.js 14+ TypeScript application
│   │   ├── src/
│   │   │   ├── app/             # App router pages and layouts
│   │   │   │   ├── api/         # handle menu api route
│   │   │   │   ├── menus/       # Menu management page
│   │   │   │   ├── assets/      # SVG icons and static assets
│   │   │   │   └── globals.css  # Global styles
│   │   │   ├── components/      # Reusable React components
│   │   │   │   ├── Sidebar.tsx  # Navigation sidebar
│   │   │   │   ├── Header.tsx   # Page header with breadcrumbs
│   │   │   │   ├── MenuTree.tsx # Tree visualization component
│   │   │   │   └── MenuDetails.tsx # Menu details form
│   │   │   ├── hooks/           # Custom React hooks
│   │   │   │   └── useMenus.ts  # Menu state management
│   │   │   ├── services/        # API service layer
│   │   │   │   └── menuService.ts # API communication
|   |   |   ├── store/           # store for redux
│   │   │   │   └── menuSlice.ts # redux slice for menu
│   │   │   └── types/           # TypeScript definitions
│   │   │       └── menu.ts      # Menu interfaces
│   │   ├── next.config.mjs      # Next.js configuration
│   │   ├── package.json
│   │   └── tailwind.config.ts   # Tailwind CSS configuration
│   └── backend/                  # NestJS application
│       ├── src/
│       │   ├── menu/            # Menu module
│       │   │   ├── menu.controller.ts
│       │   │   ├── menu.service.ts
│       │   │   └── menu.module.ts
│       │   ├── prisma/          # Database configuration
│       │   │   ├── schema.prisma # Database schema
│       │   │   └── migrations/  # Database migrations
│       │   ├── app.module.ts    # Root module
│       │   └── main.ts          # Application entry point
│       ├── package.json
│       └── prisma/
│           └── seed.ts          # Database seed data
├── package.json                 # Root package.json
└── README.md
```

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.3+
- **Icons**: SVG with SVGR Webpack loader
- **State Management**: React Hooks (useState, useEffect, useMemo, useCallback)
- **HTTP Client**: Native Fetch API
- **Build Tool**: Next.js built-in bundler

### Backend
- **Framework**: NestJS 10.x
- **Language**: TypeScript 5.x
- **ORM**: Prisma 5.x
- **Database**: PostgreSQL 15+ (compatible with MySQL, SQLite)
- **API**: RESTful endpoints
- **Validation**: Class Validator & Class Transformer
- **CORS**: Enabled for frontend communication

### Development & Tools
- **Package Manager**: npm 9+ (or yarn)
- **Monorepo**: npm workspaces
- **Database**: Docker (recommended) or local installation
- **Environment Management**: dotenv
- **Code Quality**: ESLint, TypeScript compiler

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** 18.17 or later
- **npm** 9.x or later (or **yarn** 1.22+)
- **PostgreSQL** 15+ or compatible database
- **Git** for version control

### Optional (Recommended)
- **Docker** & **Docker Compose** for containerized database
- **VS Code** with recommended extensions
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - Prisma extension
  - Auto Rename Tag

## 🛠️ Installation & Setup

### 1. Clone and Initial Setup

```bash
# Clone the repository
git clone <your-repository-url>
cd cloit-management-system

# Install root dependencies (if any root-level dependencies exist)
npm install
```

### 2. Database Setup

#### Option A: Using Docker (Recommended for Development)

```bash
# Start PostgreSQL with Docker Compose
docker-compose up -d

# Or run PostgreSQL directly with Docker
docker run --name cloit-db \
  -e POSTGRES_USER=cloit_user \
  -e POSTGRES_PASSWORD=cloit_password \
  -e POSTGRES_DB=cloit_db \
  -p 5432:5432 \
  -d postgres:15
```

#### Option B: Local PostgreSQL Installation

1. Install PostgreSQL on your system
2. Create a new database:
```sql
CREATE DATABASE cloit_db;
CREATE USER cloit_user WITH PASSWORD 'cloit_password';
GRANT ALL PRIVILEGES ON DATABASE cloit_db TO cloit_user;
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd apps/backend

# Install backend dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Update environment variables
nano .env  # or use your preferred editor
```

**Backend Environment Variables (.env):**
```env
# Database Configuration
DATABASE_URL="postgresql://cloit_user:cloit_password@localhost:5432/cloit_db"

# Application Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Optional: Logging
LOG_LEVEL=debug
```

**Initialize Database:**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database with initial data (optional)
npx prisma db seed
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory
cd apps/frontend

# Install frontend dependencies
npm install

# Copy environment configuration
cp .env.example .env.local

# Update environment variables if needed
nano .env.local
```

**Frontend Environment Variables (.env.local):**
```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Application Configuration
NEXT_PUBLIC_APP_NAME=CLOIT

# Optional: Feature flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

## 🎯 Running the Applications

### Development Mode

#### Option 1: Run Both Applications from Root (Recommended)

```bash
# From the root directory, run both applications
npm run dev
```

This command uses the root package.json scripts to start both frontend and backend simultaneously.

#### Option 2: Run Applications Separately

**Terminal 1 - Backend:**
```bash
cd apps/backend
npm run start:dev
```
Backend will be available at: http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd apps/frontend
npm run dev
```
Frontend will be available at: http://localhost:3000

### Production Build

```bash
# Build both applications
npm run build

# Start production servers
npm start
```

## 📝 Available Scripts

### Root Level Scripts (package.json)
```bash
npm run install:all          # Install dependencies for all workspaces
npm run dev                  # Start both frontend and backend in dev mode
npm run build                # Build both applications for production
npm start                   # Start both applications in production mode
npm run clean               # Remove node_modules and build artifacts
npm run lint:all            # Run linting for all workspaces
```

### Frontend Scripts (apps/frontend)
```bash
npm run dev                 # Start Next.js development server
npm run build              # Build for production
npm run start              # Start production server
npm run lint               # Run ESLint
npm run type-check         # Run TypeScript compiler check
```

### Backend Scripts (apps/backend)
```bash
npm run start:dev          # Start NestJS in development mode (watch)
npm run build              # Build the application
npm run start:prod         # Start production server
npm run test               # Run unit tests
npm run test:e2e           # Run end-to-end tests
npm run test:watch         # Run tests in watch mode
npm run lint               # Run ESLint
npm run type-check         # Run TypeScript compiler check
```

### Database Scripts (apps/backend)
```bash
npx prisma generate         # Generate Prisma client
npx prisma migrate dev      # Create and run migration
npx prisma migrate reset    # Reset database and run migrations
npx prisma db seed         # Seed database with sample data
npx prisma studio          # Open Prisma Studio for database management
```

## 🔧 Configuration

### Backend Configuration

The backend uses NestJS framework with the following key configurations:

**src/main.ts:**
```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT || 3001);
}
```

**Database Schema (prisma/schema.prisma):**
```prisma
model Menu {
  id        String   @id @default(uuid())
  name      String
  parentId  String?
  depth     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  parent   Menu?   @relation("MenuChildren", fields: [parentId], references: [id])
  children Menu[]  @relation("MenuChildren")
  
  @@map("menus")
}
```

### Frontend Configuration

**Next.js Config (next.config.mjs):**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
```

**Tailwind Config (tailwind.config.ts):**
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        '16': '16px',
        '24': '24px',
      },
    },
  },
  plugins: [],
};

export default config;
```

## 📊 API Documentation

### Menu Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/menus` | Get all menus (tree structure) | - | `MenuItem[]` |
| `GET` | `/menus/:id` | Get specific menu by ID | - | `MenuItem` |
| `POST` | `/menus` | Create new menu | `{ name: string, parentId?: string }` | `MenuItem` |
| `PUT` | `/menus/:id` | Update menu by ID | `{ name: string }` | `MenuItem` |
| `DELETE` | `/menus/:id` | Delete menu by ID | - | `void` |

### Data Types

**MenuItem Interface:**
```typescript
interface MenuItem {
  id: string;
  name: string;
  parentId: string | null;
  depth: number;
  createdAt?: string;
  updatedAt?: string;
  children?: MenuItem[];
  parent?: {
    id: string;
    name: string;
  } | null;
}
```

### API Usage Examples

**Get All Menus:**
```bash
curl -X GET http://localhost:3001/menus
```

**Create New Menu:**
```bash
curl -X POST http://localhost:3001/menus \
  -H "Content-Type: application/json" \
  -d '{
    "name": "System Management",
    "parentId": null
  }'
```

**Update Menu:**
```bash
curl -X PUT http://localhost:3001/menus/12345 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Menu Name"
  }'
```

## 🎨 Features & Usage

### Menu Management Interface

1. **Tree Visualization**:
   - Expand/collapse nodes with chevron icons
   - Visual hierarchy with connecting lines
   - Real-time selection highlighting

2. **Menu Operations**:
   - Create root menus and submenus
   - Edit menu names inline
   - View menu details (ID, Depth, Parent Data)
   - Expand/collapse entire tree

3. **Responsive Design**:
   - Sidebar automatically collapses on mobile
   - Touch-friendly interface
   - Optimized layout for all screen sizes

### Navigation Structure
- **Systems**: System management dashboard
- **System Code**: Code management interface
- **Properties**: Configuration properties
- **Menus**: Menu management (current page)
- **API List**: API documentation and testing
- **Users & Group**: User management
- **Competition**: Competition management

## 🗃️ Database Management

### Prisma Commands

```bash
# Create new migration
npx prisma migrate dev --name add_feature_name

# Reset database (development)
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Sample Data Seed

The database can be seeded with sample menu structure:

```typescript
// prisma/seed.ts
async function main() {
  // Create sample menus hierarchy
  const systemManagement = await prisma.menu.create({
    data: {
      name: "System Management",
      depth: 0,
    },
  });

  await prisma.menu.create({
    data: {
      name: "Users & Groups",
      parentId: systemManagement.id,
      depth: 1,
    },
  });
}
```

## 🚀 Deployment

### Backend Deployment

1. **Build the application**:
```bash
cd apps/backend
npm run build
```

2. **Set production environment variables**:
```env
NODE_ENV=production
DATABASE_URL="your_production_database_url"
PORT=3001
FRONTEND_URL="your_production_frontend_url"
```

3. **Deploy to your preferred platform**:
   - **Railway**: Connect GitHub repo for automatic deployment
   - **Heroku**: Use Heroku Postgres and deploy via Git
   - **AWS**: Use Elastic Beanstalk or ECS
   - **DigitalOcean**: App Platform with managed database

### Frontend Deployment

1. **Build the application**:
```bash
cd apps/frontend
npm run build
```

2. **Set production environment variables**:
```env
NEXT_PUBLIC_API_URL="your_production_backend_url"
```

3. **Deploy to your preferred platform**:
   - **Vercel**: Optimal for Next.js with zero configuration
   - **Netlify**: Simple drag-and-drop deployment
   - **AWS**: S3 + CloudFront for static hosting
   - **Railway**: Full-stack deployment with backend

### Environment-Specific Notes

- Update CORS origins in backend for production domains
- Configure production database with proper connection pooling
- Set up SSL certificates for HTTPS
- Configure CDN for frontend assets (if using Vercel/Netlify, this is automatic)

## 🤝 Development Guidelines

### Code Standards

**TypeScript Conventions**:
- Use strict type checking
- Prefer interfaces over types for object definitions
- Use meaningful type and interface names
- Avoid `any` type; use `unknown` when type is uncertain

**React Best Practices**:
- Use functional components with hooks
- Implement proper dependency arrays in useEffect
- Use useCallback for event handlers passed as props
- Implement error boundaries for graceful error handling

**Styling Guidelines**:
- Use Tailwind CSS utility classes primarily
- Extract repeated patterns into component classes
- Maintain consistent spacing and color scheme
- Ensure responsive design for all components

### Git Workflow

1. **Branch Naming**:
   - Feature: `feature/description`
   - Bug fix: `fix/description`
   - Hotfix: `hotfix/description`

2. **Commit Messages**:
   - Use conventional commit format
   - Example: `feat: add menu creation form validation`

3. **Pull Request Process**:
   - Create PR from feature branch to main
   - Include descriptive title and summary
   - Link related issues
   - Request code review from team members

### Testing

**Backend Testing**:
```bash
cd apps/backend
npm test              # Unit tests
npm run test:e2e      # Integration tests
npm run test:cov      # Test coverage
```

**Frontend Testing**:
```bash
cd apps/frontend
npm test              # Unit tests (if configured)
npm run type-check    # TypeScript validation
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   ```bash
   # Check if PostgreSQL is running
   psql -h localhost -U cloit_user -d cloit_db
   
   # Verify connection string in .env file
   # Ensure database exists and user has permissions
   ```

2. **CORS Errors**
   - Verify `FRONTEND_URL` in backend .env matches frontend URL
   - Check browser console for specific CORS errors
   - Ensure backend CORS configuration includes frontend origin

3. **Build Failures**
   ```bash
   # Clear dependencies and reinstall
   rm -rf node_modules
   npm install
   
   # Clear Next.js cache
   rm -rf .next
   
   # Check TypeScript errors
   npm run type-check
   ```

4. **SVG Import Issues**
   - Verify next.config.mjs has SVGR webpack configuration
   - Check SVG file paths and names
   - Ensure SVG files are in the assets directory

### Getting Help

1. **Check Logs**:
   - Backend: Console output and application logs
   - Frontend: Browser developer tools console
   - Database: PostgreSQL logs

2. **Debug Steps**:
   - Verify all environment variables are set
   - Check database migrations are applied
   - Confirm all services are running on correct ports
   - Validate API responses using curl or Postman

## 📄 License

[Add your license information here]

## 👥 Contributors

[Add contributor information and guidelines]

---

**Need Help?**
- Check the [issues page](../../issues) for known problems
- Create a new issue for bugs or feature requests
- Contact the development team for support

**Happy Coding! 🚀**