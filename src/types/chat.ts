
export interface ChatMessage {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

export type MessageRole = 'user' | 'assistant';

export interface User {
  displayName: string | null;
  email: string | null;
  uid: string;
}

export interface QuickReply {
  id: string;
  text: string;
  action?: QuickReplyAction;
}

export type QuickReplyAction = 
  | 'findJobs'
  | 'postJob'
  | 'services'
  | 'resumeTips'
  | 'analyzeResume'
  | 'talkToRecruiter'
  | 'interviewPrep'
  | 'contactUs'
  | 'viewAllJobs'
  | 'filterJobs'
  | 'jobAlerts'
  | 'uploadResume'
  | 'resumeTemplates'
  | 'industryTips'
  | 'testATS'
  | 'atsInfo'
  | 'resumeFormats'
  | 'technicalInterviews'
  | 'behavioralInterviews'
  | 'remoteInterviews'
  | 'mockInterview'
  | 'salaryCalculator'
  | 'negotiationTips'
  | 'benefitsInfo'
  | 'callUs'
  | 'emailUs'
  | 'scheduleCall'
  | 'liveChat'
  | 'dailyAlerts'
  | 'weeklyAlerts'
  | 'customAlerts'
  | 'employerServices'
  | 'pricing'
  | 'speakToRecruiter'
  | 'jobSeekerServices'
  | 'testimonials'
  | 'signIn'
  | 'createAccount'
  | 'help'
  | 'applicationDetails1'
  | 'applicationDetails2'
  | 'viewAllApplications'
  | 'showResumeDetails'
  | 'improveTips'
  | 'findMatchingJobs';

export interface ResumeAnalysisData {
  overallScore: number;
  keywordScore: number;
  formattingScore: number;
  missingKeywords: string[];
  improvementSuggestions: string[];
}

export interface ResumeAnalysisResult {
  overallScore: number;
  keywordOptimization: string[];
  formattingIssues: string[];
  missingSuggestions: string[];
  improvement: string;
  improvements?: string[]; // For compatibility with both naming conventions
}

export interface JobAlert {
  id: string;
  query: string;
  location?: string;
  frequency: 'daily' | 'weekly';
  email: string;
}
