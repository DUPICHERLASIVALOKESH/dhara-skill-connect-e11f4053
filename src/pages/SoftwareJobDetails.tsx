
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Briefcase, Calendar, MapPin, DollarSign, GraduationCap, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Define the job type
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  postedDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits?: string[];
  applicationUrl: string;
  logo?: string;
  salary?: string;
  education?: string;
}

// Sample software job data with application URLs
const softwareJobs: Record<string, Job> = {
  "soft1": {
    id: "soft1",
    title: "Junior Full Stack Developer",
    company: "TestUnity",
    location: "Bengaluru, Karnataka, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Bachelor's degree in Computer Science",
    postedDate: "Today",
    description: "We are looking for a talented Junior Full Stack Developer to join our team. The ideal candidate will have knowledge of React, Node.js, and basic database concepts.",
    requirements: [
      "0-2 years of experience in web development",
      "Knowledge of JavaScript, HTML, CSS",
      "Familiarity with React or similar frontend frameworks",
      "Basic understanding of Node.js and Express",
      "Willingness to learn and grow"
    ],
    responsibilities: [
      "Develop and maintain web applications",
      "Work with senior developers to implement new features",
      "Debug and fix issues in existing code",
      "Write clean, maintainable code",
      "Participate in code reviews"
    ],
    benefits: [
      "Competitive salary",
      "Flexible work hours",
      "Remote work options",
      "Health insurance",
      "Professional development opportunities"
    ],
    applicationUrl: "https://www.testunity.com/careers"
  },
  "soft2": {
    id: "soft2",
    title: "Software Engineer Fresher",
    company: "Karnataka Power Corporation Ltd",
    location: "Chennai, Tamil Nadu, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Bachelor's degree in Engineering",
    postedDate: "Today",
    description: "Join our innovative team at Karnataka Power Corporation Ltd. We're seeking motivated freshers with a passion for technology and problem-solving.",
    requirements: [
      "B.E/B.Tech in Computer Science or related field",
      "Good understanding of programming concepts",
      "Knowledge of data structures and algorithms",
      "Analytical and problem-solving skills",
      "Good communication skills"
    ],
    responsibilities: [
      "Develop and maintain software applications",
      "Write clean, efficient code",
      "Troubleshoot and debug applications",
      "Collaborate with cross-functional teams",
      "Document technical specifications"
    ],
    benefits: [
      "Government benefits package",
      "Job security",
      "Housing allowance",
      "Medical benefits",
      "Performance-based increments"
    ],
    applicationUrl: "https://karnatakapower.gov.in/careers"
  },
  "soft3": {
    id: "soft3",
    title: "Junior Software Developer Internship",
    company: "Confidential",
    location: "Remote, India",
    type: "Internship",
    level: "Entry-Level",
    education: "Degree in Computer Science",
    postedDate: "Yesterday",
    description: "Exciting internship opportunity for motivated individuals. Learn from experienced developers while working on real-world projects.",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Basic knowledge of programming languages (Java, Python, etc.)",
      "Eagerness to learn and grow",
      "Problem-solving mindset",
      "Good communication skills"
    ],
    responsibilities: [
      "Assist in developing software components",
      "Learn coding standards and best practices",
      "Contribute to team projects",
      "Perform testing and debugging",
      "Document work and present findings"
    ],
    benefits: [
      "Stipend",
      "Flexible work hours",
      "Remote work option",
      "Learning opportunities",
      "Potential for full-time employment"
    ],
    applicationUrl: "https://internshala.com/software-development-jobs"
  },
  "soft4": {
    id: "soft4",
    title: "Associate Software Engineer",
    company: "Notetech Software",
    location: "Kerala, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Bachelor's degree in Computer Science",
    postedDate: "Yesterday",
    description: "Notetech Software is hiring fresh talent for our expanding development team. Be part of innovative projects and cutting-edge technology.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Knowledge of programming languages (Java, Python, JavaScript)",
      "Understanding of software development methodologies",
      "Problem-solving abilities",
      "Team player attitude"
    ],
    responsibilities: [
      "Develop software applications according to requirements",
      "Write clean, maintainable code",
      "Participate in code reviews",
      "Debug and resolve software defects",
      "Contribute to technical documentation"
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Professional development allowance",
      "Work-life balance",
      "Team outings and events"
    ],
    applicationUrl: "https://notetech.com/careers"
  },
  "soft5": {
    id: "soft5",
    title: "Trainee Software Engineer",
    company: "Makinus",
    location: "Tirunelveli, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Bachelor's degree in Computer Science",
    postedDate: "2 days ago",
    description: "Start your career with Makinus as a Trainee Software Engineer. We provide comprehensive training programs to help you grow professionally.",
    requirements: [
      "B.E/B.Tech in Computer Science or IT",
      "Basic programming knowledge",
      "Quick learner with positive attitude",
      "Good communication skills",
      "Problem-solving aptitude"
    ],
    responsibilities: [
      "Learn various technologies and tools",
      "Assist in software development process",
      "Write and test code under supervision",
      "Document work and processes",
      "Participate in team meetings and discussions"
    ],
    benefits: [
      "Training stipend",
      "Performance-based incentives",
      "Growth opportunities",
      "Modern work environment",
      "Skill development programs"
    ],
    applicationUrl: "https://makinus.in/careers"
  },
  "soft6": {
    id: "soft6",
    title: "Software Engineer Trainee",
    company: "Genora Infotech",
    location: "Goa, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Bachelor's degree in Computer Science",
    postedDate: "3 days ago",
    description: "Genora Infotech is looking for talented software engineer trainees to join our dynamic team in Goa.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Knowledge of programming fundamentals",
      "Willingness to learn new technologies",
      "Analytical thinking",
      "Team collaboration skills"
    ],
    responsibilities: [
      "Learn and apply programming skills",
      "Assist in software development projects",
      "Test and debug code",
      "Document technical processes",
      "Support senior team members"
    ],
    benefits: [
      "Competitive salary",
      "Beach-side office location",
      "Work-life balance",
      "Regular training sessions",
      "Career advancement opportunities"
    ],
    applicationUrl: "https://genorainfotech.com/join-us"
  },
  "soft7": {
    id: "soft7",
    title: "Junior Software Engineer - Java",
    company: "Virtusa",
    location: "Bengaluru, Karnataka, India",
    type: "Full-Time",
    level: "Entry-Level",
    education: "Bachelor's degree in Computer Science",
    postedDate: "1 week ago",
    description: "Virtusa is hiring Junior Software Engineers with Java experience. Join our global team of technology professionals.",
    requirements: [
      "Bachelor's degree in Computer Science or Engineering",
      "Knowledge of Java programming",
      "Understanding of object-oriented concepts",
      "Basic knowledge of SQL",
      "Good logical and analytical skills"
    ],
    responsibilities: [
      "Develop and maintain Java applications",
      "Write clean, efficient, and maintainable code",
      "Troubleshoot and debug issues",
      "Participate in code reviews",
      "Collaborate with development teams"
    ],
    benefits: [
      "Competitive compensation",
      "Health benefits",
      "Learning and development programs",
      "Global exposure",
      "Career advancement paths"
    ],
    applicationUrl: "https://www.virtusa.com/careers"
  }
};

const SoftwareJobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id && softwareJobs[id]) {
      setJob(softwareJobs[id]);
    }
  }, [id]);
  
  const handleApply = () => {
    if (job?.applicationUrl) {
      // Open company's application page in a new tab
      window.open(job.applicationUrl, '_blank');
      
      toast({
        title: "Application Started",
        description: `You're being redirected to ${job.company}'s application page.`,
      });
    }
  };
  
  if (!job) {
    return (
      <>
        <Navbar />
        <main className="pt-16 md:pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
              <p className="mb-6">The job you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link to="/jobs/software-development">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Software Jobs
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        {/* Job Header */}
        <section className="bg-dhara-blue py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Link 
                  to="/jobs/software-development" 
                  className="inline-flex items-center text-white/80 hover:text-white transition-colors"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Back to Software Jobs
                </Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-dhara-blue mb-2">{job.title}</h1>
                    <h2 className="text-xl font-semibold text-dhara-dark mb-4">{job.company}</h2>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="flex items-center text-dhara-gray">
                        <MapPin size={16} className="mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-dhara-gray">
                        <Briefcase size={16} className="mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center text-dhara-gray">
                        <Calendar size={16} className="mr-1" />
                        Posted {job.postedDate}
                      </div>
                      {job.education && (
                        <div className="flex items-center text-dhara-gray">
                          <GraduationCap size={16} className="mr-1" />
                          {job.education}
                        </div>
                      )}
                      {job.salary && (
                        <div className="flex items-center text-dhara-gray">
                          <DollarSign size={16} className="mr-1" />
                          {job.salary}
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <Badge variant="outline" className="bg-dhara-blue/10 text-dhara-blue">
                        {job.level}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 md:self-center">
                    <Button 
                      onClick={handleApply} 
                      className="bg-dhara-blue hover:bg-dhara-blue/90"
                      size="lg"
                    >
                      Apply Now <ExternalLink size={16} className="ml-2" />
                    </Button>
                    <p className="text-xs text-center text-dhara-gray">
                      You'll be redirected to the company's website
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Job Details */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-border p-6 md:p-8 mb-8">
                <h2 className="text-xl font-bold mb-4">Job Description</h2>
                <p className="text-dhara-gray mb-6">{job.description}</p>
                
                <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-dhara-gray">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-dhara-gray">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
                
                {job.benefits && (
                  <>
                    <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-dhara-gray">
                      {job.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </>
                )}
                
                <div className="mt-8 pt-6 border-t border-border">
                  <Button 
                    onClick={handleApply} 
                    className="bg-dhara-blue hover:bg-dhara-blue/90"
                  >
                    Apply for this position <ExternalLink size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-dhara-gray mb-4">Not the right job for you?</p>
                <Button asChild variant="outline">
                  <Link to="/jobs/software-development">
                    View More Software Jobs
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

export default SoftwareJobDetails;
