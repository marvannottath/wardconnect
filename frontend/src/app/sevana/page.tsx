'use client';

import React, { useState } from 'react';
import { HelpCircle, FileText, Compass, PhoneCall, ChevronRight } from 'lucide-react';
import { useWard } from '@/context/WardContext';

export default function SevanaGuidancePage() {
  const { activeWard } = useWard();
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Marriage Registration (വിവാഹ രജിസ്ട്രേഷൻ) - Requirements?',
      answer: 'Submit online application at KSMART Sevana Portal (sevana.lsgkerala.gov.in) within 45 days of marriage. Required documents: Marriage Invitation Card, Joint Photo, Age Proof (SSLC certificate), and 2 Witnesses from the ward.'
    },
    {
      question: 'Birth & Death Certificate Registration (ജനന മരണ രജിസ്ട്രേഷൻ)?',
      answer: 'Hospital births are auto-registered via KSMART. For home births within ward jurisdiction, report to Panchayath Health Inspector within 21 days with doctor certificate & parents ID.'
    },
    {
      question: 'Ownership Certificate & Building Permit Doubts?',
      answer: 'Apply through KSMART portal. Required documents: Title Deed, Possession Certificate, Site Plan, and Property Tax receipt.'
    },
    {
      question: 'Career Guidance & Entrance Exam Consultation?',
      answer: 'Contact the Ward Youth Guidance Desk for free counseling on Higher Education, Kerala PSC, UPSC, and Entrance Coaching choices.'
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
          <HelpCircle className="w-6 h-6 text-indigo-600" />
          <span>Sevana Certificates & Career Guidance Desk</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">Quick Guidance on Marriage, Birth/Death Certificates, Building Permits & Career Choices</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="https://sevana.lsgkerala.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-md flex items-center justify-between hover:scale-[1.02] transition-transform"
        >
          <div>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <h3 className="font-bold text-base">KSMART Sevana Portal</h3>
            </div>
            <p className="text-xs text-blue-100 mt-1">Official Kerala LSGD Online Certificates & Permits</p>
          </div>
          <ChevronRight className="w-5 h-5 text-blue-200" />
        </a>

        <div className="p-5 bg-gradient-to-r from-purple-600 to-indigo-800 text-white rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <Compass className="w-5 h-5" />
              <h3 className="font-bold text-base">Career & Entrance Guidance</h3>
            </div>
            <p className="text-xs text-purple-100 mt-1">Talk to Ward Higher Education Mentor</p>
          </div>
          <a
            href="tel:9847012345"
            className="p-2 bg-white text-indigo-900 rounded-xl text-xs font-bold flex items-center space-x-1"
          >
            <PhoneCall className="w-3.5 h-3.5 text-indigo-600" />
            <span>Call Mentor</span>
          </a>
        </div>
      </div>

      {/* Accordion FAQ Guide */}
      <div className="space-y-3">
        <h2 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">Frequently Asked Civic Procedures</h2>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = selectedFaq === idx;
            return (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
                <button
                  onClick={() => setSelectedFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <span className="text-lg font-bold text-indigo-600 ml-2">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
