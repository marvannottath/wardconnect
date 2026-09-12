'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  Plus,
  CheckCircle2,
  Clock,
  Image as ImageIcon,
  Video,
  Mic,
  Send,
  EyeOff,
  ShieldAlert
} from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api, Grievance, Category } from '@/lib/api';

export default function GrievancesPage() {
  const { activeWard, userProfile, setIsAuthModalOpen } = useWard();
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Streetlight');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Audio recording simulation / file placeholder states
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    if (activeWard) {
      loadGrievances(activeWard.id);
      loadCategories(activeWard.id);
    }
  }, [activeWard]);

  const loadGrievances = async (wardId: string) => {
    setLoading(true);
    try {
      const data = await api.getGrievances(wardId);
      setGrievances(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async (wardId: string) => {
    try {
      const cats = await api.getCategories(wardId);
      setCategoriesList(cats);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeWard) return;
    if (!userProfile && !isAnonymous) {
      setIsAuthModalOpen(true);
      return;
    }
    setSubmitting(true);
    try {
      // Find category default assigned department
      const matchedCat = categoriesList.find((c) => c.name.toLowerCase() === category.toLowerCase());
      const assignedDepartment = matchedCat ? matchedCat.department_assigned : 'Panchayath Office';

      await api.createGrievance({
        ward: activeWard.id,
        user: userProfile?.id,
        is_anonymous: isAnonymous,
        title,
        category,
        description,
        assigned_department: assignedDepartment,
        status: 'submitted',
      });
      setMessage('Issue report submitted successfully!');
      setTitle('');
      setDescription('');
      setIsAnonymous(false);
      setHasImage(false);
      setHasVideo(false);
      setHasVoiceNote(false);
      setIsFormOpen(false);
      loadGrievances(activeWard.id);
    } catch (err: any) {
      setMessage('Error submitting issue: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const categoryNames = ['All', ...Array.from(new Set([
    'Streetlight', 'Water Pipeline', 'Waste Dump / Garbage', 'Road / Drainage', 'Lahari / Anti-Drug Tip-off',
    ...categoriesList.map((c) => c.name)
  ]))];

  const filtered = filterCategory === 'All'
    ? grievances
    : grievances.filter((g) => g.category.toLowerCase().includes(filterCategory.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
            <AlertCircle className="w-6 h-6 text-amber-500" />
            <span>Parihara Petti & Confidential Reports</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">Public Civic Issue Tracker & Anti-Drug (Lahari) Confidential Tip-off Desk</p>
        </div>
        <button
          onClick={() => {
            if (!userProfile && !isAnonymous) {
              setIsAuthModalOpen(true);
            } else {
              setIsFormOpen(true);
            }
          }}
          className="flex items-center justify-center space-x-1.5 py-2.5 px-4 bg-emerald-600 text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Report New Issue / Tip-off</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-800 font-medium">
          {message}
        </div>
      )}

      {/* Categories Horizontal Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
        {categoryNames.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Issue Report Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Submit Report or Confidential Tip-off</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (e.target.value.toLowerCase().includes('lahari') || e.target.value.toLowerCase().includes('drug')) {
                      setIsAnonymous(true);
                    }
                  }}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                >
                  <option value="Streetlight">Streetlight Non-Functional</option>
                  <option value="Water Pipeline">Water Pipeline Leakage</option>
                  <option value="Waste Dump / Garbage">Waste Dump / Garbage</option>
                  <option value="Road / Drainage">Road Pothole / Drainage Repair</option>
                  <option value="Lahari / Anti-Drug Tip-off">Lahari / Anti-Drug Confidential Tip-off</option>
                  {categoriesList.map((c) => (
                    <option key={c.id} value={c.name}>{c.name} ({c.department_assigned})</option>
                  ))}
                </select>
              </div>

              {/* Anonymous Whistleblower Toggle */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <EyeOff className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">Post Anonymously</span>
                    <span className="text-[11px] text-slate-500">Hide your name & details (Ideal for anti-drug / confidential tip-offs)</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Short description of the issue"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Details & Location Landmark</label>
                <textarea
                  rows={4}
                  placeholder="Provide landmark and exact location details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              {/* Multi-Media Attachment Buttons */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Attach Media Evidence</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setHasImage(!hasImage)}
                    className={`p-3 rounded-xl border text-center text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                      hasImage ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <ImageIcon className="w-5 h-5 mb-1" />
                    <span>{hasImage ? 'Photo Added' : 'Add Photo'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasVideo(!hasVideo)}
                    className={`p-3 rounded-xl border text-center text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                      hasVideo ? 'border-blue-500 bg-blue-50 text-blue-800' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Video className="w-5 h-5 mb-1" />
                    <span>{hasVideo ? 'Video Added' : 'Add Video'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasVoiceNote(!hasVoiceNote)}
                    className={`p-3 rounded-xl border text-center text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                      hasVoiceNote ? 'border-purple-500 bg-purple-50 text-purple-800' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Mic className="w-5 h-5 mb-1" />
                    <span>{hasVoiceNote ? 'Voice Recorded' : 'Voice Note'}</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : 'Submit Report'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Grievances Responsive Grid */}
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading ward grievances & tip-offs...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <p className="font-bold text-base text-slate-700">No reports found in this category</p>
          <p className="text-xs sm:text-sm text-slate-400">Everything looks clean in Ward {activeWard?.ward_number}!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((g) => (
            <div key={g.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {g.category}
                    </span>
                    {g.is_anonymous && (
                      <span className="flex items-center space-x-0.5 text-[9px] font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200">
                        <EyeOff className="w-3 h-3 text-rose-600" />
                        <span>Anonymous</span>
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
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

                <h3 className="font-bold text-base text-slate-900 mt-1">{g.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{g.description}</p>

                <div className="mt-2.5 inline-block text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/80">
                  Assigned Dept: <span className="font-bold text-slate-900">{g.assigned_department}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(g.created_at).toLocaleDateString()}</span>
                </div>
                <span className="font-medium text-slate-500">
                  {g.is_anonymous ? 'Confidential Resident' : (g.user_details?.full_name || 'Resident')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
