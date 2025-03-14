
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Flag, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Government = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center mb-8">
            <Flag size={28} className="mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Government Resources</h1>
          </div>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            Resources and coordination tools for government agencies involved in disaster management.
          </p>
          
          <div className="bg-black/40 border border-white/10 rounded-lg p-8 mb-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Register Your Department</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Government agencies can register to coordinate disaster response efforts more effectively.
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-200" asChild>
              <Link to={currentUser ? "/register/government" : "/auth"}>
                {currentUser ? "Register Department" : "Login to Register"}
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/40 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Disaster Management Resources</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Emergency Response Protocols</li>
                <li>• Disaster Management Plans</li>
                <li>• Coordination Guidelines</li>
                <li>• Resource Allocation Systems</li>
              </ul>
            </div>
            
            <div className="bg-black/40 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Emergency Coordination</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Interagency Communication Channels</li>
                <li>• Real-time Situation Reports</li>
                <li>• Resource Request Management</li>
                <li>• Public Information Distribution</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 bg-red-900/20 border border-red-500/30 rounded-lg p-6">
            <div className="flex items-start mb-4">
              <ShieldAlert className="mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold">Emergency Coordinator Access</h3>
                <p className="text-gray-400">
                  Government emergency coordinators can access special features to manage disaster response operations.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" className="border-white/20">Request Access</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Government;
