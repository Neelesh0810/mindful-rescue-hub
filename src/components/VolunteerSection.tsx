
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHeart, TrendingUp, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const VolunteerSection = () => {
  const { currentUser } = useAuth();
  
  const volunteerOpportunities = [
    {
      title: "Medical Support",
      description: "Healthcare professionals needed to provide medical assistance",
      location: "Various Shelters",
      urgency: "High",
      timeCommitment: "4+ hours"
    },
    {
      title: "Distribution Center",
      description: "Help sort and distribute essential supplies to affected areas",
      location: "Central Warehouse",
      urgency: "Medium",
      timeCommitment: "2-4 hours"
    },
    {
      title: "Shelter Assistance",
      description: "Support shelter operations and assist displaced individuals",
      location: "Community Centers",
      urgency: "High",
      timeCommitment: "4+ hours"
    }
  ];

  const handleVolunteerClick = (opportunity: string) => {
    if (!currentUser) {
      toast.error("Please login to sign up for volunteer opportunities");
      return;
    }
    
    toast.success(`You've signed up for ${opportunity}. We'll contact you soon.`);
  };

  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <div className="flex items-center mb-4">
              <HandHeart size={28} className="mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold">Volunteer & Donate</h2>
            </div>
            <p className="text-gray-400 max-w-xl">
              Your time, skills, and contributions can make a significant difference in the recovery process. Join our network of dedicated volunteers or support our efforts through donations.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200" asChild>
              <Link to={currentUser ? "/register/volunteer" : "/auth"}>
                Register as Volunteer
              </Link>
            </Button>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-6">Urgent Volunteer Needs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {volunteerOpportunities.map((opportunity, index) => (
            <Card key={index} className="bg-black/40 border-white/10 hover:bg-black/60 transition-colors">
              <CardHeader>
                <CardTitle>{opportunity.title}</CardTitle>
                <CardDescription>{opportunity.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-gray-400" />
                  <span className="text-sm">{opportunity.location}</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp size={16} className="mr-2 text-gray-400" />
                  <span className="text-sm">Urgency: {opportunity.urgency}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2 text-gray-400" />
                  <span className="text-sm">Time: {opportunity.timeCommitment}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 hover:bg-white/10"
                  onClick={() => handleVolunteerClick(opportunity.title)}
                  asChild={!currentUser}
                >
                  {!currentUser ? (
                    <Link to="/auth">Login to Sign Up</Link>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="bg-black/40 border border-white/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Financial Contributions</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            100% of your donation goes directly to disaster relief efforts, providing essential supplies, medical care, and support to those affected.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-200">
            Donate Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
