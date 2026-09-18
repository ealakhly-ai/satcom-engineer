'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Paperclip, CheckCircle2, ShieldCheck, DollarSign, Sparkles, MessageSquare, ArrowLeft, ArrowRight, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function MessagesHub() {
  const { t, locale, dir } = useLanguage();
  const isAr = locale === 'ar';

  const [chats, setChats] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const handleSend = () => {
    if (!messageInput.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: 'me',
        text: { ar: messageInput, en: messageInput },
        time: isAr ? 'الآن' : 'Just now',
      },
    ]);
    setMessageInput('');
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-${isAr ? 'right' : 'left'}`} dir={dir}>
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
        {/* Left: Chat List */}
        <div className="lg:col-span-4 border-l border-slate-800 flex flex-col h-full bg-slate-950/40">
          <div className="p-4 border-b border-slate-800">
            <h2 className="font-black text-white text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span>{isAr ? 'المحادثات الهندسية المباشرة' : 'Direct Engineering Channels'}</span>
            </h2>
            <input
              type="text"
              placeholder={isAr ? 'ابحث في المحادثات الهندسية...' : 'Search direct conversations...'}
              className="mt-3 w-full p-2.5 rounded-xl border border-slate-800 text-xs bg-slate-900/90 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-slate-800/60 p-4">
            {chats.length === 0 ? (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <MessageSquare className="w-8 h-8 mx-auto text-slate-600" />
                <p className="text-xs font-bold text-slate-400">{isAr ? 'لا توجد محادثات جارية' : 'No Active Chats'}</p>
                <p className="text-[11px] text-slate-500">{isAr ? 'ابدأ بمراسلة المهندسين عبر صفحاتهم أو العروض' : 'Message engineers from their profiles or proposals'}</p>
              </div>
            ) : (
              chats.map((c, idx) => (
                <div
                  key={c.id || idx}
                  onClick={() => setActiveChat(idx)}
                  className={`p-4 hover:bg-slate-800/60 cursor-pointer transition flex items-center gap-3 rounded-2xl ${activeChat === idx ? 'bg-slate-900/60 border-r-4 border-cyan-500' : ''}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-black text-cyan-400">
                    {c.avatar || 'SC'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{c.name}</h4>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{c.lastMessage}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Center: Active Chat Thread */}
        <div className="lg:col-span-5 flex flex-col h-full bg-slate-950/20">
          {activeChat === null && chats.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <div className="space-y-4 max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-white">
                  {isAr ? 'لا توجد محادثة محددة حالياً' : 'No Conversation Selected'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isAr
                    ? 'قنوات التواصل المشفرة تتيح لك التنسيق الفني الفوري ومشاركة ملفات CAD و CST Studio المحمية.'
                    : 'Encrypted communication rooms allow you to coordinate technical deliverables and share CAD / CST Studio models.'}
                </p>
                <div className="pt-2">
                  <Link
                    href="/freelancers"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md transition"
                  >
                    <Users className="w-4 h-4" />
                    <span>{isAr ? 'استكشاف المهندسين والمراسلة' : 'Browse Engineers to Message'}</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                <div>
                  <h3 className="font-bold text-sm text-white">{chats[activeChat || 0]?.name || (isAr ? 'غرفة المحادثة' : 'Chat Room')}</h3>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    {isAr ? 'متصل الآن عبر الغرفة المشفرة' : 'Encrypted Satcom Session Active'}
                  </span>
                </div>
              </div>

              {/* Messages Feed */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-start' : 'justify-end'}`}>
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                        m.sender === 'me'
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none shadow-lg shadow-cyan-500/15'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
                      }`}
                    >
                      <p>{typeof m.text === 'string' ? m.text : (m.text[locale] || m.text.ar)}</p>
                      <span className={`text-[10px] block mt-1.5 ${m.sender === 'me' ? 'text-cyan-200' : 'text-slate-400'}`}>
                        {m.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Bar */}
              <div className="p-3.5 border-t border-slate-800 bg-slate-950/60 flex items-center gap-2">
                <button className="p-2.5 text-slate-400 hover:text-cyan-400 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition">
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isAr ? 'اكتب رسالتك للمهندس / العميل...' : 'Type message to engineer / client...'}
                  className="flex-1 p-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={handleSend}
                  className="p-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl transition shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right: Contract Context Sidebar */}
        <div className="lg:col-span-3 border-r border-slate-800 p-5 bg-slate-950/40 space-y-6 overflow-y-auto">
          {activeChat !== null && chats[activeChat] ? (
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {isAr ? 'تفاصيل العقد المرتبط' : 'Associated Contract'}
              </span>
              <h4 className="text-sm font-bold text-white mt-1">
                {chats[activeChat].jobTitle || (isAr ? 'مشروع هندسي' : 'Engineering Project')}
              </h4>
            </div>
          ) : (
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {isAr ? 'حالة العقد والمشروع' : 'Contract Context'}
              </span>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {isAr ? 'لا يوجد عقد نشط مرتبط بهذه الجلسة حالياً.' : 'No active contract linked to this session.'}
              </p>
            </div>
          )}

          {/* Escrow Guarantee Explainer */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'حماية الضمان المالي 100% Escrow' : '100% Escrow Protection'}</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-normal">
              {isAr
                ? 'الأموال محجوزة بأمان حتى اعتماد المرحلة وتسليم المخرجات المتفق عليها بنجاح دون أي استقطاعات من المهندس.'
                : 'Funds are securely locked in Escrow until milestone verification. 100% payout to engineer with 0% fee.'}
            </p>
          </div>

          {/* Emadsoft Branding Tag */}
          <div className="pt-4 border-t border-slate-800/80 flex justify-center items-center text-xs text-slate-400 font-semibold gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}