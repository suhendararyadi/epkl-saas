-- E-PKL SaaS Production Setup SQL
-- ============================================================================
-- Jalankan file ini di Supabase Dashboard > SQL Editor
-- ============================================================================

-- ============================================================================
-- STEP 1: Create Demo Tenant
-- ============================================================================
INSERT INTO public.tenants (name, subdomain, plan, max_students, status)
VALUES (
  'SMKN 9 Garut',
  'smkn9',
  'pro',
  500,
  'active'
)
ON CONFLICT (subdomain) DO NOTHING;

-- ============================================================================
-- STEP 2: Setup Storage Buckets
-- ============================================================================

-- Bucket for attendance photos (selfie check-in/check-out)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'attendances',
  'attendances',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Bucket for journal evidence photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'journal_evidence',
  'journal_evidence',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Bucket for user avatars
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  2097152,
  ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STEP 3: Storage RLS Policies
-- ============================================================================

-- Attendance bucket policies
DROP POLICY IF EXISTS "Allow public access to attendance photos" ON storage.objects;
CREATE POLICY "Allow public access to attendance photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'attendances');

DROP POLICY IF EXISTS "Allow authenticated uploads to attendances" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to attendances" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'attendances' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow users to update own attendance photos" ON storage.objects;
CREATE POLICY "Allow users to update own attendance photos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'attendances' AND auth.uid() = owner);

DROP POLICY IF EXISTS "Allow users to delete own attendance photos" ON storage.objects;
CREATE POLICY "Allow users to delete own attendance photos" ON storage.objects
  FOR DELETE USING (bucket_id = 'attendances' AND auth.uid() = owner);

-- Journal evidence bucket policies
DROP POLICY IF EXISTS "Allow public access to journal evidence" ON storage.objects;
CREATE POLICY "Allow public access to journal evidence" ON storage.objects
  FOR SELECT USING (bucket_id = 'journal_evidence');

DROP POLICY IF EXISTS "Allow authenticated uploads to journal_evidence" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to journal_evidence" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'journal_evidence' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow users to update own journal evidence" ON storage.objects;
CREATE POLICY "Allow users to update own journal evidence" ON storage.objects
  FOR UPDATE USING (bucket_id = 'journal_evidence' AND auth.uid() = owner);

DROP POLICY IF EXISTS "Allow users to delete own journal evidence" ON storage.objects;
CREATE POLICY "Allow users to delete own journal evidence" ON storage.objects
  FOR DELETE USING (bucket_id = 'journal_evidence' AND auth.uid() = owner);

-- Avatars bucket policies
DROP POLICY IF EXISTS "Allow public access to avatars" ON storage.objects;
CREATE POLICY "Allow public access to avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Allow authenticated uploads to avatars" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to avatars" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow users to update own avatar" ON storage.objects;
CREATE POLICY "Allow users to update own avatar" ON storage.objects
  FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid() = owner);

DROP POLICY IF EXISTS "Allow users to delete own avatar" ON storage.objects;
CREATE POLICY "Allow users to delete own avatar" ON storage.objects
  FOR DELETE USING (bucket_id = 'avatars' AND auth.uid() = owner);

-- ============================================================================
-- STEP 4: Verify Setup
-- ============================================================================

SELECT 'Tenants' as type, COUNT(*) as count FROM public.tenants
UNION ALL
SELECT 'Storage Buckets', COUNT(*) FROM storage.buckets WHERE id IN ('attendances', 'journal_evidence', 'avatars');
