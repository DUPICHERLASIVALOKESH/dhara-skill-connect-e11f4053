
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobCard, { JobProps } from '@/components/JobCard';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Briefcase, MapPin, ArrowLeft, Filter, SlidersHorizontal, MessageSquare, Send } from 'lucide-react';
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
  // New jobs added at the top
  {
    id: "goldmansachs1",
    title: "Analyst",
    company: "Goldman Sachs",
    location: "India (Multiple Locations)",
    type: "Full-Time",
    level: "Entry-Level",
    education: "2025 passouts",
    postedDate: "Today",
    salary: "23 LPA",
    description: "Goldman Sachs Engineering Analyst Hiring Program for 2025 passouts with a CTC of 23 LPA.",
    source: "Goldman Sachs Careers",
    applyLink: "https://www.goldmansachs.com/careers/students/programs-and-internships/india/engineering-analyst-campus-hiring-program"
  },
  {
    id: "latentforce1",
    title: "ML Internship (6 months)",
    company: "Latentforce.ai",
    location: "Remote",
    type: "Internship",
    level: "Entry-Level",
    education: "2025 passouts",
    postedDate: "Today",
    salary: "Not Disclosed",
    description: "ML Internship opportunity at Latentforce.ai for 6 months duration, open for 2025 passouts.",
    source: "Google Forms",
    applyLink: "https://docs.google.com/forms/d/e/1FAIpQLSdBEd2oz9TNb6ZVyZ8rpB4xTq7zRvZ7WOQKy_dOeFpR7gD3xQ/viewform"
  },
  {
    id: "browserstack_fullstack",
    title: "Software Engineer - Fullstack",
    company: "Browserstack",
    location: "Mumbai, Remote",
    type: "Full-Time",
    level: "Entry-Level",
    education: "2022/23/24 Graduates",
    postedDate: "Today",
    salary: "Not Disclosed",
    description: "Browserstack is hiring for SDE1 Fullstack role. Open for 2022, 2023, and 2024 graduates.",
    source: "Browserstack Careers",
    applyLink: "https://browserstack.wd3.myworkdayjobs.com/External/job/Mumbai-Remote/Software-Engineer---Fullstack--Mumbai---Remote-_JR101976"
  },
  {
    id: "browserstack_backend",
    title: "Software Engineer - Backend",
    company: "Browserstack",
    location: "Mumbai",
    type: "Full-Time",
    level: "Entry-Level",
    education: "2022/23/24 Graduates",
    postedDate: "Today",
    salary: "Not Disclosed",
    description: "Browserstack is hiring for SDE1 Backend role. Open for 2022, 2023, and 2024 graduates.",
    source: "Browserstack Careers",
    applyLink: "https://browserstack.wd3.myworkdayjobs.com/External/job/Mumbai-Remote/Software-Engineer---Backend--Mumbai-_JR101974"
  },
  {
    id: "amazon_sde1",
    title: "SDE1 - Contractual",
    company: "Amazon",
    location: "India",
    type: "Contract",
    level: "Entry-Level",
    education: "2022/23/24 Graduates",
    postedDate: "Yesterday",
    salary: "Not Disclosed",
    description: "Amazon is hiring for SDE1 contractual positions. Open for 2022, 2023, and 2024 graduates.",
    source: "Amazon Jobs",
    applyLink: "https://www.amazon.jobs/en/jobs/2932723/sde-1-ftc"
  },
  {
    id: "kaar_infotech",
    title: "Software Engineer",
    company: "KAAR Infotech",
    location: "India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "2024 Graduates",
    postedDate: "Yesterday",
    salary: "Not Disclosed",
    description: "KAAR Infotech Mega Freshers Drive for 2024 passed out graduates. Multiple positions available.",
    source: "Google Forms",
    applyLink: "https://docs.google.com/forms/d/e/1FAIpQLSdrfrTEtj2z-SwvS4pxTA0iPsNvBl5cN0G26jEVoOxyTI-AwQ/viewform"
  },
  {
    id: "newrelic1",
    title: "Associate Software Engineer - Backend",
    company: "New Relic",
    location: "Hyderabad, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Not Specified",
    postedDate: "2 days ago",
    salary: "Not Disclosed",
    description: "New Relic is hiring Associate Software Engineers for backend development at their Hyderabad location.",
    source: "Greenhouse",
    applyLink: "https://job-boards.greenhouse.io/newrelic/jobs/4588035008?gh_jid=4588035008"
  },
  {
    id: "fintech_global",
    title: "Junior Software Developer",
    company: "Fintech Global Center",
    location: "Ahmedabad, Gandhinagar",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Not Specified",
    postedDate: "2 days ago",
    salary: "Not Disclosed",
    description: "Fintech Global Center is hiring Junior Software Developers for their Ahmedabad and Gandhinagar locations.",
    source: "Internshala",
    applyLink: "https://internshala.com/job/detail/fresher-junior-software-developer-job-in-multiple-locations-at-fintech-global-center1742476676"
  },
  {
    id: "citi1",
    title: "Technology Infrastructure - Summer Analyst",
    company: "Citi",
    location: "Pune, India",
    type: "Internship",
    level: "Entry-Level",
    education: "Not Specified",
    postedDate: "3 days ago",
    salary: "Not Disclosed",
    description: "Citi is hiring Technology Infrastructure Summer Analysts for their Pune location. Great opportunity for students interested in financial technology.",
    source: "Citi Careers",
    applyLink: "https://jobs.citi.com/job/-/-/287/79037940272?source=APPLICANT_SOURCE-3-354&utm_source=linkedin.com&utm_medium=job_posting&utm_campaign=apac_experienced&utm_content=social_media&utm_term=393693070&ss=paid"
  },
  // Original jobs
  {
    id: "united1",
    title: "Associate Engineer",
    company: "United Airlines",
    location: "Gurugram, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "BE/BTech",
    postedDate: "3 days ago",
    salary: "Not Disclosed",
    description: "United Airlines Recruitment 2025 for Associate Engineer. Fresh graduates with BE/BTech qualifications can apply. Both freshers and experienced candidates are welcome.",
    source: "Foundit",
    applyLink: "https://www.foundit.in/seeker/single-page-registration?from=asterix&spl=IN_paid_job_boards_acq_affiliates_asterix_Feed&gd=1&jobid=106234111&action=apply&utm_campaign=IN_paid_job_boards_acq_affiliates_asterix_Feed&utm_medium=affiliates&utm_source=asterix"
  },
  {
    id: "emerson1",
    title: "Graduate Engineer Trainee",
    company: "Emerson",
    location: "Pune, Maharashtra (Hybrid)",
    type: "Full-Time",
    level: "Entry-Level",
    education: "BCA/BSc",
    postedDate: "Today",
    salary: "Not Disclosed",
    description: "Emerson Off Campus Drive 2025 for Graduate Engineer Trainee. BCA/BSc freshers can apply for this opportunity in Pune with a hybrid work model.",
    source: "Oracle Cloud",
    applyLink: "https://hdjq.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1/job/25016123/?utm_medium=jobshare&utm_source=External+Job+Share"
  },
  {
    id: "infosys1",
    title: "Internship - Multiple Sectors",
    company: "Infosys",
    location: "Mangalore, Chennai, Chandigarh, Bhubaneshwar",
    type: "Internship",
    level: "Entry-Level",
    education: "Not Specified",
    postedDate: "Today",
    salary: "Not Disclosed",
    description: "Infosys offering 12-month internships across multiple sectors in locations including Mangalore, Chennai, Chandigarh, and Bhubaneshwar. Open to freshers.",
    source: "PM Internship Portal",
    applyLink: "https://pminternship.mca.gov.in/"
  },
  {
    id: "microland1",
    title: "Associate Software Development Engineer - Automation & Platforms",
    company: "Microland",
    location: "Bengaluru, Karnataka",
    type: "Full-Time",
    level: "Entry-Level",
    education: "B.E / B.Tech / MCA",
    postedDate: "Yesterday",
    salary: "Not Disclosed",
    description: "Microland is hiring for Associate Software Development Engineer specializing in Automation & Platforms. Candidates with B.E / B.Tech / MCA qualifications can apply.",
    source: "Microland Careers",
    applyLink: "https://careers.microland.com/#!/job-view/associate-software-development-engineer-automation-platforms-india-bengaluru-2025031221310592"
  },
  {
    id: "cognizant1",
    title: "GenC Next, GenC Pro & GenC",
    company: "Cognizant",
    location: "Multiple Locations",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Engineering graduates (2024)",
    postedDate: "Yesterday",
    salary: "Not Disclosed",
    description: "Cognizant Off-Campus hiring for 2024 Engineering graduates for GenC Next, GenC Pro & GenC programs across Chennai, Bangalore, Hyderabad, Kolkata, Pune, Coimbatore, Kochi, Bhubaneswar, and Indore. Apply by March 21, 2025.",
    source: "Superset",
    applyLink: "https://app.joinsuperset.com/join/#/signup/student/jobprofiles/80927bc8-841c-4055-a89d-e207fdb67bd9"
  },
  {
    id: "turing1",
    title: "Java Developer",
    company: "Turing",
    location: "Remote, India",
    type: "Full-Time",
    level: "Not Specified",
    education: "Not Specified",
    postedDate: "2 days ago",
    salary: "Not Disclosed",
    description: "Turing is looking for skilled Java Developers to join their team. Remote work opportunity for developers based in India.",
    source: "Turing",
    applyLink: "https://developers.turing.com/job/home?country=India&jobCode=yVjaf8-_Vwda&job_id=21731&job_id=21731&n=https%3A%2F%2Fdevelopers.turing.com%2Fdirect-apply%2FyVjaf8-_Vwda%3Fcountry%3DIndia&s=ads_developers_linkedinJobs"
  },
  {
    id: "arabelle1",
    title: "Graduate Apprentice Engineer",
    company: "Arabelle Solutions (EDF Group)",
    location: "Noida, India",
    type: "Apprenticeship",
    level: "Entry-Level",
    education: "BE/BTech (Mechanical)",
    postedDate: "2 days ago",
    salary: "Not Disclosed",
    description: "Arabelle Solutions (EDF Group) is hiring Graduate Apprentice Engineers. Open to 2023 or 2024 BE/BTech (Mechanical) graduates. Female candidates are preferred.",
    source: "Arabelle Careers",
    applyLink: "https://careers.arabellesolutions.com/2025/03/18/graduate-apprentice-engineer/?s=Graduate%20Apprentice%20Engineer&metierid=0&entiteid=0&language=en"
  },
  {
    id: "swaransoft1",
    title: "AI Intern",
    company: "Swaransoft",
    location: "Gurugram, India",
    type: "Internship",
    level: "Entry-Level",
    education: "Not Specified",
    postedDate: "3 days ago",
    salary: "Not Disclosed",
    description: "Swaransoft is offering AI Internship opportunities in Gurugram. Great opportunity for students interested in artificial intelligence.",
    source: "Keka",
    applyLink: "https://swaransoft.keka.com/careers/jobdetails/74266"
  },
  {
    id: "ubs1",
    title: "Intern",
    company: "UBS",
    location: "Hyderabad, India",
    type: "Internship",
    level: "Entry-Level",
    education: "Not Specified",
    postedDate: "3 days ago",
    salary: "Not Disclosed",
    description: "UBS is offering internship opportunities in Hyderabad. Great chance to gain experience with a global financial services firm.",
    source: "UBS Careers",
    applyLink: "https://jobs.ubs.com/TGnewUI/Search/home/HomeWithPreLoad?partnerid=25008&siteid=5012&PageType=JobDetails&jobid=322266&codes=IINDD#jobDetails=322266_5012"
  },
  {
    id: "wipro1",
    title: "Management Trainee",
    company: "Wipro",
    location: "Gurugram, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Not Specified",
    postedDate: "4 days ago",
    salary: "Not Disclosed",
    description: "Wipro is hiring Management Trainees in Gurugram. This position offers great growth opportunities within a leading IT services company.",
    source: "Indeed",
    applyLink: "https://careers.wipro.com/job/Gurugram-Management-Trainee-122016/1151753555/?feedId=420455&utm_source=Indeed"
  },
  {
    id: "geaerospace1",
    title: "B.Tech Summer Internship: Electric Power",
    company: "GE Aerospace",
    location: "Bengaluru, India",
    type: "Internship",
    level: "Entry-Level",
    education: "B.Tech",
    postedDate: "4 days ago",
    salary: "Not Disclosed",
    description: "GE Aerospace is offering B.Tech Summer Internships in Electric Power at their Bengaluru location. Great opportunity for engineering students interested in aerospace.",
    source: "GE Careers",
    applyLink: "https://careers.geaerospace.com/global/en/job/R5005133/B-Tech-Summar-Internship-Electric-Power"
  },
  {
    id: "valeo1",
    title: "Intern Mechanical Design & System Integration",
    company: "Valeo",
    location: "Chennai, India",
    type: "Internship",
    level: "Entry-Level",
    education: "Not Specified",
    postedDate: "5 days ago",
    salary: "Not Disclosed",
    description: "Valeo is offering an internship opportunity for Mechanical Design & System Integration in Chennai. Great exposure to automotive technology and innovation.",
    source: "Workday",
    applyLink: "https://valeo.wd3.myworkdayjobs.com/en-US/valeo_jobs/details/Intern-Mechanical-Design---System-Integration_REQ2025053157?q=Intern%20Mechanical%20Design%20&%20System%20Integration"
  },
  {
    id: "gehealthcare1",
    title: "Trainee Engineer",
    company: "GE HealthCare",
    location: "Bengaluru, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "BE in Mechanical Engineering",
    postedDate: "5 days ago",
    salary: "Not Disclosed",
    description: "GE HealthCare is hiring Trainee Engineers in Bengaluru. Required qualification is BE in Mechanical Engineering. Great opportunity to start a career in healthcare technology.",
    source: "Indeed",
    applyLink: "https://careers.gehealthcare.com/global/en/job/GEVGHLGLOBALR4019758EXTERNALENGLOBAL/Trainee-Engineer?utm_source=indeed&utm_medium=phenom-feeds&ittk=AUJ5W0VPMR"
  },
  {
    id: "ibm1",
    title: "Application Developer - Cloud Full Stack",
    company: "IBM",
    location: "Hyderabad, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Not Specified",
    postedDate: "6 days ago",
    salary: "Not Disclosed",
    description: "IBM is hiring Application Developers specializing in Cloud Full Stack in Hyderabad. Open to fresh graduates from 2024/25 batches.",
    source: "IBM Careers",
    applyLink: "https://ibmglobal.avature.net/en_US/careers/JobDetail/Application-Developer-Cloud-FullStack/9273"
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
