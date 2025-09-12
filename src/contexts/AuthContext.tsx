import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { useSupabase } from './SupabaseContext'

interface AuthContextType {
  user: User | null
  loading: boolean
  role: 'driver' | 'admin' | 'coordinator' | null
  signIn: (email: string, password: string) => Promise<{ error: any, role?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { supabase } = useSupabase()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<'driver' | 'admin' | 'coordinator' | null>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error }

    // Check role tables and banned status
    let foundRole: 'driver' | 'admin' | 'coordinator' | undefined = undefined
    let banned = false;

    const { data: driver } = await supabase.from('driver').select('id, banned').eq('email', email).single()
    if (driver) {
      foundRole = 'driver';
      if (driver.banned) banned = true;
    }

    const { data: admin } = await supabase.from('admins').select('id, banned').eq('email', email).single()
    if (admin) {
      foundRole = 'admin';
      if (admin.banned) banned = true;
    }

    const { data: coordinator } = await supabase.from('coordinators').select('id, banned').eq('email', email).single()
    if (coordinator) {
      foundRole = 'coordinator';
      if (coordinator.banned) banned = true;
    }

    if (banned) {
      return { error: { message: 'Your account has been banned. Please contact support.' } };
    }

    setRole(foundRole ?? null)
    return { error: null, role: foundRole }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setRole(null)
  }

  const value = {
    user,
    loading,
    role,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 