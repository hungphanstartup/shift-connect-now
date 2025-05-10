
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const storedRole = localStorage.getItem("userRole");
    
    if (isAuthenticated && storedRole) {
      setUserRole(storedRole);
    } else if (location.pathname.includes('/dashboard')) {
      // Fallback to query params if available
      const queryParams = new URLSearchParams(location.search);
      const roleFromQuery = queryParams.get("role");
      
      // Set user role from query param, pathname, or default to worker
      if (roleFromQuery) {
        setUserRole(roleFromQuery);
        localStorage.setItem("userRole", roleFromQuery);
      } else if (location.pathname.includes('/dashboard/worker')) {
        setUserRole('worker');
        localStorage.setItem("userRole", 'worker');
      } else if (location.pathname.includes('/dashboard/employer')) {
        setUserRole('employer');
        localStorage.setItem("userRole", 'employer');
      } else if (location.pathname.includes('/dashboard/admin')) {
        setUserRole('admin');
        localStorage.setItem("userRole", 'admin');
      } else {
        setUserRole('worker'); // Default role
        localStorage.setItem("userRole", 'worker');
      }
      
      // Ensure isAuthenticated is set if we're on dashboard pages
      localStorage.setItem("isAuthenticated", "true");
    } else {
      setUserRole(null); // Not logged in
    }
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    
    toast.success("Logged out successfully");
    setUserRole(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-4 md:px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-topcv-primary">vieclamthoivu</span>
          <span className="hidden md:inline text-topcv-primary">.com</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/jobs" className="text-gray-600 hover:text-topcv-primary transition-colors">
            Find Jobs
          </Link>
          <Link to="/employers" className="text-gray-600 hover:text-topcv-primary transition-colors">
            For Employers
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-topcv-primary transition-colors">
            About Us
          </Link>
          
          {userRole ? (
            <div className="flex items-center space-x-2">
              <Link to={`/dashboard?role=${userRole}`}>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User size={18} />
                  <span className="capitalize">{userRole} Dashboard</span>
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 hover:text-red-700"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </Button>
            </div>
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
              className="text-gray-600 hover:text-topcv-primary py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link 
              to="/employers" 
              className="text-gray-600 hover:text-topcv-primary py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              For Employers
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-topcv-primary py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            
            <div className="border-t border-gray-100 pt-4 flex flex-col space-y-2">
              {userRole ? (
                <>
                  <Link 
                    to={`/dashboard?role=${userRole}`}
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <User size={18} />
                      <span className="capitalize">{userRole} Dashboard</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-700"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </Button>
                </>
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
