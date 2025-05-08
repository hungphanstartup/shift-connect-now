
import { useState } from "react";
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

// Mock data for the admin dashboard
const stats = [
  { title: "Total Users", value: 1250, change: "+15%", icon: Users },
  { title: "Active Jobs", value: 87, change: "+23%", icon: Briefcase },
  { title: "Completed Jobs", value: 342, change: "+7%", icon: CheckCircle },
  { title: "Reports", value: 12, change: "-3%", icon: AlertCircle },
];

const recentEmployers = [
  { id: 1, name: "Downtown Cafe", jobs: 5, workers: 8, status: "active" },
  { id: 2, name: "Global Logistics", jobs: 12, workers: 25, status: "active" },
  { id: 3, name: "City Convention Center", jobs: 3, workers: 15, status: "active" },
  { id: 4, name: "Fashion Outlet", jobs: 7, workers: 12, status: "pending" },
];

const recentWorkers = [
  { id: 1, name: "Nguyen Van A", jobs: 12, rating: 4.8, status: "active" },
  { id: 2, name: "Tran Thi B", jobs: 15, rating: 4.5, status: "active" },
  { id: 3, name: "Le Van C", jobs: 8, rating: 4.2, status: "active" },
  { id: 4, name: "Pham Minh D", jobs: 5, rating: 3.9, status: "inactive" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

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
                  <p className={`text-xs ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
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
                            <span className="font-medium">87</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Positions Available</span>
                            <span className="font-medium">213</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Positions Filled</span>
                            <span className="font-medium">156</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Average Hourly Rate</span>
                            <span className="font-medium">$12.75</span>
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
                          <div className="flex justify-between">
                            <span>Food & Beverage</span>
                            <span className="font-medium">32 jobs</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Event Staff</span>
                            <span className="font-medium">24 jobs</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Retail</span>
                            <span className="font-medium">18 jobs</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery</span>
                            <span className="font-medium">13 jobs</span>
                          </div>
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
