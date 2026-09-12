'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, Heart, ArrowLeft, Calendar, Users, MapPin } from 'lucide-react';

export default function FitnessPage() {
  const events = [
    {
      id: 1,
      title: 'South Trippanachi Morning Walk Circle',
      time: 'Daily 6:00 AM - 7:00 AM',
      location: 'Trippanachi Canal Road Walkway',
      lead: 'Dr. Suresh & Ward Health Club',
      desc: 'Join 40+ ward residents for morning jogging, stretching, and brisk walk circles.',
    },
    {
      id: 2,
      title: 'Sunday Open Yoga & Breathing Session',
      time: 'Sundays 6:30 AM',
      location: 'Community Hall Grounds',
      lead: 'Yoga Master Rajesh',
      desc: 'Free weekly pranayama and wellness session for all age groups.',
    },
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
          <Activity className="w-6 h-6 text-emerald-600" />
          <span>Arogya Veedhi Fitness & Health Club</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">Community Morning Walks, Yoga Circles & Health Tracking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {ev.time}
                </span>
                <Heart className="w-4 h-4 text-rose-500" />
              </div>
              <h3 className="font-bold text-base text-slate-900">{ev.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ev.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-500 font-medium">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{ev.location}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Lead: {ev.lead}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
