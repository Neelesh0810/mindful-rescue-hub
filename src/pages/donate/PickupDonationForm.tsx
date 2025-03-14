
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PickupDonationFormProps {
  donationData: {
    items: string;
    name: string;
    email: string;
    phone: string;
    pickupAddress: string;
    pickupDate: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const PickupDonationForm = ({
  donationData,
  handleChange,
  handleSubmit,
  loading
}: PickupDonationFormProps) => {
  return (
    <Card className="bg-black/40 border-white/10 mb-8">
      <CardHeader>
        <CardTitle>Schedule a Pickup</CardTitle>
        <CardDescription>
          Our volunteers can pick up your donations from your location
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="items">Items Description</Label>
            <Textarea 
              id="items"
              name="items"
              placeholder="Please describe the items you would like to donate"
              value={donationData.items}
              onChange={handleChange}
              required
              className="bg-black/60 border-white/10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name"
                placeholder="Your name"
                value={donationData.name}
                onChange={handleChange}
                required
                className="bg-black/60 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone"
                placeholder="Your phone number"
                value={donationData.phone}
                onChange={handleChange}
                required
                className="bg-black/60 border-white/10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email"
              placeholder="Your email"
              value={donationData.email}
              onChange={handleChange}
              required
              className="bg-black/60 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pickupAddress">Pickup Address</Label>
            <Textarea 
              id="pickupAddress"
              name="pickupAddress"
              placeholder="Full address for pickup"
              value={donationData.pickupAddress}
              onChange={handleChange}
              required
              className="bg-black/60 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pickupDate">Preferred Pickup Date</Label>
            <Input 
              id="pickupDate" 
              name="pickupDate"
              type="date"
              value={donationData.pickupDate}
              onChange={handleChange}
              required
              className="bg-black/60 border-white/10"
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Scheduling..." : "Schedule Pickup"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PickupDonationForm;
