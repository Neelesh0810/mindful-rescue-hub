
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle, Info } from "lucide-react";
import WeatherWidget from "@/components/WeatherWidget";
import AlertSignupForm from "@/components/AlertSignupForm";
import { format } from "date-fns";
import RealTimeNews from "@/components/RealTimeNews";

interface NewsUpdate {
  id: string;
  title: string;
  description: string;
  time: string;
  timestamp: Date;
  category: string;
  priority: "high" | "medium" | "low";
  link: string;
}

const News = () => {
  const [updates, setUpdates] = useState<NewsUpdate[]>([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    
    // Get India time
    const indiaTime = new Date(currentDateTime.getTime());
    indiaTime.setHours(indiaTime.getHours() + 5);
    indiaTime.setMinutes(indiaTime.getMinutes() + 30);
    
    // Mock data with real timestamps
    const now = indiaTime.getTime();
    const hour = 60 * 60 * 1000;
    
    const mockUpdates: NewsUpdate[] = [
      {
        id: "1",
        title: "Emergency Shelter Capacity Expanded",
        description: "Three new emergency shelters have been established to accommodate more affected individuals.",
        time: "2 hours ago",
        timestamp: new Date(now - 2 * hour),
        category: "Shelter",
        priority: "high",
        link: "/news/1"
      },
      {
        id: "2",
        title: "Road Closures Update",
        description: "Multiple highways remain closed due to flooding. Alternative routes have been established.",
        time: "5 hours ago",
        timestamp: new Date(now - 5 * hour),
        category: "Infrastructure",
        priority: "high",
        link: "/news/2"
      },
      {
        id: "3",
        title: "Medical Supply Distribution",
        description: "Medical supplies are being distributed to local clinics. Priority given to affected areas.",
        time: "8 hours ago",
        timestamp: new Date(now - 8 * hour),
        category: "Medical",
        priority: "medium",
        link: "/news/3"
      },
      {
        id: "4",
        title: "Volunteer Registration Open",
        description: "Online registration for disaster relief volunteers is now available. Training sessions scheduled.",
        time: "12 hours ago",
        timestamp: new Date(now - 12 * hour),
        category: "Volunteering",
        priority: "medium",
        link: "/news/4"
      },
      {
        id: "5",
        title: "Water Supply Restoration Progress",
        description: "Crews making progress restoring water to affected neighborhoods. Expected completion in 48 hours.",
        time: "1 day ago",
        timestamp: new Date(now - 24 * hour),
        category: "Infrastructure",
        priority: "medium",
        link: "/news/5"
      },
      {
        id: "6",
        title: "Mental Health Resources Available",
        description: "Free counseling services now available for disaster victims. Both in-person and telehealth options.",
        time: "1 day ago",
        timestamp: new Date(now - 26 * hour),
        category: "Health",
        priority: "low",
        link: "/news/6"
      }
    ];
    
    // Update the time text for each update based on the timestamp
    const updatesWithCorrectTime = mockUpdates.map(update => {
      const timeDiff = now - update.timestamp.getTime();
      let timeText;
      
      if (timeDiff < hour) {
        const minutes = Math.floor(timeDiff / (60 * 1000));
        timeText = `${minutes} minutes ago`;
      } else if (timeDiff < 24 * hour) {
        const hours = Math.floor(timeDiff / hour);
        timeText = `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else {
        const days = Math.floor(timeDiff / (24 * hour));
        timeText = `${days} day${days > 1 ? 's' : ''} ago`;
      }
      
      return {
        ...update,
        time: timeText
      };
    });
    
    setUpdates(updatesWithCorrectTime);
    
    return () => clearInterval(timer);
  }, [currentDateTime]);
  
  // Get India time
  const indiaTime = new Date(currentDateTime.getTime());
  indiaTime.setHours(indiaTime.getHours() + 5);
  indiaTime.setMinutes(indiaTime.getMinutes() + 30);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Latest Updates</h1>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-6">
            Current India time: {format(indiaTime, "MMMM d, yyyy h:mm a")}
          </p>
          
          <div className="max-w-4xl mx-auto mb-12">
            <WeatherWidget />
          </div>
          
          <RealTimeNews />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {updates.map((update) => (
              <Card key={update.id} className={`
                bg-black/40 border-white/10 hover:bg-black/60 transition-colors
                ${update.priority === 'high' ? 'border-l-4 border-l-red-500' : ''}
                ${update.priority === 'medium' ? 'border-l-4 border-l-yellow-500' : ''}
              `}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-white/10">
                      {update.category}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock size={14} className="mr-1" />
                      {update.time}
                    </div>
                  </div>
                  <CardTitle className="text-lg flex items-start">
                    {update.priority === 'high' && <AlertTriangle size={18} className="mr-2 text-red-500 flex-shrink-0 mt-1" />}
                    {update.title}
                  </CardTitle>
                  <CardDescription>{update.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="link" className="px-0 hover:no-underline">
                    <a href={update.link}>Read Full Update</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="bg-black/40 border border-white/10 rounded-lg p-6 max-w-3xl mx-auto">
            <div className="flex items-start mb-4">
              <Info size={20} className="mr-3 mt-1 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold mb-2">Stay Connected</h3>
                <p className="text-gray-400 mb-4">
                  For real-time alerts and updates, sign up for our emergency notification system or follow our official social media channels.
                </p>
                <AlertSignupForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default News;
