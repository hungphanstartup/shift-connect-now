import { useState, useEffect } from "react";
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
    location: { city: "Hồ Chí Minh", district: "Quận 1", address: "123 Le Loi Street" },
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
    location: { city: "Hồ Chí Minh", district: "Thủ Đức", address: "456 Vo Van Ngan" },
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
    location: { city: "Hồ Chí Minh", district: "Quận 1", address: "789 Nguyen Hue" },
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
    location: { city: "Hồ Chí Minh", district: "Quận 3", address: "321 Le Van Sy" },
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
    location: { city: "Hồ Chí Minh", district: "Quận 3", address: "654 Tran Quang Dieu" },
    industry: "Events & Entertainment",
    jobsAvailable: 4,
    rating: 4.7,
    reviews: 22,
  },
];

const cities = [
  "Tất cả", "Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Bình Dương", "Bắc Ninh", "Đồng Nai", "Hưng Yên", "Hải Dương"
];
const districtsByCity = {
  "Hồ Chí Minh": ["Tất cả", "Quận 1", "Quận 3", "Quận 7", "Thủ Đức", "Bình Thạnh", "Gò Vấp", "Tân Bình", "Khác"],
  "Hà Nội": ["Tất cả", "Ba Đình", "Hoàn Kiếm", "Đống Đa", "Cầu Giấy", "Thanh Xuân", "Khác"],
  "Đà Nẵng": ["Tất cả", "Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Khác"],
  "Cần Thơ": ["Tất cả", "Ninh Kiều", "Bình Thủy", "Cái Răng", "Khác"],
  "Bình Dương": ["Tất cả", "Thủ Dầu Một", "Dĩ An", "Thuận An", "Khác"],
  "Bắc Ninh": ["Tất cả", "TP Bắc Ninh", "Từ Sơn", "Khác"],
  "Đồng Nai": ["Tất cả", "Biên Hòa", "Long Khánh", "Khác"],
  "Hưng Yên": ["Tất cả", "TP Hưng Yên", "Khác"],
  "Hải Dương": ["Tất cả", "TP Hải Dương", "Khác"],
  "Tất cả": ["Tất cả"],
};

const jobIndustries = [
  "Tất cả", "Bảo vệ", "Công nhân", "Nhà hàng", "Bốc Vác"
];

