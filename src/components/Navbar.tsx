
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-black/80 border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter">
          RESCUE<span className="text-gray-400">HUB</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-white transition-colors">Home</Link>
          <Link to="/victims" className="text-sm font-medium hover:text-white transition-colors">Victims</Link>
          <Link to="/volunteers" className="text-sm font-medium hover:text-white transition-colors">Volunteers</Link>
          <Link to="/organizations" className="text-sm font-medium hover:text-white transition-colors">Organizations</Link>
          <Link to="/news" className="text-sm font-medium hover:text-white transition-colors">Updates</Link>
          <Button variant="outline" className="ml-4 border-white/20 hover:bg-white hover:text-black transition-all">
            Emergency Help
          </Button>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium py-2 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/victims" className="text-sm font-medium py-2 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Victims</Link>
            <Link to="/volunteers" className="text-sm font-medium py-2 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Volunteers</Link>
            <Link to="/organizations" className="text-sm font-medium py-2 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Organizations</Link>
            <Link to="/news" className="text-sm font-medium py-2 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Updates</Link>
            <Button variant="outline" className="border-white/20 hover:bg-white hover:text-black transition-all" onClick={() => setIsMenuOpen(false)}>
              Emergency Help
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
