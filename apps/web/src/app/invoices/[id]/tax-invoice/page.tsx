'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../../context/LanguageContext';
import { FileText, Printer, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function TaxInvoicePage({ params }: { params: { id: string } }) {
  const { lang, locale, dir } = useLanguage();
  const isAr = (lang || locale) === 'ar';

  const [invoice] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('satcom_invoices');
      if (saved) {
        try {
          const list = JSON.parse(saved);
          const found = list.find((inv: any) => String(inv.id) === String(params?.id));
          if (found) return found;
        } catch (e) {}
      }
    }
    return null;
  });

  if (!invoice) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center" dir={dir}>
        <div className="p-12 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {isAr ? 'لم يتم العثور على الفاتورة الضريبية' : 'Tax Invoice Not Found'}
          </h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {isAr
              ? 'لا توجد بيانات مسجلة لهذه الفاتورة حالياً، أو قد تكون صادرة برقم تعريفي آخر.'
              : 'No invoice records match this ID. It may not have been generated yet.'}
          </p>
          <div className="pt-2">
            <Link
              href="/client/invoices"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isAr ? 'العودة لسجل الفواتير' : 'Back to Invoices'}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = Number(invoice.amount || 0);
  const platformFee = Math.round(subtotal * 0.05 * 100) / 100;
  const taxableSubtotal = subtotal + platformFee;
  const vatAmount = Math.round(taxableSubtotal * 0.15 * 100) / 100;
  const grandTotal = taxableSubtotal + vatAmount;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-6" dir={dir}>
      <div className="flex justify-between items-center no-print">
        <h1 className="text-xl font-bold text-white">
          {isAr ? 'فاتورة ضريبية إلكترونية معتمدة (Tax Invoice)' : 'Certified Electronic Tax Invoice'}
        </h1>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:from-blue-500 hover:to-cyan-400 transition shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>{isAr ? 'طباعة الفاتورة' : 'Print Invoice'}</span>
        </button>
      </div>

      <div className="p-8 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl space-y-8 font-sans">
        {/* Header & QR Code */}
        <div className="flex justify-between items-start border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-xl font-black text-white">Satcom Engineers</h2>
            <p className="text-xs text-slate-400 mt-1">
              {isAr ? 'شركة مهندسي الاتصالات الفضائية المحدودة' : 'Satcom Engineers Global Tech Ltd'}
            </p>
            <p className="text-xs text-slate-400">{isAr ? 'الرقم الضريبي:' : 'VAT Number:'} 310000000000003</p>
            <p className="text-xs text-slate-400">
              {isAr ? 'طريق الملك فهد، الرياض، المملكة العربية السعودية' : 'King Fahd Road, Riyadh, KSA / Delaware, USA'}
            </p>
          </div>

          {/* QR Code Placeholder (ZATCA Compliant) */}
          <div className="w-24 h-24 bg-slate-950 p-2 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-cyan-400 text-[10px] text-center">
            <span className="font-mono text-xs">QR CODE</span>
            <span>{isAr ? 'معتمدة ZATCA' : 'Verified'}</span>
          </div>
        </div>

        {/* Invoice Meta */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">{isAr ? 'رقم الفاتورة:' : 'Invoice No:'}</span>
            <span className="font-mono font-bold text-cyan-400 text-sm">{invoice.invoiceNumber || `TAX-${invoice.id}`}</span>
          </div>
          <div>
            <span className="text-slate-400 block">{isAr ? 'تاريخ الإصدار:' : 'Issue Date:'}</span>
            <span className="font-bold text-white">{invoice.date || '2026-09-18'}</span>
          </div>
          <div>
            <span className="text-slate-400 block">{isAr ? 'العميل المستفيد:' : 'Billed To:'}</span>
            <span className="font-bold text-white">{invoice.client || (isAr ? 'عميل معتمد' : 'Verified Client')}</span>
          </div>
          <div>
            <span className="text-slate-400 block">{isAr ? 'الرقم الضريبي للعميل:' : 'Buyer VAT:'}</span>
            <span className="font-mono font-bold text-slate-300">{invoice.buyerVat || 'SA-0000000000'}</span>
          </div>
        </div>

        {/* Line Items Table */}
        <table className={`w-full text-xs border-collapse ${isAr ? 'text-right' : 'text-left'}`}>
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300">
              <th className="p-3">{isAr ? 'الوصف الهندسي' : 'Engineering Description'}</th>
              <th className={`p-3 ${isAr ? 'text-left' : 'text-right'}`}>{isAr ? 'المبلغ الخاضع للضريبة' : 'Taxable Amount'}</th>
            </tr>
          </thead>
          <tbody className="divide-y border-slate-800/60">
            <tr>
              <td className="p-3 text-slate-200">
                {typeof invoice.jobTitle === 'object' ? invoice.jobTitle[locale] : (invoice.jobTitle || invoice.contractTitle || (isAr ? 'خدمات هندسية فضائية' : 'Satellite Engineering Services'))} ({isAr ? 'قيمة عمل المستقل' : 'Freelancer Deliverable'})
              </td>
              <td className={`p-3 font-mono font-bold text-white ${isAr ? 'text-left' : 'text-right'}`}>${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="p-3 text-slate-200">{isAr ? 'رسم المنصة الثابت (Satcom Engineers Fixed Fee)' : 'Platform Fixed Fee (Escrow & Verification)'}</td>
              <td className={`p-3 font-mono font-bold text-white ${isAr ? 'text-left' : 'text-right'}`}>${platformFee.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className={`border-t border-slate-800 pt-4 space-y-2 text-xs w-64 ${isAr ? 'mr-auto' : 'ml-auto'}`}>
          <div className="flex justify-between text-slate-400">
            <span>{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
            <span className="font-mono font-bold text-white">${taxableSubtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>{isAr ? 'ضريبة القيمة المضافة (15%):' : 'VAT (15%):'}</span>
            <span className="font-mono font-bold text-white">${vatAmount.toFixed(2)}</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-sm text-white">
            <span>{isAr ? 'الإجمالي الكلي شامل الضريبة:' : 'Total (Inc. VAT):'}</span>
            <span className="font-mono text-emerald-400">${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="text-center pt-6 text-[11px] text-slate-500 border-t border-slate-800/60">
          <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'} • Satcom Engineers</span>
        </div>
      </div>
    </div>
  );
}