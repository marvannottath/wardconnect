'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HeartPulse, PhoneCall, CheckCircle, ArrowLeft } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api, MedicalEquipment } from '@/lib/api';

export default function EquipmentPage() {
  const { activeWard } = useWard();
  const [equipmentList, setEquipmentList] = useState<MedicalEquipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeWard) {
      loadEquipment(activeWard.id);
    }
  }, [activeWard]);

  const loadEquipment = async (wardId: string) => {
    setLoading(true);
    try {
      const data = await api.getEquipment(wardId);
      setEquipmentList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Ward Dashboard</span>
      </Link>

      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
          <HeartPulse className="w-6 h-6 text-emerald-600" />
          <span>Arogya Nidhi Equipment Bank</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">Free Wheelchairs, Oxygen Concentrators & Waterbeds for Ward Residents</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading equipment inventory...</div>
      ) : equipmentList.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
          No medical equipment currently listed in this ward bank.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipmentList.map((item) => {
            const isAvailable = (item.available_qty ?? item.available_quantity) > 0;
            return (
              <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-base text-slate-900">{item.equipment_name}</h3>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        isAvailable
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isAvailable ? `${item.available_qty ?? item.available_quantity} Available` : 'All Out'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2">
                    Managed by: <span className="font-semibold text-slate-700">{item.contact_person}</span>
                  </p>
                </div>

                <a
                  href={`tel:${item.phone}`}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call to Reserve</span>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
