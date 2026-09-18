'use client';

import React, { useState } from 'react';
import { 
  DollarSign, 
  ArrowDownCircle, 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2,
  Globe,
  Coins,
  Lock,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export default function FreelancerEarningsPage() {
  const { locale, dir } = useLanguage();
  const isAr = locale === 'ar';

  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [withdrawMethod, setWithdrawMethod] = useState<'STRIPE' | 'PAYPAL' | 'SWIFT' | 'USDT'>('STRIPE');
  const [success, setSuccess] = useState(false);

  const wallet = {
    availableForWithdrawal: 0.0,
    heldInActiveEscrow: 0.0,
    lifetimeEarnings: 0.0,
    stripeBankIban: isAr ? 'غير متصل (يتطلب ربط الحساب)' : 'Not Connected',
    paypalEmail: isAr ? 'غير متصل (يتطلب ربط الحساب)' : 'Not Connected',
    swiftAccount: isAr ? 'غير محدد' : 'Not Specified',
    usdtAddress: isAr ? 'غير محدد' : 'Not Specified',
  };

  const handleWithdraw = () => {
    if (wallet.availableForWithdrawal <= 0) return;
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8" dir={dir}>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <DollarSign className="w-7 h-7 text-emerald-400" />
          <span>{isAr ? 'محفظة الأرباح وبوابات السحب العالمية' : 'Earnings Wallet & Global Payout Gateways'}</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {isAr
            ? 'سحب فوري لأرباحك الصافية 100% عبر Stripe Connect، PayPal، الحوالات البنكية الدولية SWIFT، أو العملات الرقمية USDT'
            : 'Instant payout of 100% net earnings via Stripe Connect, PayPal, SWIFT Wire, or USDT stablecoin.'}
        </p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            {isAr 
              ? `تم بنجاح إرسال أمر التحويل بمبلغ $${withdrawAmount} عبر بوابة (${withdrawMethod})! سيصل المبلغ إلى حسابك وفق التوقيت المحدد.` 
              : `Payout request of $${withdrawAmount} via (${withdrawMethod}) has been dispatched successfully!`}
          </span>
        </div>
      )}

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl hover:border-emerald-500/40 transition">
          <span className="text-xs text-slate-400 font-bold block">
            {isAr ? 'الرصيد المتاح للسحب الفوري' : 'Available for Immediate Withdrawal'}
          </span>
          <span className="text-3xl font-black text-emerald-400 mt-1 block">
            ${wallet.availableForWithdrawal.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block font-medium">
            {isAr ? 'صافي أرباح العقود المعتمدة (0% خصم)' : '100% Net Payout from Approved Milestones'}
          </span>
        </div>

        <div className="p-6 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl hover:border-cyan-500/40 transition">
          <span className="text-xs text-slate-400 font-bold block">
            {isAr ? 'مبالغ قيد التنفيذ في الضمان (Escrow)' : 'Held in Active Escrow Vault'}
          </span>
          <span className="text-3xl font-black text-cyan-400 mt-1 block">
            ${wallet.heldInActiveEscrow.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block font-medium">
            {isAr ? 'تتحرر فور اعتماد العميل للمخرجات' : 'Released immediately upon client approval'}
          </span>
        </div>

        <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-cyan-950 text-white rounded-3xl border border-indigo-500/30 shadow-xl">
          <span className="text-xs text-cyan-300 font-bold block">
            {isAr ? 'إجمالي أرباحك على المنصة' : 'Lifetime Platform Earnings'}
          </span>
          <span className="text-3xl font-black text-white mt-1 block">
            ${wallet.lifetimeEarnings.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-300 mt-1 block font-medium">
            {isAr ? 'استلمتها كاملة بنسبة 100% دون أي استقطاعات' : '100% Full Payouts with Zero Deductions'}
          </span>
        </div>
      </div>

      {/* Global Payout Gateways Selection */}
      <div className="bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <div>
          <h2 className="text-base font-black text-white">
            {isAr ? 'اختر بوابة السحب العالمية المفضلة' : 'Select Your Preferred Global Payout Gateway'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isAr ? 'كافة البوابات مؤمنة ومعتمدة دولياً' : 'All channels are fully verified and encrypted'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Stripe Connect */}
          <div
            onClick={() => setWithdrawMethod('STRIPE')}
            className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
              withdrawMethod === 'STRIPE'
                ? 'border-indigo-500/70 bg-indigo-950/50 ring-1 ring-indigo-500/60'
                : 'border-slate-800 bg-slate-950/60 hover:bg-slate-850'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-950 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Stripe Direct to Bank</span>
                <span className="text-[11px] text-slate-400">{wallet.stripeBankIban}</span>
              </div>
            </div>
            <span className="text-xs text-cyan-400 font-bold">{isAr ? 'ربط الحساب' : 'Connect'}</span>
          </div>

          {/* PayPal */}
          <div
            onClick={() => setWithdrawMethod('PAYPAL')}
            className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
              withdrawMethod === 'PAYPAL'
                ? 'border-cyan-500/70 bg-cyan-950/50 ring-1 ring-cyan-500/60'
                : 'border-slate-800 bg-slate-950/60 hover:bg-slate-850'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">PayPal Global</span>
                <span className="text-[11px] text-slate-400">{wallet.paypalEmail}</span>
              </div>
            </div>
            <span className="text-xs text-cyan-400 font-bold">{isAr ? 'ربط الحساب' : 'Connect'}</span>
          </div>

          {/* SWIFT Wire */}
          <div
            onClick={() => setWithdrawMethod('SWIFT')}
            className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
              withdrawMethod === 'SWIFT'
                ? 'border-emerald-500/70 bg-emerald-950/50 ring-1 ring-emerald-500/60'
                : 'border-slate-800 bg-slate-950/60 hover:bg-slate-850'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">International SWIFT Wire</span>
                <span className="text-[11px] text-slate-400">{wallet.swiftAccount}</span>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-bold">{isAr ? 'إعداد' : 'Setup'}</span>
          </div>

          {/* Crypto USDT Escrow */}
          <div
            onClick={() => setWithdrawMethod('USDT')}
            className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
              withdrawMethod === 'USDT'
                ? 'border-amber-500/70 bg-amber-950/50 ring-1 ring-amber-500/60'
                : 'border-slate-800 bg-slate-950/60 hover:bg-slate-850'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-950 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Crypto Wallet (USDT TRC20)</span>
                <span className="text-[11px] text-slate-400 font-mono">{wallet.usdtAddress}</span>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-bold">{isAr ? 'إعداد' : 'Setup'}</span>
          </div>

        </div>

        {/* Amount Input & Withdraw Action */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <label className="text-xs font-bold text-slate-300 block">
            {isAr ? 'المبلغ المطلوب سحبه ($)' : 'Amount to Withdraw ($)'}
          </label>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-64">
              <DollarSign className={`w-4 h-4 text-slate-500 absolute top-3.5 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} />
              <input
                type="number"
                min={50}
                max={wallet.availableForWithdrawal}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                className={`w-full py-2.5 rounded-xl border border-slate-700 text-sm font-black text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-slate-950 ${
                  dir === 'rtl' ? 'pr-9 pl-3' : 'pl-9 pr-3'
                }`}
              />
            </div>

            <button
              onClick={handleWithdraw}
              disabled={wallet.availableForWithdrawal <= 0}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                wallet.availableForWithdrawal > 0
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <ArrowDownCircle className="w-4 h-4" />
              <span>{isAr ? `تأكيد وسحب $${withdrawAmount} الآن` : `Confirm Payout of $${withdrawAmount}`}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {isAr
                ? '0% عمولة استقطاع من المنصة • الحد الأدنى للسحب 50.00 $'
                : 'Zero platform commission deductions • Minimum withdrawal: $50.00'}
            </span>
          </div>
        </div>
      </div>

      {/* Payout History Empty State */}
      <div className="bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
        <h2 className="text-base font-black text-white">
          {isAr ? 'سجل عمليات السحب والتحويلات السابقة' : 'Past Payout & Withdrawal Records'}
        </h2>
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 space-y-2">
          <DollarSign className="w-8 h-8 mx-auto text-slate-500" />
          <p className="text-xs font-bold text-slate-300">
            {isAr ? 'لا توجد عمليات سحب سابقة مسجلة' : 'No Previous Withdrawals Found'}
          </p>
          <p className="text-[11px] text-slate-500">
            {isAr ? 'عند إتمام أي عملية سحب، سيتم توثيق رقم الحوالة والتاريخ هنا فورياً.' : 'When you request a payout, tracking numbers and timestamps will be logged here.'}
          </p>
        </div>
      </div>
    </div>
  );
}