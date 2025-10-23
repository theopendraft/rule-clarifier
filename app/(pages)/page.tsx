'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Home from '@/components/pages/Home'

export default function HomePage() {
  const { isAuthenticated, loading, userRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    } else if (!loading && isAuthenticated && userRole === 'user') {
      // Check if department is selected
      const department = localStorage.getItem('userDepartment')
      if (!department) {
        router.push('/department-select')
      } else {
        router.push('/users')
      }
    }
  }, [isAuthenticated, loading, userRole, router])

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Railway Rule Clarifier AI</h1>
          <p className="text-muted-foreground">Please log in to access the railway operating manual system.</p>
          <div className="mt-8">
            <p>Authentication required. Please go to the login page.</p>
            <a href="/login" className="text-blue-600 hover:underline">Go to Login</a>
          </div>
        </div>
      </div>
    )
  }

  return <Home />
}
