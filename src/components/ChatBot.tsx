
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import { QuickReply } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { 
  MessageCircle, X, Send, ChevronUp,
  User, Bot, Loader2, ArrowDown,
  SunMoon, FileUp, PanelLeft, Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChatToggle } from '@/hooks/use-chat-toggle';
import ResumeUploader from './ResumeUploader';
import { useResumeAnalyzer } from '@/hooks/use-resume-analyzer';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/hooks/use-toast';

const ChatBot: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);
  const { toast } = useToast();
  const { 
    messages, 
    isTyping, 
    quickReplies, 
    handleUserMessage,
    resetChat 
  } = useChat();
  
  const { 
    isOpen, 
    toggle, 
    isAnimating, 
    animationDirection,
    isDarkMode, 
    toggleDarkMode
  } = useChatToggle({
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
  
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldNotify = Math.random() > 0.7;
      if (shouldNotify && !isOpen) {
        setHasNotifications(true);
        toast({
          title: "New Job Alert",
          description: "New job positions matching your profile just posted!",
          duration: 4000,
        });
      }
    }, 45000);
    
    return () => clearInterval(interval);
  }, [isOpen, toast]);
  
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
      setHasNotifications(false);
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    let greeting = "Hello";
    
    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";
    else greeting = "Good evening";
    
    return `${greeting}!`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        onClick={() => {
          toggle();
          setHasNotifications(false);
        }}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-500 transform",
          isOpen ? "bg-red-500 hover:bg-red-600 rotate-90" : "bg-dhara-blue hover:bg-dhara-blue/90 rotate-0",
          isAnimating && !isOpen ? "animate-bounce" : "",
          hasNotifications && "ring-4 ring-amber-400 ring-opacity-75"
        )}
      >
        {isOpen ? <X size={24} /> : (
          <div className="relative flex items-center justify-center">
            <div className={cn(
              "absolute inset-0 flex items-center justify-center",
              "text-white transition-opacity duration-300",
              isAnimating ? "opacity-100" : "opacity-100"
            )}>
              <Bot size={20} />
            </div>
            {hasNotifications && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            )}
          </div>
        )}
      </Button>
      
      {(isOpen || isAnimating) && (
        <div 
          className={cn(
            "absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden border border-border",
            isDarkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white",
            isOpen && animationDirection === 'in' && !isAnimating ? "animate-in fade-in slide-in-from-bottom-5 duration-500" : "",
            isOpen && animationDirection === 'in' && isAnimating ? "animate-in fade-in slide-in-from-bottom-5 duration-500" : "",
            !isOpen && animationDirection === 'out' && isAnimating ? "animate-out fade-out slide-out-to-bottom-5 duration-500" : ""
          )}
          style={{ display: !isOpen && !isAnimating ? 'none' : 'block', transformOrigin: 'bottom right' }}
        >
          <div className={cn(
            "p-4 flex items-center justify-between",
            isDarkMode ? "bg-gray-800 text-white" : "bg-dhara-blue text-white"
          )}>
            <div className="flex items-center">
              <Avatar className={cn(
                "h-8 w-8 mr-2", 
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-dhara-blue"
              )}>
                <Bot size={16} />
              </Avatar>
              <div>
                <h3 className="font-medium">{getGreeting()}</h3>
                <p className="text-xs opacity-90">Recruitment Support</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  isDarkMode ? "text-white hover:bg-gray-700" : "text-white hover:bg-dhara-blue/90"
                )}
                onClick={toggleDarkMode}
              >
                <SunMoon size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggle} 
                className={cn(
                  isDarkMode ? "text-white hover:bg-gray-700" : "text-white hover:bg-dhara-blue/90"
                )}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
          
          <div 
            ref={messageContainerRef}
            className={cn(
              "h-80 overflow-y-auto p-4 flex flex-col gap-4",
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            )}
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "flex flex-col max-w-[85%]",
                  msg.role === "user" 
                    ? "self-end items-end animate-fade-in-left" 
                    : "self-start items-start animate-fade-in-right"
                )}
              >
                <div className="flex items-center mb-1">
                  {msg.role === "assistant" ? (
                    <Avatar className={cn(
                      "h-6 w-6 mr-1", 
                      isDarkMode ? "bg-gray-700" : "bg-dhara-blue text-white"
                    )}>
                      <Bot size={12} />
                    </Avatar>
                  ) : (
                    <Avatar className="h-6 w-6 mr-1 bg-gray-200">
                      <User size={12} />
                    </Avatar>
                  )}
                  <span className={cn(
                    "text-xs",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    {msg.role === "user" ? "You" : "Assistant"} • {formatMessageTime(msg.timestamp)}
                  </span>
                </div>
                <div 
                  className={cn(
                    "p-3 rounded-lg whitespace-pre-line",
                    msg.role === "user" 
                      ? "bg-dhara-blue text-white rounded-br-none" 
                      : isDarkMode 
                        ? "bg-gray-700 border-gray-600 rounded-bl-none"
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
                  <Avatar className={cn(
                    "h-6 w-6 mr-1",
                    isDarkMode ? "bg-gray-700" : "bg-dhara-blue text-white"
                  )}>
                    <Bot size={12} />
                  </Avatar>
                  <span className={cn(
                    "text-xs",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    Resume Analysis • {formatMessageTime(new Date())}
                  </span>
                </div>
                <div className={cn(
                  "rounded-lg rounded-bl-none p-3",
                  isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border border-gray-200"
                )}>
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
                    className={cn(
                      "mt-2 text-xs",
                      isDarkMode && "border-gray-600 hover:bg-gray-700"
                    )}
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
                  <span className={cn(
                    "text-xs",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>
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
              <div className={cn(
                "self-center w-full animate-fade-in p-3 border rounded-lg",
                isDarkMode 
                  ? "bg-gray-700 border-gray-600" 
                  : "bg-white border-accent"
              )}>
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
                <Avatar className={cn(
                  "h-6 w-6 mr-1",
                  isDarkMode ? "bg-gray-700" : "bg-dhara-blue text-white"
                )}>
                  <Bot size={12} />
                </Avatar>
                <div className={cn(
                  "p-3 rounded-lg rounded-bl-none",
                  isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border border-gray-200"
                )}>
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
            <div className={cn(
              "p-2 border-t flex flex-wrap gap-2 animate-fade-in",
              isDarkMode 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-gray-200"
            )}>
              {quickReplies.map((reply) => (
                <Button 
                  key={reply.id}
                  size="sm"
                  variant={isDarkMode ? "secondary" : "outline"}
                  className="text-xs h-8"
                  onClick={() => handleQuickReplyClick(reply)}
                >
                  {reply.text}
                </Button>
              ))}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={cn(
            "p-3 border-t flex gap-2",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <Input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className={cn(
                "flex-1 text-sm",
                isDarkMode && "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              )}
              disabled={showUploader}
            />
            <Button 
              type="button" 
              size="icon" 
              variant={isDarkMode ? "secondary" : "outline"}
              className={isDarkMode ? "" : "text-dhara-blue"}
              onClick={() => setShowUploader(prev => !prev)}
              title="Upload Resume"
            >
              <FileUp size={18} />
            </Button>
            <Button 
              type="submit" 
              size="icon" 
              disabled={!userInput.trim() || isTyping || showUploader}
              className={isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-dhara-blue hover:bg-dhara-blue/90"}
            >
              {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </Button>
          </form>
          
          {showScrollButton && (
            <Button
              size="icon"
              variant="outline"
              className={cn(
                "absolute bottom-20 right-3 h-8 w-8 rounded-full opacity-70 hover:opacity-100",
                isDarkMode && "bg-gray-700 border-gray-600"
              )}
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
