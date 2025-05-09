
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Briefcase, Users, Star } from "lucide-react";

// Mock data for employers
const mockEmployers = [
  {
    id: 1,
    name: "Cafe XYZ",
    logo: "/placeholder.svg",
    description: "Popular cafe located in District 1, known for excellent coffee and brunch menu.",
    location: "District 1, Ho Chi Minh City",
    industry: "Food & Beverage",
    jobsAvailable: 3,
    rating: 4.8,
    reviews: 24,
  },
  {
    id: 2,
    name: "Tech Solutions Inc.",
    logo: "/placeholder.svg",
    description: "IT services company specializing in software development and tech support.",
    location: "District 7, Ho Chi Minh City",
    industry: "Information Technology",
    jobsAvailable: 5,
    rating: 4.5,
    reviews: 17,
  },
  {
    id: 3,
    name: "Grand Hotel",
    logo: "/placeholder.svg",
    description: "Luxury hotel in the heart of the city offering various hospitality positions.",
    location: "District 1, Ho Chi Minh City",
    industry: "Hospitality",
    jobsAvailable: 8,
    rating: 4.2,
    reviews: 31,
  },
  {
    id: 4,
    name: "Modern Retail",
    logo: "/placeholder.svg",
    description: "Retail chain with multiple locations across the city.",
    location: "Multiple Locations, Ho Chi Minh City",
    industry: "Retail",
    jobsAvailable: 6,
    rating: 4.0,
    reviews: 15,
  },
  {
    id: 5,
    name: "Event Masters",
    logo: "/placeholder.svg",
    description: "Event planning and management company organizing corporate and social events.",
    location: "District 3, Ho Chi Minh City",
    industry: "Events & Entertainment",
    jobsAvailable: 4,
    rating: 4.7,
    reviews: 22,
  },
];

const Employers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  
  // Get unique industries for the filter
  const industries = ["all", ...Array.from(new Set(mockEmployers.map(employer => employer.industry)))];
  
  // Filter employers based on search term and industry filter
  const filteredEmployers = mockEmployers.filter(employer => {
    const matchesSearch = employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = industryFilter === "all" || employer.industry === industryFilter;
    
    return matchesSearch && matchesIndustry;
  });
  
  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="bg-brand-50 rounded-lg border border-brand-100 p-6 md:p-8 mb-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Find Great Employers for Temporary Jobs
              </h1>
              <p className="text-gray-600 mb-6 text-lg">
                Browse our curated list of employers offering flexible temporary positions.
                Find your next job opportunity with reputable companies.
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for employers by name or location..."
                  className="pl-10 py-6 pr-4 h-auto"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            <p className="text-gray-700 mr-2 pt-1">Filter by industry:</p>
            {industries.map(industry => (
              <Button
                key={industry}
                variant={industryFilter === industry ? "default" : "outline"}
                size="sm"
                onClick={() => setIndustryFilter(industry)}
                className="capitalize"
              >
                {industry === "all" ? "All Industries" : industry}
              </Button>
            ))}
          </div>
          
          {/* Employers List */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEmployers.length === 0 ? (
              <div className="md:col-span-2 lg:col-span-3 text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                <p className="text-gray-500 text-lg">No employers found matching your criteria.</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchTerm("");
                    setIndustryFilter("all");
                  }}
                >
                  Reset filters
                </Button>
              </div>
            ) : (
              filteredEmployers.map(employer => (
                <Card key={employer.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 w-16 h-16 flex items-center justify-center rounded-md flex-shrink-0">
                          <img 
                            src={employer.logo}
                            alt={`${employer.name} logo`}
                            className="max-w-full max-h-full p-2"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{employer.name}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin size={14} className="mr-1" />
                            <span>{employer.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {employer.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Briefcase size={14} className="mr-1" />
                          <span>{employer.industry}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users size={14} className="mr-1" />
                          <span>{employer.jobsAvailable} open positions</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm">
                          <Star size={14} className="text-yellow-500 mr-1" />
                          <span className="font-medium">{employer.rating}</span>
                          <span className="text-gray-500 ml-1">({employer.reviews} reviews)</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button asChild variant="outline" className="w-1/2">
                          <Link to={`/jobs?employer=${employer.id}`}>View Jobs</Link>
                        </Button>
                        <Button asChild className="w-1/2">
                          <Link to={`/employers/${employer.id}/schedule`}>Schedule</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Employers;
