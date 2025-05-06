import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Calendar, Clock, MapPin, DollarSign, Users, Briefcase, Check, X, Plus, Star } from "lucide-react";

// Mock data for employer dashboard
const activeJobs = [
  {
    id: 1,
    title: "Restaurant Server",
    location: "District 1, Ho Chi Minh City",
    date: "May 10, 2025",
    time: "6:00 PM - 10:00 PM",
    applicants: 4,
    positions: 2,
    filled: 2,
    hourlyRate: 12,
  },
  {
    id: 2,
    title: "Event Staff",
    location: "District 7, Ho Chi Minh City",
    date: "May 15, 2025",
    time: "3:00 PM - 9:00 PM",
    applicants: 6,
    positions: 4,
    filled: 1,
    hourlyRate: 15,
  },
];

const pastJobs = [
  {
    id: 3,
    title: "Office Assistant",
    location: "District 1, Ho Chi Minh City",
    date: "May 5, 2025",
    time: "9:00 AM - 5:00 PM",
    positions: 1,
    filled: 1,
    status: "completed",
  },
  {
    id: 4,
    title: "Warehouse Helper",
    location: "Thu Duc City, Ho Chi Minh City",
    date: "April 25, 2025",
    time: "8:00 AM - 4:00 PM",
    positions: 3,
    filled: 2,
    status: "completed",
  },
];

