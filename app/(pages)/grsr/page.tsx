'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Home from '@/components/pages/Home'
import UsersView from '@/components/pages/UsersView'

export default function HomePage() {
  const { userRole, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // No redirect needed
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Show admin view (editable GR) for admins, user view for everyone else
  return userRole === 'admin' ? <Home /> : <UsersView />
}
