
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { sendRegistrationNotification } from "@/services/emailService";

interface FormData {
  name: string;
  department: string;
  level: string;
  jurisdiction: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  services: string;
  resources: string;
}

const GovernmentRegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    department: "",
    level: "",
    jurisdiction: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    services: "",
    resources: ""
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Store government data in localStorage (simulating a database)
      const governmentId = Date.now().toString();
      const governmentData = {
        id: governmentId,
        ...formData,
        userId: currentUser?.id || "anonymous",
        registrationDate: new Date().toISOString(),
        status: "pending"
      };
      
      // Store in localStorage
      const existingGovernments = JSON.parse(localStorage.getItem("governments") || "[]");
      localStorage.setItem("governments", JSON.stringify([...existingGovernments, governmentData]));
      
      // Update user role if logged in
      if (currentUser) {
        updateUserRole("government");
      }

      // Send email notification
      await sendRegistrationNotification({
        type: "government",
        name: formData.name,
        contactPerson: formData.contactPerson,
        email: formData.email
      });
      
      toast.success("Your government department has been registered. We'll review and contact you soon.");
      navigate("/government");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Government registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle>Register Your Department</CardTitle>
        <CardDescription>
          Provide details about your government department to facilitate effective coordination and resource allocation.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Department Name</Label>
            <Input 
              id="name" 
              placeholder="Department Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-black/60 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department">Department Type</Label>
            <Select onValueChange={(value) => handleSelectChange(value, "department")}>
              <SelectTrigger id="department" className="bg-black/60 border-white/10">
                <SelectValue placeholder="Select department type" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/10">
                <SelectItem value="emergency">Emergency Management</SelectItem>
                <SelectItem value="health">Health Department</SelectItem>
                <SelectItem value="police">Police Department</SelectItem>
                <SelectItem value="fire">Fire Department</SelectItem>
                <SelectItem value="infrastructure">Infrastructure & Public Works</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="level">Government Level</Label>
            <Select onValueChange={(value) => handleSelectChange(value, "level")}>
              <SelectTrigger id="level" className="bg-black/60 border-white/10">
                <SelectValue placeholder="Select government level" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/10">
                <SelectItem value="local">Local/Municipal</SelectItem>
                <SelectItem value="district">District</SelectItem>
                <SelectItem value="state">State/Provincial</SelectItem>
                <SelectItem value="federal">Federal/National</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jurisdiction">Jurisdiction</Label>
            <Input 
              id="jurisdiction" 
              placeholder="Area of jurisdiction"
              value={formData.jurisdiction}
              onChange={handleChange}
              required
              className="bg-black/60 border-white/10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Primary Contact Person</Label>
              <Input 
                id="contactPerson" 
                placeholder="Full Name"
                value={formData.contactPerson}
                onChange={handleChange}
                required
                className="bg-black/60 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input 
                id="email" 
                type="email"
                placeholder="contact@department.gov"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-black/60 border-white/10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone</Label>
              <Input 
                id="phone" 
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-black/60 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Office Location</Label>
              <Input 
                id="address" 
                placeholder="City, State/Province"
                value={formData.address}
                onChange={handleChange}
                required
                className="bg-black/60 border-white/10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="services">Services Provided</Label>
            <Textarea 
              id="services" 
              placeholder="Describe the services your department can provide during disasters"
              value={formData.services}
              onChange={handleChange}
              rows={3}
              required
              className="bg-black/60 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="resources">Available Resources</Label>
            <Textarea 
              id="resources" 
              placeholder="Equipment, personnel, supplies, expertise, etc."
              value={formData.resources}
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
  );
};

export default GovernmentRegistrationForm;
