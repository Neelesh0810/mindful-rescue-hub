
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Victims = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center mb-8">
            <AlertTriangle size={28} className="mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Resources for Victims</h1>
          </div>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            Find information and resources to help you navigate the aftermath of a disaster.
          </p>
          
          <div className="bg-black/40 border border-white/10 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Emergency Information Line</h2>
            <p className="text-xl font-mono text-center mb-2">1-800-123-4567</p>
            <p className="text-gray-400 text-center mb-6">Available 24/7 for immediate assistance</p>
            
            <div className="flex justify-center">
              <Button className="bg-white text-black hover:bg-gray-200 mr-4" asChild>
                <Link to="/register/victim">
                  Register as Victim
                </Link>
              </Button>
              <Button variant="outline" className="border-white/20" asChild>
                <Link to="/emergency">
                  Emergency Help
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Placeholder content - would be replaced with actual resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/40 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Immediate Needs</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Emergency Shelter Locations</li>
                <li>• Food & Water Distribution Points</li>
                <li>• Medical Assistance Centers</li>
                <li>• Emergency Financial Aid</li>
              </ul>
            </div>
            
            <div className="bg-black/40 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Recovery Resources</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Temporary Housing Options</li>
                <li>• Counseling Services</li>
                <li>• Insurance Claim Assistance</li>
                <li>• Legal Aid Resources</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Victims;
