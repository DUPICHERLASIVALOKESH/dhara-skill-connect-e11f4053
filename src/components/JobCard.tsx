
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Briefcase, DollarSign, GraduationCap, MessageSquare, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export interface JobProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  salary?: string;
  postedDate: string;
  description: string;
  logo?: string;
  source?: 'LinkedIn' | 'Indeed' | 'Naukri' | 'Google Jobs' | 'Glassdoor' | string;
  education?: string;
  applyLink?: string;
  isNew?: boolean;
}

const JobCard = ({ job }: { job: JobProps }) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${job.title} at ${job.company}`,
          text: `Check out this job opportunity: ${job.title} at ${job.company}`,
          url: job.applyLink || window.location.href
        });
      } else {
        await navigator.clipboard.writeText(job.applyLink || window.location.href);
        toast({
          title: "Link copied!",
          description: "The job link has been copied to your clipboard."
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Couldn't share",
        description: "Please try copying the link manually.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-border relative">
      {job.isNew && (
        <div className="absolute -top-2 -right-2 animate-bounce">
          <Badge className="bg-green-500 text-white">
            NEW
          </Badge>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            {job.logo ? (
              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-dhara-light-gray/50 flex items-center justify-center">
                <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-md flex-shrink-0 bg-dhara-blue/10 text-dhara-blue flex items-center justify-center">
                <Briefcase size={20} />
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold text-dhara-blue">{job.title}</h3>
              <p className="text-dhara-dark font-medium">{job.company}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-dhara-gray">
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              {job.location}
            </div>
            <div className="flex items-center">
              <Briefcase size={16} className="mr-1" />
              {job.type}
            </div>
            {job.salary && (
              <div className="flex items-center">
                <DollarSign size={16} className="mr-1" />
                {job.salary}
              </div>
            )}
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              {job.postedDate}
            </div>
            {job.education && (
              <div className="flex items-center">
                <GraduationCap size={16} className="mr-1" />
                {job.education}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline" className="bg-dhara-light-gray/50 hover:bg-dhara-light-gray/75 text-dhara-dark">
              {job.level}
            </Badge>
            {job.source && (
              <Badge variant="secondary" className="bg-dhara-blue/10 hover:bg-dhara-blue/20 text-dhara-blue border-none">
                via {job.source}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-dhara-gray line-clamp-2">{job.description}</p>
        <div className="flex flex-wrap gap-3 mt-4">
          {job.applyLink ? (
            <Button asChild className="bg-dhara-blue hover:bg-dhara-blue/90">
              <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          ) : (
            <Button asChild className="bg-dhara-blue hover:bg-dhara-blue/90">
              <Link to={`/jobs/software-development/${job.id}`}>
                View Details
              </Link>
            </Button>
          )}

          <Button asChild variant="whatsapp">
            <a href="https://chat.whatsapp.com/CGguruZu2nEJfjNPT0trdm" target="_blank" rel="noopener noreferrer">
              <MessageSquare size={16} className="mr-2" />
              Join WhatsApp
            </a>
          </Button>

          <Button 
            variant="outline" 
            className="bg-white hover:bg-gray-50 text-dhara-blue border-dhara-blue/20"
            onClick={handleShare}
          >
            <Share2 size={16} className="mr-2" />
            Share Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
