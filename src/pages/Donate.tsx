
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { sendDonationNotification } from "@/services/emailService";
import DonateHeader from "./donate/DonateHeader";
import DonationTypeSelector from "./donate/DonationTypeSelector";
import MonetaryDonationForm from "./donate/MonetaryDonationForm";
import ItemsDonationForm from "./donate/ItemsDonationForm";
import PickupDonationForm from "./donate/PickupDonationForm";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDonationData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setDonationData(prev => ({ ...prev, [field]: value }));
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
          <DonateHeader />
          
          <div className="max-w-4xl mx-auto">
            <DonationTypeSelector 
              donationType={donationType} 
              setDonationType={setDonationType} 
            />
            
            {donationType === "money" && (
              <MonetaryDonationForm 
                donationData={donationData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
              />
            )}
            
            {donationType === "items" && (
              <ItemsDonationForm
                donationData={donationData}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                handleSubmit={handleSubmit}
                loading={loading}
              />
            )}
            
            {donationType === "pickup" && (
              <PickupDonationForm
                donationData={donationData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
