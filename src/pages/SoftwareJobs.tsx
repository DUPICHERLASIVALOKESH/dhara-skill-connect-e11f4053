
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Briefcase, MapPin, ArrowLeft, Filter, SlidersHorizontal, MessageSquare, Send, Share2 } from 'lucide-react';
import JobCard, { JobProps } from '@/components/JobCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const softwareJobs: JobProps[] = [
  {
    id: "atidan1",
    title: "IT Support Engineer",
    company: "Atidan Technologies",
    location: "Mumbai / Pune",
    type: "Full-Time",
    level: "Entry Level",
    salary: "Not Disclosed",
    postedDate: "Just now",
    description: "IT Support Engineer role with shift timing 6 PM – 3 AM IST. Requirements: 60% in academics, BE/B.Tech/BCA/MCA, knowledge of MS Exchange, Azure, Active Directory.",
    education: "BE/B.Tech/BCA/MCA",
    applyLink: "mailto:careers@atidan.com",
    isNew: true
  },
  {
    id: "capgemini1",
    title: "Software Engineer",
    company: "Capgemini",
    location: "Pan India",
    type: "Full-Time",
    level: "Entry Level",
    salary: "4 LPA",
    postedDate: "1 day ago",
    description: "Capgemini off-campus drive for 2024 batch. BE/BTECH/MCA graduates.",
    education: "BE/B.Tech/MCA",
    applyLink: "https://app.joinsuperset.com/students/jobprofiles/2165f2f8-5dce-4fd9-a866-09ed5b401419",
    isNew: true
  },
  {
    id: "cgi1",
    title: "Associate Software Engineer",
    company: "CGI",
    location: "Bangalore",
    type: "Full-Time",
    level: "Entry Level",
    postedDate: "2 days ago",
    description: "Infrastructure/Cloud role at CGI. Great opportunity for freshers interested in cloud technologies.",
    education: "BE/B.Tech",
    applyLink: "https://cgi.njoyn.com/corp/xweb/xweb.asp?NTKN=c&clid=21001&Page=JobDetails&Jobid=J0225-1235",
    isNew: true
  },
  {
    id: "amazon1",
    title: "Software Dev Engineer",
    company: "Amazon",
    location: "Bengaluru",
    type: "Full-Time",
    level: "Entry Level",
    salary: "Not Disclosed",
    postedDate: "Just now",
    description: "Software Development Engineer role for 2025 graduates at Amazon Bangalore.",
    education: "BE/B.Tech",
    applyLink: "https://www.amazon.jobs/en/jobs/2943666/software-dev-engineer",
    isNew: true
  },
  {
    id: "barclays1",
    title: "Software Engineer",
    company: "Barclays",
    location: "Pune",
    type: "Full-Time",
    level: "Entry Level",
    salary: "4 LPA",
    postedDate: "3 days ago",
    description: "Software Engineer role for freshers at Barclays. Suitable for BE/B.Tech/BCA/BSc/ME/M.Tech/MCA/MSc graduates.",
    education: "BE/B.Tech/BCA/BSc",
    applyLink: "https://testingsociety.com/job/pune-full-time-barclays-software-engineer/",
    isNew: true
  },
  {
    id: "candela1",
    title: "SDE Intern",
    company: "Candela Technologies",
    location: "Vizag/Chennai/Bangalore",
    type: "Internship",
    level: "Entry Level",
    salary: "20K/Month",
    postedDate: "Just now",
    description: "SDE Internship in Wireless Communications for 2025 batch. Post-internship CTC: 6 LPA.",
    education: "BE/B.Tech",
    applyLink: "https://docs.google.com/forms/d/e/1FAIpQLSezD6gW-3pmqAArkhCJPc5yLTnqugxqVvBC73T2_YGskWoRAg/viewform",
    isNew: true
  },
  {
    id: "capgemini2",
    title: "Software Engineer",
    company: "Capgemini",
    location: "Hyderabad",
    type: "Full-Time",
    level: "Mid-Level",
    postedDate: "1 week ago",
    description: "Software Engineer position at Capgemini Hyderabad for experienced professionals.",
    applyLink: "https://careers.capgemini.com/job/Hyderabad-Software-Engineer/1193720401/",
    isNew: true
  },
  {
    id: "oracle1",
    title: "Software Developer",
    company: "Oracle",
    location: "Bangalore/Delhi/Hyderabad/Pune",
    type: "Full-Time",
    level: "Entry Level",
    postedDate: "Just now",
    description: "Software Developer role for 2025 batch. 0-2 years experience. B.E/B.Tech graduates.",
    education: "BE/B.Tech",
    applyLink: "https://unstop.com/jobs/software-developer-i-oracle-1461333",
    isNew: true
  },
  {
    id: "nne1",
    title: "Associate Automation Engineer",
    company: "NNE",
    location: "Bengaluru",
    type: "Full-Time",
    level: "Entry Level",
    postedDate: "4 days ago",
    description: "Associate Automation Engineer position. Experience: 0-3 years.",
    applyLink: "https://nne.csod.com/ux/ats/careersite/4/home/requisition/2547",
    isNew: true
  },
  {
    id: "applied1",
    title: "Software Engineer - AIML",
    company: "Applied Materials",
    location: "Bangalore",
    type: "Full-Time",
    level: "Mid-Level",
    postedDate: "2 days ago",
    description: "Software Engineer position focusing on AI/ML at Applied Materials.",
    applyLink: "https://careers.appliedmaterials.com/careers/job/790301713248",
    isNew: true
  },
  {
    id: "sw2",
    title: "ML Internship",
    company: "Latentforce.ai",
    location: "Remote",
    type: "Internship",
    level: "Entry Level",
    postedDate: "1 day ago",
    description: "6 months ML Internship opportunity for 2025 passouts.",
    education: "BE/B.Tech",
    applyLink: "https://docs.google.com/forms/d/e/1FAIpQLSdBEd2oz9TNb6ZVyZ8rpB4xTq7zRvZ7WOQKy_dOeFpR7gD3xQ/viewform",
    isNew: true
  },
  {
    id: "sw3",
    title: "Frontend Developer",
    company: "InnovateSoft",
    location: "Mumbai, India",
    type: "Contract",
    level: "Junior",
    salary: "₹10-15 LPA",
    postedDate: "3 days ago",
    description: "Looking for a frontend developer with experience in React, HTML, CSS, and JavaScript to work on our client-facing applications.",
    source: "Indeed",
    applyLink: "https://innovatesoft.com/careers",
    isNew: true
  },
  {
    id: "sw4",
    title: "Node.js Backend Developer",
    company: "DataFlow Systems",
    location: "Pune, India",
    type: "Full-Time",
    level: "Mid-Level",
    salary: "₹15-22 LPA",
    postedDate: "5 days ago",
    description: "Seeking a backend developer with strong Node.js skills and experience with REST APIs, SQL databases, and microservices architecture.",
    source: "Google Jobs",
    applyLink: "https://dataflow.com/careers"
  },
  {
    id: "sw5",
    title: "Software Architect",
    company: "EnterpriseApp Solutions",
    location: "Delhi, India",
    type: "Full-Time",
    level: "Senior",
    salary: "₹35-50 LPA",
    postedDate: "1 day ago",
    description: "Leading position for an experienced software architect to design scalable, maintainable system architectures for our enterprise clients.",
    source: "LinkedIn",
    applyLink: "https://enterpriseapp.com/careers",
    isNew: true
  },
  {
    id: "sw6",
    title: "Mobile App Developer (React Native)",
    company: "MobiTech",
    location: "Chennai, India",
    type: "Full-Time",
    level: "Mid-Level",
    salary: "₹18-25 LPA",
    postedDate: "1 week ago",
    description: "Join our mobile team to develop cross-platform applications using React Native. Experience with native module integration and app store deployment required.",
    source: "Indeed",
    applyLink: "https://mobitech.com/careers"
  },
  {
    id: "sw7",
    title: "DevOps Engineer",
    company: "CloudScale Systems",
    location: "Bengaluru, India",
    type: "Full-Time",
    level: "Senior",
    salary: "₹28-40 LPA",
    postedDate: "3 days ago",
    description: "Looking for a DevOps engineer to build and manage CI/CD pipelines, containerization, and cloud infrastructure using AWS and Kubernetes.",
    source: "Naukri",
    applyLink: "https://cloudscale.com/careers"
  },
  {
    id: "sw8",
    title: "QA Automation Engineer",
    company: "QualityFirst",
    location: "Hyderabad, India",
    type: "Full-Time",
    level: "Mid-Level",
    salary: "₹15-25 LPA",
    postedDate: "4 days ago",
    description: "Join our QA team to develop and maintain automated test suites using Selenium, Cypress, or similar frameworks. Experience with CI/CD integration is required.",
    source: "LinkedIn",
    applyLink: "https://qualityfirst.com/careers"
  },
  {
    id: "sw9",
    title: "Python Developer",
    company: "DataAnalytics Pro",
    location: "Remote, India",
    type: "Full-Time",
    level: "Mid-Level",
    salary: "₹15-22 LPA",
    postedDate: "2 weeks ago",
    description: "Seeking a Python developer with experience in data analysis, API development, and database management for our analytics platform.",
    source: "Indeed",
    applyLink: "https://dataanalyticspro.com/careers"
  },
  {
    id: "sw10",
    title: "UI/UX Designer with React Skills",
    company: "DesignTech Solutions",
    location: "Pune, India",
    type: "Full-Time",
    level: "Junior",
    salary: "₹10-18 LPA",
    postedDate: "6 days ago",
    description: "Looking for a UI/UX designer who also has hands-on experience with React component development. Portfolio of previous work required.",
    source: "Naukri",
    applyLink: "https://designtech.com/careers"
  },
  {
    id: "sw21",
    title: "WILP Program",
    company: "Wipro",
    location: "India",
    type: "Full-Time",
    level: "Entry Level",
    postedDate: "1 day ago",
    description: "Wipro's Work Integrated Learning Program (WILP) for BCA and BSc graduates (2024, 2025 batch).",
    education: "BCA/BSc",
    applyLink: "https://app.joinsuperset.com/join/#/signup/student/jobprofiles/a8e5c3ce-cddc-45d4-b8d2-48b5176ce30f",
    isNew: true
  },
  {
    id: "google1",
    title: "Business Analyst, Supply Chain",
    company: "Google",
    location: "Bangalore, India",
    type: "Full-Time",
    level: "Entry Level",
    salary: "₹6-12 LPA",
    postedDate: "Just now",
    description: "Business Systems Analyst role in Supply Chain for university graduates from 2022-2025 batches. Seeking candidates with a Bachelor's or Master's degree.",
    education: "Bachelor's/Master's Degree",
    applyLink: "https://www.google.com/about/careers/applications/jobs/results/98570921232474822-business-systems-analyst-supply-chain-university-graduate-2025",
    isNew: true
  }
];

