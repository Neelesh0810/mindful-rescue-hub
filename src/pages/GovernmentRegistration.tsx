
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Flag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const GovernmentRegistration = () => {
  const [formData, setFormData] = useState({
    departmentName: "",
    contactPerson: "",
    email: "",
    phone: "",
    location: "",
    jurisdiction: "",
    resourcesAvailable: "",
    emergencyCapacity: ""
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
    
    // Send email notification to admin
    sendEmailNotification(formData);
    
    setTimeout(() => {
      // Store government data in localStorage (simulating a database)
      const govId = Date.now().toString();
      const govData = {
        id: govId,
        ...formData,
        userId: currentUser?.id || "anonymous",
        registrationDate: new Date().toISOString(),
        status: "pending"
      };
      
      // Store in localStorage
      const existingGovs = JSON.parse(localStorage.getItem("governments") || "[]");
      localStorage.setItem("governments", JSON.stringify([...existingGovs, govData]));
      
      // Update user role if logged in
      if (currentUser) {
        updateUserRole("admin");
      }
      
      toast.success("Government department registered successfully! You'll be contacted shortly.");
      setLoading(false);
      navigate("/government");
    }, 1500);
  };

  // Function to send email notification
  const sendEmailNotification = (data: typeof formData) => {
    // In a real app, this would be an API call to a backend service
    console.log("Sending email notification to admin:", data);
    
    // For demonstration, we're just logging the data
    // In a real implementation, you would use a service like SendGrid, AWS SES, or similar
    const emailData = {
      to: "neeleshkumar10.2004@gmail.com",
      subject: "New Government Department Registration",
      body: `
        New government department registration:
        
        Department: ${data.departmentName}
        Contact Person: ${data.contactPerson}
        Email: ${data.email}
        Phone: ${data.phone}
        Location: ${data.location}
        Jurisdiction: ${data.jurisdiction}
        Resources Available: ${data.resourcesAvailable}
        Emergency Capacity: ${data.emergencyCapacity}
        
        Date: ${new Date().toLocaleString()}
      `
    };
    
    console.log("Email would be sent with this data:", emailData);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center mb-8">
            <Flag size={28} className="mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Government Department Registration</h1>
          </div>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            Register your government department or agency to coordinate disaster response efforts more effectively.
          </p>
          
          <Card className="max-w-2xl mx-auto bg-black/40 border-white/10">
            <CardHeader>
              <CardTitle>Register Government Department</CardTitle>
              <CardDescription>
                Provide details about your department to improve coordination during emergencies.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="departmentName">Department/Agency Name</Label>
                  <Input 
                    id="departmentName" 
                    placeholder="e.g. National Disaster Response Force"
                    value={formData.departmentName}
                    onChange={handleChange}
                    required
                    className="bg-black/60 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Primary Contact Person</Label>
                  <Input 
                    id="contactPerson" 
                    placeholder="Full name of authorized representative"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    className="bg-black/60 border-white/10"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Official Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="official@gov.in"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-black/60 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Emergency Contact Number</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      placeholder="Official emergency number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-black/60 border-white/10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Headquarters Location</Label>
                  <Input 
                    id="location" 
                    placeholder="City/State"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="bg-black/60 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Area of Jurisdiction</Label>
                  <Select onValueChange={(value) => handleSelectChange(value, "jurisdiction")}>
                    <SelectTrigger id="jurisdiction" className="bg-black/60 border-white/10">
                      <SelectValue placeholder="Select jurisdiction level" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/10">
                      <SelectItem value="national">National</SelectItem>
                      <SelectItem value="state">State</SelectItem>
                      <SelectItem value="district">District</SelectItem>
                      <SelectItem value="local">Local/Municipal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="resourcesAvailable">Available Resources</Label>
                  <Textarea 
                    id="resourcesAvailable" 
                    placeholder="Describe resources your department can provide (personnel, equipment, facilities, etc.)"
                    value={formData.resourcesAvailable}
                    onChange={handleChange}
                    rows={3}
                    className="bg-black/60 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emergencyCapacity">Emergency Response Capacity</Label>
                  <Textarea 
                    id="emergencyCapacity" 
                    placeholder="Describe your department's capabilities during emergencies"
                    value={formData.emergencyCapacity}
                    onChange={handleChange}
                    rows={3}
                    className="bg-black/60 border-white/10"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Register Department"}
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

export default GovernmentRegistration;
