
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, DollarSign, Check, ArrowLeft } from "lucide-react";

const PostJobPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Form state
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [positions, setPositions] = useState("1");
  const [requirements, setRequirements] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowSuccess(true);
      
      // After success, redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Error posting job:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout showFooter={false}>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back Link */}
          <Link to="/dashboard" className="inline-flex items-center text-gray-600 hover:text-brand-600 mb-6">
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Dashboard</span>
          </Link>
          
          {/* Success message */}
          {showSuccess && (
            <div className="bg-success-100 border border-success-200 text-success-800 rounded-md p-4 mb-6 flex items-center animate-fade-in">
              <Check className="w-5 h-5 mr-3 text-success-600" />
              <span>Job posted successfully! Redirecting to dashboard...</span>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Job Details */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Basic Details</h2>
                
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title*
                  </label>
                  <Input
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Restaurant Server, Event Staff"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description*
                  </label>
                  <textarea
                    id="jobDescription"
                    rows={4}
                    className="form-input"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Describe the job responsibilities and expectations"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                    Requirements
                  </label>
                  <textarea
                    id="requirements"
                    rows={3}
                    className="form-input"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="List any specific requirements or qualifications"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate different requirements with a new line</p>
                </div>
              </div>
              
              {/* Schedule Details */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Schedule Details</h2>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <Input
                      id="date"
                      type="date"
                      className="pl-10"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Clock size={16} className="text-gray-400" />
                      </div>
                      <Input
                        id="startTime"
                        type="time"
                        className="pl-10"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                      End Time*
                    </label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Location and Compensation */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Location & Compensation</h2>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin size={16} className="text-gray-400" />
                    </div>
                    <Input
                      id="location"
                      className="pl-10"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Address or area"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">
                      Hourly Rate* ($)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <DollarSign size={16} className="text-gray-400" />
                      </div>
                      <Input
                        id="hourlyRate"
                        type="number"
                        min="1"
                        step="0.1"
                        className="pl-10"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        placeholder="e.g., 12.50"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="positions" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Positions*
                    </label>
                    <Input
                      id="positions"
                      type="number"
                      min="1"
                      value={positions}
                      onChange={(e) => setPositions(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Posting...
                    </>
                  ) : (
                    "Post Job"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostJobPage;
