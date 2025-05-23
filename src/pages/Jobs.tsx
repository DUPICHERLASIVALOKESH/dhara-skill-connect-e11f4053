import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobCard, { JobProps } from '@/components/JobCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Briefcase, MapPin, Filter, ArrowLeft, Bookmark, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from '@/hooks/use-toast';

const mockJobs: JobProps[] = [
  {
    id: "job1",
    title: "Senior Software Engineer",
    company: "TechGlobe Solutions",
    location: "Mumbai, India",
    type: "Full-Time",
    level: "Senior",
    salary: "₹25-35 LPA",
    postedDate: "2 days ago",
    description: "We are looking for an experienced software engineer with expertise in React, Node.js, and cloud technologies to join our growing engineering team.",
    source: "LinkedIn",
    applyLink: "https://techglobe.com/careers"
  },
  {
    id: "job2",
    title: "HR Manager",
    company: "Infinity Enterprises",
    location: "Bengaluru, India",
    type: "Full-Time",
    level: "Mid-Level",
    salary: "₹15-20 LPA",
    postedDate: "1 week ago",
    description: "Seeking an HR Manager with 5+ years of experience to oversee recruitment, employee relations, and HR operations for our technology division.",
    source: "Naukri",
    applyLink: "https://infinityenterprises.com/careers"
  },
  {
    id: "job3",
    title: "Marketing Specialist",
    company: "BrandWave Media",
    location: "Delhi, India",
    type: "Contract",
    level: "Junior",
    salary: "₹8-12 LPA",
    postedDate: "3 days ago",
    description: "Join our creative marketing team to develop and execute digital marketing campaigns for our diverse portfolio of clients across various industries.",
    source: "Indeed",
    applyLink: "https://brandwave.com/careers"
  },
  {
    id: "job4",
    title: "Finance Analyst",
    company: "Global Finance Corp",
    location: "Hyderabad, India",
    type: "Full-Time",
    level: "Mid-Level",
    salary: "₹12-18 LPA",
    postedDate: "5 days ago",
    description: "Looking for a detail-oriented Finance Analyst to assist with financial reporting, budgeting, and forecasting for our expanding operations.",
    source: "Google Jobs",
    applyLink: "https://globalfinance.com/careers"
  },
  {
    id: "job5",
    title: "Product Manager",
    company: "InnovateTech",
    location: "Pune, India",
    type: "Full-Time",
    level: "Senior",
    salary: "₹30-40 LPA",
    postedDate: "Just now",
    description: "Exciting opportunity for an experienced Product Manager to lead product development efforts for our SaaS platform, working closely with engineering and design teams.",
    source: "LinkedIn",
    applyLink: "https://innovatetech.com/careers"
  },
  {
    id: "job6",
    title: "Customer Support Specialist",
    company: "ServeRight Solutions",
    location: "Chennai, India",
    type: "Part-Time",
    level: "Entry-Level",
    salary: "₹5-8 LPA",
    postedDate: "2 weeks ago",
    description: "Seeking customer-focused professionals to provide excellent support to our clients through multiple channels including phone, email, and chat.",
    source: "Indeed",
    applyLink: "https://serveright.com/careers"
  },
  {
    id: "job7",
    title: "DevOps Engineer",
    company: "CloudScale Systems",
    location: "Bengaluru, India",
    type: "Full-Time",
    level: "Senior",
    salary: "₹28-40 LPA",
    postedDate: "3 days ago",
    description: "Join our DevOps team to build and maintain scalable infrastructure on AWS and implement CI/CD pipelines for our growing platform.",
    source: "Naukri",
    applyLink: "https://cloudscale.com/careers"
  },
  {
    id: "job8",
    title: "E-commerce Operations Manager",
    company: "FastCart",
    location: "Mumbai, India",
    type: "Full-Time",
    level: "Mid-Level",
    salary: "₹18-25 LPA",
    postedDate: "1 day ago",
    description: "Leading e-commerce platform seeking an Operations Manager to oversee order fulfillment, inventory management, and customer delivery experience.",
    source: "LinkedIn",
    applyLink: "https://fastcart.com/careers"
  }
];

const fetchJobs = async (category?: string, subcategory?: string, searchTerm?: string): Promise<JobProps[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockJobs;
};

