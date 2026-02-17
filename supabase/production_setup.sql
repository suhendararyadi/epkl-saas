-- E-PKL SaaS Production Setup SQL
-- ============================================================================
-- Jalankan file ini di Supabase Dashboard > SQL Editor
-- Project: E PKL SMKN 9 Garut (gawpkafgndtqmaoamxdk)
-- ============================================================================

-- ============================================================================
-- STEP 1: Create Demo Tenant (Super Admin)
-- ============================================================================
INSERT INTO public.tenants (name, subdomain, plan, admin_email, max_students, max_teachers, max_companies, status)
VALUES (
  'SMKN 9 Garut',
  'smkn9',
  'pro',
  'admin@smkn9.sch.id',
  500,
  50,
  100,
  'active'
)
ON CONFLICT (subdomain) DO NOTHING
RETURNING id;

-- ============================================================================
-- STEP 2: Setup Storage Buckets (if not exists)
-- ============================================================================

-- Bucket for attendance photos (selfie check-in/check-out)
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES (
  'attendances',
  'attendances',
  true,
  false,
  5242880,  -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Bucket for journal evidence photos
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES (
  'journal_evidence',
  'journal_evidence',
  true,
  false,
  10485760,  -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Bucket for user avatars
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  false,
  2097152,  -- 2MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STEP 3: Storage RLS Policies
-- ============================================================================
-- Note: RLS is already enabled by Supabase, skip ALTER TABLE
-- ============================================================================

-- Attendance bucket policies
DROP POLICY IF EXISTS "Allow public access to attendance photos" ON storage.objects;
CREATE POLICY "Allow public access to attendance photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'attendances');

DROP POLICY IF EXISTS "Allow authenticated uploads to attendances" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to attendances" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'attendances' AND
    auth.role() = 'authenticated'
  );

DROP POLICY IF EXISTS "Allow users to update own attendance photos" ON storage.objects;
CREATE POLICY "Allow users to update own attendance photos" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'attendances' AND
    auth.uid() = owner
  );

DROP POLICY IF EXISTS "Allow users to delete own attendance photos" ON storage.objects;
CREATE POLICY "Allow users to delete own attendance photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'attendances' AND
    auth.uid() = owner
  );

-- Journal evidence bucket policies
DROP POLICY IF EXISTS "Allow public access to journal evidence" ON storage.objects;
CREATE POLICY "Allow public access to journal evidence" ON storage.objects
  FOR SELECT USING (bucket_id = 'journal_evidence');

DROP POLICY IF EXISTS "Allow authenticated uploads to journal_evidence" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to journal_evidence" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'journal_evidence' AND
    auth.role() = 'authenticated'
  );

DROP POLICY IF EXISTS "Allow users to update own journal evidence" ON storage.objects;
CREATE POLICY "Allow users to update own journal evidence" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'journal_evidence' AND
    auth.uid() = owner
  );

DROP POLICY IF EXISTS "Allow users to delete own journal evidence" ON storage.objects;
CREATE POLICY "Allow users to delete own journal evidence" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'journal_evidence' AND
    auth.uid() = owner
  );

-- Avatars bucket policies
DROP POLICY IF EXISTS "Allow public access to avatars" ON storage.objects;
CREATE POLICY "Allow public access to avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Allow authenticated uploads to avatars" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to avatars" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

DROP POLICY IF EXISTS "Allow users to update own avatar" ON storage.objects;
CREATE POLICY "Allow users to update own avatar" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );

DROP POLICY IF EXISTS "Allow users to delete own avatar" ON storage.objects;
CREATE POLICY "Allow users to delete own avatar" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );

-- ============================================================================
-- STEP 4: Verify Setup
-- ============================================================================

-- Check tenants
SELECT 'Tenants:' as check_type, COUNT(*) as count FROM public.tenants
UNION ALL
-- Check storage buckets
SELECT 'Storage Buckets:' as check_type, COUNT(*) as count FROM storage.buckets WHERE id IN ('attendances', 'journal_evidence', 'avatars')
UNION ALL
-- Check storage policies
SELECT 'Storage Policies:' as check_type, COUNT(*) as count FROM storage.policies WHERE bucket_id IN ('attendances', 'journal_evidence', 'avatars');
