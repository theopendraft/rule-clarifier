'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function DepartmentSelection() {
  const [selectedDepartment, setSelectedDepartment] = useState<'engineering' | 'safety' | 'snt' | null>(null)
  const { setUserDepartment } = useAuth()

  const handleConfirm = () => {
    if (selectedDepartment) {
      setUserDepartment(selectedDepartment)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Select Your Department</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: 'engineering', label: 'Engineering' },
              { id: 'safety', label: 'Safety' },
              { id: 'snt', label: 'SNT' }
            ].map((dept) => (
              <Button
                key={dept.id}
                variant={selectedDepartment === dept.id ? 'default' : 'outline'}
                className="w-full"
                onClick={() => setSelectedDepartment(dept.id as 'engineering' | 'safety' | 'snt')}
              >
                {dept.label}
              </Button>
            ))}
            <Button 
              onClick={handleConfirm} 
              disabled={!selectedDepartment}
              className="w-full mt-4"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}