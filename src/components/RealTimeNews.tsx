
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface NewsItem {
  id: string;
  title: string;
  time: string;
  source: string;
}

const RealTimeNews = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    
    // Mock news data with real time
    const mockNews: NewsItem[] = [
      {
        id: "1",
        title: "Heavy rainfall warning issued for coastal regions",
        time: format(new Date(currentDateTime.getTime() - 5 * 60000), "h:mm a"),
        source: "India Meteorological Department"
      },
      {
        id: "2",
        title: "Emergency response teams deployed to flood-affected areas",
        time: format(new Date(currentDateTime.getTime() - 12 * 60000), "h:mm a"),
        source: "National Disaster Response Force"
      },
      {
        id: "3",
        title: "Evacuation orders for riverbank communities",
        time: format(new Date(currentDateTime.getTime() - 25 * 60000), "h:mm a"),
        source: "State Emergency Services"
      },
      {
        id: "4",
        title: "Relief supplies being airlifted to cut-off villages",
        time: format(new Date(currentDateTime.getTime() - 38 * 60000), "h:mm a"),
        source: "Indian Air Force"
      },
      {
        id: "5",
        title: "Power outages reported in northeastern districts",
        time: format(new Date(currentDateTime.getTime() - 53 * 60000), "h:mm a"),
        source: "State Power Corporation"
      }
    ];
    
    setNewsItems(mockNews);
    
    return () => clearInterval(timer);
  }, [currentDateTime]);
  
  // Get India time
  const indiaTime = new Date(currentDateTime.getTime());
  indiaTime.setHours(indiaTime.getHours() + 5);
  indiaTime.setMinutes(indiaTime.getMinutes() + 30);

  return (
    <Card className="bg-black/40 border-white/10 mb-8">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Real-Time Updates</span>
          <span className="text-sm font-normal text-gray-400">
            Last updated: {format(indiaTime, "h:mm a")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {newsItems.map((item, index) => (
            <div key={item.id}>
              <div className="flex justify-between items-start py-2">
                <div className="flex-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.source}</p>
                </div>
                <span className="text-sm text-gray-400 ml-4">{item.time}</span>
              </div>
              {index < newsItems.length - 1 && <Separator className="bg-white/10" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeNews;
