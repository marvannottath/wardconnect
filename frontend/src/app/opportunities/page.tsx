'use client';

import React, { useEffect, useState } from 'react';
import { Briefcase, GraduationCap, Gift, ExternalLink, Plus } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api, Opportunity } from '@/lib/api';

export default function OpportunitiesPage() {
  const { activeWard, userProfile, setIsAuthModalOpen } = useWard();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'job' | 'scholarship' | 'welfare_scheme' | 'free_class'>('job');
  const [details, setDetails] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const typeNames = ['All', 'job', 'scholarship', 'welfare_scheme', 'free_class'];

  useEffect(() => {
    if (activeWard) {
      loadOpportunities(activeWard.id);
    }
  }, [activeWard]);

  const loadOpportunities = async (wardId: string) => {
    setLoading(true);
    try {
      const data = await api.getOpportunities(wardId);
      setOpportunities(data);
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
      await api.createOpportunity({
        ward: activeWard.id,
        title,
        type,
        details,
        link_url: linkUrl,
      });
      setTitle('');
      setDetails('');
      setLinkUrl('');
      setIsFormOpen(false);
      loadOpportunities(activeWard.id);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = selectedType === 'All'
    ? opportunities
    : opportunities.filter((o) => o.type === selectedType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <span>Opportunities & Welfare Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">Job Alerts, Scholarships, Free Classes & Government Welfare Schemes</p>
        </div>
        <button
          onClick={() => {
            if (!userProfile) {
              setIsAuthModalOpen(true);
            } else {
              setIsFormOpen(true);
            }
          }}
          className="flex items-center justify-center space-x-1.5 py-2.5 px-4 bg-blue-600 text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Post Opportunity</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
        {typeNames.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap capitalize transition-all ${
              selectedType === t
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Post Opportunity / Notice</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Opportunity Type</label>
                <select
                  value={type}
                  onChange={(e: any) => setType(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                >
                  <option value="job">Job Opening Alert</option>
                  <option value="scholarship">Scholarship & Entrance Alert</option>
                  <option value="welfare_scheme">Government Welfare Scheme</option>
                  <option value="free_class">Free Skill Class / Coaching</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Higher Education Scholarship 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Details & Eligibility</label>
                <textarea
                  rows={4}
                  placeholder="Provide eligibility criteria, last date to apply, and contact details..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Official Website / Portal Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition-all"
              >
                {submitting ? 'Publishing...' : 'Publish Opportunity Notice'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading opportunities...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
          No active notices in this category for Ward {activeWard?.ward_number}.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {(item.type || item.category || 'opportunity').replace('_', ' ')}
                  </span>
                  {item.type === 'scholarship' ? (
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                  ) : item.type === 'welfare_scheme' ? (
                    <Gift className="w-4 h-4 text-purple-600" />
                  ) : (
                    <Briefcase className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <h3 className="font-bold text-base text-slate-900 mt-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{item.details}</p>
              </div>

              {item.link_url && (
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                  <a
                    href={item.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    <span>Apply / Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
