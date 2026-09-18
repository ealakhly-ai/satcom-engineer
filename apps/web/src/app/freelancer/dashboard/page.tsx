'use client';

import React from 'react';
import Link from 'next/link';
import {
  Satellite,
  DollarSign,
  CheckCircle2,
  Clock,
  Briefcase,
  Star,
  ShieldCheck,
  Send,
  Upload,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export default function FreelancerDashboard() {
  const { t, locale, dir } = useLanguage();

  const isAr = locale === 'ar';

  const [currentTasks, setCurrentTasks] = React.useState<any[]>([]);

  const engineerStats = [
    {
      label: isAr ? 'صافي الأرباح المحصلة' : 'Net Payouts Received',
      val: '$0.00',
      sub: isAr ? 'كامل المبلغ 100% دون خصم' : '100% full payout (0% cut)',
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/60 border border-emerald-500/30',
      icon: DollarSign,
    },
    {
      label: isAr ? 'العقود النشطة قيد العمل' : 'Active Contracts',
      val: String(currentTasks.length),
      sub: isAr ? 'أموالها مؤمنة في Escrow' : 'Funds secured in Escrow',
      color: 'text-cyan-400',
      bg: 'bg-cyan-950/60 border border-cyan-500/30',
      icon: Satellite,
    },
    {
      label: isAr ? 'تقييم الجودة والاعتماد' : 'Client Rating',
      val: isAr ? 'جديد' : 'New',
      sub: isAr ? 'مهندس معتمد في Satcom & RF' : 'Verified RF & Satcom Expert',
      color: 'text-amber-400',
      bg: 'bg-amber-950/60 border border-amber-500/30',
      icon: Star,
    },
    {
      label: isAr ? 'العروض قيد التفاوض' : 'Pending Proposals',
      val: '0',
      sub: isAr ? 'مشاريع محطات أرضية وهوائيات' : 'Ground Station & SDR Projects',
      color: 'text-indigo-400',
      bg: 'bg-indigo-950/60 border border-indigo-500/30',
      icon: Briefcase,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" dir={dir}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-2xl hover:border-emerald-500/30 transition">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? 'حساب مهندس معتمد • ضمان استلام 100% من الأتعاب' : 'Verified Engineer Profile • 100% Payout Guaranteed'}</span>
          </div>
          <h1 className="text-2xl font-black text-white">{t('engineerDashTitle')}</h1>
          <p className="text-xs text-slate-400 mt-1">{t('engineerDashSub')}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition"
          >
            <Send className="w-4 h-4" />
            <span>{t('exploreJobs')}</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {engineerStats.map((st, idx) => {
          const IconComponent = st.icon;
          return (
            <div key={idx} className="p-6 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl hover:border-cyan-500/40 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400">{st.label}</span>
                <div className={`w-9 h-9 rounded-xl ${st.bg} ${st.color} flex items-center justify-center`}>
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-black text-white">{st.val}</div>
              <div className="text-[11px] text-slate-400 mt-1">{st.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Active Engineering Contracts */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl p-6 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-800/80">
          <div>
            <h2 className="text-lg font-black text-white">
              {isAr ? 'عقودك الهندسية الجارية' : 'Your Active Engineering Contracts'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr ? 'جميع المبالغ الموضحة مضمونة ومحجوزة في Escrow وتتسلمها كاملة دون أي اقتطاع' : 'All milestone payments are secured in Escrow and paid out in full (0% platform cut)'}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
            {isAr ? 'حماية Escrow بنسبة 100%' : '100% Escrow Protected'}
          </span>
        </div>

        <div className="space-y-4">
          {currentTasks.length === 0 ? (
            <div className="p-16 text-center rounded-2xl border border-dashed border-slate-800 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg">
                <Satellite className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white">
                {isAr ? 'لا توجد عقود نشطة حالياً' : 'No Active Contracts Yet'}
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                {isAr
                  ? 'تصفح المشاريع المتاحة في سوق العمل الفضائي، وقدم عروضك الفنية للتعاقد واستلام مستحقاتك المضمونة في Escrow.'
                  : 'Browse available satcom and RF engineering jobs, submit technical proposals, and secure contracts with 100% Escrow.'}
              </p>
              <div className="pt-2">
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'استكشاف المشاريع وتقديم العروض' : 'Explore Jobs & Send Proposals'}</span>
                </Link>
              </div>
            </div>
          ) : (
            currentTasks.map((task) => (
              <div key={task.id} className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800/50 hover:border-cyan-500/30 transition space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-white">{task.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="font-bold text-cyan-300">{task.client}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{task.deadline}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right sm:text-left">
                    <span className="text-lg font-black text-emerald-400">{task.budget}</span>
                    <span className="block text-[10px] text-emerald-300 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30 mt-0.5">
                      {task.escrowStatus}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 font-medium">
                  <span className="font-bold text-white">{isAr ? 'المرحلة المطلوبة: ' : 'Active Milestone: '}</span>
                  <span className="text-cyan-300">{task.milestone}</span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Link
                    href="/contracts"
                    className="px-4 py-2 rounded-xl border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 text-xs font-bold text-slate-300 hover:text-white transition"
                  >
                    {isAr ? 'عرض بنود العقد' : 'View Contract Terms'}
                  </Link>
                  <button
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white text-xs font-bold shadow-sm shadow-cyan-500/20 transition flex items-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تسليم مخرجات المرحلة' : 'Submit Milestone Deliverable'}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}