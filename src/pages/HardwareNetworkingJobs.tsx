import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
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
import { toast } from '@/hooks/use-toast';

const hardwareJobs: JobProps[] = [
  {
    id: "hw1",
    title: "Hardware Engineer (Experienced)",
    company: "Intel",
    location: "Bengaluru, India",
    type: "Full-Time",
    level: "Senior",
    salary: "Not Disclosed",
    postedDate: "Just now",
    description: "Design and develop cutting-edge hardware solutions for Intel processors.",
    source: "LinkedIn",
    applyLink: "https://jobs.intel.com/job/bengaluru/hardware-engineer/411/12345678",
    isNew: true
  },
  {
    id: "hw2",
    title: "Junior Hardware Design Engineer (Fresher)",
    company: "NVIDIA",
    location: "Pune, India",
    type: "Full-Time",
    level: "Entry-Level",
    salary: "Not Disclosed",
    postedDate: "2 days ago",
    description: "Assist in GPU hardware design and testing.",
    source: "Indeed",
    applyLink: "https://www.nvidia.com/en-us/about-nvidia/careers/",
    isNew: true
  },
  {
    id: "hw3",
    title: "Hardware Test Engineer (Experienced)",
    company: "Qualcomm",
    location: "Hyderabad, India",
    type: "Full-Time",
    level: "Mid-Level",
    salary: "Not Disclosed",
    postedDate: "3 days ago",
    description: "Validate hardware performance for mobile chipsets.",
    source: "Indeed",
    applyLink: "https://qualcomm.wd5.myworkdayjobs.com/External/job/Hyderabad",
    isNew: true
  },
  {
    id: "hw4",
    title: "Hardware Development Engineer (Experienced)",
    company: "Apple",
    location: "Cupertino, CA, USA",
    type: "Full-Time",
    level: "Senior",
    salary: "Not Disclosed",
    postedDate: "Just now",
    description: "Work on next-gen Apple hardware products.",
    source: "LinkedIn",
    applyLink: "https://jobs.apple.com/en-us/details/200123456",
    isNew: true
  },
  {
    id: "hw5",
    title: "Hardware Engineer I (Fresher)",
    company: "Dell Technologies",
    location: "Chennai, India",
    type: "Full-Time",
    level: "Entry-Level",
    salary: "Not Disclosed",
    postedDate: "1 week ago",
    description: "Support server hardware design and troubleshooting.",
    source: "LinkedIn",
    applyLink: "https://jobs.dell.com/job/chennai/hardware-engineer-i/375/78901234",
    isNew: true
  },
  {
    id: "hw6",
    title: "Hardware Engineer (Experienced)",
    company: "Cisco",
    location: "Bengaluru, India",
    type: "Full-Time",
    level: "Mid-Level",
    salary: "Not Disclosed",
    postedDate: "5 days ago",
    description: "Develop networking hardware solutions.",
    source: "LinkedIn",
    applyLink: "https://jobs.cisco.com/jobs/1234567",
    isNew: true
  },
  {
    id: "hw7",
    title: "Silicon Design Engineer (Fresher)",
    company: "AMD",
    location: "Hyderabad, India",
    type: "Full-Time",
    level: "Entry-Level",
    salary: "Not Disclosed",
    postedDate: "Just now",
    description: "Entry-level role in CPU/GPU silicon design.",
    source: "Indeed",
    applyLink: "https://www.amd.com/en/corporate/careers",
    isNew: true
  },
  {
    id: "hw8",
    title: "Analog Hardware Engineer (Experienced)",
    company: "Texas Instruments",
    location: "Dallas, TX, USA",
    type: "Full-Time",
    level: "Senior",
    salary: "Not Disclosed",
    postedDate: "4 days ago",
    description: "Design analog circuits for industrial applications.",
    source: "LinkedIn",
    applyLink: "https://careers.ti.com/job/123456",
    isNew: true
  },
  {
    id: "hw9",
    title: "Hardware Support Engineer (Fresher)",
    company: "HCL Technologies",
    location: "Noida, India",
    type: "Full-Time",
    level: "Entry-Level",
    salary: "Not Disclosed",
    postedDate: "1 week ago",
    description: "Provide hardware troubleshooting and support.",
    source: "Naukri",
    applyLink: "https://www.hcltech.com/careers",
    isNew: true
  },
  {
    id: "hw10",
    title: "Hardware R&D Engineer (Experienced)",
    company: "Samsung",
    location: "Suwon, South Korea",
    type: "Full-Time",
    level: "Senior",
    salary: "Not Disclosed",
    postedDate: "2 days ago",
    description: "Innovate hardware for consumer electronics.",
    source: "LinkedIn",
    applyLink: "https://www.samsung.com/global/careers",
    isNew: true
  },
  {
    id: "hw11",
    title: "Hardware Validation Engineer (Fresher)",
    company: "Micron Technology",
    location: "Hyderabad, India",
    type: "Full-Time",
    level: "Entry-Level",
    salary: "Not Disclosed",
    postedDate: "Just now",
    description: "Test and validate memory hardware.",
    source: "Naukri",
    applyLink: "https://www.micron.com/careers",
    isNew: true
  },
  {
    id: "hw12",
    title: "Hardware Design Engineer (Experienced)",
    company: "HP Inc.",
    location: "Bengaluru, India",
    type: "Full-Time",
    level: "Mid-Level",
    salary: "Not Disclosed",
    postedDate: "3 days ago",
    description: "Design hardware for printers and PCs.",
    source: "LinkedIn",
    applyLink: "https://jobs.hp.com/job/bengaluru/hardware-design-engineer/12345",
    isNew: true
  },
  {
    id: "hw13",
    title: "Hardware Technician (Fresher)",
    company: "Lenovo",
    location: "Mumbai, India",
    type: "Full-Time",
    level: "Entry-Level",
    salary: "Not Disclosed",
    postedDate: "1 week ago",
    description: "Assemble and test hardware components.",
    source: "Indeed",
    applyLink: "https://www.lenovo.com/in/en/jobs",
    isNew: true
  },
  {
    id: "hw14",
    title: "Senior Hardware Engineer (Experienced)",
    company: "Broadcom",
    location: "San Jose, CA, USA",
    type: "Full-Time",
    level: "Senior",
    salary: "Not Disclosed",
    postedDate: "Just now",
    description: "Lead hardware development for networking chips.",
    source: "LinkedIn",
    applyLink: "https://www.broadcom.com/company/careers",
    isNew: true
  },
  {
    id: "hw15",
    title: "Hardware Engineer (Fresher)",
    company: "Wipro",
    location: "Pune, India",
    type: "Full-Time",
    level: "Entry-Level",
    salary: "Not Disclosed",
    postedDate: "5 days ago",
    description: "Assist in hardware integration and testing.",
    source: "Naukri",
    applyLink: "https://careers.wipro.com/careers-home",
    isNew: true
  }
];

