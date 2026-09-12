'use client';

import React, { useState } from 'react';
import { User, Phone, Lock, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api } from '@/lib/api';
import { WardConnectLogo } from '@/components/WardConnectLogo';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, activeWard, setUserProfile } = useWard();
  const [isRegisterTab, setIsRegisterTab] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const demoAccounts = [
    { label: '👑 Super Admin', phone: '9000000001', pw: 'admin123' },
    { label: '🏢 Ward Admin', phone: '9000000002', pw: 'admin123' },
    { label: '🏛️ Ward Member', phone: '9000000003', pw: 'member123' },
    { label: '🤝 Volunteer', phone: '9000000004', pw: 'volunteer123' },
    { label: '👤 Resident', phone: '9207802002', pw: 'user123' },
  ];

  const fillDemo = (accPhone: string, accPw: string) => {
    setIsRegisterTab(false);
    setPhone(accPhone);
    setPassword(accPw);
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!phone) {
      setErrorMsg('Please enter your mobile number');
      return;
    }
    setLoading(true);

    try {
      if (isRegisterTab) {
        if (!fullName) {
          setErrorMsg('Please enter your full name');
          setLoading(false);
          return;
        }
        // Self-registration defaults to public resident role
        const res = await api.register(phone, fullName, password, activeWard?.id, 'public');
        setUserProfile(res.profile);
        setIsAuthModalOpen(false);
      } else {
        const res = await api.login(phone, password);
        setUserProfile(res.profile);
        setIsAuthModalOpen(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
        >
          ✕
        </button>

        {/* Header - Clean English Only */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <WardConnectLogo size={42} />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {isRegisterTab ? 'Resident Registration' : 'Sign In'}
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-2xl my-4">
          <button
            type="button"
            onClick={() => { setIsRegisterTab(false); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              !isRegisterTab ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsRegisterTab(true); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              isRegisterTab ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Register Account
          </button>
        </div>

        {/* Demo Roles Quick-Fill Buttons */}
        {!isRegisterTab && (
          <div className="mb-4 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-extrabold text-slate-700">
              <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
              <span>Select Demo Role to Quick-Sign In:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.phone}
                  type="button"
                  onClick={() => fillDemo(acc.phone, acc.pw)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-800 hover:bg-emerald-50 hover:border-emerald-300 transition-colors shadow-2xs"
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterTab && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="e.g. Muhammed Shafi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                  required={isRegisterTab}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                placeholder="Set secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Processing...' : isRegisterTab ? 'Complete Registration' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
