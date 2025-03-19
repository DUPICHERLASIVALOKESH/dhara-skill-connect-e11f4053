import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import { QuickReply } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { 
  MessageCircle, X, Send, ChevronUp,
  User, Bot, Loader2, ArrowDown,
  SunMoon, FileUp, PanelLeft
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { useChatToggle } from '@/hooks/use-chat-toggle';
import ResumeUploader from './ResumeUploader';
import { useResumeAnalyzer } from '@/hooks/use-resume-analyzer';

const ChatBot: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const { currentUser } = useAuth();
  const { 
    messages, 
    isTyping, 
    quickReplies, 
    handleUserMessage,
    resetChat 
  } = useChat();
  
  const { isOpen, toggle } = useChatToggle({
    onOpen: () => {
      resetChat();
    },
    onClose: () => {
      resetChat();
      setShowUploader(false);
      setUserInput('');
    }
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const {
    analyzeResume,
    resetAnalysis,
    isAnalyzing,
    result: resumeAnalysis,
    error: resumeError
  } = useResumeAnalyzer();

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (!messageContainerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
      setShowScrollButton(isScrolledUp);
    };
    
    const container = messageContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    handleUserMessage(userInput);
    setUserInput('');
  };
  
  const handleQuickReplyClick = (reply: QuickReply) => {
    switch (reply.action) {
      case 'findJobs':
        handleUserMessage("I'm looking for job opportunities");
        break;
      case 'postJob':
        handleUserMessage("I need to post a job");
        break;
      case 'services':
        handleUserMessage("What services do you provide?");
        break;
      case 'resumeTips':
        handleUserMessage("Can you give me resume tips?");
        break;
      case 'analyzeResume':
        setShowUploader(true);
        break;
      case 'talkToRecruiter':
        handleUserMessage("I'd like to speak with a recruiter");
        break;
      default:
        handleUserMessage(reply.text);
    }
  };
  
  const formatMessageTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleFileUpload = (file: File) => {
    setShowUploader(false);
    handleUserMessage(`I'd like to analyze my resume: ${file.name}`);
    analyzeResume(file).then(() => {
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        onClick={toggle}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform",
          isOpen ? "bg-red-500 hover:bg-red-600 rotate-90" : "bg-dhara-blue hover:bg-dhara-blue/90 rotate-0"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
      
      {isOpen && (
        <div 
          className={cn(
            "absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden border border-border",
            "animate-fade-in"
          )}
        >
          <div className="bg-dhara-blue text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2 bg-white text-dhara-blue">
                <Bot size={16} />
              </Avatar>
              <div>
                <h3 className="font-medium">DHARA Assistant</h3>
                <p className="text-xs opacity-90">Recruitment Support</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="text-white hover:bg-dhara-blue/90">
                <SunMoon size={16} />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggle} className="text-white hover:bg-dhara-blue/90">
                <X size={16} />
              </Button>
            </div>
          </div>
          
          <div 
            ref={messageContainerRef}
            className="h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "flex flex-col max-w-[85%]",
                  msg.role === "user" ? "self-end items-end animate-fade-in-left" : "self-start items-start animate-fade-in-right"
                )}
              >
                <div className="flex items-center mb-1">
                  {msg.role === "assistant" ? (
                    <Avatar className="h-6 w-6 mr-1 bg-dhara-blue text-white">
                      <Bot size={12} />
                    </Avatar>
                  ) : (
                    <Avatar className="h-6 w-6 mr-1 bg-gray-200">
                      <User size={12} />
                    </Avatar>
                  )}
                  <span className="text-xs text-gray-500">
                    {msg.role === "user" ? (currentUser?.displayName || "You") : "Assistant"} • {formatMessageTime(msg.timestamp)}
                  </span>
                </div>
                <div 
                  className={cn(
                    "p-3 rounded-lg whitespace-pre-line",
                    msg.role === "user" 
                      ? "bg-dhara-blue text-white rounded-br-none" 
                      : "bg-white border border-gray-200 rounded-bl-none"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            
            {resumeAnalysis && (
              <div className="self-start animate-fade-in-right w-full max-w-[90%]">
                <div className="flex items-center mb-1">
                  <Avatar className="h-6 w-6 mr-1 bg-dhara-blue text-white">
                    <Bot size={12} />
                  </Avatar>
                  <span className="text-xs text-gray-500">
                    Resume Analysis • {formatMessageTime(new Date())}
                  </span>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3">
                  <h4 className="font-medium mb-2">Resume Analysis Results</h4>
                  <div className="mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Overall Score</span>
                      <span className={cn(
                        "text-sm font-bold",
                        resumeAnalysis.overallScore >= 80 ? "text-green-500" : 
                        resumeAnalysis.overallScore >= 60 ? "text-amber-500" : "text-red-500"
                      )}>
                        {resumeAnalysis.overallScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                      <div 
                        className={cn(
                          "h-2 rounded-full",
                          resumeAnalysis.overallScore >= 80 ? "bg-green-500" : 
                          resumeAnalysis.overallScore >= 60 ? "bg-amber-500" : "bg-red-500"
                        )}
                        style={{ width: `${resumeAnalysis.overallScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Top Improvements:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {resumeAnalysis.improvements.slice(0, 3).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 text-xs"
                    onClick={() => resetAnalysis()}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            )}
            
            {resumeError && (
              <div className="self-start animate-fade-in-right max-w-[90%]">
                <div className="flex items-center mb-1">
                  <Avatar className="h-6 w-6 mr-1 bg-red-500 text-white">
                    <Bot size={12} />
                  </Avatar>
                  <span className="text-xs text-gray-500">
                    Error • {formatMessageTime(new Date())}
                  </span>
                </div>
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg rounded-bl-none p-3">
                  <p className="text-sm">{resumeError}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 text-xs border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => resetAnalysis()}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            )}
            
            {showUploader && (
              <div className="self-center w-full animate-fade-in p-3 bg-white border border-accent rounded-lg">
                <h4 className="text-sm font-medium mb-2">Upload Your Resume</h4>
                <ResumeUploader onFileAccepted={handleFileUpload} />
                <div className="flex justify-end mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setShowUploader(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            
            {isTyping && (
              <div className="self-start flex items-center animate-fade-in">
                <Avatar className="h-6 w-6 mr-1 bg-dhara-blue text-white">
                  <Bot size={12} />
                </Avatar>
                <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '100ms'}}></div>
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {quickReplies.length > 0 && !showUploader && (
            <div className="p-2 bg-white border-t border-gray-200 flex flex-wrap gap-2 animate-fade-in">
              {quickReplies.map((reply) => (
                <Button 
                  key={reply.id}
                  size="sm"
                  variant="outline"
                  className="text-xs h-8"
                  onClick={() => handleQuickReplyClick(reply)}
                >
                  {reply.text}
                </Button>
              ))}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex gap-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1 text-sm"
              disabled={showUploader}
            />
            <Button 
              type="button" 
              size="icon" 
              variant="outline"
              className="text-dhara-blue"
              onClick={() => setShowUploader(prev => !prev)}
              title="Upload Resume"
            >
              <FileUp size={18} />
            </Button>
            <Button 
              type="submit" 
              size="icon" 
              disabled={!userInput.trim() || isTyping || showUploader}
              className="bg-dhara-blue hover:bg-dhara-blue/90"
            >
              {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </Button>
          </form>
          
          {showScrollButton && (
            <Button
              size="icon"
              variant="outline"
              className="absolute bottom-20 right-3 h-8 w-8 rounded-full opacity-70 hover:opacity-100"
              onClick={scrollToBottom}
            >
              <ArrowDown size={16} />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
