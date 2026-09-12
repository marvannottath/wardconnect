'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, Plus, PhoneCall } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api, BookExchange } from '@/lib/api';

export default function BookExchangePage() {
  const { activeWard, userProfile, setIsAuthModalOpen } = useWard();
  const [books, setBooks] = useState<BookExchange[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Entrance Exam');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (activeWard) {
      loadBooks(activeWard.id);
    }
  }, [activeWard]);

  const loadBooks = async (wardId: string) => {
    setLoading(true);
    try {
      const data = await api.getBooks(wardId);
      setBooks(data);
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
      await api.createBook({
        ward: activeWard.id,
        title,
        category,
        contact_name: contactName || userProfile.full_name,
        phone: phone || userProfile.phone,
        is_available: true,
      });
      setMessage('Book / Study Material added to Ward Exchange!');
      setTitle('');
      setIsFormOpen(false);
      loadBooks(activeWard.id);
    } catch (err: any) {
      setMessage('Error listing book: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <span>Pusthaka Vandi</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">Ward Book Exchange & Entrance Study Material Sharing</p>
        </div>
        <button
          onClick={() => {
            if (!userProfile) {
              setIsAuthModalOpen(true);
            } else {
              setIsFormOpen(true);
            }
          }}
          className="flex items-center justify-center space-x-1.5 py-2.5 px-4 bg-indigo-600 text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Share Book / Material</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs sm:text-sm text-indigo-900 font-medium">
          {message}
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Share Study Material / Book</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Book Title / Material Name</label>
                <input
                  type="text"
                  placeholder="e.g. NEET Biology Coaching Notes 2025"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                >
                  <option value="Entrance Exam">Entrance & Competitive Exam</option>
                  <option value="School Textbooks">School Textbooks (SSLC / Plus Two)</option>
                  <option value="College Textbooks">College & Degree Textbooks</option>
                  <option value="Fiction / General">Fiction / Literature / General Books</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Owner Contact Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Your phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md transition-all"
              >
                {submitting ? 'Publishing...' : 'Publish to Ward Exchange'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Book Catalog Responsive Grid */}
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading book exchange catalog...</div>
      ) : books.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
          No study materials or books listed in Ward {activeWard?.ward_number} yet. Be the first to share!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    {book.category}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                    Available
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 mt-1">{book.title}</h3>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Shared by <span className="font-bold text-slate-800">{book.contact_name}</span>
                </div>
                <a
                  href={`tel:${book.phone}`}
                  className="flex items-center space-x-1.5 py-2 px-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Owner</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
