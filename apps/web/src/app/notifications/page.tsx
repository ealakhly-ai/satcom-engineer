'use client';
import React, { useState } from 'react';
import { Bell, CheckCircle2, ShieldCheck, DollarSign, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function NotificationsPage() {
  const { t, locale, dir } = useLanguage();
  const isAr = locale === 'ar';

  const [notifications, setNotifications] = useState<any[]>([]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className={`max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-6 text-${isAr ? 'right' : 'left'}`} dir={dir}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-cyan-400" />
            <span>{isAr ? 'مركز الإشعارات والتنبيهات' : 'Mission Notifications Center'}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isAr
              ? 'تابع مستجدات عقودك الهندسية، حركات الضمان Escrow والرسائل المباشرة'
              : 'Real-time updates on engineering contracts, Escrow vault movements, and direct messages'}
          </p>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-xs text-cyan-400 font-bold hover:underline cursor-pointer"
          >
            {isAr ? 'تحديد الكل كمقروء' : 'Mark all as read'}
          </button>
        )}
      </div>

      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl divide-y divide-slate-800/80 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mx-auto mb-4 text-slate-500">
              <Bell className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              {isAr ? 'لا توجد إشعارات جديدة' : 'No New Notifications'}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {isAr
                ? 'ستصلك هنا تنبيهات فورية عند ورود عروض جديدة، اعتماد دفعات الضمان (Escrow)، أو استلام رسائل من المهندسين والعملاء.'
                : 'You will receive real-time alerts when new proposals arrive, Escrow milestones are funded or released, or new messages are received.'}
            </p>
          </div>
        ) : (
          notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.id} className="p-5 flex items-start gap-4 hover:bg-slate-800/40 transition cursor-pointer">
                <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 ${n.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{n.title[locale]}</span>
                      {n.unread && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono">{n.time[locale]}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{n.desc[locale]}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Emadsoft Branding Tag */}
      <div className="pt-4 border-t border-slate-800/80 flex justify-center items-center text-xs text-slate-400 font-semibold gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'}</span>
      </div>
    </div>
  );
}