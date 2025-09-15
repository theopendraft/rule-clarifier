'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { loginAsAdmin, loginAsUser } = useAuth()
  const router = useRouter()

  const handleQuickLogin = (type: 'admin' | 'user') => {
    setIsLoading(true)
    try {
      const success = type === 'admin' ? loginAsAdmin() : loginAsUser()
      if (success) {
        router.push('/')
      }
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Railway Rule Clarifier AI</CardTitle>
          <CardDescription>
            Sign in to access the railway operating manual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              onClick={() => handleQuickLogin('admin')} 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Login as Admin'}
            </Button>
            <Button 
              onClick={() => handleQuickLogin('user')} 
              variant="outline" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Login as User'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
