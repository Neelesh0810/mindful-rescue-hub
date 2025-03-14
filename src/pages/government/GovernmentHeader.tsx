
import { Flag } from "lucide-react";

const GovernmentHeader = () => {
  return (
    <>
      <div className="flex items-center justify-center mb-8">
        <Flag size={28} className="mr-3" />
        <h1 className="text-3xl md:text-4xl font-bold">Government Registration</h1>
      </div>
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
        Register your government department to coordinate disaster response efforts effectively.
      </p>
    </>
  );
};

export default GovernmentHeader;
