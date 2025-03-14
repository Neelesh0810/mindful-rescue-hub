
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Flag, FileText, Users, Building } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import WeatherWidget from "@/components/WeatherWidget";

const Government = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center mb-8">
            <Flag size={28} className="mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">For Government</h1>
          </div>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8">
            Resources, coordination tools, and registration for government agencies involved in disaster response.
          </p>
          
          <div className="text-center mb-12">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200" asChild>
              <Link to={currentUser ? "/register/government" : "/auth"}>
                <Building className="mr-2" size={18} />
                {currentUser ? "Register Government Department" : "Login to Register"}
              </Link>
            </Button>
          </div>
          
          <div className="max-w-4xl mx-auto mb-12">
            <WeatherWidget />
          </div>
          
          <Tabs defaultValue="resources" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <FileText size={16} />
                <span>Resources</span>
              </TabsTrigger>
              <TabsTrigger value="coordination" className="flex items-center gap-2">
                <Users size={16} />
                <span>Coordination</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources" className="mt-0">
              <div className="bg-black/40 border border-white/10 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Official Resources</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Emergency Declaration Protocols</li>
                  <li>• Funding Allocation Guidelines</li>
                  <li>• Interagency Coordination Framework</li>
                  <li>• Public Information Officer Resources</li>
                </ul>
              </div>
              
              <div className="bg-black/40 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Long-term Recovery</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Community Rebuilding Programs</li>
                  <li>• Infrastructure Restoration Planning</li>
                  <li>• Economic Recovery Initiatives</li>
                  <li>• Resilience Building Resources</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="coordination" className="mt-0">
              <div className="bg-black/40 border border-white/10 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Coordination Centers</h3>
                <p className="text-gray-300 mb-4">
                  Access to emergency operations centers and coordination facilities across different jurisdictions.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• National Crisis Management Center</li>
                  <li>• State Emergency Operations Centers</li>
                  <li>• Local Command Posts</li>
                  <li>• Mobile Coordination Units</li>
                </ul>
              </div>
              
              <div className="bg-black/40 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Interagency Communication</h3>
                <p className="text-gray-300 mb-4">
                  Tools and resources for effective communication between government agencies during disasters.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Secure Communication Channels</li>
                  <li>• Information Sharing Protocols</li>
                  <li>• Daily Situation Report Templates</li>
                  <li>• Joint Press Release Guidelines</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Government;
