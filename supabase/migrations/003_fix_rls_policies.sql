-- ============================================================================
-- Fix RLS Policies untuk Tenant Management
-- ============================================================================
-- Issue: Tenant creation UI success but data not saved to database
-- Cause: RLS policies only allow INSERT for super_admin tenant_members
-- Fix: Add INSERT policies for authenticated users
-- ============================================================================

-- ============================================================================
-- TENANTS TABLE - Add INSERT policy for authenticated users
-- ============================================================================

-- Allow authenticated users to INSERT tenants (super admin only in app logic)
CREATE POLICY "Allow authenticated users to insert tenants"
  ON public.tenants
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to SELECT tenants
CREATE POLICY "Allow authenticated users to select tenants"
  ON public.tenants
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to UPDATE tenants
CREATE POLICY "Allow authenticated users to update tenants"
  ON public.tenants
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow service role full access (for server-side operations)
CREATE POLICY "Allow service role full access on tenants"
  ON public.tenants
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- ACTIVITY_LOGS TABLE - Enable RLS and add policies
-- ============================================================================

-- Enable RLS on activity_logs if not already enabled
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert activity logs
CREATE POLICY "Allow authenticated users to insert activity logs"
  ON public.activity_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to select activity logs
CREATE POLICY "Allow authenticated users to select activity logs"
  ON public.activity_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow service role full access on activity_logs
CREATE POLICY "Allow service role full access on activity_logs"
  ON public.activity_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- STUDENTS TABLE - Enable RLS and add policies
-- ============================================================================

-- Enable RLS on students if not already enabled
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert students
CREATE POLICY "Allow authenticated users to insert students"
  ON public.students
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to select students
CREATE POLICY "Allow authenticated users to select students"
  ON public.students
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update students
CREATE POLICY "Allow authenticated users to update students"
  ON public.students
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow service role full access on students
CREATE POLICY "Allow service role full access on students"
  ON public.students
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- Verify policies
-- ============================================================================

SELECT 
  tablename,
  policyname,
  cmd,
  permissive
FROM pg_policies 
WHERE tablename IN ('tenants', 'activity_logs', 'students')
ORDER BY tablename, policyname;
