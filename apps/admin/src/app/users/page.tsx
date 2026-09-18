'use client';

import React from 'react';
import { Users, Inbox, ShieldCheck } from 'lucide-react';
import { useAdminLanguage } from '../../context/AdminLanguageContext';

export default function AdminUsers() {
  const { dir } = useAdminLanguage();

  return (
    <div className="p-6 sm:p-8 space-y-8 min-h-screen text-slate-100" dir={dir}>
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
          <Users className="w-7 h-7 text-cyan-400" />
          <span>{dir === 'rtl' ? 'إدارة وتوثيق المهندسين والعملاء' : 'Talent & Client Directory Management'}</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {dir === 'rtl' ? 'فحص السجلات وتوثيق هويات المهندسين واعتماد شارات التميز (Top Rated)' : 'Verify identity documents, engineering degrees, and issue Top Rated badges.'}
        </p>
      </div>

      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl p-16 text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
          <ShieldCheck className="w-8 h-8 text-emerald-400/80" />
        </div>
        <h3 className="text-base font-black text-white">
          {dir === 'rtl' ? 'سجل المستخدمين موثق ونظيف' : 'User Verification Registry Up to Date'}
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          {dir === 'rtl'
            ? 'لا توجد حسابات قيد الحظر أو مستخدمون بانتظار التحقق اليدوي في الوقت الحالي.'
            : 'No suspended accounts or talent profiles currently awaiting manual vetting.'}
        </p>
      </div>
    </div>
  );
}