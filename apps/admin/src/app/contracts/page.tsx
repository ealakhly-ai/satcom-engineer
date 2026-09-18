'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileCheck, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  DollarSign, 
  CheckCircle2, 
  CreditCard, 
  Save, 
  RotateCcw, 
  X,
  Inbox
} from 'lucide-react';
import { useAdminLanguage } from '../../context/AdminLanguageContext';

export interface ContractItem {
  id: string;
  title: string;
  category: string;
  clientName: string;
  clientEmail: string;
  engineerName: string;
  engineerEmail: string;
  budget: number;
  platformFee: number;
  paymentGateway: 'Stripe' | 'PayPal' | 'Wire / SWIFT' | 'USDT Escrow';
  status: 'FUNDED_IN_ESCROW' | 'IN_PROGRESS' | 'SUBMITTED' | 'APPROVED' | 'DISPUTED';
  milestoneTitle: string;
  milestoneAmount: number;
  createdAt: string;
}

// Backend automated commission calculation: $20 for every $300 tier
const calculatePlatformFee = (amount: number): number => {
  if (!amount || amount <= 0) return 0;
  return Math.max(20, Math.ceil(amount / 300) * 20);
};

export default function AdminContractsPage() {
  const { t, dir } = useAdminLanguage();
  const [contracts, setContracts] = useState<ContractItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingContract, setEditingContract] = useState<ContractItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Contract Form State
  const [newContract, setNewContract] = useState<Partial<ContractItem>>({
    title: '',
    category: 'Ka-Band / Antenna',
    clientName: '',
    clientEmail: '',
    engineerName: '',
    engineerEmail: '',
    budget: 1000,
    platformFee: 50,
    paymentGateway: 'Stripe',
    status: 'FUNDED_IN_ESCROW',
    milestoneTitle: 'المرحلة 1: تسليم النماذج الهندسية الأولية',
    milestoneAmount: 500,
  });

  // Load contracts from localStorage (clean initial state)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('satcom_contracts');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setContracts(parsed);
          return;
        }
      }
    } catch {}
    setContracts([]);
  }, []);

  const saveContractsState = (updated: ContractItem[]) => {
    setContracts(updated);
    try {
      localStorage.setItem('satcom_contracts', JSON.stringify(updated));
    } catch {}
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ADD CONTRACT
  const handleAddContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContract.title || !newContract.clientName || !newContract.engineerName) {
      alert('يرجى ملء كافة البيانات الأساسية');
      return;
    }

    const created: ContractItem = {
      id: `CTR-${Math.floor(10000 + Math.random() * 90000)}`,
      title: newContract.title || '',
      category: newContract.category || 'Satcom Systems',
      clientName: newContract.clientName || '',
      clientEmail: newContract.clientEmail || 'client@domain.com',
      engineerName: newContract.engineerName || '',
      engineerEmail: newContract.engineerEmail || 'engineer@satcom.com',
      budget: Number(newContract.budget) || 1000,
      platformFee: calculatePlatformFee(Number(newContract.budget) || 1000),
      paymentGateway: (newContract.paymentGateway as any) || 'Stripe',
      status: (newContract.status as any) || 'FUNDED_IN_ESCROW',
      milestoneTitle: newContract.milestoneTitle || 'Milestone 1',
      milestoneAmount: Number(newContract.milestoneAmount) || ((Number(newContract.budget) || 1000) / 2),
      createdAt: new Date().toISOString().split('T')[0],
    };

    saveContractsState([created, ...contracts]);
    setShowAddModal(false);
    setNewContract({
      title: '',
      category: 'Ka-Band / Antenna',
      clientName: '',
      clientEmail: '',
      engineerName: '',
      engineerEmail: '',
      budget: 1000,
      platformFee: calculatePlatformFee(1000),
      paymentGateway: 'Stripe',
      status: 'FUNDED_IN_ESCROW',
      milestoneTitle: 'المرحلة 1',
      milestoneAmount: 500,
    });
    showToast(`✓ تم إنشاء العقد الجديد بنجاح برقم (${created.id})`);
  };

  // EDIT CONTRACT
  const handleStartEdit = (ctr: ContractItem) => {
    setEditingContract({ ...ctr });
    setShowEditModal(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContract) return;

    const updated = contracts.map((item) => (item.id === editingContract.id ? editingContract : item));
    saveContractsState(updated);
    setShowEditModal(false);
    showToast(`✓ تم تحديث وتعديل بيانات العقد (${editingContract.id}) بنجاح`);
  };

  // DELETE CONTRACT
  const handleDeleteContract = (id: string) => {
    if (confirm(`هل أنت متأكد من حذف أو أرشفة العقد ${id} نهائياً من النظام؟`)) {
      const updated = contracts.filter((item) => item.id !== id);
      saveContractsState(updated);
      showToast(`تم حذف العقد (${id})`);
    }
  };

  // QUICK RELEASE FUNDS
  const handleReleaseFunds = (id: string) => {
    const updated = contracts.map((item) =>
      item.id === id ? { ...item, status: 'APPROVED' as const } : item
    );
    saveContractsState(updated);
    showToast(`✓ تم تحرير مبلغ الضمان 100% للمهندس في العقد (${id}) وقيد عمولة المنصة آلياً.`);
  };

  // QUICK REFUND CLIENT
  const handleRefundClient = (id: string) => {
    if (confirm(`هل أنت متأكد من استرداد كامل المبلغ وإلغاء العقد ${id} لصالح العميل؟`)) {
      const updated = contracts.map((item) =>
        item.id === id ? { ...item, status: 'DISPUTED' as const } : item
      );
      saveContractsState(updated);
      showToast(`تم تغيير حالة العقد (${id}) إلى تسوية نزاع واسترداد.`);
    }
  };

  // Filtered List
  const filteredContracts = contracts.filter((ctr) => {
    if (statusFilter !== 'ALL' && ctr.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ctr.title.toLowerCase().includes(q);
      const matchClient = ctr.clientName.toLowerCase().includes(q);
      const matchEng = ctr.engineerName.toLowerCase().includes(q);
      const matchId = ctr.id.toLowerCase().includes(q);
      if (!matchTitle && !matchClient && !matchEng && !matchId) return false;
    }
    return true;
  });

  const totalEscrowHeld = contracts
    .filter((c) => c.status === 'FUNDED_IN_ESCROW' || c.status === 'IN_PROGRESS' || c.status === 'SUBMITTED')
    .reduce((sum, c) => sum + (c.budget || 0), 0);

  const totalFeesEarned = contracts
    .filter((c) => c.status === 'APPROVED')
    .reduce((sum, c) => sum + (c.platformFee || 0), 0);

  const statusMap: Record<string, { label: string; color: string }> = {
    FUNDED_IN_ESCROW: {
      label: t('filterFunded'),
      color: 'bg-amber-950/70 text-amber-300 border-amber-500/30',
    },
    IN_PROGRESS: {
      label: t('filterInProgress'),
      color: 'bg-sky-950/70 text-sky-300 border-sky-500/30',
    },
    SUBMITTED: {
      label: t('filterSubmitted'),
      color: 'bg-purple-950/70 text-purple-300 border-purple-500/30',
    },
    APPROVED: {
      label: t('filterApproved'),
      color: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30',
    },
    DISPUTED: {
      label: t('filterDisputed'),
      color: 'bg-rose-950/70 text-rose-300 border-rose-500/30',
    },
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 min-h-screen text-slate-100" dir={dir}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 p-4 bg-emerald-600 text-white rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce border border-emerald-400/40">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <FileCheck className="w-7 h-7 text-cyan-400" />
            <span>{t('contractsHeaderTitle')}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {t('contractsHeaderSub')}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white rounded-2xl text-xs font-black shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addContractBtn')}</span>
        </button>
      </div>

      {/* Statistics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-xl hover:border-cyan-500/30 transition">
          <span className="text-xs text-slate-400 font-bold block">{t('statTotalContracts')}</span>
          <span className="text-2xl font-black text-white mt-1 block">{contracts.length}</span>
          <span className="text-[11px] text-slate-400 block mt-1">Contracts</span>
        </div>

        <div className="p-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-xl hover:border-cyan-500/30 transition">
          <span className="text-xs text-slate-400 font-bold block">{t('statActiveEscrow')}</span>
          <span className="text-2xl font-black text-cyan-400 mt-1 block">${totalEscrowHeld.toLocaleString()}.00</span>
          <span className="text-[11px] text-cyan-300 block mt-1">Escrow Vault</span>
        </div>

        <div className="p-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-xl hover:border-cyan-500/30 transition">
          <span className="text-xs text-slate-400 font-bold block">{t('statFeesEarned')}</span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">${totalFeesEarned.toLocaleString()}.00</span>
          <span className="text-[11px] text-emerald-300 block mt-1">Net Platform Revenue</span>
        </div>

        <div className="p-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-xl hover:border-cyan-500/30 transition">
          <span className="text-xs text-slate-400 font-bold block">{t('statGateways')}</span>
          <span className="text-base font-black text-cyan-300 mt-2 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-cyan-400" />
            <span>Stripe, PayPal, SWIFT, USDT</span>
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">100% Escrow Protection</span>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="bg-slate-900/90 backdrop-blur-xl p-4 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className={`w-4 h-4 text-slate-500 absolute top-3 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className={`w-full ${dir === 'rtl' ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-2 text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-slate-950 text-white placeholder-slate-500`}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { key: 'ALL', label: t('allFilter') },
            { key: 'FUNDED_IN_ESCROW', label: t('filterFunded') },
            { key: 'IN_PROGRESS', label: t('filterInProgress') },
            { key: 'SUBMITTED', label: t('filterSubmitted') },
            { key: 'APPROVED', label: t('filterApproved') },
            { key: 'DISPUTED', label: t('filterDisputed') },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => setStatusFilter(btn.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                statusFilter === btn.key
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contracts Table / Empty State */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        {filteredContracts.length === 0 ? (
          <div className="py-16 text-center space-y-3 px-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
              <Inbox className="w-8 h-8 text-cyan-400/80" />
            </div>
            <h3 className="text-base font-black text-white">{t('emptyContractsTitle')}</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              {t('emptyContractsDesc')}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white rounded-xl text-xs font-black shadow-lg shadow-cyan-500/25 transition inline-flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t('addContractBtn')}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={`w-full text-xs ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-extrabold">
                <tr>
                  <th className="py-3.5 px-4">{t('colProject')}</th>
                  <th className="py-3.5 px-4">{t('colParties')}</th>
                  <th className="py-3.5 px-4">{t('colAmount')}</th>
                  <th className="py-3.5 px-4">{t('colFee')}</th>
                  <th className="py-3.5 px-4">{t('colGateway')}</th>
                  <th className="py-3.5 px-4">{t('colStatus')}</th>
                  <th className="py-3.5 px-4 text-center">{t('colActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredContracts.map((ctr) => (
                  <tr key={ctr.id} className="hover:bg-slate-850 transition">
                    {/* Contract & Project */}
                    <td className="py-4 px-4">
                      <div className="font-extrabold text-white line-clamp-1">{ctr.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                        <span className="font-mono text-cyan-400 font-bold">{ctr.id}</span>
                        <span>•</span>
                        <span className="bg-slate-800 px-1.5 py-0.2 rounded text-slate-300 border border-slate-700">{ctr.category}</span>
                        <span>•</span>
                        <span>{ctr.createdAt}</span>
                      </div>
                    </td>

                    {/* Client & Engineer */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-200">
                        <span className="text-slate-400 text-[10px]">{dir === 'rtl' ? 'العميل: ' : 'Client: '}</span>
                        {ctr.clientName}
                      </div>
                      <div className="font-bold text-cyan-300 mt-0.5">
                        <span className="text-slate-400 text-[10px]">{dir === 'rtl' ? 'المهندس: ' : 'Engineer: '}</span>
                        {ctr.engineerName}
                      </div>
                    </td>

                    {/* Budget */}
                    <td className="py-4 px-4 font-black text-emerald-400 text-sm">
                      ${Number(ctr.budget || 0).toLocaleString()}
                    </td>

                    {/* Platform Fee */}
                    <td className="py-4 px-4">
                      <span className="font-extrabold text-amber-300 bg-amber-950/70 px-2 py-0.5 rounded-lg border border-amber-500/30">
                        ${ctr.platformFee || calculatePlatformFee(ctr.budget)}.00
                      </span>
                    </td>

                    {/* Payment Gateway */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 font-bold text-slate-300 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
                        <CreditCard className="w-3 h-3 text-cyan-400" />
                        <span>{ctr.paymentGateway}</span>
                      </span>
                    </td>

                    {/* Escrow Status */}
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusMap[ctr.status]?.color || 'bg-slate-800 text-slate-300'}`}>
                        {statusMap[ctr.status]?.label || ctr.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleStartEdit(ctr)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition cursor-pointer border border-slate-700"
                          title={dir === 'rtl' ? 'تعديل بيانات العقد' : 'Edit contract'}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Release Funds (if not approved yet) */}
                        {ctr.status !== 'APPROVED' && (
                          <button
                            onClick={() => handleReleaseFunds(ctr.id)}
                            className="p-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 rounded-lg transition cursor-pointer border border-emerald-500/30"
                            title={dir === 'rtl' ? 'تحرير أموال الضمان للمهندس 100%' : 'Release 100% Escrow Funds to Engineer'}
                          >
                            <DollarSign className="w-4 h-4" />
                          </button>
                        )}

                        {/* Refund / Dispute button */}
                        {ctr.status !== 'APPROVED' && ctr.status !== 'DISPUTED' && (
                          <button
                            onClick={() => handleRefundClient(ctr.id)}
                            className="p-1.5 bg-amber-950 hover:bg-amber-900 text-amber-400 rounded-lg transition cursor-pointer border border-amber-500/30"
                            title={dir === 'rtl' ? 'إلغاء واسترداد للعميل' : 'Cancel & refund to client'}
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteContract(ctr.id)}
                          className="p-1.5 bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 rounded-lg transition border border-slate-700"
                          title={dir === 'rtl' ? 'حذف العقد' : 'Delete contract'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= ADD CONTRACT MODAL ================= */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-cyan-400" />
                  <span>{dir === 'rtl' ? 'إنشاء عقد جديد بواسطة الإدارة' : 'Create New Admin Contract'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {dir === 'rtl' ? 'إدراج عقد هندسي مباشر وتأمين أمواله بحساب الضمان Escrow' : 'Directly insert contract and secure funds in Escrow Vault'}
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddContract} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {dir === 'rtl' ? 'عنوان المشروع / العقد' : 'Project / Contract Title'}
                </label>
                <input
                  type="text"
                  required
                  value={newContract.title}
                  onChange={(e) => setNewContract({ ...newContract, title: e.target.value })}
                  placeholder={dir === 'rtl' ? 'مثال: تصميم مصفوفة هوائيات Ka-Band للأقمار LEO' : 'e.g. Ka-Band Phased Array Antenna Design for LEO'}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-slate-950 text-white"
                />
              </div>

              {/* Category & Payment Gateway */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {dir === 'rtl' ? 'التخصص / النطاق' : 'Category / Band'}
                  </label>
                  <select
                    value={newContract.category}
                    onChange={(e) => setNewContract({ ...newContract, category: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-slate-950 text-white"
                  >
                    <option value="Ka-Band / Antenna">Ka-Band / Antenna Design</option>
                    <option value="Ku-Band / Link Budget">Ku-Band / Link Budget</option>
                    <option value="C-Band / RF Systems">C-Band / RF Systems</option>
                    <option value="SDR / Signal Processing">SDR & GNU Radio</option>
                    <option value="CubeSat Telemetry">CubeSat Telemetry & UHF</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {dir === 'rtl' ? 'بوابة الدفع العالمية المستخدمة' : 'Global Payment Gateway'}
                  </label>
                  <select
                    value={newContract.paymentGateway}
                    onChange={(e) => setNewContract({ ...newContract, paymentGateway: e.target.value as any })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-slate-950 text-white"
                  >
                    <option value="Stripe">Stripe (Visa/MasterCard)</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Wire / SWIFT">Wire Transfer / SWIFT</option>
                    <option value="USDT Escrow">USDT / USDC Escrow</option>
                  </select>
                </div>
              </div>

              {/* Client & Engineer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {dir === 'rtl' ? 'اسم العميل (أو الشركة)' : 'Client / Company Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newContract.clientName}
                    onChange={(e) => setNewContract({ ...newContract, clientName: e.target.value })}
                    placeholder="SpaceTech Solutions"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-slate-950 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {dir === 'rtl' ? 'اسم المهندس المستقل' : 'Engineer Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newContract.engineerName}
                    onChange={(e) => setNewContract({ ...newContract, engineerName: e.target.value })}
                    placeholder="Dr. Tariq Al-Mansoor"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-slate-950 text-white"
                  />
                </div>
              </div>

              {/* Financials: Budget & Fee */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {dir === 'rtl' ? 'إجمالي قيمة العقد ($)' : 'Contract Budget ($)'}
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={newContract.budget}
                    onChange={(e) => setNewContract({ ...newContract, budget: Number(e.target.value) })}
                    className="w-full p-2 text-xs font-bold rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-slate-900 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {dir === 'rtl' ? 'عمولة المنصة ($20 لكل $300)' : 'Platform Fee ($20 / $300)'}
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`$${calculatePlatformFee(Number(newContract.budget) || 0)}.00`}
                    className="w-full p-2 text-xs font-bold rounded-xl border border-slate-800 bg-slate-900 text-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {dir === 'rtl' ? 'صافي ما يستلمه المهندس ($)' : 'Engineer Net Payout ($)'}
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`$${newContract.budget || 0} (100%)`}
                    className="w-full p-2 text-xs font-bold rounded-xl border border-emerald-500/40 bg-emerald-950/60 text-emerald-300"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {dir === 'rtl' ? 'حالة العقد الأولية' : 'Initial Escrow Status'}
                </label>
                <select
                  value={newContract.status}
                  onChange={(e) => setNewContract({ ...newContract, status: e.target.value as any })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-slate-950 text-white"
                >
                  <option value="FUNDED_IN_ESCROW">{dir === 'rtl' ? 'محجوز في الضمان (Funded in Escrow)' : 'Funded in Escrow'}</option>
                  <option value="IN_PROGRESS">{dir === 'rtl' ? 'قيد التنفيذ (In Progress)' : 'In Progress'}</option>
                  <option value="APPROVED">{dir === 'rtl' ? 'مكتمل ومحرر (Approved & Released)' : 'Approved & Released'}</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl cursor-pointer"
                >
                  {dir === 'rtl' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white text-xs font-black rounded-xl shadow-lg shadow-cyan-500/25 transition cursor-pointer"
                >
                  {dir === 'rtl' ? 'حفظ وإدراج العقد' : 'Save & Insert Contract'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT CONTRACT MODAL ================= */}
      {showEditModal && editingContract && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-cyan-400" />
                  <span>{dir === 'rtl' ? `تعديل بيانات العقد (${editingContract.id})` : `Edit Contract (${editingContract.id})`}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {dir === 'rtl' ? 'تعديل الأسعار، الأطراف، وتغيير حالة الضمان Escrow' : 'Modify budget, parties, and Escrow status'}
                </p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {dir === 'rtl' ? 'عنوان المشروع' : 'Project Title'}
                </label>
                <input
                  type="text"
                  required
                  value={editingContract.title}
                  onChange={(e) => setEditingContract({ ...editingContract, title: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-slate-950 text-white"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {dir === 'rtl' ? 'حالة الضمان المالي (Escrow Status)' : 'Escrow Vault Status'}
                </label>
                <select
                  value={editingContract.status}
                  onChange={(e) => setEditingContract({ ...editingContract, status: e.target.value as any })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-slate-950 text-white font-bold"
                >
                  <option value="FUNDED_IN_ESCROW">{dir === 'rtl' ? 'محجوز في الضمان (FUNDED_IN_ESCROW)' : 'Funded in Escrow'}</option>
                  <option value="IN_PROGRESS">{dir === 'rtl' ? 'قيد التنفيذ (IN_PROGRESS)' : 'In Progress'}</option>
                  <option value="SUBMITTED">{dir === 'rtl' ? 'بانتظار الاعتماد (SUBMITTED)' : 'Submitted for Approval'}</option>
                  <option value="APPROVED">{dir === 'rtl' ? 'مكتمل ومحرر للمهندس (APPROVED)' : 'Approved & Released'}</option>
                  <option value="DISPUTED">{dir === 'rtl' ? 'نزاع قيد التحكيم (DISPUTED)' : 'Disputed / In Arbitration'}</option>
                </select>
              </div>

              {/* Client & Engineer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {dir === 'rtl' ? 'اسم العميل' : 'Client Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingContract.clientName}
                    onChange={(e) => setEditingContract({ ...editingContract, clientName: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-slate-950 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {dir === 'rtl' ? 'اسم المهندس' : 'Engineer Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingContract.engineerName}
                    onChange={(e) => setEditingContract({ ...editingContract, engineerName: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-slate-950 text-white"
                  />
                </div>
              </div>

              {/* Budget & Payment Gateway */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {dir === 'rtl' ? 'إجمالي قيمة العقد ($)' : 'Contract Budget ($)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={editingContract.budget}
                    onChange={(e) => {
                      const b = Number(e.target.value);
                      setEditingContract({ 
                        ...editingContract, 
                        budget: b, 
                        platformFee: calculatePlatformFee(b) 
                      });
                    }}
                    className="w-full p-2.5 text-xs font-bold rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-slate-950 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {dir === 'rtl' ? 'بوابة الدفع العالمية' : 'Payment Gateway'}
                  </label>
                  <select
                    value={editingContract.paymentGateway}
                    onChange={(e) => setEditingContract({ ...editingContract, paymentGateway: e.target.value as any })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-slate-950 text-white"
                  >
                    <option value="Stripe">Stripe</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Wire / SWIFT">Wire / SWIFT</option>
                    <option value="USDT Escrow">USDT Escrow</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl cursor-pointer"
                >
                  {dir === 'rtl' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white text-xs font-black rounded-xl shadow-lg shadow-cyan-500/25 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{dir === 'rtl' ? 'حفظ التعديلات' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}