const Jobs = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  
  const categoryFromState = location.state?.category || '';
  const subcategoryFromState = location.state?.subcategory || '';
  const searchTermFromState = location.state?.searchTerm || '';
  
  useEffect(() => {
    if (searchTermFromState) {
      setSearchTerm(searchTermFromState);
    }
  }, [searchTermFromState]);
  
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs', categoryFromState, subcategoryFromState, searchTermFromState],
    queryFn: () => fetchJobs(categoryFromState, subcategoryFromState, searchTermFromState)
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    toast({
      title: "Search Applied",
      description: `Searching for "${searchTerm}" jobs`,
    });
  };

  const filteredJobs = jobs?.filter(job => {
    const matchesSearch = searchTerm
      ? job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesLocation = locationFilter && locationFilter !== 'all'
      ? job.location.includes(locationFilter) 
      : true;
      
    const matchesType = typeFilter && typeFilter !== 'all-types'
      ? job.type === typeFilter 
      : true;
      
    const matchesLevel = levelFilter && levelFilter !== 'all-levels'
      ? job.level === levelFilter 
      : true;
    
    return matchesSearch && matchesLocation && matchesType && matchesLevel;
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs?.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = filteredJobs ? Math.ceil(filteredJobs.length / jobsPerPage) : 0;

  const formatSubcategory = (subcategory: string) => {
    return subcategory
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        <section className="bg-dhara-blue py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center text-white">
              {subcategoryFromState ? (
                <>
                  <div className="mb-4">
                    <Link 
                      to="/job-categories" 
                      className="inline-flex items-center text-white/80 hover:text-white transition-colors"
                    >
                      <ArrowLeft size={16} className="mr-1" />
                      Back to Categories
                    </Link>
                  </div>
                  <h1 className="heading-xl mb-6 animate-fade-in">
                    {formatSubcategory(subcategoryFromState)} Jobs
                  </h1>
                </>
              ) : searchTermFromState ? (
                <>
                  <div className="mb-4">
                    <Link 
                      to="/job-categories" 
                      className="inline-flex items-center text-white/80 hover:text-white transition-colors"
                    >
                      <ArrowLeft size={16} className="mr-1" />
                      Back to Categories
                    </Link>
                  </div>
                  <h1 className="heading-xl mb-6 animate-fade-in">
                    Search Results: "{searchTermFromState}"
                  </h1>
                </>
              ) : (
                <h1 className="heading-xl mb-6 animate-fade-in">Career Opportunities</h1>
              )}
              <p className="text-xl text-white/85 animate-fade-in">
                Discover your next career move with our curated selection of opportunities from leading companies.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-8 bg-gray-50 border-b border-border">
          <div className="container mx-auto px-4 md:px-6">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  type="text" 
                  placeholder="Search jobs by title, company, or keyword" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full md:w-60">
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Location" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Bengaluru">Bengaluru</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Button type="submit" className="bg-dhara-blue hover:bg-dhara-blue/90">
                <Search size={18} className="mr-2" />
                Search Jobs
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="md:hidden"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal size={18} className="mr-2" />
                Filters
              </Button>
            </form>
            
            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen} className="md:hidden mt-4">
              <CollapsibleContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <div className="flex items-center">
                        <Briefcase size={18} className="mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Job Type" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all-types">All Types</SelectItem>
                        <SelectItem value="Full-Time">Full-Time</SelectItem>
                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Experience Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all-levels">All Levels</SelectItem>
                        <SelectItem value="Entry-Level">Entry-Level</SelectItem>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                        <SelectItem value="Executive">Executive</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <div className="hidden md:flex mt-4 space-x-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-60">
                  <div className="flex items-center">
                    <Briefcase size={18} className="mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Job Type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all-types">All Types</SelectItem>
                    <SelectItem value="Full-Time">Full-Time</SelectItem>
                    <SelectItem value="Part-Time">Part-Time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-60">
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all-levels">All Levels</SelectItem>
                    <SelectItem value="Entry-Level">Entry-Level</SelectItem>
                    <SelectItem value="Junior">Junior</SelectItem>
                    <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Executive">Executive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Bookmark size={18} />
                Saved Jobs
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8">
              <h2 className="heading-md text-dhara-blue mb-4">
                {subcategoryFromState 
                  ? `${formatSubcategory(subcategoryFromState)} Opportunities` 
                  : searchTermFromState
                    ? "Search Results"
                    : "Available Positions"}
              </h2>
              {filteredJobs && (
                <p className="text-dhara-gray">
                  Showing {currentJobs?.length} of {filteredJobs.length} job opportunities
                </p>
              )}
            </div>
            
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-dhara-blue border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-4 text-dhara-gray">Loading job opportunities...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                  <p className="font-medium">Error loading jobs</p>
                  <p>Please try again later.</p>
                </div>
              ) : filteredJobs?.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Briefcase size={48} className="mx-auto text-dhara-gray opacity-50 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="text-dhara-gray">Try adjusting your search criteria.</p>
                  {searchTerm && (
                    <Button 
                      variant="outline" 
                      onClick={() => setSearchTerm('')} 
                      className="mt-4"
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              ) : (
                currentJobs?.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              )}
            </div>
            
            {totalPages > 1 && (
              <Pagination className="my-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink 
                        onClick={() => setCurrentPage(index + 1)}
                        isActive={currentPage === index + 1}
                        className="cursor-pointer"
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-dhara-blue">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-lg text-white mb-6">Can't Find What You're Looking For?</h2>
              <p className="text-white/80 text-lg mb-8">
                Submit your resume and we'll notify you when relevant positions become available.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-dhara-blue hover:bg-white/90">
                  <Link to="/contact">
                    Submit Your Resume
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link to="/contact">
                    Contact Recruiters
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Jobs;
