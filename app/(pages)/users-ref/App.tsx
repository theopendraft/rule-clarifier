import { useState } from 'react';
import { UserPage } from './components/UserPage';
import { AdminPage } from './components/AdminPage';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {isAdminMode ? (
        <AdminPage onBackToUser={() => setIsAdminMode(false)} />
      ) : (
        <UserPage onAdminAccess={() => setIsAdminMode(true)} />
      )}
    </div>
  );
}
