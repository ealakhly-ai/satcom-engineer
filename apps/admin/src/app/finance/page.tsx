'use client';

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  Building2, 
  Coins, 
  Globe, 
  Download, 
  Inbox
} from 'lucide-react';
import { useAdminLanguage } from '../../context/AdminLanguageContext';

export default function AdminFinancePage() {
  const { t, dir } = useAdminLanguage();
  const [selectedGateway, setSelectedGateway] = useState('ALL');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [gatewayTotals, setGatewayTotals] = useState({
    stripe: { total: 0, count: 0 },
    paypal: { total: 0, count: 0 },
    swift: { total: 0, count: 0 },
    crypto: { total: 0, count: 0 },
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('satcom_contracts');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const list = parsed.map((c: any, idx: number) => ({
            id: `TXN-${9000 + idx}`,
            contractId: c.id,
            project: c.title,
            client: c.clientName,
            gateway: c.paymentGateway || 'Stripe',
            grossAmount: (c.budget || 0) + (c.platformFee || 0),
            engineerPayout: c.budget || 0,
            platformFee: c.platformFee || 0,
            status: c.status === 'APPROVED' ? 'Settled & Released' : 'Escrow Locked',
            date: c.createdAt || new Date().toISOString().split('T')[0],
          }));
          setTransactions(list);

          // Calculate totals per gateway
          const totals = {
            stripe: { total: 0, count: 0 },
            paypal: { total: 0, count: 0 },
            swift: { total: 0, count: 0 },
            crypto: { total: 0, count: 0 },
          };

          list.forEach((t: any) => {
            const gw = t.gateway.toLowerCase();
            if (gw.includes('stripe')) {
              totals.stripe.total += t.grossAmount;
              totals.stripe.count += 1;
            } else if (gw.includes('paypal')) {
              totals.paypal.total += t.grossAmount;
              totals.paypal.count += 1;
            } else if (gw.includes('swift') || gw.includes('wire')) {
              totals.swift.total += t.grossAmount;
              totals.swift.count += 1;
            } else if (gw.includes('usdt') || gw.includes('crypto')) {
              totals.crypto.total += t.grossAmount;
              totals.crypto.count += 1;
            }
          });
          setGatewayTotals(totals);
          return;
        }
      }
    } catch {}

    // Default clean state: 0 mock transactions
    setTransactions([]);
    setGatewayTotals({
      stripe: { total: 0, count: 0 },
      paypal: { total: 0, count: 0 },
      swift: { total: 0, count: 0 },
      crypto: { total: 0, count: 0 },
    });
  }, []);

  const filtered = transactions.filter((tx) => {
    if (selectedGateway !== 'ALL' && tx.gateway !== selectedGateway) return false;
    return true;
  });

  return (
    <div className="p-6 sm:p-8 space-y-8 min-h-screen text-slate-100" dir={dir}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <DollarSign className="w-7 h-7 text-cyan-400" />
            <span>{t('financeHeaderTitle')}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {t('financeHeaderSub')}
          </p>
        </div>

        <button 
          onClick={() => alert(dir === 'rtl' ? 'جاري تصدير كشف الحساب المالي للمنصة...' : 'Exporting platform financial statement...')}
          className="px-4 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t('exportCsvBtn')}</span>
        </button>
      </div>

      {/* Gateway Revenue Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Stripe */}
        <div className="p-5 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl hover:border-indigo-500/30 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold">{t('stripeCardTitle')}</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">${gatewayTotals.stripe.total.toLocaleString()}.00</div>
          <div className="text-[11px] text-emerald-400 font-bold mt-1">
            {gatewayTotals.stripe.count} {dir === 'rtl' ? 'عملية مسجلة' : 'operations'}
          </div>
        </div>

        {/* PayPal */}
        <div className="p-5 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl hover:border-sky-500/30 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold">{t('paypalCardTitle')}</span>
            <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <Globe className="w-4 h-4 text-sky-400" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">${gatewayTotals.paypal.total.toLocaleString()}.00</div>
          <div className="text-[11px] text-sky-400 font-bold mt-1">
            {gatewayTotals.paypal.count} {dir === 'rtl' ? 'عملية مسجلة' : 'operations'}
          </div>
        </div>

        {/* SWIFT */}
        <div className="p-5 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl hover:border-emerald-500/30 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold">{t('swiftCardTitle')}</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">${gatewayTotals.swift.total.toLocaleString()}.00</div>
          <div className="text-[11px] text-emerald-400 font-bold mt-1">
            {gatewayTotals.swift.count} {dir === 'rtl' ? 'عقد وحوالة مؤسسية' : 'wire transfers'}
          </div>
        </div>

        {/* Crypto USDT */}
        <div className="p-5 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl hover:border-amber-500/30 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold">{t('cryptoCardTitle')}</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Coins className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">${gatewayTotals.crypto.total.toLocaleString()}.00</div>
          <div className="text-[11px] text-amber-400 font-bold mt-1">
            {gatewayTotals.crypto.count} {dir === 'rtl' ? 'عملية كريبتو Escrow' : 'crypto transactions'}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400 mr-2">
          {dir === 'rtl' ? 'تصفية حسب البوابة:' : 'Filter by Gateway:'}
        </span>
        {['ALL', 'Stripe', 'PayPal', 'Wire / SWIFT', 'USDT Escrow'].map((gw) => (
          <button
            key={gw}
            onClick={() => setSelectedGateway(gw)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedGateway === gw
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 font-black'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            {gw === 'ALL' ? (dir === 'rtl' ? 'كافة البوابات' : 'All Gateways') : gw}
          </button>
        ))}
      </div>

      {/* Transactions Table / Empty State */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center space-y-3 px-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
              <Inbox className="w-8 h-8 text-cyan-400/80" />
            </div>
            <h3 className="text-base font-black text-white">{t('emptyFinanceTitle')}</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              {t('emptyFinanceDesc')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={`w-full text-xs ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-extrabold">
                <tr>
                  <th className="py-3.5 px-4">{dir === 'rtl' ? 'رقم المعاملة والعقد' : 'Transaction & Contract ID'}</th>
                  <th className="py-3.5 px-4">{t('colGateway')}</th>
                  <th className="py-3.5 px-4">{dir === 'rtl' ? 'إجمالي ما دفعه العميل' : 'Total Paid by Client'}</th>
                  <th className="py-3.5 px-4">{dir === 'rtl' ? 'مستحقات المهندس (100%)' : 'Engineer Payout (100%)'}</th>
                  <th className="py-3.5 px-4">{dir === 'rtl' ? 'رسم المنصة ($20/$300)' : 'Platform Fee ($20/$300)'}</th>
                  <th className="py-3.5 px-4">{t('colStatus')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-4 px-4">
                      <div className="font-extrabold text-white">{item.project}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        <span className="font-mono text-cyan-400 font-bold">{item.id}</span>
                        <span> • {item.contractId} • {item.date}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-200">{item.gateway}</span>
                    </td>

                    <td className="py-4 px-4 font-black text-white">
                      ${Number(item.grossAmount || 0).toLocaleString()}
                    </td>

                    <td className="py-4 px-4 font-black text-emerald-400">
                      ${Number(item.engineerPayout || 0).toLocaleString()}
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-extrabold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                        ${Number(item.platformFee || 0).toLocaleString()}.00
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}