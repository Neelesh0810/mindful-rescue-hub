
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ItemsDonationFormProps {
  donationData: {
    items: string;
    name: string;
    email: string;
    phone: string;
    category: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (value: string, field: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const ItemsDonationForm = ({
  donationData,
  handleChange,
  handleSelectChange,
  handleSubmit,
  loading
}: ItemsDonationFormProps) => {
  return (
    <Card className="bg-black/40 border-white/10 mb-8">
      <CardHeader>
        <CardTitle>Donate Essential Items</CardTitle>
        <CardDescription>
          Donate food, clothing, medical supplies, and other essential items
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Item Category</Label>
            <Select 
              onValueChange={(value) => handleSelectChange(value, "category")}
              value={donationData.category}
            >
              <SelectTrigger id="category" className="bg-black/60 border-white/10">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food & Water</SelectItem>
                <SelectItem value="clothing">Clothing & Bedding</SelectItem>
                <SelectItem value="medical">Medical Supplies</SelectItem>
                <SelectItem value="hygiene">Hygiene Products</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
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
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Donation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ItemsDonationForm;
