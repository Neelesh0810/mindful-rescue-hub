
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ResourcesSection from "@/components/ResourcesSection";
import EmergencyContactsSection from "@/components/EmergencyContactsSection";
import VolunteerSection from "@/components/VolunteerSection";
import NewsUpdatesSection from "@/components/NewsUpdatesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <ResourcesSection />
        <EmergencyContactsSection />
        <VolunteerSection />
        <NewsUpdatesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
