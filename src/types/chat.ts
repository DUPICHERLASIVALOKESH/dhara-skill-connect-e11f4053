export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface QuickReply {
  id: string;
  text: string;
  action?: 'findJobs' | 'postJob' | 'services' | 'resumeTips' | 'analyzeResume' | 'talkToRecruiter';
}

export interface ResumeAnalysisData {
  overallScore: number;
  keywordScore: number;
  formattingScore: number;
  missingKeywords: string[];
  improvementSuggestions: string[];
}
