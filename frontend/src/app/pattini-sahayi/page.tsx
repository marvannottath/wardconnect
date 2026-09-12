'use client';

import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, Send, Lock } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api } from '@/lib/api';

export default function PattiniSahayiPage() {
  const { activeWard, userProfile, setIsAuthModalOpen } = useWard();
  const [details, setDetails] = useState('');
  const [contactPhone, setContactPhone] = useState('');
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
        is_secret_hunger_report: true,
        title: 'CONFIDENTIAL: Distress & Hunger Assistance Request',
        category: 'Pattini Sahayi Distress Help',
        description: `Confidential distress report: ${details}. Contact phone: ${contactPhone || userProfile.phone}`,
        assigned_department: 'Panchayath Office',
        status: 'submitted',
      });
      setMessage('Confidential report submitted safely. The Ward Member & Volunteer team will reach out discreetly.');
      setDetails('');
      setContactPhone('');
    } catch (err: any) {
      setMessage('Error submitting request: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
          <HeartHandshake className="w-6 h-6 text-rose-600" />
          <span>Pattini Sahayi & Distress Desk</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">Secret & Confidential Assistance for Ward Families in Hardship</p>
      </div>

      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-2">
        <div className="flex items-center space-x-2 text-rose-900 font-bold text-sm">
          <Lock className="w-4 h-4 text-rose-600" />
          <span>Strictly Private & Confidential</span>
        </div>
        <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">
          If you or any neighboring family in Ward {activeWard?.ward_number} is facing severe food insecurity, medical emergency, or extreme hardship, submit details here. 
          <strong>This report is NOT published on the public board.</strong> Only your Ward Member and authorized Relief Team will receive this alert to provide food kits or emergency aid discreetly.
        </p>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-900 font-bold">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Discreet Details / House Location</label>
          <textarea
            rows={4}
            placeholder="Describe the situation or location landmark (e.g., Family near Trippanachi East in need of urgent grocery kit or medicine)..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Contact Mobile Number (Optional)</label>
          <input
            type="tel"
            placeholder="Discreet contact number for volunteer follow-up"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>{submitting ? 'Submitting Confidential Alert...' : 'Submit Secret Alert to Ward Member'}</span>
        </button>
      </form>
    </div>
  );
}
