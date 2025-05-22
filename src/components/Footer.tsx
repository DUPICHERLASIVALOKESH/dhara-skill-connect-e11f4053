
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-dhara-blue text-white">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4">SKILL CONNECT</h3>
            <p className="text-white/80 mb-4">
              Your trusted hiring partner for finding exceptional talent and advancing careers.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white/70 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-white/70 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-white/70 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-white transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/jobs" className="text-white/70 hover:text-white transition-colors">Browse Jobs</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-white/70">Executive Search</li>
              <li className="text-white/70">Temporary Staffing</li>
              <li className="text-white/70">HR Consulting</li>
              <li className="text-white/70">Recruitment Process Outsourcing</li>
              <li className="text-white/70">Career Coaching</li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 text-white/70" />
                <p className="text-white/70">
                  148 Technology Park, <br />
                  Whitefield Main Road, <br />
                  Bangalore, Karnataka 560066
                </p>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-2 text-white/70" />
                <p className="text-white/70">+91 82470 35912</p>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="mr-2 text-white/70" />
                <p className="text-white/70">contact@skillconnect.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60">
          <p>&copy; {year} SKILL CONNECT Consultant Solution. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
