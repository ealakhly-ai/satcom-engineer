'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import { Briefcase, Users, PlusCircle, Clock, CheckCircle2, ChevronRight, ChevronLeft, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ClientJobsPage() {
  const { lang, dir } = useLanguage();
  const isAr = lang === 'ar';
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('satcom_posted_jobs');
        if (saved) {
          setJobs(JSON.parse(saved));
        }
      }
    } catch (e) {}
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8" dir={dir}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Briefcase className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white">
              {isAr ? 'مشاريعي المنشورة' : 'My Posted Jobs'}
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            {isAr
              ? 'إدارة المشاريع المنشورة، ومتابعة العروض المقدمة من مهندسي الاتصالات الفضائية، وإدارة المقابلات والتوظيف.'
              : 'Manage your posted aerospace jobs, review proposals from verified satellite engineers, and start contracts.'}
          </p>
        </div>

        <Link
          href="/post-job"
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-black transition flex items-center gap-2 shadow-lg shadow-cyan-500/20 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isAr ? 'نشر مشروع جديد' : 'Post a New Job'}</span>
        </Link>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="p-16 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">
              {isAr ? 'لا توجد مشاريع منشورة حالياً' : 'No Posted Jobs Yet'}
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              {isAr
                ? 'لم تقم بنشر أي مشاريع حتى الآن. ابدأ بنشر مشروعك الفضائي الأول لجذب أفضل المهندسين المعتمدين.'
                : 'You have not posted any projects yet. Post your first satcom project to attract certified space engineers.'}
            </p>
            <div className="pt-2">
              <Link
                href="/post-job"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition"
              >
                <span>{isAr ? 'نشر مشروع جديد الآن' : 'Post a New Job Now'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
                      {job.category || (isAr ? 'هندسة الفضاء والاتصالات' : 'Space & Satcom')}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {job.postedDate || (isAr ? 'مؤخراً' : 'Recently')}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      {isAr ? 'نشط ويستقبل عروض' : 'Active - Receiving Proposals'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white hover:text-cyan-300 transition">
                    {job.titleAr || job.titleEn || job.title}
                  </h3>
                </div>

                <div className="text-right sm:text-left shrink-0">
                  <span className="text-xs text-slate-400 block">{job.budgetType === 'hourly' ? (isAr ? 'عقد بالساعة' : 'Hourly') : (isAr ? 'سعر ثابت (Escrow)' : 'Fixed-Price (Escrow)')}</span>
                  <span className="text-xl font-black text-white font-mono">
                    {job.budget ? `$${job.budget}` : (job.fixedPrice ? `$${job.fixedPrice}` : (job.hourlyMin ? `$${job.hourlyMin}-$${job.hourlyMax}/hr` : '$0'))}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>
                    {isAr
                      ? `0 عروض مقدمة من مهندسين معتمدين`
                      : `0 proposals from verified engineers`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/jobs"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>{isAr ? 'عرض في سوق المشاريع' : 'View in Marketplace'}</span>
                    {isAr ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </Link>
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