
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Briefcase, Mail, Phone, MapPin, Edit } from "lucide-react";
import { supabase } from '@/lib/supabase';

// Define form schema with zod
const profileSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Vui lòng nhập địa chỉ email hợp lệ"),
  phone: z.string().min(10, "Vui lòng nhập số điện thoại hợp lệ"),
  address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const EmployerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock employer data
  const defaultValues: ProfileFormValues = {
    name: "Cafe XYZ",
    email: "employer@example.com",
    phone: "0123456789",
    address: "123 Main St, Hồ Chí Minh",
  };
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });
  
  const onSubmit = (data: ProfileFormValues) => {
    console.log("Form data:", data);
    toast.success("Hồ sơ đã được cập nhật thành công");
    setIsEditing(false);
  };
  
  return (
    <Layout showFooter={false}>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Hồ sơ của tôi</h1>
            <Button 
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2"
            >
              {isEditing ? "Hủy" : <><Edit className="w-4 h-4" /> Chỉnh sửa hồ sơ</>}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Summary Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Tóm tắt hồ sơ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center py-4">
                  <div className="w-24 h-24 rounded-full bg-brand-50 flex items-center justify-center mb-4 border-2 border-brand-100">
                    <User size={40} className="text-brand-600" />
                  </div>
                  <h2 className="text-xl font-semibold">{defaultValues.name}</h2>
                  <p className="text-gray-500">Nhà tuyển dụng</p>
                  
                  <div className="mt-6 w-full space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{defaultValues.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{defaultValues.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{defaultValues.address}</span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Thống kê công việc</h3>
                  <div className="flex justify-between">
                    <div className="text-center">
                      <p className="text-xl font-semibold">5</p>
                      <p className="text-xs text-gray-500">Công việc đã đăng</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold">2</p>
                      <p className="text-xs text-gray-500">Công việc đang tuyển</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold">10</p>
                      <p className="text-xs text-gray-500">Tổng số ứng viên</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Profile Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                  <CardDescription>
                    {isEditing 
                      ? "Cập nhật thông tin cá nhân bên dưới"
                      : "Xem thông tin hồ sơ của bạn"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tên</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Tên" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Email" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Số điện thoại</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Số điện thoại" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Địa chỉ</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Địa chỉ" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {isEditing && (
                        <Button type="submit">Lưu thay đổi</Button>
                      )}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerProfile; 
