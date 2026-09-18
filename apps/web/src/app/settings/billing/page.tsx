'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Building2, 
  Globe, 
  Coins, 
  CheckCircle2, 
  ShieldCheck, 
  Trash2, 
  ExternalLink,
  Download,
  Lock,
  Smartphone,
  Check
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export default function BillingSettings() {
  const { locale, dir } = useLanguage();
  const isAr = locale === 'ar';

  const [methods, setMethods] = useState([
    {
      id: 'pm-1',
      type: 'STRIPE_CARD',
      title: 'Visa •••• 4242',
      subtitle: isAr ? 'تنتهي 12/28 • معتمدة عبر Stripe' : 'Expires 12/28 • Verified by Stripe',
      isDefault: true,
      icon: CreditCard,
      badge: 'Stripe',
    },
    {
      id: 'pm-2',
      type: 'PAYPAL',
      title: 'PayPal: client.space@aerotech.com',
      subtitle: isAr ? 'حساب معتمد عالمياً' : 'Verified global account',
      isDefault: false,
      icon: Globe,
      badge: 'PayPal',
    },
    {
      id: 'pm-3',
      type: 'WIRE',
      title: 'حساب بنكي: First Abu Dhabi Bank (IBAN)',
      subtitle: 'AE07 •••• •••• •••• 9921',
      isDefault: false,
      icon: Building2,
      badge: 'SWIFT / Wire',
    },
  ]);

  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber) return;

    const last4 = cardNumber.slice(-4) || '8888';
    const newMethod = {
      id: `pm-${Date.now()}`,
      type: 'STRIPE_CARD',
      title: `MasterCard •••• ${last4}`,
      subtitle: isAr ? `تنتهي ${expiry || '08/29'} • معتمدة عبر Stripe` : `Expires ${expiry || '08/29'} • Verified by Stripe`,
      isDefault: false,
      icon: CreditCard,
      badge: 'Stripe',
    };

    setMethods([...methods, newMethod]);
    setShowAddCardModal(false);
    setCardNumber('');
    setCardHolder('');
    setExpiry('');
    setCvc('');
    showToast(isAr ? '✓ تمت إضافة البطاقة البنكية بنجاح وتأمينها عبر Stripe' : '✓ Card securely added via Stripe');
  };

  const setDefault = (id: string) => {
    setMethods((prev) =>
      prev.map((m) => ({ ...m, isDefault: m.id === id }))
    );
    showToast(isAr ? 'تم تعيين وسيلة الدفع الافتراضية' : 'Default payment method updated');
  };

  const removeMethod = (id: string) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
    showToast(isAr ? 'تمت إزالة وسيلة الدفع' : 'Payment method removed');
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8" dir={dir}>
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 p-4 bg-emerald-700 text-white rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <CreditCard className="w-7 h-7 text-cyan-400" />
            <span>{isAr ? 'طرق الدفع وبوابات التمويل العالمية' : 'Global Payment Methods & Escrow Billing'}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isAr 
              ? 'إدارة بطاقاتك وحساباتك المعتمدة عبر Stripe و PayPal والحوالات البنكية لتمويل مشاريعك وحساب الضمان Escrow' 
              : 'Manage verified cards, PayPal, and bank wire details to fund contracts and Escrow vaults.'}
          </p>
        </div>

        <button
          onClick={() => setShowAddCardModal(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? '+ إضافة وسيلة دفع' : '+ Add Payment Method'}</span>
        </button>
      </div>

      {/* Security Banner */}
      <div className="p-4 bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl flex items-center gap-3 shadow-lg">
        <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-cyan-300">{isAr ? 'حماية مشفرة بأعلى معايير الأمان (PCI-DSS):' : 'Bank-Grade Security Protection (PCI-DSS):'}</strong>{' '}
          {isAr
            ? 'لا يتم حفظ أرقام بطاقاتك على خوادمنا مباشرة، بل يتم تشفيرها وتأمينها عبر بوابات Stripe و PayPal العالمية. كل معاملة تمويل تخضع لحماية حساب الضمان Escrow بنسبة 100% ومعالجة سحابية مؤتمتة.'
            : 'Card details are tokenized and processed via certified PCI-DSS Level 1 partners (Stripe & PayPal). Every funded milestone is 100% Escrow protected.'}
        </div>
      </div>

      {/* Active Payment Methods */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl p-6 space-y-4">
        <h2 className="text-base font-black text-white">
          {isAr ? 'وسائل الدفع المحفوظة والمعتمدة' : 'Saved Payment Methods'}
        </h2>

        <div className="space-y-3">
          {methods.map((pm) => {
            const Icon = pm.icon;
            return (
              <div
                key={pm.id}
                className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  pm.isDefault ? 'border-cyan-500/60 bg-cyan-950/40 ring-1 ring-cyan-500/50' : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs text-white">{pm.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                        {pm.badge}
                      </span>
                      {pm.isDefault && (
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                          {isAr ? 'الافتراضية ✓' : 'Default ✓'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{pm.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {!pm.isDefault && (
                    <button
                      onClick={() => setDefault(pm.id)}
                      className="px-3 py-1.5 rounded-xl border border-slate-700 hover:border-cyan-400 bg-slate-800/80 text-[11px] font-bold text-slate-300 hover:text-white transition cursor-pointer"
                    >
                      {isAr ? 'تعيين كافتراضية' : 'Set as Default'}
                    </button>
                  )}
                  <button
                    onClick={() => removeMethod(pm.id)}
                    className="p-2 hover:bg-rose-950/60 text-slate-500 hover:text-rose-400 rounded-xl transition cursor-pointer"
                    title="إزالة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Supported Global Gateways Showcase */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl p-6 space-y-4">
        <h2 className="text-base font-black text-white">
          {isAr ? 'البوابات المدعومة عالمياً' : 'Supported Global Gateways'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-1.5 hover:border-indigo-500/40 transition">
            <CreditCard className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-xs text-white block">Stripe Cards</span>
            <span className="text-[10px] text-slate-400 block">Visa, Mastercard, Amex, JCB</span>
          </div>

          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-1.5 hover:border-cyan-500/40 transition">
            <Globe className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-xs text-white block">PayPal Global</span>
            <span className="text-[10px] text-slate-400 block">تحويل بنكي ومحفظة فورية</span>
          </div>

          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-1.5 hover:border-emerald-500/40 transition">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-xs text-white block">Wire Transfer / SWIFT</span>
            <span className="text-[10px] text-slate-400 block">إيداع مؤسسي مباشر للضمان</span>
          </div>

          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-1.5 hover:border-amber-500/40 transition">
            <Coins className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-xs text-white block">Crypto Escrow</span>
            <span className="text-[10px] text-slate-400 block">USDT (TRC-20) / USDC (ERC-20)</span>
          </div>
        </div>
      </div>

      {/* ADD CARD MODAL */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                <h3 className="font-black text-white text-base">
                  {isAr ? 'إضافة بطاقة بنكية عبر Stripe' : 'Add Card via Stripe'}
                </h3>
              </div>
              <button
                onClick={() => setShowAddCardModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  {isAr ? 'اسم حامل البطاقة' : 'Cardholder Name'}
                </label>
                <input
                  type="text"
                  required
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="e.g. John Doe / خالد الشمري"
                  className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  {isAr ? 'رقم البطاقة (16 رقم)' : 'Card Number'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 •••• •••• 4242"
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                  <CreditCard className={`w-4 h-4 text-slate-500 absolute top-3 ${dir === 'rtl' ? 'left-3' : 'right-3'}`} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {isAr ? 'تاريخ الانتهاء' : 'Expiry'}
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    CVC / CVV
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="•••"
                      className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    />
                    <Lock className={`w-3.5 h-3.5 text-slate-500 absolute top-3.5 ${dir === 'rtl' ? 'left-3' : 'right-3'}`} />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCardModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-bold cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/25 transition cursor-pointer"
                >
                  {isAr ? 'تأكيد وحفظ البطاقة' : 'Save & Authorize'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}