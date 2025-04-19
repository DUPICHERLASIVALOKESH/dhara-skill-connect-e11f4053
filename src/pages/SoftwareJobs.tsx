import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobCard, { JobProps } from '@/components/JobCard';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Briefcase, MapPin, ArrowLeft, Filter, SlidersHorizontal, MessageSquare, Send, Share2 } from 'lucide-react';
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
  // ... keep existing job data
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
              
              <div className="mt-8 flex justify-center">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dhara-blue/70" size={20} />
                  <input
                    type="text"
                    placeholder="Search for jobs, skills, or companies"
                    className="w-full py-3 px-10 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-dhara-light-blue"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full py-1.5 px-4 bg-dhara-blue hover:bg-dhara-blue/90">
                    Search
                  </Button>
                </div>
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
            
            <Card className="mb-8 bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Join Our Job Community</CardTitle>
                <CardDescription className="text-green-700">
                  Get regular updates on latest job opportunities across India
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 mb-4">
                  Stay updated with the latest job openings, recruitment drives, and career opportunities by joining our WhatsApp community group.
                </p>
              </CardContent>
              <CardFooter>
                <a 
                  href="https://chat.whatsapp.com/CGguruZu2nEJfjNPT0trdm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  <MessageSquare size={16} />
                  Join WhatsApp Group
                </a>
              </CardFooter>
            </Card>
            
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
                  <div key={job.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-border">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-md flex-shrink-0 bg-dhara-blue/10 text-dhara-blue flex items-center justify-center">
                            <Briefcase size={20} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-dhara-blue">{job.title}</h3>
                            <p className="text-dhara-dark font-medium">{job.company}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-dhara-gray">
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Briefcase size={16} className="mr-1" />
                            {job.type}
                          </div>
                          {job.education && (
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-1" />
                              {job.education}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="outline" className="bg-dhara-light-gray/50 hover:bg-dhara-light-gray/75 text-dhara-dark">
                            {job.level}
                          </Badge>
                          {job.source && (
                            <Badge variant="secondary" className="bg-dhara-blue/10 hover:bg-dhara-blue/20 text-dhara-blue border-none">
                              via {job.source}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-dhara-gray mb-4">{job.description}</p>
                      <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <Button 
                          asChild 
                          className="bg-dhara-blue hover:bg-dhara-blue/90"
                        >
                          <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                            Apply Now
                          </a>
                        </Button>
                        <Button 
                          asChild 
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <a href="https://chat.whatsapp.com/CGguruZu2nEJfjNPT0trdm" target="_blank" rel="noopener noreferrer">
                            <MessageSquare size={16} className="mr-2" />
                            Join WhatsApp Group
                          </a>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="bg-white hover:bg-gray-50 text-dhara-blue border-dhara-blue/20"
                          onClick={() => handleShare(job)}
                        >
                          <Share2 size={16} className="mr-2" />
                          Share Job
                        </Button>
                      </div>
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
