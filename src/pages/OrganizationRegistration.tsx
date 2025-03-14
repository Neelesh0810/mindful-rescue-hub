
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrganizationHeader from "./organization/OrganizationHeader";
import OrganizationRegistrationForm from "./organization/OrganizationRegistrationForm";

const OrganizationRegistration = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <OrganizationHeader />
          <OrganizationRegistrationForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrganizationRegistration;
