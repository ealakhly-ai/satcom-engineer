'use client';
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Upload, CheckCircle2, Award, FileText } from 'lucide-react';

export default function VerifyIdentityPage() {
  const { lang, dir } = useLanguage();
  const isAr = lang === 'ar';

  const [docType, setDocType] = useState('PASSPORT');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8" dir={dir}>
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold border border-cyan-500/30 mb-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>{isAr ? 'توثيق الهوية المهنية (Identity Verification)' : 'Professional Identity Verification'}</span>
        </div>
        <h1 className="text-2xl font-black text-white">
          {isAr ? 'توثيق الحساب للحصول على شارة المهندس المعتمد' : 'Verify Account for Verified Expert Badge'}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {isAr
            ? 'يزيد توثيق الهوية من فرصة قبول عروضك بنسبة 80% ويمنحك شارة "Verified Expert" الرسمية.'
            : 'Identity verification increases proposal acceptance by 80% and awards the official "Verified Expert" badge.'}
        </p>
      </div>

      {submitted ? (
        <div className="p-8 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-emerald-500/40 shadow-2xl text-center space-y-3">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-black text-white">
            {isAr ? 'تم التحقق من الوثائق ومنح الشارة بنجاح!' : 'Documents Verified & Badge Awarded Successfully!'}
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            {isAr
              ? 'أصبح ملفك الشخصي يحمل الآن شارة التوثيق الرسمية بجانب تقييمك المهني في المنصة.'
              : 'Your profile now proudly features the official verified badge alongside your engineering track record.'}
          </p>
        </div>
      ) : (
        <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300">
              {isAr ? 'اختر نوع الوثيقة الرسمية' : 'Select Official Document Type'}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'PASSPORT', labelAr: 'جواز سفر', labelEn: 'Passport' },
                { id: 'NATIONAL_ID', labelAr: 'هوية وطنية', labelEn: 'National ID' },
                { id: 'DRIVING_LICENSE', labelAr: 'رخصة قيادة', labelEn: "Driver's License" },
              ].map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => setDocType(doc.id)}
                  className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    docType === doc.id
                      ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/15'
                      : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/60 text-slate-400'
                  }`}
                >
                  {isAr ? doc.labelAr : doc.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300">
              {isAr ? 'رفع صورة الوثيقة (الواجهة الأمامية)' : 'Upload Document Front Photo'}
            </label>
            <div className="p-6 border-2 border-dashed border-slate-800 bg-slate-950/40 rounded-2xl text-center hover:border-cyan-500/50 cursor-pointer transition">
              <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <span className="text-xs text-slate-200 font-bold block">
                {isAr ? 'اسحب وأفلت صورة الوثيقة أو اضغط للاختيار' : 'Drag & drop document scan or browse files'}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">JPG, PNG, PDF ({isAr ? 'حتى 10 ميجابايت' : 'up to 10MB'})</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300">
              {isAr ? 'التحقق من الوجه (صورة سيلفي مباشرة)' : 'Biometric Liveness Check (Live Selfie)'}
            </label>
            <div className="p-6 border border-slate-800 rounded-2xl bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xl">📸</div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {isAr ? 'فحص مطابقة الوجه الذاتي' : 'Automated Face Matching'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {isAr ? 'تأكد من وضوح الإضاءة وعدم ارتداء نظارات شمسية' : 'Ensure good lighting and avoid sunglasses'}
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-bold transition cursor-pointer">
                {isAr ? 'التقاط صورة' : 'Take Photo'}
              </button>
            </div>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-black shadow-xl shadow-cyan-500/20 transition cursor-pointer"
          >
            {isAr ? 'إرسال الوثائق والتوثيق الفوري' : 'Submit Documents & Verify Now'}
          </button>
        </div>
      )}

      {/* Brand Footer */}
      <div className="text-center pt-6 text-[11px] text-slate-500 border-t border-slate-800/60">
        <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'} • Satcom Engineers</span>
      </div>
    </div>
  );
}