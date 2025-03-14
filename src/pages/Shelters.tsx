
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, MapPin, Users, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { findNearbyShelters } from "@/services/shelterService";
import { toast } from "sonner";

type Shelter = {
  id: string;
  name: string;
  address: string;
  capacity: number;
  current: number;
  facilities: string[];
  contact: string;
  lat: number;
  lng: number;
  distance: number;
};

const Shelters = () => {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchRadius, setSearchRadius] = useState(10);

  useEffect(() => {
    fetchShelters();
  }, []);

  const fetchShelters = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const nearbyShelters = await findNearbyShelters(searchRadius);
      setShelters(nearbyShelters);
    } catch (err) {
      setError("Unable to find shelters near your location. Please enable location services.");
      toast.error("Location services are required to find nearby shelters");
    } finally {
      setLoading(false);
    }
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRadius(parseInt(e.target.value));
  };

  const handleSearch = () => {
    fetchShelters();
  };

  const getOccupancyColor = (percentage: number) => {
    if (percentage < 50) return "bg-green-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center mb-8">
            <Home size={28} className="mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Nearby Shelters</h1>
          </div>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            Find safe shelters near your current location where you can seek refuge during and after disasters.
          </p>
          
          <div className="bg-black/40 border border-white/10 rounded-lg p-6 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold mb-2">Search Radius: {searchRadius} km</h2>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={searchRadius} 
                  onChange={handleRadiusChange}
                  className="w-full max-w-xs"
                />
              </div>
              <Button onClick={handleSearch}>
                Find Shelters
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-10 h-10 border-4 border-white/10 border-t-white rounded-full mx-auto mb-4"></div>
              <p>Finding shelters near you...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-lg mb-4">{error}</p>
              <Button onClick={fetchShelters}>Try Again</Button>
            </div>
          ) : shelters.length === 0 ? (
            <div className="text-center py-12 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <p className="text-lg mb-4">No shelters found within {searchRadius} km of your location.</p>
              <p className="text-gray-400 mb-4">Try increasing your search radius or call emergency services for assistance.</p>
              <Button onClick={() => setSearchRadius(prev => Math.min(prev + 10, 30))}>
                Increase Search Radius
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shelters.map(shelter => (
                <Card key={shelter.id} className="bg-black/40 border-white/10">
                  <CardHeader>
                    <CardTitle>{shelter.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {shelter.distance} km away
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">Address:</span> {shelter.address}
                    </p>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Occupancy: {shelter.current}/{shelter.capacity}</span>
                        <span>{Math.round((shelter.current / shelter.capacity) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(shelter.current / shelter.capacity) * 100}
                        className={`h-2 ${getOccupancyColor((shelter.current / shelter.capacity) * 100)}`}
                      />
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Facilities:</p>
                      <div className="flex flex-wrap gap-2">
                        {shelter.facilities.map(facility => (
                          <span 
                            key={facility}
                            className="px-2 py-1 bg-white/10 rounded-md text-xs"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <Button size="sm" variant="outline" className="border-white/20">
                      <MapPin size={16} className="mr-2" />
                      Directions
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Phone size={16} className="mr-2" />
                      {shelter.contact}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shelters;
