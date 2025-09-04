import { Header } from "@/components/layout/Header";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const chapters = [
  { id: 1, title: "General Rules", rules: 15, status: "updated", lastModified: "2024-01-15" },
  { id: 2, title: "Signals and Communication", rules: 32, status: "review", lastModified: "2024-01-10" },
  { id: 3, title: "Safety Procedures", rules: 28, status: "updated", lastModified: "2024-01-20" },
  { id: 4, title: "Working of Trains Generally", rules: 45, status: "updated", lastModified: "2024-01-18" },
  { id: 5, title: "Station Working", rules: 38, status: "pending", lastModified: "2023-12-28" },
  { id: 6, title: "Block Working", rules: 22, status: "updated", lastModified: "2024-01-12" },
  { id: 7, title: "Automatic Block System", rules: 19, status: "review", lastModified: "2024-01-08" },
  { id: 8, title: "Track Maintenance", rules: 41, status: "updated", lastModified: "2024-01-16" },
  { id: 9, title: "Rolling Stock", rules: 35, status: "updated", lastModified: "2024-01-14" },
  { id: 10, title: "Operating Procedures", rules: 52, status: "pending", lastModified: "2023-12-30" },
  { id: 11, title: "Emergency Protocols", rules: 26, status: "updated", lastModified: "2024-01-19" },
  { id: 12, title: "Personnel Duties", rules: 33, status: "review", lastModified: "2024-01-07" },
  { id: 13, title: "Equipment Standards", rules: 29, status: "updated", lastModified: "2024-01-13" },
  { id: 14, title: "Documentation", rules: 18, status: "updated", lastModified: "2024-01-17" },
  { id: 15, title: "Training Requirements", rules: 24, status: "pending", lastModified: "2023-12-25" },
  { id: 16, title: "Inspection Procedures", rules: 31, status: "updated", lastModified: "2024-01-11" },
  { id: 17, title: "Reporting Systems", rules: 27, status: "review", lastModified: "2024-01-09" },
  { id: 18, title: "Quality Control", rules: 23, status: "updated", lastModified: "2024-01-21" },
  { id: 19, title: "Environmental Compliance", rules: 20, status: "updated", lastModified: "2024-01-06" },
  { id: 20, title: "Administrative Procedures", rules: 36, status: "pending", lastModified: "2023-12-27" }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "updated": return "bg-success/10 text-success";
    case "review": return "bg-warning/10 text-warning";
    case "pending": return "bg-destructive/10 text-destructive";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "updated": return <CheckCircle className="h-4 w-4" />;
    case "review": return <Clock className="h-4 w-4" />;
    case "pending": return <AlertTriangle className="h-4 w-4" />;
    default: return <BookOpen className="h-4 w-4" />;
  }
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-6 px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Railway Rules Portal</h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive management system for railway operational rules and procedures
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {chapters.map((chapter) => (
            <Card key={chapter.id} className="hover:shadow-md transition-shadow border border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Chapter {chapter.id}</CardTitle>
                      <Badge className={getStatusColor(chapter.status)} variant="secondary">
                        {getStatusIcon(chapter.status)}
                        <span className="ml-1 capitalize">{chapter.status}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <h3 className="font-semibold text-foreground mb-3">{chapter.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Total Rules:</span>
                    <span className="font-medium">{chapter.rules}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Modified:</span>
                    <span className="font-medium">{chapter.lastModified}</span>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    View Rules
                  </Button>
                  <Link to="/admin/rules">
                    <Button variant="ghost" size="sm" className="w-full">
                      Edit Chapter
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/admin">
            <Button size="lg" className="bg-primary hover:bg-primary-hover">
              Access Admin Dashboard
            </Button>
          </Link>
        </div>
      </main>

      <ChatBot />
    </div>
  );
};

export default Index;