'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ward, Profile, api } from '@/lib/api';

interface WardContextType {
  activeWard: Ward | null;
  wardsList: Ward[];
  userProfile: Profile | null;
  isLoading: boolean;
  setActiveWard: (ward: Ward) => void;
  setUserProfile: (profile: Profile | null) => void;
  fetchWards: () => Promise<void>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  deferredPwaPrompt: any;
  installPWA: () => void;
}

const WardContext = createContext<WardContextType | undefined>(undefined);

export const WardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeWard, setActiveWardState] = useState<Ward | null>(null);
  const [wardsList, setWardsList] = useState<Ward[]>([]);
  const [userProfile, setUserProfileState] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [deferredPwaPrompt, setDeferredPwaPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPwaPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const installPWA = () => {
    if (deferredPwaPrompt) {
      deferredPwaPrompt.prompt();
      deferredPwaPrompt.userChoice.then(() => {
        setDeferredPwaPrompt(null);
      });
    } else {
      alert('To install WardConnect App: Open browser menu (⋮ or Share) and select "Add to Home Screen" or "Install App".');
    }
  };

  const fetchWards = async () => {
    try {
      setIsLoading(true);
      const data = await api.getWards();
      setWardsList(data);
      if (data.length > 0) {
        const savedWardId = typeof window !== 'undefined' ? localStorage.getItem('wardconnect_ward_id') : null;
        const foundSaved = data.find((w) => w.id === savedWardId);
        // Default to Pulpatta Grama Panchayath (South Trippanachi Ward 22)
        const pulpattaWard22 = data.find((w) => (w.local_body.includes('Pulpatta') || w.ward_name.includes('Trippanachi')) && w.ward_number === 22);
        const pulpattaWardAny = data.find((w) => w.local_body.includes('Pulpatta') || w.ward_name.includes('Trippanachi'));
        setActiveWardState(foundSaved || pulpattaWard22 || pulpattaWardAny || data[0]);
      }
    } catch (err) {
      console.error('Failed to load wards list:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWards();

    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('wardconnect_profile');
      if (savedProfile) {
        try {
          setUserProfileState(JSON.parse(savedProfile));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const setActiveWard = (ward: Ward) => {
    setActiveWardState(ward);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wardconnect_ward_id', ward.id);
    }
  };

  const setUserProfile = (profile: Profile | null) => {
    setUserProfileState(profile);
    if (typeof window !== 'undefined') {
      if (profile) {
        localStorage.setItem('wardconnect_profile', JSON.stringify(profile));
      } else {
        localStorage.removeItem('wardconnect_profile');
      }
    }
  };

  return (
    <WardContext.Provider
      value={{
        activeWard,
        wardsList,
        userProfile,
        isLoading,
        setActiveWard,
        setUserProfile,
        fetchWards,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        deferredPwaPrompt,
        installPWA,
      }}
    >
      {children}
    </WardContext.Provider>
  );
};

export const useWard = () => {
  const context = useContext(WardContext);
  if (!context) {
    throw new Error('useWard must be used within a WardProvider');
  }
  return context;
};
