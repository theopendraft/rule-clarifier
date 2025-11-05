import { useState } from 'react';
import { ArrowLeft, Upload, FileText, Users, Settings, Activity, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

interface AdminPageProps {
  onBackToUser: () => void;
}

export function AdminPage({ onBackToUser }: AdminPageProps) {
  const [stats] = useState({
    totalChapters: 17,
    totalSections: 48,
    lastUpdated: 'Nov 4, 2025',
    activeUsers: 1247,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackToUser}
              className="text-white hover:bg-slate-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                <p className="text-xs text-slate-300">Rail Rules Management</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Chapters</p>
                <p className="text-2xl text-slate-900">{stats.totalChapters}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Sections</p>
                <p className="text-2xl text-slate-900">{stats.totalSections}</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Active Users</p>
                <p className="text-2xl text-slate-900">{stats.activeUsers}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </Card>

          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Last Updated</p>
                <p className="text-lg text-slate-900">{stats.lastUpdated}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="w-full justify-start bg-white border border-slate-200 p-1">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content Management
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-6">
            <Card className="p-6 bg-white">
              <h2 className="text-xl text-slate-900 mb-4">Chapter Management</h2>
              
              <div className="space-y-4">
                {/* Upload Section */}
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <h3 className="text-slate-700 mb-2">Upload New Chapter Content</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Support for PDF, DOCX, and TXT files
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Select File
                  </Button>
                </div>

                {/* Recent Updates */}
                <div className="mt-8">
                  <h3 className="text-lg text-slate-900 mb-4">Recent Updates</h3>
                  <div className="space-y-3">
                    {[
                      { chapter: 'Chapter 7', title: 'Emergency Procedures', status: 'Updated', date: 'Nov 2, 2025' },
                      { chapter: 'Chapter 12', title: 'Accident Investigation', status: 'New', date: 'Oct 28, 2025' },
                      { chapter: 'Chapter 4', title: 'Signaling Systems', status: 'Updated', date: 'Oct 25, 2025' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-slate-900">{item.chapter}: {item.title}</p>
                            <p className="text-sm text-slate-500">{item.date}</p>
                          </div>
                        </div>
                        <Badge className={item.status === 'New' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-blue-100 text-blue-800 hover:bg-blue-100'}>
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card className="p-6 bg-white">
              <h2 className="text-xl text-slate-900 mb-4">User Access Control</h2>
              <p className="text-slate-600 mb-6">Manage user permissions and access levels</p>
              
              <div className="space-y-3">
                {[
                  { name: 'Railway Officials', users: 450, access: 'Full Access' },
                  { name: 'Station Masters', users: 320, access: 'Read & Write' },
                  { name: 'Safety Officers', users: 180, access: 'Read & Write' },
                  { name: 'General Staff', users: 297, access: 'Read Only' },
                ].map((group, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Users className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="text-slate-900">{group.name}</p>
                        <p className="text-sm text-slate-500">{group.users} users</p>
                      </div>
                    </div>
                    <Badge className="bg-slate-200 text-slate-800 hover:bg-slate-200">
                      {group.access}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="p-6 bg-white">
              <h2 className="text-xl text-slate-900 mb-4">System Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-slate-900 mb-2">Application Version</h3>
                  <p className="text-sm text-slate-600">Version 2.0.1 (Build 2025.11.04)</p>
                </div>

                <div>
                  <h3 className="text-slate-900 mb-2">Database Status</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm text-slate-600">Connected</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-slate-900 mb-2">Last Backup</h3>
                  <p className="text-sm text-slate-600">November 4, 2025 at 02:00 AM</p>
                </div>

                <div className="pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Save Settings
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
