
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Info, Users, Clock, Home } from "lucide-react";
import { toast } from "sonner";
import { getNearbyVolunteers } from "@/services/volunteerService";
import WeatherWidget from "@/components/WeatherWidget";

interface Shelter {
  id: string;
  name: string;
  address: string;
  phone: string;
  capacity: number;
  currentOccupancy: number;
  facilities: string[];
  distance?: number;
  lat: number;
  lng: number;
}

const Shelters = () => {
  const [searchParams] = useSearchParams();
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchZip, setSearchZip] = useState("");
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        // For demo purposes, we'll use mock data
        const mockShelters: Shelter[] = [
          {
            id: "1",
            name: "Central Community Shelter",
            address: "123 Main St, Anytown, IN 46001",
            phone: "+91-800-123-4567",
            capacity: 150,
            currentOccupancy: 72,
            facilities: ["Food", "Medical", "Showers", "Pet Friendly"],
            lat: 28.6139,
            lng: 77.2090
          },
          {
            id: "2",
            name: "East Side Relief Center",
            address: "456 Oak St, Anytown, IN 46002",
            phone: "+91-800-234-5678",
            capacity: 200,
            currentOccupancy: 130,
            facilities: ["Food", "Medical", "Childcare", "Internet"],
            lat: 28.6229,
            lng: 77.2100
          },
          {
            id: "3",
            name: "Westview Emergency Shelter",
            address: "789 Pine St, Anytown, IN 46003",
            phone: "+91-800-345-6789",
            capacity: 120,
            currentOccupancy: 85,
            facilities: ["Food", "Showers", "Beds", "Mental Health Services"],
            lat: 28.6339,
            lng: 77.2290
          },
          {
            id: "4",
            name: "Northside Evacuation Center",
            address: "101 Elm St, Anytown, IN 46004",
            phone: "+91-800-456-7890",
            capacity: 180,
            currentOccupancy: 92,
            facilities: ["Food", "Medical", "Pet Friendly", "Family Rooms"],
            lat: 28.5839,
            lng: 77.2390
          },
          {
            id: "5",
            name: "Southtown Respite Facility",
            address: "202 Maple St, Anytown, IN 46005",
            phone: "+91-800-567-8901",
            capacity: 100,
            currentOccupancy: 43,
            facilities: ["Food", "Medical", "Childcare", "Storage"],
            lat: 28.6039,
            lng: 77.1990
          }
        ];
        
        // Check if we have lat/lng from URL params
        const lat = searchParams.get("lat");
        const lng = searchParams.get("lng");
        
        if (lat && lng) {
          const userLat = parseFloat(lat);
          const userLng = parseFloat(lng);
          setUserLocation({ lat: userLat, lng: userLng });
          
          // Calculate distance from user location and sort shelters
          const sheltersWithDistance = mockShelters.map(shelter => {
            const distance = calculateDistance(userLat, userLng, shelter.lat, shelter.lng);
            return { ...shelter, distance };
          });
          
          sheltersWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
          setShelters(sheltersWithDistance);
          
          // Get nearby volunteers
          const nearbyVolunteers = await getNearbyVolunteers(userLat, userLng);
          setVolunteers(nearbyVolunteers);
        } else {
          setShelters(mockShelters);
        }
      } catch (error) {
        console.error("Error fetching shelters:", error);
        toast.error("Failed to fetch nearby shelters");
        setShelters([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchShelters();
  }, [searchParams]);
  
  const handleSearchByZip = () => {
    if (!searchZip) {
      toast.error("Please enter a zip code");
      return;
    }
    
    // In a real app, this would use geocoding to convert zip to lat/lng
    // For demo, we'll simulate finding user's location
    toast.success(`Searching for shelters near ${searchZip}`);
    
    // Simulate getting location from zip
    const mockLat = 28.6139 + (Math.random() * 0.1 - 0.05);
    const mockLng = 77.2090 + (Math.random() * 0.1 - 0.05);
    
    setUserLocation({ lat: mockLat, lng: mockLng });
    
    // Recalculate distances and sort
    const sheltersWithDistance = shelters.map(shelter => {
      const distance = calculateDistance(mockLat, mockLng, shelter.lat, shelter.lng);
      return { ...shelter, distance };
    });
    
    sheltersWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    setShelters(sheltersWithDistance);
  };
  
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    // Simple distance calculation (not accurate for long distances but fine for demo)
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return Math.round(distance * 10) / 10;
  };
  
  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };
  
  const getDirections = (shelter: Shelter) => {
    if (!userLocation) {
      toast.error("Your location is not available");
      return;
    }
    
    // In a real app, this would open a maps app with directions
    // For demo, we'll just show a toast
    toast.success(`Getting directions to ${shelter.name}`);
    
    // Open Google Maps with directions
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${shelter.lat},${shelter.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center mb-8">
            <Home size={28} className="mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Emergency Shelters</h1>
          </div>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8">
            Find safe shelter locations with essential services to support you during emergencies.
          </p>
          
          <div className="max-w-4xl mx-auto mb-8">
            <WeatherWidget />
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8 max-w-4xl mx-auto">
            <div className="flex-1 bg-black/40 border border-white/10 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <Info size={18} className="mr-2 text-blue-400" />
                <h2 className="text-lg font-medium">Find Shelters Near You</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Enter your zip code to find the nearest emergency shelters or click the button to use your current location.
              </p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter zip code"
                  className="bg-black/60 border-white/10"
                  value={searchZip}
                  onChange={(e) => setSearchZip(e.target.value)}
                />
                <Button onClick={handleSearchByZip}>Search</Button>
              </div>
            </div>
            
            {userLocation && volunteers.length > 0 && (
              <div className="flex-1 bg-black/40 border border-white/10 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <Users size={18} className="mr-2 text-green-400" />
                  <h2 className="text-lg font-medium">Nearby Volunteers</h2>
                </div>
                <p className="text-gray-400 mb-2">
                  These volunteers are available in your area to assist:
                </p>
                <ul className="space-y-1 text-sm">
                  {volunteers.map((volunteer, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {volunteer.name} - {volunteer.distance}km away
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <p>Loading shelters...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {shelters.map((shelter) => (
                <Card key={shelter.id} className="bg-black/40 border-white/10">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{shelter.name}</CardTitle>
                      {shelter.distance && (
                        <span className="text-sm bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                          {shelter.distance} km away
                        </span>
                      )}
                    </div>
                    <CardDescription className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {shelter.address}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-gray-400" />
                      <span>{shelter.phone}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-400">Capacity</p>
                        <div className="flex items-center">
                          <Users size={16} className="mr-2" />
                          <span>{shelter.currentOccupancy}/{shelter.capacity}</span>
                        </div>
                      </div>
                      
                      <div className="w-24 bg-gray-700 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            shelter.currentOccupancy / shelter.capacity > 0.9 
                              ? 'bg-red-500' 
                              : shelter.currentOccupancy / shelter.capacity > 0.7 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                          }`}
                          style={{ width: `${(shelter.currentOccupancy / shelter.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Facilities</p>
                      <div className="flex flex-wrap gap-2">
                        {shelter.facilities.map((facility, index) => (
                          <span key={index} className="bg-white/10 text-xs px-2 py-1 rounded">
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-2">
                      <Button 
                        variant="outline" 
                        className="border-white/20"
                        onClick={() => getDirections(shelter)}
                      >
                        Get Directions
                      </Button>
                      <Button>Contact Shelter</Button>
                    </div>
                  </CardContent>
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
