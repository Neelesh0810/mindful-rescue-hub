
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const VictimRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    location: "",
    contact: "",
    disasterType: "",
    description: "",
    needs: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      // Store victim data in localStorage (simulating a database)
      const victimId = Date.now().toString();
      const victimData = {
        id: victimId,
        ...formData,
        userId: currentUser?.id || "anonymous",
        registrationDate: new Date().toISOString(),
        status: "pending"
      };
      
      // Store in localStorage
      const existingVictims = JSON.parse(localStorage.getItem("victims") || "[]");
      localStorage.setItem("victims", JSON.stringify([...existingVictims, victimData]));
      
      // Update user role if logged in
      if (currentUser) {
        updateUserRole("victim");
      }
      
      toast.success("You have been registered as a victim. Help is on the way.");
      setLoading(false);
      navigate("/victims");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center mb-8">
            <AlertTriangle size={28} className="mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Victim Registration</h1>
          </div>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            Please provide your information so we can better assist you during this difficult time.
          </p>
          
          <Card className="max-w-2xl mx-auto bg-black/40 border-white/10">
            <CardHeader>
              <CardTitle>Register for Assistance</CardTitle>
              <CardDescription>
                The information you provide will help us coordinate appropriate help and resources.
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
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age" 
                      type="number"
                      min="0"
                      max="120"
                      placeholder="30"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      className="bg-black/60 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={(value) => handleSelectChange(value, "gender")}>
                      <SelectTrigger id="gender" className="bg-black/60 border-white/10">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/10">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Current Location</Label>
                  <Input 
                    id="location" 
                    placeholder="Address or general area"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="bg-black/60 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input 
                    id="contact" 
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    className="bg-black/60 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="disasterType">Disaster Type</Label>
                  <Select onValueChange={(value) => handleSelectChange(value, "disasterType")}>
                    <SelectTrigger id="disasterType" className="bg-black/60 border-white/10">
                      <SelectValue placeholder="Select Disaster Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/10">
                      <SelectItem value="flooding">Flooding</SelectItem>
                      <SelectItem value="earthquake">Earthquake</SelectItem>
                      <SelectItem value="fire">Fire</SelectItem>
                      <SelectItem value="hurricane">Hurricane/Cyclone</SelectItem>
                      <SelectItem value="tornado">Tornado</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Situation Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Please describe your current situation"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="bg-black/60 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="needs">Immediate Needs</Label>
                  <Textarea 
                    id="needs" 
                    placeholder="Food, water, medical attention, shelter, etc."
                    value={formData.needs}
                    onChange={handleChange}
                    rows={3}
                    className="bg-black/60 border-white/10"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Register for Assistance"}
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

export default VictimRegistration;
