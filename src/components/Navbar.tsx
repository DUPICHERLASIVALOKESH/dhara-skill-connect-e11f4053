
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-white/90 shadow-sm backdrop-blur-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-dhara-blue to-dhara-light-blue bg-clip-text text-transparent">
              SKILL CONNECT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/job-categories" className="nav-link">Jobs</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground p-2" 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 md:hidden transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          <nav className="flex flex-col space-y-6 items-center text-lg font-medium">
            <Link to="/" className="w-full text-center py-2">Home</Link>
            <Link to="/about" className="w-full text-center py-2">About</Link>
            <Link to="/services" className="w-full text-center py-2">Services</Link>
            <Link to="/job-categories" className="w-full text-center py-2">Jobs</Link>
            <Link to="/contact" className="w-full text-center py-2">Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
