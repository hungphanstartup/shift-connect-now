
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import WorkerDashboard from "./pages/Dashboard/WorkerDashboard";
import EmployerDashboard from "./pages/Dashboard/EmployerDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import PostJob from "./pages/Dashboard/PostJob";
import EmployerSchedulePage from "./pages/EmployerSchedule";
import NotFound from "./pages/NotFound";
import Employers from "./pages/Employers";

// New pages for dashboard
import WorkerAvailability from "./pages/Dashboard/WorkerAvailability";
import JobApplications from "./pages/Dashboard/JobApplications";
import WorkerProfile from "./pages/Dashboard/WorkerProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/employers/:id/schedule" element={<EmployerSchedulePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Dashboard Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/worker" element={<WorkerDashboard />} />
          <Route path="/dashboard/employer" element={<EmployerDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/post-job" element={<PostJob />} />
          
          {/* Add the missing jobs route in dashboard */}
          <Route path="/dashboard/jobs" element={<Jobs />} />
          
          {/* New worker dashboard routes */}
          <Route path="/dashboard/availability" element={<WorkerAvailability />} />
          <Route path="/dashboard/applications" element={<JobApplications />} />
          <Route path="/dashboard/profile" element={<WorkerProfile />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
