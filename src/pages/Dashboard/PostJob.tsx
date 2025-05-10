import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, DollarSign, Check, ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

// City and district mapping data
const cities = [
  "Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Bình Dương", "Bắc Ninh", "Đồng Nai", "Hưng Yên", "Hải Dương"
];

const districtsByCity: Record<string, string[]> = {
  "Hồ Chí Minh": [
    "Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 9", "Quận 10",
    "Quận 11", "Quận 12", "Quận Bình Tân", "Quận Bình Thạnh", "Quận Gò Vấp", "Quận Phú Nhuận", "Quận Tân Bình", "Quận Tân Phú",
    "Quận Thủ Đức", "Huyện Bình Chánh", "Huyện Cần Giờ", "Huyện Củ Chi", "Huyện Hóc Môn", "Huyện Nhà Bè"
  ],
  "Hà Nội": [
    "Quận Ba Đình", "Quận Bắc Từ Liêm", "Quận Cầu Giấy", "Quận Đống Đa", "Quận Hà Đông", "Quận Hai Bà Trưng",
    "Quận Hoàn Kiếm", "Quận Hoàng Mai", "Quận Long Biên", "Quận Nam Từ Liêm", "Quận Tây Hồ", "Quận Thanh Xuân",
    "Huyện Ba Vì", "Huyện Chương Mỹ", "Huyện Đan Phượng", "Huyện Đông Anh", "Huyện Gia Lâm", "Huyện Hoài Đức",
    "Huyện Mê Linh", "Huyện Mỹ Đức", "Huyện Phú Xuyên", "Huyện Phúc Thọ", "Huyện Quốc Oai", "Huyện Sóc Sơn",
    "Huyện Thạch Thất", "Huyện Thanh Oai", "Huyện Thanh Trì", "Huyện Thường Tín", "Huyện Ứng Hòa"
  ],
  "Đà Nẵng": [
    "Quận Cẩm Lệ", "Quận Hải Châu", "Quận Liên Chiểu", "Quận Ngũ Hành Sơn", "Quận Sơn Trà", "Quận Thanh Khê",
    "Huyện Hòa Vang", "Huyện Hoàng Sa"
  ],
  "Cần Thơ": [
    "Quận Bình Thủy", "Quận Cái Răng", "Quận Ninh Kiều", "Quận Ô Môn", "Quận Thốt Nốt",
    "Huyện Cờ Đỏ", "Huyện Phong Điền", "Huyện Thới Lai", "Huyện Vĩnh Thạnh"
  ],
  "Bình Dương": [
    "Thành phố Thủ Dầu Một", "Thành phố Dĩ An", "Thành phố Thuận An", "Thành phố Bến Cát", "Thành phố Tân Uyên",
    "Huyện Bàu Bàng", "Huyện Bắc Tân Uyên", "Huyện Dầu Tiếng", "Huyện Phú Giáo"
  ],
  "Bắc Ninh": [
    "Thành phố Bắc Ninh", "Thành phố Từ Sơn", "Huyện Gia Bình", "Huyện Lương Tài", "Huyện Quế Võ",
    "Huyện Thuận Thành", "Huyện Tiên Du", "Huyện Yên Phong"
  ],
  "Đồng Nai": [
    "Thành phố Biên Hòa", "Thành phố Long Khánh", "Huyện Cẩm Mỹ", "Huyện Định Quán", "Huyện Long Thành",
    "Huyện Nhơn Trạch", "Huyện Tân Phú", "Huyện Thống Nhất", "Huyện Trảng Bom", "Huyện Vĩnh Cửu", "Huyện Xuân Lộc"
  ],
  "Hưng Yên": [
    "Thành phố Hưng Yên", "Huyện Ân Thi", "Huyện Khoái Châu", "Huyện Kim Động", "Huyện Mỹ Hào",
    "Huyện Phù Cừ", "Huyện Tiên Lữ", "Huyện Văn Giang", "Huyện Văn Lâm", "Huyện Yên Mỹ"
  ],
  "Hải Dương": [
    "Thành phố Hải Dương", "Thành phố Chí Linh", "Huyện Bình Giang", "Huyện Cẩm Giàng", "Huyện Gia Lộc",
    "Huyện Kim Thành", "Huyện Nam Sách", "Huyện Ninh Giang", "Huyện Thanh Hà", "Huyện Thanh Miện", "Huyện Tứ Kỳ"
  ]
};

const jobIndustries = [
  "Bảo vệ", "Công nhân", "Nhà hàng", "Bốc Vác"
];

const PostJobPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Form state
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [positions, setPositions] = useState("1");
  const [requirements, setRequirements] = useState("");
  const [industry, setIndustry] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [employerId, setEmployerId] = useState("");

  useEffect(() => {
    // Giả sử user_id được lưu ở localStorage
    const userId = localStorage.getItem("user_id");
    if (!userId) return;
    const fetchEmployer = async () => {
      const { data, error } = await supabase
        .from('employers')
        .select('id, company_name')
        .eq('user_id', userId)
        .single();
      if (data) {
        setCompanyName(data.company_name);
        setEmployerId(data.id);
      }
    };
    fetchEmployer();
  }, []);

  // Handle city change
  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict(""); // Reset district when city changes
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Tính toán số giờ làm việc
      const start = new Date(`2000-01-01T${startTime}`);
      const end = new Date(`2000-01-01T${endTime}`);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

      // Chuẩn bị dữ liệu job
      const newJob = {
        job_title: jobTitle,
        description: jobDescription,
        date,
        time: `${startTime} - ${endTime}`,
        hours,
        city: city || "",
        district: district || "",
        address: addressDetail || "",
        industry,
        hourly_rate: parseInt(hourlyRate),
        positions: parseInt(positions),
        requirements: requirements.split('\n').filter(req => req.trim()),
        created_at: new Date().toISOString(),
        company_name: companyName,
        employer_id: employerId
      };
      
      // Lưu vào Supabase
      const { error } = await supabase
        .from('jobs')
        .insert([newJob]);

      if (error) throw error;

      setShowSuccess(true);
      
      // Chuyển hướng sau khi đăng thành công
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Error posting job:", err);
      toast.error("Có lỗi xảy ra khi đăng việc. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout showFooter={false}>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back Link */}
          <Link to="/dashboard" className="inline-flex items-center text-gray-600 hover:text-brand-600 mb-6">
            <ArrowLeft size={16} className="mr-1" />
            <span>Quay lại Dashboard</span>
          </Link>
          
          {/* Success message */}
          {showSuccess && (
            <div className="bg-success-100 border border-success-200 text-success-800 rounded-md p-4 mb-6 flex items-center animate-fade-in">
              <Check className="w-5 h-5 mr-3 text-success-600" />
              <span>Đăng việc thành công! Đang chuyển hướng về dashboard...</span>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6">Đăng việc mới</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Job Details */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Thông tin cơ bản</h2>
                
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Tên công việc*
                  </label>
                  <Input
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Ví dụ: Phục vụ nhà hàng, Nhân viên sự kiện"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả công việc*
                  </label>
                  <textarea
                    id="jobDescription"
                    rows={4}
                    className="form-input"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Mô tả trách nhiệm và yêu cầu của công việc"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                    Ngành nghề*
                  </label>
                  <Select value={industry} onValueChange={setIndustry} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn ngành nghề" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobIndustries.map((ind) => (
                        <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                    Yêu cầu
                  </label>
                  <textarea
                    id="requirements"
                    rows={3}
                    className="form-input"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="Liệt kê các yêu cầu hoặc bằng cấp cụ thể"
                  />
                  <p className="text-xs text-gray-500 mt-1">Mỗi yêu cầu nên được viết trên một dòng mới</p>
                </div>
              </div>
              
              {/* Schedule Details */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Thông tin lịch làm việc</h2>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày làm việc*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <Input
                      id="date"
                      type="date"
                      className="pl-10"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Giờ bắt đầu*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Clock size={16} className="text-gray-400" />
                      </div>
                      <Input
                        id="startTime"
                        type="time"
                        className="pl-10"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Giờ kết thúc*
                    </label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Location and Compensation */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Địa điểm & Lương</h2>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    Tỉnh/Thành phố*
                  </label>
                  <Select value={city} onValueChange={handleCityChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((cityName) => (
                        <SelectItem key={cityName} value={cityName}>
                          {cityName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                    Quận/Huyện*
                  </label>
                  <Select 
                    value={district} 
                    onValueChange={setDistrict}
                    disabled={!city}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={city ? "Chọn Quận/Huyện" : "Vui lòng chọn Tỉnh/Thành phố trước"} />
                    </SelectTrigger>
                    <SelectContent>
                      {city && districtsByCity[city]?.map((districtName) => (
                        <SelectItem key={districtName} value={districtName}>
                          {districtName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="addressDetail" className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ chi tiết
                  </label>
                  <Input
                    id="addressDetail"
                    value={addressDetail}
                    onChange={(e) => setAddressDetail(e.target.value)}
                    placeholder="Nhập địa chỉ chi tiết"
                  />
                </div>

                <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">
                    Lương theo giờ* (VNĐ)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <DollarSign size={16} className="text-gray-400" />
                    </div>
                    <Input
                      id="hourlyRate"
                      type="number"
                      className="pl-10 pr-16"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      placeholder="Nhập lương theo giờ (VNĐ)"
                      min="0"
                      required
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-sm pointer-events-none">VNĐ</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="positions" className="block text-sm font-medium text-gray-700 mb-1">
                    Số lượng vị trí*
                  </label>
                  <Input
                    id="positions"
                    type="number"
                    min="1"
                    value={positions}
                    onChange={(e) => setPositions(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  disabled={isSubmitting}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Đang đăng...
                    </>
                  ) : (
                    "Đăng việc"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostJobPage;
