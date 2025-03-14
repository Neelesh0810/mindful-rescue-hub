
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HandHeart, Building, MapPin, Phone } from "lucide-react";
import { getNearbyVolunteers, getNearbyOrganizations, Volunteer, Organization } from "@/services/nearbyHelpService";

const NearbyHelpWidget = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [nearbyVolunteers, nearbyOrgs] = await Promise.all([
          getNearbyVolunteers(),
          getNearbyOrganizations()
        ]);
        
        setVolunteers(nearbyVolunteers);
        setOrganizations(nearbyOrgs);
      } catch (error) {
        console.error("Error fetching nearby help:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Nearby Help</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin w-6 h-6 border-2 border-white/10 border-t-white rounded-full"></div>
          </div>
        ) : (
          <Tabs defaultValue="volunteers">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="volunteers" className="text-xs">
                <HandHeart size={14} className="mr-1" />
                Volunteers
              </TabsTrigger>
              <TabsTrigger value="organizations" className="text-xs">
                <Building size={14} className="mr-1" />
                Organizations
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="volunteers" className="mt-4">
              {volunteers.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-2">
                  No volunteers found nearby
                </p>
              ) : (
                <div className="space-y-3">
                  {volunteers.slice(0, 3).map(volunteer => (
                    <div key={volunteer.id} className="bg-black/20 p-3 rounded-md">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h4 className="font-medium">{volunteer.name}</h4>
                          <div className="flex items-center text-xs text-gray-400">
                            <MapPin size={10} className="mr-1" />
                            <span>{volunteer.distance} km • {volunteer.location}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <Phone size={14} />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {volunteer.skills.slice(0, 3).map((skill, i) => (
                          <span 
                            key={i}
                            className="px-1.5 py-0.5 bg-white/10 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {volunteers.length > 3 && (
                    <Button variant="link" size="sm" className="w-full text-xs mt-1">
                      View all {volunteers.length} volunteers
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="organizations" className="mt-4">
              {organizations.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-2">
                  No organizations found nearby
                </p>
              ) : (
                <div className="space-y-3">
                  {organizations.slice(0, 3).map(org => (
                    <div key={org.id} className="bg-black/20 p-3 rounded-md">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h4 className="font-medium">{org.name}</h4>
                          <div className="flex items-center text-xs text-gray-400">
                            <MapPin size={10} className="mr-1" />
                            <span>{org.distance} km • {org.location}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <Phone size={14} />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-300 mt-1">
                        {org.serviceType}
                      </p>
                    </div>
                  ))}
                  
                  {organizations.length > 3 && (
                    <Button variant="link" size="sm" className="w-full text-xs mt-1">
                      View all {organizations.length} organizations
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default NearbyHelpWidget;
