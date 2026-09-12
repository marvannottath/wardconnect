'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, Plus, PhoneCall, Sparkles } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api, LocalProduct } from '@/lib/api';

export default function SwadeshiProductsPage() {
  const { activeWard, userProfile, setIsAuthModalOpen } = useWard();
  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form
  const [productName, setProductName] = useState('');
  const [makerTeam, setMakerTeam] = useState('');
  const [category, setCategory] = useState('Food & Organic');
  const [contactPhone, setContactPhone] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (activeWard) {
      loadProducts(activeWard.id);
    }
  }, [activeWard]);

  const loadProducts = async (wardId: string) => {
    setLoading(true);
    try {
      const data = await api.getProducts(wardId);
      setProducts(data);
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
      await api.createProduct({
        ward: activeWard.id,
        product_name: productName,
        maker_team: makerTeam,
        category,
        contact_phone: contactPhone || userProfile.phone,
        description,
      });
      setProductName('');
      setMakerTeam('');
      setDescription('');
      setIsFormOpen(false);
      loadProducts(activeWard.id);
    } catch (err) {
      console.error(err);
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
            <ShoppingBag className="w-6 h-6 text-emerald-600" />
            <span>Swadeshi Products & Ward Startups</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">Promoting Local Cottage Products, Kudumbashree & Ward Entrepreneurs</p>
        </div>
        <button
          onClick={() => {
            if (!userProfile) {
              setIsAuthModalOpen(true);
            } else {
              setIsFormOpen(true);
            }
          }}
          className="flex items-center justify-center space-x-1.5 py-2.5 px-4 bg-emerald-600 text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Local Product / Venture</span>
        </button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Add Local Product or Venture</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product / Venture Name</label>
                <input
                  type="text"
                  placeholder="e.g. Pure Cold Pressed Coconut Oil"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Maker Unit / Startup Team</label>
                <input
                  type="text"
                  placeholder="e.g. Trippanachi Kudumbashree Unit #4"
                  value={makerTeam}
                  onChange={(e) => setMakerTeam(e.target.value)}
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
                  <option value="Food & Organic">Food & Organic Produce</option>
                  <option value="Handicraft">Handicraft & Textile</option>
                  <option value="Home Care">Home & Cleaning Products</option>
                  <option value="Tech Startup">Tech / Service Venture</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone Number</label>
                <input
                  type="tel"
                  placeholder="Contact phone number"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product Description</label>
                <textarea
                  rows={3}
                  placeholder="Details about product quality, pricing, delivery..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all"
              >
                {submitting ? 'Publishing...' : 'Publish Product to Ward Directory'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Grid Showcase */}
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading local product directory...</div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
          No local products listed in Ward {activeWard?.ward_number} yet. Add yours!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((prod) => (
            <div key={prod.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {prod.category}
                  </span>
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mt-2">{prod.product_name}</h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">By {prod.maker_team}</p>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{prod.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">{prod.contact_phone}</span>
                <a
                  href={`tel:${prod.contact_phone}`}
                  className="flex items-center space-x-1.5 py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Maker</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
