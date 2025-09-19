import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_key'

// Only throw error in development
if (import.meta.env.DEV && (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY)) {
  console.warn('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,      // 🔑 keep session in localStorage
    autoRefreshToken: true,    // 🔑 refresh expired tokens
    detectSessionInUrl: true,  // 🔑 needed for OAuth redirects
  },
})

// Database types
export interface Page {
  id: string
  title: string
  slug: string
  content: string
  meta_description?: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  role: 'admin' | 'user'
  created_at: string
} 