'use client';

import React, { useEffect, useState } from 'react';
import { Award, Trophy, Star, Plus } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api, WardAchievement } from '@/lib/api';

export default function AchievementsPage() {
  const { activeWard, userProfile, setIsAuthModalOpen } = useWard();
  const [achievements, setAchievements] = useState<WardAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [honoreeName, setHonoreeName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (activeWard) {
      loadAchievements(activeWard.id);
    }
  }, [activeWard]);

  const loadAchievements = async (wardId: string) => {
    setLoading(true);
    try {
      const data = await api.getAchievements(wardId);
      setAchievements(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeWard) return;
    if (!userProfile) {
      setIsAuthModalOpen(true);
      return;
    }
    setSubmitting(true);
    try {
      await api.createAchievement({
        ward: activeWard.id,
        title,
        honoree_name: honoreeName,
        description,
      });
      setTitle('');
      setHonoreeName('');
      setDescription('');
      setIsFormOpen(false);
      loadAchievements(activeWard.id);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const isAdmin = userProfile?.role === 'ward_admin' || userProfile?.role === 'ward_member' || userProfile?.role === 'super_admin';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <span>Ward Pride & Achievements Wall</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">Honoring Exam Toppers, Sports Champions & Ward Achievers</p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center justify-center space-x-1.5 py-2.5 px-4 bg-amber-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:bg-amber-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Honor / Achievement</span>
          </button>
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Post Honor / Achievement</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Achiever / Honoree Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ameena Trippanachi"
                  value={honoreeName}
                  onChange={(e) => setHonoreeName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Achievement Title</label>
                <input
                  type="text"
                  placeholder="e.g. Rank 1 in IAS Exam 2025"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Congratulatory Note</label>
                <textarea
                  rows={4}
                  placeholder="Details of the accomplishment..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-sm shadow-md transition-all"
              >
                {submitting ? 'Publishing...' : 'Publish to Ward Wall of Pride'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading achievements wall...</div>
      ) : achievements.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
          No achievement posts yet for Ward {activeWard?.ward_number}.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div key={ach.id} className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-3xl p-6 shadow-lg space-y-3 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                    Ward Pride
                  </span>
                  <Award className="w-6 h-6 text-amber-200" />
                </div>
                <h2 className="font-extrabold text-xl mt-3">{ach.honoree_name}</h2>
                <h3 className="font-bold text-sm text-amber-100 mt-0.5">{ach.title}</h3>
                <p className="text-xs sm:text-sm text-amber-50/90 mt-2 leading-relaxed">{ach.description}</p>
              </div>

              <div className="pt-3 border-t border-amber-400/40 text-[10px] text-amber-100 flex items-center justify-between">
                <span>Honored by Ward Grama Sabha</span>
                <Star className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
