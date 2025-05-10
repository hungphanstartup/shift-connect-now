import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import {
  Users,
  Briefcase,
  Settings,
  Shield,
  BarChart2,
  Search,
  AlertCircle,
  CheckCircle,
  User,
} from "lucide-react";
import { supabase } from '@/lib/supabase';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState([
    { title: "Total Users", value: 0, change: "", icon: Users },
    { title: "Active Jobs", value: 0, change: "", icon: Briefcase },
    { title: "Completed Jobs", value: 0, change: "", icon: CheckCircle },
    { title: "Reports", value: 0, change: "", icon: AlertCircle },
  ]);
  const [recentEmployers, setRecentEmployers] = useState([]);
  const [recentWorkers, setRecentWorkers] = useState([]);
  const [jobStats, setJobStats] = useState({
    activeJobs: 0,
    positionsAvailable: 0,
    positionsFilled: 0,
    avgHourlyRate: 0,
    categories: [],
  });

  useEffect(() => {
    // Fetch stats
    const fetchStats = async () => {
      // Total users
      const { count: userCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
      // Active jobs
      const { count: activeJobCount } = await supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'active');
      // Completed jobs
      const { count: completedJobCount } = await supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'completed');
      // Reports (giả sử có bảng reports, nếu không thì để 0)
      setStats([
        { title: "Total Users", value: userCount || 0, change: "", icon: Users },
        { title: "Active Jobs", value: activeJobCount || 0, change: "", icon: Briefcase },
        { title: "Completed Jobs", value: completedJobCount || 0, change: "", icon: CheckCircle },
        { title: "Reports", value: 0, change: "", icon: AlertCircle },
      ]);
    };
    // Fetch recent employers
    const fetchEmployers = async () => {
      const { data: employers } = await supabase.from('employers').select('id, company_name, status').order('created_at', { ascending: false }).limit(4);
      // Đếm số jobs và workers cho mỗi employer
      if (employers && employers.length > 0) {
        const employerIds = employers.map(e => e.id);
        const { data: jobs } = await supabase.from('jobs').select('id, employer_id');
        const { data: workers } = await supabase.from('workers').select('id');
        setRecentEmployers(employers.map(e => ({
          id: e.id,
          name: e.company_name,
          jobs: jobs ? jobs.filter(j => j.employer_id === e.id).length : 0,
          workers: workers ? workers.length : 0, // Nếu có bảng liên kết workers-employer thì cần sửa lại
          status: e.status || 'active',
        })));
      } else {
        setRecentEmployers([]);
      }
    };
    // Fetch recent workers
    const fetchWorkers = async () => {
      const { data: workers } = await supabase.from('workers').select('id, user_id, jobs_completed, rating, status');
      const { data: users } = await supabase.from('users').select('id, full_name');
      setRecentWorkers((workers || []).slice(0, 4).map(w => ({
        id: w.id,
        name: users?.find(u => u.id === w.user_id)?.full_name || `Worker ${w.id}`,
        jobs: w.jobs_completed,
        rating: w.rating,
        status: w.status || 'active',
      })));
    };
    // Fetch job stats
    const fetchJobStats = async () => {
      const { data: jobs } = await supabase.from('jobs').select('*');
      if (jobs) {
        const activeJobs = jobs.filter(j => j.status === 'active').length;
        const positionsAvailable = jobs.reduce((acc, j) => acc + (j.positions || 0), 0);
        const positionsFilled = jobs.reduce((acc, j) => acc + (j.filled_positions || 0), 0);
        const avgHourlyRate = jobs.length > 0 ? Number((jobs.reduce((acc, j) => acc + (j.hourly_rate || 0), 0) / jobs.length).toFixed(2)) : 0;
        // Thống kê category
        const categoryMap = {};
        jobs.forEach(j => {
          if (j.industry) categoryMap[j.industry] = (categoryMap[j.industry] || 0) + 1;
        });
        const categories = Object.entries(categoryMap).map(([name, count]) => ({ name, count: Number(count) }));
        setJobStats({
          activeJobs,
          positionsAvailable,
          positionsFilled,
          avgHourlyRate,
          categories,
        });
      }
    };
    fetchStats();
    fetchEmployers();
    fetchWorkers();
    fetchJobStats();
  }, []);

  return (
    <Layout showFooter={false}>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Admin Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <Shield className="w-4 h-4 text-brand-600 mr-1" />
                    <span className="text-gray-700">System Administrator</span>
                  </div>
                  <div className="flex items-center">
                    <BarChart2 className="w-4 h-4 text-brand-600 mr-1" />
                    <span className="text-gray-700">Platform Overview</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
                <Link to="/dashboard/admin/settings">
                  <Button variant="outline">
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.change && stat.change.includes('+') ? 'text-green-500' : stat.change && stat.change.includes('-') ? 'text-red-500' : ''}`}>
                    {stat.change ? `${stat.change} from last month` : ''}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Admin Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "overview"
                    ? "text-brand-600 border-b-2 border-brand-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("employers")}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "employers"
                    ? "text-brand-600 border-b-2 border-brand-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Employers
              </button>
              <button
                onClick={() => setActiveTab("workers")}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "workers"
                    ? "text-brand-600 border-b-2 border-brand-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Workers
              </button>
              <button
                onClick={() => setActiveTab("jobs")}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "jobs"
                    ? "text-brand-600 border-b-2 border-brand-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Jobs
              </button>
            </div>

            <div className="p-6">
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Platform Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Recent Employers</h3>
                      <div className="space-y-3">
                        {recentEmployers.map(employer => (
                          <div key={employer.id} className="border rounded-md p-3 flex justify-between items-center">
                            <div>
                              <p className="font-medium">{employer.name}</p>
                              <p className="text-xs text-gray-500">{employer.jobs} jobs, {employer.workers} workers</p>
                            </div>
                            <div>
                              {employer.status === "active" ? (
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Active</span>
                              ) : (
                                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">Pending</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Recent Workers</h3>
                      <div className="space-y-3">
                        {recentWorkers.map(worker => (
                          <div key={worker.id} className="border rounded-md p-3 flex justify-between items-center">
                            <div>
                              <p className="font-medium">{worker.name}</p>
                              <p className="text-xs text-gray-500">{worker.jobs} jobs completed, {worker.rating} rating</p>
                            </div>
                            <div>
                              {worker.status === "active" ? (
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Active</span>
                              ) : (
                                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Inactive</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "employers" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Employers</h2>
                    <div className="flex gap-2">
                      <Link to="/dashboard/admin/employers/new">
                        <Button size="sm">Add Employer</Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jobs</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workers</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentEmployers.map(employer => (
                          <tr key={employer.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <Briefcase className="h-5 w-5 text-gray-500" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{employer.name}</div>
                                  <div className="text-sm text-gray-500">ID: {employer.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employer.jobs}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employer.workers}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {employer.status === "active" ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Link to={`/dashboard/admin/employers/${employer.id}`} className="text-brand-600 hover:text-brand-900 mr-3">View</Link>
                              <Link to={`/dashboard/admin/employers/${employer.id}/edit`} className="text-brand-600 hover:text-brand-900">Edit</Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "workers" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Workers</h2>
                    <div className="flex gap-2">
                      <Link to="/dashboard/admin/workers/new">
                        <Button size="sm">Add Worker</Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jobs Completed</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentWorkers.map(worker => (
                          <tr key={worker.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <User className="h-5 w-5 text-gray-500" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{worker.name}</div>
                                  <div className="text-sm text-gray-500">ID: {worker.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.jobs}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.rating}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {worker.status === "active" ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Inactive</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Link to={`/dashboard/admin/workers/${worker.id}`} className="text-brand-600 hover:text-brand-900 mr-3">View</Link>
                              <Link to={`/dashboard/admin/workers/${worker.id}/edit`} className="text-brand-600 hover:text-brand-900">Edit</Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "jobs" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Jobs</h2>
                    <Link to="/jobs">
                      <Button size="sm">View All Jobs</Button>
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Job Statistics</CardTitle>
                        <CardDescription>Overview of platform job activity</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Active Jobs</span>
                            <span className="font-medium">{jobStats.activeJobs}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Positions Available</span>
                            <span className="font-medium">{jobStats.positionsAvailable}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Positions Filled</span>
                            <span className="font-medium">{jobStats.positionsFilled}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Average Hourly Rate</span>
                            <span className="font-medium">${jobStats.avgHourlyRate}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link to="/dashboard/admin/job-reports" className="text-sm text-brand-600 hover:underline">
                          View detailed reports
                        </Link>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Featured Categories</CardTitle>
                        <CardDescription>Most active job categories</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {jobStats.categories && jobStats.categories.length > 0 ? (
                            jobStats.categories.map(cat => (
                              <div key={cat.name} className="flex justify-between">
                                <span>{cat.name}</span>
                                <span className="font-medium">{cat.count} jobs</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-500 text-sm">No data</span>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link to="/dashboard/admin/categories" className="text-sm text-brand-600 hover:underline">
                          Manage categories
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
