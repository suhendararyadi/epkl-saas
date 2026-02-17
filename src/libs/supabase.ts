import { createClient } from '@supabase/supabase-js';

import { Env } from './Env';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  Env.NEXT_PUBLIC_SUPABASE_URL,
  Env.SUPABASE_SERVICE_ROLE_KEY || Env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

// Client-side Supabase client (for client components)
export const createBrowserClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
};

// Server-side Supabase client (for server components/API routes)
export const createServerClient = () => {
  return createClient(
    Env.NEXT_PUBLIC_SUPABASE_URL,
    Env.SUPABASE_SERVICE_ROLE_KEY || Env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
};
