
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

// Define message types
export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

// Define quick reply options
export interface QuickReply {
  id: string;
  text: string;
  action: string;
}

// Define chat context type
interface ChatContextType {
  messages: ChatMessage[];
  isTyping: boolean;
  quickReplies: QuickReply[];
  addMessage: (content: string, role: MessageRole) => void;
  clearMessages: () => void;
  handleUserMessage: (content: string) => Promise<void>;
  setQuickReplies: (replies: QuickReply[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const { currentUser } = useAuth();

  // Initialize chat with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = currentUser 
        ? `Welcome back, ${currentUser.displayName || 'there'}! How can I help you today?` 
        : "Welcome to DHARA Consultant Solution! I'm your AI recruitment assistant. How can I help you today?";
      
      setMessages([{
        id: 'welcome',
        content: welcomeMessage,
        role: 'assistant',
        timestamp: new Date()
      }]);
      
      // Set initial quick replies
      setQuickReplies([
        { id: 'find-jobs', text: 'Find Jobs', action: 'findJobs' },
        { id: 'post-job', text: 'Post a Job', action: 'postJob' },
        { id: 'services', text: 'Our Services', action: 'services' },
        { id: 'resume-tips', text: 'Resume Tips', action: 'resumeTips' }
      ]);
    }
  }, [currentUser, messages.length]);

  // Add a new message to the chat
  const addMessage = (content: string, role: MessageRole) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Clear all messages
  const clearMessages = () => {
    setMessages([]);
  };

  // Process user messages and generate responses
  const handleUserMessage = async (content: string) => {
    // Add user message to chat
    addMessage(content, 'user');
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Process the message to determine intent
      const response = await processMessage(content, currentUser);
      
      // Add a small delay to simulate typing
      setTimeout(() => {
        // Add AI response to chat
        addMessage(response.message, 'assistant');
        
        // Update quick replies if provided
        if (response.quickReplies) {
          setQuickReplies(response.quickReplies);
        }
        
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error processing message:', error);
      
      setTimeout(() => {
        addMessage("I'm sorry, I'm having trouble processing your request. Please try again later.", 'assistant');
        setIsTyping(false);
      }, 1000);
    }
  };

  const value = {
    messages,
    isTyping,
    quickReplies,
    addMessage,
    clearMessages,
    handleUserMessage,
    setQuickReplies
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// Message processing function
interface ProcessedResponse {
  message: string;
  quickReplies?: QuickReply[];
}

async function processMessage(message: string, user: User | null): Promise<ProcessedResponse> {
  // Convert message to lowercase for easier matching
  const lowerMessage = message.toLowerCase();
  
  // Job seeker queries
  if (
    lowerMessage.includes('job') && 
    (lowerMessage.includes('find') || lowerMessage.includes('search') || lowerMessage.includes('looking'))
  ) {
    return handleJobSearchQuery(message);
  }
  
  // Resume and application queries
  if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
    return handleResumeQuery(message);
  }
  
  // Employer queries
  if (
    lowerMessage.includes('hire') || 
    lowerMessage.includes('recruit') || 
    lowerMessage.includes('post job') ||
    lowerMessage.includes('looking for candidates')
  ) {
    return handleEmployerQuery(message);
  }
  
  // Service inquiries
  if (
    lowerMessage.includes('service') || 
    lowerMessage.includes('offer') || 
    lowerMessage.includes('provide')
  ) {
    return handleServiceQuery();
  }
  
  // Application status (for logged-in users)
  if (
    lowerMessage.includes('application status') || 
    lowerMessage.includes('my application') ||
    lowerMessage.includes('job status')
  ) {
    return handleApplicationStatusQuery(user);
  }
  
  // Contact information
  if (
    lowerMessage.includes('contact') || 
    lowerMessage.includes('phone') || 
    lowerMessage.includes('email') ||
    lowerMessage.includes('reach')
  ) {
    return {
      message: "You can contact our support team at support@dharaconsultant.com or call us at +91-9876543210. Would you like me to help you with anything else?",
      quickReplies: [
        { id: 'call', text: 'Call Us', action: 'call' },
        { id: 'email', text: 'Email Us', action: 'email' },
        { id: 'contact-form', text: 'Contact Form', action: 'contactForm' }
      ]
    };
  }
  
  // Interview tips
  if (
    lowerMessage.includes('interview') && 
    (lowerMessage.includes('tip') || lowerMessage.includes('advice') || lowerMessage.includes('prepare'))
  ) {
    return {
      message: "Here are some interview tips:\n\n" +
        "1. Research the company thoroughly\n" +
        "2. Practice common interview questions\n" +
        "3. Prepare examples of your achievements\n" +
        "4. Dress professionally and arrive early\n" +
        "5. Ask insightful questions about the role\n\n" +
        "Would you like more specific interview advice?",
      quickReplies: [
        { id: 'technical-interview', text: 'Technical Interviews', action: 'technicalInterviews' },
        { id: 'behavioral-interview', text: 'Behavioral Questions', action: 'behavioralInterviews' },
        { id: 'remote-interview', text: 'Remote Interviews', action: 'remoteInterviews' }
      ]
    };
  }
  
  // Fallback response
  return {
    message: "I'm here to help with your recruitment and job search needs. How can I assist you today?",
    quickReplies: [
      { id: 'find-jobs', text: 'Find Jobs', action: 'findJobs' },
      { id: 'post-job', text: 'Post a Job', action: 'postJob' },
      { id: 'services', text: 'Our Services', action: 'services' },
      { id: 'help', text: 'Help Options', action: 'help' }
    ]
  };
}

// Helper functions for different query types
function handleJobSearchQuery(query: string): ProcessedResponse {
  // Extract location if mentioned
  let location = '';
  const locationMatches = query.match(/in\s+([a-zA-Z\s]+)/i);
  if (locationMatches && locationMatches[1]) {
    location = locationMatches[1].trim();
  }
  
  // Extract job role if mentioned
  let role = '';
  const roleMatches = query.match(/(software engineer|developer|manager|analyst|designer|accountant|marketing|sales|hr|data scientist)/i);
  if (roleMatches && roleMatches[1]) {
    role = roleMatches[1].trim();
  }
  
  let responseMessage = '';
  
  if (role && location) {
    responseMessage = `I've found several ${role} positions in ${location}. Here are some available opportunities:\n\n` +
      `• Senior ${role} at TechGlobe Solutions\n` +
      `• ${role} (Mid-level) at Infinity Enterprises\n` +
      `• Junior ${role} at InnovateTech\n\n` +
      `Would you like to see more details about any of these positions?`;
  } else if (role) {
    responseMessage = `I've found several ${role} positions. Here are some available opportunities:\n\n` +
      `• Senior ${role} at TechGlobe Solutions (Mumbai)\n` +
      `• ${role} (Mid-level) at Infinity Enterprises (Bengaluru)\n` +
      `• Junior ${role} at InnovateTech (Pune)\n\n` +
      `Would you like to see more details about any of these positions?`;
  } else if (location) {
    responseMessage = `Here are some job openings in ${location}:\n\n` +
      `• Senior Software Engineer at TechGlobe Solutions\n` +
      `• HR Manager at Infinity Enterprises\n` +
      `• Marketing Specialist at BrandWave Media\n\n` +
      `Would you like to filter by job type or experience level?`;
  } else {
    responseMessage = `I can help you find the perfect job opportunity. To provide the most relevant results, could you specify:\n\n` +
      `1. The role you're looking for (e.g., Software Engineer, HR Manager)\n` +
      `2. Your preferred location\n` +
      `3. Experience level (Entry, Mid, Senior)`;
  }
  
  return {
    message: responseMessage,
    quickReplies: [
      { id: 'view-all-jobs', text: 'View All Jobs', action: 'viewAllJobs' },
      { id: 'filter-jobs', text: 'Filter Results', action: 'filterJobs' },
      { id: 'job-alerts', text: 'Set Job Alerts', action: 'jobAlerts' }
    ]
  };
}

function handleResumeQuery(query: string): ProcessedResponse {
  if (query.toLowerCase().includes('tips') || query.toLowerCase().includes('advice')) {
    return {
      message: "Here are some resume tips to make your application stand out:\n\n" +
        "1. Tailor your resume for each job application\n" +
        "2. Highlight accomplishments with measurable results\n" +
        "3. Use action verbs and industry-specific keywords\n" +
        "4. Keep formatting clean and consistent\n" +
        "5. Include a strong professional summary at the top\n\n" +
        "Would you like me to review your resume or provide specific advice for your industry?",
      quickReplies: [
        { id: 'resume-review', text: 'Resume Review', action: 'resumeReview' },
        { id: 'resume-templates', text: 'Resume Templates', action: 'resumeTemplates' },
        { id: 'industry-tips', text: 'Industry-Specific Tips', action: 'industryTips' }
      ]
    };
  } else {
    return {
      message: "You can upload your resume to our platform to apply for jobs more quickly and receive personalized job recommendations. Our AI-powered system will analyze your skills and match you with suitable positions. Would you like to upload your resume now?",
      quickReplies: [
        { id: 'upload-resume', text: 'Upload Resume', action: 'uploadResume' },
        { id: 'resume-tips', text: 'Resume Tips', action: 'resumeTips' },
        { id: 'resume-formats', text: 'Resume Formats', action: 'resumeFormats' }
      ]
    };
  }
}

function handleEmployerQuery(query: string): ProcessedResponse {
  return {
    message: "Thank you for your interest in our recruitment services. As an employer, you can:\n\n" +
      "1. Post job openings on our platform\n" +
      "2. Browse pre-screened candidates\n" +
      "3. Use our AI matching system to find qualified applicants\n" +
      "4. Get support from our recruitment specialists\n\n" +
      "Would you like to post a new job or learn more about our employer services?",
    quickReplies: [
      { id: 'post-job', text: 'Post a Job', action: 'postJob' },
      { id: 'employer-services', text: 'Employer Services', action: 'employerServices' },
      { id: 'pricing', text: 'Pricing Plans', action: 'pricing' },
      { id: 'speak-to-recruiter', text: 'Speak to a Recruiter', action: 'speakToRecruiter' }
    ]
  };
}

function handleServiceQuery(): ProcessedResponse {
  return {
    message: "DHARA Consultant Solution offers comprehensive recruitment services including:\n\n" +
      "For Employers:\n" +
      "• Talent Sourcing & Screening\n" +
      "• Executive Search & Leadership Hiring\n" +
      "• Contract & Temporary Staffing\n" +
      "• HR Consulting\n\n" +
      "For Job Seekers:\n" +
      "• Job Matching & Career Guidance\n" +
      "• Resume Building & Optimization\n" +
      "• Interview Preparation & Coaching\n" +
      "• Skill Development Recommendations\n\n" +
      "Which service would you like to learn more about?",
    quickReplies: [
      { id: 'employer-services', text: 'Employer Services', action: 'employerServices' },
      { id: 'jobseeker-services', text: 'Job Seeker Services', action: 'jobSeekerServices' },
      { id: 'pricing', text: 'Pricing Plans', action: 'pricing' },
      { id: 'testimonials', text: 'Client Testimonials', action: 'testimonials' }
    ]
  };
}

function handleApplicationStatusQuery(user: User | null): ProcessedResponse {
  if (!user) {
    return {
      message: "To check your application status, please sign in to your account. Once signed in, I'll be able to provide updates on your job applications.",
      quickReplies: [
        { id: 'sign-in', text: 'Sign In', action: 'signIn' },
        { id: 'create-account', text: 'Create Account', action: 'createAccount' },
        { id: 'help', text: 'Help', action: 'help' }
      ]
    };
  }
  
  // Mock data for demonstration - in real implementation, this would come from a database
  return {
    message: "Here's the status of your recent applications:\n\n" +
      "1. Senior Software Engineer at TechGlobe Solutions - Under Review\n" +
      "2. Product Manager at InnovateTech - Interview Scheduled (May 15, 2023)\n" +
      "3. Data Analyst at Global Finance Corp - Application Received\n\n" +
      "Would you like to see more details about any of these applications?",
    quickReplies: [
      { id: 'app-details-1', text: 'TechGlobe Details', action: 'applicationDetails1' },
      { id: 'app-details-2', text: 'InnovateTech Details', action: 'applicationDetails2' },
      { id: 'all-applications', text: 'View All Applications', action: 'viewAllApplications' }
    ]
  };
}
