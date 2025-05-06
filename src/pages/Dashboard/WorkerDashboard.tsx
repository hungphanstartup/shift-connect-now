
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Calendar, Clock, MapPin, DollarSign, Star, Briefcase, Check, X } from "lucide-react";

// Mock data for worker dashboard
const upcomingShifts = [
  {
    id: 1,
    jobTitle: "Restaurant Server",
    company: "Downtown Cafe",
    location: "District 1, Ho Chi Minh City",
    date: "May 10, 2025",
    time: "6:00 PM - 10:00 PM",
    hours: 4,
    hourlyRate: 12,
    status: "confirmed",
  },
  {
    id: 2,
    jobTitle: "Event Staff",
    company: "City Convention Center",
    location: "District 7, Ho Chi Minh City",
    date: "May 15, 2025",
    time: "3:00 PM - 9:00 PM",
    hours: 6,
    hourlyRate: 15,
    status: "confirmed",
  }
];

const applicationHistory = [
  {
    id: 3,
    jobTitle: "Office Assistant",
    company: "Business Solutions",
    location: "District 1, Ho Chi Minh City",
    date: "May 5, 2025",
    status: "completed",
    rating: 4.5,
  },
  {
    id: 4,
    jobTitle: "Retail Assistant",
    company: "Fashion Outlet",
    location: "District 3, Ho Chi Minh City",
    date: "April 28, 2025",
    status: "completed",
    rating: 5,
  },
  {
    id: 5,
    jobTitle: "Warehouse Packer",
    company: "Global Logistics",
    location: "Thu Duc City, Ho Chi Minh City",
    date: "April 20, 2025",
    status: "declined",
  }
];

const WorkerDashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Mock worker data
  const worker = {
    name: "Nguyen Van A",
    rating: 4.8,
    jobsCompleted: 12,
    earnings: 560,
  };
  
  return (
    <Layout showFooter={false}>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Worker Profile Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl font-bold mb-1">Welcome back, {worker.name}!</h1>
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-gray-700">{worker.rating} Rating</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 text-brand-600 mr-1" />
                    <span className="text-gray-700">{worker.jobsCompleted} Jobs Completed</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">Total Earnings</span>
                <span className="text-2xl font-bold text-brand-600">${worker.earnings}</span>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Link to="/jobs">
              <Button variant="outline" className="w-full bg-white border-gray-200 hover:bg-gray-50 h-auto py-4 shadow-sm">
                <div className="flex flex-col items-center">
                  <Search className="w-5 h-5 mb-2 text-brand-600" />
                  <span>Find Jobs</span>
                </div>
              </Button>
            </Link>
            <Link to="/dashboard/availability">
              <Button variant="outline" className="w-full bg-white border-gray-200 hover:bg-gray-50 h-auto py-4 shadow-sm">
                <div className="flex flex-col items-center">
                  <Calendar className="w-5 h-5 mb-2 text-brand-600" />
                  <span>Set Availability</span>
                </div>
              </Button>
            </Link>
            <Link to="/dashboard/applications">
              <Button variant="outline" className="w-full bg-white border-gray-200 hover:bg-gray-50 h-auto py-4 shadow-sm">
                <div className="flex flex-col items-center">
                  <Clock className="w-5 h-5 mb-2 text-brand-600" />
                  <span>Job Applications</span>
                </div>
              </Button>
            </Link>
            <Link to="/dashboard/profile">
              <Button variant="outline" className="w-full bg-white border-gray-200 hover:bg-gray-50 h-auto py-4 shadow-sm">
                <div className="flex flex-col items-center">
                  <User className="w-5 h-5 mb-2 text-brand-600" />
                  <span>Edit Profile</span>
                </div>
              </Button>
            </Link>
          </div>
          
          {/* Dashboard Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "upcoming"
                    ? "text-brand-600 border-b-2 border-brand-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Upcoming Shifts
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "history"
                    ? "text-brand-600 border-b-2 border-brand-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Job History
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === "upcoming" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold mb-4">Upcoming Shifts</h2>
                  
                  {upcomingShifts.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-gray-500 mb-4">You don't have any upcoming shifts.</p>
                      <Link to="/jobs">
                        <Button>Find Jobs</Button>
                      </Link>
                    </div>
                  ) : (
                    upcomingShifts.map(shift => (
                      <div key={shift.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                          <div>
                            <h3 className="text-lg font-semibold">{shift.jobTitle}</h3>
                            <p className="text-gray-600 text-sm">{shift.company}</p>
                            
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center text-gray-500 text-sm">
                                <Calendar size={15} className="mr-2" />
                                <span>{shift.date}</span>
                              </div>
                              <div className="flex items-center text-gray-500 text-sm">
                                <Clock size={15} className="mr-2" />
                                <span>{shift.time} ({shift.hours} hours)</span>
                              </div>
                              <div className="flex items-center text-gray-500 text-sm">
                                <MapPin size={15} className="mr-2" />
                                <span>{shift.location}</span>
                              </div>
                              <div className="flex items-center text-gray-500 text-sm">
                                <DollarSign size={15} className="mr-2" />
                                <span>${shift.hourlyRate}/hour (${shift.hourlyRate * shift.hours} total)</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <div className="bg-green-50 text-green-700 text-xs font-medium rounded px-2 py-1 flex items-center">
                              <Check size={14} className="mr-1" />
                              Confirmed
                            </div>
                            <Link to={`/dashboard/shifts/${shift.id}`} className="mt-4">
                              <Button variant="outline" size="sm">View Details</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
              
              {activeTab === "history" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold mb-4">Job History</h2>
                  
                  {applicationHistory.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-gray-500">You haven't completed any jobs yet.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Job
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Rating
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {applicationHistory.map(job => (
                            <tr key={job.id}>
                              <td className="px-6 py-4">
                                <div className="flex flex-col">
                                  <span className="font-medium text-gray-900">{job.jobTitle}</span>
                                  <span className="text-gray-500 text-sm">{job.company}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {job.date}
                              </td>
                              <td className="px-6 py-4 text-sm">
                                {job.status === "completed" ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    <Check size={12} className="mr-1" />
                                    Completed
                                  </span>
                                ) : job.status === "declined" ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                    <X size={12} className="mr-1" />
                                    Declined
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                    {job.status}
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {job.rating ? (
                                  <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className="ml-1">{job.rating}</span>
                                  </div>
                                ) : (
                                  "N/A"
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkerDashboard;

// Additional icons needed
const Search = ({ size = 24, ...props }: { size?: number, [key: string]: any }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const User = ({ size = 24, ...props }: { size?: number, [key: string]: any }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
