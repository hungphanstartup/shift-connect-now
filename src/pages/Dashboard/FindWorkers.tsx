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
  location: { city: string; district: string; address: string };
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
      skills: ["Waiter", "Bartender", "Customer Service"],
      location: { city: "Hồ Chí Minh", district: "Quận 1", address: "" },
    },
    {
      id: 2,
      name: "Trần Thị B",
      rating: 4.5,
      completedJobs: 8,
      availabilitySlots: [
        { start: "09:00", end: "17:00" }
      ],
      skills: ["Office Assistant", "Data Entry", "Customer Service"],
      location: { city: "Hồ Chí Minh", district: "Thủ Đức", address: "" },
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
      skills: ["Event Staff", "Security", "Customer Service"],
      location: { city: "Hồ Chí Minh", district: "Quận 7", address: "" },
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
      skills: ["Warehouse", "Delivery", "Logistics"],
      location: { city: "Hồ Chí Minh", district: "Quận 3", address: "" },
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
    <Layout>
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="relative max-w-xl mx-auto mb-8">
            <form className="flex items-center bg-white rounded-full shadow px-4 py-2 border w-full" onSubmit={e => {e.preventDefault();}}>
              <input
                type="text"
                placeholder="Tìm kiếm người lao động..."
                className="flex-1 bg-transparent outline-none px-4 py-3 text-gray-700 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex items-center border-l h-8 mx-2 pl-4">
                <span className="text-gray-500 flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <select className="bg-transparent outline-none text-gray-700" value={skillFilter || ''} onChange={e => setSkillFilter(e.target.value || undefined)}>
                    <option value="">Tất cả kỹ năng</option>
                    {allSkills.map(skill => <option key={skill} value={skill}>{skill}</option>)}
                  </select>
                </span>
              </div>
              <button type="submit" className="ml-4 flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full transition">
                <Search className="w-5 h-5 mr-2" />
                Tìm kiếm
              </button>
            </form>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-gray-500 mr-2">Thời gian:</span>
            {timeSlots.map(slot => (
              <Button
                key={slot}
                variant={timeFilter === slot ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setTimeFilter(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>

          {/* Render filtered workers */}
          <div className="space-y-4">
            {filteredWorkers.map(worker => (
              <div key={worker.id} className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold">{worker.name}</h3>
                <p className="text-gray-600">Rating: {worker.rating}</p>
                <p className="text-gray-600">Completed Jobs: {worker.completedJobs}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {worker.skills.map(skill => (
                    <span key={skill} className="bg-gray-100 text-gray-600 text-xs font-medium py-1 px-2 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                <span>{worker.location.district}, {worker.location.city}, {worker.location.address}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FindWorkers;
