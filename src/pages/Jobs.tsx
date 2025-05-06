
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, Search } from "lucide-react";

// Mock jobs data
const initialJobs = [
  {
    id: 1,
    title: "Restaurant Server",
    company: "Downtown Cafe",
    location: "District 1, Ho Chi Minh City",
    date: "May 10, 2025",
    time: "6:00 PM - 10:00 PM",
    hours: 4,
    hourlyRate: 12,
    postedDays: 1,
  },
  {
    id: 2,
    title: "Warehouse Packer",
    company: "Global Logistics",
    location: "Thu Duc City, Ho Chi Minh City",
    date: "May 12, 2025",
    time: "9:00 AM - 5:00 PM",
    hours: 8,
    hourlyRate: 10,
    postedDays: 2,
  },
  {
    id: 3,
    title: "Event Staff",
    company: "City Convention Center",
    location: "District 7, Ho Chi Minh City",
    date: "May 15, 2025",
    time: "3:00 PM - 9:00 PM",
    hours: 6,
    hourlyRate: 15,
    postedDays: 3,
  },
  {
    id: 4,
    title: "Retail Assistant",
    company: "Fashion Outlet",
    location: "District 3, Ho Chi Minh City",
    date: "May 18, 2025",
    time: "10:00 AM - 6:00 PM",
    hours: 8,
    hourlyRate: 11,
    postedDays: 0,
  },
  {
    id: 5,
    title: "Delivery Driver",
    company: "Quick Delivery",
    location: "Various Locations, Ho Chi Minh City",
    date: "May 20, 2025",
    time: "11:00 AM - 3:00 PM",
    hours: 4,
    hourlyRate: 13,
    postedDays: 1,
  },
  {
    id: 6,
    title: "Office Assistant",
    company: "Business Solutions",
    location: "District 1, Ho Chi Minh City",
    date: "May 22, 2025",
    time: "9:00 AM - 5:00 PM",
    hours: 8,
    hourlyRate: 14,
    postedDays: 2,
  },
];

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState(initialJobs);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = initialJobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setJobs(filtered);
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Find Temporary Jobs</h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search jobs, companies, locations..."
                    className="form-input pl-10 pr-3 py-3 rounded-md w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    size={18} 
                  />
                </div>
                <Button type="submit" className="md:flex-shrink-0">
                  Search Jobs
                </Button>
              </div>
            </form>
            
            {/* Job Filters (simplified for MVP) */}
            <div className="bg-white p-4 rounded-md shadow-sm mb-6 flex flex-wrap gap-3">
              <p className="text-sm text-gray-500 mr-2 self-center">Quick Filters:</p>
              <Button variant="outline" size="sm">Today</Button>
              <Button variant="outline" size="sm">Weekend</Button>
              <Button variant="outline" size="sm">This Week</Button>
              <Button variant="outline" size="sm">Morning Shifts</Button>
              <Button variant="outline" size="sm">Evening Shifts</Button>
            </div>
          </div>
          
          {/* Job Listings */}
          <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-6">Available Jobs ({jobs.length})</h2>
            
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 mb-4">No jobs found matching your search.</p>
                <Button onClick={() => {setSearchTerm(""); setJobs(initialJobs);}}>
                  Reset Search
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-gray-600 text-sm">{job.company}</p>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar size={16} className="mr-2" />
                            <span>{job.date} • {job.time}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-500 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{job.location}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="bg-gray-100 text-gray-600 text-xs font-medium py-1 px-2 rounded">
                            {job.hours} hours
                          </span>
                          <span className="bg-brand-100 text-brand-700 text-xs font-medium py-1 px-2 rounded">
                            ${job.hourlyRate}/hour
                          </span>
                          {job.postedDays === 0 ? (
                            <span className="bg-success-100 text-success-700 text-xs font-medium py-1 px-2 rounded">
                              New today
                            </span>
                          ) : null}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <Link to={`/jobs/${job.id}`}>
                          <Button className="w-full md:w-auto">View Details</Button>
                        </Link>
                        <p className="text-xs text-gray-500 mt-2">
                          {job.postedDays === 0 ? "Posted today" : 
                          job.postedDays === 1 ? "Posted yesterday" : 
                          `Posted ${job.postedDays} days ago`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination (simplified for MVP) */}
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow">
                <a href="#" className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </a>
                <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-brand-600 hover:bg-gray-50">
                  1
                </a>
                <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  2
                </a>
                <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  3
                </a>
                <a href="#" className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;
