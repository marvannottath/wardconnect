'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, ThumbsUp, ArrowLeft, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { useWard } from '@/context/WardContext';

export default function GramasabhaPage() {
  const { userProfile, setIsAuthModalOpen } = useWard();
  const [votedId, setVotedId] = useState<number | null>(null);

  const proposals = [
    {
      id: 1,
      title: 'Trippanachi Canal Solar Streetlight Installation',
      desc: 'Proposal to install 15 LED solar lights along the canal road for night safety.',
      votes: 142,
      dept: 'PWD & Panchayath Energy Fund',
      date: 'Next Gramasabha: Aug 28',
    },
    {
      id: 2,
      title: 'South Trippanachi Agricultural Water Storage Pond Repair',
      desc: 'Renovation of public pond for local farmers and irrigation during summer.',
      votes: 98,
      dept: 'Irrigation & Krishi Bhavan',
      date: 'Next Gramasabha: Aug 28',
    },
  ];

  const handleVote = (id: number) => {
    if (!userProfile) {
      setIsAuthModalOpen(true);
      return;
    }
    setVotedId(id);
  };

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
          <Users className="w-6 h-6 text-emerald-600" />
          <span>Digital Gramasabha & Voting Desk</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">Citizen Democracy, Proposals & Local Ward Development Voting</p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-2">
        <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>Upcoming Gramasabha Notice: August 28, 2:30 PM (Trippanachi Community Hall)</span>
        </div>
        <p className="text-xs text-emerald-800 leading-relaxed">
          Cast your digital opinion vote on upcoming ward development proposals prior to the official Gramasabha meeting.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-sm text-slate-800 uppercase tracking-wider">Active Gramasabha Proposals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proposals.map((p) => {
            const hasVoted = votedId === p.id;
            return (
              <div key={p.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{p.dept}</span>
                  <h3 className="font-bold text-base text-slate-900 leading-snug">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-700">
                    {hasVoted ? p.votes + 1 : p.votes} Citizen Votes
                  </span>

                  <button
                    onClick={() => handleVote(p.id)}
                    disabled={hasVoted}
                    className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      hasVoted
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    {hasVoted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Vote Recorded</span>
                      </>
                    ) : (
                      <>
                        <ThumbsUp className="w-4 h-4" />
                        <span>Vote Support</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
