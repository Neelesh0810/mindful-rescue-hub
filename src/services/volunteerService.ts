
// Mock service to find nearby volunteers and organizations
// In a real app, this would use geolocation and database queries

export interface Volunteer {
  id: string;
  name: string;
  skills: string[];
  location: string;
  distance: number; // km
  contactInfo: string;
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  location: string;
  distance: number; // km
  contactInfo: string;
  services: string[];
}

// Mock data for nearby volunteers
const mockVolunteers: Volunteer[] = [
  {
    id: "v1",
    name: "Rahul Sharma",
    skills: ["First Aid", "Rescue Operations", "Communication"],
    location: "Delhi, India",
    distance: 1.2,
    contactInfo: "rahul.sharma@example.com | +91 98765 43210"
  },
  {
    id: "v2",
    name: "Priya Patel",
    skills: ["Medical Assistance", "Counseling"],
    location: "Delhi, India",
    distance: 2.5,
    contactInfo: "priya.patel@example.com | +91 87654 32109"
  },
  {
    id: "v3",
    name: "Arjun Singh",
    skills: ["Search and Rescue", "Disaster Management"],
    location: "Noida, India",
    distance: 4.8,
    contactInfo: "arjun.singh@example.com | +91 76543 21098"
  },
  {
    id: "v4",
    name: "Anjali Gupta",
    skills: ["Medical Doctor", "Emergency Response"],
    location: "Gurgaon, India",
    distance: 7.3,
    contactInfo: "anjali.gupta@example.com | +91 65432 10987"
  },
  {
    id: "v5",
    name: "Vikram Malhotra",
    skills: ["Logistics", "Transportation", "Supply Distribution"],
    location: "Faridabad, India",
    distance: 9.1,
    contactInfo: "vikram.malhotra@example.com | +91 54321 09876"
  }
];

// Mock data for nearby organizations
const mockOrganizations: Organization[] = [
  {
    id: "o1",
    name: "Rapid Relief India",
    type: "NGO",
    location: "Delhi, India",
    distance: 3.4,
    contactInfo: "info@rapidrelief.org | +91 12345 67890",
    services: ["Emergency Response", "Medical Aid", "Food Distribution"]
  },
  {
    id: "o2",
    name: "Aarogya Foundation",
    type: "Medical NGO",
    location: "Delhi, India",
    distance: 5.7,
    contactInfo: "contact@aarogyafoundation.org | +91 23456 78901",
    services: ["Medical Camps", "Health Services", "Medicine Distribution"]
  },
  {
    id: "o3",
    name: "Sahayata Trust",
    type: "Trust",
    location: "Noida, India",
    distance: 6.2,
    contactInfo: "help@sahayatatrust.org | +91 34567 89012",
    services: ["Shelter", "Food", "Clothing", "Counseling"]
  },
  {
    id: "o4",
    name: "Disaster Management Corp",
    type: "Private Company",
    location: "Gurgaon, India",
    distance: 8.9,
    contactInfo: "response@dmcorp.com | +91 45678 90123",
    services: ["Rescue Operations", "Logistics", "Transportation"]
  },
  {
    id: "o5",
    name: "Care & Hope International",
    type: "International NGO",
    location: "Delhi, India",
    distance: 10.3,
    contactInfo: "india@careandhope.org | +91 56789 01234",
    services: ["Relief Materials", "Financial Aid", "Rehabilitation"]
  }
];

// Function to get nearby volunteers based on latitude and longitude
export const getNearbyVolunteers = async (lat?: number, lng?: number, limit: number = 5): Promise<Volunteer[]> => {
  // In a real app, we would use the coordinates to query a database
  // For now, we'll just return the mock data
  console.log(`Getting nearby volunteers for coordinates: ${lat}, ${lng}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return the mock data (limited to the specified number)
  return mockVolunteers.slice(0, limit);
};

// Function to get nearby organizations based on latitude and longitude
export const getNearbyOrganizations = async (lat?: number, lng?: number, limit: number = 5): Promise<Organization[]> => {
  // In a real app, we would use the coordinates to query a database
  // For now, we'll just return the mock data
  console.log(`Getting nearby organizations for coordinates: ${lat}, ${lng}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return the mock data (limited to the specified number)
  return mockOrganizations.slice(0, limit);
};

// Function to get a combination of volunteers and organizations based on type
export const getNearbyHelp = async (
  type: "all" | "volunteers" | "organizations", 
  lat?: number, 
  lng?: number, 
  limit: number = 5
): Promise<{volunteers: Volunteer[], organizations: Organization[]}> => {
  let volunteers: Volunteer[] = [];
  let organizations: Organization[] = [];
  
  if (type === "all" || type === "volunteers") {
    volunteers = await getNearbyVolunteers(lat, lng, limit);
  }
  
  if (type === "all" || type === "organizations") {
    organizations = await getNearbyOrganizations(lat, lng, limit);
  }
  
  return { volunteers, organizations };
};
