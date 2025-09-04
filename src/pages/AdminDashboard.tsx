import { Header } from "@/components/layout/Header";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Upload, 
  Bell, 
  Users, 
  Activity, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";

const recentChanges = [
  { id: 1, rule: "4.01", change: "Updated standard time synchronization procedure", user: "Admin", date: "2024-01-21", type: "update" },
  { id: 2, rule: "7.03", change: "Added new automatic block system guidelines", user: "Supervisor", date: "2024-01-20", type: "addition" },
  { id: 3, rule: "3.15", change: "Modified safety protocol for track maintenance", user: "Safety Officer", date: "2024-01-19", type: "modification" },
  { id: 4, rule: "11.08", change: "Emergency response procedure revision", user: "Admin", date: "2024-01-18", type: "update" }
];

const pendingNotifications = [
  { id: 1, message: "Rule 5.12 requires review and approval", priority: "high", date: "2024-01-21" },
  { id: 2, message: "New PDF uploaded for Chapter 8 processing", priority: "medium", date: "2024-01-21" },
  { id: 3, message: "Cross-reference links need updating in Chapter 12", priority: "low", date: "2024-01-20" }
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-6 px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Manage railway rules, monitor changes, and oversee system operations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rules</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                +12 from last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                -5 from yesterday
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                +7 from last hour
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">99.9%</div>
              <p className="text-xs text-muted-foreground">
                Uptime this month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Changes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Changes
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Change
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentChanges.map((change) => (
                  <div key={change.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline">Rule {change.rule}</Badge>
                        <Badge className={
                          change.type === "addition" ? "bg-success/10 text-success" :
                          change.type === "modification" ? "bg-warning/10 text-warning" :
                          "bg-primary/10 text-primary"
                        }>
                          {change.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground font-medium">{change.change}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        By {change.user} • {change.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Changes
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Notifications
                <Badge className="bg-destructive/10 text-destructive">
                  {pendingNotifications.length} Pending
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                    <div className={`p-2 rounded-full ${
                      notification.priority === "high" ? "bg-destructive/10" :
                      notification.priority === "medium" ? "bg-warning/10" :
                      "bg-primary/10"
                    }`}>
                      {notification.priority === "high" ? (
                        <AlertTriangle className={`h-4 w-4 text-destructive`} />
                      ) : notification.priority === "medium" ? (
                        <Clock className={`h-4 w-4 text-warning`} />
                      ) : (
                        <Bell className={`h-4 w-4 text-primary`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground font-medium">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">{notification.date}</p>
                        <Badge variant="outline" className="text-xs">
                          {notification.priority} priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Link to="/admin/rules">
                <Button variant="outline" className="w-full h-20 flex flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  Manage Rules
                </Button>
              </Link>
              <Button variant="outline" className="w-full h-20 flex flex-col">
                <Upload className="h-6 w-6 mb-2" />
                Upload PDF
              </Button>
              <Button variant="outline" className="w-full h-20 flex flex-col">
                <TrendingUp className="h-6 w-6 mb-2" />
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <ChatBot />
    </div>
  );
};

export default AdminDashboard;