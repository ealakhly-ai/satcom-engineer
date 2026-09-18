'use client';

import React from 'react';
import { ShieldAlert, Inbox, CheckCircle2 } from 'lucide-react';
import { useAdminLanguage } from '../../context/AdminLanguageContext';

export default function AdminDisputes() {
  const { dir } = useAdminLanguage();

  return (
    <div className="p-6 sm:p-8 space-y-8 min-h-screen text-slate-100" dir={dir}>
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
          <ShieldAlert className="w-7 h-7 text-amber-400" />
          <span>{dir === 'rtl' ? 'مركز التحكيم وفض النزاعات الهندسية' : 'Engineering Dispute & Arbitration Center'}</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {dir === 'rtl' ? 'مراجعة أدلة التسليمات الهندسية ومطابقتها للمواصفات وإصدار القرار الملزم' : 'Review milestone technical deliverables, inspect specifications, and issue binding escrow rulings.'}
        </p>
      </div>

      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl p-16 text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
          <CheckCircle2 className="w-8 h-8 text-emerald-400/80" />
        </div>
        <h3 className="text-base font-black text-white">
          {dir === 'rtl' ? 'لا توجد نزاعات مفتوحة حالياً (0 نزاعات)' : 'Zero Active Disputes (0 Cases)'}
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          {dir === 'rtl'
            ? 'كافة العقود ومراحل العمل الهندسية تسير بتوافق تام بين العملاء والمهندسين تحت حماية نظام Escrow.'
            : 'All contracts and technical milestones are proceeding smoothly between clients and engineers under Escrow protection.'}
        </p>
      </div>
    </div>
  );
}