// Mock worker data for job applicants
const jobApplicants = [
  {
    id: 1,
    name: "Tran Thi B",
    rating: 4.8,
    jobsCompleted: 15,
    status: "confirmed",
  },
  {
    id: 2,
    name: "Le Van C",
    rating: 4.5,
    jobsCompleted: 8,
    status: "confirmed",
  },
  {
    id: 3,
    name: "Pham Minh D",
    rating: 4.2,
    jobsCompleted: 5,
    status: "pending",
  },
  {
    id: 4,
    name: "Do Thi E",
    rating: 3.9,
    jobsCompleted: 3,
    status: "pending",
  },
];

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [selectedJob, setSelectedJob] = useState<number | null>(1); // Default to first job
  
  // Mock employer data
  const employer = {
    name: "Cafe XYZ",
    jobsPosted: 5,
    activeJobs: 2,
  };
  
  return (
    <Layout showFooter={false}>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Employer Profile Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl font-bold mb-1">Welcome back, {employer.name}!</h1>
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <Briefcase className="w-4 h-4 text-brand-600 mr-1" />
                    <span className="text-gray-700">{employer.jobsPosted} Jobs Posted</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-brand-600 mr-1" />
                    <span className="text-gray-700">{employer.activeJobs} Active Jobs</span>
                  </div>
                </div>
              </div>
              <Link to="/dashboard/post-job">
                <Button className="flex items-center gap-2">
                  <Plus size={16} />
                  Post New Job
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Link to="/dashboard/post-job">
              <Button variant="outline" className="w-full bg-white border-gray-200 hover:bg-gray-50 h-auto py-4 shadow-sm">
                <div className="flex flex-col items-center">
                  <Plus className="w-5 h-5 mb-2 text-brand-600" />
                  <span>Post New Job</span>
                </div>
              </Button>
            </Link>
            <Link to="/dashboard/jobs">
              <Button variant="outline" className="w-full bg-white border-gray-200 hover:bg-gray-50 h-auto py-4 shadow-sm">
                <div className="flex flex-col items-center">
                  <Briefcase className="w-5 h-5 mb-2 text-brand-600" />
                  <span>Manage Jobs</span>
                </div>
              </Button>
            </Link>
            <Link to="/dashboard/workers">
              <Button variant="outline" className="w-full bg-white border-gray-200 hover:bg-gray-50 h-auto py-4 shadow-sm">
                <div className="flex flex-col items-center">
                  <Users className="w-5 h-5 mb-2 text-brand-600" />
                  <span>View Workers</span>
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
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-7">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("jobs")}
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === "jobs"
                        ? "text-brand-600 border-b-2 border-brand-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Active Jobs
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
                  {activeTab === "jobs" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Active Jobs ({activeJobs.length})</h2>
                        <Link to="/dashboard/post-job">
                          <Button size="sm" className="flex items-center gap-2">
                            <Plus size={14} />
                            Post Job
                          </Button>
                        </Link>
                      </div>
                      
                      {activeJobs.length === 0 ? (
                        <div className="text-center py-6">
                          <p className="text-gray-500 mb-4">You don't have any active jobs.</p>
                          <Link to="/dashboard/post-job">
                            <Button>Post a Job</Button>
                          </Link>
                        </div>
                      ) : (
                        activeJobs.map(job => (
                          <div 
                            key={job.id} 
                            className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${selectedJob === job.id ? 'border-brand-200 bg-brand-50' : 'border-gray-100'}`}
                            onClick={() => setSelectedJob(job.id)}
                          >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                              <div>
                                <h3 className="text-lg font-semibold">{job.title}</h3>
                                
                                <div className="mt-3 space-y-2">
                                  <div className="flex items-center text-gray-500 text-sm">
                                    <Calendar size={15} className="mr-2" />
                                    <span>{job.date}</span>
                                  </div>
                                  <div className="flex items-center text-gray-500 text-sm">
                                    <Clock size={15} className="mr-2" />
                                    <span>{job.time}</span>
                                  </div>
                                  <div className="flex items-center text-gray-500 text-sm">
                                    <MapPin size={15} className="mr-2" />
                                    <span>{job.location}</span>
                                  </div>
                                </div>
                                
                                <div className="mt-3 flex flex-wrap gap-2">
                                  <span className="bg-gray-100 text-gray-600 text-xs font-medium py-1 px-2 rounded">
                                    ${job.hourlyRate}/hour
                                  </span>
                                  <span className="bg-brand-100 text-brand-700 text-xs font-medium py-1 px-2 rounded">
                                    {job.filled}/{job.positions} positions filled
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-end">
                                <span className="bg-blue-100 text-blue-700 text-xs font-medium py-1 px-2 rounded">
                                  {job.applicants} applicants
                                </span>
                                <div className="flex gap-2 mt-4">
                                  <Link to={`/dashboard/jobs/${job.id}/edit`}>
                                    <Button variant="outline" size="sm">Edit</Button>
                                  </Link>
                                  <Link to={`/dashboard/jobs/${job.id}`}>
                                    <Button size="sm">Manage</Button>
                                  </Link>
                                </div>
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
                      
                      {pastJobs.length === 0 ? (
                        <div className="text-center py-6">
                          <p className="text-gray-500">You haven't posted any jobs yet.</p>
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
                                  Filled
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {pastJobs.map(job => (
                                <tr key={job.id}>
                                  <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                      <span className="font-medium text-gray-900">{job.title}</span>
                                      <span className="text-gray-500 text-sm">{job.location}</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-500">
                                    {job.date}<br/>
                                    <span className="text-xs">{job.time}</span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-500">
                                    {job.filled}/{job.positions}
                                  </td>
                                  <td className="px-6 py-4 text-sm">
                                    {job.status === "completed" ? (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                        <Check size={12} className="mr-1" />
                                        Completed
                                      </span>
                                    ) : job.status === "cancelled" ? (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                        <X size={12} className="mr-1" />
                                        Cancelled
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                        {job.status}
                                      </span>
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
            
            {/* Applicants Panel */}
            <div className="md:col-span-5">
              {selectedJob && activeTab === "jobs" && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="border-b border-gray-200 p-4">
                    <h2 className="text-lg font-semibold">Applicants for {activeJobs.find(j => j.id === selectedJob)?.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {activeJobs.find(j => j.id === selectedJob)?.date} • {activeJobs.find(j => j.id === selectedJob)?.time}
                    </p>
                  </div>
                  
                  <div className="p-4">
                    {jobApplicants.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-gray-500">No applicants yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {jobApplicants.map(applicant => (
                          <div key={applicant.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{applicant.name}</h3>
                                <div className="flex items-center mt-1 text-sm text-gray-500">
                                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                  <span>{applicant.rating} rating • {applicant.jobsCompleted} jobs completed</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                {applicant.status === "confirmed" ? (
                                  <span className="bg-green-50 text-green-700 text-xs font-medium rounded px-2 py-1 flex items-center">
                                    <Check size={14} className="mr-1" />
                                    Confirmed
                                  </span>
                                ) : (
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="text-xs py-0 px-2 h-7 border-red-200 hover:bg-red-50 text-red-600">
                                      Decline
                                    </Button>
                                    <Button size="sm" className="text-xs py-0 px-2 h-7 bg-green-600 hover:bg-green-700">
                                      Confirm
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {applicant.status === "confirmed" && (
                              <div className="mt-3 flex justify-between items-center">
                                <Link to={`/dashboard/workers/${applicant.id}`}>
                                  <Button size="sm" variant="outline">View Profile</Button>
                                </Link>
                                <Button size="sm" variant="outline" className="text-xs py-0 px-2 h-7 border-red-200 hover:bg-red-50 text-red-600">
                                  Cancel Confirmation
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {/* View All Link */}
                        <div className="pt-2 text-center">
                          <Link to={`/dashboard/jobs/${selectedJob}/applicants`} className="text-brand-600 text-sm hover:underline">
                            View all applicants
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === "history" && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="border-b border-gray-200 p-4">
                    <h2 className="text-lg font-semibold">Job Statistics</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm text-gray-500 mb-1">Total Jobs Posted</h3>
                          <p className="text-2xl font-bold">{pastJobs.length + activeJobs.length}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm text-gray-500 mb-1">Positions Filled</h3>
                          <p className="text-2xl font-bold">{pastJobs.reduce((acc, job) => acc + job.filled, 0) + activeJobs.reduce((acc, job) => acc + job.filled, 0)}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm text-gray-500 mb-1">Completion Rate</h3>
                          <p className="text-2xl font-bold">92%</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm text-gray-500 mb-1">Worker Rating</h3>
                          <p className="text-2xl font-bold flex items-center">
                            4.7
                            <Star className="w-5 h-5 text-yellow-500 ml-1" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerDashboard;

// Additional icon needed
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
