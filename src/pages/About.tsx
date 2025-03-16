
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Award, Clock, BarChart, Target, Shield, Video, Play } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import AnimatedStats from '@/components/AnimatedStats';
import CompanyTimeline from '@/components/CompanyTimeline';
import HiringProcess from '@/components/HiringProcess';
import AboutFAQ from '@/components/AboutFAQ';
import StickyCTA from '@/components/StickyCTA';

const About = () => {
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
              <h1 className="heading-xl mb-6 animate-fade-in">About DHARA</h1>
              <p className="text-xl text-white/85 animate-fade-in">
                We're a team of dedicated recruitment specialists committed to connecting talented professionals with opportunities where they can thrive.
              </p>
            </div>
          </div>
        </section>
        
        {/* Animated Stats Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-dhara-blue rounded-full text-sm font-medium">
                  Our Impact
                </span>
              </div>
              <h2 className="heading-lg mb-6 text-dhara-blue">Achievements That Define Us</h2>
              <p className="subheading">
                Over a decade of excellence in recruitment has allowed us to create a significant impact in the industry.
              </p>
            </div>
            <AnimatedStats />
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-dhara-blue rounded-full text-sm font-medium">
                    Our Story
                  </span>
                </div>
                <h2 className="heading-lg mb-6 text-dhara-blue">A Legacy of Excellence in Recruitment</h2>
                <p className="text-dhara-gray mb-4">
                  Founded in 2010, DHARA Consultant Solution began with a simple mission: to transform how companies hire and how people find jobs. What started as a small team of passionate recruiters has grown into a respected agency serving clients across India and beyond.
                </p>
                <p className="text-dhara-gray mb-6">
                  Our founders, with over 25 years of combined experience in HR and recruitment, recognized the need for a more personalized, efficient approach to talent acquisition. Today, we continue to uphold those founding principles while embracing innovative recruitment technologies.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <Clock className="text-dhara-blue mr-3" size={20} />
                    <div>
                      <p className="font-semibold">13+ Years</p>
                      <p className="text-sm text-dhara-gray">In business</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="text-dhara-blue mr-3" size={20} />
                    <div>
                      <p className="font-semibold">10,000+</p>
                      <p className="text-sm text-dhara-gray">Placements made</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10 hover:bg-black/30 transition-all cursor-pointer group">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="text-dhara-blue ml-1" size={30} />
                    </div>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="DHARA founding team" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-dhara-blue rounded-full text-sm font-medium">
                  Our Journey
                </span>
              </div>
              <h2 className="heading-lg mb-6 text-dhara-blue">Milestones That Shaped Us</h2>
              <p className="subheading">
                From our humble beginnings to where we stand today, our journey has been defined by growth, innovation, and excellence.
              </p>
            </div>
            
            <CompanyTimeline />
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-dhara-blue rounded-full text-sm font-medium">
                  Our Values
                </span>
              </div>
              <h2 className="heading-lg mb-6 text-dhara-blue">The Principles That Guide Us</h2>
              <p className="subheading">
                Our core values define how we work with clients, candidates, and each other. They're the foundation of our culture and approach.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Value 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <Target className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-dhara-gray">
                  We strive for excellence in every interaction, every placement, and every relationship. Nothing less than the best will do.
                </p>
              </div>
              
              {/* Value 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <Shield className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Integrity</h3>
                <p className="text-dhara-gray">
                  We maintain the highest ethical standards, building trust through transparency, honesty, and delivering on our promises.
                </p>
              </div>
              
              {/* Value 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <Users className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Partnership</h3>
                <p className="text-dhara-gray">
                  We view our relationships with clients and candidates as true partnerships, investing in your long-term success.
                </p>
              </div>
              
              {/* Value 4 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <BarChart className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-dhara-gray">
                  We constantly evolve, embracing new technologies and methodologies to enhance our recruitment processes.
                </p>
              </div>
              
              {/* Value 5 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <Award className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality</h3>
                <p className="text-dhara-gray">
                  We focus on quality over quantity, ensuring each candidate presented is thoroughly vetted and properly matched.
                </p>
              </div>
              
              {/* Value 6 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <Clock className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Efficiency</h3>
                <p className="text-dhara-gray">
                  We respect your time, streamlining processes to deliver results quickly without sacrificing quality.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Hiring Process */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-dhara-blue rounded-full text-sm font-medium">
                  Our Process
                </span>
              </div>
              <h2 className="heading-lg mb-6 text-dhara-blue">How We Connect Talent with Opportunity</h2>
              <p className="subheading">
                Our streamlined recruitment process ensures efficient, high-quality matches between candidates and employers.
              </p>
            </div>
            
            <HiringProcess />
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-dhara-blue rounded-full text-sm font-medium">
                  Our Team
                </span>
              </div>
              <h2 className="heading-lg mb-6 text-dhara-blue">Meet the People Behind DHARA</h2>
              <p className="subheading">
                Our diverse team of recruitment specialists brings together decades of experience across multiple industries.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <HoverCard>
                <HoverCardTrigger>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-border transition-all duration-300 hover:shadow-md">
                    <div className="h-64 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                        alt="Rajesh Sharma" 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold">Rajesh Sharma</h3>
                      <p className="text-dhara-blue mb-2">Founder & CEO</p>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Rajesh Sharma</h4>
                    <p className="text-sm text-dhara-blue">Founder & CEO</p>
                    <Separator />
                    <p className="text-sm text-dhara-gray">
                      15+ years in executive search and talent acquisition across technology and finance sectors. MBA from IIM Bangalore with a specialization in HR.
                    </p>
                    <div className="pt-2">
                      <p className="text-sm font-medium">Expertise:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="px-2 py-1 bg-blue-50 text-dhara-blue rounded text-xs">Executive Hiring</span>
                        <span className="px-2 py-1 bg-blue-50 text-dhara-blue rounded text-xs">IT Leadership</span>
                        <span className="px-2 py-1 bg-blue-50 text-dhara-blue rounded text-xs">Strategy</span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              {/* Team Member 2 */}
              <HoverCard>
                <HoverCardTrigger>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-border transition-all duration-300 hover:shadow-md">
                    <div className="h-64 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80" 
                        alt="Priya Patel" 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold">Priya Patel</h3>
                      <p className="text-dhara-blue mb-2">Managing Director</p>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Priya Patel</h4>
                    <p className="text-sm text-dhara-blue">Managing Director</p>
                    <Separator />
                    <p className="text-sm text-dhara-gray">
                      12+ years specializing in HR consulting and organizational development. Previously led talent acquisition for a Fortune 500 company.
                    </p>
                    <div className="pt-2">
                      <p className="text-sm font-medium">Expertise:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="px-2 py-1 bg-blue-50 text-dhara-blue rounded text-xs">HR Consulting</span>
                        <span className="px-2 py-1 bg-blue-50 text-dhara-blue rounded text-xs">Leadership Development</span>
                        <span className="px-2 py-1 bg-blue-50 text-dhara-blue rounded text-xs">Operations</span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              {/* Team Member 3 */}
              <HoverCard>
                <HoverCardTrigger>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-border transition-all duration-300 hover:shadow-md">
                    <div className="h-64 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                        alt="Vikram Singh" 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold">Vikram Singh</h3>
                      <p className="text-dhara-blue mb-2">Tech Recruitment Lead</p>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Vikram Singh</h4>
                    <p className="text-sm text-dhara-blue">Tech Recruitment Lead</p>
                    <Separator />
                    <p className="text-sm text-dhara-gray">
                      10+ years focusing on IT and engineering recruitment for startups and enterprises. Computer Science background with technical expertise.
                    </p>
                    <div className="pt-2">
                      <p className="text-sm font-medium">Expertise:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="px-2 py-1 bg-blue-50 text-dhara-blue rounded text-xs">Software Engineering</span>
                        <span className="px-2 py-1 bg-blue-50 text-dhara-blue rounded text-xs">AI/ML</span>
                        <span className="px-2 py-1 bg-blue-50 text-dhara-blue rounded text-xs">DevOps</span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              {/* Team Member 4 */}
              <HoverCard>
                <HoverCardTrigger>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-border transition-all duration-300 hover:shadow-md">
                    <div className="h-64 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                        alt="Ananya Das" 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold">Ananya Das</h3>
                      <p className="text-dhara-blue mb-2">Corporate Relations</p>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Ananya Das</h4>
                    <p className="text-sm text-dhara-blue">Corporate Relations</p>
                    <Separator />
                    <p className="text-sm text-dhara-gray">
                      8+ years building strategic partnerships with Fortune 500 companies. Expert in client relationship management and business development.
                    </p>
                    <div className="pt-2">
                      <p className="text-sm font-medium">Expertise:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="px-2 py-1 bg-blue-50 text-dhara-blue rounded text-xs">Business Development</span>
                        <span className="px-2 py-1 bg-blue-50 text-dhara-blue rounded text-xs">Corporate Partnerships</span>
                        <span className="px-2 py-1 bg-blue-50 text-dhara-blue rounded text-xs">Client Relations</span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-dhara-blue rounded-full text-sm font-medium">
                  FAQs
                </span>
              </div>
              <h2 className="heading-lg mb-6 text-dhara-blue">Frequently Asked Questions</h2>
              <p className="subheading">
                Find answers to common questions about our recruitment services and process.
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
              <h2 className="heading-lg text-white mb-6">Ready to Work With Us?</h2>
              <p className="text-white/80 text-lg mb-8">
                Let us help you find the perfect talent for your organization or advance your career to new heights.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-dhara-blue hover:bg-white/90">
                  <Link to="/contact">
                    Contact Our Team
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link to="/services">
                    Explore Our Services
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Sticky CTAs */}
      <StickyCTA />
      
      <Footer />
    </>
  );
};

export default About;
