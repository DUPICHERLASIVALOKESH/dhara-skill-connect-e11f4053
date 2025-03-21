import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobCard, { JobProps } from '@/components/JobCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Briefcase, MapPin, ArrowLeft, Filter, SlidersHorizontal } from 'lucide-react';
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

const softwareJobs: JobProps[] = [
  {
    id: "soft1",
    title: "Junior Full Stack Developer",
    company: "TestUnity",
    location: "Bengaluru, Karnataka, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Bachelor's degree in Computer Science",
    postedDate: "Today",
    salary: "₹5-8 LPA",
    description: "We are looking for a talented Junior Full Stack Developer to join our team. The ideal candidate will have knowledge of React, Node.js, and basic database concepts.",
    source: "LinkedIn",
    applyLink: "https://testunity.com/careers"
  },
  {
    id: "soft2",
    title: "Software Engineer Fresher",
    company: "Karnataka Power Corporation Ltd",
    location: "Chennai, Tamil Nadu, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Bachelor's degree in Engineering",
    postedDate: "Today",
    salary: "₹4-6 LPA",
    description: "Join our innovative team at Karnataka Power Corporation Ltd. We're seeking motivated freshers with a passion for technology and problem-solving.",
    source: "LinkedIn",
    applyLink: "https://karnatakapower.org/careers"
  },
  {
    id: "soft3",
    title: "Junior Software Developer Internship",
    company: "Confidential",
    location: "Remote, India",
    type: "Internship",
    level: "Entry-Level",
    education: "Degree in Computer Science",
    postedDate: "Yesterday",
    salary: "₹15-25K per month",
    description: "Exciting internship opportunity for motivated individuals. Learn from experienced developers while working on real-world projects.",
    source: "LinkedIn",
    applyLink: "https://linkedin.com/jobs"
  },
  {
    id: "soft4",
    title: "Associate Software Engineer",
    company: "Notetech Software",
    location: "Kerala, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Bachelor's degree in Computer Science",
    postedDate: "Yesterday",
    salary: "₹4.5-7 LPA",
    description: "Notetech Software is hiring fresh talent for our expanding development team. Be part of innovative projects and cutting-edge technology.",
    source: "Glassdoor",
    applyLink: "https://notetech.in/careers"
  },
  {
    id: "soft5",
    title: "Trainee Software Engineer",
    company: "Makinus",
    location: "Tirunelveli, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Bachelor's degree in Computer Science",
    postedDate: "2 days ago",
    salary: "₹3.5-5 LPA",
    description: "Start your career with Makinus as a Trainee Software Engineer. We provide comprehensive training programs to help you grow professionally.",
    source: "Glassdoor",
    applyLink: "https://makinus.com/careers"
  },
  {
    id: "soft6",
    title: "Software Engineer Trainee",
    company: "Genora Infotech",
    location: "Goa, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Bachelor's degree in Computer Science",
    postedDate: "3 days ago",
    salary: "₹3-5 LPA",
    description: "Genora Infotech is looking for talented software engineer trainees to join our dynamic team in Goa.",
    source: "Glassdoor",
    applyLink: "https://genorainfotech.com/careers"
  },
  {
    id: "soft7",
    title: "Junior Software Engineer - Java",
    company: "Virtusa",
    location: "Bengaluru, Karnataka, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Bachelor's degree in Computer Science",
    postedDate: "1 week ago",
    salary: "₹5-8 LPA",
    description: "Virtusa is hiring Junior Software Engineers with Java experience. Join our global team of technology professionals.",
    source: "Glassdoor",
    applyLink: "https://virtusa.com/careers"
  }
];

const fetchSoftwareJobs = async (): Promise<JobProps[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return softwareJobs;
};

const SoftwareJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const jobsPerPage = 5;
  
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['softwareJobs'],
    queryFn: fetchSoftwareJobs
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    toast({
      title: "Search Applied",
      description: `Searching for "${searchTerm}" software jobs`,
    });
  };

  const filteredJobs = jobs?.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter ? job.location.includes(locationFilter) : true;
    const matchesType = typeFilter ? job.type === typeFilter : true;
    const matchesLevel = levelFilter ? job.level === levelFilter : true;
    
    return matchesSearch && matchesLocation && matchesType && matchesLevel;
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs?.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = filteredJobs ? Math.ceil(filteredJobs.length / jobsPerPage) : 0;

  return (
    <>
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        <section className="bg-dhara-blue py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center text-white">
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
                Software Development Jobs
              </h1>
              <p className="text-xl text-white/85 animate-fade-in">
                Find the latest opportunities in software development from leading companies across India.
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
                  placeholder="Search software jobs by title, company, or keyword" 
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
                    <SelectItem value="all-locations">All Locations</SelectItem>
                    <SelectItem value="Bengaluru">Bengaluru</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                    <SelectItem value="Kerala">Kerala</SelectItem>
                    <SelectItem value="Goa">Goa</SelectItem>
                    <SelectItem value="Tirunelveli">Tirunelveli</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
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
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
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
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
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
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8">
              <h2 className="heading-md text-dhara-blue mb-4">
                Software Development Opportunities
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
                  <p className="mt-4 text-dhara-gray">Loading software jobs...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                  <p className="font-medium">Error loading jobs</p>
                  <p>Please try again later.</p>
                </div>
              ) : currentJobs?.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Briefcase size={48} className="mx-auto text-dhara-gray opacity-50 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="text-dhara-gray">Try adjusting your search criteria.</p>
                </div>
              ) : (
                currentJobs?.map((job) => (
                  <div key={job.id}>
                    <JobCard job={job} />
                    <div className="mt-4 text-right">
                      <Button 
                        asChild 
                        className="bg-dhara-blue hover:bg-dhara-blue/90"
                      >
                        <Link to={`/jobs/software-development/${job.id}`}>
                          View Details & Apply
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              )}
              
              {totalPages > 1 && (
                <Pagination className="my-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink 
                          onClick={() => setCurrentPage(index + 1)}
                          isActive={currentPage === index + 1}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-dhara-blue">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-lg text-white mb-6">Looking for More Software Development Roles?</h2>
              <p className="text-white/80 text-lg mb-8">
                Submit your resume and we'll match you with the perfect software development opportunities.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-dhara-blue hover:bg-white/90">
                  <Link to="/contact">
                    Submit Your Resume
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link to="/jobs">
                    Browse All Jobs
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

export default SoftwareJobs;
