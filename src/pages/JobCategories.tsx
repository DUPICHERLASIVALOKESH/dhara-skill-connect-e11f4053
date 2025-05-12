import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  MessageSquare,
  ArrowRightCircle,
  Send
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { JobProps } from "@/components/JobCard";
import { 
  softwareJobs, 
  hardwareNetworkingJobs, 
  jobCounts,
  bpoCustomerSupportJobs,
  financeJobs,
  marketingJobs,
  hrJobs,
  legalJobs,
  healthcareJobs,
  warehouseJobs,
  retailJobs,
  digitalMarketingJobs,
  productManagementJobs,
  operationsJobs
} from "@/data/softwareJobs";

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

const JOBS_MAP: Record<string, { name: string; jobs: JobProps[] }> = {
  it: {
    name: 'Software Development',
    jobs: softwareJobs,
  },
};

const JobCategories = () => {
  const [activeTab, setActiveTab] = useState('it');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function getJobCountForSubcategory(tabKey: string, subcategoryName: string) {
    if (tabKey === 'it') {
      if (subcategoryName === 'Software Development') {
        return jobCounts.softwareDevelopment;
      } else if (subcategoryName === 'Hardware & Networking') {
        return jobCounts.hardwareNetworking;
      } else if (subcategoryName === 'Cybersecurity') {
        return jobCounts.cybersecurity;
      } else if (subcategoryName === 'Data Science & AI') {
        return jobCounts.dataScience;
      } else if (subcategoryName === 'Cloud Computing') {
        return jobCounts.cloudComputing;
      } else if (subcategoryName === 'IT Support & Helpdesk') {
        return jobCounts.itSupport;
      }
    }
    
    // Non-IT categories
    if (tabKey === 'nonit') {
      if (subcategoryName === 'BPO & Customer Support') {
        return jobCounts.bpoCustomerSupport;
      } else if (subcategoryName === 'Finance & Banking') {
        return jobCounts.finance;
      } else if (subcategoryName === 'Marketing & Sales') {
        return jobCounts.marketing;
      } else if (subcategoryName === 'Human Resources (HR)') {
        return jobCounts.hr;
      } else if (subcategoryName === 'Legal & Compliance') {
        return jobCounts.legal;
      } else if (subcategoryName === 'Healthcare & Pharma') {
        return jobCounts.healthcare;
      }
    }
    
    // E-commerce categories
    if (tabKey === 'ecommerce') {
      if (subcategoryName === 'Warehouse & Logistics') {
        return jobCounts.warehouse;
      } else if (subcategoryName === 'Retail & Sales') {
        return jobCounts.retail;
      } else if (subcategoryName === 'Digital Marketing') {
        return jobCounts.digitalMarketing;
      } else if (subcategoryName === 'Product Management') {
        return jobCounts.productManagement;
      } else if (subcategoryName === 'Operations & Fulfillment') {
        return jobCounts.operations;
      }
    }
    
    return (
      categories[tabKey]?.subcategories.find((sub) => sub.name === subcategoryName)
        ?.jobCount ?? 0
    );
  }

  const categories: Record<string, CategoryData> = {
    it: {
      title: 'IT Jobs',
      icon: <Code size={24} />,
      subcategories: [
        {
          name: 'Software Development',
          icon: <Code size={20} />,
          description: 'Full Stack, Frontend, Backend, Mobile, Web development roles',
          jobCount: softwareJobs.length
        },
        { 
          name: 'Hardware & Networking', 
          icon: <Wifi size={20} />,
          description: 'Network Engineer, System Administrator, IoT specialist roles',
          jobCount: hardwareNetworkingJobs.length
        },
        { 
          name: 'Cybersecurity', 
          icon: <Shield size={20} />,
          description: 'Security Analyst, Ethical Hacker, Compliance specialist roles',
          jobCount: jobCounts.cybersecurity
        },
        { 
          name: 'Data Science & AI', 
          icon: <Database size={20} />,
          description: 'Machine Learning, AI Engineer, Data Scientist roles',
          jobCount: jobCounts.dataScience
        },
        { 
          name: 'Cloud Computing', 
          icon: <Cloud size={20} />,
          description: 'AWS, Azure, DevOps Engineer roles',
          jobCount: jobCounts.cloudComputing
        },
        { 
          name: 'IT Support & Helpdesk', 
          icon: <Headphones size={20} />,
          description: 'Technical Support, IT Admin roles',
          jobCount: jobCounts.itSupport
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
          jobCount: jobCounts.bpoCustomerSupport
        },
        { 
          name: 'Finance & Banking', 
          icon: <Building size={20} />,
          description: 'Accountant, Investment Analyst, Banking jobs',
          jobCount: jobCounts.finance
        },
        { 
          name: 'Marketing & Sales', 
          icon: <TrendingUp size={20} />,
          description: 'Digital Marketing, Sales Executive, SEO roles',
          jobCount: jobCounts.marketing
        },
        { 
          name: 'Human Resources (HR)', 
          icon: <Users size={20} />,
          description: 'Recruiter, HR Manager, Payroll specialist roles',
          jobCount: jobCounts.hr
        },
        { 
          name: 'Legal & Compliance', 
          icon: <Scale size={20} />,
          description: 'Corporate Lawyer, Legal Advisor, Compliance officer roles',
          jobCount: jobCounts.legal
        },
        { 
          name: 'Healthcare & Pharma', 
          icon: <Stethoscope size={20} />,
          description: 'Medical Representative, Nursing, Lab Tech roles',
          jobCount: jobCounts.healthcare
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
          jobCount: jobCounts.warehouse
        },
        { 
          name: 'Retail & Sales', 
          icon: <ShoppingBag size={20} />,
          description: 'E-commerce Sales, Customer Support, Vendor Manager roles',
          jobCount: jobCounts.retail
        },
        { 
          name: 'Digital Marketing', 
          icon: <Share2 size={20} />,
          description: 'SEO, PPC, Social Media Manager roles',
          jobCount: jobCounts.digitalMarketing
        },
        { 
          name: 'Product Management', 
          icon: <Layout size={20} />,
          description: 'Product Owner, E-commerce Analyst roles',
          jobCount: jobCounts.productManagement
        },
        { 
          name: 'Operations & Fulfillment', 
          icon: <Package size={20} />,
          description: 'Order Processing, Returns Management roles',
          jobCount: jobCounts.operations
        }
      ]
    }
  };

  const handleSubcategoryClick = (subcategory: string) => {
    if (subcategory === 'Software Development') {
      navigate('/jobs/software-development');
      return;
    }
    
    if (subcategory === 'Hardware & Networking') {
      navigate('/jobs/hardware-networking');
      return;
    }
    
    const formattedSubcategory = subcategory.toLowerCase().replace(/[&()]/g, '').replace(/\s+/g, '-');
    navigate('/jobs', { state: { category: activeTab, subcategory: formattedSubcategory } });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      toast({
        title: "Please enter a search term",
        description: "Enter a job title, skill or company name to search",
        variant: "destructive"
      });
      return;
    }
    
    navigate('/jobs', { state: { searchTerm } });
    toast({
      title: "Search initiated",
      description: `Showing results for "${searchTerm}"`
    });
  };

  const handleJoinWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Button is now non-functional
  };

  const getFilteredCategories = () => {
    if (!searchTerm.trim()) return categories;
    
    const filtered: Record<string, CategoryData> = {};
    
    Object.entries(categories).forEach(([key, category]) => {
      const matchingSubcategories = category.subcategories.filter(
        subcategory => 
          subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          subcategory.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (matchingSubcategories.length > 0) {
        filtered[key] = {
          ...category,
          subcategories: matchingSubcategories
        };
      }
    });
    
    return filtered;
  };

  const filteredCategories = getFilteredCategories();
  const hasSearchResults = Object.keys(filteredCategories).length > 0;

  return (
    <>
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        <section className="bg-dhara-blue py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="heading-xl mb-6 animate-fade-in">Job Categories</h1>
              <p className="text-xl text-white/85 animate-fade-in">
                Explore our curated collection of job categories tailored to your professional interests.
              </p>
              <div className="mt-8 flex justify-center">
                <form onSubmit={handleSearchSubmit} className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dhara-blue/70" size={20} />
                  <input
                    type="text"
                    placeholder="Search for jobs, skills, or companies"
                    className="w-full py-3 px-10 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-dhara-light-blue"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full py-1.5 px-4 bg-dhara-blue hover:bg-dhara-blue/90">
                    Search
                  </Button>
                </form>
              </div>
              
              <div className="mt-6">
                <Button 
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600 text-white group transition-all duration-300 transform hover:scale-110 hover:shadow-lg relative overflow-hidden"
                  onClick={handleJoinWhatsApp}
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  <MessageSquare size={18} className="mr-2 group-hover:animate-pulse" />
                  <span className="relative z-10">Join Our WhatsApp Community</span>
                  <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              {!hasSearchResults && searchTerm.trim() !== '' ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Search size={48} className="mx-auto text-dhara-gray opacity-50 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No matching job categories found</h3>
                  <p className="text-dhara-gray mb-6">Try different keywords or browse all categories below</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm('')}
                    className="border-dhara-blue text-dhara-blue hover:bg-dhara-blue/10"
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
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
                  
                  {Object.entries(filteredCategories).map(([key, category]) => (
                    <TabsContent key={key} value={key} className="space-y-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-dhara-blue/10 text-dhara-blue mr-3">
                            {category.icon}
                          </div>
                          <h2 className="text-2xl font-bold">{category.title}</h2>
                        </div>
                        <div className="text-dhara-gray font-medium">
                          {category.subcategories.reduce(
                            (total, sub) => total + getJobCountForSubcategory(key, sub.name),
                            0
                          )}{" "}
                          available positions
                        </div>
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
                                  <p className="text-sm text-muted-foreground">
                                    {getJobCountForSubcategory(key, subcategory.name)}{" "}
                                    available positions
                                  </p>
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
                                <div>
                                  <Button 
                                    onClick={() => handleSubcategoryClick(subcategory.name)}
                                    className="bg-dhara-blue hover:bg-dhara-blue/90"
                                  >
                                    View Jobs <ArrowRight size={16} className="ml-2" />
                                  </Button>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </div>
          </div>
        </section>
        
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
