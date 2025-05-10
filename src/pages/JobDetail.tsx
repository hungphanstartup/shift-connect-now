import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, DollarSign, Briefcase, Star, Building, Check, X, Search } from "lucide-react";
import { supabase } from '@/lib/supabase';
import { toast } from "sonner";

interface JobData {
  id: number;
  title: string;
  company: string;
  company_description: string;
  location: {
    city: string;
    district: string;
    address: string;
  };
  date: string;
  time: string;
  hours: number;
  hourly_rate: number;
  posted_days: number;
  positions: number;
  description: string;
  requirements: string[];
  application_count: number;
  employer_id: number;
  industry: string;
  company_name: string;
}

// Component cho form ứng tuyển
const ApplicationForm = ({ 
  jobData, 
  onClose, 
  onSuccess 
}: { 
  jobData: JobData; 
  onClose: () => void; 
  onSuccess: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availability, setAvailability] = useState("yes");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('job_applications')
        .insert([
          {
            job_id: jobData.id,
            availability: availability,
            message: message,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      toast.success("Ứng tuyển thành công!");
      onSuccess();
    } catch (err) {
      console.error('Error submitting application:', err);
      toast.error("Có lỗi xảy ra khi ứng tuyển. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Ứng tuyển {jobData.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bạn có sẵn sàng làm vào {jobData.date} từ {jobData.time} không?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="yes"
                  checked={availability === "yes"}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="mr-2"
                />
                Có
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  checked={availability === "no"}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="mr-2"
                />
                Không
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Lời nhắn (không bắt buộc)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={4}
              placeholder="Giới thiệu bản thân hoặc lý do bạn muốn ứng tuyển..."
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Đang gửi..." : "Gửi đơn ứng tuyển"}
          </Button>
        </form>
      </div>
    </div>
  );
};

// Component cho thông tin công việc
const JobInfo = ({ jobData }: { jobData: JobData }) => (
  <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
    <h2 className="text-lg font-semibold mb-2">{jobData.title}</h2>
    <div className="flex items-center text-gray-600 mb-2">
      <span className="mr-2">{jobData.company_name}</span>
      <Link
        to={`/employers/${jobData.employer_id}/schedule`}
        className="ml-2 text-brand-600 text-xs hover:underline"
      >
        Xem tất cả lịch tuyển dụng
      </Link>
    </div>
    <div className="space-y-2 text-sm mb-2">
      <div className="flex items-center text-gray-500">
        <Calendar size={16} className="mr-1" />
        <span>{jobData.date}</span>
      </div>
      <div className="flex items-center text-gray-500">
        <Clock size={16} className="mr-1" />
        <span>{jobData.time}</span>
      </div>
      <div className="flex items-center text-gray-500">
        <MapPin size={16} className="mr-1" />
        <span>
          {jobData.location.district || ""}, {jobData.location.city || ""}, {jobData.location.address || ""}
        </span>
      </div>
      <div className="flex items-center text-gray-500">
        <DollarSign size={16} className="mr-1" />
        <span>{jobData.hourly_rate.toLocaleString()} VNĐ/giờ</span>
      </div>
      <div className="flex items-center text-gray-500">
        <span>Số lượng: {jobData.positions}</span>
      </div>
      <div className="flex items-center text-gray-500">
        <span className="bg-gray-200 text-gray-700 text-xs font-medium py-1 px-2 rounded mr-2">
          {jobData.industry}
        </span>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="bg-gray-100 text-gray-600 text-xs font-medium py-1 px-2 rounded">
        {jobData.hours} giờ
      </span>
      <span className="bg-brand-100 text-brand-700 text-xs font-medium py-1 px-2 rounded">
        {jobData.positions} vị trí
      </span>
      <span className="bg-success-100 text-success-700 text-xs font-medium py-1 px-2 rounded">
        {jobData.posted_days === 0
          ? "Đăng hôm nay"
          : jobData.posted_days === 1
          ? "Đăng hôm qua"
          : `Đăng ${jobData.posted_days} ngày trước`}
      </span>
    </div>
  </div>
);

// Component cho chi tiết thanh toán
const PaymentDetails = ({ jobData }: { jobData: JobData }) => (
  <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
    <h3 className="text-lg font-semibold mb-2">Chi tiết thanh toán</h3>
    <div className="flex flex-col gap-2 text-sm">
      <div>Lương theo giờ: <span className="font-semibold">{jobData.hourly_rate.toLocaleString()} VNĐ/giờ</span></div>
      <div>Tổng thời gian: <span className="font-semibold">{jobData.hours} giờ</span></div>
      <div>Tổng thanh toán dự kiến: <span className="font-semibold">{(jobData.hourly_rate * jobData.hours).toLocaleString()} VNĐ</span></div>
    </div>
  </div>
);

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        if (data) {
          setJobData({
            ...data,
            location: {
              city: data.city,
              district: data.district,
              address: data.address
            }
          });
        }
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Không thể tải thông tin công việc');
        toast.error("Có lỗi xảy ra khi tải thông tin công việc");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobData();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Đang tải...</div>
        </div>
      </Layout>
    );
  }

  if (error || !jobData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">{error || 'Không tìm thấy công việc'}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-500">
            <Link to="/jobs" className="hover:text-brand-600 transition-colors">Jobs</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Chi tiết công việc</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cột trái: Mô tả, yêu cầu */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-semibold mb-4">Mô tả công việc</h2>
                <p className="text-gray-600 mb-6">{jobData.description}</p>
                <h3 className="text-lg font-semibold mb-3">Yêu cầu</h3>
                <ul className="list-disc pl-5 mb-6 text-gray-600 space-y-2">
                  {(jobData.requirements || []).map((req, idx) => <li key={idx}>{req}</li>)}
                </ul>
              </div>
              {/* Thông tin công ty */}
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-semibold mb-4">Về {jobData.company_name}</h2>
                <p className="text-gray-600">{jobData.company_description}</p>
              </div>
            </div>

            {/* Cột phải: Thông tin tuyển dụng, thanh toán, nút ứng tuyển */}
            <div className="md:col-span-1 space-y-6">
              <JobInfo jobData={jobData} />
              <PaymentDetails jobData={jobData} />
              <div className="mt-4">
                {!applicationSubmitted ? (
                  <Button onClick={() => setIsApplying(true)} className="w-full">
                    Ứng tuyển ngay
                  </Button>
                ) : (
                  <Button disabled className="w-full bg-success-500 hover:bg-success-500">
                    <Check size={16} className="mr-1" /> Đã ứng tuyển
                  </Button>
                )}
                <div className="text-xs text-gray-500 mt-2 text-center">
                  {jobData.application_count} người đã ứng tuyển
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          {isApplying && (
            <ApplicationForm
              jobData={jobData}
              onClose={() => setIsApplying(false)}
              onSuccess={() => {
                setApplicationSubmitted(true);
                setIsApplying(false);
              }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JobDetailPage;