const Employers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [city, setCity] = useState("Tất cả");
  const [district, setDistrict] = useState("Tất cả");
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [cityPopup, setCityPopup] = useState("");
  const [districtPopup, setDistrictPopup] = useState("");
  const [cityFilterInput, setCityFilterInput] = useState("");
  
  // Get unique industries for the filter
  const industries = jobIndustries;
  
  // Filter employers based on search term, industry, city, district
  const filteredEmployers = mockEmployers.filter(employer => {
    const matchesSearch = employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === "all" || employer.industry === industryFilter;
    const matchesCity = city === "Tất cả" || employer.location.city === city;
    const matchesDistrict = district === "Tất cả" || employer.location.district === district;
    return matchesSearch && matchesIndustry && matchesCity && matchesDistrict;
  });
  
  useEffect(() => {
    // Không cần reload, chỉ cần cập nhật state là filteredEmployers sẽ tự động cập nhật
  }, [city, district]);
  
  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="bg-brand-50 rounded-lg border border-brand-100 p-6 md:p-8 mb-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Tìm nhà tuyển dụng uy tín cho việc làm thời vụ
              </h1>
              <p className="text-gray-600 mb-6 text-lg">
                Khám phá danh sách nhà tuyển dụng uy tín với các vị trí việc làm thời vụ linh hoạt.
                Tìm kiếm cơ hội việc làm tiếp theo với các công ty uy tín.
              </p>
              <div className="relative max-w-xl mx-auto">
                <form className="flex items-center bg-white rounded-full shadow px-4 py-2 border w-full" onSubmit={e => {e.preventDefault();}}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm nhà tuyển dụng, địa điểm..."
                    className="flex-1 bg-transparent outline-none px-4 py-3 text-gray-700 placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div
                    className="flex items-center border-l h-8 mx-2 pl-4 cursor-pointer min-w-[160px]"
                    onClick={() => {
                      setShowLocationPopup(true);
                      setCityPopup(city === "Tất cả" ? "" : city);
                      setDistrictPopup(district === "Tất cả" ? "" : district);
                      setCityFilterInput("");
                    }}
                  >
                    <span className="text-gray-500 flex items-center select-none">
                      <MapPin className="w-4 h-4 mr-1" />
                      {city !== "Tất cả" ? city : "Địa điểm"}
                      {district !== "Tất cả" && city !== "Tất cả" ? `, ${district}` : ""}
                    </span>
                  </div>
                  <div className="flex items-center border-l h-8 mx-2 pl-4">
                    <span className="text-gray-500 flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      <select className="bg-transparent outline-none text-gray-700" value={industryFilter} onChange={e => setIndustryFilter(e.target.value)}>
                        {industries.map(ind => <option key={ind} value={ind}>{ind === 'Tất cả' ? 'Tất cả ngành nghề' : ind}</option>)}
                      </select>
                    </span>
                  </div>
                  <button type="submit" className="ml-4 flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full transition">
                    <Search className="w-5 h-5 mr-2" />
                    Tìm kiếm
                  </button>
                </form>
                {/* Popup chọn địa điểm */}
                {showLocationPopup && (
                  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[600px] max-w-full flex relative">
                      {/* Cột trái: Tỉnh/Thành phố */}
                      <div className="w-1/2 pr-4 border-r">
                        <input
                          type="text"
                          placeholder="Nhập Tỉnh/Thành phố"
                          className="w-full mb-2 border rounded-full px-3 py-2"
                          value={cityFilterInput}
                          onChange={e => setCityFilterInput(e.target.value)}
                        />
                        <ul className="max-h-64 overflow-y-auto">
                          {cities
                            .filter(c => c.toLowerCase().includes(cityFilterInput.toLowerCase()))
                            .map(c => (
                              <li
                                key={c}
                                className={`py-2 px-2 cursor-pointer rounded flex items-center gap-2 ${c === cityPopup ? "bg-green-100 font-semibold" : ""}`}
                                onClick={() => { setCityPopup(c); setDistrictPopup("Tất cả"); }}
                              >
                                <input type="radio" checked={c === cityPopup} readOnly />
                                {c}
                              </li>
                            ))}
                        </ul>
                      </div>
                      {/* Cột phải: Quận/Huyện */}
                      <div className="w-1/2 pl-4">
                        <div className="mb-2 font-semibold">QUẬN/HUYỆN</div>
                        {cityPopup && cityPopup !== "Tất cả" ? (
                          <ul className="max-h-64 overflow-y-auto">
                            {(districtsByCity[cityPopup] || []).map(d => (
                              <li
                                key={d}
                                className={`py-2 px-2 cursor-pointer rounded flex items-center gap-2 ${d === districtPopup ? "bg-green-100 font-semibold" : ""}`}
                                onClick={() => setDistrictPopup(d)}
                              >
                                <input type="radio" checked={d === districtPopup} readOnly />
                                {d}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-gray-400 text-center mt-8">Vui lòng chọn Tỉnh/Thành phố</div>
                        )}
                      </div>
                      {/* Nút áp dụng và bỏ chọn */}
                      <div className="absolute bottom-4 right-6 flex gap-2">
                        <button
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full border"
                          onClick={() => {
                            setCity("Tất cả");
                            setDistrict("Tất cả");
                            setShowLocationPopup(false);
                          }}
                        >
                          Bỏ chọn tất cả
                        </button>
                        <button
                          className="bg-green-500 text-white px-6 py-2 rounded-full"
                          onClick={() => {
                            setCity(cityPopup || "Tất cả");
                            setDistrict(districtPopup || "Tất cả");
                            setShowLocationPopup(false);
                          }}
                        >
                          Áp dụng
                        </button>
                      </div>
                      {/* Nút đóng */}
                      <button
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                        onClick={() => setShowLocationPopup(false)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            <p className="text-gray-700 mr-2 pt-1">Lọc theo ngành nghề:</p>
            {industries.map(industry => (
              <Button
                key={industry}
                variant={industryFilter === industry ? "default" : "outline"}
                size="sm"
                className="rounded-full capitalize"
                onClick={() => setIndustryFilter(industry)}
              >
                {industry === "Tất cả" ? "Tất cả ngành nghề" : industry}
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
                    setCity("Tất cả");
                    setDistrict("Tất cả");
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
                            <span>{employer.location.district}, {employer.location.city}, {employer.location.address}</span>
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
