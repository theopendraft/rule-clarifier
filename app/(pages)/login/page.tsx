'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { loginAsAdmin, loginAsUser } = useAuth()
  const router = useRouter()

  const handleAdminLogin = () => {
    setError('')
    setIsLoading(true)
    
    // Admin credentials for main admin and department admins
    const adminCredentials = [
      { email: 'admin@adrig.co.in', password: 'admin123' },
      { email: 'snt-admin@adrig.co.in', password: 'sntadmin123' },
      { email: 'eng-admin@adrig.co.in', password: 'engadmin123' },
      { email: 'safety-admin@adrig.co.in', password: 'safetyadmin123' }
    ]
    
    const validCredential = adminCredentials.find(cred => cred.email === email && cred.password === password)
    
    if (validCredential) {
      try {
        const success = loginAsAdmin(email)
        if (success) {
          router.push('/')
        } else {
          setError('Login failed. Please try again.')
        }
      } catch (error) {
        console.error('Login failed:', error)
        setError('Login failed. Please try again.')
      }
    } else {
      setError('Invalid email or password. Please check your credentials.')
    }
    
    setIsLoading(false)
  }

  const handleUserLogin = () => {
    setIsLoading(true)
    try {
      const success = loginAsUser()
      if (success) {
        // Redirect to department selection page instead of home
        router.push('/department-select')
      }
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" suppressHydrationWarning>
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/')}
              className="p-2"
              suppressHydrationWarning
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">Back</span>
          </div>
          <CardTitle>Railway Rule Clarifier AI</CardTitle>
          <CardDescription>
            Sign in to access the railway operating manual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@adrig.co.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  suppressHydrationWarning
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="admin123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  suppressHydrationWarning
                />
              </div>
              <Button 
                onClick={handleAdminLogin} 
                className="w-full" 
                disabled={isLoading || !email || !password}
                suppressHydrationWarning
              >
                {isLoading ? 'Signing in...' : 'Login as Admin'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
