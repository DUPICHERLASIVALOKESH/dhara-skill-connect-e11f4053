
export interface User {
  uid?: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

export interface QuickReply {
  id: string;
  text: string;
  action: string;
}

export interface ResumeAnalysisResult {
  overallScore: number;
  keywordOptimization: string[];
  formattingIssues: string[];
  missingSuggestions: string[];
  improvement: string;
}

export interface JobAlert {
  id: string;
  query: string;
  location?: string;
  frequency: 'daily' | 'weekly';
  email: string;
}
