'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Lock, Shield, Eye, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage() {
  const { lang, dir } = useLanguage();
  const isAr = lang === 'ar';

  const sections = [
    {
      title: {
        ar: '1. تشفير وحماية الملفات الهندسية ومحاكاة CST',
        en: '1. Encryption & Engineering Data Protection',
      },
      content: {
        ar: 'يتم تشفير كافة ملفات المشاريع، ومخططات الهوائيات، ونماذج المحاكاة الهندسية باستخدام تشفير AES-256 أثناء النقل والتخزين لضمان أعلى مستويات الأمان الصناعي والفضائي.',
        en: 'All engineering design repositories, CST simulation files, and aerospace schematics are encrypted with industry-grade AES-256 both in transit and at rest.',
      },
    },
    {
      title: {
        ar: '2. سرية الهوية وبيانات التوثيق المهني',
        en: '2. Identity Confidentiality & Verification Data',
      },
      content: {
        ar: 'وثائق الهوية وجوازات السفر المستخدمة في التحقق من حسابات المهندسين تُعالج وفق أعلى معايير الخصوصية الدولية ولا يتم مشاركتها إطلاقاً مع أطراف خارجية.',
        en: 'Passports and government IDs uploaded for identity verification are processed with strict data minimization standards and never shared with third parties.',
      },
    },
    {
      title: {
        ar: '3. أمان المعاملات المالية وبوابات الدفع',
        en: '3. Financial Data & Payment Security',
      },
      content: {
        ar: 'لا تقوم منصة Satcom Engineers بتخزين أرقام البطاقات الائتمانية أو الحسابات البنكية محلياً؛ تتم كافة العمليات عبر بوابات دولية مشفرة ومتوافقة مع معايير PCI-DSS.',
        en: 'Satcom Engineers does not store raw credit card credentials. All transactions are securely routed through PCI-DSS certified international payment partners.',
      },
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8" dir={dir}>
      <div className="text-center space-y-2 border-b border-slate-800 pb-6">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-white">
          {isAr ? 'سياسة الخصوصية وحماية البيانات الفضائية' : 'Privacy Policy & Data Protection'}
        </h1>
        <p className="text-xs text-slate-400">
          {isAr
            ? 'نلتزم بحماية سرية المشاريع الهندسية، وبيانات الهوية، والأمان المالي'
            : 'Committed to safeguarding satellite project confidentiality, identity records, and financial data.'}
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className="p-6 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 space-y-2 shadow-lg"
          >
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>{sec.title[lang]}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {sec.content[lang]}
            </p>
          </div>
        ))}
      </div>

      {/* Brand Footer */}
      <div className="text-center pt-6 text-[11px] text-slate-500 border-t border-slate-800/60">
        <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'} • Satcom Engineers</span>
      </div>
    </div>
  );
}