
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, UserPlus, Building, AlertTriangle, User } from "lucide-react";

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalVictims: 0,
    totalVolunteers: 0,
    totalOrganizations: 0,
  });
  
  const [victimsList, setVictimsList] = useState<any[]>([]);
  const [volunteersList, setVolunteersList] = useState<any[]>([]);
  const [organizationsList, setOrganizationsList] = useState<any[]>([]);
  
  useEffect(() => {
    // Redirect if not admin
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/");
      return;
    }
    
    // Load data from localStorage
    const victims = JSON.parse(localStorage.getItem("victims") || "[]");
    const volunteers = JSON.parse(localStorage.getItem("volunteers") || "[]");
    const organizations = JSON.parse(localStorage.getItem("organizations") || "[]");
    
    setVictimsList(victims);
    setVolunteersList(volunteers);
    setOrganizationsList(organizations);
    
    setStats({
      totalVictims: victims.length,
      totalVolunteers: volunteers.length,
      totalOrganizations: organizations.length,
    });
  }, [currentUser, navigate]);
  
  const chartData = [
    { name: "Victims", count: stats.totalVictims },
    { name: "Volunteers", count: stats.totalVolunteers },
    { name: "Organizations", count: stats.totalOrganizations },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-black/40 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 text-red-500" size={20} />
                  Victims
                </CardTitle>
                <CardDescription>Total registered victims</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{stats.totalVictims}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/40 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Users className="mr-2 text-green-500" size={20} />
                  Volunteers
                </CardTitle>
                <CardDescription>Total registered volunteers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{stats.totalVolunteers}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/40 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Building className="mr-2 text-blue-500" size={20} />
                  Organizations
                </CardTitle>
                <CardDescription>Total registered organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{stats.totalOrganizations}</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-black/40 border-white/10 mb-12">
            <CardHeader>
              <CardTitle>Registration Analytics</CardTitle>
              <CardDescription>Overview of all registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#000", 
                        border: "1px solid rgba(255, 255, 255, 0.1)" 
                      }} 
                    />
                    <Bar dataKey="count" fill="#ffffff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="victims" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="victims" className="flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>Victims</span>
              </TabsTrigger>
              <TabsTrigger value="volunteers" className="flex items-center gap-2">
                <UserPlus size={16} />
                <span>Volunteers</span>
              </TabsTrigger>
              <TabsTrigger value="organizations" className="flex items-center gap-2">
                <Building size={16} />
                <span>Organizations</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="victims">
              <Card className="bg-black/40 border-white/10">
                <CardHeader>
                  <CardTitle>Registered Victims</CardTitle>
                  <CardDescription>List of all registered victims</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Age</th>
                          <th className="text-left py-3 px-4">Location</th>
                          <th className="text-left py-3 px-4">Disaster Type</th>
                          <th className="text-left py-3 px-4">Registration Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {victimsList.length > 0 ? (
                          victimsList.map((victim) => (
                            <tr key={victim.id} className="border-b border-white/10">
                              <td className="py-3 px-4">{victim.name}</td>
                              <td className="py-3 px-4">{victim.age}</td>
                              <td className="py-3 px-4">{victim.location}</td>
                              <td className="py-3 px-4">{victim.disasterType}</td>
                              <td className="py-3 px-4">{new Date(victim.registrationDate).toLocaleDateString()}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-3 px-4 text-center text-gray-400">No victims registered yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="volunteers">
              <Card className="bg-black/40 border-white/10">
                <CardHeader>
                  <CardTitle>Registered Volunteers</CardTitle>
                  <CardDescription>List of all registered volunteers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Skills</th>
                          <th className="text-left py-3 px-4">Availability</th>
                          <th className="text-left py-3 px-4">Location</th>
                          <th className="text-left py-3 px-4">Registration Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {volunteersList.length > 0 ? (
                          volunteersList.map((volunteer) => (
                            <tr key={volunteer.id} className="border-b border-white/10">
                              <td className="py-3 px-4">{volunteer.name}</td>
                              <td className="py-3 px-4">{volunteer.skills}</td>
                              <td className="py-3 px-4">{volunteer.availability}</td>
                              <td className="py-3 px-4">{volunteer.location}</td>
                              <td className="py-3 px-4">{new Date(volunteer.registrationDate).toLocaleDateString()}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-3 px-4 text-center text-gray-400">No volunteers registered yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="organizations">
              <Card className="bg-black/40 border-white/10">
                <CardHeader>
                  <CardTitle>Registered Organizations</CardTitle>
                  <CardDescription>List of all registered organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Type</th>
                          <th className="text-left py-3 px-4">Contact</th>
                          <th className="text-left py-3 px-4">Location</th>
                          <th className="text-left py-3 px-4">Registration Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {organizationsList.length > 0 ? (
                          organizationsList.map((org) => (
                            <tr key={org.id} className="border-b border-white/10">
                              <td className="py-3 px-4">{org.name}</td>
                              <td className="py-3 px-4">{org.type}</td>
                              <td className="py-3 px-4">{org.contact}</td>
                              <td className="py-3 px-4">{org.location}</td>
                              <td className="py-3 px-4">{new Date(org.registrationDate).toLocaleDateString()}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-3 px-4 text-center text-gray-400">No organizations registered yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
