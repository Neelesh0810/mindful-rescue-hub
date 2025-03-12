
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Volunteers = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center mb-8">
            <HandHeart size={28} className="mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Volunteer Resources</h1>
          </div>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            Join our network of dedicated volunteers and help those affected by disasters.
          </p>
          
          <div className="bg-black/40 border border-white/10 rounded-lg p-8 mb-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Become a Volunteer</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Your skills and time can make a significant difference in disaster response and recovery efforts.
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              Sign Up Now
            </Button>
          </div>
          
          {/* Placeholder content - would be replaced with actual resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/40 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Volunteer Opportunities</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Emergency Response Teams</li>
                <li>• Distribution Center Support</li>
                <li>• Shelter Operations</li>
                <li>• Medical Support Volunteers</li>
              </ul>
            </div>
            
            <div className="bg-black/40 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Training & Resources</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Basic Disaster Response Training</li>
                <li>• First Aid & CPR Certification</li>
                <li>• Psychological First Aid</li>
                <li>• Safety Protocols & Guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Volunteers;
