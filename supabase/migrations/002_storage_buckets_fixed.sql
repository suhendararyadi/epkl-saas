-- ============================================================================
-- E-PKL Storage Buckets and RLS Policies (FIXED VERSION)
-- ============================================================================
-- This migration sets up storage buckets for E-PKL SaaS
-- Note: RLS is automatically enabled by Supabase on storage.objects
-- ============================================================================

-- ============================================================================
-- 1. CREATE STORAGE BUCKETS
-- ============================================================================

-- Bucket for attendance photos (selfie check-in/check-out)
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES (
  'attendances',
  'attendances',
  true,  -- Public access for viewing photos
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
  true,  -- Public access for viewing photos
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
  true,  -- Public access for viewing avatars
  false,
  2097152,  -- 2MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 2. STORAGE RLS POLICIES
-- ============================================================================
-- Note: RLS is already enabled by Supabase, so we just create policies
-- ============================================================================

-- ============================================================================
-- ATTENDANCES BUCKET POLICIES
-- ============================================================================

-- Allow anyone to view attendance photos
CREATE POLICY "Allow public access to attendance photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'attendances');

-- Allow authenticated users to upload their own attendance photos
CREATE POLICY "Allow authenticated uploads to attendances" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'attendances' AND
    auth.role() = 'authenticated'
  );

-- Allow users to update their own attendance photos
CREATE POLICY "Allow users to update own attendance photos" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'attendances' AND
    auth.uid() = owner
  );

-- Allow users to delete their own attendance photos
CREATE POLICY "Allow users to delete own attendance photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'attendances' AND
    auth.uid() = owner
  );

-- ============================================================================
-- JOURNAL EVIDENCE BUCKET POLICIES
-- ============================================================================

-- Allow anyone to view journal evidence photos
CREATE POLICY "Allow public access to journal evidence" ON storage.objects
  FOR SELECT USING (bucket_id = 'journal_evidence');

-- Allow authenticated users to upload journal evidence
CREATE POLICY "Allow authenticated uploads to journal_evidence" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'journal_evidence' AND
    auth.role() = 'authenticated'
  );

-- Allow users to update their own journal evidence
CREATE POLICY "Allow users to update own journal evidence" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'journal_evidence' AND
    auth.uid() = owner
  );

-- Allow users to delete their own journal evidence
CREATE POLICY "Allow users to delete own journal evidence" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'journal_evidence' AND
    auth.uid() = owner
  );

-- ============================================================================
-- AVATARS BUCKET POLICIES
-- ============================================================================

-- Allow anyone to view avatars
CREATE POLICY "Allow public access to avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

-- Allow authenticated users to upload avatars
CREATE POLICY "Allow authenticated uploads to avatars" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

-- Allow users to update their own avatar
CREATE POLICY "Allow users to update own avatar" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );

-- Allow users to delete their own avatar
CREATE POLICY "Allow users to delete own avatar" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );
