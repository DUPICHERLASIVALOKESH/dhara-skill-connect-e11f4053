
import { useState, useEffect } from 'react';

interface UseChatToggleOptions {
  onOpen?: () => void;
  onClose?: () => void;
}

export function useChatToggle({ onOpen, onClose }: UseChatToggleOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  // Close chat on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Method to explicitly close the chat
  const closeChat = () => {
    if (isOpen) {
      setIsOpen(false);
      onClose?.();
    }
  };

  return {
    isOpen,
    setIsOpen,
    toggle,
    closeChat
  };
}
