
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

export interface JobProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  postedDate: string;
  description: string;
}

const JobCard = ({ job }: { job: JobProps }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-border">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-dhara-blue">{job.title}</h3>
          <p className="text-dhara-dark font-medium">{job.company}</p>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-dhara-gray">
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              {job.location}
            </div>
            <div className="flex items-center">
              <Briefcase size={16} className="mr-1" />
              {job.type}
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              {job.postedDate}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline" className="bg-dhara-light-gray/50 hover:bg-dhara-light-gray/75 text-dhara-dark">
              {job.level}
            </Badge>
          </div>
        </div>

        <Button asChild className="mt-4 md:mt-0 bg-dhara-blue hover:bg-dhara-blue/90 self-start">
          <Link to={`/jobs/${job.id}`}>
            Apply Now
          </Link>
        </Button>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-dhara-gray line-clamp-2">{job.description}</p>
      </div>
    </div>
  );
};

export default JobCard;
