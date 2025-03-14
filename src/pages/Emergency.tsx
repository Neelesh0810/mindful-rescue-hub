
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertTriangle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendEmergencyNotification } from "@/services/emailService"; 
import { toast } from "sonner";
import { useState } from "react";
import WeatherWidget from "@/components/WeatherWidget";

const Emergency = () => {
  const [sendingAlert, setSendingAlert] = useState(false);

  const handleEmergencyCall = async () => {
    setSendingAlert(true);
    try {
      await sendEmergencyNotification();
      toast.success("Emergency notification sent! Help is on the way.");
    } catch (error) {
      console.error("Failed to send emergency notification:", error);
      toast.error("Failed to send emergency notification. Please call directly.");
    } finally {
      setSendingAlert(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center mb-8">
            <AlertTriangle size={28} className="text-red-500 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Emergency Help</h1>
          </div>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            If you're in immediate danger or need urgent assistance, please contact emergency services immediately.
          </p>
          
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-8 mb-12 max-w-lg mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Emergency Hotline</h2>
            <p className="text-3xl font-mono text-center mb-6">911</p>
            <p className="text-gray-400 text-center mb-6">For life-threatening emergencies, always call 911 first</p>
            
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-red-500 hover:bg-red-600"
                onClick={handleEmergencyCall}
                disabled={sendingAlert}
              >
                <Phone className="mr-2" />
                {sendingAlert ? "Sending Alert..." : "Send Emergency Alert"}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-black/40 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Medical Emergencies</h3>
              <p className="text-gray-300 mb-4">Contact the nearest hospital or medical center for immediate medical attention.</p>
              <p className="text-xl font-mono">1-800-234-5678</p>
            </div>
            
            <div className="bg-black/40 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Disaster Response</h3>
              <p className="text-gray-300 mb-4">Specialized assistance for disaster-related emergencies.</p>
              <p className="text-xl font-mono">1-800-345-6789</p>
            </div>
          </div>
          
          <div className="bg-black/40 border border-white/10 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Current Weather Conditions</h3>
            <WeatherWidget />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Emergency;
