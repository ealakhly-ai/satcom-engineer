'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Satellite, 
  Shield, 
  CheckCircle2, 
  DollarSign, 
  ArrowLeft, 
  ArrowRight,
  Radio, 
  Cpu, 
  Globe2, 
  CreditCard,
  Building2,
  Coins,
  Sparkles,
  Zap,
  Lock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const { t, locale, dir } = useLanguage();
  const isAr = locale === 'ar';

  return (
    <div className="space-y-20 pb-16" dir={dir}>
      
      {/* 1. HERO SECTION WITH 1:30 AM COSMIC GLOWS & RADIANT LIGHTS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#050811] via-[#0c142b] to-[#0f172a] text-white py-24 sm:py-28 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-800">
        
        {/* Ambient Lights (The 1:30 AM Signature Glow) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/30 via-cyan-500/25 to-indigo-600/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          
          {/* Central Logo & Radiant Badge */}
          <div className="flex flex-col items-center gap-5">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden ring-4 ring-cyan-400/60 shadow-2xl shadow-cyan-500/40 bg-[#070c18] hover:scale-105 transition-transform duration-300">
              <img src="/logo.png" alt="Satcom Engineers Logo" className="w-full h-full object-cover" />
            </div>

            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold shadow-lg shadow-cyan-500/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>{t('heroBadge')}</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.25]">
            {t('heroTitle1')}{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              {t('heroTitle2')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* Escrow Guarantee Glassmorphism Card */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 hover:border-cyan-500/50 rounded-3xl p-6 max-w-2xl mx-auto shadow-2xl transition-all">
            <div className="grid grid-cols-3 divide-x divide-x-reverse divide-slate-700/80 text-center">
              <div className="px-3">
                <div className="text-3xl font-black text-emerald-400 font-mono">100%</div>
                <div className="text-xs text-slate-300 mt-1 font-semibold">{isAr ? 'حماية الضمان Escrow' : '100% Escrow Protection'}</div>
              </div>
              <div className="px-3">
                <div className="text-3xl font-black text-cyan-400 font-mono">0%</div>
                <div className="text-xs text-slate-300 mt-1 font-semibold">{isAr ? 'رسوم اشتراك شهرية' : 'Zero Subscription Fees'}</div>
              </div>
              <div className="px-3">
                <div className="text-3xl font-black text-amber-400 font-mono">256-bit</div>
                <div className="text-xs text-slate-300 mt-1 font-semibold">{isAr ? 'تشفير مالي آمن' : 'Bank-Grade Security'}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/jobs"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-base shadow-xl shadow-cyan-500/25 transition transform active:scale-95 flex items-center gap-2"
            >
              <span>{t('exploreJobs')}</span>
              {dir === 'rtl' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </Link>

            <Link
              href="/post-job"
              className="px-8 py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-600 font-bold text-base transition transform active:scale-95"
            >
              <span>{t('postNewJob')}</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. GLOBAL PAYMENT GATEWAYS STRIP (Deep Space Glass) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-cyan-400 text-xs font-bold">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'حماية مشفرة ومصادقة بنكية دولية' : 'Bank-Grade Security & Escrow Protection'}</span>
            </div>
            <h3 className="text-lg font-black text-white">
              {isAr ? 'بوابات الدفع والسحب العالمية المعتمدة' : 'Accepted Global Payment & Payout Gateways'}
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200">
              <CreditCard className="w-4 h-4 text-indigo-400" />
              <span>Stripe (Visa/MC)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200">
              <Globe2 className="w-4 h-4 text-cyan-400" />
              <span>PayPal Global</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>SWIFT Wire</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>USDT Escrow</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ENGINEERING DOMAINS (1:30 AM Style Dark Hover Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-14 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-cyan-300 border border-cyan-500/30">
            {isAr ? 'مجالات التخصص الهندسي' : 'Specialized Aerospace Domains'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {isAr ? 'تغطية شاملة لفروع هندسة الاتصالات الفضائية' : 'Comprehensive Space & RF Engineering Coverage'}
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            {isAr 
              ? 'نخبة من المهندسين المعتمدين والمؤهلين للتعامل مع أكثر المشاريع تعقيداً' 
              : 'Vetted space systems architects ready to deploy on complex missions'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Satcom */}
          <div className="p-8 rounded-3xl bg-slate-900/85 border border-slate-800 shadow-xl hover:border-cyan-400/70 hover:shadow-cyan-500/10 hover:-translate-y-1.5 transition-all duration-300 space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
              🛰️
            </div>
            <h3 className="font-black text-xl text-white group-hover:text-cyan-400 transition">
              {isAr ? 'اتصالات الأقمار الصناعية (Satcom)' : 'Satellite Communications (Satcom)'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'تصميم المحطات الأرضية (Ground Stations)، محاكاة مدارات LEO/GEO، بروتوكولات DVB-S2X، وضبط هوائيات التتبع والـ VSAT.'
                : 'Ground station architecture, LEO/GEO orbital mechanics, DVB-S2X links, and telemetry tracking.'}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {['Ka-Band', 'Ku-Band', 'LEO / GEO', 'DVB-S2X'].map((t) => (
                <span key={t} className="px-2.5 py-0.5 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-800/40 text-[11px] font-bold">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: RF & Antenna */}
          <div className="p-8 rounded-3xl bg-slate-900/85 border border-slate-800 shadow-xl hover:border-amber-400/70 hover:shadow-amber-500/10 hover:-translate-y-1.5 transition-all duration-300 space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
              📡
            </div>
            <h3 className="font-black text-xl text-white group-hover:text-amber-400 transition">
              {isAr ? 'هندسة الترددات وهوائيات RF' : 'RF & Microwave Antenna Engineering'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'محاكاة وتصميم الهوائيات عبر أدوات CST و HFSS، تحليل ميزانية الوصلة (Link Budget)، وفلاتر التردد اللاسلكي والمضخمات HPA/SSPA.'
                : 'Antenna modeling in CST Studio Suite & HFSS, Link Budget calculation, and waveguide cavity filters.'}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {['CST Studio', 'Phased Array', 'Link Budget', 'HFSS'].map((t) => (
                <span key={t} className="px-2.5 py-0.5 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-800/40 text-[11px] font-bold">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: SDR & Embedded */}
          <div className="p-8 rounded-3xl bg-slate-900/85 border border-slate-800 shadow-xl hover:border-emerald-400/70 hover:shadow-emerald-500/10 hover:-translate-y-1.5 transition-all duration-300 space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <h3 className="font-black text-xl text-white group-hover:text-emerald-400 transition">
              {isAr ? 'معالجة الإشارات والراديو البرمجي (SDR)' : 'SDR & Space DSP Architecture'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'تطوير برمجيات الراديو المعرف برمجيًا (SDR)، خوارزميات معالجة الإشارات الرقمية DSP، وبرمجة متحكمات الاتصالات وFPGA.'
                : 'GNU Radio telemetry pipelines, digital signal processing (DSP), and high-throughput FPGA demodulators.'}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {['GNU Radio', 'SDR', 'DSP', 'FPGA / VHDL'].map((t) => (
                <span key={t} className="px-2.5 py-0.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 text-[11px] font-bold">
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. FINANCIAL ESCROW TRANSPARENCY CARD */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="font-black text-lg text-white">
                {isAr ? 'نموذج عقد الضمان المالي المباشر (Escrow Protection)' : 'Live Escrow Protection Example'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isAr ? 'حماية كاملة لأموال العقد بدون تعقيد، وحسابات مؤتمتة في الخلفية' : 'Full project fund protection with automated backend processing'}
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
              {isAr ? '🛡️ حماية 100% Escrow' : '🛡️ 100% Escrow Protection'}
            </span>
          </div>

          <div className="divide-y divide-slate-800 text-sm">
            <div className="p-4 flex justify-between items-center">
              <span className="text-slate-400">{isAr ? 'قيمة العقد المتفق عليها للمشروع:' : 'Agreed Project Value:'}</span>
              <span className="font-bold text-white text-base font-mono">600.00 $</span>
            </div>
            <div className="p-4 flex justify-between items-center bg-cyan-950/30">
              <span className="text-cyan-300 font-bold">
                {isAr ? 'حالة الإيداع في الضمان المالي (Escrow):' : 'Escrow Deposit Status:'}
              </span>
              <span className="font-bold text-emerald-400 text-xs">
                {isAr ? '✓ مؤمّن ومحجوز بنسبة 100%' : '✓ 100% Funded & Secured'}
              </span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-slate-300 font-bold">{isAr ? 'المعالجة المالية والفوترة:' : 'Financial Processing:'}</span>
              <span className="text-xs text-slate-400 font-medium">
                {isAr ? 'معالجة سحابية مؤتمتة بالكامل في الخلفية' : 'Fully Automated Backend Processing'}
              </span>
            </div>
            <div className="p-5 flex justify-between items-center bg-emerald-500/15 border-t border-emerald-500/30">
              <span className="text-emerald-300 font-black text-base">
                {isAr ? 'صافي ما يتسلمه المهندس المستقل (100% كامل):' : 'Net Engineer Payout (100% Full):'}
              </span>
              <span className="font-black text-emerald-400 text-2xl font-mono">600.00 $</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}