const fetchSoftwareJobs = async (): Promise<JobProps[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return softwareJobs;
};

const SoftwareJobs = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const jobsPerPage = 5;
  
  // Get search term from location state if it exists
  useEffect(() => {
    if (location.state?.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    }
  }, [location.state]);
  
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

  const handleShare = async (job: JobProps) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${job.title} at ${job.company}`,
          text: `Check out this job opportunity: ${job.title} at ${job.company}`,
          url: job.applyLink || window.location.href
        });
      } else {
        await navigator.clipboard.writeText(job.applyLink || window.location.href);
        toast({
          title: "Link copied!",
          description: "The job link has been copied to your clipboard."
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Couldn't share",
        description: "Please try copying the link manually.",
        variant: "destructive"
      });
    }
  };

  const filteredJobs = jobs?.filter(job => {
    const matchesSearch = searchTerm 
      ? job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesLocation = locationFilter && locationFilter !== 'all-locations' 
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
              
              <div className="mt-8 flex justify-center">
                <form onSubmit={handleSearch} className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dhara-blue/70" size={20} />
                  <input
                    type="text"
                    placeholder="Search for jobs, skills, or companies"
                    className="w-full py-3 px-10 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-dhara-light-blue"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full py-1.5 px-4 bg-dhara-blue hover:bg-dhara-blue/90">
                    Search
                  </Button>
                </form>
              </div>
              
              <div className="mt-6">
                <a 
                  href="https://chat.whatsapp.com/CGguruZu2nEJfjNPT0trdm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white group transition-all duration-300 transform hover:scale-105 hover:shadow-lg px-6 py-3 rounded-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  <MessageSquare size={20} className="group-hover:animate-pulse" />
                  <span className="relative z-10">Join Our WhatsApp Community</span>
                  <Send size={18} className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </a>
              </div>
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
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
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
                        <SelectItem value="Contract">Contract</SelectItem>
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
                        <SelectItem value="Entry Level">Entry-Level</SelectItem>
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
                    <SelectItem value="Contract">Contract</SelectItem>
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
                    <SelectItem value="Entry Level">Entry-Level</SelectItem>
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
              {isLoading ? (
                <p className="text-dhara-gray">Loading job data...</p>
              ) : filteredJobs ? (
                <p className="text-dhara-gray">
                  Showing {currentJobs?.length} of {filteredJobs.length} job opportunities (Total: {jobs?.length || 0} positions)
                </p>
              ) : null}
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
                  <Search size={48} className="mx-auto text-dhara-gray opacity-50 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No matching jobs found</h3>
                  <p className="text-dhara-gray">Try adjusting your search or filter criteria.</p>
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
                  <JobCard key={job.id} job={job} onShare={() => handleShare(job)} />
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
