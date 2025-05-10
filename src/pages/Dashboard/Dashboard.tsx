import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import WorkerDashboard from "./WorkerDashboard";
import EmployerDashboard from "./EmployerDashboard";
import AdminDashboard from "./AdminDashboard";

interface DashboardProps {
  role?: string;
}

const Dashboard = ({ role: propRole }: DashboardProps = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // In a real app, this would come from authentication state
  // For this MVP, we'll determine based on URL query param, prop, or default to worker
  const getUserRole = () => {
    // If role is passed as a prop, use that
    if (propRole) return propRole;
    
    // Otherwise check URL query params
    const queryParams = new URLSearchParams(location.search);
    const roleFromQuery = queryParams.get("role");
    
    // Check if we have a role in localStorage (this helps maintain state across navigation)
    const storedRole = localStorage.getItem("userRole");
    
    return roleFromQuery || storedRole || "worker";
  };
  
  const userRole = getUserRole();
  
  // Store the role in localStorage to maintain it across navigation
  useEffect(() => {
    localStorage.setItem("userRole", userRole);
  }, [userRole]);
  
  // In a real app, you'd check if the user is authenticated here
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);
  
  return (
    <>
      {userRole === "employer" ? (
        <EmployerDashboard />
      ) : userRole === "admin" ? (
        <AdminDashboard />
      ) : (
        <WorkerDashboard />
      )}
    </>
  );
};

export default Dashboard;
