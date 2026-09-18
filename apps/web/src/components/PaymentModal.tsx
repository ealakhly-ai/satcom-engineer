'use client';
import React, { useState } from 'react';
import { CreditCard, ShieldCheck, CheckCircle2, DollarSign, X, Lock } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractTitle: string;
  milestoneAmount: number;
  isFinalMilestone?: boolean;
  onPaymentSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  contractTitle,
  milestoneAmount,
  isFinalMilestone = true,
  onPaymentSuccess,
}) => {
  const [method, setMethod] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  if (!isOpen) return null;

  const totalPayable = milestoneAmount;

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-slate-200 text-right">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>دفع مشفر وآمن 256-bit SSL</span>
            </div>
            <h3 className="font-black text-lg text-slate-900 mt-1">تمويل المرحلة في حساب الضمان (Escrow)</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">
            <X className="w-5 h-5" />
          </button>
        </div>

        {paid ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-slate-900">تم حجز المبلغ في حساب الضمان بنجاح!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              أصبح بإمكان المهندس المستقل الآن البدء في تنفيذ هذه المرحلة بأمان كامل.
            </p>
          </div>
        ) : (
          <>
            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMethod('STRIPE')}
                className={`p-3.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  method === 'STRIPE'
                    ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-sky-600" />
                <span>بطاقة بنكية / Stripe</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('PAYPAL')}
                className={`p-3.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  method === 'PAYPAL'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="text-indigo-600 font-black">P</span>
                <span>بوابة PayPal</span>
              </button>
            </div>

            {/* Form Fields */}
            {method === 'STRIPE' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رقم البطاقة الائتمانية</label>
                  <input
                    type="text"
                    placeholder="4242 •••• •••• 4242"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-left tracking-widest focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ الانتهاء</label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-center focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">رمز الأمان (CVC)</label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-center focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 bg-indigo-50/60 rounded-xl border border-indigo-100 text-center space-y-2">
                <p className="text-xs text-indigo-900 leading-relaxed font-medium">
                  سيتم توجيهك إلى بوابة PayPal الآمنة لتسجيل الدخول وتأكيد عملية إيداع مبلغ الضمان لحساب العقد.
                </p>
                <span className="inline-block text-[11px] text-indigo-700 font-bold">
                  يدعم الرصيد، الحساب البنكي، والبطاقات المرتبطة بـ PayPal.
                </span>
              </div>
            )}

            {/* Financial Escrow Deposit Receipt */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>قيمة مرحلة العمل في العقد:</span>
                <span className="font-bold text-slate-900">{milestoneAmount.toFixed(2)} $</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>حماية حساب الضمان المالي:</span>
                <span className="font-bold text-emerald-700">100% Escrow Protection</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>المعالجة والتسوية:</span>
                <span className="text-sky-700 font-medium">مؤتمتة بالكامل في الخلفية</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-slate-950 text-sm">
                <span>المبلغ المودع في الضمان:</span>
                <span className="text-emerald-700">{totalPayable.toFixed(2)} $</span>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full py-3 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>جاري معالجة الإيداع في الضمان...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>تأكيد الدفع وحجز {totalPayable.toFixed(2)}$ في الضمان</span>
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};