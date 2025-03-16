
import { CalendarDays, Award, Users, Building, Globe, Trophy } from 'lucide-react';

type TimelineItemProps = {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position?: 'left' | 'right';
};

const TimelineItem = ({ year, title, description, icon, position = 'left' }: TimelineItemProps) => {
  const isLeft = position === 'left';
  
  return (
    <div className="relative flex items-center justify-between mb-8 md:mb-12">
      {/* For mobile view (stacked) */}
      <div className="w-full block md:hidden mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 text-dhara-blue rounded-full">
            {icon}
          </div>
          <div className="font-semibold text-dhara-blue">{year}</div>
        </div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-dhara-gray">{description}</p>
      </div>
      
      {/* For desktop view (alternating left/right) */}
      <div className={`hidden md:flex w-full items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
        <div className={`bg-white p-5 rounded-lg shadow-sm border border-border relative w-[calc(50%-2rem)] ${isLeft ? 'mr-auto text-right' : 'ml-auto text-left'}`}>
          <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-dhara-blue rounded-full ${isLeft ? '-right-8' : '-left-8'}`}></div>
          <div className={`absolute top-1/2 -translate-y-1/2 w-6 ${isLeft ? '-right-6' : '-left-6'} border-t-2 border-dhara-blue`}></div>
          <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-2 bg-blue-100 text-dhara-blue rounded-full ${isLeft ? 'order-2' : 'order-1'}`}>
              {icon}
            </div>
            <div className="font-semibold text-dhara-blue">{year}</div>
          </div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-dhara-gray">{description}</p>
        </div>
      </div>
    </div>
  );
};

const CompanyTimeline = () => {
  return (
    <div className="relative">
      {/* Vertical timeline line (desktop only) */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-dhara-blue/20"></div>
      
      <TimelineItem 
        year="2010" 
        title="DHARA Consultant Solution Founded" 
        description="Started as a small recruitment agency with 3 team members, focusing on IT sector placements."
        icon={<CalendarDays size={18} />} 
        position="left" 
      />
      
      <TimelineItem 
        year="2013" 
        title="Expansion to Multiple Industries" 
        description="Expanded services to finance, healthcare, and engineering sectors, doubling our team size."
        icon={<Building size={18} />} 
        position="right" 
      />
      
      <TimelineItem 
        year="2016" 
        title="1000+ Successful Placements" 
        description="Reached the milestone of connecting 1000+ professionals with their dream jobs."
        icon={<Trophy size={18} />} 
        position="left" 
      />
      
      <TimelineItem 
        year="2018" 
        title="Pan-India Operations" 
        description="Expanded operations to all major cities across India with dedicated regional teams."
        icon={<Globe size={18} />} 
        position="right" 
      />
      
      <TimelineItem 
        year="2021" 
        title="Strategic Partnerships" 
        description="Formed strategic partnerships with 100+ top companies for exclusive recruitment opportunities."
        icon={<Users size={18} />} 
        position="left" 
      />
      
      <TimelineItem 
        year="2023" 
        title="Digital Transformation" 
        description="Implemented AI-powered recruitment solutions and expanded our global presence."
        icon={<Award size={18} />} 
        position="right" 
      />
    </div>
  );
};

export default CompanyTimeline;
