
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://player.vimeo.com/external/479720766.hd.mp4?s=bf23bbba2c001b0a47a337a9c46c26f2ce89a399&profile_id=175&oauth2_token_id=57447761" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-dhara-blue/60 backdrop-blur-xs"></div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <h1 className="heading-xl">
              Welcome to <span className="text-white font-bold">DHARA</span>
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-white/85">
              Your Trusted Hiring Partner for Finding Exceptional Talent and Advancing Careers
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button asChild size="lg" className="bg-white text-dhara-blue hover:bg-white/90 hover:text-dhara-blue/90 transition-all px-6">
                <Link to="/jobs">
                  Browse Jobs <ArrowRight size={16} className="ml-2" />
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
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-subtle">
        <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-[bounce_1.5s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
