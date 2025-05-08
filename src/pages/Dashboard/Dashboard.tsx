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
    return queryParams.get("role") || "worker";
  };
  
  const userRole = getUserRole();
  
  // In a real app, you'd check if the user is authenticated here
  useEffect(() => {
    const isAuthenticated = true; // This would be a real check
    
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
