"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, ArrowRight, ArrowLeft, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Header } from "../../components/layout/Header";

const ChaptersPage = () => {
  const router = useRouter();
  const [loadingChapter, setLoadingChapter] = useState<number | null>(null);
  const [chapterStatus, setChapterStatus] = useState<{[key: number]: 'available' | 'unavailable'}>({
    1: 'unavailable',
    2: 'unavailable', 
    3: 'unavailable',
    4: 'available',
    5: 'unavailable',
    6: 'unavailable',
    7: 'unavailable',
    8: 'unavailable',
    9: 'unavailable',
    10: 'unavailable',
    11: 'unavailable',
    12: 'unavailable',
    13: 'unavailable',
    14: 'unavailable',
    15: 'unavailable',
    16: 'unavailable',
    17: 'unavailable',
    18: 'unavailable',
    19: 'unavailable',
    20: 'unavailable'
  });

  const chapters = [
    { id: 1, title: "General Rules", description: "Basic operational guidelines and safety procedures" },
    { id: 2, title: "Signals", description: "Signal systems and their meanings" },
    { id: 3, title: "Points and Crossings", description: "Track switching and crossing procedures" },
    { id: 4, title: "Working of Trains Generally", description: "General train operation rules" },
    { id: 5, title: "Shunting Operations", description: "Marshalling and shunting procedures" },
    { id: 6, title: "Level Crossings", description: "Safety procedures at level crossings" },
    { id: 7, title: "Accidents and Incidents", description: "Emergency procedures and reporting" },
    { id: 8, title: "Maintenance and Engineering", description: "Track and infrastructure maintenance" },
    { id: 9, title: "Passenger Services", description: "Customer service and passenger safety" },
    { id: 10, title: "Freight Operations", description: "Goods and freight handling procedures" },
    { id: 11, title: "Electrical Systems", description: "Electrical safety and procedures" },
    { id: 12, title: "Communication Systems", description: "Radio and communication protocols" },
    { id: 13, title: "Security Procedures", description: "Security and access control" },
    { id: 14, title: "Environmental Protection", description: "Environmental compliance and procedures" },
    { id: 15, title: "Training and Certification", description: "Staff training requirements" },
    { id: 16, title: "Equipment Standards", description: "Equipment specifications and standards" },
    { id: 17, title: "Emergency Procedures", description: "Emergency response and evacuation" },
    { id: 18, title: "Quality Assurance", description: "Quality control and monitoring" },
    { id: 19, title: "Compliance and Auditing", description: "Regulatory compliance procedures" },
    { id: 20, title: "Future Developments", description: "Upcoming changes and innovations" }
  ];

  const handleChapterClick = async (chapterId: number) => {
    if (chapterStatus[chapterId] === 'available') {
      router.push(`/chapter/${chapterId}`);
    }
  };

  const handleSearch = (query: string) => {
    router.push(`/?search=${encodeURIComponent(query)}`);
  };

  const handleMenuToggle = () => {
    // Mobile menu toggle if needed
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Chapters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {chapters.map((chapter) => {
              const isLoading = loadingChapter === chapter.id;
              const status = chapterStatus[chapter.id];
              const isAvailable = chapter.id === 4 || status === 'available';
              const isUnavailable = status === 'unavailable';
              
              return (
                <Card 
                  key={chapter.id} 
                  className={`transition-all duration-300 cursor-pointer group ${
                    isLoading ? 'scale-105 shadow-xl' : 'hover:shadow-lg'
                  } ${
                    isUnavailable ? 'opacity-60' : ''
                  }`}
                  onClick={() => handleChapterClick(chapter.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isAvailable ? 'bg-primary/10' : isUnavailable ? 'bg-red-100' : 'bg-primary/10'
                        }`}>
                          {isLoading ? (
                            <Loader2 className="h-5 w-5 text-primary animate-spin" />
                          ) : isUnavailable ? (
                            <XCircle className="h-5 w-5 text-red-500" />
                          ) : isAvailable && chapter.id === 4 ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <span className="text-primary font-bold text-lg">{chapter.id}</span>
                          )}
                        </div>
                        <CardTitle className={`text-lg transition-colors ${
                          isLoading ? 'text-primary' : 'group-hover:text-primary'
                        }`}>
                          Chapter {chapter.id}
                        </CardTitle>
                      </div>
                      {isLoading ? (
                        <div className="text-sm text-primary font-medium">Processing...</div>
                      ) : isUnavailable ? (
                        <div className="text-sm text-red-500 font-medium">Unavailable</div>
                      ) : (
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-foreground mb-2">{chapter.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {chapter.description}
                    </p>
                    {chapter.id === 4 && (
                      <div className="mt-2 text-xs text-green-600 font-medium">Available</div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-16 text-center">
            <div className="bg-muted/50 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" onClick={() => router.back()} className="px-6 py-3 inline-flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={() => router.push('/')}
                  className="px-6 py-3"
                >
                  Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChaptersPage;
