
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Plus, Save, Trash2 } from "lucide-react";

type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
};

type DailyAvailability = {
  [key: string]: TimeSlot[];
};

const WorkerAvailability = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [availability, setAvailability] = useState<DailyAvailability>({});
  
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const dateString = formatDate(date);
    
    // Check if date is already selected, if yes, remove it
    if (selectedDates.some(d => formatDate(d) === dateString)) {
      setSelectedDates(selectedDates.filter(d => formatDate(d) !== dateString));
      
      // Also remove time slots for this date
      const newAvailability = { ...availability };
      delete newAvailability[dateString];
      setAvailability(newAvailability);
    } else {
      setSelectedDates([...selectedDates, date]);
      
      // Initialize empty time slots for this date
      setAvailability({
        ...availability,
        [dateString]: []
      });
    }
  };
  
  const addTimeSlot = (dateString: string) => {
    const newSlot: TimeSlot = {
      id: `slot-${Date.now()}`,
      startTime: "09:00",
      endTime: "17:00"
    };
    
    setAvailability({
      ...availability,
      [dateString]: [...(availability[dateString] || []), newSlot]
    });
  };
  
  const removeTimeSlot = (dateString: string, slotId: string) => {
    setAvailability({
      ...availability,
      [dateString]: availability[dateString].filter(slot => slot.id !== slotId)
    });
  };
  
  const updateTimeSlot = (dateString: string, slotId: string, field: 'startTime' | 'endTime', value: string) => {
    setAvailability({
      ...availability,
      [dateString]: availability[dateString].map(slot => 
        slot.id === slotId ? { ...slot, [field]: value } : slot
      )
    });
  };
  
  const handleSave = () => {
    // In a real app, this would save to a database
    console.log("Saving availability:", { availability });
    toast.success("Availability saved successfully");
  };

  return (
    <Layout showFooter={false}>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Set Your Availability</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <CalendarIcon className="mr-2 h-5 w-5 text-brand-600" />
                <h2 className="text-lg font-semibold">Select Available Dates</h2>
              </div>
              <p className="text-gray-500 mb-4 text-sm">Click on dates to mark them as available for work.</p>
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={(value) => {
                  // Handle the type issue by treating single Date as an array with one item
                  if (value instanceof Date) {
                    handleDateSelect(value);
                  } else if (Array.isArray(value)) {
                    // When a date is selected or deselected, the last one in the array is the one that changed
                    const lastSelectedDate = value.length > 0 ? value[value.length - 1] : undefined;
                    handleDateSelect(lastSelectedDate);
                  }
                }}
                className="rounded-md border"
                disabled={(date) => {
                  // Disable dates in the past
                  return date < new Date(new Date().setHours(0, 0, 0, 0));
                }}
              />
            </div>
            
            {/* Time slots section */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Available Time Slots</h2>
              
              {selectedDates.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">Please select dates on the calendar first.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {selectedDates.sort((a, b) => a.getTime() - b.getTime()).map((date) => {
                      const dateString = formatDate(date);
                      return (
                        <div key={dateString} className="border-b border-gray-100 pb-4 last:border-b-0">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-medium">{date.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                            <Button 
                              type="button" 
                              size="sm" 
                              onClick={() => addTimeSlot(dateString)}
                              className="flex items-center gap-1"
                            >
                              <Plus size={14} />
                              Add Time Slot
                            </Button>
                          </div>
                          
                          {(!availability[dateString] || availability[dateString].length === 0) ? (
                            <p className="text-gray-500 text-sm italic mb-2">No time slots added yet. Click "Add Time Slot" to add your availability.</p>
                          ) : (
                            <div className="space-y-3">
                              {availability[dateString].map((slot) => (
                                <div key={slot.id} className="flex flex-wrap md:flex-nowrap items-center gap-3 bg-gray-50 p-3 rounded-md">
                                  <div className="flex items-center gap-2 w-full md:w-auto">
                                    <div className="w-full md:w-auto">
                                      <label className="text-sm text-gray-500 block mb-1">Start Time</label>
                                      <Input
                                        type="time"
                                        value={slot.startTime}
                                        onChange={(e) => updateTimeSlot(dateString, slot.id, 'startTime', e.target.value)}
                                        className="w-full md:w-auto"
                                      />
                                    </div>
                                    <span className="hidden md:inline mx-2">to</span>
                                    <div className="w-full md:w-auto mt-2 md:mt-0">
                                      <label className="text-sm text-gray-500 block mb-1">End Time</label>
                                      <Input
                                        type="time"
                                        value={slot.endTime}
                                        onChange={(e) => updateTimeSlot(dateString, slot.id, 'endTime', e.target.value)}
                                        className="w-full md:w-auto"
                                      />
                                    </div>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeTimeSlot(dateString, slot.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-2 md:mt-0 w-full md:w-auto md:ml-auto"
                                  >
                                    <Trash2 size={14} className="mr-1" />
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6">
                    <Button onClick={handleSave} className="flex items-center gap-2">
                      <Save size={16} />
                      Save Availability
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkerAvailability;
