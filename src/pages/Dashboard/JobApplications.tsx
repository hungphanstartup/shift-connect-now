
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
    jobTitle: "Phục vụ nhà hàng",
    company: "Quán cà phê Downtown",
    companyLogo: "/placeholder.svg",
    location: "Quận 1, Hồ Chí Minh",
    date: "12/05/2025",
    timeRange: "18:00 - 22:00",
    hourlyRate: 12,
    status: "pending",
    appliedDate: "05/05/2025"
  },
  {
    id: 2,
    jobTitle: "Nhân viên sự kiện",
    company: "Trung tâm hội nghị",
    companyLogo: "/placeholder.svg",
    location: "Quận 7, Hồ Chí Minh",
    date: "15/05/2025",
    timeRange: "14:00 - 22:00",
    hourlyRate: 15,
    status: "accepted",
    appliedDate: "03/05/2025"
  },
  {
    id: 3,
    jobTitle: "Trợ lý văn phòng",
    company: "Business Solutions Inc",
    companyLogo: "/placeholder.svg",
    location: "Quận 4, Hồ Chí Minh",
    date: "18/05/2025",
    timeRange: "9:00 - 17:00",
    hourlyRate: 14,
    status: "declined",
    appliedDate: "02/05/2025",
    declineReason: "Vị trí đã được tuyển đủ"
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
          <h1 className="text-2xl font-bold mb-6">Đơn ứng tuyển của tôi</h1>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex mb-6">
                <TabsTrigger value="all">Tất cả đơn</TabsTrigger>
                <TabsTrigger value="pending">Đang chờ</TabsTrigger>
                <TabsTrigger value="accepted">Đã chấp nhận</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">Không tìm thấy đơn ứng tuyển nào.</p>
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
                    <p className="text-gray-500">Không có đơn ứng tuyển nào đang chờ.</p>
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
                    <p className="text-gray-500">Không có đơn ứng tuyển nào được chấp nhận.</p>
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
        return <Badge variant="outline" className="flex items-center gap-1 bg-yellow-50 text-yellow-700 border-yellow-200"><ClockIcon size={14} />Đang chờ</Badge>;
      case "accepted":
        return <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200"><Check size={14} />Đã chấp nhận</Badge>;
      case "declined":
        return <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200"><X size={14} />Đã từ chối</Badge>;
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
              <span>{application.hourlyRate} VNĐ/giờ</span>
            </div>
          </div>
          
          {application.declineReason && (
            <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded">
              <strong>Lý do:</strong> {application.declineReason}
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end">
          <div className="mb-2">
            {getStatusBadge(application.status)}
          </div>
          <p className="text-xs text-gray-500 mb-3">Ứng tuyển vào {application.appliedDate}</p>
          <Button variant="outline" size="sm">Xem chi tiết</Button>
        </div>
      </div>
    </div>
  );
};

export default JobApplications;
