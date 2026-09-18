'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { KeyRound, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPwdPage() {
  const { lang, dir } = useLanguage();
  const isAr = lang === 'ar';

  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12" dir={dir}>
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-slate-800 shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20">
            <KeyRound className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-white">
            {isAr ? 'استعادة كلمة المرور' : 'Reset Your Password'}
          </h1>
          <p className="text-xs text-slate-400">
            {isAr
              ? 'أدخل بريدك الإلكتروني المسجل وسنرسل لك رابط إعادة تعيين كلمة المرور'
              : 'Enter your registered email and we will send a password reset link.'}
          </p>
        </div>

        {sent ? (
          <div className="p-6 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">
              {isAr ? 'تم إرسال الرابط بنجاح!' : 'Reset Link Sent Successfully!'}
            </h4>
            <p className="text-xs text-slate-300">
              {isAr
                ? 'يرجى التحقق من صندوق الوارد في بريدك الإلكتروني لتعيين كلمة المرور الجديدة.'
                : 'Please check your email inbox to proceed with creating your new password.'}
            </p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'البريد الإلكتروني المسجل' : 'Registered Email Address'}
              </label>
              <div className="relative">
                <Mail className={`w-4 h-4 text-slate-500 absolute top-3.5 ${isAr ? 'right-3.5' : 'left-3.5'}`} />
                <input
                  type="email"
                  placeholder="engineer@satcom.com"
                  className={`w-full py-2.5 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'
                  }`}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-black shadow-xl shadow-cyan-500/20 transition cursor-pointer"
            >
              {isAr ? 'إرسال رابط الاستعادة' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          <Link href="/login" className="text-cyan-400 font-bold hover:underline inline-flex items-center gap-1">
            {isAr ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{isAr ? 'العودة لصفحة تسجيل الدخول' : 'Back to Login'}</span>
          </Link>
        </div>

        {/* Brand Footer */}
        <div className="text-center pt-2 text-[11px] text-slate-500">
          <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'}</span>
        </div>
      </div>
    </div>
  );
}