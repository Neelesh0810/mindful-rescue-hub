
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Phone, Mail } from "lucide-react";

const EmergencyContactsSection = () => {
  const emergencyContacts = [
    { title: "Emergency Hotline", value: "1-800-123-4567", icon: <Phone size={20} /> },
    { title: "Medical Assistance", value: "1-800-234-5678", icon: <Phone size={20} /> },
    { title: "Rescue Coordination", value: "rescue@rescuehub.org", icon: <Mail size={20} /> },
    { title: "Missing Persons", value: "1-800-345-6789", icon: <Phone size={20} /> },
    { title: "Volunteer Coordination", value: "volunteers@rescuehub.org", icon: <Mail size={20} /> },
    { title: "Shelter Information", value: "1-800-456-7890", icon: <Phone size={20} /> }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-center justify-center">
          <AlertTriangle size={28} className="text-red-500 mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-center">Emergency Contacts</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {emergencyContacts.map((contact, index) => (
            <Card key={index} className="bg-black/40 border-white/10 hover:bg-black/60 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {contact.icon}
                  {contact.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-mono tracking-wide">{contact.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 max-w-lg mx-auto text-center">
          <div className="inline-block bg-red-500/20 text-white px-4 py-3 rounded-lg mb-3">
            <AlertTriangle className="inline-block mr-2" size={20} />
            <span className="font-medium">For life-threatening emergencies, always call 911 first</span>
          </div>
          <p className="text-gray-400">These hotlines are available 24/7 and are staffed by trained professionals who can provide immediate assistance and guidance.</p>
        </div>
      </div>
    </section>
  );
};

export default EmergencyContactsSection;
