
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertTriangle, HandHeart, Users } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546500702-ae7b0f3f3cf0?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center brightness-[0.2]"></div>
      
      <div className="relative container mx-auto px-4 py-20 md:py-32 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-shadow mb-6">
          Disaster Response & <span className="text-gradient">Recovery</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mb-10">
          Connecting victims, volunteers, and organizations to streamline disaster relief efforts and facilitate recovery.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
            <Link to="/emergency">
              <AlertTriangle size={18} className="mr-2" />
              I Need Help
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
            <Link to="/volunteer">
              <HandHeart size={18} className="mr-2" />
              Volunteer
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          {[
            {
              icon: <AlertTriangle size={24} />,
              title: "Victims",
              description: "Find immediate assistance, shelters, and critical resources.",
              link: "/victims"
            },
            {
              icon: <HandHeart size={24} />,
              title: "Volunteers",
              description: "Register to help, find opportunities, and make a difference.",
              link: "/volunteers"
            },
            {
              icon: <Users size={24} />,
              title: "Organizations",
              description: "Coordinate relief efforts and connect with other agencies.",
              link: "/organizations"
            }
          ].map((item, index) => (
            <div key={index} className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex flex-col items-center text-center hover:bg-black/80 transition-colors">
              <div className="mb-4 p-3 bg-white/10 rounded-full">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 mb-4">{item.description}</p>
              <Button asChild variant="link" className="mt-auto">
                <Link to={item.link}>Learn More</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
