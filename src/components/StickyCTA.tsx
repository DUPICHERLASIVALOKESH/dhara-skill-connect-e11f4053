
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Briefcase, Building, Users } from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex flex-col sm:flex-row gap-2">
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
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-border bg-background shadow-sm">
              <Users size={18} className={`transform transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`} />
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="mt-2">
          <div className="bg-white p-4 rounded-lg shadow-md border border-border w-[260px]">
            <h3 className="text-sm font-medium mb-2">Need help?</h3>
            <p className="text-xs text-dhara-gray mb-3">
              Connect with our recruitment experts for personalized assistance.
            </p>
            <Button asChild size="sm" className="w-full bg-dhara-blue hover:bg-dhara-blue/90">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default StickyCTA;
