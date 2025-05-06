
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Calendar as CalendarIcon } from "lucide-react";

// Mock recruitment schedule data
const mockScheduleData = {
  employer: {
    id: 1,
    name: "Cafe XYZ",
    logo: "/placeholder.svg",
    description: "A popular cafe located in the heart of District 1, known for their excellent coffee and brunch menu."
  },
  recruitmentDates: [
    {
      id: 1,
      date: "May 10, 2025",
      jobTitle: "Restaurant Server",
      location: "District 1, Ho Chi Minh City",
      time: "6:00 PM - 10:00 PM",
      positions: 3,
      hourlyRate: 12,
      filled: 2,
      applicants: 5,
    },
    {
      id: 2,
      date: "May 15, 2025",
      jobTitle: "Event Staff",
      location: "District 7, Ho Chi Minh City",
      time: "3:00 PM - 9:00 PM",
      positions: 3,
      hourlyRate: 15,
      filled: 0,
      applicants: 2,
    },
    {
      id: 3,
      date: "May 18, 2025",
      jobTitle: "Kitchen Helper",
      location: "District 1, Ho Chi Minh City",
      time: "12:00 PM - 8:00 PM",
      positions: 2,
      hourlyRate: 11,
      filled: 0,
      applicants: 0,
    },
    {
      id: 4,
      date: "May 20, 2025",
      jobTitle: "Barista",
      location: "District 3, Ho Chi Minh City",
      time: "8:00 AM - 4:00 PM",
      positions: 1,
      hourlyRate: 13,
      filled: 0,
      applicants: 1,
    }
  ]
};

const EmployerSchedulePage = () => {
  const { id } = useParams<{ id: string }>();
  const [scheduleView, setScheduleView] = useState<"list" | "calendar">("list");
  const [searchTerm, setSearchTerm] = useState("");
  
  // In a real application, you would fetch the employer's data based on the ID
  const employerData = mockScheduleData.employer;
  
  // Filter recruitment dates based on search term
  const filteredDates = mockScheduleData.recruitmentDates.filter(date => 
    date.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    date.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    date.date.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-500">
            <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <Link to="/employers" className="hover:text-brand-600 transition-colors">Employers</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">{employerData.name}</span>
          </div>
          
          {/* Employer Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="bg-gray-100 rounded-lg p-4 w-24 h-24 flex items-center justify-center">
                <img 
                  src={employerData.logo} 
                  alt={`${employerData.name} logo`}
                  className="max-w-full max-h-full"
                />
              </div>
              
              <div className="flex-grow">
                <h1 className="text-2xl font-bold mb-2">{employerData.name}</h1>
                <p className="text-gray-600">{employerData.description}</p>
              </div>
              
              <div>
                <Button asChild>
                  <Link to={`/jobs?employer=${employerData.id}`}>
                    View All Jobs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Recruitment Schedule */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-xl font-semibold">Recruitment Schedule</h2>
                <p className="text-gray-500">Upcoming recruitment dates for {employerData.name}</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Input
                    type="text"
                    placeholder="Search schedules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="flex gap-2 self-end">
                  <Button 
                    variant={scheduleView === "list" ? "default" : "outline"} 
                    onClick={() => setScheduleView("list")}
                    size="sm"
                  >
                    List View
                  </Button>
                  <Button 
                    variant={scheduleView === "calendar" ? "default" : "outline"} 
                    onClick={() => setScheduleView("calendar")}
                    size="sm"
                  >
                    Calendar
                  </Button>
                </div>
              </div>
            </div>
            
            {scheduleView === "list" ? (
              // List View
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Open Positions</TableHead>
                      <TableHead>Pay Rate</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDates.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          No recruitment dates found matching your search.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDates.map(date => (
                        <TableRow key={date.id}>
                          <TableCell>
                            <div className="font-medium">{date.date}</div>
                          </TableCell>
                          <TableCell>{date.jobTitle}</TableCell>
                          <TableCell>{date.location}</TableCell>
                          <TableCell>{date.time}</TableCell>
                          <TableCell>
                            {date.filled}/{date.positions} filled
                          </TableCell>
                          <TableCell>${date.hourlyRate}/hour</TableCell>
                          <TableCell>
                            {date.applicants > 0 ? (
                              <span className="bg-blue-100 text-blue-700 text-xs font-medium rounded px-2 py-1">
                                {date.applicants} applicants
                              </span>
                            ) : (
                              <span className="bg-gray-100 text-gray-600 text-xs font-medium rounded px-2 py-1">
                                No applicants
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button size="sm" asChild>
                              <Link to={`/jobs/${date.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              // Calendar View
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredDates.length === 0 ? (
                  <div className="md:col-span-2 lg:col-span-3 text-center py-12 text-gray-500">
                    No recruitment dates found matching your search.
                  </div>
                ) : (
                  filteredDates.map(date => (
                    <Card key={date.id} className="overflow-hidden">
                      <CardHeader className="bg-gray-50 pb-3">
                        <CardTitle className="text-lg flex items-center">
                          <CalendarIcon className="w-5 h-5 mr-2 text-brand-600" />
                          {date.date}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold text-lg mb-2">{date.jobTitle}</h3>
                        
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex items-center text-gray-700">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            {date.time}
                          </div>
                          <div className="flex items-center text-gray-700">
                            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                            {date.location}
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Users className="w-4 h-4 mr-2 text-gray-500" />
                            {date.filled}/{date.positions} positions filled
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            ${date.hourlyRate}/hour
                          </span>
                          <Button size="sm" asChild>
                            <Link to={`/jobs/${date.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerSchedulePage;
