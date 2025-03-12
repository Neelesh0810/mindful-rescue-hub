
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { User, MapPin, CloudRain, Thermometer, Clock, BadgeAlert, HandHeart, Building } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [userRegistrations, setUserRegistrations] = useState({
    victim: null,
    volunteer: null,
    organization: null,
  });
  
  const [locationData, setLocationData] = useState({
    loading: true,
    error: null,
    coords: { latitude: null, longitude: null },
    location: null,
  });
  
  const [weatherData, setWeatherData] = useState({
    loading: true,
    error: null,
    data: null,
  });
  
  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      navigate("/auth");
      return;
    }
    
    // Fetch user registrations
    const victims = JSON.parse(localStorage.getItem("victims") || "[]");
    const volunteers = JSON.parse(localStorage.getItem("volunteers") || "[]");
    const organizations = JSON.parse(localStorage.getItem("organizations") || "[]");
    
    const userVictim = victims.find(v => v.userId === currentUser.id);
    const userVolunteer = volunteers.find(v => v.userId === currentUser.id);
    const userOrganization = organizations.find(o => o.userId === currentUser.id);
    
    setUserRegistrations({
      victim: userVictim || null,
      volunteer: userVolunteer || null,
      organization: userOrganization || null,
    });
    
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationData(prev => ({
            ...prev,
            loading: false,
            coords: { latitude, longitude },
          }));
          
          // Get location name from coordinates (reverse geocoding)
          fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=9b28f7539507873ca8efef98b9e75c92`)
            .then(res => res.json())
            .then(data => {
              if (data && data[0]) {
                setLocationData(prev => ({
                  ...prev,
                  location: {
                    name: data[0].name,
                    country: data[0].country,
                  },
                }));
              }
            })
            .catch(err => {
              console.error("Error fetching location name:", err);
            });
          
          // Get weather data for the location
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=9b28f7539507873ca8efef98b9e75c92`)
            .then(res => res.json())
            .then(data => {
              setWeatherData({
                loading: false,
                error: null,
                data,
              });
            })
            .catch(err => {
              console.error("Error fetching weather data:", err);
              setWeatherData({
                loading: false,
                error: "Failed to fetch weather data",
                data: null,
              });
            });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationData(prev => ({
            ...prev,
            loading: false,
            error: "Failed to get location",
          }));
          setWeatherData({
            loading: false,
            error: "Location access denied",
            data: null,
          });
          toast.error("Location access denied. Weather data unavailable.");
        }
      );
    } else {
      setLocationData(prev => ({
        ...prev,
        loading: false,
        error: "Geolocation not supported",
      }));
      setWeatherData({
        loading: false,
        error: "Geolocation not supported",
        data: null,
      });
      toast.error("Your browser doesn't support geolocation. Weather data unavailable.");
    }
  }, [currentUser, navigate]);
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center mb-8">
            <User size={28} className="mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Your Profile</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-black/40 border-white/10 md:col-span-2">
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Full Name</p>
                    <p className="text-lg font-medium">{currentUser?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-lg font-medium">{currentUser?.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Account Type</p>
                  <p className="text-lg font-medium capitalize">{currentUser?.role}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/40 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2" size={20} />
                  Current Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                {locationData.loading ? (
                  <p>Loading your location...</p>
                ) : locationData.error ? (
                  <p className="text-red-400">{locationData.error}</p>
                ) : (
                  <>
                    {locationData.location ? (
                      <p className="text-lg font-medium">
                        {locationData.location.name}, {locationData.location.country}
                      </p>
                    ) : (
                      <p className="text-lg font-medium">
                        {locationData.coords.latitude?.toFixed(4)}, {locationData.coords.longitude?.toFixed(4)}
                      </p>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-black/40 border-white/10 mb-12">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CloudRain className="mr-2" size={20} />
                Current Weather Conditions
              </CardTitle>
              <CardDescription>Real-time weather at your location</CardDescription>
            </CardHeader>
            <CardContent>
              {weatherData.loading ? (
                <p>Loading weather data...</p>
              ) : weatherData.error ? (
                <p className="text-red-400">{weatherData.error}</p>
              ) : weatherData.data ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center justify-center">
                    {weatherData.data.weather && weatherData.data.weather[0] && (
                      <>
                        <img 
                          src={`http://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}@2x.png`} 
                          alt={weatherData.data.weather[0].description}
                          className="w-20 h-20"
                        />
                        <p className="text-lg font-medium capitalize">
                          {weatherData.data.weather[0].description}
                        </p>
                      </>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <Thermometer className="mx-auto mb-2" size={24} />
                    <p className="text-sm text-gray-400">Temperature</p>
                    <p className="text-2xl font-bold">{weatherData.data.main?.temp?.toFixed(1)}°C</p>
                    <p className="text-sm text-gray-400">
                      Feels like {weatherData.data.main?.feels_like?.toFixed(1)}°C
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <CloudRain className="mx-auto mb-2" size={24} />
                    <p className="text-sm text-gray-400">Humidity</p>
                    <p className="text-2xl font-bold">{weatherData.data.main?.humidity}%</p>
                    <p className="text-sm text-gray-400">
                      Pressure: {weatherData.data.main?.pressure} hPa
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <Clock className="mx-auto mb-2" size={24} />
                    <p className="text-sm text-gray-400">Updated</p>
                    <p className="text-lg font-medium">
                      {new Date(weatherData.data.dt * 1000).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ) : (
                <p>No weather data available</p>
              )}
            </CardContent>
          </Card>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Registrations</h2>
            <Tabs defaultValue="victim" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="victim" className="flex items-center gap-2">
                  <BadgeAlert size={16} />
                  <span>Victim</span>
                </TabsTrigger>
                <TabsTrigger value="volunteer" className="flex items-center gap-2">
                  <HandHeart size={16} />
                  <span>Volunteer</span>
                </TabsTrigger>
                <TabsTrigger value="organization" className="flex items-center gap-2">
                  <Building size={16} />
                  <span>Organization</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="victim">
                <Card className="bg-black/40 border-white/10">
                  <CardHeader>
                    <CardTitle>Victim Registration</CardTitle>
                    <CardDescription>Your disaster victim registration details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userRegistrations.victim ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">Name</p>
                            <p className="text-lg font-medium">{userRegistrations.victim.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Age</p>
                            <p className="text-lg font-medium">{userRegistrations.victim.age}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400">Location</p>
                          <p className="text-lg font-medium">{userRegistrations.victim.location}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400">Disaster Type</p>
                          <p className="text-lg font-medium capitalize">{userRegistrations.victim.disasterType}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400">Registration Date</p>
                          <p className="text-lg font-medium">
                            {new Date(userRegistrations.victim.registrationDate).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400">Status</p>
                          <p className="text-lg font-medium capitalize">{userRegistrations.victim.status}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-400 mb-4">You haven't registered as a victim</p>
                        <Button asChild>
                          <a href="/register/victim">Register Now</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="volunteer">
                <Card className="bg-black/40 border-white/10">
                  <CardHeader>
                    <CardTitle>Volunteer Registration</CardTitle>
                    <CardDescription>Your volunteer registration details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userRegistrations.volunteer ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">Name</p>
                            <p className="text-lg font-medium">{userRegistrations.volunteer.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Skills</p>
                            <p className="text-lg font-medium">{userRegistrations.volunteer.skills}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400">Availability</p>
                          <p className="text-lg font-medium">{userRegistrations.volunteer.availability}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400">Location</p>
                          <p className="text-lg font-medium">{userRegistrations.volunteer.location}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400">Registration Date</p>
                          <p className="text-lg font-medium">
                            {new Date(userRegistrations.volunteer.registrationDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-400 mb-4">You haven't registered as a volunteer</p>
                        <Button asChild>
                          <a href="/register/volunteer">Register Now</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="organization">
                <Card className="bg-black/40 border-white/10">
                  <CardHeader>
                    <CardTitle>Organization Registration</CardTitle>
                    <CardDescription>Your organization registration details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userRegistrations.organization ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">Name</p>
                            <p className="text-lg font-medium">{userRegistrations.organization.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Type</p>
                            <p className="text-lg font-medium">{userRegistrations.organization.type}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400">Contact</p>
                          <p className="text-lg font-medium">{userRegistrations.organization.contact}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400">Location</p>
                          <p className="text-lg font-medium">{userRegistrations.organization.location}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400">Registration Date</p>
                          <p className="text-lg font-medium">
                            {new Date(userRegistrations.organization.registrationDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-400 mb-4">You haven't registered an organization</p>
                        <Button asChild>
                          <a href="/register/organization">Register Now</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
