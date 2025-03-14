
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Gift, DollarSign, ShoppingBag, Truck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const Donate = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [donationComplete, setDonationComplete] = useState(false);
  
  const [moneyForm, setMoneyForm] = useState({
    amount: "",
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: "",
    message: ""
  });
  
  const [itemsForm, setItemsForm] = useState({
    items: "",
    category: "food",
    condition: "new",
    quantity: "",
    pickup: "yes",
    address: "",
    name: currentUser?.name || "",
    phone: ""
  });
  
  const handleMoneyFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setMoneyForm(prev => ({ ...prev, [id]: value }));
  };
  
  const handleItemsFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setItemsForm(prev => ({ ...prev, [id]: value }));
  };
  
  const handleMoneySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app, this would be an API call to a payment gateway
    setTimeout(() => {
      // Send email notification to admin
      const emailData = {
        to: "neeleshkumar10.2004@gmail.com",
        subject: "New Donation Received",
        body: `
          New monetary donation:
          
          Amount: ₹${moneyForm.amount}
          Name: ${moneyForm.name}
          Email: ${moneyForm.email}
          Phone: ${moneyForm.phone}
          Message: ${moneyForm.message}
          
          Date: ${new Date().toLocaleString()}
        `
      };
      
      console.log("Email would be sent with this data:", emailData);
      
      toast.success("Thank you for your donation! Every bit helps in disaster recovery.");
      setDonationComplete(true);
      setLoading(false);
    }, 1500);
  };
  
  const handleItemsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app, this would be an API call to a backend service
    setTimeout(() => {
      // Send email notification to admin
      const emailData = {
        to: "neeleshkumar10.2004@gmail.com",
        subject: "New Item Donation Received",
        body: `
          New item donation:
          
          Items: ${itemsForm.items}
          Category: ${itemsForm.category}
          Condition: ${itemsForm.condition}
          Quantity: ${itemsForm.quantity}
          Pickup Required: ${itemsForm.pickup}
          Address: ${itemsForm.address}
          Name: ${itemsForm.name}
          Phone: ${itemsForm.phone}
          
          Date: ${new Date().toLocaleString()}
        `
      };
      
      console.log("Email would be sent with this data:", emailData);
      
      toast.success("Thank you for your donation! We'll contact you soon to arrange pickup/delivery.");
      setDonationComplete(true);
      setLoading(false);
    }, 1500);
  };
  
  const resetForms = () => {
    setDonationComplete(false);
    setMoneyForm({
      amount: "",
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phone: "",
      message: ""
    });
    setItemsForm({
      items: "",
      category: "food",
      condition: "new",
      quantity: "",
      pickup: "yes",
      address: "",
      name: currentUser?.name || "",
      phone: ""
    });
  };
  
  if (donationComplete) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="container max-w-md px-4 py-12 text-center">
            <div className="bg-green-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
            <p className="text-gray-400 mb-8">
              Your generous donation will help those affected by disasters.
              We appreciate your support in these difficult times.
            </p>
            <Button onClick={resetForms}>Make Another Donation</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center mb-8">
            <Gift size={28} className="mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Donate</h1>
          </div>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            Your donations can make a significant difference in the lives of disaster victims.
          </p>
          
          <Tabs defaultValue="money" className="max-w-2xl mx-auto">
            <TabsList className="grid grid-cols-2 w-full mb-8">
              <TabsTrigger value="money" className="flex items-center gap-2">
                <DollarSign size={16} />
                <span>Donate Money</span>
              </TabsTrigger>
              <TabsTrigger value="items" className="flex items-center gap-2">
                <ShoppingBag size={16} />
                <span>Donate Items</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="money">
              <Card className="bg-black/40 border-white/10">
                <CardHeader>
                  <CardTitle>Financial Donation</CardTitle>
                  <CardDescription>
                    Your financial contributions help us provide immediate relief to disaster victims.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleMoneySubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Donation Amount (INR)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                        <Input 
                          id="amount" 
                          type="number"
                          min="1"
                          placeholder="1000"
                          value={moneyForm.amount}
                          onChange={handleMoneyFormChange}
                          required
                          className="bg-black/60 border-white/10 pl-8"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input 
                          id="name" 
                          placeholder="John Doe"
                          value={moneyForm.name}
                          onChange={handleMoneyFormChange}
                          required
                          className="bg-black/60 border-white/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          placeholder="your@email.com"
                          value={moneyForm.email}
                          onChange={handleMoneyFormChange}
                          required
                          className="bg-black/60 border-white/10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel"
                        placeholder="Your contact number"
                        value={moneyForm.phone}
                        onChange={handleMoneyFormChange}
                        required
                        className="bg-black/60 border-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <textarea 
                        id="message" 
                        placeholder="Your message"
                        value={moneyForm.message}
                        onChange={handleMoneyFormChange}
                        rows={3}
                        className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2"
                      />
                    </div>
                    
                    <div className="p-4 bg-black/60 border border-white/10 rounded-md">
                      <h3 className="font-semibold mb-2">UPI Payment Information</h3>
                      <p className="text-sm text-gray-400 mb-2">Send your donation to:</p>
                      <p className="font-mono bg-black/80 p-2 rounded text-center mb-2">8319120185@ybl</p>
                      <p className="text-xs text-gray-500">Please include your name in the payment description</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Processing..." : "Complete Donation"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="items">
              <Card className="bg-black/40 border-white/10">
                <CardHeader>
                  <CardTitle>Donate Essential Items</CardTitle>
                  <CardDescription>
                    Donate food, clothing, medicines, and other essentials to help those in need.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleItemsSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="items">Items to Donate</Label>
                      <Input 
                        id="items" 
                        placeholder="e.g. Rice, blankets, medicines"
                        value={itemsForm.items}
                        onChange={handleItemsFormChange}
                        required
                        className="bg-black/60 border-white/10"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <select 
                          id="category" 
                          value={itemsForm.category}
                          onChange={handleItemsFormChange}
                          className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2"
                        >
                          <option value="food">Food & Water</option>
                          <option value="clothing">Clothing</option>
                          <option value="medical">Medical Supplies</option>
                          <option value="shelter">Shelter Items</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="condition">Condition</Label>
                        <select 
                          id="condition" 
                          value={itemsForm.condition}
                          onChange={handleItemsFormChange}
                          className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2"
                        >
                          <option value="new">New</option>
                          <option value="good">Good</option>
                          <option value="used">Used but Functional</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Approximate Quantity</Label>
                      <Input 
                        id="quantity" 
                        placeholder="e.g. 5 kg, 10 pieces"
                        value={itemsForm.quantity}
                        onChange={handleItemsFormChange}
                        required
                        className="bg-black/60 border-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Need Pickup?</Label>
                      <select 
                        id="pickup" 
                        value={itemsForm.pickup}
                        onChange={handleItemsFormChange}
                        className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2"
                      >
                        <option value="yes">Yes, need pickup</option>
                        <option value="no">No, I'll deliver</option>
                      </select>
                    </div>
                    
                    {itemsForm.pickup === "yes" && (
                      <div className="space-y-2">
                        <Label htmlFor="address">Pickup Address</Label>
                        <textarea 
                          id="address" 
                          placeholder="Your complete address for pickup"
                          value={itemsForm.address}
                          onChange={handleItemsFormChange}
                          rows={3}
                          required
                          className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2"
                        />
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input 
                          id="name" 
                          placeholder="John Doe"
                          value={itemsForm.name}
                          onChange={handleItemsFormChange}
                          required
                          className="bg-black/60 border-white/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          type="tel"
                          placeholder="Your contact number"
                          value={itemsForm.phone}
                          onChange={handleItemsFormChange}
                          required
                          className="bg-black/60 border-white/10"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-black/60 border border-white/10 rounded-md">
                      <Truck className="w-10 h-10 mr-4 flex-shrink-0" />
                      <p className="text-sm text-gray-400">
                        Our volunteers will coordinate with you to arrange pickup or delivery of your donated items.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Processing..." : "Register Donation"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
