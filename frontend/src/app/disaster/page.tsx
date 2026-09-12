'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, PhoneCall, ArrowLeft, Waves, MapPin } from 'lucide-react';

export default function DisasterPage() {
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
          <ShieldAlert className="w-6 h-6 text-rose-600" />
          <span>Disaster Management & Flood Relief Desk</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">Live River Level Monitoring, Relief Camps & Emergency Taskforce</p>
      </div>

      <div className="bg-rose-600 text-white rounded-3xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full text-xs font-extrabold uppercase">
            <Waves className="w-4 h-4 text-white" />
            <span>Live Trippanachi Canal Monitor</span>
          </div>
          <span className="text-xs font-bold bg-white text-rose-900 px-2.5 py-0.5 rounded-full">Normal Level</span>
        </div>
        <h2 className="text-xl font-extrabold">Water Level: 2.1 Meters (Safe Operating Zone)</h2>
        <p className="text-xs text-rose-100 leading-relaxed">
          No immediate flood threat for South Trippanachi low-lying residential sectors. Volunteer taskforce remains on standby.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>Designated Relief Camps</span>
          </h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="p-2.5 bg-slate-50 rounded-xl font-semibold">1. Trippanachi AMLP School (Capacity: 300)</li>
            <li className="p-2.5 bg-slate-50 rounded-xl font-semibold">2. Pulpatta Grama Panchayath Hall (Capacity: 250)</li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
            <PhoneCall className="w-5 h-5 text-rose-600" />
            <span>Emergency Taskforce Direct Dial</span>
          </h3>
          <div className="space-y-2">
            <a href="tel:9847111222" className="block p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-900 hover:bg-rose-100">
              📞 Whiteguard Emergency Rescue: 9847111222
            </a>
            <a href="tel:9447001122" className="block p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-blue-900 hover:bg-blue-100">
              📞 KMCC Rescue & Ambulance Desk: 9447001122
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
