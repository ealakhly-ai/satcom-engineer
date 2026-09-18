'use client';

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileCheck, 
  Users, 
  ShieldAlert, 
  DollarSign, 
  Settings, 
  ShieldCheck, 
  LogOut 
} from 'lucide-react';
import { useAdminLanguage } from '../context/AdminLanguageContext';

interface AdminSidebarProps {
  onLogout?: () => void;
}

export const AdminSidebar = ({ onLogout }: AdminSidebarProps = {}) => {
  const { t, dir } = useAdminLanguage();

  const menuItems = [
    { label: t('menuDashboard'), href: '/', icon: LayoutDashboard },
    { label: t('menuJobs'), href: '/jobs', icon: Briefcase },
    { label: t('menuContracts'), href: '/contracts', icon: FileCheck },
    { label: t('menuUsers'), href: '/users', icon: Users },
    { label: t('menuDisputes'), href: '/disputes', icon: ShieldAlert },
    { label: t('menuFinance'), href: '/finance', icon: DollarSign },
    { label: t('menuSettings'), href: '/settings', icon: Settings },
  ];

  const borderClass = dir === 'rtl' ? 'border-l' : 'border-r';

  return (
    <aside className={`w-64 bg-slate-900 text-white p-5 flex flex-col justify-between shrink-0 min-h-screen ${borderClass} border-slate-800`}>
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-700 bg-[#070b19] flex-shrink-0 shadow-sm">
            <img src="/logo.png" alt="Satcom Engineers" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-black text-sm tracking-tight block text-white">{t('brandTitle')}</span>
            <span className="text-[10px] text-indigo-400 font-bold block">{t('brandSubtitle')}</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition"
              >
                <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Admin User Info Card */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-black text-white">{t('rootAccount')}</span>
          </div>
          <p className="text-[10px] font-mono text-slate-300">admin@satcom.com</p>
          <span className="inline-block text-[9px] font-extrabold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md">
            {t('fullRootPrivileges')}
          </span>
        </div>

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
          className="flex items-center justify-center gap-2 w-full py-2 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 text-xs font-bold rounded-xl transition cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 text-rose-400" />
          <span>{t('lockAndLogout')}</span>
        </button>

        {/* Emadsoft Tag */}
        <div className="pt-2 border-t border-slate-800/60 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-[10px]">
            <span className="text-cyan-400 font-extrabold">{t('emadsoftBranding')}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};