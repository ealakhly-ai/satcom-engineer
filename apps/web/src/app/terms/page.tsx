'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Scale, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  const { lang, dir } = useLanguage();
  const isAr = lang === 'ar';

  const sections = [
    {
      title: {
        ar: '1. نظام الضمان المالي 100% Escrow وحماية الحقوق',
        en: '1. 100% Escrow Protection & Financial Security',
      },
      content: {
        ar: 'تلتزم منصة Satcom Engineers بحجز كامل قيمة العقد في حساب ضمان Escrow قبل بدء المهندس في العمل. لا يتم تحرير الدفعة إلا بعد مراجعة وموافقة صاحب العمل على مخرجات التصميم والمحاكاة الهندسية.',
        en: 'Satcom Engineers securely holds 100% of contract milestone funds in Escrow prior to work kickoff. Funds are strictly released upon client verification and approval of design simulations and engineering deliverables.',
      },
    },
    {
      title: {
        ar: '2. رسوم المنصة الثابتة (Flat $50 Fee)',
        en: '2. Flat $50 Platform Fee Structure',
      },
      content: {
        ar: 'تعتمد المنصة رسماً ثابتاً قدره 50 دولاراً فقط لكل عقد معتمد. يحصل المهندس المستقل على 100% من أتعابه المتفق عليها بدون أي خصومات أو نسب مئوية خفية.',
        en: 'The platform operates on a transparent flat $50 platform fee per funded contract. Freelance engineers retain 100% of their proposal earnings with zero percentage cuts.',
      },
    },
    {
      title: {
        ar: '3. حقوق الملكية الفكرية والسرية الفضائية (IP & NDA)',
        en: '3. Intellectual Property & Space-Grade NDA',
      },
      content: {
        ar: 'تنتقل كافة حقوق الملكية الفكرية لملفات التصميم، وملفات CAD/CST Studio، ومحاكاة ميزانية الوصلة تلقائياً لصاحب العمل بمجرد تحرير الدفعة كاملة، مع التزام تام بالسرية المهنية.',
        en: 'Full intellectual property rights for CAD models, CST simulation files, Link Budget models, and firmware transfer unconditionally to the client upon milestone payout release under comprehensive NDA protection.',
      },
    },
    {
      title: {
        ar: '4. التحكيم الهندسي وفض النزاعات التقنية',
        en: '4. Specialized Technical Arbitration',
      },
      content: {
        ar: 'في حال نشوء أي خلاف حول مخرجات العمل، يتم إحالة العقد لغرفة التحكيم الهندسي المتخصصة حيث يقوم مهندس أنظمة اتصالات فضائية معتمد ومحايد بفحص المخرجات والبت في غضون 48 ساعة.',
        en: 'Should any dispute arise regarding technical deliverables, the contract is escalated to the Engineering Arbitration Room, where a certified neutral satcom specialist conducts an audit and issues a binding resolution within 48 hours.',
      },
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8" dir={dir}>
      <div className="text-center space-y-2 border-b border-slate-800 pb-6">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Scale className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-white">
          {isAr ? 'شروط الخدمة والاتفاقية الهندسية' : 'Terms of Service & Engineering Agreement'}
        </h1>
        <p className="text-xs text-slate-400">
          {isAr
            ? 'القواعد المنظمة للتعاملات الهندسية، وحساب الضمان Escrow، وحماية الملكية الفكرية'
            : 'Governing framework for aerospace contracts, Escrow fund safety, and intellectual property.'}
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className="p-6 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 space-y-2 shadow-lg"
          >
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
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