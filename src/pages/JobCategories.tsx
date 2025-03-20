
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  Code,
  ShoppingCart,
  Server,
  Wifi,
  Shield,
  Database,
  Cloud,
  HeadphonesIcon,
  Headphones,
  Building,
  TrendingUp,
  Users,
  Scale,
  Stethoscope,
  Warehouse,
  ShoppingBag,
  Share2,
  Layout,
  Package,
  Search,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryData {
  title: string;
  icon: React.ReactNode;
  subcategories: {
    name: string;
    icon: React.ReactNode;
    description: string;
    jobCount: number;
  }[];
}

const JobCategories = () => {
  const [activeTab, setActiveTab] = useState('it');
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories: Record<string, CategoryData> = {
    it: {
      title: 'IT Jobs',
      icon: <Code size={24} />,
      subcategories: [
        { 
          name: 'Software Development', 
          icon: <Code size={20} />,
          description: 'Full Stack, Frontend, Backend, Mobile, Web development roles',
          jobCount: 342
        },
        { 
          name: 'Hardware & Networking', 
          icon: <Wifi size={20} />,
          description: 'Network Engineer, System Administrator, IoT specialist roles',
          jobCount: 156
        },
        { 
          name: 'Cybersecurity', 
          icon: <Shield size={20} />,
          description: 'Security Analyst, Ethical Hacker, Compliance specialist roles',
          jobCount: 98
        },
        { 
          name: 'Data Science & AI', 
          icon: <Database size={20} />,
          description: 'Machine Learning, AI Engineer, Data Scientist roles',
          jobCount: 224
        },
        { 
          name: 'Cloud Computing', 
          icon: <Cloud size={20} />,
          description: 'AWS, Azure, DevOps Engineer roles',
          jobCount: 187
        },
        { 
          name: 'IT Support & Helpdesk', 
          icon: <Headphones size={20} />,
          description: 'Technical Support, IT Admin roles',
          jobCount: 128
        }
      ]
    },
    nonit: {
      title: 'Non-IT Jobs',
      icon: <Briefcase size={24} />,
      subcategories: [
        { 
          name: 'BPO & Customer Support', 
          icon: <Headphones size={20} />,
          description: 'Call Center, Voice/Non-Voice, Chat Support roles',
          jobCount: 231
        },
        { 
          name: 'Finance & Banking', 
          icon: <Building size={20} />,
          description: 'Accountant, Investment Analyst, Banking jobs',
          jobCount: 176
        },
        { 
          name: 'Marketing & Sales', 
          icon: <TrendingUp size={20} />,
          description: 'Digital Marketing, Sales Executive, SEO roles',
          jobCount: 204
        },
        { 
          name: 'Human Resources (HR)', 
          icon: <Users size={20} />,
          description: 'Recruiter, HR Manager, Payroll specialist roles',
          jobCount: 152
        },
        { 
          name: 'Legal & Compliance', 
          icon: <Scale size={20} />,
          description: 'Corporate Lawyer, Legal Advisor, Compliance officer roles',
          jobCount: 87
        },
        { 
          name: 'Healthcare & Pharma', 
          icon: <Stethoscope size={20} />,
          description: 'Medical Representative, Nursing, Lab Tech roles',
          jobCount: 143
        }
      ]
    },
    ecommerce: {
      title: 'E-commerce Jobs',
      icon: <ShoppingCart size={24} />,
      subcategories: [
        { 
          name: 'Warehouse & Logistics', 
          icon: <Warehouse size={20} />,
          description: 'Inventory Manager, Supply Chain, Courier roles',
          jobCount: 126
        },
        { 
          name: 'Retail & Sales', 
          icon: <ShoppingBag size={20} />,
          description: 'E-commerce Sales, Customer Support, Vendor Manager roles',
          jobCount: 158
        },
        { 
          name: 'Digital Marketing', 
          icon: <Share2 size={20} />,
          description: 'SEO, PPC, Social Media Manager roles',
          jobCount: 143
        },
        { 
          name: 'Product Management', 
          icon: <Layout size={20} />,
          description: 'Product Owner, E-commerce Analyst roles',
          jobCount: 97
        },
        { 
          name: 'Operations & Fulfillment', 
          icon: <Package size={20} />,
          description: 'Order Processing, Returns Management roles',
          jobCount: 114
        }
      ]
    }
  };

  const handleSubcategoryClick = (subcategory: string) => {
    // Convert the subcategory to a URL-friendly format and navigate to jobs page
    const formattedSubcategory = subcategory.toLowerCase().replace(/[&()]/g, '').replace(/\s+/g, '-');
    navigate('/jobs', { state: { category: activeTab, subcategory: formattedSubcategory } });
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="bg-dhara-blue py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="heading-xl mb-6 animate-fade-in">Job Categories</h1>
              <p className="text-xl text-white/85 animate-fade-in">
                Explore our curated collection of job categories tailored to your professional interests.
              </p>
              <div className="mt-8 flex justify-center">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dhara-blue/70" size={20} />
                  <input
                    type="text"
                    placeholder="Search for jobs, skills, or companies"
                    className="w-full py-3 px-10 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-dhara-light-blue"
                  />
                  <Button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full py-1.5 px-4 bg-dhara-blue hover:bg-dhara-blue/90">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full flex justify-between mb-8 bg-muted/50">
                  <TabsTrigger value="it" className="flex-1 py-3 data-[state=active]:bg-dhara-blue data-[state=active]:text-white">
                    <Code size={18} className="mr-2" />
                    IT Jobs
                  </TabsTrigger>
                  <TabsTrigger value="nonit" className="flex-1 py-3 data-[state=active]:bg-dhara-blue data-[state=active]:text-white">
                    <Briefcase size={18} className="mr-2" />
                    Non-IT Jobs
                  </TabsTrigger>
                  <TabsTrigger value="ecommerce" className="flex-1 py-3 data-[state=active]:bg-dhara-blue data-[state=active]:text-white">
                    <ShoppingCart size={18} className="mr-2" />
                    E-commerce Jobs
                  </TabsTrigger>
                </TabsList>
                
                {Object.entries(categories).map(([key, category]) => (
                  <TabsContent key={key} value={key} className="space-y-6">
                    <div className="flex items-center mb-6">
                      <div className="p-2 rounded-full bg-dhara-blue/10 text-dhara-blue mr-3">
                        {category.icon}
                      </div>
                      <h2 className="text-2xl font-bold">{category.title}</h2>
                    </div>
                    
                    <Accordion type="multiple" className="w-full">
                      {category.subcategories.map((subcategory, index) => (
                        <AccordionItem key={index} value={subcategory.name} className="border rounded-lg mb-4 overflow-hidden hover:shadow-md transition-shadow">
                          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-dhara-blue/5">
                            <div className="flex items-center">
                              <div className="p-2 rounded-full bg-dhara-blue/10 text-dhara-blue mr-3">
                                {subcategory.icon}
                              </div>
                              <div className="text-left">
                                <h3 className="font-semibold">{subcategory.name}</h3>
                                <p className="text-sm text-muted-foreground">{subcategory.jobCount} available positions</p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 py-4 bg-muted/30">
                            <p className="mb-4 text-muted-foreground">{subcategory.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin size={16} className="mr-1" />
                                <span>Multiple locations available</span>
                              </div>
                              <Button 
                                onClick={() => handleSubcategoryClick(subcategory.name)}
                                className="bg-dhara-blue hover:bg-dhara-blue/90"
                              >
                                View Jobs <ArrowRight size={16} className="ml-2" />
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-dhara-blue">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
              <p className="text-white/80 mb-8">
                Submit your resume to our database and let employers find you. We'll notify you when relevant positions become available.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-dhara-blue hover:bg-white/90">
                  <Link to="/contact">
                    Submit Your Resume
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link to="/contact">
                    Contact Recruiters
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

export default JobCategories;
