'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy, ArrowLeft, Dribbble, Music, MapPin, Users } from 'lucide-react';

export default function ClubsPage() {
  const clubs = [
    {
      name: 'South Trippanachi Arts & Sports Club (STASC)',
      type: 'Sports & Cultural Hub',
      est: 'Est. 1998',
      desc: 'Annual Sevens Football Tournament, Badminton Club, & Onam Cultural Programs.',
      location: 'Canal Junction Grounds',
      contact: 'President: Shameer (9846112233)',
    },
    {
      name: 'Priyadarshini Vayanashala & Arts Club',
      type: 'Library & Arts Circle',
      est: 'Est. 2004',
      desc: 'Public library with 4000+ books, evening reading circles, and drama troupe.',
      location: 'Ward 22 Center',
      contact: 'Secretary: Ramakrishnan (9447334455)',
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
          <Trophy className="w-6 h-6 text-amber-600" />
          <span>Arts, Sports & Cultural Clubs Network</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">Local Sports Tournaments, Arts Circles & Library Clubs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clubs.map((club, idx) => (
          <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {club.type}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">{club.est}</span>
              </div>
              <h3 className="font-bold text-base text-slate-900 leading-snug">{club.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{club.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-500 font-medium">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{club.location}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{club.contact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
