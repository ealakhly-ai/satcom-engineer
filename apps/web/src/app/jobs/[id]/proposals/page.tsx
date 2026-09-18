'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Award, Star, CheckCircle, MessageSquare, Send, DollarSign, Shield, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';

export default function JobProposalsPage({ params }: { params: { id: string } }) {
  const { t, locale, dir } = useLanguage();
  const isAr = locale === 'ar';

  const [selectedFreelancer, setSelectedFreelancer] = useState<any>(null);
  const [offerSent, setOfferSent] = useState(false);

  const [jobTitle, setJobTitle] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('satcom_posted_jobs');
      if (saved) {
        try {
          const list = JSON.parse(saved);
          const found = list.find((j: any) => String(j.id) === String(params?.id));
          if (found) return typeof found.title === 'object' ? found.title[locale] : found.title;
        } catch (e) {}
      }
    }
    return isAr ? 'مشروع هندسي' : 'Engineering Project';
  });

  const [proposals, setProposals] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`satcom_proposals_${params.id}`);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
      const allSaved = localStorage.getItem('satcom_all_proposals');
      if (allSaved) {
        try {
          const list = JSON.parse(allSaved);
          return list.filter((p: any) => String(p.jobId) === String(params?.id));
        } catch (e) {}
      }
    }
    return [];
  });

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-${isAr ? 'right' : 'left'}`} dir={dir}>
      {/* Header */}
      <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            {isAr ? 'إدارة المتقدمين والمقابلات' : 'Applicant & Interview Management'}
          </span>
          <h1 className="text-xl font-black text-white mt-2">
            {isAr ? `العروض المقدمة لمشروع: ${jobTitle}` : `Proposals Received: ${jobTitle}`}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isAr
              ? `إجمالي العروض المستلمة: ${proposals.length} عروض`
              : `Total Proposals Received: ${proposals.length} Submissions`}
          </p>
        </div>
        <Link
          href={`/jobs/${params.id}`}
          className="px-4 py-2 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition"
        >
          {isAr ? 'عرض صفحة المشروع الأصلية' : 'View Original Job Post'}
        </Link>
      </div>

      {offerSent && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center justify-between text-emerald-300 text-sm shadow-lg">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>
              {isAr
                ? 'تم إرسال عرض العمل الرسمي بنجاح! بانتظار موافقة المهندس المستقل لبدء العقد.'
                : 'Official Job Offer sent successfully! Awaiting engineer acceptance to seal Escrow.'}
            </span>
          </div>
          <button onClick={() => setOfferSent(false)} className="text-emerald-400 text-xs font-bold underline cursor-pointer">
            {isAr ? 'إغلاق' : 'Dismiss'}
          </button>
        </div>
      )}

      {/* Proposals List */}
      <div className="space-y-6">
        {proposals.length === 0 ? (
          <div className="p-16 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/60 flex items-center justify-center mx-auto text-slate-500">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {isAr ? 'لا توجد عروض مقدمة على هذا المشروع حتى الآن' : 'No Proposals Received Yet'}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {isAr
                ? 'سيظهر هنا المهندسون المتقدمون ومقترحاتهم الفنية وميزانياتهم بمجرد تقديم عروضهم للمشروع.'
                : 'Engineers who submit proposals with their technical milestones and bids will appear here.'}
            </p>
            <div className="pt-2">
              <Link
                href="/freelancers"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5"
              >
                <span>{isAr ? 'دعوة مهندسين للمشروع' : 'Invite Engineers'}</span>
              </Link>
            </div>
          </div>
        ) : (
          proposals.map((prop) => (
          <div
            key={prop.id}
            className="p-6 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl hover:border-cyan-500/40 transition space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/10">
                  {prop.freelancer.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/freelancers/${prop.freelancer.id}`}
                      className="text-base font-black text-white hover:text-cyan-400 transition"
                    >
                      {prop.freelancer.name}
                    </Link>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[11px] font-bold border border-amber-500/30">
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>{prop.freelancer.badge === 'TOP_RATED' ? 'Top Rated' : 'Verified Expert'}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">{prop.freelancer.headline[locale]}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                    <span className="font-bold text-emerald-400 font-mono">
                      {prop.freelancer.jss}% {isAr ? 'نسبة النجاح (JSS)' : 'Job Success'}
                    </span>
                    <span>•</span>
                    <span className="font-mono">
                      {prop.freelancer.completedJobs} {isAr ? 'مشروع منجز' : 'Jobs Done'}
                    </span>
                    <span>•</span>
                    <span className="font-mono">
                      {prop.freelancer.totalEarned} {isAr ? 'أرباح' : 'Earned'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bid Details & Actions */}
              <div className="text-left md:text-right shrink-0 flex flex-col items-end gap-2">
                <div className="text-2xl font-black text-white font-mono">${prop.bidAmount}</div>
                <span className="text-xs text-slate-400">
                  {isAr ? 'المدة المقترحة: ' : 'Proposed Timeline: '}{prop.duration[locale]}
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <Link
                    href="/messages"
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
                  >
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    <span>{isAr ? 'مراسلة / مقابلة' : 'Interview'}</span>
                  </Link>
                  <button
                    onClick={() => setSelectedFreelancer(prop)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-black shadow-lg shadow-cyan-500/20 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isAr ? 'إرسال عرض عمل (Hire)' : 'Hire & Fund'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-sm text-slate-300 leading-relaxed">
              <span className="font-bold text-white block mb-1 text-xs">
                {isAr ? 'رسالة التقديم والمقترح الفني:' : 'Cover Letter & Technical Proposal:'}
              </span>
              {prop.coverLetter[locale]}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {prop.skills.map((s) => (
                <span key={s} className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-xs font-medium text-cyan-300">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
      </div>

      {/* "Send Job Offer" Modal */}
      {selectedFreelancer && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl border border-slate-800">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-black text-lg text-white">
                  {isAr ? 'إرسال عرض عمل رسمي' : 'Send Official Job Offer'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isAr ? 'إلى: ' : 'To: '}{selectedFreelancer.freelancer.name}
                </p>
              </div>
              <button onClick={() => setSelectedFreelancer(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="font-semibold block text-slate-200 mb-1">
                  {isAr ? 'المبلغ الإجمالي المتفق عليه ($)' : 'Agreed Escrow Amount ($)'}
                </label>
                <input
                  type="number"
                  defaultValue={selectedFreelancer.bidAmount}
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Escrow Protection Summary */}
              <div className="p-4 bg-cyan-950/40 rounded-2xl border border-cyan-800/40 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">{isAr ? 'قيمة مخرجات المهندس (يستلمها 100%):' : 'Engineer Payout (100% Received):'}</span>
                  <span className="font-black text-white font-mono">${selectedFreelancer.bidAmount}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>{isAr ? 'حماية الدفع المالي:' : 'Escrow Protection:'}</span>
                  <span className="text-emerald-400 font-bold">{isAr ? '100% ضمان وحماية Escrow' : '100% Escrow Protected'}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{isAr ? 'المعالجة والتسوية:' : 'Backend Settlement:'}</span>
                  <span className="text-cyan-300 font-medium">{isAr ? 'مؤتمتة بالكامل في الخلفية' : '100% Automated Backend'}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-white text-sm">
                  <span>{isAr ? 'المبلغ المعتمد في عقد الضمان:' : 'Total Milestone Deposit:'}</span>
                  <span className="text-emerald-400 font-mono">${selectedFreelancer.bidAmount}</span>
                </div>
              </div>

              <div>
                <label className="font-semibold block text-slate-200 mb-1">
                  {isAr ? 'الشروط ومراحل العمل المبدئية' : 'Milestone Terms & Deliverable Plan'}
                </label>
                <textarea
                  rows={3}
                  defaultValue={isAr ? 'المرحلة الأولى: محاكاة الهوائي على CST Studio وتسليم النتائج الأولية (50%). المرحلة الثانية: تسليم ملفات التصنيع والتقرير النهائي (50%).' : 'Milestone 1: S-parameter CST Simulation (50%). Milestone 2: Fabrication Gerber files and certified report (50%).'}
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedFreelancer(null)}
                className="px-4 py-2 border border-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={() => {
                  setSelectedFreelancer(null);
                  setOfferSent(true);
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-black shadow-lg shadow-cyan-500/20 transition cursor-pointer"
              >
                {isAr ? 'إرسال العرض وحجز الضمان' : 'Deposit Escrow & Send Offer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emadsoft Branding Tag */}
      <div className="pt-4 border-t border-slate-800/80 flex justify-center items-center text-xs text-slate-400 font-semibold gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'}</span>
      </div>
    </div>
  );
}