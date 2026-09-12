'use client';

import React, { useEffect, useState } from 'react';
import { Droplet, PhoneCall, Heart } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api, BloodDonor } from '@/lib/api';

export default function BloodNetworkPage() {
  const { activeWard } = useWard();
  const [donors, setDonors] = useState<BloodDonor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState('All');

  const bloodGroups = ['All', 'A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-'];

  useEffect(() => {
    if (activeWard) {
      loadDonors(activeWard.id);
    }
  }, [activeWard]);

  const loadDonors = async (wardId: string) => {
    setLoading(true);
    try {
      const data = await api.getBloodDonors(wardId);
      setDonors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = selectedGroup === 'All'
    ? donors
    : donors.filter((d) => d.blood_group.toUpperCase() === selectedGroup.toUpperCase());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
          <Droplet className="w-6 h-6 text-rose-600" />
          <span>Emergency Blood Donors Network</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">Ward Emergency Blood Donors & Volunteer Registry</p>
      </div>

      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5 flex items-start space-x-3">
        <Heart className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-rose-900 leading-relaxed">
          <strong>Hyperlocal Emergency Response:</strong> Direct contact list of registered blood donors in Ward {activeWard?.ward_number}. Please call only in genuine emergency cases.
        </div>
      </div>

      {/* Blood Group Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
        {bloodGroups.map((bg) => (
          <button
            key={bg}
            onClick={() => setSelectedGroup(bg)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedGroup === bg
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {bg}
          </button>
        ))}
      </div>

      {/* Donor List */}
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading blood donors registry...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
          No registered blood donors for group {selectedGroup} in this ward.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((donor) => (
            <div key={donor.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 text-rose-700 font-extrabold text-base flex items-center justify-center flex-shrink-0 shadow-xs">
                  {donor.blood_group}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{donor.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{donor.phone}</p>
                </div>
              </div>

              <a
                href={`tel:${donor.phone}`}
                className="flex items-center space-x-1.5 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-xs"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Donor</span>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
