
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Coins, Package, Truck, Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { sendDonationNotification } from "@/services/emailService";

const Donate = () => {
  const [donationType, setDonationType] = useState("money");
  const [donationData, setDonationData] = useState({
    amount: "",
    name: "",
    email: "",
    phone: "",
    items: "",
    category: "",
    pickupAddress: "",
    pickupDate: "",
    note: ""
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDonationData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setDonationData(prev => ({ ...prev, [field]: value }));
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText("8319120185@ybl");
    setCopied(true);
    toast.success("UPI ID copied to clipboard");
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Send email notification
      await sendDonationNotification({
        type: donationType,
        ...donationData
      });
      
      toast.success(donationType === "money" 
        ? "Thank you for your monetary donation!" 
        : "Thank you for your donation! We'll arrange for pickup/delivery."
      );
      
      // Reset form
      setDonationData({
        amount: "",
        name: "",
        email: "",
        phone: "",
        items: "",
        category: "",
        pickupAddress: "",
        pickupDate: "",
        note: ""
      });
    } catch (error) {
      console.error("Donation submission error:", error);
      toast.error("Failed to process your donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center mb-8">
            <Heart size={28} className="text-red-500 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Donate</h1>
          </div>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            Your contribution can make a significant difference in the lives of disaster victims.
            Every donation, big or small, helps us provide essential services and support.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <RadioGroup 
              defaultValue="money" 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
              onValueChange={setDonationType}
            >
              <div className={`flex items-center space-x-2 rounded-md border p-4 ${donationType === 'money' ? 'border-primary' : 'border-white/10'}`}>
                <RadioGroupItem value="money" id="money" />
                <Label htmlFor="money" className="flex items-center cursor-pointer">
                  <Coins className="mr-2" size={18} />
                  Money
                </Label>
              </div>
              <div className={`flex items-center space-x-2 rounded-md border p-4 ${donationType === 'items' ? 'border-primary' : 'border-white/10'}`}>
                <RadioGroupItem value="items" id="items" />
                <Label htmlFor="items" className="flex items-center cursor-pointer">
                  <Package className="mr-2" size={18} />
                  Essential Items
                </Label>
              </div>
              <div className={`flex items-center space-x-2 rounded-md border p-4 ${donationType === 'pickup' ? 'border-primary' : 'border-white/10'}`}>
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup" className="flex items-center cursor-pointer">
                  <Truck className="mr-2" size={18} />
                  Schedule Pickup
                </Label>
              </div>
            </RadioGroup>
            
            {donationType === "money" && (
              <Card className="bg-black/40 border-white/10 mb-8">
                <CardHeader>
                  <CardTitle>Monetary Donation</CardTitle>
                  <CardDescription>
                    100% of your donation goes directly to disaster relief efforts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-black/60 border border-white/10 p-4 rounded-md">
                    <p className="font-medium mb-2">UPI Payment</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-xl">8319120185@ybl</p>
                      <Button variant="outline" onClick={copyUpiId} className="ml-4">
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        <span className="ml-2">{copied ? "Copied" : "Copy"}</span>
                      </Button>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      Scan with any UPI app like Google Pay, PhonePe, Paytm, etc.
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Donation Amount (₹)</Label>
                      <Input 
                        id="amount" 
                        name="amount"
                        type="number" 
                        placeholder="Enter amount"
                        value={donationData.amount}
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
                      <Label htmlFor="note">Note (Optional)</Label>
                      <Textarea 
                        id="note"
                        name="note" 
                        placeholder="Any message you'd like to include"
                        value={donationData.note}
                        onChange={handleChange}
                        className="bg-black/60 border-white/10"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Processing..." : "Complete Donation"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {donationType === "items" && (
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
                      <Select onValueChange={(value) => handleSelectChange(value, "category")}>
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
            )}
            
            {donationType === "pickup" && (
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
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
