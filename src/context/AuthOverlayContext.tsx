
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthOverlayContextType {
  isAuthOverlayOpen: boolean;
  openAuthOverlay: (authMode?: 'signin' | 'signup') => void;
  closeAuthOverlay: () => void;
  authMode?: 'signin' | 'signup';
}

const AuthOverlayContext = createContext<AuthOverlayContextType | undefined>(undefined);

export const AuthOverlayProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthOverlayOpen, setIsAuthOverlayOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | undefined>(undefined);

  const openAuthOverlay = (mode?: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOverlayOpen(true);
  };

  const closeAuthOverlay = () => {
    setIsAuthOverlayOpen(false);
    // Reset authMode when closing
    setTimeout(() => {
      setAuthMode(undefined);
    }, 300); // Wait for the close animation to finish
  };

  return (
    <AuthOverlayContext.Provider value={{
      isAuthOverlayOpen,
      openAuthOverlay,
      closeAuthOverlay,
      authMode
    }}>
      {children}
    </AuthOverlayContext.Provider>
  );
};

export const useAuthOverlay = () => {
  const context = useContext(AuthOverlayContext);
  if (context === undefined) {
    throw new Error('useAuthOverlay must be used within an AuthOverlayProvider');
  }
  return context;
};
