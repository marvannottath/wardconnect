'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  HeartPulse,
  Wrench,
  Droplet,
  UserCheck,
  Bell,
  ChevronRight,
  ShieldAlert,
  Info,
  Clock,
  Heart,
  ShoppingBag,
  Briefcase,
  Trophy,
  Shield,
  HelpCircle,
  MessageSquare,
  Volume2,
  Users,
  Waves,
  ArrowRight,
  UserPlus,
  Activity,
  Trash2,
  Sprout,
  Sparkles,
  Dribbble
} from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api, EmergencyBroadcast, WardStats, Grievance } from '@/lib/api';
import { IssueChatDrawer } from '@/components/IssueChatDrawer';
import { WardConnectLogo } from '@/components/WardConnectLogo';
import { WardConnectAnimatedLoader } from '@/components/WardConnectAnimatedLoader';

export default function HomePage() {
  const { activeWard, userProfile, setIsAuthModalOpen } = useWard();
  const [showDashboard, setShowDashboard] = useState(false);
  const [broadcasts, setBroadcasts] = useState<EmergencyBroadcast[]>([]);
  const [stats, setStats] = useState<WardStats | null>(null);
  const [recentGrievances, setRecentGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);

  // Urgent Red Alert Popup & Sound state
  const [criticalNotice, setCriticalNotice] = useState<EmergencyBroadcast | null>(null);
  const [isAlertPopupOpen, setIsAlertPopupOpen] = useState(false);
  const [selectedChatGrievance, setSelectedChatGrievance] = useState<Grievance | null>(null);

  useEffect(() => {
    if (activeWard) {
      loadWardData(activeWard.id);
    }
  }, [activeWard]);

  // If user is already logged in, enter dashboard automatically
  useEffect(() => {
    if (userProfile) {
      setShowDashboard(true);
    }
  }, [userProfile]);

  const playNotificationSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.error(e);
    }
  };

  const dismissAlertModal = () => {
    if (criticalNotice && typeof window !== 'undefined') {
      sessionStorage.setItem(`dismissed_alert_${criticalNotice.id}`, 'true');
    }
    setIsAlertPopupOpen(false);
  };

  const loadWardData = async (wardId: string) => {
    setLoading(true);
    try {
      const [bData, sData, gData] = await Promise.all([
        api.getBroadcasts(wardId),
        api.getWardStats(wardId),
        api.getGrievances(wardId),
      ]);
      setBroadcasts(bData);
      setStats(sData);
      setRecentGrievances(gData.slice(0, 6));

      // Check for critical broadcast and check if already dismissed in session
      const crit = bData.find((b) => b.severity === 'critical');
      if (crit && typeof window !== 'undefined') {
        const isDismissed = sessionStorage.getItem(`dismissed_alert_${crit.id}`);
        if (!isDismissed) {
          setCriticalNotice(crit);
          setIsAlertPopupOpen(true);
          playNotificationSound();
        }
      }
    } catch (err) {
      console.error('Error fetching home dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const quickModules = [
    {
      title: 'Parihara Petti',
      desc: 'Report & Track Civic Issues',
      href: '/issues',
      icon: AlertTriangle,
      color: 'bg-amber-500',
      lightBg: 'bg-amber-50 text-amber-800 border-amber-200 hover:border-amber-400',
    },
    {
      title: 'Pattini Sahayi',
      desc: 'Secret Distress & Hunger Desk',
      href: '/pattini-sahayi',
      icon: Heart,
      color: 'bg-rose-500',
      lightBg: 'bg-rose-50 text-rose-800 border-rose-200 hover:border-rose-400',
    },
    {
      title: 'Karshaka Chanda',
      desc: 'Direct Farmer Produce Sale',
      href: '/farming',
      icon: Sprout,
      color: 'bg-emerald-600',
      lightBg: 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:border-emerald-400',
    },
    {
      title: 'Vibhava Sangam',
      desc: 'Age-Group & Skill Collectives',
      href: '/sangam',
      icon: Users,
      color: 'bg-purple-600',
      lightBg: 'bg-purple-50 text-purple-900 border-purple-200 hover:border-purple-400',
    },
    {
      title: 'Ward Matrimony',
      desc: 'Local Marriage Alliances',
      href: '/matrimony',
      icon: Heart,
      color: 'bg-rose-600',
      lightBg: 'bg-rose-50 text-rose-900 border-rose-200 hover:border-rose-400',
    },
    {
      title: 'Arts & Sports Clubs',
      desc: 'Local Clubs & Tournaments',
      href: '/clubs',
      icon: Dribbble,
      color: 'bg-amber-600',
      lightBg: 'bg-amber-50 text-amber-900 border-amber-200 hover:border-amber-400',
    },
    {
      title: 'Fitness & Health',
      desc: 'Morning Walks & Yoga Circles',
      href: '/fitness',
      icon: Activity,
      color: 'bg-teal-600',
      lightBg: 'bg-teal-50 text-teal-900 border-teal-200 hover:border-teal-400',
    },
    {
      title: 'Clean Ward Desk',
      desc: 'Haritha Karma Sena & Waste Drive',
      href: '/cleaning',
      icon: Trash2,
      color: 'bg-emerald-700',
      lightBg: 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:border-emerald-400',
    },
    {
      title: 'Gramasabha Desk',
      desc: 'Citizen Voting & Development Proposals',
      href: '/gramasabha',
      icon: Users,
      color: 'bg-blue-600',
      lightBg: 'bg-blue-50 text-blue-900 border-blue-200 hover:border-blue-400',
    },
    {
      title: 'Flood & Disaster Desk',
      desc: 'River Level & Relief Camps Map',
      href: '/disaster',
      icon: Waves,
      color: 'bg-rose-600',
      lightBg: 'bg-rose-50 text-rose-900 border-rose-200 hover:border-rose-400',
    },
    {
      title: 'Koode (കൂടെ)',
      desc: 'Mental Health & Wellness',
      href: '/koode',
      icon: HeartPulse,
      color: 'bg-purple-500',
      lightBg: 'bg-purple-50 text-purple-800 border-purple-200 hover:border-purple-400',
    },
    {
      title: 'Swadeshi Ventures',
      desc: 'Local Products & Startups',
      href: '/products',
      icon: ShoppingBag,
      color: 'bg-emerald-500',
      lightBg: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:border-emerald-400',
    },
    {
      title: 'Opportunities',
      desc: 'Jobs, Scholarships & Schemes',
      href: '/opportunities',
      icon: Briefcase,
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50 text-blue-800 border-blue-200 hover:border-blue-400',
    },
    {
      title: 'Volunteer Teams',
      desc: 'Whiteguard, KMCC & Helplines',
      href: '/volunteers',
      icon: Shield,
      color: 'bg-slate-900',
      lightBg: 'bg-slate-100 text-slate-800 border-slate-300 hover:border-slate-400',
    },
    {
      title: 'Ward Pride Wall',
      desc: 'Achievers & Toppers Honor',
      href: '/achievements',
      icon: Trophy,
      color: 'bg-amber-600',
      lightBg: 'bg-amber-50 text-amber-900 border-amber-300 hover:border-amber-500',
    },
    {
      title: 'Sevana Guidance',
      desc: 'Certificates & Career Doubts',
      href: '/sevana',
      icon: HelpCircle,
      color: 'bg-indigo-500',
      lightBg: 'bg-indigo-50 text-indigo-800 border-indigo-200 hover:border-indigo-400',
    },
    {
      title: 'Thozhil Veedhi',
      desc: 'Verified Local Tradespeople',
      href: '/services',
      icon: Wrench,
      color: 'bg-blue-600',
      lightBg: 'bg-blue-50 text-blue-900 border-blue-200 hover:border-blue-400',
    },
    {
      title: 'Blood Donors',
      desc: 'Emergency Blood Network',
      href: '/blood',
      icon: Droplet,
      color: 'bg-rose-600',
      lightBg: 'bg-rose-50 text-rose-900 border-rose-200 hover:border-rose-400',
    },
    {
      title: 'Arogya Nidhi',
      desc: 'Medical Equipment Bank',
      href: '/equipment',
      icon: HeartPulse,
      color: 'bg-emerald-600',
      lightBg: 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:border-emerald-400',
    },
    {
      title: 'Veetu Sahayi',
      desc: 'Elderly & NRI Care Desk',
      href: '/senior-care',
      icon: UserCheck,
      color: 'bg-purple-600',
      lightBg: 'bg-purple-50 text-purple-900 border-purple-200 hover:border-purple-400',
    },
  ];

  return (
    <>
      {/* FULL SCREEN FIXED INTRO VIEW (ONLY ANIMATED LOADER + TITLE + SIGN IN / REGISTER BUTTON) */}
      {!showDashboard && (
        <div className="fixed inset-0 h-screen w-screen z-50 bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute w-[400px] h-[400px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6 max-w-sm mx-auto flex flex-col items-center">
            {/* Animated Orbiting 3-Dots Loader Emblem */}
            <div className="p-6 rounded-full bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
              <WardConnectAnimatedLoader size={130} />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Ward<span className="text-emerald-400">Connect</span>
              </h1>
            </div>

            {/* ONLY ONE BUTTON: SIGN IN / REGISTER */}
            <div className="pt-2 w-full">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl text-sm shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign In / Register</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN WARD DASHBOARD */}
      <div className="space-y-6">
        {/* Urgent Red Alert Sound Popup Modal */}
        {isAlertPopupOpen && criticalNotice && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-rose-600 text-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 border-2 border-rose-300 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-white" />
                  <span>URGENT RED ALERT</span>
                </div>
                <button
                  onClick={dismissAlertModal}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold">{criticalNotice.title}</h2>
                <p className="text-xs sm:text-sm text-rose-100 mt-2 leading-relaxed bg-black/10 p-4 rounded-2xl border border-white/10">
                  {criticalNotice.content}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={playNotificationSound}
                  className="flex items-center space-x-1 text-xs font-semibold text-rose-200 hover:text-white"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Replay Alert Sound</span>
                </button>
                <button
                  onClick={dismissAlertModal}
                  className="py-2.5 px-5 bg-white text-rose-900 rounded-xl font-extrabold text-xs sm:text-sm shadow-md hover:bg-rose-50 transition-colors"
                >
                  Acknowledge Alert
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Minimal Ultra-Clean Home Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="flex items-center space-x-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
              <WardConnectLogo size={24} animated={false} />
              <span>Digital Ward Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              സ്വാഗതം!
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed pt-1">
              വാർഡിലെ പരാതി പരിഹാരം, അടിയന്തിര സേവനങ്ങൾ, പട്ടിണി സഹായി, തൊഴിൽ വീഥി, കൂടെ ഹെൽപ്പ് ലൈൻ എന്നിവ ഒരൊറ്റ ക്ലിക്കിൽ ഉപയോഗിക്കൂ.
            </p>
          </div>

          <div className="absolute right-[-20px] bottom-[-20px] opacity-15 pointer-events-none">
            <HeartPulse className="w-48 h-48 sm:w-64 sm:h-64 text-white" />
          </div>
        </div>

        {/* Full-Width Stacked Emergency Broadcasts Feed (Max 2 displayed, View All link to /notices) */}
        {broadcasts.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
                <Bell className="w-4 h-4 text-rose-500" />
                <span>Ward Notices & Emergency Alerts</span>
              </h2>

              <Link
                href="/notices"
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center space-x-1"
              >
                <span>View All Ward Notices ({broadcasts.length})</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Full Width Stacked Cards (Max 2) */}
            <div className="space-y-3 w-full">
              {broadcasts.slice(0, 2).map((b) => {
                const isCritical = b.severity === 'critical';
                const isAlert = b.severity === 'alert';
                return (
                  <div
                    key={b.id}
                    className={`w-full p-5 sm:p-6 rounded-3xl border transition-all shadow-xs ${
                      isCritical
                        ? 'bg-rose-600 text-white border-rose-700 shadow-md'
                        : isAlert
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-blue-50 border-blue-200 text-blue-900'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      {isCritical ? (
                        <ShieldAlert className="w-6 h-6 text-white flex-shrink-0 mt-0.5 animate-pulse" />
                      ) : isAlert ? (
                        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-sm sm:text-base capitalize leading-snug">{b.title}</h3>
                          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${isCritical ? 'bg-white text-rose-900 shadow-xs' : 'bg-white/70'}`}>
                            {b.severity}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm mt-1.5 leading-relaxed opacity-95">{b.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Ward Overview Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs">
              <p className="text-xs text-slate-500 font-medium">Grievances</p>
              <p className="text-xl font-extrabold text-slate-800 mt-1">
                {stats.resolved_grievances}/{stats.total_grievances}
              </p>
              <span className="text-[10px] font-semibold text-emerald-600">Resolved</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs">
              <p className="text-xs text-slate-500 font-medium">Equipments</p>
              <p className="text-xl font-extrabold text-emerald-600 mt-1">{stats.medical_equipment_types}</p>
              <span className="text-[10px] font-semibold text-slate-500">Available</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs">
              <p className="text-xs text-slate-500 font-medium">Blood Donors</p>
              <p className="text-xl font-extrabold text-rose-600 mt-1">{stats.active_blood_donors}</p>
              <span className="text-[10px] font-semibold text-slate-500">On Call</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs">
              <p className="text-xs text-slate-500 font-medium">Tradespeople</p>
              <p className="text-xl font-extrabold text-blue-600 mt-1">{stats.verified_services}</p>
              <span className="text-[10px] font-semibold text-slate-500">Verified</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs col-span-2 md:col-span-1">
              <p className="text-xs text-slate-500 font-medium">Alerts</p>
              <p className="text-xl font-extrabold text-amber-600 mt-1">{stats.active_broadcasts}</p>
              <span className="text-[10px] font-semibold text-slate-500">Active</span>
            </div>
          </div>
        )}

        {/* Core Feature Modules Grid */}
        <div className="space-y-3">
          <h2 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">Ward Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {quickModules.map((m) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.href}
                  href={m.href}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all hover:scale-[1.03] shadow-xs flex flex-col justify-between ${m.lightBg}`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${m.color} text-white flex items-center justify-center shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-bold text-sm sm:text-base">{m.title}</h3>
                    <p className="text-xs opacity-80 mt-0.5 leading-tight">{m.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Transparency Board & Direct Chat Trigger */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">Public Transparency Board</h2>
            <Link href="/issues" className="text-xs sm:text-sm text-emerald-700 font-bold hover:underline flex items-center">
              View All <ChevronRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>

          {recentGrievances.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-xs text-slate-500">
              No grievances submitted in this ward yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {recentGrievances.map((g) => (
                <div key={g.id} className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {g.category}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          g.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : g.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {g.status.replace('_', ' ')}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 mt-1">{g.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-3">{g.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(g.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <button
                      onClick={() => setSelectedChatGrievance(g)}
                      className="flex items-center space-x-1 px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Direct Chat</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Direct Chat Drawer Modal */}
        {selectedChatGrievance && (
          <IssueChatDrawer
            grievance={selectedChatGrievance}
            onClose={() => setSelectedChatGrievance(null)}
          />
        )}
      </div>
    </>
  );
}
