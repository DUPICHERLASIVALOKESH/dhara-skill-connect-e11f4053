
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

const Hero = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the carousel
  useEffect(() => {
    const scrollContainer = carouselRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let position = 0;
    const speed = 0.5; // pixels per frame

    const scroll = () => {
      position += speed;
      const container = scrollContainer.querySelector(".embla__container");
      if (container) {
        // If we've scrolled through all content, reset position
        if (position >= container.scrollWidth / 2) {
          position = 0;
        }
        container.scrollLeft = position;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const carouselImages = [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
  ];
  
  // Double the images to create a seamless loop effect
  const loopedImages = [...carouselImages, ...carouselImages];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Image Carousel Background */}
      <div className="absolute inset-0 w-full h-full">
        <Carousel
          ref={carouselRef}
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="h-full">
            {loopedImages.map((image, index) => (
              <CarouselItem key={index} className="h-full min-w-screen pl-0">
                <img 
                  src={image} 
                  alt={`Recruitment image ${index + 1}`}
                  className="w-full h-full object-cover" 
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      
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
