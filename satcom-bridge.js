/**
 * Satcom Engineers Ecosystem Bridge (satcom-bridge.js)
 * Real-time unified data store and cross-page synchronization engine.
 * Powered by localStorage with cross-tab reactive events.
 * Designed & Developed by Emadsoft
 */

(function (window) {
  'use strict';

  // Version 3: Clean production-ready keys (zero demo data)
  const STORAGE_KEYS = {
    LANG: 'satcom_lang',
    JOBS: 'satcom_shared_jobs_v3',
    CONTRACTS: 'satcom_shared_contract_v3',
    WALLET: 'satcom_shared_wallet_v3',
    PAYOUTS: 'satcom_shared_payouts_v3',
    ADMIN_LOG: 'satcom_shared_admin_ledger_v3'
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
        clientName: jobData.clientName || 'Orbital Space Systems',
        clientCountry: 'دبي، الإمارات 🇦🇪',
        clientCountryEn: 'Dubai, UAE 🇦🇪',
        proposalsCount: 0,
        hiredCount: 0,
        isCustom: true
      };
      jobs.unshift(newJob);
      writeStorage(STORAGE_KEYS.JOBS, jobs);
      return newJob;
    },

    getContract: function () {
      return readStorage(STORAGE_KEYS.CONTRACTS, DEFAULT_CONTRACT);
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
