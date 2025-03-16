
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

const Contact = () => {
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
              <h1 className="heading-xl mb-6 animate-fade-in">Contact Us</h1>
              <p className="text-xl text-white/85 animate-fade-in">
                Have questions or need assistance? Reach out to our team and we'll be happy to help.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Information and Form */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <div className="order-2 lg:order-1">
                <div className="mb-8">
                  <h2 className="heading-md text-dhara-blue mb-4">Send Us a Message</h2>
                  <p className="text-dhara-gray">
                    Fill out the form below and our team will get back to you as soon as possible.
                  </p>
                </div>
                
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-border">
                  <ContactForm />
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="order-1 lg:order-2">
                <div className="mb-8">
                  <h2 className="heading-md text-dhara-blue mb-4">Get in Touch</h2>
                  <p className="text-dhara-gray">
                    Whether you're looking for career advice, want to discuss your hiring needs, or have any other questions, we're here to help.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                    <div className="flex">
                      <div className="mr-4">
                        <div className="p-3 bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center">
                          <MapPin className="text-dhara-blue" size={22} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Our Office</h3>
                        <p className="text-dhara-gray">
                          123 Recruitment Plaza, Corporate Park<br />
                          Mumbai, Maharashtra 400001<br />
                          India
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                    <div className="flex">
                      <div className="mr-4">
                        <div className="p-3 bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center">
                          <Phone className="text-dhara-blue" size={22} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Phone</h3>
                        <p className="text-dhara-blue hover:underline">
                          <a href="tel:+911234567890">+91 123 456 7890</a>
                        </p>
                        <p className="text-dhara-gray text-sm mt-1">
                          Monday to Friday, 9am to 6pm IST
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                    <div className="flex">
                      <div className="mr-4">
                        <div className="p-3 bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center">
                          <Mail className="text-dhara-blue" size={22} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Email</h3>
                        <p className="text-dhara-blue hover:underline">
                          <a href="mailto:info@dharaconsultant.com">info@dharaconsultant.com</a>
                        </p>
                        <p className="text-dhara-gray text-sm mt-1">
                          We typically respond within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                    <div className="flex">
                      <div className="mr-4">
                        <div className="p-3 bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center">
                          <Clock className="text-dhara-blue" size={22} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
                        <div className="text-dhara-gray grid grid-cols-2 gap-x-4 gap-y-1">
                          <span>Monday - Friday:</span>
                          <span>9:00 AM - 6:00 PM</span>
                          <span>Saturday:</span>
                          <span>10:00 AM - 2:00 PM</span>
                          <span>Sunday:</span>
                          <span>Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="heading-md text-dhara-blue">Find Us</h2>
            </div>
            
            <div className="aspect-w-16 aspect-h-9 max-w-5xl mx-auto rounded-lg overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.6433214451!2d72.74109780863925!3d19.082522310207147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1654688825148!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="DHARA Consultant Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                <MessageSquare className="text-dhara-blue" size={24} />
              </div>
              <h2 className="heading-md text-dhara-blue mb-4">Frequently Asked Questions</h2>
              <p className="text-dhara-gray">
                Find answers to common questions about our recruitment services and how we can help with your career or hiring needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-3 text-dhara-blue">What services does DHARA Consultant offer?</h3>
                <p className="text-dhara-gray">
                  We offer a comprehensive range of recruitment services including executive search, talent acquisition, corporate staffing, and HR consulting. Our team specializes in matching qualified candidates with suitable positions across various industries.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-3 text-dhara-blue">How does your recruitment process work?</h3>
                <p className="text-dhara-gray">
                  Our recruitment process begins with understanding your requirements, followed by sourcing and screening candidates, conducting interviews, and presenting qualified candidates. We also assist with negotiations and onboarding to ensure a smooth transition.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-3 text-dhara-blue">I'm a job seeker. How can I apply for jobs?</h3>
                <p className="text-dhara-gray">
                  You can browse our current job listings on the Jobs page and apply directly through our website. Alternatively, you can submit your resume through our contact form, and our recruiters will reach out if there's a suitable match.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-3 text-dhara-blue">What industries do you specialize in?</h3>
                <p className="text-dhara-gray">
                  We have expertise across multiple industries including technology, finance, healthcare, manufacturing, retail, and more. Our specialized recruiters understand the unique requirements of each industry and can provide tailored solutions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Contact;
