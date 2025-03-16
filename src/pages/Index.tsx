
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, UserCheck, Award, Building, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Services Overview Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h2 className="heading-lg mb-4 text-dhara-blue">Our Recruitment Solutions</h2>
              <p className="subheading">We offer comprehensive recruitment services tailored to your specific needs and industry requirements.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Service Card 1 */}
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border flex flex-col">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <Search className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Executive Search</h3>
                <p className="text-dhara-gray mb-4 flex-grow">We identify and recruit top-level executives and specialized professionals for key positions.</p>
                <Link to="/services" className="text-dhara-blue hover:text-dhara-blue/80 flex items-center mt-2 transition-colors">
                  Learn More <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              
              {/* Service Card 2 */}
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border flex flex-col">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <UserCheck className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Talent Acquisition</h3>
                <p className="text-dhara-gray mb-4 flex-grow">Strategic approach to identify, attract, and onboard skilled candidates to meet organizational needs.</p>
                <Link to="/services" className="text-dhara-blue hover:text-dhara-blue/80 flex items-center mt-2 transition-colors">
                  Learn More <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              
              {/* Service Card 3 */}
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border flex flex-col">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <Building className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Corporate Staffing</h3>
                <p className="text-dhara-gray mb-4 flex-grow">End-to-end staffing solutions for corporations with customized recruitment strategies.</p>
                <Link to="/services" className="text-dhara-blue hover:text-dhara-blue/80 flex items-center mt-2 transition-colors">
                  Learn More <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              
              {/* Service Card 4 */}
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border flex flex-col">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <Users className="text-dhara-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">HR Consulting</h3>
                <p className="text-dhara-gray mb-4 flex-grow">Expert advice on HR strategies, organizational development, and employee retention.</p>
                <Link to="/services" className="text-dhara-blue hover:text-dhara-blue/80 flex items-center mt-2 transition-colors">
                  Learn More <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild className="bg-dhara-blue hover:bg-dhara-blue/90">
                <Link to="/services">
                  View All Services <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* About Us Preview */}
        <section className="section-padding bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="animate-fade-in-left lg:order-1 order-2">
                <h2 className="heading-lg mb-4 text-dhara-blue">Who We Are</h2>
                <p className="text-dhara-gray mb-4">
                  DHARA Consultant Solution is a premier recruitment agency dedicated to connecting exceptional talent with leading organizations. With our deep industry knowledge and vast network, we've been a trusted hiring partner for businesses of all sizes.
                </p>
                <p className="text-dhara-gray mb-6">
                  Our team of experienced recruiters understands the unique challenges of modern hiring and works closely with both clients and candidates to ensure the perfect match. 
                </p>
                <Button asChild className="bg-dhara-blue hover:bg-dhara-blue/90">
                  <Link to="/about">
                    About Us <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
              
              <div className="lg:order-2 order-1 animate-fade-in-right">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Team meeting" 
                    className="rounded-lg shadow-md w-full h-auto object-cover" 
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border border-border">
                    <div className="flex items-center justify-center gap-3">
                      <Award className="text-dhara-blue" size={24} />
                      <div>
                        <p className="font-semibold">Recognized Excellence</p>
                        <p className="text-sm text-dhara-gray">Top Recruitment Agency 2023</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-dhara-blue">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-lg text-white mb-6">Ready to Find Your Next Opportunity?</h2>
              <p className="text-white/80 text-lg mb-8">
                Whether you're looking for your dream job or searching for the perfect candidate, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-dhara-blue hover:bg-white/90">
                  <Link to="/jobs">
                    Browse Jobs
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link to="/contact">
                    Contact Us
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

export default Index;
