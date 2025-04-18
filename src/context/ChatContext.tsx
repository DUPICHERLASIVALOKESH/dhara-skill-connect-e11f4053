
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatMessage, QuickReply, ResumeAnalysisResult, JobAlert, MessageRole } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';

// Define chat context type
interface ChatContextType {
  messages: ChatMessage[];
  isTyping: boolean;
  quickReplies: QuickReply[];
  darkMode: boolean;
  resumeAnalysis: ResumeAnalysisResult | null;
  jobAlerts: JobAlert[];
  addMessage: (content: string, role: MessageRole) => void;
  clearMessages: () => void;
  handleUserMessage: (content: string) => Promise<void>;
  setQuickReplies: (replies: QuickReply[]) => void;
  toggleDarkMode: () => void;
  analyzeResume: (file: File) => Promise<void>;
  subscribeToJobAlerts: (email: string, query: string, location?: string, frequency?: 'daily' | 'weekly') => Promise<void>;
  resetChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysisResult | null>(null);
  const [jobAlerts, setJobAlerts] = useState<JobAlert[]>([]);
  const { toast } = useToast();

  // Initialize chat with a welcome message
  useEffect(() => {
    resetChat();
  }, []);

  // Reset chat to initial state
  const resetChat = () => {
    const welcomeMessage = "Welcome! How can I help you today? I can help you find jobs, improve your resume, or prepare for interviews.";
    
    setMessages([{
      id: 'welcome',
      content: welcomeMessage,
      role: 'assistant',
      timestamp: new Date()
    }]);
    
    // Set initial quick replies
    setQuickReplies([
      { id: 'find-jobs', text: 'Find Jobs', action: 'findJobs' },
      { id: 'resume-tips', text: 'Resume Tips', action: 'resumeTips' },
      { id: 'interview-prep', text: 'Interview Prep', action: 'interviewPrep' },
      { id: 'talk-recruiter', text: 'Talk to a Recruiter', action: 'talkToRecruiter' }
    ]);
    
    setResumeAnalysis(null);
  };

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
    resetChat();
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Analyze resume (mock implementation)
  const analyzeResume = async (file: File): Promise<void> => {
    setIsTyping(true);
    
    // Mock resume analysis - in a real implementation, this would call an API
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis result
      const analysis: ResumeAnalysisResult = {
        overallScore: Math.floor(Math.random() * 30) + 70, // 70-100%
        keywordOptimization: [
          "Add more industry-specific keywords",
          "Include more technical skills",
          "Quantify your achievements"
        ],
        formattingIssues: [
          "Inconsistent bullet formatting",
          "Too much text in some sections",
          "Consider using a more ATS-friendly font"
        ],
        missingSuggestions: [
          "Add certifications section",
          "Include more quantifiable results",
          "Add a professional summary"
        ],
        improvement: "Your resume needs more targeted keywords related to the jobs you're applying for. Quantify your achievements with numbers and metrics where possible.",
        improvements: [
          "Add more industry-specific keywords",
          "Include more technical skills",
          "Quantify your achievements"
        ]
      };
      
      setResumeAnalysis(analysis);
      
      addMessage(`I've analyzed your resume and found some areas for improvement. Your overall ATS score is ${analysis.overallScore}%. Would you like to see the detailed analysis?`, 'assistant');
      
      setQuickReplies([
        { id: 'show-details', text: 'Show Full Analysis', action: 'showResumeDetails' },
        { id: 'improve-resume', text: 'How to Improve', action: 'improveTips' },
        { id: 'find-jobs', text: 'Find Matching Jobs', action: 'findMatchingJobs' }
      ]);
      
      toast({
        title: "Resume Analysis Complete",
        description: `Your resume scored ${analysis.overallScore}% on our ATS test`,
      });
    } catch (error) {
      console.error('Error analyzing resume:', error);
      addMessage("I'm sorry, I encountered an error while analyzing your resume. Please try again later.", 'assistant');
    } finally {
      setIsTyping(false);
    }
  };

  // Subscribe to job alerts
  const subscribeToJobAlerts = async (email: string, query: string, location?: string, frequency: 'daily' | 'weekly' = 'daily'): Promise<void> => {
    try {
      // In a real app, this would call an API
      const newAlert: JobAlert = {
        id: Date.now().toString(),
        query,
        location,
        frequency,
        email
      };
      
      setJobAlerts(prev => [...prev, newAlert]);
      
      addMessage(`Great! You've been subscribed to ${frequency} job alerts for "${query}" ${location ? `in ${location}` : ''}. We'll send updates to ${email}.`, 'assistant');
      
      toast({
        title: "Job Alert Created",
        description: `You'll receive ${frequency} updates for "${query}" jobs`,
      });
    } catch (error) {
      console.error('Error subscribing to job alerts:', error);
      addMessage("I'm sorry, I encountered an error while setting up your job alert. Please try again later.", 'assistant');
    }
  };

  // Process user messages and generate responses
  const handleUserMessage = async (content: string) => {
    // Add user message to chat
    addMessage(content, 'user');
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Process the message to determine intent
      const response = await processMessage(content);
      
      // Add a small delay to simulate typing
      await simulateTyping(response.message);
      
      // Add AI response to chat
      addMessage(response.message, 'assistant');
      
      // Update quick replies if provided
      if (response.quickReplies) {
        setQuickReplies(response.quickReplies);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      
      setTimeout(() => {
        addMessage("I'm sorry, I'm having trouble processing your request. Please try again later.", 'assistant');
        setIsTyping(false);
      }, 1000);
    }
  };

  // Helper function to simulate typing effect
  const simulateTyping = async (message: string): Promise<void> => {
    // Calculate typing delay based on message length (faster for shorter messages)
    const baseDelay = 500;
    const charDelay = 10; // ms per character
    const calculatedDelay = Math.min(baseDelay + message.length * charDelay, 3000);
    
    await new Promise(resolve => setTimeout(resolve, calculatedDelay));
    setIsTyping(false);
  };

  const value = {
    messages,
    isTyping,
    quickReplies,
    darkMode,
    resumeAnalysis,
    jobAlerts,
    addMessage,
    clearMessages,
    handleUserMessage,
    setQuickReplies,
    toggleDarkMode,
    analyzeResume,
    subscribeToJobAlerts,
    resetChat
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

async function processMessage(message: string): Promise<ProcessedResponse> {
  // Convert message to lowercase for easier matching
  const lowerMessage = message.toLowerCase();
  
  // Detect job search related keywords
  if (
    containsAny(lowerMessage, ['job', 'career', 'position', 'vacancy', 'opening', 'work', 'employment']) &&
    containsAny(lowerMessage, ['find', 'search', 'looking', 'seeking', 'available'])
  ) {
    return handleJobSearchQuery(message);
  }
  
  // Resume related queries
  if (containsAny(lowerMessage, ['resume', 'cv', 'curriculum vitae'])) {
    return handleResumeQuery(message);
  }
  
  // Interview preparation queries
  if (containsAny(lowerMessage, ['interview', 'preparation', 'prepare'])) {
    return handleInterviewQuery(message);
  }
  
  // Salary related queries
  if (containsAny(lowerMessage, ['salary', 'compensation', 'pay', 'package', 'offer'])) {
    return handleSalaryQuery(message);
  }
  
  // Contact or human assistance
  if (containsAny(lowerMessage, ['contact', 'human', 'person', 'agent', 'recruiter', 'talk to', 'speak with'])) {
    return handleContactQuery();
  }
  
  // Job alerts and updates
  if (containsAny(lowerMessage, ['alert', 'notification', 'update', 'subscribe', 'notify'])) {
    return handleJobAlertQuery(message);
  }
  
  // Employer queries
  if (
    containsAny(lowerMessage, ['hire', 'recruit', 'employer', 'company', 'business', 'organization']) &&
    containsAny(lowerMessage, ['post', 'list', 'publish', 'create', 'add'])
  ) {
    return handleEmployerQuery(message);
  }
  
  // Service information
  if (containsAny(lowerMessage, ['service', 'offer', 'provide', 'help', 'assist'])) {
    return handleServiceQuery();
  }
  
  // Application status
  if (containsAny(lowerMessage, ['status', 'application', 'applied', 'progress', 'track'])) {
    return handleApplicationStatusQuery();
  }
  
  // Fallback response with general help
  return {
    message: "I'm your AI recruitment assistant. I can help you with job searches, resume tips, interview preparation, or connecting with recruiters. How can I assist you today?",
    quickReplies: [
      { id: 'find-jobs', text: 'Find Jobs', action: 'findJobs' },
      { id: 'resume-tips', text: 'Resume Tips', action: 'resumeTips' },
      { id: 'interview-prep', text: 'Interview Prep', action: 'interviewPrep' },
      { id: 'contact', text: 'Contact Us', action: 'contactUs' }
    ]
  };
}

// Helper function to check if a string contains any of the keywords
function containsAny(text: string, keywords: string[]): boolean {
  return keywords.some(keyword => text.includes(keyword));
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
      { id: 'job-alerts', text: 'Set Job Alerts', action: 'jobAlerts' },
      { id: 'upload-resume', text: 'Upload Resume', action: 'uploadResume' }
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
        { id: 'upload-resume', text: 'Upload Resume', action: 'uploadResume' },
        { id: 'resume-templates', text: 'Resume Templates', action: 'resumeTemplates' },
        { id: 'industry-tips', text: 'Industry-Specific Tips', action: 'industryTips' },
        { id: 'ats-test', text: 'Test ATS Score', action: 'testATS' }
      ]
    };
  } else if (query.toLowerCase().includes('analyze') || query.toLowerCase().includes('review') || query.toLowerCase().includes('check')) {
    return {
      message: "I'd be happy to analyze your resume for ATS compatibility and provide suggestions for improvement. You can upload your resume (PDF or DOCX) using the button below.",
      quickReplies: [
        { id: 'upload-resume', text: 'Upload Resume', action: 'uploadResume' },
        { id: 'ats-info', text: 'What is ATS?', action: 'atsInfo' },
        { id: 'resume-tips', text: 'Resume Tips', action: 'resumeTips' }
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

function handleInterviewQuery(query: string): ProcessedResponse {
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
      { id: 'remote-interview', text: 'Remote Interviews', action: 'remoteInterviews' },
      { id: 'mock-interview', text: 'Mock Interview', action: 'mockInterview' }
    ]
  };
}

function handleSalaryQuery(query: string): ProcessedResponse {
  return {
    message: "Salary negotiations are an important part of the job application process. Here are some tips:\n\n" +
      "1. Research industry standards for your role and location\n" +
      "2. Consider your experience and qualifications\n" +
      "3. Focus on your value to the company\n" +
      "4. Be prepared to justify your expectations\n" +
      "5. Consider the entire compensation package, not just salary\n\n" +
      "Would you like to see salary ranges for specific roles?",
    quickReplies: [
      { id: 'salary-calculator', text: 'Salary Calculator', action: 'salaryCalculator' },
      { id: 'negotiation-tips', text: 'Negotiation Tips', action: 'negotiationTips' },
      { id: 'benefits-info', text: 'Benefits Guide', action: 'benefitsInfo' }
    ]
  };
}

function handleContactQuery(): ProcessedResponse {
  return {
    message: "If you'd like to speak with a human recruiter, we're happy to connect you! Our team is available Monday-Friday, 9 AM to 6 PM IST. Here are your options:",
    quickReplies: [
      { id: 'call-us', text: '📞 Call Us', action: 'callUs' },
      { id: 'email-us', text: '✉️ Email Us', action: 'emailUs' },
      { id: 'schedule-call', text: '📅 Schedule Call', action: 'scheduleCall' },
      { id: 'live-chat', text: '💬 Live Chat', action: 'liveChat' }
    ]
  };
}

function handleJobAlertQuery(query: string): ProcessedResponse {
  return {
    message: "I can help you set up job alerts so you never miss relevant opportunities. You'll receive notifications when new positions matching your criteria are posted. Would you like to set up job alerts now?",
    quickReplies: [
      { id: 'daily-alerts', text: 'Daily Alerts', action: 'dailyAlerts' },
      { id: 'weekly-alerts', text: 'Weekly Digest', action: 'weeklyAlerts' },
      { id: 'custom-alerts', text: 'Custom Alerts', action: 'customAlerts' }
    ]
  };
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

function handleApplicationStatusQuery(): ProcessedResponse {
  return {
    message: "To check your application status, you can view your application dashboard on our website. For specific updates on applications, please provide the application ID or contact our support team.",
    quickReplies: [
      { id: 'track-application', text: 'Track Application', action: 'trackApplication' },
      { id: 'contact-support', text: 'Contact Support', action: 'contactSupport' },
      { id: 'help', text: 'Help', action: 'help' }
    ]
  };
}
