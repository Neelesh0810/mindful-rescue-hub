
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Wind, ArrowUp } from "lucide-react";
import { fetchWeatherData, WeatherData } from "@/services/weatherService";

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeather = async () => {
      setLoading(true);
      const data = await fetchWeatherData();
      setWeather(data);
      setLoading(false);
    };

    getWeather();
  }, []);

  if (loading) {
    return (
      <Card className="bg-black/40 border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Current Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-4">
            <div className="animate-spin w-6 h-6 border-2 border-white/10 border-t-white rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) {
    return (
      <Card className="bg-black/40 border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Current Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-sm">Unable to load weather data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Current Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          {weather.icon && (
            <img 
              src={`https:${weather.icon}`} 
              alt={weather.condition} 
              className="w-14 h-14 mr-2"
            />
          )}
          <div>
            <div className="text-2xl font-bold">{weather.temperature}°C</div>
            <div className="text-sm text-gray-400">{weather.condition}</div>
          </div>
        </div>
        
        <div className="text-sm text-gray-300 mb-3">{weather.location}</div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <ArrowUp className="w-4 h-4 mr-1 text-gray-400" />
            <span>Feels like: {weather.feelsLike}°C</span>
          </div>
          <div className="flex items-center">
            <Droplets className="w-4 h-4 mr-1 text-blue-400" />
            <span>Humidity: {weather.humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="w-4 h-4 mr-1 text-gray-400" />
            <span>Wind: {weather.windSpeed} km/h</span>
          </div>
          <div className="flex items-center">
            <Cloud className="w-4 h-4 mr-1 text-gray-400" />
            <span>Pressure: {weather.pressure} mb</span>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-gray-500">
          Updated: {new Date(weather.updated).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
