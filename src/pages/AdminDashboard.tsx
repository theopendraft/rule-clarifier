import { Header } from "@/components/layout/Header";
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
  Plus,
  ArrowLeft,
  BarChart3
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
  const navigate = useNavigate();

  const handleAddChange = () => {
    toast.success("Add change functionality would open here");
  };

  const handleViewAllChanges = () => {
    toast.info("Navigating to full changes history");
  };

  const handleViewAllNotifications = () => {
    toast.info("Navigating to notifications center");
  };

  const handleAnalytics = () => {
    toast.info("Analytics dashboard would open here");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-6 px-6">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Manage railway rules, monitor changes, and oversee system operations
          </p>
        </div>



        {/* Chapters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Chapters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((chapter) => (
                <Link key={chapter} to={`/admin/chapter/${chapter}`}>
                  <Button variant="outline" className="w-full h-16 flex flex-col">
                    <FileText className="h-5 w-5 mb-1" />
                    Chapter {chapter}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Changes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Changes
                <Button size="sm" variant="outline" onClick={handleAddChange}>
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
              <Button variant="outline" className="w-full mt-4" onClick={handleViewAllChanges}>
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
              <Button variant="outline" className="w-full mt-4" onClick={handleViewAllNotifications}>
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </div>


      </main>
    </div>
  );
};

export default AdminDashboard;