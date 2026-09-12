'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Wrench, PhoneCall, CheckCircle2, Search, ArrowLeft } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api, LocalService } from '@/lib/api';

export default function ServicesPage() {
  const { activeWard } = useWard();
  const [services, setServices] = useState<LocalService[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedProf, setSelectedProf] = useState('All');

  const professions = ['All', 'Electrician', 'Plumber', 'Coconut Climber', 'Auto Driver', 'Carpenter', 'Welder'];

  useEffect(() => {
    if (activeWard) {
      loadServices(activeWard.id);
    }
  }, [activeWard]);

  const loadServices = async (wardId: string) => {
    setLoading(true);
    try {
      const data = await api.getServices(wardId);
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = services.filter((s) => {
    const matchesProf = selectedProf === 'All' || s.profession.toLowerCase().includes(selectedProf.toLowerCase());
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.profession.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search);
    return matchesProf && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Inline Back Link */}
      <Link
        href="/"
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Ward Dashboard</span>
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
          <Wrench className="w-6 h-6 text-blue-600" />
          <span>Thozhil Veedhi</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">Verified Local Skilled Tradespeople Directory</p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl">
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Search electrician, plumber, auto driver..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Profession Tags */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
        {professions.map((prof) => (
          <button
            key={prof}
            onClick={() => setSelectedProf(prof)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedProf === prof
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {prof}
          </button>
        ))}
      </div>

      {/* Clean Grid List */}
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading worker listings...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
          No skilled workers found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((service) => (
            <div key={service.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-base text-slate-900 leading-snug">{service.name}</h3>
                  {service.is_verified && (
                    <span className="flex items-center space-x-1 text-[10px] font-extrabold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                
                <p className="text-xs font-semibold text-slate-600">{service.profession}</p>
                <p className="text-xs text-slate-400">{service.phone}</p>
              </div>

              <a
                href={`tel:${service.phone}`}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-xs flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Worker</span>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
