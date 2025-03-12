
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, HandHeart, Users, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ResourcesSection = () => {
  const resources = {
    victims: [
      { title: "Emergency Shelters", description: "Find safe locations with food, water, and beds" },
      { title: "Medical Assistance", description: "Locations and contacts for medical aid" },
      { title: "Food & Water", description: "Distribution points for essential supplies" },
      { title: "Missing Persons", description: "Report or search for missing loved ones" }
    ],
    volunteers: [
      { title: "Sign Up", description: "Register as a volunteer for disaster relief" },
      { title: "Training", description: "Access required training materials and courses" },
      { title: "Current Needs", description: "View areas where volunteers are most needed" },
      { title: "Safety Protocols", description: "Essential guidelines for volunteer safety" }
    ],
    organizations: [
      { title: "Coordination Hub", description: "Connect with other relief organizations" },
      { title: "Resource Allocation", description: "Submit or view resource requirements" },
      { title: "Situation Reports", description: "Access latest status updates and reports" },
      { title: "Data Sharing", description: "Protocols for sharing critical information" }
    ],
    government: [
      { title: "Official Updates", description: "Authoritative information from government sources" },
      { title: "Funding Resources", description: "Access disaster relief funding information" },
      { title: "Regulatory Guidance", description: "Important regulations during emergency response" },
      { title: "Long-term Recovery", description: "Plans and resources for rebuilding communities" }
    ]
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Essential Resources</h2>
        
        <Tabs defaultValue="victims" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="victims" className="flex items-center gap-2">
              <AlertTriangle size={16} />
              <span className="hidden md:inline">Victims</span>
            </TabsTrigger>
            <TabsTrigger value="volunteers" className="flex items-center gap-2">
              <HandHeart size={16} />
              <span className="hidden md:inline">Volunteers</span>
            </TabsTrigger>
            <TabsTrigger value="organizations" className="flex items-center gap-2">
              <Users size={16} />
              <span className="hidden md:inline">Organizations</span>
            </TabsTrigger>
            <TabsTrigger value="government" className="flex items-center gap-2">
              <Flag size={16} />
              <span className="hidden md:inline">Government</span>
            </TabsTrigger>
          </TabsList>
          
          {Object.entries(resources).map(([key, items]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item, index) => (
                  <Card key={index} className="bg-black/40 border-white/10 hover:bg-black/60 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400">{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Button asChild variant="outline" className="border-white/20">
                  <Link to={`/${key}`}>View All {key.charAt(0).toUpperCase() + key.slice(1)} Resources</Link>
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ResourcesSection;
