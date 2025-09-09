import { Header } from "@/components/layout/Header";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/5 to-blue-600/5"></div>
        <div className="container mx-auto py-16 px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-slate-800 mb-6 tracking-tight">
              Railway Rules <span className="text-gradient">Portal</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Comprehensive management system for railway operational rules and procedures.
              Streamline compliance, enhance safety, and ensure operational excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admin">
                <Button size="lg" className="bg-gradient-to-r from-slate-800 to-slate-600 hover:from-slate-700 hover:to-slate-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Access Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3 rounded-xl font-semibold border-slate-300 hover:bg-slate-50 transition-all duration-300">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto py-12 px-6">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Chapter Overview</h2>
              <p className="text-slate-600">
                Browse and manage railway operational chapters and their associated rules
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
                {chapters.length} Chapters
              </Badge>
              <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
                {chapters.reduce((sum, ch) => sum + ch.rules, 0)} Total Rules
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {chapters.map((chapter) => (
            <Card key={chapter.id} className="group bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-br from-slate-50 to-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-3 rounded-xl group-hover:from-slate-200 group-hover:to-slate-300 transition-all duration-300">
                      <BookOpen className="h-5 w-5 text-slate-700" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-800">Chapter {chapter.id}</CardTitle>
                      <Badge className={`${getStatusColor(chapter.status)} border-0 font-medium`} variant="secondary">
                        {getStatusIcon(chapter.status)}
                        <span className="ml-1 capitalize">{chapter.status}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 px-6 pb-6">
                <h3 className="font-semibold text-slate-800 mb-4 text-base leading-tight">{chapter.title}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 px-3 bg-slate-50/80 rounded-lg">
                    <span className="text-slate-600 font-medium">Total Rules:</span>
                    <span className="font-bold text-slate-800">{chapter.rules}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 bg-slate-50/80 rounded-lg">
                    <span className="text-slate-600 font-medium">Last Modified:</span>
                    <span className="font-bold text-slate-800">{chapter.lastModified}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button variant="outline" size="sm" className="w-full rounded-lg font-medium border-slate-300 hover:bg-slate-50 transition-all duration-200">
                    View Rules
                  </Button>
                  <Link to="/admin/rules">
                    <Button variant="ghost" size="sm" className="w-full rounded-lg font-medium hover:bg-slate-100 transition-all duration-200">
                      Edit Chapter
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;