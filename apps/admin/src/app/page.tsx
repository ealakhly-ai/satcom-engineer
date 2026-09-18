'use client';

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  FileCheck, 
  Users, 
  ShieldAlert, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Inbox,
  UserCheck
} from 'lucide-react';
import { useAdminLanguage } from '../context/AdminLanguageContext';

export default function AdminDashboard() {
  const { t, dir } = useAdminLanguage();
  const [escrowTransactions, setEscrowTransactions] = useState<any[]>([]);
  const [pendingVetting, setPendingVetting] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    revenue: 0,
    escrowLocked: 0,
    engineersCount: 0,
    disputesCount: 0,
  });

  useEffect(() => {
    // Dynamically calculate metrics from contracts if present in localStorage
    try {
      const stored = localStorage.getItem('satcom_contracts');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEscrowTransactions(parsed);
          const rev = parsed
            .filter((c: any) => c.status === 'APPROVED')
            .reduce((sum: number, c: any) => sum + (c.platformFee || 0), 0);
          const locked = parsed
            .filter((c: any) => c.status === 'FUNDED_IN_ESCROW' || c.status === 'IN_PROGRESS' || c.status === 'SUBMITTED')
            .reduce((sum: number, c: any) => sum + (c.budget || 0), 0);
          setMetrics({
            revenue: rev,
            escrowLocked: locked,
            engineersCount: 0,
            disputesCount: 0,
          });
          return;
        }
      }
    } catch {
      // safe fallback
    }

    // Default clean state: 0 mock data
    setEscrowTransactions([]);
    setPendingVetting([]);
    setMetrics({
      revenue: 0,
      escrowLocked: 0,
      engineersCount: 0,
      disputesCount: 0,
    });
  }, []);

  return (
    <div className="p-6 sm:p-8 space-y-8 min-h-screen text-slate-100" dir={dir}>
      {/* Top Banner with Admin Identity */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 text-white p-6 rounded-3xl border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-indigo-500/20 text-cyan-300 font-bold rounded-lg text-xs border border-indigo-500/40">
              {t('superAdminBadge')}
            </span>
            <span className="text-xs text-slate-400 font-mono">admin@satcom.com</span>
          </div>
          <h1 className="text-2xl font-black text-white">{t('dashHeaderTitle')}</h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t('dashHeaderSub')}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 cursor-pointer"
          >
            <span>{t('viewPublicPlatform')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Revenue & Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: Platform Revenue */}
        <div className="p-6 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold">{t('metricRevenue')}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-400">${metrics.revenue.toLocaleString()}.00</div>
          <div className="text-[11px] text-emerald-300 font-bold mt-1">{t('metricRevenueSub')}</div>
        </div>

        {/* Metric 2: Escrow Locked */}
        <div className="p-6 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl hover:border-cyan-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold">{t('metricEscrow')}</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-cyan-400">${metrics.escrowLocked.toLocaleString()}.00</div>
          <div className="text-[11px] text-cyan-300 font-bold mt-1">{t('metricEscrowSub')}</div>
        </div>

        {/* Metric 3: Verified Engineers */}
        <div className="p-6 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold">{t('metricEngineers')}</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-950/80 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{metrics.engineersCount}</div>
          <div className="text-[11px] text-indigo-300 font-bold mt-1">{t('metricEngineersSub')}</div>
        </div>

        {/* Metric 4: Disputes */}
        <div className="p-6 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl hover:border-amber-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold">{t('metricDisputes')}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{metrics.disputesCount}</div>
          <div className="text-[11px] text-slate-400 font-bold mt-1">{t('metricDisputesSub')}</div>
        </div>
      </div>

      {/* Main Content Grid: Escrow Transactions & Engineer Vetting */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Escrow Transactions Table (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-black text-white">{t('escrowTableTitle')}</h2>
              <p className="text-xs text-slate-400">{t('escrowTableSub')}</p>
            </div>
            <span className="text-xs font-extrabold text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-1 rounded-xl">
              {t('liveUpdateBadge')}
            </span>
          </div>

          {escrowTransactions.length === 0 ? (
            <div className="py-14 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
                <Inbox className="w-7 h-7 text-cyan-400/80" />
              </div>
              <h3 className="text-sm font-black text-white">{t('emptyEscrowTitle')}</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                {t('emptyEscrowDesc')}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className={`w-full text-xs ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold">
                    <th className="py-2.5">{t('colProject')}</th>
                    <th className="py-2.5">{t('colParties')}</th>
                    <th className="py-2.5">{t('colAmount')}</th>
                    <th className="py-2.5">{t('colFee')}</th>
                    <th className="py-2.5">{t('colStatus')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {escrowTransactions.map((tx: any) => (
                    <tr key={tx.id} className="hover:bg-slate-850 transition">
                      <td className="py-3">
                        <div className="font-bold text-white line-clamp-1">{tx.title || tx.project}</div>
                        <span className="text-[10px] text-slate-400 font-mono">{tx.id} • {tx.createdAt || tx.date}</span>
                      </td>
                      <td className="py-3">
                        <div className="font-semibold text-cyan-300">{tx.engineerName || tx.engineer}</div>
                        <div className="text-[10px] text-slate-400">{tx.clientName || tx.client}</div>
                      </td>
                      <td className="py-3 font-extrabold text-emerald-400">${Number(tx.budget || 0).toLocaleString()}</td>
                      <td className="py-3 font-extrabold text-amber-400">${Number(tx.platformFee || 0).toLocaleString()}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-cyan-500/30 bg-cyan-950/70 text-cyan-300">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right: Vetting Queue & Backend Commission Engine */}
        <div className="space-y-6">
          {/* Vetting Queue Card */}
          <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t('vettingHeader')}</span>
              </h3>
              <span className="text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-full">
                {t('pendingCount')}
              </span>
            </div>

            {pendingVetting.length === 0 ? (
              <div className="py-10 text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
                  <UserCheck className="w-6 h-6 text-emerald-400/80" />
                </div>
                <h4 className="text-xs font-bold text-white">{t('emptyVettingTitle')}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto">
                  {t('emptyVettingDesc')}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingVetting.map((eng, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{eng.name}</span>
                      <span className="text-[10px] text-slate-400">{eng.appliedAt}</span>
                    </div>
                    <p className="text-[11px] text-slate-300">{eng.specialty}</p>
                    <p className="text-[10px] text-cyan-400 font-medium">{eng.degree}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Backend Commission Engine Info Card */}
          <div className="p-5 bg-gradient-to-br from-indigo-950 to-slate-900 text-white rounded-3xl border border-indigo-500/30 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-black">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t('backendEngineTitle')}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('backendEngineDesc')}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}