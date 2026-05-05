import { supabase } from './supabaseClient'

export const verifyAdminPassword = (password: string): boolean => {
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
  return password === adminPassword
}

export const setAdminSession = async (password: string) => {
  if (typeof window !== 'undefined') {
    // Verify password first
    if (!verifyAdminPassword(password)) {
      return { error: 'Invalid password' }
    }

    try {
      // Sign in to Supabase with admin email/password
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@s3lab.local'
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: password,
      })

      if (error) {
        console.error('Auth error:', error)
        return { error: error.message }
      }

      // Store session info in sessionStorage as backup
      if (data.session) {
        sessionStorage.setItem('adminAuth', btoa(password))
        return { data }
      }

      return { error: 'No session created' }
    } catch (err) {
      console.error('Sign in exception:', err)
      return { error: 'Failed to authenticate' }
    }
  }
  return { error: 'Window undefined' }
}

export const getAdminSession = (): string | null => {
  if (typeof window !== 'undefined') {
    const auth = sessionStorage.getItem('adminAuth')
    return auth ? atob(auth) : null
  }
  return null
}

export const clearAdminSession = async () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('adminAuth')
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.log('Supabase signout failed:', err)
    }
  }
}

export const isAdminAuthenticated = async (): Promise<boolean> => {
  // First, prefer the explicit admin session stored in sessionStorage (client-side).
  if (typeof window !== 'undefined') {
    const stored = getAdminSession()
    if (stored && verifyAdminPassword(stored)) {
      return true
    }
  }

  // Fallback to Supabase session check (for broader session support).
  try {
    const { data, error } = await supabase.auth.getSession()
    return !error && data.session !== null
  } catch (err) {
    console.error('Session check error:', err)
    return false
  }
}
