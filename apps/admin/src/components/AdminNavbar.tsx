'use client';

import React from 'react';
import { Shield, ExternalLink, LogOut, Globe } from 'lucide-react';
import { useAdminLanguage } from '../context/AdminLanguageContext';

interface AdminNavbarProps {
  onLogout?: () => void;
}

export const AdminNavbar = ({ onLogout }: AdminNavbarProps = {}) => {
  const { locale, toggleLocale, t, dir } = useAdminLanguage();

  return (
    <nav className="h-16 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-40 text-white">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-950/80 border border-indigo-500/30 rounded-xl">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-black text-cyan-200">{t('missionControl')}</span>
        </div>
        <span className="hidden md:inline-block text-xs text-slate-400">
          {t('coreBadge')}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Language Switch Button */}
        <button
          type="button"
          onClick={toggleLocale}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 hover:border-cyan-400 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-bold transition cursor-pointer shadow-xs"
          title={locale === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-extrabold">{t('switchLang')}</span>
        </button>

        {/* Return to Web App */}
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 hover:border-cyan-400 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-bold transition cursor-pointer"
          title={locale === 'ar' ? 'فتح واجهة المنصة للعملاء والمهندسين' : 'Open live platform for clients and engineers'}
        >
          <span>{t('viewPublicPlatform')}</span>
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
        </a>

        {/* Admin Profile Details & Quick Logout */}
        <div className={`flex items-center gap-3 ${dir === 'rtl' ? 'pr-3 border-r border-slate-800' : 'pl-3 border-l border-slate-800'}`}>
          <div className="text-left sm:text-right hidden sm:block">
            <div className="text-xs font-black text-white">{t('adminUserTitle')}</div>
            <div className="text-[10px] font-mono text-cyan-400 font-bold">admin@satcom.com</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            SA
          </div>

          {/* Quick Lock / Logout */}
          <button
            type="button"
            onClick={() => {
              if (onLogout) {
                onLogout();
              } else {
                sessionStorage.removeItem('satcom_admin_auth');
                sessionStorage.removeItem('satcom_admin_user');
                window.location.reload();
              }
            }}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 transition cursor-pointer"
            title={t('lockAndLogout')}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};