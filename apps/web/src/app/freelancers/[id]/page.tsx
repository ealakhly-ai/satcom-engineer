'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Award, Star, CheckCircle2, ShieldCheck, MapPin, Globe, Briefcase, FileCheck, DollarSign, Sparkles, UserX, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export default function FreelancerProfilePage({ params }: { params: { id: string } }) {
  const { t, locale, dir } = useLanguage();
  const isAr = locale === 'ar';

  const [profile] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('satcom_registered_freelancers');
      if (stored) {
        try {
          const list = JSON.parse(stored);
          const found = list.find((f: any) => String(f.id) === String(params?.id));
          if (found) return found;
        } catch (e) {}
      }
      const myProfile = localStorage.getItem('satcom_freelancer_profile');
      if (myProfile) {
        try {
          const parsed = JSON.parse(myProfile);
          if (String(parsed.id) === String(params?.id) || params?.id === 'me') {
            return parsed;
          }
        } catch (e) {}
      }
    }
    return null;
  });

  if (!profile) {
    return (
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-${isAr ? 'right' : 'left'}`} dir={dir}>
        <div className="bg-slate-900/90 backdrop-blur-xl p-16 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/60 flex items-center justify-center mx-auto text-slate-500">
            <UserX className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {isAr ? 'لم يتم العثور على الملف الشخصي للمهندس' : 'Engineer Profile Not Found'}
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {isAr
              ? 'لا توجد بيانات مسجلة لهذا المهندس حالياً. يمكنك تصفح دليل المهندسين المتاحين أو إنشاء حساب مهندس جديد.'
              : 'No engineer record matches this ID. You can browse verified engineers or register as a new engineer.'}
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              href="/freelancers"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition"
            >
              {isAr ? 'دليل المهندسين' : 'Engineers Directory'}
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition"
            >
              {isAr ? 'تسجيل مهندس جديد' : 'Register as Engineer'}
            </Link>
          </div>
        </div>
        {/* Emadsoft Branding Tag */}
        <div className="pt-6 border-t border-slate-800/80 mt-8 flex justify-center items-center text-xs text-slate-400 font-semibold gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'}</span>
        </div>
      </div>
    );
  }

  const pSkills: string[] = profile.skills || [];
  const pPortfolio: any[] = profile.portfolio || [];
  const pReviews: any[] = profile.reviews || [];
  const pCerts: any[] = profile.certifications || [
    {
      title: isAr ? 'شهادة التحقق والاعتماد الهندسي Satcom Verified' : 'Satcom Verified Professional Certification',
      issuer: 'Satcom Engineers Platform',
      year: '2026',
    },
  ];

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-${isAr ? 'right' : 'left'}`} dir={dir}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar (Stats & Info) */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-cyan-500/10 flex items-center justify-center text-4xl mx-auto border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20">
              🛰️
            </div>
            <div>
              <h1 className="text-xl font-black text-white">{profile.name}</h1>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30 mt-2">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Top Rated Plus</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400 block">{isAr ? 'سعر الساعة' : 'Hourly Rate'}</span>
                <span className="text-lg font-black text-cyan-400 font-mono">
                  ${profile.hourlyRate || profile.rate || '0.00'}/hr
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">{isAr ? 'معدل النجاح (JSS)' : 'Job Success'}</span>
                <span className="text-lg font-black text-emerald-400 font-mono">
                  {profile.jobSuccessScore ? `${profile.jobSuccessScore}%` : (isAr ? 'جديد' : 'New')}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400 block">{isAr ? 'إجمالي الأرباح' : 'Total Earned'}</span>
                <span className="text-base font-bold text-white font-mono">{profile.totalEarned || profile.earnings || '$0.00'}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">{isAr ? 'مشاريع مكتملة' : 'Completed Jobs'}</span>
                <span className="text-base font-bold text-white font-mono">{profile.completedJobs || profile.jobs || 0}</span>
              </div>
            </div>
          </div>

          {/* Certifications Card */}
          <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{isAr ? 'الشهادات والاعتمادات المهنية' : 'Verified Certifications'}</span>
            </h3>
            <div className="space-y-3">
              {pCerts.map((c: any, i: number) => (
                <div key={i} className="text-xs space-y-0.5 border-b border-slate-800 pb-2.5 last:border-0 last:pb-0">
                  <div className="font-bold text-slate-200">{c.title}</div>
                  <div className="text-slate-400">{c.issuer} • {c.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Bio & Headline */}
          <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <h2 className="text-xl font-black text-white leading-snug">
              {typeof profile.headline === 'object' ? profile.headline[locale] : (profile.headline || profile.title || (isAr ? 'مهندس اتصالات وفضاء معتمد' : 'Certified Satcom Engineer'))}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {typeof profile.bio === 'object' ? profile.bio[locale] : (profile.bio || (isAr ? 'مهندس اتصالات متخصص في حلول الأقمار الصناعية ومحطات الميكروويف الأرضية.' : 'Specialized aerospace and satellite communications engineer.'))}
            </p>

            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                {isAr ? 'المهارات والخبرات الفنية' : 'Engineering Skills & Toolchain'}
              </h3>
              {pSkills.length === 0 ? (
                <p className="text-xs text-slate-500">{isAr ? 'لم تتم إضافة مهارات محددة بعد.' : 'No skills listed yet.'}</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {pSkills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1.5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-xl text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Portfolio Projects */}
          <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <h3 className="text-lg font-black text-white">
              {isAr ? 'معرض الأعمال والمشاريع السابقة' : 'Featured Aerospace Engineering Deliverables'}
            </h3>
            {pPortfolio.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <span>{isAr ? 'لا توجد مشاريع مضافة في المعرض حتى الآن.' : 'No portfolio items published yet.'}</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pPortfolio.map((p: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 transition space-y-2">
                    <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-lg">
                      {typeof p.category === 'object' ? p.category[locale] : p.category}
                    </span>
                    <h4 className="text-sm font-bold text-white">{typeof p.title === 'object' ? p.title[locale] : p.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{typeof p.description === 'object' ? p.description[locale] : p.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-black text-white">
                {isAr ? `سجل التقييمات والآراء (${pReviews.length})` : `Client Feedback & Verified Endorsements (${pReviews.length})`}
              </h3>
              {pReviews.length > 0 && (
                <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>5.0 / 5.0</span>
                </div>
              )}
            </div>

            {pReviews.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                <Star className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <span>{isAr ? 'لا توجد تقييمات مسجلة بعد لهذا المهندس.' : 'No client reviews recorded yet.'}</span>
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                {pReviews.map((r: any, idx: number) => (
                  <div key={idx} className="py-4 space-y-2 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-white">{typeof r.project === 'object' ? r.project[locale] : r.project}</span>
                      <span className="text-xs text-slate-400">{typeof r.date === 'object' ? r.date[locale] : r.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      {'★'.repeat(r.rating || 5)}
                    </div>
                    <p className="text-xs text-slate-300 italic">"{typeof r.comment === 'object' ? r.comment[locale] : r.comment}"</p>
                    <span className="text-[11px] text-slate-400 block">
                      {isAr ? 'العميل: ' : 'Client: '}{r.client}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Emadsoft Branding Tag */}
      <div className="pt-8 border-t border-slate-800/80 flex justify-center items-center text-xs text-slate-400 font-semibold gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'}</span>
      </div>
    </div>
  );
}