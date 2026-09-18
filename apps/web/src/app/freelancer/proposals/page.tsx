'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import { Send, Clock, ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';

export default function FreelancerProposalsPage() {
  const { lang, dir } = useLanguage();
  const isAr = lang === 'ar';

  const [proposals, setProposals] = useState<any[]>([]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8" dir={dir}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Send className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white">
              {isAr ? 'عروضي الهندسية المقدمة' : 'My Submitted Proposals'}
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            {isAr
              ? 'متابعة حالة العروض الهندسية المقدمة للمشاريع الفضائية، والمقابلات الجارية، والعقود المعتمدة.'
              : 'Track active proposals submitted to satellite and aerospace projects, client interviews, and active contracts.'}
          </p>
        </div>

        <Link
          href="/jobs"
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-black transition flex items-center gap-2 shadow-lg shadow-cyan-500/20 shrink-0"
        >
          <span>{isAr ? 'تصفح المشاريع المتاحة' : 'Browse Available Jobs'}</span>
          {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </Link>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {proposals.length === 0 ? (
          <div className="p-16 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg">
              <Send className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">
              {isAr ? 'لا توجد عروض مقدمة حالياً' : 'No Submitted Proposals Yet'}
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              {isAr
                ? 'لم تقم بتقديم أي عروض هندسية حتى الآن. ابدأ بتصفح المشاريع الفضائية المفتوحة وقدم عرضك الفني.'
                : 'You have not submitted any proposals yet. Browse open satcom projects and send your technical bid.'}
            </p>
            <div className="pt-2">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition"
              >
                <span>{isAr ? 'تصفح المشاريع وتقديم عرض' : 'Browse Jobs & Submit Bid'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>
        ) : (
          proposals.map((p) => (
            <div
              key={p.id}
              className="p-6 bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      {p.status[lang]}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {p.submittedAt[lang]}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {p.jobTitle[lang]}
                  </h3>
                  <p className="text-xs text-slate-400">{p.client[lang]}</p>
                </div>

                <div className="text-right sm:text-left shrink-0">
                  <span className="text-xs text-slate-400 block">{isAr ? 'قيمة العرض المقدم' : 'Bid Amount'}</span>
                  <span className="text-xl font-black text-cyan-400 font-mono">{p.bidAmount}</span>
                  <span className="text-[11px] text-slate-500 block">{p.duration[lang]}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {isAr
                      ? '100% حماية الدفعة بحساب الضمان Escrow دون أي استقطاعات نسبية'
                      : '100% Escrow Protection with zero percentage cuts'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {p.contractId ? (
                    <Link
                      href={`/contracts/${p.contractId}`}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-md shadow-cyan-500/20"
                    >
                      <span>{isAr ? 'فتح غرفة العقد و Escrow' : 'Open Contract & Escrow'}</span>
                      {isAr ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </Link>
                  ) : (
                    <Link
                      href="/messages"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{isAr ? 'مراسلة العميل' : 'Message Client'}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Brand Footer */}
      <div className="text-center pt-6 text-[11px] text-slate-500 border-t border-slate-800/60">
        <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'} • Satcom Engineers</span>
      </div>
    </div>
  );
}