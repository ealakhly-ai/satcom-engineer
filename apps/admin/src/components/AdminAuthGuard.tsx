'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  User, 
  ArrowLeft, 
  ArrowRight,
  AlertCircle, 
  Eye, 
  EyeOff,
  Globe
} from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { AdminNavbar } from './AdminNavbar';
import { useAdminLanguage } from '../context/AdminLanguageContext';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const { locale, toggleLocale, t, dir } = useAdminLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if session exists in sessionStorage
    const auth = sessionStorage.getItem('satcom_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    setTimeout(() => {
      const u = username.trim().toLowerCase();
      const p = password.trim();

      // Accepted usernames
      const validUsernames = ['admin', 'admin@satcom.com', 'emad', 'emad@satcom.com', 'satcom_admin'];
      // Accepted passwords
      const validPasswords = ['Admin@Satcom2026!', 'admin@satcom2026!', 'Admin2026', 'admin2026', 'satcom2026', 'admin123', 'Admin123'];

      if (validUsernames.includes(u) && validPasswords.includes(p)) {
        sessionStorage.setItem('satcom_admin_auth', 'true');
        sessionStorage.setItem('satcom_admin_user', username.trim());
        setIsAuthenticated(true);
        setErrorMsg(null);
      } else {
        setErrorMsg(t('loginError'));
      }
      setLoading(false);
    }, 600);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('satcom_admin_auth');
    sessionStorage.removeItem('satcom_admin_user');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setErrorMsg(null);
  };

  // If authenticated, render full admin panel layout
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex bg-transparent text-slate-100" dir={dir}>
        <AdminSidebar onLogout={handleLogout} />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminNavbar onLogout={handleLogout} />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    );
  }

  // If not authenticated, render secure Admin Login Gate
  const BackIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#050811] text-slate-100 relative" dir={dir}>
      {/* Top right language switch */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={toggleLocale}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer shadow-lg"
        >
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>{t('switchLang')}</span>
        </button>
      </div>

      {/* Ambient Cosmic Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-600/25 via-cyan-500/20 to-blue-600/25 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-indigo-500/40 shadow-2xl p-8 space-y-6 relative z-10 hover:border-cyan-400/60 transition duration-300">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-400/50 bg-[#070b19] p-1 flex items-center justify-center">
            <img src="/logo.png" alt="Satcom Engineers" className="w-full h-full object-cover rounded-xl" />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[10px]">
              🛡️
            </span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-cyan-300 text-[11px] font-black shadow-xs mb-2">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t('missionControl')}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">{t('loginGateTitle')}</h1>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {t('loginGateSubtitle')}
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span className="font-bold leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {/* Admin Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {t('usernameLabel')}
            </label>
            <div className="relative">
              <User className={`w-4 h-4 text-slate-400 absolute top-3.5 ${dir === 'rtl' ? 'right-3.5' : 'left-3.5'}`} />
              <input
                type="text"
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t('usernamePlaceholder')}
                className={`w-full py-2.5 ${dir === 'rtl' ? 'pr-10 pl-3' : 'pl-10 pr-3'} rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs text-white bg-slate-950/80 placeholder-slate-500 transition`}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {t('passwordLabel')}
            </label>
            <div className="relative">
              <Lock className={`w-4 h-4 text-slate-400 absolute top-3.5 ${dir === 'rtl' ? 'right-3.5' : 'left-3.5'}`} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className={`w-full py-2.5 ${dir === 'rtl' ? 'pr-10 pl-10' : 'pl-10 pr-10'} rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs text-white bg-slate-950/80 placeholder-slate-500 font-mono transition`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute top-3 ${dir === 'rtl' ? 'left-3' : 'right-3'} text-slate-400 hover:text-white p-0.5 cursor-pointer`}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black rounded-xl text-xs shadow-xl shadow-cyan-500/25 transition flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t('verifyingBtn')}</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 text-cyan-200" />
                <span>{t('loginBtn')}</span>
              </>
            )}
          </button>
        </form>

        {/* Return to Public Platform */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col items-center gap-3 text-xs text-slate-400">
          <a
            href="http://localhost:3000"
            className="text-slate-300 hover:text-cyan-400 transition flex items-center gap-1.5 font-bold"
          >
            <BackIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('returnToMain')}</span>
          </a>

          {/* Branding Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-cyan-400 font-extrabold">{t('emadsoftBranding')}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
