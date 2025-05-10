import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, Search, MapPin } from "lucide-react";
import { supabase } from '../lib/supabase';
import { jobIndustries, cities, timeRanges, districtsByCity } from '@/mock/jobsMockData';

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Tất cả");
  const [district, setDistrict] = useState("Tất cả");
  const [timeRange, setTimeRange] = useState("Tất cả");
  const [industry, setIndustry] = useState("Tất cả");
  // Popup state
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [cityPopup, setCityPopup] = useState("");
  const [districtPopup, setDistrictPopup] = useState("");
  const [cityFilterInput, setCityFilterInput] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      let query = supabase.from('jobs').select('*'); 

      if (searchTerm) {
        query = query.ilike('job_title', `%${searchTerm}%`);
      }
      if (city && city !== "Tất cả") {
        query = query.eq('city', city);
      }
      if (district && district !== "Tất cả") {
        query = query.eq('district', district);
      }
      if (industry && industry !== "Tất cả") {
        query = query.eq('industry', industry);
      }
      if (timeRange && timeRange !== "Tất cả") {
        if (timeRange === "Sáng") query = query.filter('time', 'ilike', '%AM%');
        if (timeRange === "Chiều") query = query.filter('time', 'ilike', '%PM%');
        if (timeRange === "Tối") query = query.filter('time', 'ilike', '%PM%');
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
      } else {
        const transformedData = data.map(job => ({
          id: job.id,
          title: job.job_title,
          company: job.company_name,
          location: {
            city: job.city,
            district: job.district,
            address: job.address
          },
          date: job.date,
          time: job.time,
          hours: job.hours,
          hourlyRate: job.hourly_rate,
          postedDays: job.posted_days,
          employerId: job.employer_id,
          industry: job.industry
        }));
        setJobs(transformedData);
      }
      setLoading(false);
    };
    fetchJobs();
  }, [searchTerm, city, district, industry, timeRange]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const handleCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    setDistrict("Tất cả");
  };
  const handleDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDistrict(e.target.value);
  };
  const handleTimeRange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
  };
  const handleIndustry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIndustry(e.target.value);
  };
  const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const avgHourlyRate = jobs.length > 0 ? Number((jobs.reduce((acc, j) => acc + (j.hourly_rate || 0), 0) / jobs.length).toFixed(2)) : 0;

  return (
    <Layout>
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {/* Thanh tìm kiếm mới */}
          <form onSubmit={handleSearch} className="w-full flex items-center bg-white rounded-full shadow px-4 py-2 border mb-8">
            <input
              type="text"
              placeholder="Vị trí tuyển dụng, tên công ty"
              className="flex-1 bg-transparent outline-none px-4 py-3 text-gray-700 placeholder-gray-400"
              value={searchTerm}
              onChange={handleLocation}
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

          {/* Bộ lọc công việc, thời gian, ngành nghề, quick filter */}
          <div className="bg-white rounded-lg shadow-sm border p-5 mb-8 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500 mr-2">Thời gian:</span>
              <select className="form-select rounded-md" value={timeRange} onChange={handleTimeRange}>
                {timeRanges.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500 mr-2">Ngành nghề:</span>
              {jobIndustries.map(ind => (
                <Button
                  key={ind}
                  variant={industry === ind ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => { setIndustry(ind); }}
                  type="button"
                >
                  {ind}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500 mr-2">Quick Filters:</span>
              <Button variant="outline" size="sm">Hôm nay</Button>
              <Button variant="outline" size="sm">Cuối tuần</Button>
              <Button variant="outline" size="sm">Tuần này</Button>
              <Button variant="outline" size="sm">Ca sáng</Button>
              <Button variant="outline" size="sm">Ca tối</Button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-6">Công việc đang tuyển ({jobs.length})</h2>
            
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 mb-4">Không tìm thấy công việc phù hợp với tìm kiếm của bạn.</p>
                <Button onClick={() => {setSearchTerm("");}}>
                  Đặt lại tìm kiếm
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <div className="flex items-center">
                        <p className="text-gray-600 text-sm">{job.company}</p>
                        <Link 
                          to={`/employers/${job.employerId || job.id}/schedule`} 
                          className="ml-2 text-brand-600 text-xs hover:underline"
                        >
                          Xem tất cả lịch tuyển dụng
                        </Link>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar size={16} className="mr-2" />
                          <span>{job.date} • {job.time}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{job.location.district}, {job.location.city}, {job.location.address}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="bg-gray-200 text-gray-700 text-xs font-medium py-1 px-2 rounded">
                          {job.industry}
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium py-1 px-2 rounded">
                          {job.hours} giờ
                        </span>
                        <span className="bg-brand-100 text-brand-700 text-xs font-medium py-1 px-2 rounded">
                          {job.hourlyRate.toLocaleString()} VNĐ/giờ
                        </span>
                        {job.postedDays === 0 ? (
                          <span className="bg-success-100 text-success-700 text-xs font-medium py-1 px-2 rounded">
                            Mới hôm nay
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-auto flex flex-col items-end pt-4">
                      <Link to={`/jobs/${job.id}`}>
                        <Button className="w-full md:w-auto">Xem chi tiết</Button>
                      </Link>
                      <p className="text-xs text-gray-500 mt-2">
                        {job.postedDays === 0 ? "Đăng hôm nay" : 
                        job.postedDays === 1 ? "Đăng hôm qua" : 
                        `Đăng ${job.postedDays} ngày trước`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;
