'use client';
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import { AlertTriangle, ShieldCheck, Scale, FileText, ArrowRight, ArrowLeft } from 'lucide-react';

export default function DisputeRoom({ params }: any) {
  const { lang, dir } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-6" dir={dir}>
      <div className="flex items-center gap-2">
        <Link href="/contracts" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
          {isAr ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{isAr ? 'العودة للعقود' : 'Back to Contracts'}</span>
        </Link>
      </div>

      <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-rose-500/30 shadow-2xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
            <Scale className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
              {isAr ? 'غرفة التحكيم الهندسي' : 'Engineering Dispute Room'}
            </span>
            <h1 className="text-xl font-black text-white mt-1.5">
              {isAr ? `غرفة التحكيم وفض النزاع #${params.id}` : `Dispute Arbitration Room #${params.id}`}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr
                ? 'نزاع بشأن العقد: تصميم هوائي مصفوفي لنطاق Ka-Band'
                : 'Dispute regarding contract: Ka-Band Phased Array Antenna Design'}
            </p>
          </div>
        </div>

        <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>
              {isAr ? 'حالة النزاع: بانتظار مراجعة الإدارة الهندسية' : 'Status: Under Technical Committee Review'}
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {isAr
              ? 'تم تجميد أموال الضمان Escrow بصورة احترازية. يقوم مهندس محايد من فريق المنصة بمراجعة ملفات التصميم ومحاكاة CST المسلمة والبت في تحرير المستحقات خلال 48 ساعة.'
              : 'Escrow funds have been provisionally held. A neutral satellite systems reviewer is auditing CST simulation deliverables and will issue a binding resolution within 48 hours.'}
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link
            href="/messages"
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition border border-slate-700"
          >
            {isAr ? 'سجل محادثات العقد' : 'Contract Workroom Log'}
          </Link>
          <Link
            href="/client/dashboard"
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-xs font-black shadow-lg shadow-cyan-500/20"
          >
            {isAr ? 'لوحة التحكم' : 'Dashboard'}
          </Link>
        </div>
      </div>

      {/* Brand Footer */}
      <div className="text-center pt-6 text-[11px] text-slate-500 border-t border-slate-800/60">
        <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'} • Satcom Engineers</span>
      </div>
    </div>
  );
}