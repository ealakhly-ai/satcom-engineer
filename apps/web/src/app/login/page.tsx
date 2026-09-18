'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LogIn, 
  Globe, 
  Lock, 
  Mail, 
  UserPlus
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function LoginPage() {
  const router = useRouter();
  const { t, locale, toggleLocale, dir } = useLanguage();
  const isAr = locale === 'ar';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email.includes('admin')) {
        window.location.href = 'http://localhost:3001';
      } else if (email.includes('engineer') || email.includes('freelancer')) {
        router.push('/freelancer/dashboard');
      } else {
        try {
          if (typeof window !== 'undefined') {
            const rawName = email.split('@')[0].replace(/[._-]/g, ' ');
            const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
            localStorage.setItem('satcom_client_profile', JSON.stringify({
              name: displayName || (isAr ? 'صاحب العمل' : 'Enterprise Client'),
              companyAr: 'المؤسسة الهندسية المعتمدة',
              companyEn: 'Enterprise Space Telecom Ltd',
              email: email,
              tierAr: 'حساب مؤسسي معتمد (Enterprise Gold)',
              tierEn: 'Enterprise Gold Certified Client',
              phone: '+966 50 000 0000',
              currency: 'USD ($)',
              twoFactor: true,
            }));
          }
        } catch (err) {}
        router.push('/client/dashboard');
      }
    }, 500);
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center px-4 py-12 bg-transparent" dir={dir}>
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-slate-800 shadow-2xl p-8 space-y-6 hover:border-cyan-500/30 transition duration-300">
        
        {/* Top Header with Brand Logo & Language Switcher */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg border border-cyan-500/40 bg-[#070b19] flex-shrink-0 p-0.5">
              <img src="/logo.png" alt="Satcom Engineers" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white leading-tight">Satcom Engineers</h2>
              <span className="text-[10px] text-cyan-300 font-bold bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/40">
                GLOBAL SATELLITE & SPACE NETWORK
              </span>
            </div>
          </div>

          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 hover:border-cyan-400 bg-slate-800/80 text-cyan-200 text-xs font-bold transition cursor-pointer shadow-xs"
            title="تبديل اللغة / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('switchLang')}</span>
          </button>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-xl font-black text-white">{t('loginTitle')}</h1>
          <p className="text-xs text-slate-400">{t('loginSubtitle')}</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {t('emailLabel')}
            </label>
            <div className="relative">
              <Mail className={`w-4 h-4 text-slate-400 absolute top-3.5 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={`w-full py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs text-white bg-slate-950/80 placeholder-slate-500 ${
                  dir === 'rtl' ? 'pr-9 pl-3' : 'pl-9 pr-3'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {t('passwordLabel')}
            </label>
            <div className="relative">
              <Lock className={`w-4 h-4 text-slate-400 absolute top-3.5 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs text-white bg-slate-950/80 placeholder-slate-500 ${
                  dir === 'rtl' ? 'pr-9 pl-3' : 'pl-9 pr-3'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-400" />
              <span>{t('rememberMe')}</span>
            </label>
            <Link href="/forgot-password" className="text-cyan-400 hover:text-cyan-300 font-medium">
              {t('forgotPassword')}
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black rounded-xl text-xs shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? (isAr ? 'جاري التحقق...' : 'Signing in...') : t('signInBtn')}</span>
          </button>
        </form>

        {/* Link to Register */}
        <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
          <span>{t('noAccount')} </span>
          <Link href="/register" className="text-cyan-400 font-bold hover:underline inline-flex items-center gap-1">
            <UserPlus className="w-3.5 h-3.5" />
            <span>{t('signUp')}</span>
          </Link>
        </div>

      </div>
    </div>
  );
}