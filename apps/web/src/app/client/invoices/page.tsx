'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import { Receipt, FileText, Download, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function ClientInvoicesPage() {
  const { lang, dir } = useLanguage();
  const isAr = lang === 'ar';

  const [invoices, setInvoices] = useState<any[]>([]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8" dir={dir}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Receipt className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white">
              {isAr ? 'الفواتير وسجل المدفوعات' : 'Invoices & Billing History'}
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            {isAr
              ? 'كشف تفصيلي بكافة الدفعات الصادرة، وفواتير الضرائب الإلكترونية المعتمدة، وحركات حساب الضمان Escrow.'
              : 'Detailed record of outgoing payments, verified electronic tax invoices, and Escrow account transactions.'}
          </p>
        </div>

        <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300">
          {isAr ? 'ضمان Escrow المالي 100%' : '100% Escrow Protection'}
        </div>
      </div>

      {/* Invoices Section */}
      {invoices.length === 0 ? (
        <div className="p-16 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg">
            <Receipt className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-white">
            {isAr ? 'لا توجد فواتير صادرة حالياً' : 'No Invoices Issued Yet'}
          </h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            {isAr
              ? 'ستظهر هنا كافة فواتير الدفعات المعتمدة وحسابات الضمان المالي Escrow فور بدء التعاقدات.'
              : 'All verified milestone invoices and escrow release receipts will appear here once contracts begin.'}
          </p>
          <div className="pt-2">
            <Link
              href="/post-job"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition"
            >
              <span>{isAr ? 'نشر مشروع للتعاقد' : 'Post a Job to Hire'}</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-bold">
                  <th className="p-4">{isAr ? 'رقم الفاتورة' : 'Invoice #'}</th>
                  <th className="p-4">{isAr ? 'المشروع / العقد' : 'Project / Contract'}</th>
                  <th className="p-4">{isAr ? 'المهندس' : 'Engineer'}</th>
                  <th className="p-4">{isAr ? 'التاريخ' : 'Date'}</th>
                  <th className="p-4">{isAr ? 'المبلغ الإجمالي' : 'Total Amount'}</th>
                  <th className="p-4">{isAr ? 'الحالة' : 'Status'}</th>
                  <th className="p-4 text-center">{isAr ? 'الإجراء' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-4 font-mono font-bold text-cyan-400">{inv.id}</td>
                    <td className="p-4 font-medium text-white max-w-xs truncate">{inv.title[lang]}</td>
                    <td className="p-4 text-slate-300">{inv.engineer[lang]}</td>
                    <td className="p-4 text-slate-400 font-mono">{inv.date}</td>
                    <td className="p-4 font-mono font-bold text-white">{inv.total}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[11px]">
                        {inv.status[lang]}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        href={`/invoices/${inv.id}/tax-invoice`}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-lg text-xs font-bold transition inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{isAr ? 'عرض الفاتورة' : 'View Invoice'}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Brand Footer */}
      <div className="text-center pt-6 text-[11px] text-slate-500 border-t border-slate-800/60">
        <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'} • Satcom Engineers</span>
      </div>
    </div>
  );
}