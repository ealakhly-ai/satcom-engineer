/**
 * Satcom Engineers Ecosystem Bridge (satcom-bridge.js)
 * Real-time unified data store, PostgreSQL backend sync, and cross-page synchronization engine.
 * Powered by localStorage with cross-tab reactive events & REST API connectivity.
 * Designed & Developed by Emadsoft
 */

(function (window) {
  'use strict';

  // Configurable API URL (Supports local development & production backend)
  const API_BASE = window.SATCOM_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:4000/api' : '');

  // Version 3: Clean production-ready keys (zero demo data)
  const STORAGE_KEYS = {
    LANG: 'satcom_lang',
    JOBS: 'satcom_shared_jobs_v3',
    CONTRACTS: 'satcom_shared_contract_v3',
    WALLET: 'satcom_shared_wallet_v3',
    PAYOUTS: 'satcom_shared_payouts_v3',
    ADMIN_LOG: 'satcom_shared_admin_ledger_v3',
    TOKEN: 'satcom_auth_token_v3'
  };

  // Completely clean initial data (Zero demo records)
  const DEFAULT_JOBS = [];

  const DEFAULT_CONTRACT = null;

  const DEFAULT_WALLET = {
    available: 0.00,
    inEscrow: 0.00,
    totalEarned: 0.00
  };

  const DEFAULT_ADMIN_LEDGER = {
    totalVolume: 0.00,
    escrowHeld: 0.00,
    platformFees: 0.00,
    activeContractsCount: 0,
    disputesCount: 0,
    verifiedEngCount: 0
  };

  function readStorage(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new CustomEvent('satcom_sync', { detail: { key, value } }));
    } catch (e) {}
  }

  const SatcomDB = {
    // API endpoint accessor
    getApiUrl: function () {
      return API_BASE;
    },

    // Check backend API & database server health
    checkServerHealth: async function () {
      if (!API_BASE) return { status: 'offline', localMode: true };
      try {
        const res = await fetch(API_BASE + '/jobs', { method: 'GET' });
        return { status: res.ok ? 'connected' : 'degraded', code: res.status };
      } catch (err) {
        return { status: 'offline', error: err.message };
      }
    },

    // Automated backend commission calculation ($20 per $300 tier)
    calculateCommission: function (amount) {
      const num = parseFloat(amount) || 0;
      const tiers = Math.floor(num / 300);
      const fee = tiers * 20.00;
      return {
        freelancerAmount: num,
        platformFee: fee,
        clientTotal: num + fee,
        tiers: tiers
      };
    },

    getJobs: function () {
      return readStorage(STORAGE_KEYS.JOBS, DEFAULT_JOBS);
    },

    postJob: function (jobData) {
      const jobs = this.getJobs();
      const newJob = {
        id: 'job_' + Date.now(),
        title: jobData.title || 'Satellite Communications Project',
        titleAr: jobData.title || 'مشروع هندسي فضائي جديد',
        titleEn: jobData.titleEn || jobData.title || 'New Satellite Project',
        category: jobData.category || 'cst',
        budget: typeof jobData.budget === 'number' ? ('$' + jobData.budget.toFixed(2)) : (jobData.budget || '$300.00'),
        budgetValue: parseFloat(jobData.budget) || 300,
        escrowStatus: 'funded',
        descAr: jobData.descAr || jobData.desc || 'مشروع جديد تم طرحه بضمان Escrow 100%.',
        descEn: jobData.descEn || jobData.desc || 'New satcom engineering project posted with 100% Escrow funding.',
        tags: jobData.tags && jobData.tags.length ? jobData.tags : ['Satcom', 'CST Studio', 'Escrow 100%'],
        postedTimeAr: 'الآن (جديد)',
        postedTimeEn: 'Just now (NEW)',
        clientName: jobData.clientName || 'صاحب العمل',
        clientCountry: 'منطقة العميل',
        clientCountryEn: 'Client Location',
        proposalsCount: 0,
        hiredCount: 0,
        isCustom: true
      };
      jobs.unshift(newJob);
      writeStorage(STORAGE_KEYS.JOBS, jobs);

      // Asynchronous background sync to PostgreSQL backend if reachable
      if (API_BASE) {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        fetch(API_BASE + '/jobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': 'Bearer ' + token } : {})
          },
          body: JSON.stringify({
            title: newJob.title,
            description: newJob.descAr,
            budget: newJob.budgetValue,
            estimatedDuration: '2 weeks',
            skillNames: newJob.tags
          })
        }).catch(function () {
          // Graceful fallback to client-side ecosystem bridge
        });
      }

      return newJob;
    },

    // Sequential Contract Number Generator (CTR-SAT-00001, CTR-SAT-00002, ...)
    getNextContractNumber: function () {
      let seq = parseInt(localStorage.getItem('satcom_contract_seq') || '0', 10) + 1;
      localStorage.setItem('satcom_contract_seq', seq.toString());
      return 'CTR-SAT-' + String(seq).padStart(5, '0');
    },

    getCurrentContractSequence: function () {
      let seq = parseInt(localStorage.getItem('satcom_contract_seq') || '1', 10);
      return 'CTR-SAT-' + String(seq).padStart(5, '0');
    },

    getContract: function () {
      return readStorage(STORAGE_KEYS.CONTRACTS, DEFAULT_CONTRACT);
    },

    createContract: function (contractData) {
      const contractId = this.getNextContractNumber();
      const amount = parseFloat(contractData.totalAmount) || 300.00;
      const m1Amt = amount / 2;
      const m2Amt = amount / 2;

      const newContract = {
        id: contractId,
        titleAr: contractData.titleAr || 'عقد هندسي فضائي نشط',
        titleEn: contractData.titleEn || 'Active Satellite Engineering Contract',
        clientName: contractData.clientName || 'صاحب العمل',
        freelancerName: contractData.freelancerName || 'المهندس المعتمد',
        totalAmount: amount,
        escrowLocked: amount,
        status: 'active',
        milestone1: {
          id: 'M1',
          titleAr: 'المرحلة 1: بناء النموذج ومحاكاة المعلمات',
          titleEn: 'Milestone 1: Model Setup & Initial Simulation',
          amount: m1Amt,
          status: 'released'
        },
        milestone2: {
          id: 'M2',
          titleAr: 'المرحلة 2: محاكاة الفصوص الإشعاعية والتقرير النهائي',
          titleEn: 'Milestone 2: 3D Radiation Pattern & Final Deliverable',
          amount: m2Amt,
          status: 'pending'
        }
      };

      writeStorage(STORAGE_KEYS.CONTRACTS, newContract);

      // Update wallet escrow
      const wallet = this.getWallet();
      wallet.inEscrow += m2Amt;
      wallet.available += m1Amt;
      wallet.totalEarned += m1Amt;
      writeStorage(STORAGE_KEYS.WALLET, wallet);

      return newContract;
    },

    deliverMilestone2: function (notes, filename) {
      let contract = this.getContract();
      if (!contract) return null;
      contract.milestone2.status = 'delivered';
      if (notes) {
        contract.milestone2.deliveryNotesAr = notes;
        contract.milestone2.deliveryNotesEn = notes;
      }
      if (filename) {
        contract.milestone2.deliveredFile = filename;
      }
      contract.milestone2.deliveredDateAr = 'الآن';
      contract.milestone2.deliveredDateEn = 'Just now';
      writeStorage(STORAGE_KEYS.CONTRACTS, contract);
      return contract;
    },

    releaseMilestone2: function () {
      const contract = this.getContract();
      if (!contract || contract.milestone2.status === 'released') return contract;

      contract.milestone2.status = 'released';
      writeStorage(STORAGE_KEYS.CONTRACTS, contract);

      const wallet = this.getWallet();
      wallet.available += 300.00;
      wallet.inEscrow = Math.max(0, wallet.inEscrow - 300.00);
      wallet.totalEarned += 300.00;
      writeStorage(STORAGE_KEYS.WALLET, wallet);

      const admin = this.getAdminLedger();
      admin.platformFees += 20.00;
      admin.totalVolume += 300.00;
      admin.escrowHeld = Math.max(0, admin.escrowHeld - 300.00);
      writeStorage(STORAGE_KEYS.ADMIN_LOG, admin);

      return contract;
    },

    getWallet: function () {
      return readStorage(STORAGE_KEYS.WALLET, DEFAULT_WALLET);
    },

    requestPayout: function (amount, channel, account) {
      const wallet = this.getWallet();
      const numAmount = parseFloat(amount) || 0;
      if (numAmount <= 0 || numAmount > wallet.available) {
        return { success: false, message: 'رصيد غير كافٍ للسحب' };
      }
      wallet.available -= numAmount;
      writeStorage(STORAGE_KEYS.WALLET, wallet);

      const payouts = readStorage(STORAGE_KEYS.PAYOUTS, []);
      const newPayout = {
        id: 'PAY-' + Date.now().toString().slice(-6),
        amount: numAmount,
        channel: channel || 'SWIFT',
        account: account || 'IBAN-XXXX',
        date: new Date().toLocaleDateString(),
        status: 'pending'
      };
      payouts.unshift(newPayout);
      writeStorage(STORAGE_KEYS.PAYOUTS, payouts);

      return { success: true, payout: newPayout, newBalance: wallet.available };
    },

    getAdminLedger: function () {
      return readStorage(STORAGE_KEYS.ADMIN_LOG, DEFAULT_ADMIN_LEDGER);
    },

    onSync: function (callback) {
      window.addEventListener('storage', (e) => {
        callback({ key: e.key, isStorageEvent: true });
      });
      window.addEventListener('satcom_sync', (e) => {
        callback({ key: e.detail.key, isStorageEvent: false });
      });
    }
  };

  window.SatcomDB = SatcomDB;

})(window);
