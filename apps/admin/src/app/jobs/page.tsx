'use client';

import React from 'react';
import { Briefcase, Inbox } from 'lucide-react';
import { useAdminLanguage } from '../../context/AdminLanguageContext';

export default function AdminJobs() {
  const { dir } = useAdminLanguage();

  return (
    <div className="p-6 sm:p-8 space-y-8 min-h-screen text-slate-100" dir={dir}>
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
          <Briefcase className="w-7 h-7 text-cyan-400" />
          <span>{dir === 'rtl' ? 'مراقبة وإدارة مشاريع المنصة' : 'Platform Jobs Oversight & Moderation'}</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {dir === 'rtl' ? 'مراجعة كافة المشاريع المنشورة للتأكد من مطابقتها للمعايير الهندسية والضمان المالي' : 'Audit and moderate active space & RF engineering jobs, ensuring policy compliance.'}
        </p>
      </div>

      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl p-16 text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
          <Inbox className="w-8 h-8 text-cyan-400/80" />
        </div>
        <h3 className="text-base font-black text-white">
          {dir === 'rtl' ? 'لا توجد مشاريع بحاجة لمراجعة حالياً' : 'No Flagged Jobs Under Review'}
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          {dir === 'rtl' 
            ? 'كافة المشاريع الهندسية المنشورة بواسطة العملاء تتوافق مع اشتراطات المنصة وضمان Escrow.'
            : 'All engineering jobs published by clients adhere to platform guidelines and Escrow protection.'}
        </p>
      </div>
    </div>
  );
}