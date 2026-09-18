'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t, locale, dir } = useLanguage();
  const isAr = locale === 'ar';

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 mt-20" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 text-white font-bold text-xl mb-4">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-700 bg-[#070b19] flex-shrink-0">
              <img src="/logo.png" alt="Satcom Engineers" className="w-full h-full object-cover" />
            </div>
            <span>Satcom Engineers</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-md">
            {isAr
              ? 'المنصة التخصصية الأولى للعمل الحر في مجالات هندسة الاتصالات الفضائية، شبكات الأقمار الصناعية، وأنظمة الراديو والترددات اللاسلكية.'
              : 'The premier specialized freelance marketplace for satellite communications, RF systems, and aerospace engineering.'}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full text-xs text-sky-300 border border-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {isAr
                ? 'حماية مالية متكاملة: نظام الضمان Escrow وبوابات دفع عالمية مشفرة بنسبة 100%.'
                : '100% Escrow Protection: Bank-grade encrypted global payment gateways.'}
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">
            {isAr ? 'عن المنصة' : 'About Platform'}
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <Link href="/how-it-works" className="hover:text-white transition">
                {isAr ? 'كيف تعمل المنصة' : 'How It Works'}
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-white transition">
                {isAr ? 'الضمان المالي والبوابات' : 'Escrow & Gateways'}
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-white transition">
                {isAr ? 'المدفوعات الآمنة Escrow' : 'Secure Payments'}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">
            {isAr ? 'الدعم والأمان' : 'Support & Security'}
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <Link href="/privacy" className="hover:text-white transition">
                {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition">
                {isAr ? 'شروط الاستخدام' : 'Terms of Service'}
              </Link>
            </li>
            <li>
              <Link href="/client/dashboard" className="hover:text-white transition">
                {isAr ? 'حل النزاعات والتحكيم' : 'Dispute Arbitration'}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          {isAr
            ? `جميع الحقوق محفوظة © ${new Date().getFullYear()} Satcom Engineers`
            : `All rights reserved © ${new Date().getFullYear()} Satcom Engineers`}
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-cyan-500/40 text-cyan-300 font-bold shadow-md shadow-cyan-500/10 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            {isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'}
          </span>
        </div>
      </div>
    </footer>
  );
}