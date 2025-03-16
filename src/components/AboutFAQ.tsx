
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const AboutFAQ = () => {
  const faqs = [
    {
      question: "How does DHARA help job seekers?",
      answer: "We connect job seekers with suitable opportunities across industries, provide career guidance, optimize resumes, conduct interview preparation, and negotiate offers on your behalf - all at no cost to candidates."
    },
    {
      question: "What industries does DHARA specialize in?",
      answer: "We specialize in IT, healthcare, finance, engineering, manufacturing, retail, and education sectors, with dedicated recruiters for each industry to ensure domain expertise."
    },
    {
      question: "How long does the typical hiring process take?",
      answer: "The timeline varies by position and industry, but typically ranges from 2-6 weeks from initial application to offer acceptance. Our team works to expedite the process without compromising quality."
    },
    {
      question: "Do you provide services pan-India?",
      answer: "Yes, we operate across all major cities in India and can assist with relocation services when required. We also have growing capabilities for international placements."
    },
    {
      question: "How do you ensure quality candidate matches?",
      answer: "We use a combination of AI-powered matching algorithms and human expertise to thoroughly assess technical skills, cultural fit, and career aspirations before recommending candidates."
    },
    {
      question: "What fees do you charge for your services?",
      answer: "Our services are free for job seekers. For employers, we operate on a success-based model with fees typically based on a percentage of the candidate's annual salary, paid only upon successful placement."
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
          <AccordionContent>
            <p className="text-dhara-gray">{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AboutFAQ;
