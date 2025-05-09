
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import { Calendar as CalendarIcon, Search, Filter, Clock, User, ChevronDown } from "lucide-react";
import { format } from "date-fns";

// Mock data for available workers
type TimeSlot = {
  start: string;
  end: string;
};

type Worker = {
  id: number;
  name: string;
  rating: number;
  completedJobs: number;
  availabilitySlots: TimeSlot[];
  skills: string[];
};

const FindWorkers = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState<string | undefined>();
  const [timeFilter, setTimeFilter] = useState<string | undefined>();
  
  // Mock data for workers with availability on the selected date
  const mockWorkers: Worker[] = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      rating: 4.8,
      completedJobs: 15,
      availabilitySlots: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" }
      ],
      skills: ["Waiter", "Bartender", "Customer Service"]
    },
    {
      id: 2,
      name: "Trần Thị B",
      rating: 4.5,
      completedJobs: 8,
      availabilitySlots: [
        { start: "09:00", end: "17:00" }
      ],
      skills: ["Office Assistant", "Data Entry", "Customer Service"]
    },
    {
      id: 3,
      name: "Lê Văn C",
      rating: 4.2,
      completedJobs: 12,
      availabilitySlots: [
        { start: "12:00", end: "16:00" },
        { start: "18:00", end: "22:00" }
      ],
      skills: ["Event Staff", "Security", "Customer Service"]
    },
    {
      id: 4,
      name: "Phạm Minh D",
      rating: 4.7,
      completedJobs: 20,
      availabilitySlots: [
        { start: "08:00", end: "12:00" },
        { start: "16:00", end: "20:00" }
      ],
      skills: ["Warehouse", "Delivery", "Logistics"]
    }
  ];

  // All unique skills for filtering
  const allSkills = Array.from(new Set(mockWorkers.flatMap(worker => worker.skills)));
  
  // Common time slots for filtering
  const timeSlots = [
    "Morning (8:00 - 12:00)",
    "Afternoon (12:00 - 16:00)",
    "Evening (16:00 - 20:00)",
    "Night (20:00 - 24:00)"
  ];

  // Filter workers based on search term, skills and time
  const filteredWorkers = mockWorkers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = !skillFilter || worker.skills.includes(skillFilter);
    
    let matchesTime = true;
    if (timeFilter) {
      if (timeFilter === "Morning (8:00 - 12:00)") {
        matchesTime = worker.availabilitySlots.some(
          slot => slot.start <= "08:00" && slot.end >= "12:00"
        );
      } else if (timeFilter === "Afternoon (12:00 - 16:00)") {
        matchesTime = worker.availabilitySlots.some(
          slot => slot.start <= "12:00" && slot.end >= "16:00"
        );
      } else if (timeFilter === "Evening (16:00 - 20:00)") {
        matchesTime = worker.availabilitySlots.some(
          slot => slot.start <= "16:00" && slot.end >= "20:00"
        );
      } else if (timeFilter === "Night (20:00 - 24:00)") {
        matchesTime = worker.availabilitySlots.some(
          slot => slot.start <= "20:00" && slot.end >= "24:00"
        );
      }
    }
    
    return matchesSearch && matchesSkill && matchesTime;
  });

  return (
    <Layout showFooter={false}>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Find Available Workers</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Date selection */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h2 className="text-lg font-medium mb-4 flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Select Date
                </h2>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => {
                    // Disable dates in the past
                    return date < new Date(new Date().setHours(0, 0, 0, 0));
                  }}
                />
              </div>
              
              {/* Additional filters */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h2 className="text-lg font-medium mb-4 flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </h2>
                
                {/* Skill filter */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills
                  </label>
                  <Select value={skillFilter} onValueChange={setSkillFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a skill" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={undefined}>All Skills</SelectItem>
                      {allSkills.map(skill => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Time slot filter */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Slot
                  </label>
                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={undefined}>All Times</SelectItem>
                      {timeSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Reset filters button */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("");
                    setSkillFilter(undefined);
                    setTimeFilter(undefined);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
            
            {/* Workers list */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-4">
                    Available Workers for {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Selected Date"}
                  </h2>
                  
                  {/* Search bar */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search workers by name..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {/* Results count */}
                  <p className="text-sm text-gray-500">
                    Found {filteredWorkers.length} available worker{filteredWorkers.length !== 1 ? "s" : ""}
                  </p>
                </div>
                
                {filteredWorkers.length > 0 ? (
                  <div className="overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Worker</TableHead>
                          <TableHead className="w-[120px]">Rating</TableHead>
                          <TableHead className="hidden md:table-cell">Skills</TableHead>
                          <TableHead>Availability</TableHead>
                          <TableHead className="text-right"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredWorkers.map((worker) => (
                          <TableRow key={worker.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2">
                                  <User className="h-5 w-5" />
                                </div>
                                {worker.name}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {worker.completedJobs} jobs completed
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <span className="font-medium">{worker.rating}</span>
                                <svg className="w-4 h-4 text-yellow-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex flex-wrap gap-1">
                                {worker.skills.map((skill, index) => (
                                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {worker.availabilitySlots.map((slot, index) => (
                                  <div key={index} className="flex items-center">
                                    <Clock className="h-3.5 w-3.5 text-gray-500 mr-1" />
                                    <span className="text-sm">{slot.start} - {slot.end}</span>
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button size="sm">Contact</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">No available workers found for this date with the selected filters.</p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setSkillFilter(undefined);
                        setTimeFilter(undefined);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FindWorkers;
