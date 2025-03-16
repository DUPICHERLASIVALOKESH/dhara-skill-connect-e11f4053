
import { ClipboardCheck, Users, Building, Calendar, CheckCircle } from 'lucide-react';

const HiringProcess = () => {
  const steps = [
    {
      id: 1,
      title: "Job Requirement Analysis",
      description: "We work closely with employers to understand their exact needs and create detailed job profiles.",
      icon: <ClipboardCheck className="text-dhara-blue" size={24} />
    },
    {
      id: 2,
      title: "Candidate Sourcing & Screening",
      description: "Our team sources and pre-screens candidates through our extensive database and networks.",
      icon: <Users className="text-dhara-blue" size={24} />
    },
    {
      id: 3,
      title: "Profile Matching & Presentation",
      description: "We present only the best-matched profiles to employers with detailed assessment reports.",
      icon: <Building className="text-dhara-blue" size={24} />
    },
    {
      id: 4,
      title: "Interview Coordination",
      description: "We handle all logistics of scheduling and coordinating interviews between parties.",
      icon: <Calendar className="text-dhara-blue" size={24} />
    },
    {
      id: 5,
      title: "Offer Negotiation & Onboarding",
      description: "We facilitate smooth offer negotiations and assist with the entire onboarding process.",
      icon: <CheckCircle className="text-dhara-blue" size={24} />
    }
  ];

  return (
    <div className="space-y-12">
      {/* Process Steps for Mobile */}
      <div className="block md:hidden space-y-8">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start gap-4">
            <div className="relative">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                {step.icon}
              </div>
              {step.id !== steps.length && (
                <div className="absolute top-12 bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-dhara-blue/20"></div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">Step {step.id}: {step.title}</h3>
              <p className="text-dhara-gray">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Process Steps for Desktop (Horizontal) */}
      <div className="hidden md:block">
        <div className="flex justify-between relative mb-4">
          {/* Horizontal connection line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-dhara-blue/20"></div>
          
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 w-1/5 text-center px-2">
              <div className="w-12 h-12 mx-auto flex items-center justify-center bg-blue-100 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-base font-semibold mb-1">Step {step.id}</h3>
              <p className="text-sm font-medium text-dhara-blue">{step.title}</p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-5 gap-4 mt-4">
          {steps.map((step) => (
            <div key={step.id} className="text-center px-2">
              <p className="text-sm text-dhara-gray">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HiringProcess;
