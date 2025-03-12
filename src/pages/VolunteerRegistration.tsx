
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { HandHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const VolunteerRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    availability: "",
    skills: "",
    experience: "",
    emergencyContact: "",
    hasMedicalTraining: false,
    hasTransportation: false
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, updateUserRole } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (checked: boolean, field: string) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      // Store volunteer data in localStorage (simulating a database)
      const volunteerId = Date.now().toString();
      const volunteerData = {
        id: volunteerId,
        ...formData,
        userId: currentUser?.id || "anonymous",
        registrationDate: new Date().toISOString(),
        status: "pending"
      };
      
      // Store in localStorage
      const existingVolunteers = JSON.parse(localStorage.getItem("volunteers") || "[]");
      localStorage.setItem("volunteers", JSON.stringify([...existingVolunteers, volunteerData]));
      
      // Update user role if logged in
      if (currentUser) {
        updateUserRole("volunteer");
      }
      
      toast.success("Thank you for volunteering! We'll contact you soon with further details.");
      setLoading(false);
      navigate("/volunteers");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center mb-8">
            <HandHeart size={28} className="mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Volunteer Registration</h1>
          </div>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            Join our network of dedicated volunteers and help those affected by disasters.
          </p>
          
          <Card className="max-w-2xl mx-auto bg-black/40 border-white/10">
            <CardHeader>
              <CardTitle>Become a Volunteer</CardTitle>
              <CardDescription>
                Your time and skills can make a significant difference in disaster response and recovery efforts.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-black/60 border-white/10"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-black/60 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-black/60 border-white/10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="Your city and state"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="bg-black/60 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select onValueChange={(value) => handleSelectChange(value, "availability")}>
                    <SelectTrigger id="availability" className="bg-black/60 border-white/10">
                      <SelectValue placeholder="Select your availability" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/10">
                      <SelectItem value="weekdays">Weekdays</SelectItem>
                      <SelectItem value="weekends">Weekends</SelectItem>
                      <SelectItem value="evenings">Evenings only</SelectItem>
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="oncall">On-call (emergency only)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills & Expertise</Label>
                  <Input 
                    id="skills" 
                    placeholder="Medical, Construction, Logistics, etc."
                    value={formData.skills}
                    onChange={handleChange}
                    required
                    className="bg-black/60 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Previous Experience</Label>
                  <Textarea 
                    id="experience" 
                    placeholder="Describe any relevant experience in disaster relief or volunteer work"
                    value={formData.experience}
                    onChange={handleChange}
                    rows={3}
                    className="bg-black/60 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact (Name & Phone)</Label>
                  <Input 
                    id="emergencyContact" 
                    placeholder="Contact in case of emergency"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    required
                    className="bg-black/60 border-white/10"
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox 
                    id="hasMedicalTraining" 
                    checked={formData.hasMedicalTraining}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange(checked as boolean, "hasMedicalTraining")
                    }
                  />
                  <Label htmlFor="hasMedicalTraining" className="text-sm">
                    I have medical training or certification
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasTransportation" 
                    checked={formData.hasTransportation}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange(checked as boolean, "hasTransportation")
                    }
                  />
                  <Label htmlFor="hasTransportation" className="text-sm">
                    I have my own transportation
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Register as Volunteer"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VolunteerRegistration;
