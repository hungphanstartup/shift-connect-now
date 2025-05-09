
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Save } from "lucide-react";

const WorkerAvailability = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [timeSlots, setTimeSlots] = useState<{[key: string]: string[]}>({});
  
  const timeOptions = [
    "8:00 AM - 12:00 PM",
    "12:00 PM - 4:00 PM",
    "4:00 PM - 8:00 PM",
    "8:00 PM - 12:00 AM"
  ];
  
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
      const newTimeSlots = { ...timeSlots };
      delete newTimeSlots[dateString];
      setTimeSlots(newTimeSlots);
    } else {
      setSelectedDates([...selectedDates, date]);
      
      // Initialize empty time slots for this date
      setTimeSlots({
        ...timeSlots,
        [dateString]: []
      });
    }
  };
  
  const handleTimeSlotToggle = (date: string, timeSlot: string) => {
    const currentTimeSlotsForDate = timeSlots[date] || [];
    
    if (currentTimeSlotsForDate.includes(timeSlot)) {
      // Remove time slot
      setTimeSlots({
        ...timeSlots,
        [date]: currentTimeSlotsForDate.filter(t => t !== timeSlot)
      });
    } else {
      // Add time slot
      setTimeSlots({
        ...timeSlots,
        [date]: [...currentTimeSlotsForDate, timeSlot]
      });
    }
  };
  
  const handleSave = () => {
    // In a real app, this would save to a database
    console.log("Saving availability:", { timeSlots });
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
                onSelect={(value) => handleDateSelect(value as Date)}
                className="rounded-md border"
                disabled={(date) => {
                  // Disable dates in the past
                  return date < new Date(new Date().setHours(0, 0, 0, 0));
                }}
              />
            </div>
            
            {/* Time slots section */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Time Slots</h2>
              
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
                          <h3 className="font-medium mb-2">{date.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {timeOptions.map((timeSlot) => (
                              <div key={`${dateString}-${timeSlot}`} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`${dateString}-${timeSlot}`}
                                  checked={timeSlots[dateString]?.includes(timeSlot) || false}
                                  onChange={() => handleTimeSlotToggle(dateString, timeSlot)}
                                  className="mr-2"
                                />
                                <label htmlFor={`${dateString}-${timeSlot}`} className="text-sm">
                                  {timeSlot}
                                </label>
                              </div>
                            ))}
                          </div>
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
