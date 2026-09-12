'use client';

import React, { useEffect, useState } from 'react';
import { Shield, PhoneCall, HeartHandshake, Truck, Zap } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api, VolunteerTeam } from '@/lib/api';

export default function VolunteersPage() {
  const { activeWard } = useWard();
  const [teams, setTeams] = useState<VolunteerTeam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeWard) {
      loadTeams(activeWard.id);
    }
  }, [activeWard]);

  const loadTeams = async (wardId: string) => {
    setLoading(true);
    try {
      const data = await api.getVolunteerTeams(wardId);
      setTeams(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const directContacts = [
    { title: '24/7 Emergency Ambulance', phone: '108', icon: Truck, color: 'bg-rose-500 text-white' },
    { title: 'Fire & Rescue Station', phone: '101', icon: Shield, color: 'bg-amber-500 text-white' },
    { title: 'KSEB Power Breakdown', phone: '1912', icon: Zap, color: 'bg-blue-500 text-white' },
    { title: 'Police Emergency Helpline', phone: '112', icon: Shield, color: 'bg-slate-900 text-white' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
          <Shield className="w-6 h-6 text-emerald-600" />
          <span>Volunteer Teams & Direct Helpline</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">Whiteguard, KMCC Taskforce, Red Cross & Emergency Direct Dial Lines</p>
      </div>

      {/* Emergency Helpline Quick Dial Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {directContacts.map((c) => {
          const Icon = c.icon;
          return (
            <a
              key={c.title}
              href={`tel:${c.phone}`}
              className={`p-4 rounded-2xl border transition-transform hover:scale-[1.02] shadow-xs flex flex-col justify-between ${c.color}`}
            >
              <Icon className="w-5 h-5 opacity-90" />
              <div className="mt-3">
                <h3 className="font-bold text-xs sm:text-sm">{c.title}</h3>
                <p className="text-sm font-extrabold mt-0.5">{c.phone}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Volunteer Teams List */}
      <div className="space-y-3">
        <h2 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">Registered Ward Volunteer Relief Teams</h2>

        {loading ? (
          <div className="py-12 text-center text-sm text-slate-500">Loading volunteer teams...</div>
        ) : teams.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
            No volunteer teams listed for Ward {activeWard?.ward_number} yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <div key={team.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <HeartHandshake className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-base text-slate-900">{team.team_name}</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">In-Charge: <span className="font-bold text-slate-800">{team.incharge_name}</span></p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {team.services_offered}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{team.phone}</span>
                  <a
                    href={`tel:${team.phone}`}
                    className="flex items-center space-x-1.5 py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Team</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
