'use client';

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Settings, 
  Building2, 
  DollarSign, 
  CheckCircle2, 
  Save, 
  Globe, 
  Coins, 
  Smartphone,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useAdminLanguage } from '../../context/AdminLanguageContext';

export default function AdminSettingsPage() {
  const { t, dir } = useAdminLanguage();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global Gateways Active Toggles
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [paypalEnabled, setPaypalEnabled] = useState(true);
  const [wireEnabled, setWireEnabled] = useState(true);
  const [applePayEnabled, setApplePayEnabled] = useState(true);
  const [cryptoEnabled, setCryptoEnabled] = useState(true);

  // Stripe Keys (clean, empty by default)
  const [stripePublishableKey, setStripePublishableKey] = useState('');
  const [stripeSecretKey, setStripeSecretKey] = useState('');
  const [stripeWebhookSecret, setStripeWebhookSecret] = useState('');

  // PayPal Keys (clean, empty by default)
  const [paypalClientId, setPaypalClientId] = useState('');
  const [paypalSecret, setPaypalSecret] = useState('');
  const [paypalEnvironment, setPaypalEnvironment] = useState<'live' | 'sandbox'>('live');

  // Wire / SWIFT Details
  const [bankName, setBankName] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [iban, setIban] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');

  // Crypto Escrow
  const [usdtAddress, setUsdtAddress] = useState('');
  const [usdcAddress, setUsdcAddress] = useState('');

  // Backend Commission Engine ($20 for every $300 tier)
  const [tierStep, setTierStep] = useState(300);
  const [feePerStep, setFeePerStep] = useState(20);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('satcom_admin_settings');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.stripePublishableKey !== undefined) setStripePublishableKey(p.stripePublishableKey);
        if (p.stripeSecretKey !== undefined) setStripeSecretKey(p.stripeSecretKey);
        if (p.stripeWebhookSecret !== undefined) setStripeWebhookSecret(p.stripeWebhookSecret);
        if (p.paypalClientId !== undefined) setPaypalClientId(p.paypalClientId);
        if (p.paypalSecret !== undefined) setPaypalSecret(p.paypalSecret);
        if (p.paypalEnvironment !== undefined) setPaypalEnvironment(p.paypalEnvironment);
        if (p.bankName !== undefined) setBankName(p.bankName);
        if (p.swiftCode !== undefined) setSwiftCode(p.swiftCode);
        if (p.iban !== undefined) setIban(p.iban);
        if (p.beneficiaryName !== undefined) setBeneficiaryName(p.beneficiaryName);
        if (p.usdtAddress !== undefined) setUsdtAddress(p.usdtAddress);
        if (p.usdcAddress !== undefined) setUsdcAddress(p.usdcAddress);
        if (p.tierStep !== undefined) setTierStep(p.tierStep);
        if (p.feePerStep !== undefined) setFeePerStep(p.feePerStep);
      }
    } catch {}
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        stripePublishableKey,
        stripeSecretKey,
        stripeWebhookSecret,
        paypalClientId,
        paypalSecret,
        paypalEnvironment,
        bankName,
        swiftCode,
        iban,
        beneficiaryName,
        usdtAddress,
        usdcAddress,
        tierStep,
        feePerStep,
      };
      localStorage.setItem('satcom_admin_settings', JSON.stringify(data));
    } catch {}

    setToastMessage(dir === 'rtl' ? '✓ تم حفظ وتحديث إعدادات بوابات الدفع العالمية بنجاح!' : '✓ Global payment gateways and platform configuration saved successfully!');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 min-h-screen text-slate-100" dir={dir}>
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 p-4 bg-emerald-600 text-white rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce border border-emerald-400/40">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-cyan-400" />
            <span>{t('settingsHeaderTitle')}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {t('settingsHeaderSub')}
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white rounded-2xl text-xs font-black shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{t('saveSettingsBtn')}</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        
        {/* 1. STRIPE GATEWAY */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-950/80 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-white">{t('stripeSectionTitle')}</h2>
                <p className="text-xs text-slate-400">{t('stripeSectionSub')}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStripeEnabled(!stripeEnabled)}
              className="flex items-center gap-2 text-xs font-bold cursor-pointer"
            >
              {stripeEnabled ? (
                <>
                  <span className="text-emerald-400 font-bold">{t('enabledBadge')}</span>
                  <ToggleRight className="w-8 h-8 text-emerald-400" />
                </>
              ) : (
                <>
                  <span className="text-slate-500">{t('disabledBadge')}</span>
                  <ToggleLeft className="w-8 h-8 text-slate-500" />
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">Stripe Publishable Key</label>
              <input
                type="text"
                value={stripePublishableKey}
                onChange={(e) => setStripePublishableKey(e.target.value)}
                placeholder="pk_live_..."
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">Stripe Secret Key</label>
              <input
                type="password"
                value={stripeSecretKey}
                onChange={(e) => setStripeSecretKey(e.target.value)}
                placeholder="sk_live_..."
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-300 mb-1.5">
                {dir === 'rtl' ? 'Stripe Webhook Secret (تأكيد الضمان التلقائي)' : 'Stripe Webhook Secret (Escrow Auto-Confirmation)'}
              </label>
              <input
                type="password"
                value={stripeWebhookSecret}
                onChange={(e) => setStripeWebhookSecret(e.target.value)}
                placeholder="whsec_..."
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          </div>

          {/* Apple Pay & Google Pay Toggle */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-slate-300">
                {dir === 'rtl' ? 'تفعيل Apple Pay و Google Pay عبر Stripe' : 'Enable Apple Pay & Google Pay via Stripe'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setApplePayEnabled(!applePayEnabled)}
              className="text-xs font-bold cursor-pointer"
            >
              {applePayEnabled ? (
                <ToggleRight className="w-7 h-7 text-emerald-400" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-slate-500" />
              )}
            </button>
          </div>
        </div>

        {/* 2. PAYPAL GATEWAY */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-white">{t('paypalSectionTitle')}</h2>
                <p className="text-xs text-slate-400">{t('paypalSectionSub')}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPaypalEnabled(!paypalEnabled)}
              className="flex items-center gap-2 text-xs font-bold cursor-pointer"
            >
              {paypalEnabled ? (
                <>
                  <span className="text-emerald-400 font-bold">{t('enabledBadge')}</span>
                  <ToggleRight className="w-8 h-8 text-emerald-400" />
                </>
              ) : (
                <>
                  <span className="text-slate-500">{t('disabledBadge')}</span>
                  <ToggleLeft className="w-8 h-8 text-slate-500" />
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">PayPal Client ID</label>
              <input
                type="text"
                value={paypalClientId}
                onChange={(e) => setPaypalClientId(e.target.value)}
                placeholder="Client ID..."
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">PayPal Secret Key</label>
              <input
                type="password"
                value={paypalSecret}
                onChange={(e) => setPaypalSecret(e.target.value)}
                placeholder="Secret Key..."
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{dir === 'rtl' ? 'بيئة التشغيل' : 'Environment'}</label>
              <select
                value={paypalEnvironment}
                onChange={(e) => setPaypalEnvironment(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs font-bold focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              >
                <option value="live">{dir === 'rtl' ? 'البيئة الحية (Live Production)' : 'Live Production'}</option>
                <option value="sandbox">{dir === 'rtl' ? 'بيئة الاختبار (Sandbox)' : 'Sandbox'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. WIRE TRANSFER / SWIFT */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-white">{t('wireSectionTitle')}</h2>
                <p className="text-xs text-slate-400">{t('wireSectionSub')}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setWireEnabled(!wireEnabled)}
              className="flex items-center gap-2 text-xs font-bold cursor-pointer"
            >
              {wireEnabled ? (
                <>
                  <span className="text-emerald-400 font-bold">{t('enabledBadge')}</span>
                  <ToggleRight className="w-8 h-8 text-emerald-400" />
                </>
              ) : (
                <>
                  <span className="text-slate-500">{t('disabledBadge')}</span>
                  <ToggleLeft className="w-8 h-8 text-slate-500" />
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{dir === 'rtl' ? 'اسم البنك المعتمد' : 'Bank Name'}</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. Standard Chartered / Emirates NBD"
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{dir === 'rtl' ? 'رمز السويفت (SWIFT / BIC)' : 'SWIFT / BIC Code'}</label>
              <input
                type="text"
                value={swiftCode}
                onChange={(e) => setSwiftCode(e.target.value)}
                placeholder="SWIFT..."
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{dir === 'rtl' ? 'رقم الحساب الدولي (IBAN)' : 'IBAN Number'}</label>
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                placeholder="IBAN..."
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{dir === 'rtl' ? 'اسم المستفيد لحساب الضمان' : 'Beneficiary Name'}</label>
              <input
                type="text"
                value={beneficiaryName}
                onChange={(e) => setBeneficiaryName(e.target.value)}
                placeholder="Satcom Engineers Escrow Vault FZ-LLC"
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* 4. CRYPTO ESCROW (USDT / USDC) */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-950/80 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-white">{t('cryptoSectionTitle')}</h2>
                <p className="text-xs text-slate-400">{t('cryptoSectionSub')}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCryptoEnabled(!cryptoEnabled)}
              className="flex items-center gap-2 text-xs font-bold cursor-pointer"
            >
              {cryptoEnabled ? (
                <>
                  <span className="text-emerald-400 font-bold">{t('enabledBadge')}</span>
                  <ToggleRight className="w-8 h-8 text-emerald-400" />
                </>
              ) : (
                <>
                  <span className="text-slate-500">{t('disabledBadge')}</span>
                  <ToggleLeft className="w-8 h-8 text-slate-500" />
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{dir === 'rtl' ? 'عنوان محفظة الضمان USDT (TRC-20)' : 'USDT Escrow Wallet (TRC-20)'}</label>
              <input
                type="text"
                value={usdtAddress}
                onChange={(e) => setUsdtAddress(e.target.value)}
                placeholder="TRC20 Address..."
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{dir === 'rtl' ? 'عنوان محفظة الضمان USDC (ERC-20)' : 'USDC Escrow Wallet (ERC-20)'}</label>
              <input
                type="text"
                value={usdcAddress}
                onChange={(e) => setUsdcAddress(e.target.value)}
                placeholder="ERC20 Address..."
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* 5. BACKEND COMMISSION ENGINE CONTROLS */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-950/80 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <span>{t('backendEngineTitle')}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {dir === 'rtl' ? 'مخفية عن واجهة المستخدمين' : 'Concealed from Client UI'}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {dir === 'rtl' ? 'قاعدة احتساب العمولة التلقائية في السيرفر: $20 بعد كل $300 من قيمة العقد' : 'Server rule: $20 for every $300 tier of contract budget'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {dir === 'rtl' ? 'الشريحة المالية Step ($)' : 'Tier Step Amount ($)'}
              </label>
              <input
                type="number"
                value={tierStep}
                onChange={(e) => setTierStep(Number(e.target.value))}
                className="w-full p-3 text-base font-black text-cyan-300 rounded-xl border border-slate-700 bg-slate-950 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                {dir === 'rtl' ? `كل $${tierStep} كشريحة تعاقدية` : `Every $${tierStep} contract tier`}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {dir === 'rtl' ? 'العمولة المحتسبة لكل شريحة ($)' : 'Commission per Tier ($)'}
              </label>
              <input
                type="number"
                value={feePerStep}
                onChange={(e) => setFeePerStep(Number(e.target.value))}
                className="w-full p-3 text-base font-black text-amber-300 rounded-xl border border-slate-700 bg-slate-950 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                {dir === 'rtl' ? `$${feePerStep} عمولة بعد كل $${tierStep}` : `$${feePerStep} fee per $${tierStep}`}
              </span>
            </div>

            <div className="sm:col-span-2 lg:col-span-1 p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed flex flex-col justify-center">
              <div className="font-bold text-emerald-400 mb-1">
                {dir === 'rtl' ? '✓ وضع الأمان والخصوصية:' : '✓ Privacy & Escrow Policy:'}
              </div>
              <p className="text-[11px] text-slate-400">
                {dir === 'rtl' 
                  ? 'العمولة مخفية تماماً من واجهات العميل والمهندس، ويتم حسابها آلياً في الخلفية (Backend) وتسجيلها في تقارير الخزينة دون استقطاع دولار واحد من المستقل (100% Payout).'
                  : 'Commission is strictly computed on the backend and recorded in treasury logs without deducting any portion from the engineer (100% Net Payout).'}
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3.5 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white rounded-2xl text-xs font-black shadow-lg shadow-cyan-500/25 transition flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{t('saveSettingsBtn')}</span>
          </button>
        </div>

      </form>
    </div>
  );
}