
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Clock, Building, ExternalLink, ChevronLeft, Calendar, GraduationCap, DollarSign } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { JobProps } from '@/components/JobCard';

// Mock data for the software job details
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

// Function to fetch job details
const fetchJobDetails = async (id: string): Promise<JobProps | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real implementation, we would call an actual API
  return softwareJobs.find(job => job.id === id);
};

const SoftwareJobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobProps | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getJobDetails = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const jobData = await fetchJobDetails(id);
          setJob(jobData);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load job details. Please try again.",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    getJobDetails();
    window.scrollTo(0, 0);
  }, [id, toast]);

  const handleApply = () => {
    if (job?.applyLink) {
      window.open(job.applyLink, '_blank');
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="bg-dhara-blue py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Link 
                to="/jobs/software-development" 
                className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
              >
                <ChevronLeft size={16} className="mr-1" />
                Back to Software Jobs
              </Link>
              
              {isLoading ? (
                <div className="h-16 w-full animate-pulse bg-white/10 rounded-md"></div>
              ) : job ? (
                <div className="text-white">
                  <h1 className="heading-xl mb-4 animate-fade-in">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-white/85 mb-6">
                    <div className="flex items-center">
                      <Building size={18} className="mr-2" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={18} className="mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase size={18} className="mr-2" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="mr-2" />
                      <span>Posted {job.postedDate}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-white text-dhara-blue hover:bg-white/90"
                      onClick={handleApply}
                    >
                      <ExternalLink size={18} className="mr-2" />
                      Apply Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-white text-white hover:bg-white/10"
                    >
                      Save Job
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-white text-center">
                  <h1 className="heading-lg mb-4">Job Not Found</h1>
                  <p className="text-white/85 mb-6">
                    The job you're looking for doesn't exist or has been removed.
                  </p>
                  <Button asChild className="bg-white text-dhara-blue hover:bg-white/90">
                    <Link to="/jobs/software-development">
                      Browse Software Jobs
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {job && !isLoading && (
          <section className="py-12">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Job Details */}
                  <div className="md:col-span-2 space-y-8">
                    <div>
                      <h2 className="heading-md text-dhara-blue mb-4">Job Description</h2>
                      <p className="text-dhara-gray whitespace-pre-line">{job.description}</p>
                    </div>
                    
                    <div>
                      <h2 className="heading-md text-dhara-blue mb-4">Responsibilities</h2>
                      <ul className="list-disc pl-5 space-y-2 text-dhara-gray">
                        <li>Design, develop, and maintain software applications</li>
                        <li>Collaborate with cross-functional teams to define requirements</li>
                        <li>Write clean, maintainable, and efficient code</li>
                        <li>Debug and troubleshoot software issues</li>
                        <li>Participate in code reviews and knowledge sharing</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h2 className="heading-md text-dhara-blue mb-4">Requirements</h2>
                      <ul className="list-disc pl-5 space-y-2 text-dhara-gray">
                        <li>{job.education}</li>
                        <li>Knowledge of programming languages (e.g., JavaScript, Java, Python)</li>
                        <li>Basic understanding of web technologies (HTML, CSS)</li>
                        <li>Good communication and teamwork skills</li>
                        <li>Problem-solving aptitude</li>
                      </ul>
                    </div>
                    
                    <div className="pt-6">
                      <Button 
                        size="lg" 
                        className="bg-dhara-blue hover:bg-dhara-blue/90 w-full sm:w-auto"
                        onClick={handleApply}
                      >
                        <ExternalLink size={18} className="mr-2" />
                        Apply for this Position
                      </Button>
                    </div>
                  </div>
                  
                  {/* Job Summary */}
                  <div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-lg mb-4">Job Summary</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-dhara-gray">Job Title</p>
                          <p className="font-medium">{job.title}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-dhara-gray">Company</p>
                          <p className="font-medium">{job.company}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-dhara-gray">Location</p>
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-2 text-dhara-gray" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-dhara-gray">Employment Type</p>
                          <div className="flex items-center">
                            <Briefcase size={16} className="mr-2 text-dhara-gray" />
                            <span>{job.type}</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-dhara-gray">Experience Level</p>
                          <span>{job.level}</span>
                        </div>
                        
                        {job.salary && (
                          <div>
                            <p className="text-sm text-dhara-gray">Salary Range</p>
                            <div className="flex items-center">
                              <DollarSign size={16} className="mr-2 text-dhara-gray" />
                              <span>{job.salary}</span>
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-sm text-dhara-gray">Education</p>
                          <div className="flex items-center">
                            <GraduationCap size={16} className="mr-2 text-dhara-gray" />
                            <span>{job.education}</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-dhara-gray">Posted</p>
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2 text-dhara-gray" />
                            <span>{job.postedDate}</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-dhara-gray">Source</p>
                          <span>{job.source}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Related Jobs Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="heading-md text-dhara-blue mb-6">Similar Positions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {softwareJobs.filter(j => j.id !== id).slice(0, 4).map((relatedJob) => (
                  <div key={relatedJob.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">{relatedJob.title}</h3>
                    <p className="text-dhara-gray mb-4">{relatedJob.company}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center text-sm text-dhara-gray">
                        <MapPin size={14} className="mr-1" />
                        <span>{relatedJob.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-dhara-gray">
                        <Briefcase size={14} className="mr-1" />
                        <span>{relatedJob.type}</span>
                      </div>
                    </div>
                    
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full text-dhara-blue border-dhara-blue hover:bg-dhara-blue/5"
                    >
                      <Link to={`/jobs/software-development/${relatedJob.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default SoftwareJobDetails;
