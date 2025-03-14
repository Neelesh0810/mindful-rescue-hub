
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Sanrakshak</h3>
            <p className="text-gray-400 mb-4">
              Connecting victims, volunteers, and organizations for effective disaster response and recovery.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/victims" className="text-gray-400 hover:text-white transition-colors">For Victims</Link></li>
              <li><Link to="/volunteers" className="text-gray-400 hover:text-white transition-colors">For Volunteers</Link></li>
              <li><Link to="/organizations" className="text-gray-400 hover:text-white transition-colors">For Organizations</Link></li>
              <li><Link to="/government" className="text-gray-400 hover:text-white transition-colors">For Government</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/emergency" className="text-gray-400 hover:text-white transition-colors">Emergency Help</Link></li>
              <li><Link to="/shelters" className="text-gray-400 hover:text-white transition-colors">Find Shelters</Link></li>
              <li><Link to="/donate" className="text-gray-400 hover:text-white transition-colors">Donate</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-white transition-colors">Latest Updates</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Emergency: 1-800-123-4567</li>
              <li className="text-gray-400">Email: help@rescuehub.org</li>
              <li className="text-gray-400">Volunteer: volunteer@rescuehub.org</li>
              <li className="text-gray-400">Press: media@rescuehub.org</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Sanrakshak. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/accessibility" className="text-gray-400 text-sm hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
