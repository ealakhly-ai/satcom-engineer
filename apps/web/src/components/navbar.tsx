'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, 
  Users, 
  LogIn, 
  Globe, 
  LayoutDashboard, 
  Search, 
  PlusCircle, 
  MessageSquare, 
  FileText, 
  ArrowLeftRight,
  Bell,
  ChevronDown,
  Shield,
  UserPlus
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const router = useRouter();
  const { t, locale, toggleLocale, dir } = useLanguage();
  const [role, setRole] = useState<'freelancer' | 'client'>('client');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleRole = () => {
    const nextRole = role === 'client' ? 'freelancer' : 'client';
    setRole(nextRole);
    if (nextRole === 'freelancer') {
      router.push('/freelancer/dashboard');
    } else {
      router.push('/client/dashboard');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 transition-all text-white">
      {/* Main Top Nav Bar */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Navigation Links */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          <Link href="/" className="flex items-center gap-3 text-white font-bold text-xl tracking-tight group flex-shrink-0">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-cyan-500/20 border-2 border-cyan-400/50 bg-[#070c18] flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
              <img src="/logo.png" alt="Satcom Engineers" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black text-white tracking-tight leading-tight text-xl">Satcom Engineers</span>
                <span className="text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-400/30 hidden lg:inline-block">
                  SPACE & RF
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:block">
                {t('brandSubtitle')}
              </span>
            </div>
          </Link>

          {/* Primary Nav Items */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-sm font-semibold text-slate-300 whitespace-nowrap shrink-0">
            <Link 
              href="/jobs" 
              className="hover:text-cyan-400 transition flex items-center gap-1 py-2 px-1 hover:border-b-2 hover:border-cyan-400"
            >
              <span>{t('navJobs')}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <Link 
              href="/freelancers" 
              className="hover:text-cyan-400 transition flex items-center gap-1 py-2 px-1 hover:border-b-2 hover:border-cyan-400"
            >
              <span>{t('navFreelancers')}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <Link 
              href="/pricing" 
              className="hover:text-cyan-400 transition flex items-center gap-1.5 py-2 px-1 hover:border-b-2 hover:border-cyan-400"
            >
              <span>{t('navPricing')}</span>
            </Link>

            <Link 
              href="/client/dashboard" 
              className="hover:text-cyan-400 transition flex items-center gap-1.5 py-2 px-1 hover:border-b-2 hover:border-cyan-400"
            >
              <span>{t('navMyJobs')}</span>
            </Link>

            <a 
              href="http://localhost:3001" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-300 hover:text-cyan-400 transition flex items-center gap-1.5 py-2 px-1 hover:border-b-2 hover:border-cyan-400 group"
              title={locale === 'ar' ? 'لوحة الإدارة العليا (تتطلب اسم المدير وكلمة المرور)' : 'Admin Portal (Requires Admin Credentials)'}
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400 group-hover:text-cyan-400 transition" />
              <span>{t('navAdmin')}</span>
            </a>
          </nav>
        </div>

        {/* Center: Global Search Bar (Shown on large screens without crowding) */}
        <div className="hidden 2xl:flex items-center flex-1 max-w-xs mx-3 shrink">
          <form onSubmit={handleSearch} className="w-full relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholderHeader')}
              className={`w-full py-2 rounded-full border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs bg-slate-800/80 text-white placeholder-slate-400 transition-all ${
                dir === 'rtl' ? 'pr-9 pl-14' : 'pl-9 pr-14'
              }`}
            />
            <Search className={`w-4 h-4 text-slate-400 absolute top-2.5 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} />
            <button
              type="submit"
              className={`absolute top-1 py-1 px-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full text-[10px] font-bold transition ${
                dir === 'rtl' ? 'left-1' : 'right-1'
              }`}
            >
              {locale === 'ar' ? 'بحث' : 'Go'}
            </button>
          </form>
        </div>

        {/* Right: Actions, Persona Switcher, Language & Profile */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Persona Switcher */}
          <button
            onClick={toggleRole}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 hover:border-cyan-400/50 bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-bold transition shadow-xs cursor-pointer"
            title="Switch Persona / تبديل الدور"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-400" />
            <span>{role === 'client' ? t('switchToFreelancer') : t('switchToClient')}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 hover:border-cyan-400/50 bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-bold transition shadow-xs cursor-pointer"
            title="Switch Language / تبديل اللغة"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('switchLang')}</span>
          </button>

          {/* Post a Job Button */}
          <Link
            href="/post-job"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-extrabold shadow-md shadow-cyan-500/20 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('navPostJob')}</span>
          </Link>

          {/* Sign In */}
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition"
          >
            <LogIn className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('navLogin')}</span>
          </Link>

          {/* Sign Up / Register */}
          <Link
            href="/register"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-extrabold shadow-md shadow-cyan-500/20 transition"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{locale === 'ar' ? 'تسجيل جديد' : 'Sign Up'}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}