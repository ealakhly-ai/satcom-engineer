'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ContractsIndex() {
  const { t, locale, dir } = useLanguage();
  const isAr = locale === 'ar';

  const [contracts, setContracts] = useState<any[]>([]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('satcom_contracts');
        if (saved) {
          setContracts(JSON.parse(saved));
        }
      }
    } catch (e) {}
  }, []);

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className={`max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8 text-${isAr ? 'right' : 'left'}`} dir={dir}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-cyan-400" />
            <span>{isAr ? 'سجل العقود والاتفاقيات الهندسية' : 'Engineering Contracts & Agreements Vault'}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isAr
              ? 'إدارة ومتابعة كافة عقود ومشاريع الضمان المالي Escrow ومراحل الإنجاز بأمان واحترافية'
              : 'Oversee and inspect 100% Escrow protected aerospace milestone contracts'}
          </p>
        </div>
        <Link
          href="/jobs"
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-black shadow-lg shadow-cyan-500/20 transition self-start sm:self-auto"
        >
          {isAr ? 'تصفح المشاريع الجديدة' : 'Explore Open Projects'}
        </Link>
      </div>

      <div className="space-y-4">
        {contracts.length === 0 ? (
          <div className="p-16 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">
              {isAr ? 'لا توجد عقود نشطة حالياً' : 'No Active Contracts Found'}
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              {isAr
                ? 'لم يتم بدء أي عقود حتى الآن. ابدأ بالتعاقد على المشاريع أو قبول العروض لتفعيل حساب الضمان Escrow.'
                : 'No contracts have been started yet. Hire an engineer or accept a proposal to initiate an Escrow contract.'}
            </p>
            <div className="pt-2">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition"
              >
                <span>{isAr ? 'استكشاف المشاريع والتعاقد' : 'Explore Projects to Hire'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>
        ) : (
          contracts.map((c) => (
            <div
              key={c.id}
              className="p-6 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl hover:border-cyan-500/40 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-cyan-400 text-xs font-bold">{c.id}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
                    {c.type?.[locale] || c.type || (isAr ? 'سعر ثابت' : 'Fixed-Price')}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                    {c.status?.[locale] || c.status || (isAr ? 'نشط في Escrow' : 'Active in Escrow')}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug">{c.title?.[locale] || c.title}</h3>
                <p className="text-xs text-slate-400">
                  {isAr ? 'العميل: ' : 'Client: '}
                  <span className="text-slate-200 font-semibold">{c.client}</span>
                  {' • '}
                  {isAr ? 'المهندس: ' : 'Engineer: '}
                  <span className="text-slate-200 font-semibold">{c.freelancer}</span>
                </p>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
                <div className={`text-${isAr ? 'right' : 'left'}`}>
                  <div className="text-xl font-black text-white font-mono">${c.amount}</div>
                  <div className="text-[11px] text-emerald-400 font-bold">
                    {isAr ? 'نسبة الإنجاز: ' : 'Progress: '}{c.progress || '0%'}
                  </div>
                </div>

                <Link
                  href={`/contracts/${c.id}`}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white rounded-xl text-xs font-bold border border-slate-700 transition flex items-center gap-1.5"
                >
                  <span>{isAr ? 'تفاصيل العقد والمراحل' : 'Contract Milestones'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))
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