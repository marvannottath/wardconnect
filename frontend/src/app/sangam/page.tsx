'use client';

import React from 'react';
import Link from 'next/link';
import { Users, ArrowLeft, HeartHandshake, Shield, Sparkles, BookOpen } from 'lucide-react';

export default function SangamPage() {
  const sangams = [
    {
      title: 'Bala Sangam (Childhood & Student Forum)',
      age: 'Ages 6 - 17',
      focus: 'Reading circles, science workshops, coding basics, and moral values.',
      members: '85 Active Kids',
      color: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      title: 'Yuva Kootayma (Youth Empowerment Network)',
      age: 'Ages 18 - 35',
      focus: 'Skill development, competitive exam guidance, blood donation, & disaster response.',
      members: '140 Youth Volunteers',
      color: 'bg-purple-50 text-purple-900 border-purple-200',
    },
    {
      title: 'Kudumbashree & Vanitha Collective',
      age: 'Women Empowerment',
      focus: 'Micro-enterprises, self-employment, organic farming, & financial literacy.',
      members: '210 Members (12 NHGs)',
      color: 'bg-rose-50 text-rose-900 border-rose-200',
    },
    {
      title: 'Vayojana Sangam (Senior Citizens Council)',
      age: 'Ages 60+',
      focus: 'Weekly health checkups, experience sharing, storytelling & community wisdom.',
      members: '60 Elders',
      color: 'bg-amber-50 text-amber-900 border-amber-200',
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
          <Users className="w-6 h-6 text-purple-600" />
          <span>Vibhava Sangam & Age-Group Collectives</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">Human Resource Development & Age-Based Ward Empowerment</p>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 space-y-1">
        <h3 className="font-bold text-purple-900 text-sm">💡 Manava Vibhava Sheshi (Human Resource Hub)</h3>
        <p className="text-xs text-purple-800 leading-relaxed">
          വാർഡിലെ കുട്ടികൾ, യുവാക്കൾ, വനിതകൾ, മുതിർന്ന പൗരന്മാർ എന്നിവരുടെ സർഗ്ഗാത്മക ശേഷി വർദ്ധിപ്പിക്കാൻ വയസ്സിന്റെ അടിസ്ഥാനത്തിലുള്ള കൂട്ടായ്മകൾ.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sangams.map((s, idx) => (
          <div key={idx} className={`p-5 rounded-2xl border transition-all shadow-xs space-y-3 ${s.color}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/80 px-2.5 py-0.5 rounded-full border border-black/10">
                {s.age}
              </span>
              <span className="text-xs font-bold">{s.members}</span>
            </div>
            <h3 className="font-extrabold text-base leading-snug">{s.title}</h3>
            <p className="text-xs opacity-90 leading-relaxed">{s.focus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
