
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Check, Loader, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { demoAccounts } from "../../mock/authMockData";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Hàm đăng nhập thực tế với Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      // Đăng nhập với Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;
      // Lấy user_id từ bảng users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, role')
        .eq('email', email)
        .single();
      if (!userData || !userData.id) throw new Error("Không tìm thấy user");
      localStorage.setItem("user_id", userData.id);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", userData.role);
      // Nếu là employer, lấy thêm employer_id
      if (userData.role === "employer") {
        const { data: empData } = await supabase
          .from('employers')
          .select('id')
          .eq('user_id', userData.id)
          .single();
        if (empData && empData.id) {
          localStorage.setItem("employer_id", empData.id);
        }
      }
      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/dashboard?role=${userData.role}`);
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm điền nhanh demo account
  const loginAsDemoAccount = (role: string) => {
    const demo = demoAccounts[role];
    if (demo) {
      setEmail(demo.email);
      setPassword(demo.password);
      toast.success(`Đã điền thông tin đăng nhập mẫu cho tài khoản ${role}`);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Success message */}
          {showSuccess && (
            <div className="bg-success-100 border border-success-200 text-success-800 rounded-md p-4 mb-6 flex items-center animate-fade-in">
              <Check className="w-5 h-5 mr-3 text-success-600" />
              <span>Đăng nhập thành công! Đang chuyển hướng đến trang quản lý...</span>
            </div>
          )}
          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-200 text-red-800 rounded-md p-4 mb-6">
              {error}
            </div>
          )}
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Đăng nhập vào tài khoản</h2>
            <p className="mt-2 text-sm text-gray-600">
              Hoặc{" "}
              <Link to="/signup" className="font-medium text-brand-600 hover:text-brand-500">
                tạo tài khoản mới
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 pr-10"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-brand-600 hover:text-brand-500">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
            <Button
              type="submit"
              className="group relative w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Đăng nhập...
                </span>
              ) : (
                <span>Đăng nhập</span>
              )}
            </Button>
          </form>
          {/* Demo accounts section */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-center text-sm font-medium text-gray-700 mb-4">
              Tài khoản demo
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => loginAsDemoAccount("worker")}
              >
                Demo Người lao động
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => loginAsDemoAccount("employer")}
              >
                Demo Nhà tuyển dụng
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => loginAsDemoAccount("admin")}
              >
                Demo Quản trị viên
              </Button>
            </div>
            <div className="text-xs text-center mt-2 text-gray-500">
              Nhấn vào các nút trên để điền nhanh thông tin đăng nhập mẫu
            </div>
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Hoặc đăng nhập bằng</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full"
                type="button"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"></path>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"></path>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"></path>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"></path>
                  </g>
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                </svg>
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
