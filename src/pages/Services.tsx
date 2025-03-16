import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AboutFAQ from '@/components/AboutFAQ';
import StickyCTA from '@/components/StickyCTA';
import HiringProcess from '@/components/HiringProcess';
import AnimatedStats from '@/components/AnimatedStats';
import { 
  Search, UserCheck, Building, Users, BriefcaseBusiness, GraduationCap, 
  Briefcase, FileSearch, PieChart, Award, Globe, CheckCircle2, MessageCircle,
  FileText, List, Clock, UserPlus, BarChart, Target, Filter
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Services = () => {
  const [showChat, setShowChat] = useState(false);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Testimonial data
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "HR Director, TechSolutions Inc.",
      quote: "DHARA has transformed our hiring process. Their team consistently delivers high-quality candidates that perfectly match our requirements. We've reduced our time-to-hire by 40%.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Rajiv Mehta",
      position: "CEO, HealthCare Innovations",
      quote: "As a growing healthcare company, finding specialized talent was our biggest challenge. DHARA understood our unique needs and has been instrumental in building our team of experts.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Emily Chen",
      position: "Operations Manager, Global Finance",
      quote: "What sets DHARA apart is their personal touch. They don't just send resumes, they understand our company culture and find candidates who truly fit our values and vision.",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Michael Rodriguez",
      position: "Software Engineer",
      quote: "I was looking for a career change, and DHARA didn't just find me a job—they found me the right job. Their career coaching and interview preparation were invaluable.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    }
  ];

  // Animation stats for the Why Choose Us section
  const stats = [
    { value: 1000, label: 'Successful Placements', icon: <Briefcase className="text-dhara-blue" /> },
    { value: 500, label: 'Partner Companies', icon: <Building className="text-dhara-blue" /> },
    { value: 95, label: 'Satisfaction Rate (%)', icon: <Award className="text-dhara-blue" /> },
    { value: 24, label: '24/7 Support', suffix: '/7', icon: <MessageCircle className="text-dhara-blue" /> }
  ];

  // Services data for employers
  const employerServices = [
    {
      icon: <Search />,
      title: "Talent Sourcing & Screening",
      description: "We identify and assess the best candidates for your company using advanced screening methodologies.",
      features: [
        "Custom talent pipeline development",
        "Advanced skills assessment",
        "Cultural fit evaluation"
      ]
    },
    {
      icon: <Filter />,
      title: "Resume Filtering & Shortlisting",
      description: "Save time by letting us handle the candidate shortlisting process with precision and efficiency.",
      features: [
        "AI-powered resume screening",
        "Qualification verification",
        "Priority candidate identification"
      ]
    },
    {
      icon: <UserCheck />,
      title: "Executive Search & Leadership Hiring",
      description: "Our specialized executive search team identifies and recruits top-level executives for key leadership positions.",
      features: [
        "C-suite and director-level placements",
        "Discreet recruitment campaigns",
        "Comprehensive candidate assessment"
      ]
    },
    {
      icon: <BriefcaseBusiness />,
      title: "Contract & Temporary Staffing",
      description: "Flexible staffing solutions to help businesses manage workload fluctuations and special projects.",
      features: [
        "Short to long-term placements",
        "Quick turnaround times",
        "Temp-to-perm options available"
      ]
    },
    {
      icon: <Globe />,
      title: "International Recruitment",
      description: "Expand globally with skilled professionals sourced from international talent markets.",
      features: [
        "International candidate sourcing",
        "Visa and relocation support",
        "Cross-cultural integration"
      ]
    },
    {
      icon: <BarChart />,
      title: "HR Consulting",
      description: "Expert advice and strategies to optimize your human resources practices and enhance workplace culture.",
      features: [
        "HR policy development",
        "Compensation structure analysis",
        "Employee engagement strategies"
      ]
    }
  ];

  // Services data for job seekers
  const jobSeekerServices = [
    {
      icon: <FileText />,
      title: "Resume Building & Optimization",
      description: "Get a professional resume designed to stand out in today's competitive job market.",
      features: [
        "ATS-friendly resume formatting",
        "Keyword optimization",
        "Professional content writing"
      ]
    },
    {
      icon: <UserPlus />,
      title: "Interview Preparation & Coaching",
      description: "Learn key strategies to excel in job interviews with personalized coaching sessions.",
      features: [
        "Mock interview practice",
        "Industry-specific question preparation",
        "Feedback and improvement strategies"
      ]
    },
    {
      icon: <Target />,
      title: "Job Matching & Career Guidance",
      description: "Find the perfect job based on your skills, experience, and career aspirations.",
      features: [
        "Personalized job recommendations",
        "Career path planning",
        "Skill gap analysis"
      ]
    },
    {
      icon: <GraduationCap />,
      title: "Internship & Entry-Level Placement",
      description: "Kickstart your career with opportunities at top companies, specially curated for fresh graduates.",
      features: [
        "Graduate programs placement",
        "Internship opportunities",
        "Entry-level position matching"
      ]
    }
  ];

  const toggleChat = () => {
    setShowChat(prev => !prev);
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-16 md:pt-20"> {/* Add padding to account for fixed navbar */}
        {/* Hero Section - Enhanced with video background */}
        <section className="relative bg-dhara-blue py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-dhara-blue/80 z-10"></div>
          
          {/* Video Background */}
          <video 
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-25"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="https://cdn.coverr.co/videos/coverr-a-recruiter-woman-greets-a-prospective-employee-6584/1080p.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="container mx-auto px-4 md:px-6 relative z-20">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="heading-xl mb-6 animate-fade-in">
                Bridging the Gap Between Talent & Opportunity!
              </h1>
              <p className="text-xl text-white/85 animate-fade-in mb-8">
                We provide top-tier hiring solutions for companies and job seekers, ensuring the perfect match for success.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-dhara-blue hover:bg-white/90">
                  <Link to="/jobs">
                    <Briefcase className="mr-2" size={20} />
                    Find a Job
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link to="/contact">
                    <Building className="mr-2" size={20} />
                    Hire Talent
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Overview - Enhanced with tabs and categorization */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-dhara-blue rounded-full text-sm font-medium">
                  Our Offerings
                </span>
              </div>
              <h2 className="heading-lg mb-6 text-dhara-blue">Comprehensive Recruitment Solutions</h2>
              <p className="subheading mb-6">
                At DHARA, we offer a wide range of specialized recruitment services designed to meet the diverse needs of businesses and job seekers alike.
              </p>
              
              {/* Tabbed interface for services */}
              <Tabs defaultValue="employers" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                  <TabsTrigger value="employers" className="text-base py-3">For Employers</TabsTrigger>
                  <TabsTrigger value="jobseekers" className="text-base py-3">For Job Seekers</TabsTrigger>
                </TabsList>
                
                {/* Employer Services Tab */}
                <TabsContent value="employers" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {employerServices.map((service, index) => (
                      <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-border hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                        <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5 group-hover:bg-dhara-blue group-hover:text-white transition-colors duration-300">
                          <div className="text-dhara-blue group-hover:text-white transition-colors duration-300">
                            {service.icon}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                        <p className="text-dhara-gray mb-5">{service.description}</p>
                        <ul className="space-y-2 mb-6">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                              <span className="text-dhara-gray text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Job Seeker Services Tab */}
                <TabsContent value="jobseekers" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {jobSeekerServices.map((service, index) => (
                      <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-border hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                        <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5 group-hover:bg-dhara-blue group-hover:text-white transition-colors duration-300">
                          <div className="text-dhara-blue group-hover:text-white transition-colors duration-300">
                            {service.icon}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                        <p className="text-dhara-gray mb-5">{service.description}</p>
                        <ul className="space-y-2 mb-6">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                              <span className="text-dhara-gray text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Industries We Serve - Enhanced with carousel */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-dhara-blue rounded-full text-sm font-medium">
                  Our Expertise
                </span>
              </div>
              <h2 className="heading-lg mb-6 text-dhara-blue">Industries We Serve</h2>
              <p className="subheading">
                Our specialized teams have deep industry knowledge, allowing us to understand the unique talent requirements of various sectors.
              </p>
            </div>
            
            {/* Industry Carousel for mobile and tablet */}
            <div className="md:hidden">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex flex-col p-6 items-center">
                          <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dhara-blue">
                              <path d="M5 4h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"></path>
                              <path d="M12 13v7"></path>
                              <path d="M8 13v4"></path>
                              <path d="M16 13v4"></path>
                            </svg>
                          </div>
                          <h3 className="font-semibold text-lg mb-2">Technology</h3>
                          <p className="text-sm text-center text-dhara-gray">Software development, IT services, hardware, and digital transformation roles.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex flex-col p-6 items-center">
                          <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                            <Building className="text-dhara-blue" size={24} />
                          </div>
                          <h3 className="font-semibold text-lg mb-2">Finance</h3>
                          <p className="text-sm text-center text-dhara-gray">Banking, investment, insurance, and financial technology positions.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex flex-col p-6 items-center">
                          <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dhara-blue">
                              <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                              <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                              <path d="M22 10 A2 2 0 0 1 20 12 A2 2 0 0 1 18 10 A2 2 0 0 1 22 10"></path>
                            </svg>
                          </div>
                          <h3 className="font-semibold text-lg mb-2">Healthcare</h3>
                          <p className="text-sm text-center text-dhara-gray">Medical professionals, administrators, and healthcare technology specialists.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex flex-col p-6 items-center">
                          <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                            <GraduationCap className="text-dhara-blue" size={24} />
                          </div>
                          <h3 className="font-semibold text-lg mb-2">Education</h3>
                          <p className="text-sm text-center text-dhara-gray">Teachers, administrators, and educational technology specialists.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="static h-8 w-8 translate-y-0 mr-2" />
                  <CarouselNext className="static h-8 w-8 translate-y-0" />
                </div>
              </Carousel>
            </div>
            
            {/* Industry Grid for desktop */}
            <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Industry 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow hover:-translate-y-1 transition-transform duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dhara-blue">
                    <path d="M5 4h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"></path>
                    <path d="M12 13v7"></path>
                    <path d="M8 13v4"></path>
                    <path d="M16 13v4"></path>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Technology</h3>
                <p className="text-xs text-dhara-gray">Software development, IT services, and digital transformation roles.</p>
              </div>
              
              {/* Industry 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow hover:-translate-y-1 transition-transform duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Building className="text-dhara-blue" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Finance</h3>
                <p className="text-xs text-dhara-gray">Banking, investment, insurance, and financial technology positions.</p>
              </div>
              
              {/* Industry 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow hover:-translate-y-1 transition-transform duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dhara-blue">
                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                    <path d="M22 10 A2 2 0 0 1 20 12 A2 2 0 0 1 18 10 A2 2 0 0 1 22 10"></path>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Healthcare</h3>
                <p className="text-xs text-dhara-gray">Medical professionals, administrators, and healthcare technology specialists.</p>
              </div>
              
              {/* Industry 4 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow hover:-translate-y-1 transition-transform duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dhara-blue">
                    <path d="M3 7V5c0-1.1.9-2 2-2h2"></path>
                    <path d="M17 3h2c1.1 0 2 .9 2 2v2"></path>
                    <path d="M21 17v2c0 1.1-.9 2-2 2h-2"></path>
                    <path d="M7 21H5c-1.1 0-2-.9-2-2v-2"></path>
                    <path d="M8 14h.01"></path>
                    <path d="M12 14h.01"></path>
                    <path d="M16 14h.01"></path>
                    <path d="M8 10h.01"></path>
                    <path d="M12 10h.01"></path>
                    <path d="M16 10h.01"></path>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Manufacturing</h3>
                <p className="text-xs text-dhara-gray">Engineering, production, quality control, and operations professionals.</p>
              </div>
              
              {/* Industry 5 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow hover:-translate-y-1 transition-transform duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dhara-blue">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Real Estate</h3>
                <p className="text-xs text-dhara-gray">Brokers, property managers, developers, and construction specialists.</p>
              </div>
              
              {/* Industry 6 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow hover:-translate-y-1 transition-transform duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dhara-blue">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <path d="M9 7a4 4 0 1 0 0 8 4 4 0 1 0 0-8Z"></path>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Retail</h3>
                <p className="text-xs text-dhara-gray">Store management, buying, merchandising, and e-commerce specialists.</p>
              </div>
              
              {/* Industry 7 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow hover:-translate-y-1 transition-transform duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="text-dhara-blue" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Education</h3>
                <p className="text-xs text-dhara-gray">Teachers, administrators, educational technology, and training specialists.</p>
              </div>
              
              {/* Industry 8 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow hover:-translate-y-1 transition-transform duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Globe className="text-dhara-blue" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Hospitality</h3>
                <p className="text-xs text-dhara-gray">Hotel management, event planning, food service, and tourism professionals.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section - Enhanced with animated stats */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-dhara-blue rounded-full text-sm font-medium">
                  Our Advantages
                </span>
              </div>
              <h2 className="heading-lg mb-6 text-dhara-blue">Why Choose Us?</h2>
              <p className="subheading">
                DHARA Consultant Solution provides unmatched recruitment expertise, connecting the right talent with the right opportunities.
              </p>
            </div>
            
            {/* Animated Stats */}
            <div className="mb-16">
              <AnimatedStats stats={stats} />
            </div>
            
            {/* USPs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-4 text-dhara-blue">Our Unique Approach</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-4 p-2 bg-blue-50 rounded-full">
                      <CheckCircle2 size={20} className="text-dhara-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">AI-Powered Job Matching</h4>
                      <p className="text-dhara-gray text-sm">Cutting-edge technology that matches candidates with jobs based on skills, experience, and preferences.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 p-2 bg-blue-50 rounded-full">
                      <CheckCircle2 size={20} className="text-dhara-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Industry-Specific Hiring Experts</h4>
                      <p className="text-dhara-gray text-sm">Our recruiters specialize in specific industries, bringing deep knowledge and connections.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 p-2 bg-blue-50 rounded-full">
                      <CheckCircle2 size={20} className="text-dhara-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">End-to-End Hiring Solutions</h4>
                      <p className="text-dhara-gray text-sm">Comprehensive support from job posting to onboarding, ensuring a smooth hiring process.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-4 text-dhara-blue">Our Commitment</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-4 p-2 bg-blue-50 rounded-full">
                      <CheckCircle2 size={20} className="text-dhara-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Fast & Reliable Recruitment Process</h4>
                      <p className="text-dhara-gray text-sm">Streamlined processes that save time without compromising quality.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 p-2 bg-blue-50 rounded-full">
                      <CheckCircle2 size={20} className="text-dhara-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Personalized Service</h4>
                      <p className="text-dhara-gray text-sm">We take the time to understand each client's unique culture and requirements.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 p-2 bg-blue-50 rounded-full">
                      <CheckCircle2 size={20} className="text-dhara-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Continuous Support</h4>
                      <p className="text-dhara-gray text-sm">Dedicated account managers provide ongoing assistance and feedback throughout the process.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section - Using existing HiringProcess component */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-dhara-blue rounded-full text-sm font-medium">
                  Our Process
                </span>
              </div>
              <h2 className="heading-lg mb-6 text-dhara-blue">How We Work</h2>
              <p className="subheading">
                Our structured yet flexible recruitment process ensures we find the right talent for your needs while providing a positive experience.
              </p>
            </div>
            
            <HiringProcess />
          </div>
        </section>
        
        {/* Testimonials Section - Enhanced with carousel */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-dhara-blue rounded-full text-sm font-medium">
                  Success Stories
                </span>
              </div>
              <h2 className="heading-lg mb-6 text-dhara-blue">Client Testimonials</h2>
              <p className="subheading">
                Don't just take our word for it. Here's what our clients and candidates have to say about their experience with DHARA.
              </p>
            </div>
            
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex flex-col p-6">
                          {/* Testimonial Quote */}
                          <div className="mb-4 text-dhara-blue">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="32" 
                              height="32" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                            </svg>
                          </div>
                          
                          <p className="text-sm text-dhara-gray mb-6 flex-grow italic">"{testimonial.quote}"</p>
                          
                          <div className="flex items-center">
                            <img 
                              src={testimonial.avatar} 
                              alt={testimonial.name} 
                              className="w-12 h-12 rounded-full object-cover mr-4"
                            />
                            <div>
                              <h4 className="font-medium">{testimonial.name}</h4>
                              <p className="text-xs text-dhara-gray">{testimonial.position}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="static h-8 w-8 translate-y-0 mr-2" />
                <CarouselNext className="static h-8 w-8 translate-y-0" />
              </div>
            </Carousel>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-dhara-blue rounded-full text-sm font-medium">
                  Common Questions
                </span>
              </div>
              <h2 className="heading-lg mb-6 text-dhara-blue">Frequently Asked Questions</h2>
              <p className="subheading">
                Find answers to the most common questions about our recruitment services and processes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <AboutFAQ />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-dhara-blue">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-lg text-white mb-6">Ready to Find Your Perfect Match?</h2>
              <p className="text-white/80 text-lg mb-8">
                Whether you're looking to hire exceptional talent or searching for your next career opportunity, our team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-dhara-blue hover:bg-white/90">
                  <Link to="/contact">
                    <Building className="mr-2" size={20} />
                    Post a Job Now
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link to="/jobs">
                    <Briefcase className="mr-2" size={20} />
                    Apply Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Chat Support Button */}
        <div className="fixed bottom-24 right-6 z-40">
          <Button 
            onClick={toggleChat}
            className="rounded-full w-14 h-14 flex items-center justify-center bg-dhara-blue hover:bg-dhara-blue/90 shadow-lg"
          >
            <MessageCircle size={24} />
          </Button>
        </div>
        
        {/* Simplified Chat Modal */}
        {showChat && (
          <div className="fixed bottom-28 right-6 w-80 bg-white rounded-lg shadow-xl z-40 border border-border overflow-hidden">
            <div className="p-4 bg-dhara-blue text-white flex justify-between items-center">
              <h3 className="font-medium">Chat Support</h3>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8 p-0 text-white hover:bg-dhara-blue/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </Button>
            </div>
            <div className="p-4 bg-gray-50 h-64 overflow-y-auto">
              <div className="bg-dhara-blue text-white p-3 rounded-lg rounded-bl-none mb-2 max-w-[80%]">
                Hello! How can I help you today?
              </div>
              <div className="text-xs text-center text-dhara-gray my-2">Today, 10:30 AM</div>
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 p-2 text-sm border border-input rounded-md"
              />
              <Button size="sm" className="bg-dhara-blue hover:bg-dhara-blue/90">
                Send
              </Button>
            </div>
          </div>
        )}
      </main>
      
      {/* Sticky CTA */}
      <StickyCTA />
      
      <Footer />
    </>
  );
};

export default Services;
