
import { toast } from "sonner";

// Types for weather data
export type WeatherData = {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  feelsLike: number;
  updated: string;
};

// Function to get current location
export const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
};

// API key for Weather API
const API_KEY = "9b79b9acd6744d0eb40144304232506"; // This is a demo key, would be replaced with a real one

// Function to fetch weather data
export const fetchWeatherData = async (): Promise<WeatherData | null> => {
  try {
    // Get current location
    const position = await getCurrentLocation();
    const { latitude, longitude } = position.coords;
    
    // Make API call to Weather API
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Format the data
    const weatherData: WeatherData = {
      location: `${data.location.name}, ${data.location.region}`,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      pressure: data.current.pressure_mb,
      feelsLike: data.current.feelslike_c,
      updated: data.current.last_updated
    };
    
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    toast.error("Failed to fetch weather data. Using fallback data.");
    
    // Return fallback data
    return {
      location: "New Delhi, India",
      temperature: 32,
      condition: "Partly cloudy",
      icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
      humidity: 65,
      windSpeed: 12,
      pressure: 1012,
      feelsLike: 34,
      updated: new Date().toISOString()
    };
  }
};
