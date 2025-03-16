
import { useState, useEffect, useRef } from 'react';
import { Users, Building, Trophy, Briefcase } from 'lucide-react';

type StatItemProps = {
  icon: React.ReactNode;
  value: number;
  label: string;
  duration?: number;
  suffix?: string;
};

const StatItem = ({ icon, value, label, duration = 2000, suffix = "" }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const start = 0;
        const end = value;
        const stepTime = Math.abs(Math.floor(duration / (end - start)));
        
        let current = start;
        const timer = setInterval(() => {
          current += 1;
          setCount(current);
          if (current >= end) {
            clearInterval(timer);
          }
        }, stepTime);

        return () => clearInterval(timer);
      }
    };

    const observer = new IntersectionObserver(observerCallback, { 
      threshold: 0.1 
    });
    
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [value, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-center p-6 bg-white rounded-lg shadow-sm border border-border">
      <div className="mb-4 flex justify-center">
        <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-dhara-blue mb-2">
        {count}{suffix}
      </h3>
      <p className="text-dhara-gray">{label}</p>
    </div>
  );
};

const AnimatedStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatItem 
        icon={<Users className="text-dhara-blue" size={24} />} 
        value={5000} 
        label="Successful Placements" 
        suffix="+" 
      />
      <StatItem 
        icon={<Building className="text-dhara-blue" size={24} />} 
        value={200} 
        label="Partnered Companies" 
        suffix="+" 
      />
      <StatItem 
        icon={<Trophy className="text-dhara-blue" size={24} />} 
        value={97} 
        label="Client Satisfaction" 
        suffix="%" 
      />
      <StatItem 
        icon={<Briefcase className="text-dhara-blue" size={24} />} 
        value={12} 
        label="Years of Experience" 
      />
    </div>
  );
};

export default AnimatedStats;
