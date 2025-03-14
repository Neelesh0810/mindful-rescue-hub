
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Bell, Check } from "lucide-react";
import { toast } from "sonner";

const AlertSignupForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alerts, setAlerts] = useState({
    emergency: true,
    weather: true,
    updates: true
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Send notification to admin
    const adminNotification = {
      to: "neeleshkumar10.2004@gmail.com",
      subject: "New Alert Signup",
      body: `
        New alert signup:
        
        Email: ${email}
        Phone: ${phone}
        Alerts: ${Object.entries(alerts)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(", ")}
        
        Date: ${new Date().toLocaleString()}
      `
    };
    
    console.log("Email would be sent with this data:", adminNotification);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("You've been subscribed to alerts");
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setSuccess(false);
    setEmail("");
    setPhone("");
    setAlerts({
      emergency: true,
      weather: true,
      updates: true
    });
  };

  if (success) {
    return (
      <div className="text-center py-4">
        <div className="mx-auto w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
          <Check className="w-6 h-6 text-green-500" />
        </div>
        <h3 className="text-lg font-medium mb-2">Successfully Subscribed</h3>
        <p className="text-gray-400 text-sm mb-4">
          You'll now receive important alerts based on your preferences.
        </p>
        <Button onClick={handleReset} variant="outline" size="sm" className="border-white/20">
          Subscribe Another Contact
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          className="bg-black/60 border-white/10 mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="For SMS alerts"
          className="bg-black/60 border-white/10 mt-1"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Alert Types</Label>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="emergency" 
            checked={alerts.emergency}
            onCheckedChange={(checked) => 
              setAlerts(prev => ({ ...prev, emergency: !!checked }))
            }
          />
          <Label htmlFor="emergency" className="text-sm">Emergency Alerts</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="weather" 
            checked={alerts.weather}
            onCheckedChange={(checked) => 
              setAlerts(prev => ({ ...prev, weather: !!checked }))
            }
          />
          <Label htmlFor="weather" className="text-sm">Weather Warnings</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="updates" 
            checked={alerts.updates}
            onCheckedChange={(checked) => 
              setAlerts(prev => ({ ...prev, updates: !!checked }))
            }
          />
          <Label htmlFor="updates" className="text-sm">Community Updates</Label>
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <span className="flex items-center">
            <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
            Subscribing...
          </span>
        ) : (
          <span className="flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            Subscribe to Alerts
          </span>
        )}
      </Button>
    </form>
  );
};

export default AlertSignupForm;
