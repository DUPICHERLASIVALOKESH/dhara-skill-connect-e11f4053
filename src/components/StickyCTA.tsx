
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Briefcase, Building } from 'lucide-react';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the sticky CTA after scrolling down 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col sm:flex-row gap-2 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <Button asChild className="bg-dhara-blue hover:bg-dhara-blue/90">
        <Link to="/jobs">
          <Briefcase className="mr-2" size={16} />
          Find Jobs
        </Link>
      </Button>
      <Button asChild variant="outline" className="border-dhara-blue text-dhara-blue hover:bg-dhara-blue/10">
        <Link to="/services">
          <Building className="mr-2" size={16} />
          Hire Talent
        </Link>
      </Button>
    </div>
  );
};

export default StickyCTA;
