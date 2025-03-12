
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

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
          
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium">
                <User size={16} className="inline-block mr-2" />
                {currentUser.name || 'User'}
              </div>
              <Button variant="outline" size="sm" className="border-white/20 hover:bg-white hover:text-black transition-all" onClick={handleLogout}>
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" className="border-white/20 hover:bg-white hover:text-black transition-all" asChild>
              <Link to="/auth">
                <LogIn size={16} className="mr-2" />
                Login
              </Link>
            </Button>
          )}
          
          <Button variant="outline" className="border-white/20 hover:bg-white hover:text-black transition-all" asChild>
            <Link to="/emergency">
              Emergency Help
            </Link>
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
            
            {currentUser ? (
              <>
                <div className="text-sm font-medium py-2">
                  <User size={16} className="inline-block mr-2" />
                  {currentUser.name || 'User'}
                </div>
                <Button variant="outline" className="border-white/20 hover:bg-white hover:text-black transition-all" onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}>
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="outline" className="border-white/20 hover:bg-white hover:text-black transition-all" asChild onClick={() => setIsMenuOpen(false)}>
                <Link to="/auth">
                  <LogIn size={16} className="mr-2" />
                  Login
                </Link>
              </Button>
            )}
            
            <Button variant="outline" className="border-white/20 hover:bg-white hover:text-black transition-all" asChild onClick={() => setIsMenuOpen(false)}>
              <Link to="/emergency">
                Emergency Help
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
