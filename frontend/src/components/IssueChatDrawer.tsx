'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, ShieldCheck } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { api, Grievance, IssueMessage } from '@/lib/api';

interface Props {
  grievance: Grievance;
  onClose: () => void;
}

export const IssueChatDrawer: React.FC<Props> = ({ grievance, onClose }) => {
  const { userProfile } = useWard();
  const [messages, setMessages] = useState<IssueMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadChatMessages();
  }, [grievance.id]);

  const loadChatMessages = async () => {
    setLoading(true);
    try {
      const data = await api.getMessages(grievance.id);
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !userProfile) return;
    setSending(true);
    try {
      await api.sendMessage(grievance.id, userProfile.id, newMessage.trim());
      setNewMessage('');
      loadChatMessages();
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-5 shadow-2xl flex flex-col h-[80vh] animate-in zoom-in-95 duration-150">
        {/* Chat Drawer Header */}
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base max-w-[240px] truncate">{grievance.title}</h3>
              <p className="text-xs text-slate-500">Direct Chat with Ward Member & Officers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50 rounded-xl my-3">
          {loading ? (
            <div className="text-center text-xs text-slate-400 py-8">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-xs text-slate-400 py-8">No messages yet. Send a message to start conversation.</div>
          ) : (
            messages.map((m) => {
              const isMine = m.sender === userProfile?.id;
              const senderRole = m.sender_details?.role;
              const isOfficer = senderRole === 'ward_member' || senderRole === 'ward_admin';
              return (
                <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-xs ${
                    isMine
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : isOfficer
                      ? 'bg-blue-600 text-white rounded-bl-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                  }`}>
                    <div className="font-bold text-[10px] opacity-80 mb-0.5 flex items-center space-x-1">
                      <span>{m.sender_details?.full_name || 'User'}</span>
                      {isOfficer && <ShieldCheck className="w-3 h-3 text-amber-300" />}
                    </div>
                    <p className="leading-relaxed">{m.message}</p>
                    <span className="text-[9px] opacity-70 block mt-1 text-right">
                      {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex items-center space-x-2 pt-1">
          <input
            type="text"
            placeholder="Type message or reply in Malayalam / English..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
          />
          <button
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
