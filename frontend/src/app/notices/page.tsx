'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, ShieldAlert, AlertTriangle, Info, ArrowLeft, Clock } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api, EmergencyBroadcast } from '@/lib/api';

export default function AllNoticesPage() {
  const { activeWard } = useWard();
  const [broadcasts, setBroadcasts] = useState<EmergencyBroadcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSeverity, setFilterSeverity] = useState('All');

  useEffect(() => {
    if (activeWard) {
      loadNotices(activeWard.id);
    }
  }, [activeWard]);

  const loadNotices = async (wardId: string) => {
    setLoading(true);
    try {
      const data = await api.getBroadcasts(wardId);
      setBroadcasts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = broadcasts.filter(
    (b) => filterSeverity === 'All' || b.severity.toLowerCase() === filterSeverity.toLowerCase()
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Ward Dashboard</span>
      </Link>

      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
          <Bell className="w-6 h-6 text-rose-600" />
          <span>All Ward Notices & Emergency Broadcasts</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">Official Ward 22 South Trippanachi Alerts & Announcements</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2">
        {['All', 'Critical', 'Alert', 'Info'].map((sev) => (
          <button
            key={sev}
            onClick={() => setFilterSeverity(sev)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterSeverity === sev
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* Full Width Stacked Notices */}
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading ward notices...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
          No notices found matching selected filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => {
            const isCritical = b.severity === 'critical';
            const isAlert = b.severity === 'alert';
            return (
              <div
                key={b.id}
                className={`p-6 rounded-3xl border transition-all shadow-xs ${
                  isCritical
                    ? 'bg-rose-600 text-white border-rose-700 shadow-md'
                    : isAlert
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-blue-50 border-blue-200 text-blue-900'
                }`}
              >
                <div className="flex items-start space-x-4">
                  {isCritical ? (
                    <ShieldAlert className="w-6 h-6 text-white flex-shrink-0 mt-0.5 animate-pulse" />
                  ) : isAlert ? (
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="font-extrabold text-base sm:text-lg capitalize leading-snug">{b.title}</h2>
                      <span className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${isCritical ? 'bg-white text-rose-900 shadow-xs' : 'bg-white/70'}`}>
                        {b.severity}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-95">{b.content}</p>

                    <div className="pt-2 flex items-center space-x-2 text-xs opacity-75 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(b.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
