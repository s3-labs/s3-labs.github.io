'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setAdminSession, verifyAdminPassword } from '@/lib/adminAuth'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!verifyAdminPassword(password)) {
      setError('Invalid password')
      setIsLoading(false)
      return
    }

    try {
      const result = await setAdminSession(password)
      if (result.error) {
        setError(result.error)
      } else {
        router.push('/admin/dashboard')
      }
    } catch (err) {
      setError('Authentication failed. Please try again.')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-blue-50">
      <div className="glass w-full max-w-md mx-4 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">Admin Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter admin password"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-semibold transition-colors"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
