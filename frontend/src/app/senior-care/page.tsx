'use client';

import React, { useEffect, useState } from 'react';
import { UserCheck, Plus, Phone, HeartHandshake } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api, SeniorCareRequest } from '@/lib/api';

export default function SeniorCarePage() {
  const { activeWard, userProfile, setIsAuthModalOpen } = useWard();
  const [requests, setRequests] = useState<SeniorCareRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [serviceType, setServiceType] = useState<'medicine' | 'transport' | 'pension' | 'bills'>('medicine');
  const [contact, setContact] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (activeWard) {
      loadRequests(activeWard.id);
    }
  }, [activeWard]);

  const loadRequests = async (wardId: string) => {
    setLoading(true);
    try {
      const data = await api.getSeniorCareRequests(wardId);
      setRequests(data);
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
      await api.createSeniorCareRequest({
        ward: activeWard.id,
        beneficiary_name: beneficiaryName,
        service_type: serviceType,
        contact: contact || userProfile.phone,
        details,
        status: 'pending',
      });
      setMessage('Care request submitted to Ward Volunteers!');
      setBeneficiaryName('');
      setDetails('');
      setIsFormOpen(false);
      loadRequests(activeWard.id);
    } catch (err: any) {
      setMessage('Error submitting request: ' + err.message);
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
            <UserCheck className="w-6 h-6 text-purple-600" />
            <span>Veetu Sahayi</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">Senior Citizen & NRI Family Care Desk</p>
        </div>
        <button
          onClick={() => {
            if (!userProfile) {
              setIsAuthModalOpen(true);
            } else {
              setIsFormOpen(true);
            }
          }}
          className="flex items-center justify-center space-x-1.5 py-2.5 px-4 bg-purple-600 text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Care Request</span>
        </button>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 sm:p-5 flex items-start space-x-3">
        <HeartHandshake className="w-6 h-6 text-purple-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-purple-900 leading-relaxed">
          <strong>Dedicated Support for Elderly & Homebound:</strong> Emergency medicine delivery, hospital transport assistance, digital pension mustering & utility bill payment support by verified Ward Volunteers.
        </div>
      </div>

      {message && (
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs sm:text-sm text-purple-900 font-medium">
          {message}
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Request Elderly Care Support</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Service Required</label>
                <select
                  value={serviceType}
                  onChange={(e: any) => setServiceType(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                >
                  <option value="medicine">Medicine Purchase & Delivery</option>
                  <option value="transport">Hospital Transit Assistance</option>
                  <option value="pension">Digital Pension Mustering Support</option>
                  <option value="bills">Utility Bill Payment Assistance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Senior Resident Name & Age</label>
                <input
                  type="text"
                  placeholder="e.g. Saraswathi Amma (Age 82)"
                  value={beneficiaryName}
                  onChange={(e) => setBeneficiaryName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone Number</label>
                <input
                  type="tel"
                  placeholder="Contact phone"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Details & Special Instructions</label>
                <textarea
                  rows={3}
                  placeholder="Address or medicine details..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-sm shadow-md transition-all"
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Requests List */}
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading care desk requests...</div>
      ) : requests.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
          No senior care requests pending in Ward {activeWard?.ward_number}.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                    {req.service_type}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      req.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : req.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {(req.status || 'pending').replace('_', ' ')}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 mt-1">{req.beneficiary_name}</h3>
                {req.details && <p className="text-xs sm:text-sm text-slate-600 mt-1">{req.details}</p>}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center space-x-1">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold">{req.contact}</span>
                </span>
                <span className="text-[10px] text-slate-400">{req.created_at ? new Date(req.created_at).toLocaleDateString() : ''}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
