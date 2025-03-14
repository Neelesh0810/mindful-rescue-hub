
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { sendAlertSignupNotification } from "@/services/emailService";

const AlertSignupForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alertTypes, setAlertTypes] = useState({
    weather: true,
    emergency: true,
    evacuation: true,
    updates: false
  });
  const [loading, setLoading] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  
  const handleAlertTypeChange = (type: keyof typeof alertTypes) => {
    setAlertTypes(prev => ({ ...prev, [type]: !prev[type] }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) {
      toast.error("Please provide either email or phone to receive alerts");
      return;
    }
    
    setLoading(true);
    try {
      // Send notification to admin
      await sendAlertSignupNotification({
        email,
        phone,
        alertTypes: Object.entries(alertTypes)
          .filter(([_, enabled]) => enabled)
          .map(([type]) => type)
      });
      
      toast.success("You've been signed up for alerts!");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Error signing up for alerts:", error);
      toast.error("Failed to sign up for alerts. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSocialClick = () => {
    setShowSocialLinks(true);
    window.open("https://www.youtube.com/results?search_query=india+weather+forecast", "_blank");
  };
  
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="youremail@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black/60 border-white/10"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number (Optional)</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="Your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-black/60 border-white/10"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Alert Types</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="weather" 
                checked={alertTypes.weather}
                onCheckedChange={() => handleAlertTypeChange("weather")}
              />
              <Label htmlFor="weather" className="text-sm cursor-pointer">Weather Alerts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="emergency" 
                checked={alertTypes.emergency}
                onCheckedChange={() => handleAlertTypeChange("emergency")}
              />
              <Label htmlFor="emergency" className="text-sm cursor-pointer">Emergency Alerts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="evacuation" 
                checked={alertTypes.evacuation}
                onCheckedChange={() => handleAlertTypeChange("evacuation")}
              />
              <Label htmlFor="evacuation" className="text-sm cursor-pointer">Evacuation Notices</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="updates" 
                checked={alertTypes.updates}
                onCheckedChange={() => handleAlertTypeChange("updates")}
              />
              <Label htmlFor="updates" className="text-sm cursor-pointer">General Updates</Label>
            </div>
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up for Alerts"}
        </Button>
      </form>
      
      <div className="flex justify-center mt-4">
        <Button variant="outline" className="border-white/20" onClick={handleSocialClick}>
          Follow Weather Updates on YouTube
        </Button>
      </div>
      
      {showSocialLinks && (
        <div className="mt-2 text-center text-sm text-gray-400">
          <p>Find more updates on our social channels</p>
        </div>
      )}
    </div>
  );
};

export default AlertSignupForm;
