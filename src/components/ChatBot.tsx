
import React, { useState, useRef, useEffect } from 'react';
import { useChat, QuickReply } from '@/context/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { 
  MessageCircle, X, Send, ChevronUp,
  User, Bot, Loader2, ArrowDown
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const { currentUser } = useAuth();
  const { 
    messages, 
    isTyping, 
    quickReplies, 
    handleUserMessage 
  } = useChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Scroll to the bottom when messages change or when typing starts/stops
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Detect scroll position to show/hide scroll button
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
    // Handle predefined actions
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
      default:
        handleUserMessage(reply.text);
    }
  };
  
  const formatMessageTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const toggleChat = () => {
    setIsOpen(prev => !prev);
    // If opening chat, scroll to bottom after a slight delay to ensure content is rendered
    if (!isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <Button 
        onClick={toggleChat}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg flex items-center justify-center",
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-dhara-blue hover:bg-dhara-blue/90"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
      
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden border border-border">
          {/* Chat Header */}
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
            <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-dhara-blue/90">
              <X size={18} />
            </Button>
          </div>
          
          {/* Messages Container */}
          <div 
            ref={messageContainerRef}
            className="h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "flex flex-col max-w-[85%]",
                  msg.role === "user" ? "self-end items-end" : "self-start items-start"
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
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="self-start flex items-center">
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
          
          {/* Quick Reply Buttons */}
          {quickReplies.length > 0 && (
            <div className="p-2 bg-white border-t border-gray-200 flex flex-wrap gap-2">
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
          
          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex gap-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1 text-sm"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!userInput.trim() || isTyping}
              className="bg-dhara-blue hover:bg-dhara-blue/90"
            >
              {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </Button>
          </form>
          
          {/* Scroll to bottom button */}
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
