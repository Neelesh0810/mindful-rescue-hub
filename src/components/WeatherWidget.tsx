
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // For demo purposes, we'll use mock data
        // In a real app, you would connect to a weather API
        // API call would be: https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=auto:ip&aqi=no
        
        // Simulate a delay for the API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock weather data for India
        const conditions = [
          "Sunny", "Partly cloudy", "Cloudy", "Overcast", 
          "Light rain", "Moderate rain", "Heavy rain"
        ];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        
        // Generate temperature based on condition
        let tempRange = [25, 32]; // Default sunny range
        if (randomCondition.includes("cloudy")) tempRange = [22, 28];
        if (randomCondition.includes("rain")) tempRange = [18, 25];
        
        const temp = Math.floor(tempRange[0] + Math.random() * (tempRange[1] - tempRange[0]));
        
        // Mock data
        const mockWeather: WeatherData = {
          location: "New Delhi, India",
          temperature: temp,
          condition: randomCondition,
          icon: getIconForCondition(randomCondition),
          humidity: Math.floor(60 + Math.random() * 30),
          windSpeed: Math.floor(5 + Math.random() * 15),
          feelsLike: temp + (Math.random() > 0.5 ? 2 : -2)
        };
        
        setWeather(mockWeather);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError("Failed to load weather data");
        toast.error("Could not load weather information");
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeather();
  }, []);
  
  const getIconForCondition = (condition: string) => {
    if (condition.includes("rain")) return "rain";
    if (condition.includes("cloud")) return "cloud";
    if (condition.includes("Sunny")) return "sun";
    return "cloud";
  };
  
  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case "rain":
        return <CloudRain size={24} className="text-blue-400" />;
      case "cloud":
        return <Cloud size={24} className="text-gray-400" />;
      case "sun":
        return <Sun size={24} className="text-yellow-400" />;
      default:
        return <Cloud size={24} className="text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <Card className="bg-black/40 border-white/10">
        <CardContent className="p-4 flex justify-center items-center h-24">
          <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
          <span className="ml-2">Loading weather data...</span>
        </CardContent>
      </Card>
    );
  }
  
  if (error || !weather) {
    return (
      <Card className="bg-black/40 border-white/10">
        <CardContent className="p-4">
          <p className="text-center text-gray-400">{error || "Weather data unavailable"}</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-black/40 border-white/10">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">{weather.location}</h3>
            <p className="text-gray-400">Current Weather Conditions</p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center justify-end">
              {getIconComponent(weather.icon)}
              <span className="text-3xl ml-2">{weather.temperature}°C</span>
            </div>
            <p className="text-gray-400">{weather.condition}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Feels Like</p>
            <p className="font-medium">{weather.feelsLike}°C</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Humidity</p>
            <p className="font-medium">{weather.humidity}%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Wind</p>
            <div className="flex items-center justify-center">
              <Wind size={14} className="mr-1" />
              <p className="font-medium">{weather.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
