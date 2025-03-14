
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ExternalLink } from "lucide-react";

type NewsItem = {
  id: string;
  title: string;
  source: string;
  date: string;
  category: string;
  link: string;
};

const RealTimeNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      
      // In a real app, this would be an API call to a news service
      // For this demo, we'll use mock data
      const mockNews: NewsItem[] = [
        {
          id: "1",
          title: "Heavy rainfall warning issued for Delhi and NCR region",
          source: "Indian Meteorological Department",
          date: new Date().toISOString(),
          category: "weather",
          link: "https://mausam.imd.gov.in/"
        },
        {
          id: "2",
          title: "Relief operations continue in flood-affected areas of Uttarakhand",
          source: "National Disaster Response Force",
          date: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          category: "disaster",
          link: "https://ndrf.gov.in/"
        },
        {
          id: "3",
          title: "Heat wave alert for Northern India as temperatures rise above normal",
          source: "Weather News Network",
          date: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          category: "weather",
          link: "https://www.youtube.com/watch?v=5qap5aO4i9A" // Link to a weather channel
        },
        {
          id: "4",
          title: "Health advisory issued for rain-affected regions to prevent waterborne diseases",
          source: "Ministry of Health",
          date: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
          category: "health",
          link: "https://www.mohfw.gov.in/"
        }
      ];
      
      setNews(mockNews);
      setLoading(false);
    };
    
    fetchNews();
    
    // Set up real-time updates (simulated with interval)
    const interval = setInterval(() => {
      // In a real app, this would poll an API endpoint
      const newItem: NewsItem = {
        id: Date.now().toString(),
        title: `Weather update: ${new Date().toLocaleTimeString()}`,
        source: "Weather Service",
        date: new Date().toISOString(),
        category: "weather",
        link: "https://mausam.imd.gov.in/"
      };
      
      setNews(prev => [newItem, ...prev.slice(0, 3)]);
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Real-Time Updates</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin w-6 h-6 border-2 border-white/10 border-t-white rounded-full"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {news.map(item => (
              <div key={item.id} className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                <h3 className="font-medium mb-1">{item.title}</h3>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{item.source}</span>
                  <div className="flex items-center">
                    <CalendarDays size={12} className="mr-1" />
                    <span>{formatRelativeTime(item.date)}</span>
                  </div>
                </div>
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 flex items-center mt-1 hover:underline"
                >
                  <span>View Source</span>
                  <ExternalLink size={10} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeNews;
