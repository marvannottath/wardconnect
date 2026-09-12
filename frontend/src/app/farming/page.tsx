'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sprout, PhoneCall, ArrowLeft, Plus, CheckCircle2, MapPin } from 'lucide-react';
import { useWard } from '@/context/WardContext';

export default function FarmingPage() {
  const { userProfile, setIsAuthModalOpen } = useWard();
  const [showAddModal, setShowAddModal] = useState(false);

  const produceList = [
    {
      id: 1,
      title: 'Fresh Organic Nendran Plantains (നേന്ത്രപ്പഴം / കായ)',
      seller: 'Kabeer Master (Trippanachi Farmer)',
      qty: '150 Kg Available',
      price: '₹42 / Kg',
      location: 'South Trippanachi Near Canal',
      phone: '9846112233',
    },
    {
      id: 2,
      title: 'Pure Ward Organic Honey & Desi Eggs (നാടൻ മുട്ട & തേൻ)',
      seller: 'Fathima Karshaka Sangam',
      qty: '25 Bottles Honey / 100 Eggs',
      price: '₹450/Bottle • ₹9/Egg',
      location: 'Ward 22 Center',
      phone: '9447334455',
    },
    {
      id: 3,
      title: 'Fresh Tapioca & Elephant Yam (കിഴങ്ങ് & ചേന)',
      seller: 'Moideenkutty',
      qty: '80 Kg Harvested Today',
      price: '₹22 / Kg',
      location: 'North Trippanachi Junction',
      phone: '9847001122',
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

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
            <Sprout className="w-6 h-6 text-emerald-600" />
            <span>Naadan Karshaka Chanda (തദ്ദേശീയ കർഷക ചന്ത)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Direct Farm-to-Resident Sale — No Middlemen, Maximum Fair Price for Local Farmers
          </p>
        </div>

        <button
          onClick={() => (userProfile ? setShowAddModal(true) : setIsAuthModalOpen(true))}
          className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center space-x-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>List Harvest</span>
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-1">
        <h3 className="font-bold text-amber-900 text-sm">🌾 Karshaka Kootayma Direct Support</h3>
        <p className="text-xs text-amber-800 leading-relaxed">
          നാട്ടിൽ ഉത്പാദിപ്പിക്കുന്ന ഏത്തക്കായ, ചേന, കിഴങ്ങ്, നാടൻ മുട്ട, തേനുകൾ ഇടനിലക്കാരില്ലാതെ മികച്ച വിലയ്ക്ക് നേരിട്ട് വിറ്റഴിക്കാൻ വാർഡ് നിവാസികളെ കണക്ട് ചെയ്യുന്നു.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {produceList.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {item.price}
                </span>
                <span className="text-[10px] font-bold text-slate-400">{item.qty}</span>
              </div>
              <h3 className="font-bold text-base text-slate-900 leading-snug">{item.title}</h3>
              <p className="text-xs font-semibold text-slate-700">Seller: {item.seller}</p>
              <div className="flex items-center space-x-1 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>{item.location}</span>
              </div>
            </div>

            <a
              href={`tel:${item.phone}`}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-xs flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Farmer ({item.phone})</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
