'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, PhoneCall, Sparkles, Send, ArrowLeft } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api } from '@/lib/api';

export default function KoodeDeskPage() {
  const { activeWard, userProfile, setIsAuthModalOpen } = useWard();
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeWard) return;
    if (!userProfile) {
      setIsAuthModalOpen(true);
      return;
    }
    setSubmitting(true);
    try {
      await api.createGrievance({
        ward: activeWard.id,
        user: userProfile.id,
        is_anonymous: true,
        title: 'KOODE: Request for Confidential Counseling & Mental Wellness Talk',
        category: 'Koode Mental Wellness Desk',
        description: `Emotional wellness request: ${details}`,
        assigned_department: 'Health & Haritha Karma',
        status: 'submitted',
      });
      setMessage('Counseling talk request received! A friendly certified counselor will connect with you confidentially.');
      setDetails('');
    } catch (err: any) {
      setMessage('Error submitting request: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Inline Back Link for Clean UX */}
      <Link
        href="/"
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Ward Dashboard</span>
      </Link>

      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
          <Heart className="w-6 h-6 text-purple-600" />
          <span>Koode (കൂടെ) Emotional Support Desk</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">Mental Wellness, Confidential Counseling & Friendly Helpline</p>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 space-y-2">
        <div className="flex items-center space-x-2 text-purple-900 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>You Are Not Alone • Friendly Talk & Counseling</span>
        </div>
        <p className="text-xs sm:text-sm text-purple-800 leading-relaxed">
          If you are feeling mentally overwhelmed, stressed, or going through emotional hardship, <strong>Koode Desk</strong> is here to support you. Request a confidential phone call or chat with a empathetic listener/counselor.
        </p>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-900 font-bold">
          {message}
        </div>
      )}

      {/* Emergency Tele-Counseling Direct Helpline */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-slate-900">DISHA Tele-Counseling Helpline (Kerala Health Dept)</h3>
          <p className="text-xs text-slate-500 mt-0.5">24x7 Free & Confidential Mental Health Toll-Free Line</p>
        </div>
        <a
          href="tel:1056"
          className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs whitespace-nowrap"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call DISHA (1056)</span>
        </a>
      </div>

      {/* Ward Counselor Callback Request Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
        <h3 className="font-bold text-base text-slate-900">Request Confidential Ward Counselor Callback</h3>
        
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">How can we support you?</label>
          <textarea
            rows={4}
            placeholder="Share what is troubling you or convenient time for a friendly phone call..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>{submitting ? 'Submitting...' : 'Request Confidential Callback'}</span>
        </button>
      </form>
    </div>
  );
}
