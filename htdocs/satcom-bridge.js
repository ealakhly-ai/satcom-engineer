/**
 * Satcom Engineers Ecosystem Bridge (satcom-bridge.js)
 * Real-time unified data store and cross-page synchronization engine.
 * Powered by localStorage with cross-tab reactive events.
 * Designed & Developed by Emadsoft
 */

(function (window) {
  'use strict';

  const STORAGE_KEYS = {
    LANG: 'satcom_lang',
    JOBS: 'satcom_shared_jobs_v2',
    CONTRACTS: 'satcom_shared_contract_v2',
    WALLET: 'satcom_shared_wallet_v2',
    PAYOUTS: 'satcom_shared_payouts_v2',
    ADMIN_LOG: 'satcom_shared_admin_ledger_v2'
  };

  // Initial Seed Data
  const DEFAULT_JOBS = [
    {
      id: 'job_cst_phased',
      title: 'Ka-Band Phased Array Antenna Simulation (28-30 GHz)',
      titleEn: 'Ka-Band Phased Array Antenna Simulation (28-30 GHz)',
      titleAr: 'محاكاة مصفوفة هوائيات Ka-Band بالطور التدريجي (28-30 GHz)',
      category: 'cst',
      budget: '.00',
      budgetValue: 600,
      escrowStatus: 'funded',
      descAr: 'مطلوب مهندس اتصالات فضائية لتصميم ومحاكاة مصفوفة هوائيات Ka-Band بتردد 28-30 GHz عبر CST Studio Suite وتزويدنا بملف .cst وتقرير الفصوص الإشعاعية.',
      descEn: 'Satellite telecom engineer required to design and simulate a 28-30 GHz Ka-band phased array antenna in CST Studio Suite, providing .cst project files and far-field radiation reports.',
      tags: ['CST Studio', 'Ka-Band', 'Phased Array', 'Far-Field'],
      postedTimeAr: 'منذ ساعتين',
      postedTimeEn: '2 hours ago',
      clientName: 'Orbital Space Systems',
      clientCountry: 'دبي، الإمارات 🇦🇪',
      clientCountryEn: 'Dubai, UAE 🇦🇪',
      proposalsCount: 6,
      hiredCount: 1,
      isCustom: false
    },
    {
      id: 'job_leo_link',
      title: 'LEO Constellation Link Budget & Rain Attenuation Analysis (ITU-R)',
      titleEn: 'LEO Constellation Link Budget & Rain Attenuation Analysis (ITU-R)',
      titleAr: 'تحليل ميزانية الرابط لكوكبة LEO وتلاشي الأمطار (ITU-R)',
      category: 'link',
      budget: '.00',
      budgetValue: 300,
      escrowStatus: 'open',
      descAr: 'إعداد وتحليل ميزانية الرابط الشاملة لكوكبة أقمار في مدار أرضي منخفض LEO مع نمذجة تلاشي الأمطار حسب معايير ITU-R P.618 وهامش خطأ Eb/N0.',
      descEn: 'Develop end-to-end link budget for LEO constellation including ITU-R P.618 rain attenuation modeling and Eb/N0 margin calculations.',
      tags: ['Link Budget', 'MATLAB', 'ITU-R P.618', 'LEO Orbit'],
      postedTimeAr: 'منذ 5 ساعات',
      postedTimeEn: '5 hours ago',
      clientName: 'SkyLink Aerospace Inc.',
      clientCountry: 'الرياض، السعودية 🇸🇦',
      clientCountryEn: 'Riyadh, KSA 🇸🇦',
      proposalsCount: 12,
      hiredCount: 0,
      isCustom: false
    }
  ];

  const DEFAULT_CONTRACT = {
    id: 'CTR-SAT-9921',
    title: 'Ka-Band Phased Array Antenna Simulation (28-30 GHz)',
    clientName: 'Orbital Space Systems',
    engineerName: 'م. أحمد المنصوري',
    engineerNameEn: 'Eng. Ahmed Al-Mansouri',
    totalBudget: 600,
    escrowFunded: 600,
    milestone1: {
      id: 'm1',
      titleAr: 'المرحلة 1: حساب أبعاد العناصر ومصفوفة التغذية Feed Network',
      titleEn: 'Milestone 1: Element Geometry & Feed Network Calculations',
      amount: 300,
      status: 'released'
    },
    milestone2: {
      id: 'm2',
      titleAr: 'المرحلة 2: محاكاة CST وحساب مصفوفة الطور لزوايا ±45° وتقرير Far-Field',
      titleEn: 'Milestone 2: 3D CST Simulation, ±45° Steering & Radiation Report',
      amount: 300,
      status: 'delivered',
      deliveredFile: 'Ka_PhasedArray_Sim.cst',
      deliveredDoc: 'FarField_Radiation_Report.pdf',
      deliveredDateAr: 'اليوم، 01:15 م',
      deliveredDateEn: 'Today, 01:15 PM',
      deliveryNotesAr: 'تم الانتهاء من محاكاة CST وحساب كسب الهوائي 24.2 dBi ومصفوفة الطور لزوايا ±45 درجة، والملفات جاهزة للمراجعة والاعتماد.',
      deliveryNotesEn: 'Completed CST 3D simulation with 24.2 dBi gain and ±45 deg beam steering phase distribution. Files ready for review.'
    }
  };

  const DEFAULT_WALLET = {
    available: 600.00,
    inEscrow: 1250.00,
    totalEarned: 4850.00
  };

  const DEFAULT_ADMIN_LEDGER = {
    totalVolume: 48500.00,
    escrowHeld: 1250.00,
    platformFees: 3240.00,
    activeContractsCount: 14,
    disputesCount: 1,
    verifiedEngCount: 142
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
        budget: typeof jobData.budget === 'number' ? ('$' + jobData.budget.toFixed(2)) : (jobData.budget || '.00'),
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
      const contract = this.getContract();
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
      if (contract.milestone2.status === 'released') return contract;

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
