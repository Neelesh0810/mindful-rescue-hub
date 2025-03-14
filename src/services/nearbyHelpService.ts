
// Types for data
export type Volunteer = {
  id: string;
  name: string;
  location: string;
  distance: number;
  skills: string[];
  experience: string;
  availability: string;
  contact: string;
};

export type Organization = {
  id: string;
  name: string;
  location: string;
  distance: number;
  serviceType: string;
  capacity: string;
  contact: string;
  availability: string;
};

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

// Mock data for volunteer locations
const volunteerLocations = [
  { id: "v1", lat: 28.6139, lng: 77.2090 },
  { id: "v2", lat: 28.6484, lng: 77.3051 },
  { id: "v3", lat: 28.5198, lng: 77.2182 },
  { id: "v4", lat: 28.6363, lng: 77.1173 },
  { id: "v5", lat: 28.7041, lng: 77.1025 }
];

// Mock data for organization locations
const organizationLocations = [
  { id: "o1", lat: 28.6304, lng: 77.2177 },
  { id: "o2", lat: 28.5621, lng: 77.2841 },
  { id: "o3", lat: 28.6129, lng: 77.2295 },
  { id: "o4", lat: 28.5355, lng: 77.3910 },
  { id: "o5", lat: 28.7158, lng: 77.1563 }
];

// Function to get nearby volunteers
export const getNearbyVolunteers = async (radius: number = 15): Promise<Volunteer[]> => {
  try {
    const position = await getCurrentLocation();
    const { latitude, longitude } = position.coords;
    
    // Get volunteers from localStorage
    const storedVolunteers = JSON.parse(localStorage.getItem("volunteers") || "[]");
    
    // If there are stored volunteers, use those
    if (storedVolunteers.length > 0) {
      // Add mock locations to stored volunteers (in a real app these would be in the database)
      const volunteersWithLocation = storedVolunteers.map((vol: any, index: number) => {
        const locationData = volunteerLocations[index % volunteerLocations.length];
        return {
          ...vol,
          lat: locationData.lat,
          lng: locationData.lng
        };
      });
      
      // Calculate distances and filter by radius
      const nearbyVolunteers = volunteersWithLocation.map((vol: any) => {
        const distance = calculateDistance(latitude, longitude, vol.lat, vol.lng);
        return {
          id: vol.id,
          name: vol.name,
          location: vol.location,
          distance: parseFloat(distance.toFixed(2)),
          skills: vol.skills.split(",").map((s: string) => s.trim()),
          experience: vol.experience,
          availability: vol.availability,
          contact: vol.phone
        };
      })
      .filter((vol: Volunteer) => vol.distance <= radius)
      .sort((a: Volunteer, b: Volunteer) => a.distance - b.distance);
      
      return nearbyVolunteers;
    }
    
    // Fallback to mock data if no stored volunteers
    return [
      {
        id: "v1",
        name: "Rahul Sharma",
        location: "Central Delhi",
        distance: 2.3,
        skills: ["Medical", "First Aid", "Search & Rescue"],
        experience: "5 years in disaster response",
        availability: "Weekdays",
        contact: "9876543210"
      },
      {
        id: "v2",
        name: "Priya Patel",
        location: "East Delhi",
        distance: 4.7,
        skills: ["Medical", "Counseling"],
        experience: "Healthcare professional with trauma experience",
        availability: "Evenings and Weekends",
        contact: "9876543211"
      },
      {
        id: "v3",
        name: "Amit Kumar",
        location: "South Delhi",
        distance: 5.2,
        skills: ["Logistics", "Transportation", "Distribution"],
        experience: "Logistics manager, 8 years experience",
        availability: "Full-time",
        contact: "9876543212"
      }
    ];
  } catch (error) {
    console.error("Error finding nearby volunteers:", error);
    return [];
  }
};

// Function to get nearby organizations
export const getNearbyOrganizations = async (radius: number = 15): Promise<Organization[]> => {
  try {
    const position = await getCurrentLocation();
    const { latitude, longitude } = position.coords;
    
    // Get organizations from localStorage
    const storedOrgs = JSON.parse(localStorage.getItem("organizations") || "[]");
    
    // If there are stored organizations, use those
    if (storedOrgs.length > 0) {
      // Add mock locations to stored organizations (in a real app these would be in the database)
      const orgsWithLocation = storedOrgs.map((org: any, index: number) => {
        const locationData = organizationLocations[index % organizationLocations.length];
        return {
          ...org,
          lat: locationData.lat,
          lng: locationData.lng
        };
      });
      
      // Calculate distances and filter by radius
      const nearbyOrgs = orgsWithLocation.map((org: any) => {
        const distance = calculateDistance(latitude, longitude, org.lat, org.lng);
        return {
          id: org.id,
          name: org.organizationName,
          location: org.location,
          distance: parseFloat(distance.toFixed(2)),
          serviceType: org.serviceType || "Relief Services",
          capacity: org.capacity || "Medium",
          contact: org.contactPhone,
          availability: org.availabilityTime || "24/7"
        };
      })
      .filter((org: Organization) => org.distance <= radius)
      .sort((a: Organization, b: Organization) => a.distance - b.distance);
      
      return nearbyOrgs;
    }
    
    // Fallback to mock data if no stored organizations
    return [
      {
        id: "o1",
        name: "Delhi Relief Trust",
        location: "Central Delhi",
        distance: 3.1,
        serviceType: "Medical & Food Relief",
        capacity: "Large scale operations",
        contact: "011-23456789",
        availability: "24/7"
      },
      {
        id: "o2",
        name: "Aid India Foundation",
        location: "South Delhi",
        distance: 5.8,
        serviceType: "Shelter & Medical",
        capacity: "Medium scale operations",
        contact: "011-34567890",
        availability: "24/7"
      },
      {
        id: "o3",
        name: "Disaster Response Team",
        location: "North Delhi",
        distance: 7.2,
        serviceType: "Search & Rescue, Medical",
        capacity: "Rapid deployment teams",
        contact: "011-45678901",
        availability: "24/7"
      }
    ];
  } catch (error) {
    console.error("Error finding nearby organizations:", error);
    return [];
  }
};
