
import { useState, useEffect } from 'react';

interface UseChatToggleOptions {
  onOpen?: () => void;
  onClose?: () => void;
}

export function useChatToggle({ onOpen, onClose }: UseChatToggleOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('chatDarkMode') === 'true';
  });

  const toggle = () => {
    setIsAnimating(true);
    const newState = !isOpen;
    
    if (newState) {
      setIsOpen(true);
      onOpen?.();
    } else {
      // Delay actual closing to allow for exit animation
      setTimeout(() => {
        setIsOpen(false);
        onClose?.();
      }, 300);
    }
  };

  // Close chat on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        toggle();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle animation end
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('chatDarkMode', String(newMode));
  };

  // Method to explicitly close the chat
  const closeChat = () => {
    if (isOpen) {
      toggle();
    }
  };

  return {
    isOpen,
    setIsOpen,
    toggle,
    closeChat,
    isAnimating,
    isDarkMode,
    toggleDarkMode
  };
}
