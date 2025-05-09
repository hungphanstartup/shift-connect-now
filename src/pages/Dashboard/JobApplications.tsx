
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Clock, MapPin, DollarSign, Check, X, Clock as ClockIcon, User } from "lucide-react";

// Mock data for job applications
const mockApplications = [
  {
    id: 1,
    jobTitle: "Restaurant Server",
    company: "Downtown Cafe",
    companyLogo: "/placeholder.svg",
    location: "District 1, Ho Chi Minh City",
    date: "May 12, 2025",
    timeRange: "6:00 PM - 10:00 PM",
    hourlyRate: 12,
    status: "pending",
    appliedDate: "May 5, 2025"
  },
  {
    id: 2,
    jobTitle: "Event Staff",
    company: "City Convention Center",
    companyLogo: "/placeholder.svg",
    location: "District 7, Ho Chi Minh City",
    date: "May 15, 2025",
    timeRange: "2:00 PM - 10:00 PM",
    hourlyRate: 15,
    status: "accepted",
    appliedDate: "May 3, 2025"
  },
  {
    id: 3,
    jobTitle: "Office Assistant",
    company: "Business Solutions Inc",
    companyLogo: "/placeholder.svg",
    location: "District 4, Ho Chi Minh City",
    date: "May 18, 2025",
    timeRange: "9:00 AM - 5:00 PM",
    hourlyRate: 14,
    status: "declined",
    appliedDate: "May 2, 2025",
    declineReason: "Position has been filled"
  }
];

const JobApplications = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter applications based on the active tab
  const filteredApplications = mockApplications.filter(app => {
    if (activeTab === "all") return true;
    return app.status === activeTab;
  });

  return (
    <Layout showFooter={false}>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">My Job Applications</h1>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex mb-6">
                <TabsTrigger value="all">All Applications</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No applications found.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredApplications.map((application) => (
                      <ApplicationCard key={application.id} application={application} />
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="pending" className="mt-0">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No pending applications.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredApplications.map((application) => (
                      <ApplicationCard key={application.id} application={application} />
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="accepted" className="mt-0">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No accepted applications.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredApplications.map((application) => (
                      <ApplicationCard key={application.id} application={application} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  companyLogo: string;
  location: string;
  date: string;
  timeRange: string;
  hourlyRate: number;
  status: string;
  appliedDate: string;
  declineReason?: string;
}

const ApplicationCard = ({ application }: { application: Application }) => {
  // Define getStatusBadge function inside the component since we're using it here
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending":
        return <Badge variant="outline" className="flex items-center gap-1 bg-yellow-50 text-yellow-700 border-yellow-200"><ClockIcon size={14} />Pending</Badge>;
      case "accepted":
        return <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200"><Check size={14} />Accepted</Badge>;
      case "declined":
        return <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200"><X size={14} />Declined</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <User size={20} className="text-gray-500" />
            </div>
            <div>
              <h3 className="font-medium">{application.jobTitle}</h3>
              <p className="text-sm text-gray-600">{application.company}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mt-3">
            <div className="flex items-center text-gray-500 text-sm">
              <CalendarClock size={14} className="mr-2" />
              <span>{application.date}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock size={14} className="mr-2" />
              <span>{application.timeRange}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin size={14} className="mr-2" />
              <span>{application.location}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <DollarSign size={14} className="mr-2" />
              <span>${application.hourlyRate}/hour</span>
            </div>
          </div>
          
          {application.declineReason && (
            <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded">
              <strong>Reason:</strong> {application.declineReason}
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end">
          <div className="mb-2">
            {getStatusBadge(application.status)}
          </div>
          <p className="text-xs text-gray-500 mb-3">Applied on {application.appliedDate}</p>
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      </div>
    </div>
  );
};

export default JobApplications;
