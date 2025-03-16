
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Search, UserCheck, Building, Users, BriefcaseBusiness, GraduationCap, 
  Briefcase, FileSearch, PieChart, Award, Globe, CheckCircle2
} from 'lucide-react';

const Services = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      
      <main className="pt-16 md:pt-20"> {/* Add padding to account for fixed navbar */}
        {/* Hero Section */}
        <section className="bg-dhara-blue py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="heading-xl mb-6 animate-fade-in">Our Services</h1>
              <p className="text-xl text-white/85 animate-fade-in">
                Comprehensive recruitment solutions tailored to your specific needs and industry requirements.
              </p>
            </div>
          </div>
        </section>
        
        {/* Services Overview */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-dhara-blue rounded-full text-sm font-medium">
                  Our Offerings
                </span>
              </div>
              <h2 className="heading-lg mb-6 text-dhara-blue">Comprehensive Recruitment Solutions</h2>
              <p className="subheading">
                At DHARA, we offer a wide range of specialized recruitment services designed to meet the diverse needs of businesses and job seekers alike.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <Search className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Executive Search</h3>
                <p className="text-dhara-gray mb-5">
                  Our specialized executive search team identifies and recruits top-level executives and specialized professionals for key leadership positions.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">C-suite and director-level placements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">Discreet recruitment campaigns</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">Comprehensive candidate assessment</span>
                  </li>
                </ul>
              </div>
              
              {/* Service 2 */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <UserCheck className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Permanent Staffing</h3>
                <p className="text-dhara-gray mb-5">
                  We connect businesses with qualified professionals for permanent positions across various industries and levels of experience.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">Mid to senior-level professionals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">Tailored recruitment strategies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">Cultural and technical fit assessment</span>
                  </li>
                </ul>
              </div>
              
              {/* Service 3 */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <BriefcaseBusiness className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Contract & Temporary Staffing</h3>
                <p className="text-dhara-gray mb-5">
                  Flexible staffing solutions to help businesses manage workload fluctuations, special projects, or seasonal demands.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">Short to long-term placements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">Quick turnaround times</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">Temp-to-perm options available</span>
                  </li>
                </ul>
              </div>
              
              {/* Service 4 */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <Users className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">HR Consulting</h3>
                <p className="text-dhara-gray mb-5">
                  Expert advice and strategies to optimize your human resources practices, improve talent retention, and enhance workplace culture.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">HR policy development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">Compensation structure analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">Employee engagement strategies</span>
                  </li>
                </ul>
              </div>
              
              {/* Service 5 */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <Globe className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Talent Acquisition</h3>
                <p className="text-dhara-gray mb-5">
                  Access to international talent pools and expertise in navigating cross-border hiring regulations and cultural considerations.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">International candidate sourcing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">Relocation support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">Visa and work permit guidance</span>
                  </li>
                </ul>
              </div>
              
              {/* Service 6 */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <GraduationCap className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Career Coaching</h3>
                <p className="text-dhara-gray mb-5">
                  Professional guidance for job seekers at all career stages, from recent graduates to executives seeking new opportunities.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">Resume and LinkedIn optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">Interview preparation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-dhara-blue mr-2 mt-0.5" />
                    <span className="text-dhara-gray text-sm">Career transition strategies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Industries We Serve */}
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
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Industry 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dhara-blue">
                    <path d="M5 4h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"></path>
                    <path d="M12 13v7"></path>
                    <path d="M8 13v4"></path>
                    <path d="M16 13v4"></path>
                  </svg>
                </div>
                <h3 className="font-semibold">Technology</h3>
              </div>
              
              {/* Industry 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Building className="text-dhara-blue" size={24} />
                </div>
                <h3 className="font-semibold">Finance</h3>
              </div>
              
              {/* Industry 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dhara-blue">
                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                    <path d="M22 10 A2 2 0 0 1 20 12 A2 2 0 0 1 18 10 A2 2 0 0 1 22 10"></path>
                  </svg>
                </div>
                <h3 className="font-semibold">Healthcare</h3>
              </div>
              
              {/* Industry 4 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow">
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
                <h3 className="font-semibold">Manufacturing</h3>
              </div>
              
              {/* Industry 5 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dhara-blue">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold">Real Estate</h3>
              </div>
              
              {/* Industry 6 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dhara-blue">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <path d="M9 7a4 4 0 1 0 0 8 4 4 0 1 0 0-8Z"></path>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="font-semibold">Retail</h3>
              </div>
              
              {/* Industry 7 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="text-dhara-blue" size={24} />
                </div>
                <h3 className="font-semibold">Education</h3>
              </div>
              
              {/* Industry 8 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Globe className="text-dhara-blue" size={24} />
                </div>
                <h3 className="font-semibold">Hospitality</h3>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Process */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-dhara-blue rounded-full text-sm font-medium">
                    Our Process
                  </span>
                </div>
                <h2 className="heading-lg mb-6 text-dhara-blue">How We Work</h2>
                <p className="text-dhara-gray mb-6">
                  Our structured yet flexible recruitment process ensures we find the right talent for your needs while providing a positive experience for both clients and candidates.
                </p>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-dhara-blue text-white flex items-center justify-center font-semibold">1</div>
                      <div className="w-0.5 h-full bg-dhara-blue/20 mt-2"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Initial Consultation</h3>
                      <p className="text-dhara-gray">We begin by understanding your specific requirements, company culture, and long-term objectives.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-dhara-blue text-white flex items-center justify-center font-semibold">2</div>
                      <div className="w-0.5 h-full bg-dhara-blue/20 mt-2"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Search Strategy Development</h3>
                      <p className="text-dhara-gray">We create a targeted strategy to identify and attract the ideal candidates for your position.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-dhara-blue text-white flex items-center justify-center font-semibold">3</div>
                      <div className="w-0.5 h-full bg-dhara-blue/20 mt-2"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Candidate Sourcing & Screening</h3>
                      <p className="text-dhara-gray">Our team utilizes multiple channels to identify qualified candidates, followed by thorough screening.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-dhara-blue text-white flex items-center justify-center font-semibold">4</div>
                      <div className="w-0.5 h-full bg-dhara-blue/20 mt-2"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Presentation & Selection</h3>
                      <p className="text-dhara-gray">We present a shortlist of highly qualified candidates and facilitate interviews and assessments.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-dhara-blue text-white flex items-center justify-center font-semibold">5</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Offer & Onboarding Support</h3>
                      <p className="text-dhara-gray">We help negotiate terms, secure acceptances, and ensure a smooth transition for new hires.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Our recruitment process" 
                  className="rounded-lg shadow-md"
                />
              </div>
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
                    Get Started Today
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link to="/jobs">
                    Browse Jobs
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

export default Services;
