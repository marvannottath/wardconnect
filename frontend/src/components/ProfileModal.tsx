'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Phone, MapPin, Download, LogOut, ShieldCheck, Key, LayoutDashboard } from 'lucide-react';
import { useWard } from '@/context/WardContext';

export const ProfileModal: React.FC = () => {
  const { isProfileModalOpen, setIsProfileModalOpen, userProfile, setUserProfile, activeWard, installPWA, deferredPwaPrompt } = useWard();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(userProfile?.full_name || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  if (!isProfileModalOpen || !userProfile) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({
      ...userProfile,
      full_name: fullName,
    });
    setMessage('Profile details updated successfully!');
    setIsEditing(false);
  };

  const handleSignOut = () => {
    setUserProfile(null);
    setIsProfileModalOpen(false);
  };

  const isAdminOrVolunteer = userProfile.role === 'ward_admin' || userProfile.role === 'volunteer' || userProfile.role === 'super_admin';

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-base">
              {userProfile.full_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">{userProfile.full_name}</h3>
              <p className="text-xs text-slate-500 capitalize">{userProfile.role.replace('_', ' ')} Profile</p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {message && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium">
            {message}
          </div>
        )}

        {/* PWA Download App Button */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 text-white flex items-center justify-between shadow-md">
          <div>
            <span className="font-bold text-sm block">WardConnect App</span>
            <p className="text-xs text-emerald-100 opacity-90">Install on phone or desktop for instant access</p>
          </div>
          <button
            onClick={installPWA}
            className="flex items-center space-x-1.5 py-2 px-3 bg-white text-emerald-800 rounded-xl font-bold text-xs shadow-sm hover:bg-emerald-50 transition-colors whitespace-nowrap"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            <span>Install App</span>
          </button>
        </div>

        {/* Web Admin Dashboard Link (For Admins / Volunteers) */}
        {isAdminOrVolunteer && (
          <Link
            href="/admin-dashboard"
            onClick={() => setIsProfileModalOpen(false)}
            className="w-full flex items-center justify-between p-3.5 bg-slate-900 text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>Ward Web Admin Dashboard</span>
            </div>
            <span className="text-[10px] uppercase font-bold bg-emerald-600 px-2 py-0.5 rounded text-white">Admin</span>
          </Link>
        )}

        {/* Profile Info Details / Edit Form */}
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">New Password (Optional)</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-semibold text-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Mobile Phone:</span>
                <span className="font-bold text-slate-800">{userProfile.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Active Ward:</span>
                <span className="font-bold text-slate-800">
                  {activeWard ? `Ward ${activeWard.ward_number} (${activeWard.ward_name})` : 'Default'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors text-xs font-bold text-center"
            >
              Edit Profile & Password
            </button>
          </div>
        )}

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors text-xs font-bold"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out / Switch Resident</span>
        </button>
      </div>
    </div>
  );
};
