
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, DollarSign, Briefcase, Star, Building, Check } from "lucide-react";

// Mock job data
const jobData = {
  id: 1,
  title: "Restaurant Server",
  company: "Downtown Cafe",
  companyDescription: "A popular cafe located in the heart of District 1, known for their excellent coffee and brunch menu.",
  location: "123 Le Loi Street, District 1, Ho Chi Minh City",
  date: "May 10, 2025",
  time: "6:00 PM - 10:00 PM",
  hours: 4,
  hourlyRate: 12,
  postedDays: 1,
  openPositions: 2,
  description: "We are looking for energetic and friendly servers to help with our busy dinner service. You'll be taking orders, delivering food, and ensuring customers have a great experience.",
  requirements: [
    "Previous serving experience preferred but not required",
    "Friendly and customer-focused attitude",
    "Ability to work in a fast-paced environment",
    "Basic English communication skills",
  ],
  responsibilities: [
    "Take customer orders and input them into our system",
    "Deliver food and beverages to customers",
    "Process payments and handle cash accurately",
    "Clean and set tables",
    "Ensure customer satisfaction throughout their dining experience",
  ],
  benefits: [
    "Free meal during shift",
    "Tips from customers",
    "Flexible scheduling",
  ],
  applicationCount: 3,
};

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [availability, setAvailability] = useState("yes");
  const [message, setMessage] = useState("");
  
  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to submit the application
    setTimeout(() => {
      setApplicationSubmitted(true);
      setIsApplying(false);
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-gray-500">
              <Link to="/jobs" className="hover:text-brand-600 transition-colors">Jobs</Link>
              <span className="mx-2">›</span>
              <span className="text-gray-700">Job Details</span>
            </div>
            
            {/* Job Header */}
            <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200 shadow-sm mb-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{jobData.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Building size={16} className="mr-1" />
                    <span>{jobData.company}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar size={16} className="mr-1" />
                      <span>{jobData.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock size={16} className="mr-1" />
                      <span>{jobData.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin size={16} className="mr-1" />
                      <span>{jobData.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <DollarSign size={16} className="mr-1" />
                      <span>${jobData.hourlyRate}/hour</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 md:items-end">
                  {!applicationSubmitted ? (
                    <Button onClick={() => setIsApplying(true)} className="w-full md:w-auto">
                      Apply Now
                    </Button>
                  ) : (
                    <Button disabled className="w-full md:w-auto bg-success-500 hover:bg-success-500">
                      <Check size={16} className="mr-1" /> Applied
                    </Button>
                  )}
                  <div className="text-xs text-gray-500">
                    {jobData.applicationCount} people already applied
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-600 text-xs font-medium py-1 px-2 rounded">
                  {jobData.hours} hours
                </span>
                <span className="bg-brand-100 text-brand-700 text-xs font-medium py-1 px-2 rounded">
                  {jobData.openPositions} positions
                </span>
                <span className="bg-success-100 text-success-700 text-xs font-medium py-1 px-2 rounded">
                  {jobData.postedDays === 0 ? "Posted today" : 
                  jobData.postedDays === 1 ? "Posted yesterday" : 
                  `Posted ${jobData.postedDays} days ago`}
                </span>
              </div>
            </div>
            
            {/* Job Description */}
            <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <p className="text-gray-600 mb-6">
                {jobData.description}
              </p>
              
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <ul className="list-disc pl-5 mb-6 text-gray-600 space-y-2">
                {jobData.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
              <ul className="list-disc pl-5 mb-6 text-gray-600 space-y-2">
                {jobData.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold mb-3">Benefits</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                {jobData.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            
            {/* Company Info */}
            <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">About {jobData.company}</h2>
              <p className="text-gray-600">
                {jobData.companyDescription}
              </p>
            </div>
            
            {/* Application Form - Shown when user clicks "Apply Now" */}
            {isApplying && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Apply for {jobData.title}</h2>
                    <button onClick={() => setIsApplying(false)} className="text-gray-500 hover:text-gray-700">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmitApplication}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Are you available on {jobData.date} from {jobData.time}?
                      </label>
                      <div className="space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="availability"
                            value="yes"
                            checked={availability === "yes"}
                            onChange={() => setAvailability("yes")}
                            className="form-radio text-brand-600"
                          />
                          <span className="ml-2">Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="availability"
                            value="no"
                            checked={availability === "no"}
                            onChange={() => setAvailability("no")}
                            className="form-radio text-brand-600"
                          />
                          <span className="ml-2">No</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message (Optional)
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Introduce yourself or share relevant experience"
                        className="form-input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsApplying(false)}
                        className="mr-2"
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Submit Application</Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {/* Related Jobs */}
            <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Similar Jobs</h2>
              
              <div className="space-y-4">
                {/* Similar Job 1 */}
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-semibold">Cafe Barista</h3>
                  <p className="text-gray-600 text-sm">Coffee House</p>
                  
                  <div className="mt-2 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar size={16} className="mr-1" />
                      <span>May 11, 2025</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin size={16} className="mr-1" />
                      <span>District 3, HCMC</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <DollarSign size={16} className="mr-1" />
                      <span>$11/hour</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <Link to="/jobs/4">
                      <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
                
                {/* Similar Job 2 */}
                <div>
                  <h3 className="text-lg font-semibold">Restaurant Host</h3>
                  <p className="text-gray-600 text-sm">Gourmet Bistro</p>
                  
                  <div className="mt-2 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar size={16} className="mr-1" />
                      <span>May 12, 2025</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin size={16} className="mr-1" />
                      <span>District 1, HCMC</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <DollarSign size={16} className="mr-1" />
                      <span>$13/hour</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <Link to="/jobs/5">
                      <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobDetailPage;

// Missing import for X icon
const X = ({ size = 24, ...props }: { size?: number, [key: string]: any }) => (
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
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
