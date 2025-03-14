
import { Heart } from "lucide-react";

const DonateHeader = () => {
  return (
    <>
      <div className="flex items-center justify-center mb-8">
        <Heart size={28} className="text-red-500 mr-3" />
        <h1 className="text-3xl md:text-4xl font-bold">Donate</h1>
      </div>
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
        Your contribution can make a significant difference in the lives of disaster victims.
        Every donation, big or small, helps us provide essential services and support.
      </p>
    </>
  );
};

export default DonateHeader;
