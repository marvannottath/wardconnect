'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogIn, Bell, ShieldAlert, CheckCircle, X } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api } from '@/lib/api';
import { WardConnectLogo } from '@/components/WardConnectLogo';

export const WardHeader: React.FC = () => {
  const { activeWard, userProfile, setIsAuthModalOpen, setIsProfileModalOpen } = useWard();
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; desc: string; type: 'alert' | 'update' | 'chat'; time: string; read: boolean }>>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  useEffect(() => {
    if (activeWard) {
      loadNotifications(activeWard.id);
    }
  }, [activeWard]);

  const loadNotifications = async (wardId: string) => {
    try {
      const broadcasts = await api.getBroadcasts(wardId);
      const items = broadcasts.map((b) => ({
        id: b.id,
        title: b.title,
        desc: b.content,
        type: b.severity === 'critical' ? ('alert' as const) : ('update' as const),
        time: 'Just now',
        read: false,
      }));

      // Add default ward welcome notice
      items.push({
        id: 'welcome-notif',
        title: 'WardConnect Portal Active',
        desc: 'Ward 22 South Trippanachi digital grievance and emergency support desk is online.',
        type: 'update',
        time: '1h ago',
        read: true,
      });

      setNotifications(items);
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Logo with Connect in Emerald Color */}
        <Link href="/" className="flex items-center space-x-2.5">
          <WardConnectLogo size={36} />
          <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
            Ward<span className="text-emerald-600">Connect</span>
          </span>
        </Link>

        {/* Right: Notification Bell & User Profile Avatar */}
        <div className="flex items-center space-x-3">
          {/* Notification Bell Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center relative transition-colors border border-slate-200"
              title="Ward Notifications"
            >
              <Bell className="w-5 h-5 text-slate-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white font-extrabold text-[10px] flex items-center justify-center border-2 border-white shadow-xs animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-extrabold text-sm text-slate-900">Ward Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-[11px] font-bold text-emerald-700 hover:underline"
                      >
                        Mark read
                      </button>
                    )}
                    <button
                      onClick={() => setIsNotifOpen(false)}
                      className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">No notifications yet.</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 rounded-2xl border transition-all text-left ${
                          !n.read
                            ? 'bg-emerald-50/60 border-emerald-200 text-slate-900'
                            : 'bg-slate-50 border-slate-200/80 text-slate-600'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-1.5">
                            {n.type === 'alert' ? (
                              <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0" />
                            ) : (
                              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            )}
                            <h4 className="font-bold text-xs leading-snug">{n.title}</h4>
                          </div>
                          <span className="text-[10px] text-slate-400 font-semibold">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{n.desc}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar / Sign In Button */}
          {userProfile ? (
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200/80 transition-colors py-1.5 px-3 rounded-full border border-slate-200 shadow-2xs cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                {userProfile.full_name?.charAt(0) || 'U'}
              </div>
              <span className="text-xs font-bold text-slate-800">
                {userProfile.full_name}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center space-x-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
