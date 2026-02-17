# E-PKL SaaS

<p align="center">
  <strong>Multi-tenant PKL Management System for Indonesian SMK Schools</strong>
</p>

E-PKL (Elektronik Praktik Kerja Lapangan) is a comprehensive SaaS platform designed specifically for Indonesian vocational high schools (SMK) to manage student internships (PKL). Built with multi-tenancy architecture, each school gets its own isolated environment while sharing the same infrastructure.

## Features

### Super Admin Dashboard
- **Tenant Management**: Create, view, update, and delete school tenants
- **Multi-tenant Overview**: Monitor all schools from a central dashboard
- **Tenant Analytics**: Track active schools and subscription status

### School/Tenant Features
- **Student Management**: Track and manage student intern details
- **Company Partners**: Manage industrial partner relationships
- **Internship Tracking**: Monitor student progress during PKL
- **Reporting**: Generate reports for school administration

### Technical Features
- 🔐 **Authentication**: Secure login with Clerk (email, social auth)
- 🏢 **Multi-tenancy**: Isolated data per school tenant
- 🎨 **Modern UI**: Built with Tailwind CSS and Shadcn UI
- 🌐 **Responsive**: Works on desktop, tablet, and mobile
- 🚀 **Type-safe**: Full TypeScript support
- 💾 **Database**: PostgreSQL with Drizzle ORM

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework with App Router |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first styling |
| Shadcn UI | Component library |
| Clerk | Authentication & user management |
| Supabase | Database & storage |
| Drizzle ORM | Type-safe database ORM |
| React Hook Form | Form management |
| Zod | Schema validation |

## Multi-tenant Architecture

```
┌─────────────────────────────────────────┐
│           Super Admin Portal            │
│         (Manages all tenants)           │
└───────────────────┬─────────────────────┘
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
   ┌────────┐  ┌────────┐  ┌────────┐
   │School A│  │School B│  │School C│
   │Tenant  │  │Tenant  │  │Tenant  │
   └────────┘  └────────┘  └────────┘
        │           │           │
        ▼           ▼           ▼
   ┌────────┐  ┌────────┐  ┌────────┐
   │Students│  │Students│  │Students│
   │Companies│ │Companies│ │Companies│
   │Reports │  │Reports │  │Reports │
   └────────┘  └────────┘  └────────┘
```

Each tenant (school) has:
- Isolated database schema/rows (tenant_id separation)
- Custom subdomain or path-based access
- Independent user management
- Separate data and configurations

## Setup Instructions

### Prerequisites
- Node.js 20+
- PostgreSQL database (local or cloud)
- Clerk account for authentication
- Supabase account for database

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/epkl-saas.git
cd epkl-saas
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/epkl

# Clerk Auth (get from https://clerk.dev)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase (get from https://supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Setup Database

Generate and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

Or start with a fresh database:

```bash
npm run db:studio  # Opens Drizzle Studio for database exploration
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Access Super Admin

Navigate to `/super-admin` to access the super admin dashboard.

## Project Structure

```
epkl-saas/
├── migrations/                 # Database migrations
├── src/
│   ├── app/
│   │   ├── (super-admin)/     # Super admin routes
│   │   │   ├── page.tsx        # Dashboard overview
│   │   │   ├── tenants/        # Tenant management
│   │   │   ├── billing/        # Billing management
│   │   │   └── settings/       # System settings
│   │   └── [...]               # Other routes
│   ├── components/
│   │   └── ui/                 # Reusable UI components
│   ├── libs/
│   │   ├── DB.ts               # Database configuration
│   │   └── supabase/           # Supabase client setup
│   ├── models/
│   │   └── Schema.ts           # Database schema definitions
│   └── utils/
│       └── AppConfig.ts        # App configuration
├── .env.example                # Example environment variables
└── package.json
```

## Database Schema

### Core Tables

**tenants** - School/organization data
- id, name, slug, status, created_at, updated_at

**users** - User accounts (linked to Clerk)
- id, email, role, tenant_id, created_at

**students** - Student information
- id, user_id, nisn, name, class, tenant_id

**companies** - Industrial partners
- id, name, address, contact, tenant_id

**internships** - PKL assignments
- id, student_id, company_id, start_date, end_date, status

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run check-types` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests |
| `npm run db:generate` | Generate database migrations |
| `npm run db:migrate` | Run database migrations |
| `npm run db:studio` | Open Drizzle Studio |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

Ensure you set:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

For questions or issues, please open an issue on GitHub or contact the maintainers.

---

Built with ♥ for Indonesian education
