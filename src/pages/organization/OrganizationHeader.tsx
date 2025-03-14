
import { Building } from "lucide-react";

const OrganizationHeader = () => {
  return (
    <>
      <div className="flex items-center justify-center mb-8">
        <Building size={28} className="mr-3" />
        <h1 className="text-3xl md:text-4xl font-bold">Organization Registration</h1>
      </div>
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
        Register your organization to coordinate disaster response efforts with other agencies.
      </p>
    </>
  );
};

export default OrganizationHeader;
