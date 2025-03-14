
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface MonetaryDonationFormProps {
  donationData: {
    amount: string;
    name: string;
    email: string;
    note: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const MonetaryDonationForm = ({ 
  donationData, 
  handleChange, 
  handleSubmit, 
  loading 
}: MonetaryDonationFormProps) => {
  const [copied, setCopied] = useState(false);

  const copyUpiId = () => {
    navigator.clipboard.writeText("8319120185@ybl");
    setCopied(true);
    toast.success("UPI ID copied to clipboard");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
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
  );
};

export default MonetaryDonationForm;
