'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, ShieldCheck, ArrowLeft, Calendar, AlertCircle } from 'lucide-react';

export default function CleaningPage() {
  const schedule = [
    { type: 'Plastic & Non-biodegradable Waste', day: '1st & 3rd Tuesday', fee: '₹50/month' },
    { type: 'Glass & Electronic Waste', day: 'Last Saturday of Month', fee: 'Free Collection' },
    { type: 'Organic Compost Pick-up', day: 'Every Thursday', fee: 'Kudumbashree Service' },
  ];

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
          <Trash2 className="w-6 h-6 text-emerald-600" />
          <span>Clean Ward & Haritha Karma Sena Desk</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">Waste Pick-up Schedules, Plastic Reporting & Sanitation Drives</p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-2">
        <div className="flex items-center space-x-2 font-bold text-emerald-900 text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Haritha Karma Sena Doorstep Pickup Active</span>
        </div>
        <p className="text-xs text-emerald-800 leading-relaxed">
          Ward 22 Haritha Karma Sena members collect segregated inorganic waste directly from households. Please keep plastic items clean and dry.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="font-bold text-sm text-slate-800 uppercase tracking-wider">Collection Timetable</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {schedule.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-2">
              <div className="flex items-center space-x-1.5 text-emerald-700 text-xs font-bold">
                <Calendar className="w-4 h-4" />
                <span>{item.day}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{item.type}</h3>
              <span className="text-[10px] font-extrabold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full inline-block">
                {item.fee}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
