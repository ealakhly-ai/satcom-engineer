'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Clock, AlertTriangle, Send, FileText, DollarSign, ChevronDown, Check, ArrowRight, Sparkles, Printer, X } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export default function ContractDetailsPage({ params }: { params: { id: string } }) {
  const { t, locale, dir } = useLanguage();
  const isAr = locale === 'ar';

  const [contract, setContract] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('satcom_contracts');
      if (saved) {
        try {
          const list = JSON.parse(saved);
          const found = list.find((c: any) => String(c.id) === String(params?.id));
          if (found) return found;
        } catch (e) {}
      }
    }
    return null;
  });

  const [milestones, setMilestones] = useState<any[]>(() => {
    return contract?.milestones || [];
  });

  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeOpened, setDisputeOpened] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);

  // Submit delivery for active milestone
  const handleDeliverMilestone = (idx: number) => {
    if (!deliveryNotes) return;
    setMilestones((prev) =>
      prev.map((m, i) =>
        i === idx
          ? {
              ...m,
              status: 'SUBMITTED',
              deliveries: [
                {
                  notes: deliveryNotes,
                  files: ['deliverable_package.zip', 'technical_report.pdf'],
                },
              ],
            }
          : m
      )
    );
    setDeliveryNotes('');
  };

  // Client approves milestone and releases funds
  const handleApproveMilestone = (idx: number) => {
    setMilestones((prev) =>
      prev.map((m, i) =>
        i === idx ? { ...m, status: 'APPROVED' } : m
      )
    );
  };

  const isContractCompleted = milestones.length > 0 && milestones.every((m) => m.status === 'APPROVED');
  const totalAmount = milestones.reduce((sum, m) => sum + (Number(m.amount) || 0), 0);
  const approvedAmount = milestones.filter(m => m.status === 'APPROVED').reduce((sum, m) => sum + (Number(m.amount) || 0), 0);
  const escrowAmount = totalAmount - approvedAmount;

  if (!contract) {
    return (
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-${isAr ? 'right' : 'left'}`} dir={dir}>
        <div className="bg-slate-900/90 backdrop-blur-xl p-16 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/60 flex items-center justify-center mx-auto text-slate-500">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {isAr ? 'العقد غير موجود أو لم يتم إنشاؤه بعد' : 'Contract Not Found or Not Yet Created'}
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {isAr
              ? 'لا توجد بيانات لهذا العقد حالياً. يمكنك تصفح العقود النشطة أو إنشاء عقد جديد عبر نشر مشروع وقبول عرض أحد المهندسين.'
              : 'No active contract data matches this ID. You can browse active contracts or initiate a new contract by posting a project and accepting a proposal.'}
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              href="/contracts"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition"
            >
              {isAr ? 'قائمة العقود' : 'Contracts List'}
            </Link>
            <Link
              href="/post-job"
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition"
            >
              {isAr ? 'نشر مشروع جديد' : 'Post New Job'}
            </Link>
          </div>
        </div>
        {/* Emadsoft Branding Tag */}
        <div className="pt-6 border-t border-slate-800/80 mt-8 flex justify-center items-center text-xs text-slate-400 font-semibold gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-${isAr ? 'right' : 'left'}`} dir={dir}>
      {/* Header */}
      <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'عقد محمي بحساب الضمان Escrow' : '100% Escrow Protected Contract'}</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {isAr ? `معرف العقد: #${contract.id}` : `Contract ID: #${contract.id}`}
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-2">
            {typeof contract.title === 'object' ? contract.title[locale] : contract.title}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isAr ? 'العميل: ' : 'Client: '}
            <span className="font-bold text-slate-200">{contract.client || (isAr ? 'عميل معتمد' : 'Verified Client')}</span>
            {' • '}
            {isAr ? 'المستقل: ' : 'Freelancer: '}
            <span className="font-bold text-slate-200">{contract.freelancer || (isAr ? 'مهندس معتمد' : 'Verified Engineer')}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAgreementModal(true)}
            className="text-xs text-cyan-300 hover:text-white font-bold border border-cyan-500/30 hover:bg-cyan-500/10 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/10"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'عرض وثيقة العقد القانوني' : 'View Legal Agreement'}</span>
          </button>

          <button
            onClick={() => setShowDisputeModal(true)}
            className="text-xs text-rose-400 hover:text-rose-300 font-bold border border-rose-500/30 hover:bg-rose-500/10 px-3.5 py-2 rounded-xl transition flex items-center gap-1 cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{isAr ? 'طلب تحكيم وفض نزاع' : 'Dispute Arbitration'}</span>
          </button>
        </div>
      </div>

      {disputeOpened && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-300 text-xs font-medium flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            {isAr
              ? 'تم رفع النزاع إلى لجنة التحكيم بالمنصة. سيقوم مهندس تحكيم معتمد بمراجعة ملفات التسليم وحل المسألة خلال 48 ساعة.'
              : 'Dispute submitted to arbitration panel. A certified technical engineer will review deliverables within 48h.'}
          </span>
        </div>
      )}

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl">
          <span className="text-xs text-slate-400 block">{isAr ? 'إجمالي العقد' : 'Total Contract Value'}</span>
          <span className="text-2xl font-black text-white font-mono">${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          <span className="text-[11px] text-slate-400 block mt-1">{isAr ? 'قيمة مخرجات المهندس' : 'Deliverables Total'}</span>
        </div>

        <div className="p-5 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl">
          <span className="text-xs text-slate-400 block">{isAr ? 'نسبة إنجاز المشروع' : 'Milestone Completion'}</span>
          <span className="text-2xl font-black text-cyan-400 font-mono">
            {totalAmount > 0 ? `${Math.round((approvedAmount / totalAmount) * 100)}%` : '0%'}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">
            {milestones.length} {isAr ? 'مراحل عمل' : 'Milestones'}
          </span>
        </div>

        <div className="p-5 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl">
          <span className="text-xs text-slate-400 block">{isAr ? 'المبلغ المحرر حتى الآن' : 'Released Funds'}</span>
          <span className="text-2xl font-black text-emerald-400 font-mono">
            ${approvedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">{isAr ? 'أودع في حساب المهندس' : 'Disbursed to Engineer'}</span>
        </div>

        <div className="p-5 bg-cyan-950/40 rounded-3xl border border-cyan-800/60 shadow-2xl">
          <span className="text-xs text-cyan-300 block">{isAr ? 'المحجوز في Escrow' : 'Funded in Escrow'}</span>
          <span className="text-2xl font-black text-white font-mono">
            ${escrowAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-cyan-300/80 block mt-1">{isAr ? 'مؤمن للمراحل النشطة' : 'Secured for Active Milestones'}</span>
        </div>
      </div>

      {/* Milestones Flow */}
      <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <h2 className="text-lg font-black text-white">
          {isAr ? 'جدول مراحل العمل والدفعات (Milestones)' : 'Milestone Schedule & Deliverable Approvals'}
        </h2>

        {milestones.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-xs">
            {isAr ? 'لا توجد مراحل محددة لهذا العقد حتى الآن.' : 'No milestones specified for this contract yet.'}
          </div>
        ) : (
          <div className="space-y-4">
            {milestones.map((m: any, idx: number) => {
              const mTitle = typeof m.title === 'object' ? m.title[locale] : m.title;
              const isApproved = m.status === 'APPROVED';
              const isSubmitted = m.status === 'SUBMITTED';

              return (
                <div
                  key={m.id || idx}
                  className={`p-5 rounded-2xl border transition space-y-4 ${
                    isApproved
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : isSubmitted
                      ? 'border-amber-500/30 bg-amber-500/5'
                      : 'border-cyan-500/30 bg-cyan-500/5'
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                          isApproved
                            ? 'bg-emerald-500 text-slate-950'
                            : isSubmitted
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-cyan-500 text-slate-950'
                        }`}
                      >
                        {isApproved ? '✓' : idx + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white">{mTitle}</h3>
                        <span
                          className={`text-xs font-medium ${
                            isApproved
                              ? 'text-emerald-400'
                              : isSubmitted
                              ? 'text-amber-300'
                              : 'text-cyan-300'
                          }`}
                        >
                          {isApproved
                            ? (isAr ? 'تم الاعتماد وتحرير الدفعة للمهندس المستقل ✓' : 'Approved & Disbursed to Engineer ✓')
                            : isSubmitted
                            ? (isAr ? 'تم تسليم العمل وبانتظار مراجعة واعتماد العميل' : 'Submitted & Awaiting Client Review')
                            : (isAr ? 'ممولة في الضمان Escrow وقيد التنفيذ' : 'Funded in Escrow • In Progress')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-base font-black text-white font-mono">
                        ${Number(m.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Freelancer Delivery input */}
                  {m.status === 'FUNDED_IN_ESCROW' && (
                    <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
                      <span className="font-bold text-xs text-slate-200 block">
                        {isAr ? `تسليم مخرجات المرحلة ${idx + 1} (من طرف المستقل):` : `Submit Deliverables for Milestone ${idx + 1} (Freelancer):`}
                      </span>
                      <textarea
                        rows={3}
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        placeholder={isAr ? 'اكتب تفاصيل التسليم وروابط ملفات العمل...' : 'Add deliverable notes, technical documentation links...'}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                      <button
                        onClick={() => handleDeliverMilestone(idx)}
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isAr ? 'تسليم مخرجات المرحلة' : 'Submit Deliverables'}</span>
                      </button>
                    </div>
                  )}

                  {/* Client Approval input */}
                  {m.status === 'SUBMITTED' && (
                    <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/30 space-y-3">
                      <div className="text-xs text-amber-300 font-bold flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>{isAr ? 'قام المهندس المستقل بتسليم المخرجات للمراجعة:' : 'Engineer delivered milestone output for approval:'}</span>
                      </div>
                      <p className="text-xs text-slate-200 italic bg-slate-900/80 p-3 rounded-xl border border-amber-500/20">
                        {m.deliveries?.[0]?.notes || (isAr ? 'تم استكمال وتسليم متطلبات المرحلة بنجاح.' : 'Milestone deliverables submitted successfully.')}
                      </p>
                      <div className="flex items-center gap-3 pt-1">
                        <button
                          onClick={() => handleApproveMilestone(idx)}
                          className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>{isAr ? `اعتماد التسليم وتحرير $${m.amount} للمستقل فوراً` : `Approve & Disburse $${m.amount}`}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {isApproved && (
                    <div className="p-4 bg-emerald-500/15 rounded-2xl border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>{isAr ? 'تم اعتماد هذه المرحلة وتحرير مستحقاتها بنجاح.' : 'Milestone approved and payout released successfully.'}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Final Completion Box */}
        {isContractCompleted && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/40 text-white text-center space-y-3 shadow-2xl">
            <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400" />
            <h3 className="text-xl font-black">
              {isAr ? 'اكتمل العقد بنجاح وتم إغلاقه رسمياً!' : 'Contract Completed & Sealed Successfully!'}
            </h3>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              {isAr
                ? `تم تحرير كامل مستحقات المهندس المستقل ($${totalAmount.toFixed(2)}) بنجاح بنسبة 100%، وتمت تسوية وإغلاق العقد عبر حساب الضمان Escrow.`
                : `100% of contract earnings ($${totalAmount.toFixed(2)}) have been settled through the Escrow vault.`}
            </p>
          </div>
        )}
      </div>

      {/* Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-black text-base text-white">
              {isAr ? 'طلب تحكيم وفض نزاع' : 'Request Technical Arbitration'}
            </h3>
            <p className="text-xs text-slate-400">
              {isAr
                ? 'في حال تعذر الاتفاق، يتدخل فريق المنصة الهندسي لفحص مخرجات العمل والتحكيم العادل.'
                : 'In case of disagreement, Satcom certified arbiters review technical specs to ensure fair Escrow resolution.'}
            </p>
            <textarea
              rows={4}
              placeholder={isAr ? 'صف أسباب النزاع بالتفصيل...' : 'Detail dispute specifications...'}
              className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDisputeModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-400 border border-slate-800 rounded-xl hover:bg-slate-800 hover:text-white transition cursor-pointer"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={() => {
                  setShowDisputeModal(false);
                  setDisputeOpened(true);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition cursor-pointer"
              >
                {isAr ? 'تأكيد فتح النزاع' : 'Confirm Dispute Filing'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Service Contract Agreement Modal */}
      {showAgreementModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 md:p-8 space-y-6 shadow-2xl my-8 text-right max-h-[90vh] overflow-y-auto" dir={dir}>
            {/* Modal Actions */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 no-print">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <FileText className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-black text-white">
                    {isAr ? 'وثيقة العقد القانونية المعتمدة (Service Contract Agreement)' : 'Official Service Contract Agreement'}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {isAr ? `معرف العقد: #${contract.id}` : `Contract Ref: #${contract.id}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-cyan-400" />
                  <span>{isAr ? 'طباعة / حفظ PDF' : 'Print / PDF'}</span>
                </button>
                <button
                  onClick={() => setShowAgreementModal(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Content */}
            <div className="space-y-6 text-xs text-slate-300 leading-relaxed font-sans border border-slate-800 p-6 rounded-2xl bg-slate-950/60">
              {/* Header Box */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800/80 pb-4 gap-4">
                <div>
                  <h2 className="text-lg font-black text-white">Satcom Engineers Platform</h2>
                  <p className="text-[11px] text-slate-400">
                    {isAr
                      ? 'عقد خدمات هندسية وتقنية محمي بالكامل بنظام الضمان Escrow'
                      : 'Engineering Services Agreement under 100% Escrow Protection'}
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono font-bold text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'حساب الضمان: مؤمن ومفعل' : 'Escrow Vault: Funded'}</span>
                </div>
              </div>

              {/* Contract Parties & Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-400 block font-bold text-[11px] mb-0.5">{isAr ? 'الطرف الأول (صاحب العمل):' : 'First Party (Client / Buyer):'}</span>
                  <span className="font-bold text-white text-sm">{contract.client || (isAr ? 'عميل معتمد' : 'Verified Client')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[11px] mb-0.5">{isAr ? 'الطرف الثاني (المتعاقد المستقل):' : 'Second Party (Freelance Engineer):'}</span>
                  <span className="font-bold text-white text-sm">{contract.freelancer || (isAr ? 'مهندس معتمد' : 'Verified Engineer')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[11px] mb-0.5">{isAr ? 'عنوان المشروع الهندسي:' : 'Project Title:'}</span>
                  <span className="font-bold text-cyan-300">{typeof contract.title === 'object' ? contract.title[locale] : contract.title}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[11px] mb-0.5">{isAr ? 'إجمالي الميزانية المودعة في الضمان:' : 'Total Escrow Budget:'}</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">${totalAmount.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Milestones Schedule */}
              <div className="space-y-2">
                <h4 className="font-black text-white text-sm">
                  {isAr ? 'أولاً: جدول مراحل التسليم والدفعات (Milestones Schedule)' : '1. Milestone Deliverable Schedule'}
                </h4>
                <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800">
                  {milestones.map((m: any, idx: number) => (
                    <div key={idx} className="p-3 bg-slate-900/40 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-white block">
                          {idx + 1}. {typeof m.title === 'object' ? m.title[locale] : m.title}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {m.status === 'APPROVED' ? (isAr ? 'تم الاعتماد والتسليم' : 'Completed & Approved') : (isAr ? 'قيد التنفيذ ومؤمنة في الضمان' : 'In Progress & Secured')}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-cyan-300">${Number(m.amount || 0).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Clauses */}
              <div className="space-y-3">
                <h4 className="font-black text-white text-sm">
                  {isAr ? 'ثانياً: البنود والشروط القانونية الملزمة (Standard Terms)' : '2. Binding Legal Terms'}
                </h4>

                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1">
                  <span className="font-bold text-white block">
                    {isAr ? '1. نقل كامل حقوق الملكية الفكرية (Intellectual Property / Work for Hire):' : '1. Intellectual Property & Work Product Ownership:'}
                  </span>
                  <p className="text-slate-400">
                    {isAr
                      ? 'بمجرد تحرير وإفراج دفعة المرحلة من حساب الضمان (Escrow) إلى رصيد المهندس المستقل، تنتقل كافة حقوق الملكية الفكرية، وحقوق الطبع والنشر، والتصاميم الهندسية، وملفات CAD/CST، ومحاكاة ميزانية الوصلة (Link Budgets) وبراءات الاختراع ذات الصلة إلى الطرف الأول (صاحب العمل) بشكل نهائي وبنسبة 100% دون قيد أو شرط.'
                      : 'Upon release of Escrow milestone funds to the Freelancer, all intellectual property rights, copyrights, patents, simulation models, CAD files, and technical assets unconditionally transfer 100% to the Client.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1">
                  <span className="font-bold text-white block">
                    {isAr ? '2. اتفاقية السرية الفضائية وعدم الإفصاح (Space-Grade NDA & Confidentiality):' : '2. Space-Grade Confidentiality & Non-Disclosure (NDA):'}
                  </span>
                  <p className="text-slate-400">
                    {isAr
                      ? 'يلتزم الطرف الثاني (المهندس المستقل) بالحفاظ التام على سرية كافة البيانات الفنية، والترددات، والمخططات، والمستندات الحصرية التي يشاركها العميل طوال فترة سريان العقد وبعد انتهائه، ويحظر إفشاؤها أو إعادة استخدامها خارج نطاق هذا المشروع.'
                      : 'The Freelancer agrees to preserve strict confidentiality regarding all proprietary technical data, link models, and schematics shared by the Client, with strict non-disclosure obligations during and following contract conclusion.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1">
                  <span className="font-bold text-white block">
                    {isAr ? '3. آلية الضمان المالي وفترة المراجعة (Escrow & 14-Day Review Window):' : '3. Escrow Disbursement & 14-Day Acceptance Policy:'}
                  </span>
                  <p className="text-slate-400">
                    {isAr
                      ? 'تظل الأموال محجوزة في حساب الضمان حتى تقديم المخرجات. يمنح العميل مهلة 14 يوماً من تاريخ التسليم للمراجعة والاعتماد أو طلب تعديلات مطابقة لنطاق العمل. في حال انقضاء المهلة دون اعتراض، يتم تحرير المبلغ آلياً للمستقل حمايةً لحقوقه.'
                      : 'Funds remain held securely in Escrow until deliverable submission. Client receives a 14-day inspection window to approve or request revisions. If no action is taken within 14 days, funds release automatically.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1">
                  <span className="font-bold text-white block">
                    {isAr ? '4. الصفة التعاقدية وعدم الالتفاف (Contractor Status & Non-Circumvention):' : '4. Independent Contractor & Non-Circumvention Rule:'}
                  </span>
                  <p className="text-slate-400">
                    {isAr
                      ? 'يعمل الطرف الثاني كمتعاقد مهني مستقل. ويلتزم الطرفان بعدم إجراء أي تسويات مالية خارج المنصة لمدة سنتين كاملتين لضمان حماية المعاملات بحساب الضمان.'
                      : 'The Freelancer operates as an independent contractor. Both parties agree not to circumvent the platform for payments for a minimum of 24 months.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1">
                  <span className="font-bold text-white block">
                    {isAr ? '5. التحكيم الهندسي وفض النزاعات (Dispute Arbitration):' : '5. Binding Technical Arbitration:'}
                  </span>
                  <p className="text-slate-400">
                    {isAr
                      ? 'في حال نشوء أي خلاف حول مطابقة التسليمات للمواصفات، يتم إحالة النزاع إلى لجنة التحكيم الفني المعتمدة بالمنصة للفصل النهائي وتحديد مصير أموال الضمان بشكل ملزم.'
                      : 'Any disagreements concerning technical conformance shall be resolved through the platform certified technical arbitration panel with binding Escrow disposition.'}
                  </p>
                </div>
              </div>

              {/* Digital Execution Signatures */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]">
                <div>
                  <span className="text-slate-400 block">{isAr ? 'المصادقة والتوقيع الرقمي:' : 'Electronic Verification:'}</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تم التوقيع الإلكتروني وتفعيل العقد عبر Escrow' : 'Signed & Sealed via Escrow Vault Authorization'}</span>
                  </span>
                </div>
                <div className="text-slate-500 font-mono text-[10px]">
                  Satcom Engineers Legal Standard • Version 2026.1
                </div>
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800/80 no-print">
              <button
                onClick={() => setShowAgreementModal(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emadsoft Branding Tag */}
      <div className="pt-4 border-t border-slate-800/80 flex justify-center items-center text-xs text-slate-400 font-semibold gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'}</span>
      </div>
    </div>
  );
}