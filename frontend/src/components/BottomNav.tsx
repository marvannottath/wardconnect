'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, AlertCircle, HeartPulse, Wrench, Droplet, UserCheck, BookOpen } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/issues', label: 'Issues', icon: AlertCircle },
    { href: '/equipment', label: 'Equipments', icon: HeartPulse },
    { href: '/services', label: 'Services', icon: Wrench },
    { href: '/blood', label: 'Blood', icon: Droplet },
    { href: '/senior-care', label: 'Elder Care', icon: UserCheck },
    { href: '/books', label: 'Study', icon: BookOpen },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg">
      <div className="max-w-md mx-auto px-2 flex items-center justify-around py-1.5 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2 min-w-[52px] rounded-xl transition-all ${
                isActive
                  ? 'text-emerald-700 bg-emerald-50 font-bold'
                  : 'text-slate-500 hover:text-slate-700 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] mt-0.5 whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
