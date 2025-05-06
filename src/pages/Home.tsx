
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Search, Calendar, Star } from "lucide-react";

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-50 to-brand-100 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-900 leading-tight">
                Find Temporary Jobs.<br />Fill Temporary Positions.
              </h1>
              <p className="text-lg text-gray-600 md:pr-12">
                Connect workers and employers for temporary job opportunities. Quick, reliable, and flexible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup?role=worker">
                  <Button className="w-full sm:w-auto">I'm Looking for Work</Button>
                </Link>
                <Link to="/signup?role=employer">
                  <Button variant="outline" className="w-full sm:w-auto">I Need to Hire</Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="Workers and employers connecting" 
                className="rounded-lg shadow-xl h-auto max-w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to connect workers with employers for temporary positions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* For Workers */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm card-hover">
              <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Workers</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="inline-block mr-2 text-brand-500 font-bold">1.</span>
                  <span>Create your profile and set availability</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-2 text-brand-500 font-bold">2.</span>
                  <span>Browse and apply for temporary jobs</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-2 text-brand-500 font-bold">3.</span>
                  <span>Work and get paid</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-2 text-brand-500 font-bold">4.</span>
                  <span>Get rated and build your profile</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link to="/signup?role=worker">
                  <Button variant="outline" size="sm" className="w-full">Sign Up as Worker</Button>
                </Link>
              </div>
            </div>
            
            {/* For Employers */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm card-hover">
              <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                <Calendar size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Employers</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="inline-block mr-2 text-brand-500 font-bold">1.</span>
                  <span>Create your business profile</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-2 text-brand-500 font-bold">2.</span>
                  <span>Post jobs with shift details</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-2 text-brand-500 font-bold">3.</span>
                  <span>Review and accept applicants</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-2 text-brand-500 font-bold">4.</span>
                  <span>Confirm attendance and rate workers</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link to="/signup?role=employer">
                  <Button variant="outline" size="sm" className="w-full">Sign Up as Employer</Button>
                </Link>
              </div>
            </div>
            
            {/* Benefits */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm card-hover">
              <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                <Star size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Benefits</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="inline-block mr-2 text-brand-500 font-bold">✓</span>
                  <span>Quick matching process</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-2 text-brand-500 font-bold">✓</span>
                  <span>No long-term commitments</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-2 text-brand-500 font-bold">✓</span>
                  <span>Transparent rating system</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-2 text-brand-500 font-bold">✓</span>
                  <span>Reliable temporary workforce</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-2 text-brand-500 font-bold">✓</span>
                  <span>Flexible work opportunities</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link to="/about">
                  <Button variant="outline" size="sm" className="w-full">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Jobs</h2>
            <Link to="/jobs" className="text-brand-600 hover:text-brand-700 transition-colors">
              View all jobs →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Job Card 1 */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm card-hover">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">Restaurant Server</h3>
                  <p className="text-gray-600 text-sm">Downtown Cafe</p>
                </div>
                <span className="bg-brand-100 text-brand-700 text-xs font-medium py-1 px-2 rounded">
                  4 hours
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Calendar size={16} className="mr-2" />
                  <span>May 10, 2025 • 6:00 PM - 10:00 PM</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>District 1, Ho Chi Minh City</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-semibold text-lg">$12/hour</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">Posted 1 day ago</span>
                <Link to="/jobs/1">
                  <Button size="sm">Apply Now</Button>
                </Link>
              </div>
            </div>
            
            {/* Sample Job Card 2 */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm card-hover">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">Warehouse Packer</h3>
                  <p className="text-gray-600 text-sm">Global Logistics</p>
                </div>
                <span className="bg-brand-100 text-brand-700 text-xs font-medium py-1 px-2 rounded">
                  8 hours
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Calendar size={16} className="mr-2" />
                  <span>May 12, 2025 • 9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Thu Duc City, Ho Chi Minh City</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-semibold text-lg">$10/hour</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">Posted 2 days ago</span>
                <Link to="/jobs/2">
                  <Button size="sm">Apply Now</Button>
                </Link>
              </div>
            </div>
            
            {/* Sample Job Card 3 */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm card-hover">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">Event Staff</h3>
                  <p className="text-gray-600 text-sm">City Convention Center</p>
                </div>
                <span className="bg-brand-100 text-brand-700 text-xs font-medium py-1 px-2 rounded">
                  6 hours
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Calendar size={16} className="mr-2" />
                  <span>May 15, 2025 • 3:00 PM - 9:00 PM</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>District 7, Ho Chi Minh City</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-semibold text-lg">$15/hour</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">Posted 3 days ago</span>
                <Link to="/jobs/3">
                  <Button size="sm">Apply Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of workers and employers already using our platform for temporary job opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup?role=worker">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">Find Work</Button>
            </Link>
            <Link to="/signup?role=employer">
              <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-brand-600 w-full sm:w-auto">Post a Job</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
