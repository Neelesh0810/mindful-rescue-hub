
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const NewsUpdatesSection = () => {
  const updates = [
    {
      title: "Emergency Shelter Capacity Expanded",
      description: "Three new emergency shelters have been established to accommodate more affected individuals.",
      time: "2 hours ago",
      category: "Shelter",
      link: "/news/1"
    },
    {
      title: "Road Closures Update",
      description: "Multiple highways remain closed due to flooding. Alternative routes have been established.",
      time: "5 hours ago",
      category: "Infrastructure",
      link: "/news/2"
    },
    {
      title: "Medical Supply Distribution",
      description: "Medical supplies are being distributed to local clinics. Priority given to affected areas.",
      time: "8 hours ago",
      category: "Medical",
      link: "/news/3"
    },
    {
      title: "Volunteer Registration Open",
      description: "Online registration for disaster relief volunteers is now available. Training sessions scheduled.",
      time: "12 hours ago",
      category: "Volunteering",
      link: "/news/4"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Latest Updates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {updates.map((update, index) => (
            <Card key={index} className="bg-black/40 border-white/10 hover:bg-black/60 transition-colors">
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
                <CardTitle className="text-lg">{update.title}</CardTitle>
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
        
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="border-white/20">
            View All Updates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdatesSection;
