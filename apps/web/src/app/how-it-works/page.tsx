'use client';
import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles,
  Satellite,
  Lock,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function HowItWorksPage() {
  const { t, locale, dir } = useLanguage();
  const isAr = locale === 'ar';

  const steps = [
    {
      num: '01',
      icon: Briefcase,
      title: {
        ar: 'انشر مشروعك الهندسي بالمواصفات الفنية',
        en: 'Publish Job with Technical Specifications',
      },
      desc: {
        ar: 'حدد متطلبات التردد (Ka/Ku/X Band)، برمجيات المحاكاة المطلوبة (CST Studio, MATLAB, HFSS)، وجدول المراحل الهندسية.',
        en: 'Specify RF band requirements, simulation tools (CST Studio, MATLAB, HFSS), and deliverable milestones.',
      },
    },
    {
      num: '02',
      icon: Users,
      title: {
        ar: 'اختر من بين نخبة مهندسي الفضاء المعتمدين',
        en: 'Select from Vetted Satcom Talent',
      },
      desc: {
        ar: 'استعرض عروض المهندسين المتخصصين، سوابق أعمالهم ومخططات الإشعاع ونتائج S-Parameters السابقة وتواصل معهم فوراً.',
        en: 'Review specialized proposals, verified RF portfolios, radiation patterns, and message engineers directly.',
      },
    },
    {
      num: '03',
      icon: Lock,
      title: {
        ar: 'تأمين أموال العقود في حساب الضمان 100% Escrow',
        en: 'Fund Contract via 100% Escrow Vault',
      },
      desc: {
        ar: 'قم بتمويل مرحلة العمل في حساب الضمان المالي الآمن. تظل الأموال محجوزة ولا تُصرف للمهندس إلا بعد اعتمادك للمخرجات.',
        en: 'Deposit milestone funds safely into Escrow. Funds are secured and only released upon your explicit sign-off.',
      },
    },
    {
      num: '04',
      icon: CheckCircle2,
      title: {
        ar: 'استلام المخرجات، الاعتماد، وتحرير المستحقات',
        en: 'Verify Deliverables & Release Payout',
      },
      desc: {
        ar: 'استلم ملفات التصنيع والتقارير الفنية، اعتمد المرحلة بنقرة واحدة لتحرير 100% من أتعاب المهندس آلياً في الخلفية.',
        en: 'Inspect simulation models and Gerber files, then release 100% payout to the engineer with automated backend execution.',
      },
    },
  ];

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className={`max-w-6xl mx-auto py-14 px-4 sm:px-6 lg:px-8 space-y-12 text-${isAr ? 'right' : 'left'}`} dir={dir}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
          <Satellite className="w-4 h-4 text-cyan-400" />
          <span>{isAr ? 'دليل تشغيل سوق العمل الهندسي الفضائي' : 'Aerospace Engineering Marketplace Guide'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {isAr ? 'كيف تعمل منصة Satcom Engineers؟' : 'How Satcom Engineers Works'}
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          {isAr
            ? 'سوق عمل تخصصي فائق الأمان يربط أصحاب المشاريع والشركات بنخبة مهندسي الأقمار الصناعية والاتصالات اللاسلكية بحماية مالية كاملة 100% عبر Escrow.'
            : 'A specialized high-assurance marketplace connecting aerospace enterprises with top satellite & RF engineers under 100% Escrow security.'}
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl hover:border-cyan-500/40 transition group relative overflow-hidden flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black font-mono text-slate-700 group-hover:text-cyan-400 transition">
                  {step.num}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                  {step.title[locale]}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc[locale]}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Escrow Guarantee Highlight */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/40 text-center space-y-4 shadow-2xl">
        <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
        <h3 className="text-xl font-bold text-white">
          {isAr ? 'حماية الضمان المالي 100% لجميع الأطراف' : '100% Escrow Assurance for Clients & Engineers'}
        </h3>
        <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {isAr
            ? 'أموال المشاريع محجوزة بأمان تام في حساب Escrow حتى فحص واعتماد النتائج الهندسية، والمهندسون يستلمون 100% من أتعابهم المحققة دون أي اقتطاعات نسبية من المنصة.'
            : 'Contract funds are locked in Escrow until deliverables pass technical verification. Engineers receive 100% of agreed earnings with zero percentage fee.'}
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <Link
            href="/post-job"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition flex items-center gap-2"
          >
            <span>{isAr ? 'انشر مشروعك الأول الآن' : 'Post Your First Job'}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
          <Link
            href="/jobs"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold rounded-xl border border-slate-700 transition"
          >
            <span>{isAr ? 'تصفح فرص العمل المتاحة' : 'Browse Open Opportunities'}</span>
          </Link>
        </div>
      </div>

      {/* Emadsoft Branding Tag */}
      <div className="pt-4 border-t border-slate-800/80 flex justify-center items-center text-xs text-slate-400 font-semibold gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'}</span>
      </div>
    </div>
  );
}