const fetchHardwareJobs = async (): Promise<JobProps[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return hardwareJobs;
};

const HardwareNetworkingJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['hardwareJobs'],
    queryFn: fetchHardwareJobs
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Applied",
      description: `Searching for "${searchTerm}" jobs`,
    });
  };

  const filteredJobs = jobs?.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter && locationFilter !== "all-locations" ? job.location.includes(locationFilter) : true;
    const matchesType = typeFilter && typeFilter !== "all-types" ? job.type === typeFilter : true;
    const matchesLevel = levelFilter && levelFilter !== "all-levels" ? job.level === levelFilter : true;
    
    return matchesSearch && matchesLocation && matchesType && matchesLevel;
  });

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
                Hardware & Networking Jobs
              </h1>
              <p className="text-xl text-white/85 animate-fade-in">
                Explore hardware engineering, VLSI, embedded systems, and networking opportunities from leading tech companies.
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
                  placeholder="Search by title, company, or keyword" 
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
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Noida">Noida</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
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
                Hardware & Networking Opportunities
              </h2>
              {filteredJobs && (
                <p className="text-dhara-gray">
                  Showing {filteredJobs.length} job opportunities
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
                </div>
              ) : (
                filteredJobs?.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              )}
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-dhara-blue">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-lg text-white mb-6">Looking for Other Hardware Opportunities?</h2>
              <p className="text-white/80 text-lg mb-8">
                Submit your resume and we'll notify you when relevant hardware or networking positions become available.
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

export default HardwareNetworkingJobs;
