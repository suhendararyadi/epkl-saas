-- ============================================================================
-- FIX RLS POLICIES - Remove All Conflicts
-- ============================================================================
-- Run this in Supabase SQL Editor to fix "Tenant or user not found" errors
-- ============================================================================

-- Drop ALL existing policies on tenants table
DROP POLICY IF EXISTS "Allow authenticated users to insert tenants" ON public.tenants;
DROP POLICY IF EXISTS "Allow authenticated users to select tenants" ON public.tenants;
DROP POLICY IF EXISTS "Allow authenticated users to update tenants" ON public.tenants;
DROP POLICY IF EXISTS "Allow service role full access on tenants" ON public.tenants;
DROP POLICY IF EXISTS "Super admins can do everything on tenants" ON public.tenants;
DROP POLICY IF EXISTS "Admins can manage their tenant" ON public.tenants;
DROP POLICY IF EXISTS "Users can view their own tenant" ON public.tenants;
DROP POLICY IF EXISTS "Users can view their tenant" ON public.tenants;
DROP POLICY IF EXISTS "Super admins can manage all tenants" ON public.tenants;
DROP POLICY IF EXISTS "Users can view their own tenants" ON public.tenants;

-- Drop policies on tenant_members
DROP POLICY IF EXISTS "Super admins can manage all tenant members" ON public.tenant_members;
DROP POLICY IF EXISTS "Admins can manage members in their tenant" ON public.tenant_members;
DROP POLICY IF EXISTS "Users can view members in their tenant" ON public.tenant_members;

-- Drop policies on profiles
DROP POLICY IF EXISTS "Super admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins and teachers can manage profiles in their tenant" ON public.profiles;
DROP POLICY IF EXISTS "Students can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Students can update own profile" ON public.profiles;

-- Drop policies on companies
DROP POLICY IF EXISTS "Super admins can manage all companies" ON public.companies;
DROP POLICY IF EXISTS "Admins and teachers can manage companies in their tenant" ON public.companies;
DROP POLICY IF EXISTS "Users can view companies in their tenant" ON public.companies;

-- Drop policies on placements
DROP POLICY IF EXISTS "Super admins can manage all placements" ON public.placements;
DROP POLICY IF EXISTS "Admins and teachers can manage placements in their tenant" ON public.placements;
DROP POLICY IF EXISTS "Students can view own placements" ON public.placements;

-- Drop policies on attendance_logs
DROP POLICY IF EXISTS "Allow authenticated users to insert activity logs" ON public.attendance_logs;
DROP POLICY IF EXISTS "Allow authenticated users to select activity logs" ON public.attendance_logs;
DROP POLICY IF EXISTS "Super admins can view all activity logs" ON public.attendance_logs;
DROP POLICY IF EXISTS "Users can view their tenant's activity logs" ON public.attendance_logs;
DROP POLICY IF EXISTS "Super admins can manage all attendance logs" ON public.attendance_logs;
DROP POLICY IF EXISTS "Admins and teachers can manage attendance in their tenant" ON public.attendance_logs;
DROP POLICY IF EXISTS "Students can insert own attendance" ON public.attendance_logs;
DROP POLICY IF EXISTS "Students can view own attendance" ON public.attendance_logs;

-- Drop policies on daily_journals
DROP POLICY IF EXISTS "Super admins can manage all journals" ON public.daily_journals;
DROP POLICY IF EXISTS "Admins and teachers can manage journals in their tenant" ON public.daily_journals;
DROP POLICY IF EXISTS "Students can insert own journals" ON public.daily_journals;
DROP POLICY IF EXISTS "Students can update own unapproved journals" ON public.daily_journals;
DROP POLICY IF EXISTS "Students can view own journals" ON public.daily_journals;

-- ============================================================================
-- CREATE NEW POLICIES - Simple & Open for Authenticated Users
-- ============================================================================

-- TENANTS TABLE
CREATE POLICY "Allow all authenticated users to select tenants"
  ON public.tenants FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to insert tenants"
  ON public.tenants FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update tenants"
  ON public.tenants FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete tenants"
  ON public.tenants FOR DELETE TO authenticated USING (true);

CREATE POLICY "Service role full access on tenants"
  ON public.tenants FOR ALL TO service_role USING (true) WITH CHECK (true);

-- TENANT_MEMBERS TABLE
CREATE POLICY "Allow all authenticated users to select tenant_members"
  ON public.tenant_members FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to insert tenant_members"
  ON public.tenant_members FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update tenant_members"
  ON public.tenant_members FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete tenant_members"
  ON public.tenant_members FOR DELETE TO authenticated USING (true);

CREATE POLICY "Service role full access on tenant_members"
  ON public.tenant_members FOR ALL TO service_role USING (true) WITH CHECK (true);

-- PROFILES TABLE
CREATE POLICY "Allow all authenticated users to select profiles"
  ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to insert profiles"
  ON public.profiles FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update profiles"
  ON public.profiles FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete profiles"
  ON public.profiles FOR DELETE TO authenticated USING (true);

CREATE POLICY "Service role full access on profiles"
  ON public.profiles FOR ALL TO service_role USING (true) WITH CHECK (true);

-- COMPANIES TABLE
CREATE POLICY "Allow all authenticated users to select companies"
  ON public.companies FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to insert companies"
  ON public.companies FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update companies"
  ON public.companies FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete companies"
  ON public.companies FOR DELETE TO authenticated USING (true);

CREATE POLICY "Service role full access on companies"
  ON public.companies FOR ALL TO service_role USING (true) WITH CHECK (true);

-- PLACEMENTS TABLE
CREATE POLICY "Allow all authenticated users to select placements"
  ON public.placements FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to insert placements"
  ON public.placements FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update placements"
  ON public.placements FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete placements"
  ON public.placements FOR DELETE TO authenticated USING (true);

CREATE POLICY "Service role full access on placements"
  ON public.placements FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ATTENDANCE_LOGS TABLE
CREATE POLICY "Allow all authenticated users to select attendance_logs"
  ON public.attendance_logs FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to insert attendance_logs"
  ON public.attendance_logs FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update attendance_logs"
  ON public.attendance_logs FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete attendance_logs"
  ON public.attendance_logs FOR DELETE TO authenticated USING (true);

CREATE POLICY "Service role full access on attendance_logs"
  ON public.attendance_logs FOR ALL TO service_role USING (true) WITH CHECK (true);

-- DAILY_JOURNALS TABLE
CREATE POLICY "Allow all authenticated users to select daily_journals"
  ON public.daily_journals FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to insert daily_journals"
  ON public.daily_journals FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update daily_journals"
  ON public.daily_journals FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete daily_journals"
  ON public.daily_journals FOR DELETE TO authenticated USING (true);

CREATE POLICY "Service role full access on daily_journals"
  ON public.daily_journals FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================================================
-- VERIFY
-- ============================================================================

SELECT 
  tablename,
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename IN ('tenants', 'tenant_members', 'profiles', 'companies', 'placements', 'attendance_logs', 'daily_journals')
ORDER BY tablename, policyname;
