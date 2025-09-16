'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

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
    
    // Hardcoded admin credentials
    const adminEmail = 'admin@adrig.co.in'
    const adminPassword = 'admin123'
    
    if (email === adminEmail && password === adminPassword) {
      try {
        const success = loginAsAdmin()
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
                />
              </div>
              <Button 
                onClick={handleAdminLogin} 
                className="w-full" 
                disabled={isLoading || !email || !password}
              >
                {isLoading ? 'Signing in...' : 'Login as Admin'}
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">or</span>
              </div>
            </div>
            
            <Button 
              onClick={handleUserLogin} 
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
