# E-PKL SaaS Production Setup

## Project Details

| Property | Value |
|----------|-------|
| Project Name | E PKL SMKN 9 Garut |
| Project Ref | `gawpkafgndtqmaoamxdk` |
| Region | Southeast Asia (Singapore) |
| Dashboard | https://app.supabase.com/project/gawpkafgndtqmaoamxdk |

## Setup Checklist

### 1. Get API Keys

1. Go to [Supabase Dashboard](https://app.supabase.com/project/gawpkafgndtqmaoamxdk)
2. Navigate to **Project Settings** > **API**
3. Copy the following keys:
   - `anon` key (for client-side)
   - `service_role` key (for server-side - keep secret!)

### 2. Update Environment Variables

Edit `.env.local` and fill in the API keys:

```bash
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 3. Run Production Setup SQL

1. Go to [SQL Editor](https://app.supabase.com/project/gawpkafgndtqmaoamxdk/sql)
2. Open `supabase/production_setup.sql` from this repo
3. Copy and paste the SQL content
4. Run the SQL

This will:
- Create demo tenant (SMKN 9 Garut)
- Setup storage buckets (attendances, journal_evidence, avatars)
- Configure RLS policies for storage

### 4. Apply Database Migrations

Run migrations using Supabase CLI:

```bash
# Login to Supabase
supabase login

# Link to production project
supabase link --project-ref gawpkafgndtqmaoamxdk

# Push migrations
supabase db push

# Generate types
supabase gen types typescript --linked > src/types/supabase.ts
```

### 5. Verify Setup

Test the connection:

```bash
# Check if tables exist
supabase db execute "SELECT * FROM tenants;"
supabase db execute "SELECT * FROM storage.buckets;"
```

## Database Schema

### Tables

| Table | Description |
|-------|-------------|
| `tenants` | Multi-tenant organizations |
| `tenant_members` | User-tenant relationships |
| `profiles` | User profiles |
| `companies` | Partner companies for PKL |
| `placements` | Student-company placements |
| `attendance_logs` | Check-in/check-out records |
| `daily_journals` | Student activity journals |

### Storage Buckets

| Bucket | Purpose | Public Access |
|--------|---------|---------------|
| `attendances` | Selfie check-in/out photos | Yes |
| `journal_evidence` | Activity evidence photos | Yes |
| `avatars` | User profile pictures | Yes |

## Security

- All tables have RLS enabled
- Tenant isolation via `tenant_id` column
- Storage policies restrict uploads to authenticated users
- Service role key should never be exposed to client-side

## Troubleshooting

### Connection Issues

If you can't connect to the database:
1. Check your network/VPN settings
2. Verify you're using the correct database password
3. Ensure your IP is allowed in Database > Network Restrictions

### Migration Failures

If migrations fail:
1. Check SQL syntax in migration files
2. Ensure no conflicting tables exist
3. Run `supabase db reset` to start fresh (⚠️ deletes data)

## Support

- Supabase Docs: https://supabase.com/docs
- Project Issues: https://github.com/suhendararyadi/epkl-saas/issues
