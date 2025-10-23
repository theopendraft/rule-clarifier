'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function DepartmentSelect() {
  const router = useRouter();
  const { isAuthenticated, userRole, setUserDepartment } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not authenticated or already an admin
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (userRole === 'admin') {
      router.push('/');
      return;
    }
    
    setLoading(false);
  }, [isAuthenticated, userRole, router]);

  const handleDepartmentSelect = (department: 'engineering' | 'safety' | 'snt') => {
    setUserDepartment(department);
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Railway Rule Clarifier AI</h1>
          <p className="mt-2 text-gray-600">Select your department to continue</p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => handleDepartmentSelect('snt')}
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
          >
            Signal & Telecommunication (SNT)
          </button>
          
          <button
            onClick={() => handleDepartmentSelect('engineering')}
            className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-200"
          >
            Engineering
          </button>
          
          <button
            onClick={() => handleDepartmentSelect('safety')}
            className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition duration-200"
          >
            Safety
          </button>
        </div>
      </div>
    </div>
  );
}