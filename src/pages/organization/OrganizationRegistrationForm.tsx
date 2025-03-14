
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const OrganizationRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    website: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    services: "",
    resources: "",
    coverage: ""
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
      // Store organization data in localStorage (simulating a database)
      const organizationId = Date.now().toString();
      const organizationData = {
        id: organizationId,
        ...formData,
        userId: currentUser?.id || "anonymous",
        registrationDate: new Date().toISOString(),
        status: "pending"
      };
      
      // Store in localStorage
      const existingOrganizations = JSON.parse(localStorage.getItem("organizations") || "[]");
      localStorage.setItem("organizations", JSON.stringify([...existingOrganizations, organizationData]));
      
      // Update user role if logged in
      if (currentUser) {
        updateUserRole("organization");
      }
      
      toast.success("Your organization has been registered. We'll review and contact you soon.");
      setLoading(false);
      navigate("/organizations");
    }, 1500);
  };

  return (
    <Card className="max-w-2xl mx-auto bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle>Register Your Organization</CardTitle>
        <CardDescription>
          Provide details about your organization to facilitate effective coordination and resource allocation.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input 
              id="name" 
              placeholder="Organization Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-black/60 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Organization Type</Label>
            <Select onValueChange={(value) => handleSelectChange(value, "type")}>
              <SelectTrigger id="type" className="bg-black/60 border-white/10">
                <SelectValue placeholder="Select organization type" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/10">
                <SelectItem value="government">Government Agency</SelectItem>
                <SelectItem value="ngo">NGO/Non-profit</SelectItem>
                <SelectItem value="international">International Organization</SelectItem>
                <SelectItem value="community">Community Group</SelectItem>
                <SelectItem value="private">Private Sector Entity</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input 
              id="website" 
              type="url"
              placeholder="https://your-organization.com"
              value={formData.website}
              onChange={handleChange}
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
                placeholder="contact@organization.com"
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
              <Label htmlFor="address">Headquarters Location</Label>
              <Input 
                id="address" 
                placeholder="City, State/Province, Country"
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
              placeholder="Describe the services your organization can provide during disasters"
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
          
          <div className="space-y-2">
            <Label htmlFor="coverage">Geographical Coverage</Label>
            <Input 
              id="coverage" 
              placeholder="Areas your organization can provide services to"
              value={formData.coverage}
              onChange={handleChange}
              className="bg-black/60 border-white/10"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Register Organization"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default OrganizationRegistrationForm;
