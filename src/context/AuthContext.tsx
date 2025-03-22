
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  AuthError
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Successfully signed in:", user.displayName);
      
      toast({
        title: "Welcome!",
        description: `You've successfully signed in${user.displayName ? `, ${user.displayName}` : ''}!`,
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      
      // Get more specific error message
      const authError = error as AuthError;
      let errorMessage = "There was a problem signing in. Please try again.";
      
      if (authError.code === 'auth/popup-closed-by-user') {
        errorMessage = "Sign-in was cancelled. Please try again.";
      } else if (authError.code === 'auth/popup-blocked') {
        errorMessage = "Sign-in popup was blocked. Please enable popups for this site.";
      } else if (authError.code === 'auth/api-key-not-valid') {
        errorMessage = "Authentication configuration error. Please contact support.";
      }
      
      toast({
        title: "Sign In Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast({
        title: "Signed Out",
        description: "You've been successfully signed out.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign Out Failed",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
