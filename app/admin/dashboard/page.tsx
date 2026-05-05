'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAdminAuthenticated, clearAdminSession } from '@/lib/adminAuth'
import InboxTab from '@/components/admin/InboxTab'
import ArchiveTab from '@/components/admin/ArchiveTab'

type Tab = 'inbox' | 'archive'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('inbox')

  useEffect(() => {
    // Check authentication on mount
    const checkAuth = async () => {
      const authenticated = await isAdminAuthenticated()
      if (!authenticated) {
        router.push('/admin')
        return
      }
      setIsAuth(true)
      setIsLoading(false)
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await clearAdminSession()
    router.push('/admin')
  }

  if (!isAuth || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'inbox'
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Inbox
          </button>
          <button
            onClick={() => setActiveTab('archive')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'archive'
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Archive
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'inbox' && <InboxTab />}
        {activeTab === 'archive' && <ArchiveTab />}
      </div>
    </div>
  )
}
