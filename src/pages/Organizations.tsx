
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Flag, Building } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Organizations = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center mb-8">
            <Users size={28} className="mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">For Organizations</h1>
          </div>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8">
            Resources and coordination tools for NGOs and government agencies involved in disaster response.
          </p>
          
          <div className="text-center mb-12">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200" asChild>
              <Link to={currentUser ? "/register/organization" : "/auth"}>
                <Building className="mr-2" size={18} />
                {currentUser ? "Register Organization" : "Login to Register"}
              </Link>
            </Button>
          </div>
          
          <Tabs defaultValue="ngos" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="ngos" className="flex items-center gap-2">
                <Users size={16} />
                <span>Non-Governmental Organizations</span>
              </TabsTrigger>
              <TabsTrigger value="government" className="flex items-center gap-2">
                <Flag size={16} />
                <span>Government Agencies</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ngos" className="mt-0">
              <div className="bg-black/40 border border-white/10 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Coordination Resources</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Multi-Agency Coordination System</li>
                  <li>• Resource Request Protocol</li>
                  <li>• Situation Reporting Templates</li>
                  <li>• NGO Coordination Meetings Schedule</li>
                </ul>
              </div>
              
              <div className="bg-black/40 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Relief Operation Support</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Distribution Guidelines</li>
                  <li>• International Supply Chain Resources</li>
                  <li>• Best Practices for Field Operations</li>
                  <li>• Volunteer Management Tools</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="government" className="mt-0">
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
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Organizations;
