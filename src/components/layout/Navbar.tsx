
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = null; // Will be replaced with actual authentication state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-4 md:px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-brand-600">vieclamthoivu</span>
          <span className="hidden md:inline text-brand-600">.com</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/jobs" className="text-gray-600 hover:text-brand-600 transition-colors">
            Find Jobs
          </Link>
          <Link to="/employers" className="text-gray-600 hover:text-brand-600 transition-colors">
            For Employers
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-brand-600 transition-colors">
            About Us
          </Link>
          
          {user ? (
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <User size={18} />
                <span>Dashboard</span>
              </Button>
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-gray-600 focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-md z-50 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/jobs" 
              className="text-gray-600 hover:text-brand-600 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link 
              to="/employers" 
              className="text-gray-600 hover:text-brand-600 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              For Employers
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-brand-600 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            
            <div className="border-t border-gray-100 pt-4 flex flex-col space-y-2">
              {user ? (
                <Link 
                  to="/dashboard" 
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <User size={18} />
                    <span>Dashboard</span>
                  </Button>
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link 
                    to="/signup" 
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
