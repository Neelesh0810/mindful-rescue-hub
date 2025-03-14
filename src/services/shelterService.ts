
// Mock data for nearby shelters
// In a real app, this would come from a database or API
const shelters = [
  {
    id: "s1",
    name: "Central Community Center",
    address: "123 Main St, Central City",
    capacity: 200,
    current: 120,
    facilities: ["Food", "Water", "Medical", "Beds"],
    contact: "555-123-4567",
    lat: 28.6139,
    lng: 77.2090
  },
  {
    id: "s2",
    name: "East Delhi Relief Camp",
    address: "45 Park Road, East Delhi",
    capacity: 150,
    current: 85,
    facilities: ["Food", "Water", "Beds"],
    contact: "555-234-5678",
    lat: 28.6484,
    lng: 77.3051
  },
  {
    id: "s3",
    name: "South Delhi Emergency Shelter",
    address: "78 Green Avenue, South Delhi",
    capacity: 300,
    current: 210,
    facilities: ["Food", "Water", "Medical", "Beds", "Children Area"],
    contact: "555-345-6789",
    lat: 28.5198,
    lng: 77.2182
  },
  {
    id: "s4",
    name: "West Delhi Disaster Relief Center",
    address: "156 Ring Road, West Delhi",
    capacity: 180,
    current: 95,
    facilities: ["Food", "Water", "Medical"],
    contact: "555-456-7890",
    lat: 28.6363,
    lng: 77.1173
  },
  {
    id: "s5",
    name: "North Delhi Safe Haven",
    address: "23 University Road, North Delhi",
    capacity: 250,
    current: 175,
    facilities: ["Food", "Water", "Medical", "Beds", "Showers"],
    contact: "555-567-8901",
    lat: 28.7041,
    lng: 77.1025
  }
];

// Get user's current location
export const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
};

// Calculate distance between two coordinates in kilometers
const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return d;
};

// Find nearby shelters based on current location
export const findNearbyShelters = async (radius: number = 10) => {
  try {
    const position = await getCurrentLocation();
    const { latitude, longitude } = position.coords;
    
    // Filter shelters within specified radius
    const nearbyShelters = shelters.map(shelter => {
      const distance = calculateDistance(
        latitude, 
        longitude, 
        shelter.lat, 
        shelter.lng
      );
      
      return {
        ...shelter,
        distance: parseFloat(distance.toFixed(2))
      };
    })
    .filter(shelter => shelter.distance <= radius)
    .sort((a, b) => a.distance - b.distance);
    
    return nearbyShelters;
  } catch (error) {
    console.error("Error finding nearby shelters:", error);
    throw error;
  }
};
