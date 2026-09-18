'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { ShieldCheck, KeyRound, Smartphone, CheckCircle2, Lock } from 'lucide-react';

export default function SecuritySettingsPage() {
  const { lang, dir } = useLanguage();
  const isAr = lang === 'ar';

  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [twoFactor, setTwoFactor] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setCurrentPwd('');
    setNewPwd('');
    setConfirmPwd('');
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8" dir={dir}>
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-black text-white">
            {isAr ? 'الأمان وتغيير كلمة المرور' : 'Security & Password Settings'}
          </h1>
        </div>
        <p className="text-xs text-slate-400">
          {isAr
            ? 'إدارة كلمة المرور، والمصادقة الثنائية (2FA)، وجلسات الدخول المعتمدة.'
            : 'Manage your password, two-factor authentication (2FA), and active login sessions.'}
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-300 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>{isAr ? 'تم تحديث إعدادات الأمان بنجاح!' : 'Security settings updated successfully!'}</span>
        </div>
      )}

      {/* Change Password Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 space-y-5 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-cyan-400" />
          <span>{isAr ? 'تحديث كلمة المرور' : 'Change Password'}</span>
        </h3>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            {isAr ? 'كلمة المرور الحالية' : 'Current Password'}
          </label>
          <input
            type="password"
            value={currentPwd}
            onChange={(e) => setCurrentPwd(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            {isAr ? 'كلمة المرور الجديدة' : 'New Password'}
          </label>
          <input
            type="password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            {isAr ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}
          </label>
          <input
            type="password"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          {isAr ? 'تحديث كلمة المرور' : 'Update Password'}
        </button>
      </form>

      {/* Two Factor Authentication (2FA) */}
      <div className="p-6 bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-sm font-bold text-white block">
              {isAr ? 'المصادقة الثنائية (2FA)' : 'Two-Factor Authentication (2FA)'}
            </span>
            <span className="text-xs text-slate-400">
              {isAr
                ? 'حماية الحساب برمز تحقق إضافي عبر الهاتف عند تسجيل الدخول'
                : 'Protect your aerospace account with an SMS or authenticator OTP code.'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setTwoFactor(!twoFactor)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
            twoFactor
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}
        >
          {twoFactor ? (isAr ? 'مفعلة ✓' : 'Enabled ✓') : (isAr ? 'معطلة' : 'Disabled')}
        </button>
      </div>

      {/* Brand Footer */}
      <div className="text-center pt-6 text-[11px] text-slate-500 border-t border-slate-800/60">
        <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'} • Satcom Engineers</span>
      </div>
    </div>
  );
}