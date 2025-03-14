
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GovernmentHeader from "./government/GovernmentHeader";
import GovernmentRegistrationForm from "./government/GovernmentRegistrationForm";

const GovernmentRegistration = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <GovernmentHeader />
          <GovernmentRegistrationForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GovernmentRegistration;
